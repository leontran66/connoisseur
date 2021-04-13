import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import {
  isABN, isAddress, isNumber, isPostCode, isState,
} from '../util/validators/business';
import { Business } from '../models/Business';
import { Menu } from '../models/Menu';

export const getAllBusinesses = async (req: Request, res: Response): Promise<Response> => {
  const businesses = await Business.find({});
  if (businesses.length <= 0) {
    return res.status(404).json({ message: [{ msg: 'Businesses not found.', param: 'error' }] });
  }
  return res.status(200).json({ businesses });
};

export const getBusiness = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: [{ msg: 'That ID is not valid.', param: 'error' }] });
  }
  const business = await Business.findById(id);
  if (!business) {
    return res.status(404).json({ message: [{ msg: 'The business you are looking for does not exist.', param: 'error' }] });
  }
  return res.status(200).json({ business });
};

export const createBusiness = async (req: Request, res: Response): Promise<Response> => {
  const {
    user, name, abn, phone, fax, streetAddress, suburb, state, postCode,
  } = req.body;

  await body('name').notEmpty().trim().escape()
    .withMessage('Name is required.')
    .run(req);
  await body('abn').notEmpty().trim().escape()
    .withMessage('ABN is required.')
    .custom(isABN)
    .withMessage('ABN is invalid.')
    .run(req);
  await body('phone').trim().escape().custom(isNumber)
    .withMessage('Phone number is invalid.')
    .run(req);
  await body('fax').trim().escape().custom(isNumber)
    .withMessage('Fax number is invalid.')
    .run(req);
  await body('streetAddress').trim().escape().run(req);
  await body('suburb').trim().escape().run(req);
  await body('state').trim().escape().custom(isState)
    .withMessage('State is invalid.')
    .run(req);
  await body('postCode').trim().escape().custom(isPostCode)
    .withMessage('Postcode is invalid.')
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const address = isAddress(streetAddress, suburb, state, postCode);
  if (address.length > 0) {
    return res.status(400).json({ message: address });
  }

  const businessExists = await Business.findOne({ abn });
  if (businessExists) {
    return res.status(400).json({ message: [{ msg: 'A business with that ABN already exists.', param: 'abn' }] });
  }

  await Business.create({
    user,
    name,
    abn,
    phone,
    fax,
    streetAddress,
    suburb,
    state,
    postCode,
    menu: [],
    reviews: [],
  });

  return res.status(200).json({ message: [{ msg: 'Your business profile has been created.', param: 'success' }] });
};

export const updateBusiness = async (req: Request, res: Response): Promise<Response> => {
  const {
    user, name, abn, phone, fax, streetAddress, suburb, state, postCode,
  } = req.body;
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: [{ msg: 'That ID is not valid.', param: 'error' }] });
  }

  await body('name').notEmpty().trim().escape()
    .withMessage('Name is required.')
    .run(req);
  await body('abn').notEmpty().trim().escape()
    .withMessage('ABN is required.')
    .custom(isABN)
    .withMessage('ABN is invalid.')
    .run(req);
  await body('phone').trim().escape().custom(isNumber)
    .withMessage('Phone number is invalid.')
    .run(req);
  await body('fax').trim().escape().custom(isNumber)
    .withMessage('Fax number is invalid.')
    .run(req);
  await body('streetAddress').trim().escape().run(req);
  await body('suburb').trim().escape().run(req);
  await body('state').trim().escape().custom(isState)
    .withMessage('State is invalid.')
    .run(req);
  await body('postCode').trim().escape().custom(isPostCode)
    .withMessage('Postcode is invalid.')
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const address = isAddress(streetAddress, suburb, state, postCode);
  if (address.length > 0) {
    return res.status(400).json({ message: address });
  }

  const business = await Business.findById(id);
  if (!business) {
    return res.status(404).json({ message: [{ msg: 'Your business was not found.', param: 'error' }] });
  }
  if (user !== business.user) {
    return res.status(401).json({ message: [{ msg: 'You are unauthorized to make changes to that business.', param: 'error' }] });
  }
  if (business && business.abn !== abn) {
    return res.status(400).json({ message: [{ msg: 'ABN cannot be altered.', param: 'abn' }] });
  }

  await Business.findByIdAndUpdate(id, {
    name,
    abn,
    phone,
    fax,
    streetAddress,
    suburb,
    state,
    postCode,
  });

  return res.status(200).json({ message: [{ msg: 'Your business details have been updated.', param: 'success' }] });
};

export const deleteBusiness = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: [{ msg: 'That ID is not valid.', param: 'error' }] });
  }

  const business = await Business.findById(id);
  if (!business) {
    return res.status(404).json({ message: [{ msg: 'Your business was not found.', param: 'error' }] });
  }

  await Menu.deleteMany({ _id: { $in: [business.menu] } });
  // await Review.deleteMany(business.reviews);
  await Business.findByIdAndDelete(id);

  return res.status(200).json({ message: [{ msg: 'Your business has been deleted.', param: 'success' }] });
};
