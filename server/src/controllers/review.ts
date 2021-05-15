import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import { Business } from '../models/Business';
import { Review } from '../models/Review';
import { NODE_ENV } from '../config/secrets';

export const createReview = async (req: Request, res: Response): Promise<Response> => {
  const { id, user, rating, comment } = req.body;

  await body('rating').isNumeric().withMessage('Rating is required.')
    .run(req);
  await body('review').trim().escape().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const business = await Business.findById(id);
  const reviews = await Review.find({ user });
  if (business && business.reviews.some(review => {
    for (let i = 0; i < reviews.length; i++) {
      if (review.toString() === reviews[i]._id.toString()) {
        return true;
      }
    }
  })) {
    return res.status(400).json({ message: [{ msg: 'You have already made a review on that restaurant.', param: 'error'  }] });
  }

  const review = new Review({
    user,
    rating,
    comment,
  });

  await review.save();

  await Business.findByIdAndUpdate({ _id: id }, { $push: { reviews: review._id } });

  return res.status(200).json({ message: [{ msg: 'Review has been created.', param: 'success' }] });
};

export const deleteReview = async (req: Request, res: Response): Promise<Response> => {
  let user: string;

  if (NODE_ENV === 'production') {
    user = req.user.sub;
  } else {
    user = req.body.user;
  }

  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: [{ msg: 'That ID is invalid.', field: 'error' }] });
  }

  const review = await Review.findById(id);
  if (!review) {
    return res.status(404).json({ message: [{ msg: 'That review was not found.', param: 'error' }] });
  }

  await Review.findByIdAndDelete(id);
  await Business.findOneAndUpdate({ reviews: { $elemMatch: { $eq: id } } }, { $pull: { reviews: { $in: [id] } } });

  return res.status(200).json({ message: [{ msg: 'Review has been deleted.', param: 'success' }] });
};
