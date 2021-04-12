import { Document, model, Schema } from 'mongoose';

export type MenuDocument = Document & {
  name: string;
  category: string;
  options: Array<string>;
  description: string;
  spicy: boolean;
  vegetarian: boolean;
  price: number;
};

const menuSchema = new Schema<MenuDocument>({
  name: String,
  category: String,
  options: [String],
  description: String,
  spicy: Boolean,
  vegetarian: Boolean,
  price: Number,
});

menuSchema.pre('save', function save(next) {
  const menu = this as MenuDocument;
  if (!menu.isModified('name')) return next();
  menu.name = menu.name.toLowerCase();
  return next();
});

menuSchema.pre('save', function save(next) {
  const menu = this as MenuDocument;
  if (!menu.isModified('category')) return next();
  menu.category = menu.category.toLowerCase();
  return next();
});

menuSchema.pre('save', function save(next) {
  const menu = this as MenuDocument;
  if (!menu.isModified('price')) return next();
  menu.price = parseFloat(menu.price.toFixed(2));
  return next();
});

export const Menu = model<MenuDocument>('Menu', menuSchema);
