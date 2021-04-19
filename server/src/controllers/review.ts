import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import { Business } from '../models/Business';
import { Review } from '../models/Review';

export const createReview = async (req: Request, res: Response): Promise<Response> => {
  const { id, rating, comment } = req.body;

  await body('rating').isNumeric().withMessage('Rating is required.')
    .run(req);
  await body('review').trim().escape().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  // TODO: check if user has already created a review for business

  const review = new Review({
    rating,
    comment,
  });

  await review.save();

  await Business.findByIdAndUpdate({ _id: id }, { $push: { reviews: review._id } });

  return res.status(200).json({ message: [{ msg: 'Review has been created.', param: 'success' }] });
};

export const updateReview = async (req: Request, res: Response): Promise<Response> => {
  const { rating, comment } = req.body;
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: [{ msg: 'That ID is invalid.', field: 'error' }] });
  }

  await body('rating').isNumeric().withMessage('Rating is required.')
    .run(req);
  await body('review').trim().escape().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const review = await Review.findById(id);
  if (!review) {
    return res.status(404).json({ message: [{ msg: 'That review was not found.', field: 'error' }] });
  }

  //  TODO: ensure that only the user who owns the review can update it

  await Review.findByIdAndUpdate(id, {
    rating,
    comment,
  });

  return res.status(200).json({ message: [{ msg: 'Review has been updated.', param: 'success' }] });
};

export const deleteReview = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: [{ msg: 'That ID is invalid.', field: 'error' }] });
  }

  const menu = await Review.findById(id);
  if (!menu) {
    return res.status(404).json({ message: [{ msg: 'That review was not found.', field: 'error' }] });
  }

  // TODO: ensure that only the user who owns the item can delete it

  await Review.findByIdAndDelete(id);

  // find business from user id
  // await Business.findByIdAndUpdate(id, { $pull: { menu: { $eq: id } } });
  await Business.findOneAndUpdate({ name: 'John Smith' }, { $pull: { reviews: { $in: id } } });

  return res.status(200).json({ message: [{ msg: 'Review has been deleted.', param: 'success' }] });
};
