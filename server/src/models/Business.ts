import { Document, model, Schema } from 'mongoose';

export type BusinessDocument = Document & {
  user: string;
  abn: string;
  name: string;
  phone: string;
  fax: string;
  streetAddress: string;
  suburb: string;
  state: string;
  postCode: string;
  menu: Array<Schema.Types.ObjectId>;
  reviews: Array<Schema.Types.ObjectId>;
};

const businessSchema = new Schema<BusinessDocument>({
  user: { type: String, unique: true, ref: 'User' },
  abn: { type: String, unique: true },
  name: String,
  phone: String,
  fax: String,
  streetAddress: String,
  suburb: String,
  state: String,
  postCode: String,
  menu: { type: [Schema.Types.ObjectId], ref: 'Menu' },
  reviews: { type: [Schema.Types.ObjectId], ref: 'Review' },
});

businessSchema.pre('save', function save(next) {
  const business = this as BusinessDocument;
  if (!business.isModified('name')) return next();
  business.name = business.name.toLowerCase();
  return next();
});

businessSchema.pre('save', function save(next) {
  const business = this as BusinessDocument;
  if (!business.isModified('streetAddress')) return next();
  business.streetAddress = business.streetAddress.toLowerCase();
  return next();
});

businessSchema.pre('save', function save(next) {
  const business = this as BusinessDocument;
  if (!business.isModified('suburb')) return next();
  business.suburb = business.suburb.toLowerCase();
  return next();
});

businessSchema.pre('save', function save(next) {
  const business = this as BusinessDocument;
  if (!business.isModified('state')) return next();
  business.state = business.state.toUpperCase();
  return next();
});

export const Business = model<BusinessDocument>('Business', businessSchema);
