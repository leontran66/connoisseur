import mongoose, { Schema } from 'mongoose';
import request from 'supertest';
import app from '../src/app';
import { Business } from '../src/models/Business';
import { Menu } from '../src/models/Menu';
import { MONGODB_URI } from '../src/config/secrets';

describe('the menu route', () => {
  beforeAll(async () => {
    mongoose.connect(MONGODB_URI!.toString(), {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    await Business.create({
      user: process.env.AUTH0_USER_ID!,
      name: 'John Smith',
      abn: '60579663101',
    });

    await Business.create({
      user: 'test2',
      name: 'Leon Tran',
      abn: '51824753556',
    })
  });

  describe('GET /api/menu/:id route', () => {
    let menuID: Schema.Types.ObjectId;

    beforeAll(async () => {
      await request(app).post('/api/menu')
        .send({
          user: process.env.AUTH0_USER_ID!,
          name: 'Teriyaki Steak Bowl',
          category: 'Main',
          options: ['Large', 'Regular', 'Small'],
          description: 'Test',
          spicy: false,
          vegetarian: false,
          vegan: false,
          price: '12.45',
        });
      const menu = await Menu.findOne({ name: 'teriyaki steak bowl' }).exec();
      menuID = menu!._id;
    });

    test('invalid id should return 400 Bad Request', async () => {
      expect.assertions(2);
      const res = await request(app).get('/api/menu/123');
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('That ID is not valid.');
    });

    test('invalid id should return 400 Bad Request', async () => {
      expect.assertions(2);
      const res = await request(app).get(`/api/menu/${mongoose.Types.ObjectId()}`);
      expect(res.status).toBe(404);
      expect(res.body.message[0].msg).toBe('The menu item you are looking for does not exist.');
    });

    test('correct input should return 200 OK', async () => {
      expect.assertions(2);
      const res = await request(app).get(`/api/menu/${menuID}`);
      expect(res.status).toBe(200);
      expect(res.body.menu.name).toBe('teriyaki steak bowl');
    });
  });

  describe('POST /api/menu route', () => {
    test('all invalid inputs should return 400 Bad Request', async () => {
      expect.assertions(6);
      const res = await request(app).post('/api/menu')
        .send({
          user: process.env.AUTH0_USER_ID!,
          name: '',
          category: '',
          options: [],
          price: 'test',
        });
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('Name is required.');
      expect(res.body.message[1].msg).toBe('Category is required.');
      expect(res.body.message[2].msg).toBe('Invalid value');
      expect(res.body.message[3].msg).toBe('Invalid value');
      expect(res.body.message[4].msg).toBe('Price is invalid.');
    });

    test('non-existent business should return 400 Bad Request', async () => {
      expect.assertions(2);
      const res = await request(app).post('/api/menu')
        .send({
          user: 'test',
          name: 'Teriyaki Chicken Bowl',
          category: 'Main',
          options: ['Large', 'Regular', 'Small'],
          description: 'Test',
          spicy: false,
          vegetarian: false,
          vegan: false,
          price: '12.45',
        });
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('You do not have a business.');
    });

    test('correct input should return 200 OK', async () => {
      expect.assertions(4);
      const res = await request(app).post('/api/menu')
        .send({
          user: process.env.AUTH0_USER_ID!,
          name: 'Teriyaki Chicken Bowl',
          category: 'Main',
          options: ['Large', 'Regular', 'Small'],
          description: 'Test',
          spicy: false,
          vegetarian: false,
          vegan: false,
          price: '12.45',
        });
      expect(res.status).toBe(200);
      expect(res.body.message[0].msg).toBe('Menu item has been created.');
      const menu = await Menu.findOne({ name: 'teriyaki chicken bowl' });
      expect(menu).not.toBeNull();
      const business = await Business.findOne({ menu: { $in: [menu!._id] }});
      expect(business).not.toBeNull();
    });
  });

  describe('PATCH /api/menu/:id route', () => {
    let menuID: Schema.Types.ObjectId;

    beforeAll(async () => {
      const menu = await Menu.findOne({}).exec();
      menuID = menu!._id;
    });

    test('invalid id should return 400 Bad Request', async () => {
      expect.assertions(2);
      const res = await request(app).patch('/api/menu/123');
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('That ID is invalid.');
    });

    test('all invalid inputs should return 400 Bad Request', async () => {
      expect.assertions(6);
      const res = await request(app).patch(`/api/menu/${menuID}`)
        .send({
          user: process.env.AUTH0_USER_ID!,
          name: '',
          category: '',
          options: [],
          price: 'test',
        });
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('Name is required.');
      expect(res.body.message[1].msg).toBe('Category is required.');
      expect(res.body.message[2].msg).toBe('Invalid value');
      expect(res.body.message[3].msg).toBe('Invalid value');
      expect(res.body.message[4].msg).toBe('Price is invalid.');
    });

    test('id of non-existent menu should return 404 Not Found', async () => {
      expect.assertions(2);
      const res = await request(app).patch(`/api/menu/${mongoose.Types.ObjectId()}`)
        .send({
          user: process.env.AUTH0_USER_ID!,
          name: 'Teriyaki Chicken Bowl',
          category: 'Main',
          spicy: false,
          vegetarian: false,
          vegan: false,
        });
      expect(res.status).toBe(404);
      expect(res.body.message[0].msg).toBe('That menu item was not found.');
    });

    test('non-existent business should return 400 Bad Request', async () => {
      expect.assertions(2);
      const res = await request(app).patch(`/api/menu/${menuID}`)
        .send({
          user: 'test',
          name: 'Teriyaki Chicken Salad',
          category: 'Main',
          spicy: false,
          vegetarian: false,
          vegan: false,
        });
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('You do not have a business.');
    });

    test('business not owned by user should return 401 Unauthorized', async () => {
      expect.assertions(2);
      const res = await request(app).patch(`/api/menu/${menuID}`)
        .send({
          user: 'test2',
          name: 'Teriyaki Chicken Salad',
          category: 'Main',
          spicy: false,
          vegetarian: false,
          vegan: false,
        });
      expect(res.status).toBe(401);
      expect(res.body.message[0].msg).toBe('You are not authorized to update a menu item on this business.');
    });

    test('correct input should return 200 OK', async () => {
      expect.assertions(3);
      const res = await request(app).patch(`/api/menu/${menuID}`)
        .send({
          user: process.env.AUTH0_USER_ID!,
          name: 'Teriyaki Chicken Salad',
          category: 'Main',
          spicy: false,
          vegetarian: false,
          vegan: false,
        });
      expect(res.status).toBe(200);
      expect(res.body.message[0].msg).toBe('Menu item has been updated.');
      const menu = await Menu.findOne({ name: 'Teriyaki Chicken Salad' });
      expect(menu).not.toBeNull();
    });
  });

  describe('DELETE /api/menu/:id route', () => {
    let businessID: Schema.Types.ObjectId, menuID: Schema.Types.ObjectId;

    beforeAll(async () => {
      const menu = await Menu.findOne({}).exec();
      menuID = menu!._id;

      const business = await Business.findOne({ menu: { $in: [menuID] }});
      businessID = business!._id;
    });

    test('invalid id should return 400 Bad Request', async () => {
      expect.assertions(2);
      const res = await request(app).delete('/api/menu/123')
        .send({
          user: process.env.AUTH0_USER_ID!,
        });
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('That ID is invalid.');
    });

    test('id of non-existent menu should return 404 Not Found', async () => {
      expect.assertions(2);
      const res = await request(app).delete(`/api/menu/${mongoose.Types.ObjectId()}`)
        .send({
          user: process.env.AUTH0_USER_ID!,
        });
      expect(res.status).toBe(404);
      expect(res.body.message[0].msg).toBe('That menu item was not found.');
    });

    test('non-existent business should return 400 Bad Request', async () => {
      expect.assertions(2);
      const res = await request(app).delete(`/api/menu/${menuID}`)
        .send({
          user: 'test',
        });
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('You do not have a business.');
    });

    test('business not owned by user should return 401 Unauthorized', async () => {
      expect.assertions(2);
      const res = await request(app).delete(`/api/menu/${menuID}`)
        .send({
          user: 'test2',
        });
      expect(res.status).toBe(401);
      expect(res.body.message[0].msg).toBe('You are not authorized to delete a menu item on this business.');
    });

    test('correct input should return 200 OK', async () => {
      expect.assertions(4);
      const res = await request(app).delete(`/api/menu/${menuID}`)
        .send({
          user: process.env.AUTH0_USER_ID!,
        });
      expect(res.status).toBe(200);
      expect(res.body.message[0].msg).toBe('Menu item has been deleted.');
      const menu = await Menu.findById(menuID);
      expect(menu).toBeNull();
      const business = await Business.findOne({ menu: { $in: [menuID] } });
      expect(business).toBeNull();
    });
  });

  afterAll(async () => {
    await Business.deleteMany({}).exec();
    await Menu.deleteMany({}).exec();
    mongoose.connection.close();
  });
});
