import mongoose, { Schema } from 'mongoose';
import request from 'supertest';
import app from '../src/app';
import { Business } from '../src/models/Business';
import { Review } from '../src/models/Review';
import { MONGODB_URI } from '../src/config/secrets';

describe('the Review route', () => {
  beforeAll(async () => {
    mongoose.connect(MONGODB_URI!.toString(), {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    await Business.create({
      name: 'John Smith',
      abn: '60579663101',
    });
  });

  describe('POST /api/review route', () => {
    let businessID: Schema.Types.ObjectId;

    beforeAll(async () => {
      const business = await Business.findOne({ abn: '60 579 663 101' }).exec();
      businessID = business!._id;
    });

    test('all invalid inputs should return 400 Bad Request', async () => {
      expect.assertions(2);
      const res = await request(app).post('/api/review')
        .send({
          id: businessID,
        });
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('Rating is required.');
    });

    test('correct input should return 200 OK', async () => {
      expect.assertions(4);
      const res = await request(app).post('/api/review')
        .send({
          id: businessID,
          user: process.env.AUTH0_USER_ID!,
          rating: 5,
          comment: 'test',
        });
      expect(res.status).toBe(200);
      expect(res.body.message[0].msg).toBe('Review has been created.');
      const review = await Review.findOne({ comment: 'test' });
      expect(review).not.toBeNull();
      const business = await Business.findOne({ reviews: { $in: [review!._id] } });
      expect(business).not.toBeNull();
    });

    test('review on the same restaurant returns 400 Bad Request', async () => {
      expect.assertions(2);
      const res = await request(app).post('/api/review')
        .send({
          id: businessID,
          user: process.env.AUTH0_USER_ID!,
          rating: 5,
          comment: 'test2',
        });
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('You have already made a review on that restaurant.');
    });
  });

  describe('DELETE /api/review/:id route', () => {
    let businessID: Schema.Types.ObjectId, reviewID: Schema.Types.ObjectId, user: string;

    beforeAll(async () => {
      const review = await Review.findOne({}).exec();
      reviewID = review!._id;
      user = review!.user;

      const business = await Business.findOne({ reviews: { $in: [reviewID] }});
      businessID = business!._id;
    });

    test('invalid id should return 400 Bad Request', async () => {
      expect.assertions(2);
      const res = await request(app).delete('/api/review/123')
        .send({
          user,
        })
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('That ID is invalid.');
    });

    test('id of non-existent review should return 404 Not Found', async () => {
      expect.assertions(2);
      const res = await request(app).delete(`/api/review/${mongoose.Types.ObjectId()}`)
        .send({
          user,
        });
      expect(res.status).toBe(404);
      expect(res.body.message[0].msg).toBe('That review was not found.');
    });

    test('correct input should return 200 OK', async () => {
      expect.assertions(4);
      const res = await request(app).delete(`/api/review/${reviewID}`)
        .send({
          user,
        });
      expect(res.status).toBe(200);
      expect(res.body.message[0].msg).toBe('Review has been deleted.');
      const review = await Review.findById(reviewID);
      expect(review).toBeNull();
      const business = await Business.findOne({ review: { $in: [reviewID] } });
      expect(business).toBeNull();
    });
  });

  afterAll(async () => {
    await Business.deleteMany({}).exec();
    await Review.deleteMany({}).exec();
    mongoose.connection.close();
  });
});
