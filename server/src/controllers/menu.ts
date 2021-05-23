import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import isValidPrice from '../util/validators/menu';
import { Business } from '../models/Business';
import { Menu } from '../models/Menu';
import { NODE_ENV } from '../config/secrets';

export const getMenu = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: [{ msg: 'That ID is not valid.', param: 'error' }] });
  }
  const menu = await Menu.findById(id);
  if (!menu) {
    return res.status(404).json({ message: [{ msg: 'The menu item you are looking for does not exist.', param: 'error' }] });
  }
  return res.status(200).json({ menu });
};

export const createMenu = async (req: Request, res: Response): Promise<Response> => {
  let user: string;

  if (NODE_ENV === 'production') {
    user = req.user.sub;
  } else {
    user = req.body.user;
  }

  const {
    name, category, options, description, spicy, vegetarian, price,
  } = req.body;

  await body('name').notEmpty().trim().escape()
    .toLowerCase()
    .withMessage('Name is required.')
    .run(req);
  await body('category').notEmpty().trim().escape()
    .toLowerCase()
    .withMessage('Category is required.')
    .run(req);
  await body('options.*').trim().escape().toLowerCase()
    .run(req);
  await body('description').trim().escape().run(req);
  await body('spicy').isBoolean().run(req);
  await body('vegetarian').isBoolean().run(req);
  await body('price').custom(isValidPrice)
    .withMessage('Price is invalid.')
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const business = await Business.findOne({ user });
  if (!business) {
    return res.status(400).json({ message: [{ msg: 'You do not have a business.', param: 'error' }] });
  }

  const menu = new Menu({
    name,
    category,
    options,
    description,
    spicy,
    vegetarian,
    price,
  });

  await menu.save();

  await Business.findOneAndUpdate({ user }, { $push: { menu: menu._id } });

  return res.status(200).json({ message: [{ msg: 'Menu item has been created.', param: 'success' }] });
};

export const updateMenu = async (req: Request, res: Response): Promise<Response> => {
  let user: string;

  if (NODE_ENV === 'production') {
    user = req.user.sub;
  } else {
    user = req.body.user;
  }

  const {
    name, category, options, description, spicy, vegetarian, price,
  } = req.body;
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: [{ msg: 'That ID is invalid.', field: 'error' }] });
  }

  await body('name').notEmpty().trim().escape()
    .toLowerCase()
    .withMessage('Name is required.')
    .run(req);
  await body('category').notEmpty().trim().escape()
    .toLowerCase()
    .withMessage('Category is required.')
    .run(req);
  await body('options.*').trim().escape().toLowerCase()
    .run(req);
  await body('description').trim().escape().run(req);
  await body('spicy').isBoolean().run(req);
  await body('vegetarian').isBoolean().run(req);
  await body('price').custom(isValidPrice)
    .withMessage('Price is invalid.')
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const menu = await Menu.findById(id);
  if (!menu) {
    return res.status(404).json({ message: [{ msg: 'That menu item was not found.', field: 'error' }] });
  }

  const business = await Business.findOne({ user });
  if (!business) {
    return res.status(400).json({ message: [{ msg: 'You do not have a business.', param: 'error' }] });
  }
  if (!business.menu.some((item) => item.toString() === id)) {
    return res.status(401).json({ message: [{ msg: 'You are not authorized to update a menu item on this business.', param: 'error' }] });
  }

  await Menu.findByIdAndUpdate(id, {
    name,
    category,
    options,
    description,
    spicy,
    vegetarian,
    price,
  });

  return res.status(200).json({ message: [{ msg: 'Menu item has been updated.', param: 'success' }] });
};

export const deleteMenu = async (req: Request, res: Response): Promise<Response> => {
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

  const menu = await Menu.findById(id);
  if (!menu) {
    return res.status(404).json({ message: [{ msg: 'That menu item was not found.', field: 'error' }] });
  }

  const business = await Business.findOne({ user });
  if (!business) {
    return res.status(400).json({ message: [{ msg: 'You do not have a business.', param: 'error' }] });
  }
  if (!business.menu.some((item) => item.toString() === id)) {
    return res.status(401).json({ message: [{ msg: 'You are not authorized to delete a menu item on this business.', param: 'error' }] });
  }

  await Menu.findByIdAndDelete(id);
  await Business.findOneAndUpdate({ menu: { $elemMatch: { $eq: id } } },
    { $pull: { menu: { $in: [id] } } });

  return res.status(200).json({ message: [{ msg: 'Menu item has been deleted.', param: 'success' }] });
};
