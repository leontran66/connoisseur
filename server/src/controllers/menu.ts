import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import isValidPrice from '../util/validators/menu';
import { Business } from '../models/Business';
import { Menu } from '../models/Menu';

export const createMenu = async (req: Request, res: Response): Promise<Response> => {
  const {
    name, category, options, description, spicy, vegetarian, price,
  } = req.body;
  // const { id } = req.user;

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

  // find business from user id
  // await Business.findByIdAndUpdate({ _id: id }, { $push: { menu: menu._id } });
  await Business.findOneAndUpdate({ name: 'John Smith' }, { $push: { menu: menu._id } });

  return res.status(200).json({ message: [{ msg: 'Menu item has been created.', param: 'success' }] });
};

export const updateMenu = async (req: Request, res: Response): Promise<Response> => {
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

  //  TODO: ensure that only the user who owns the item can update it

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
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: [{ msg: 'That ID is invalid.', field: 'error' }] });
  }

  const menu = await Menu.findById(id);
  if (!menu) {
    return res.status(404).json({ message: [{ msg: 'That menu item was not found.', field: 'error' }] });
  }

  // TODO: ensure that only the user who owns the item can delete it

  await Menu.findByIdAndDelete(id);

  // find business from user id
  // await Business.findByIdAndUpdate(id, { $pull: { menu: { $eq: id } } });
  await Business.findOneAndUpdate({ name: 'John Smith' }, { $pull: { menu: { $in: id } } });

  return res.status(200).json({ message: [{ msg: 'Menu item has been deleted.', param: 'success' }] });
};
