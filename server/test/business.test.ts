import mongoose, { Schema } from 'mongoose';
import request from 'supertest';
import app from '../src/app';
import { Business } from '../src/models/Business';
import { MONGODB_URI } from '../src/config/secrets';

describe('business route', () => {
  beforeAll(async () => {
    mongoose.connect(MONGODB_URI!.toString(), {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  });

  describe('GET /api/business route', () => {
    test('no businesses should return 404 Not Found', async () => {
      expect.assertions(2);
      const res = await request(app).get('/api/business');
      expect(res.status).toBe(404);
      expect(res.body.message[0].msg).toBe('Businesses not found.');
    });

    describe('non-empty businesses', () => {
      beforeAll(async () => {
        await Business.create({
          user: process.env.AUTH0_USER_ID,
          name: 'John Doe',
          abn: '51824753556',
        });
      });

      test('correct input should return 200 OK', async () => {
        expect.assertions(3);
        const res = await request(app).get('/api/business');
        expect(res.status).toBe(200);
        expect(res.body.businesses[0].name).toBe('john doe');
        expect(res.body.businesses[0].abn).toBe('51 824 753 556');
      });
    });
  });

  describe('GET /api/business/me route', () => {
    let user: string;

    beforeAll(async () => {
      const business = await Business.findOne({ abn: '51 824 753 556' }).exec();
      user = business!.user;
    });

    test('no user returns 404 Not Found', async () => {
      expect.assertions(2);
      const res = await request(app).get('/api/business/me');
      expect(res.status).toBe(404);
      expect(res.body.message[0].msg).toBe('The business you are looking for does not exist.');
    });

    test('non-existent business returns 404 Not Found', async () => {
      expect.assertions(2);
      const res = await request(app).get('/api/business/me')
        .send({
          user: 'test',
        });
      expect(res.status).toBe(404);
      expect(res.body.message[0].msg).toBe('The business you are looking for does not exist.');
    });

    test('correct input should return 200 OK', async () => {
      expect.assertions(3);
      const res = await request(app).get('/api/business/me')
        .send({
          user,
        });
      expect(res.status).toBe(200);
      expect(res.body.business.name).toBe('john doe');
      expect(res.body.business.abn).toBe('51 824 753 556');
    });
  });

  describe('GET /api/business/:id route', () => {
    let businessID: Schema.Types.ObjectId;

    beforeAll(async () => {
      const business = await Business.findOne({ abn: '51 824 753 556' }).exec();
      businessID = business!._id;
    });

    test('invalid id should return 400 Bad Request', async () => {
      expect.assertions(2);
      const res = await request(app).get('/api/business/123');
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('That ID is not valid.');
    });

    test('id of non-existent business should return 404 Not Found', async () => {
      expect.assertions(2);
      const res = await request(app).get(`/api/business/${mongoose.Types.ObjectId()}`);
      expect(res.status).toBe(404);
      expect(res.body.message[0].msg).toBe('The business you are looking for does not exist.');
    });

    test('correct input should return 200 OK', async () => {
      expect.assertions(3);
      const res = await request(app).get(`/api/business/${businessID}`);
      expect(res.status).toBe(200);
      expect(res.body.business.name).toBe('john doe');
      expect(res.body.business.abn).toBe('51 824 753 556');
    });
  });
 
  describe('POST /api/business route', () => {
    test('all invalid inputs should return 400 Bad Request', async () => {
      expect.assertions(7);
      const res = await request(app).post(`/api/business`)
        .send({
          user: 'test',
          name: '',
          abn: '',
          phone: '123',
          fax: '123',
          streetAddress: '',
          suburb: '',
          state: 'test',
          postCode: '1234',
        });
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('Name is required.');
      expect(res.body.message[1].msg).toBe('ABN is required.');
      expect(res.body.message[2].msg).toBe('Phone number is invalid.');
      expect(res.body.message[3].msg).toBe('Fax number is invalid.');
      expect(res.body.message[4].msg).toBe('State is invalid.');
      expect(res.body.message[5].msg).toBe('Postcode is invalid.');
    });

    test('invalid ABN should return 400 Bad Request', async () => {
      expect.assertions(2);
      const res = await request(app).post(`/api/business`)
        .send({
          user: 'test',
          name: 'John Doe',
          abn: '123',
        });
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('ABN is invalid.');
    });

    test('partial address should return 400 Bad Request', async () => {
      expect.assertions(4);
      const res = await request(app).post(`/api/business`)
        .send({
          user: 'test',
          name: 'John Doe',
          abn: '51824753556',
          streetAddress: '1 Hello Street',
          suburb: '',
          state: '',
          postCode: '',
        });
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('Suburb is required when entering an address.');
      expect(res.body.message[1].msg).toBe('State is required when entering an address.');
      expect(res.body.message[2].msg).toBe('Postcode is required when entering an address.');
    });

    test('already existing abn should return 400 Bad Request', async () => {
      expect.assertions(2);
      const res = await request(app).post(`/api/business`)
        .send({
          user: process.env.AUTH0_USER_ID,
          name: 'John Doe',
          abn: '51824753556',
          phone: '0412312312',
          fax: '31231231',
          streetAddress: '1 Hello Street',
          suburb: 'World',
          state: 'QLD',
          postCode: '4123',
        });
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('A business with that ABN already exists.');
    });

    test('correct input should return 200 OK', async () => {
      expect.assertions(8);
      const res = await request(app).post(`/api/business`)
        .send({
          user: 'test',
          name: 'Leon Tran',
          abn: '60579663101',
          phone: '0412312312',
          fax: '31231231',
          streetAddress: '1 Hello Street',
          suburb: 'World',
          state: 'QLD',
          postCode: '4123',
        });
      expect(res.status).toBe(200);
      expect(res.body.message[0].msg).toBe('Your business profile has been created.');
      const business = await Business.findOne({ abn: '60 579 663 101' });
      expect(business!.phone).toBe('0412312312');
      expect(business!.fax).toBe('31231231');
      expect(business!.streetAddress).toBe('1 hello street');
      expect(business!.suburb).toBe('world');
      expect(business!.state).toBe('QLD');
      expect(business!.postCode).toBe('4123');
    });
  });

  describe('PATCH /api/business route', () => {
    let user: string;

    beforeAll(async () => {
      const business = await Business.findOne({ abn: '51 824 753 556' }).exec();
      user = business!.user;
    });

    test('all invalid inputs should return 400 Bad Request', async () => {
      expect.assertions(7);
      const res = await request(app).patch(`/api/business`)
        .send({
          user,
          name: '',
          abn: '',
          phone: '123',
          fax: '123',
          streetAddress: '',
          suburb: '',
          state: 'test',
          postCode: '1234',
        });
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('Name is required.');
      expect(res.body.message[1].msg).toBe('ABN is required.');
      expect(res.body.message[2].msg).toBe('Phone number is invalid.');
      expect(res.body.message[3].msg).toBe('Fax number is invalid.');
      expect(res.body.message[4].msg).toBe('State is invalid.');
      expect(res.body.message[5].msg).toBe('Postcode is invalid.');
    });

    test('invalid ABN should return 400 Bad Request', async () => {
      expect.assertions(2);
      const res = await request(app).patch(`/api/business`)
        .send({
          user,
          name: 'John Doe',
          abn: '123',
        });
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('ABN is invalid.');
    });

    test('partial address should return 400 Bad Request', async () => {
      expect.assertions(4);
      const res = await request(app).patch(`/api/business`)
        .send({
          user,
          name: 'John Doe',
          abn: '51 824 753 556',
          streetAddress: '1 Hello Street',
          suburb: '',
          state: '',
          postCode: '',
        });
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('Suburb is required when entering an address.');
      expect(res.body.message[1].msg).toBe('State is required when entering an address.');
      expect(res.body.message[2].msg).toBe('Postcode is required when entering an address.');
    });

    test('invalid user should return 404 Not Found', async () => {
      expect.assertions(2);
      const res = await request(app).patch(`/api/business`)
        .send({
          user: '',
          name: 'John Doe',
          abn: '51 824 753 556',
        });
      expect(res.status).toBe(404);
      expect(res.body.message[0].msg).toBe('Your business was not found.');
    });

    test('altered ABN should return 400 Bad Request', async () => {
      expect.assertions(2);
      const res = await request(app).patch(`/api/business`)
        .send({
          user,
          name: 'John Doe',
          abn: '50 110 219 460',
        });
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('ABN cannot be altered.');
    });

    test('correct input should return 200 OK', async () => {
      expect.assertions(8);
      const res = await request(app).patch(`/api/business`)
        .send({
          user,
          name: 'John Doe',
          abn: '51 824 753 556',
          phone: '0412312312',
          fax: '31231231',
          streetAddress: '1 Hello Street',
          suburb: 'World',
          state: 'QLD',
          postCode: '4123',
        });
      expect(res.status).toBe(200);
      expect(res.body.message[0].msg).toBe('Your business details have been updated.');
      const business = await Business.findOne({ abn: '51 824 753 556' });
      expect(business!.phone).toBe('0412312312');
      expect(business!.fax).toBe('31231231');
      expect(business!.streetAddress).toBe('1 Hello Street');
      expect(business!.suburb).toBe('World');
      expect(business!.state).toBe('QLD');
      expect(business!.postCode).toBe('4123');
    });
  });

  describe('DELETE /api/business/:id route', () => {
    let user: string;

    beforeAll(async () => {
      const business = await Business.findOne({ abn: '51 824 753 556' }).exec();
      user = business!.user;
    });

    test('invalid user should return 404 Not Found', async () => {
      expect.assertions(2);
      const res = await request(app).delete(`/api/business`)
        .send({
          user: '',
        });
      expect(res.status).toBe(404);
      expect(res.body.message[0].msg).toBe('Your business was not found.');
    });

    test('correct input should return 200 OK', async () => {
      expect.assertions(3);
      const res = await request(app).delete(`/api/business`)
        .send({
          user,
        });
      expect(res.status).toBe(200);
      expect(res.body.message[0].msg).toBe('Your business has been deleted.');
      const business = await Business.findOne({ user });
      expect(business).toBeNull();
    });
  });

  afterAll(async () => {
    await Business.deleteMany({}).exec();
    mongoose.connection.close();
  });
});
