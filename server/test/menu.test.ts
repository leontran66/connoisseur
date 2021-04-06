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
      name: 'John Smith',
      abn: '60579663101',
    });
  });

  describe('POST /api/menu route', () => {
    test('all invalid inputs should return 400 Bad Request', async () => {
      expect.assertions(7);
      const res = await request(app).post('/api/menu')
        .send({
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
      expect(res.body.message[4].msg).toBe('Invalid value');
      expect(res.body.message[5].msg).toBe('Price is invalid.');
    });

    test('correct input should return 200 OK', async () => {
      expect.assertions(3);
      const res = await request(app).post('/api/menu')
        .send({
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
      expect.assertions(7);
      const res = await request(app).patch(`/api/menu/${menuID}`)
        .send({
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
      expect(res.body.message[4].msg).toBe('Invalid value');
      expect(res.body.message[5].msg).toBe('Price is invalid.');
    });

    test('id of non-existent menu should return 404 Not Found', async () => {
      expect.assertions(2);
      const res = await request(app).patch(`/api/menu/${mongoose.Types.ObjectId()}`)
        .send({
          name: 'Teriyaki Chicken Bowl',
          category: 'Main',
          spicy: false,
          vegetarian: false,
          vegan: false,
        });
      expect(res.status).toBe(404);
      expect(res.body.message[0].msg).toBe('That menu item was not found.');
    });

    test('correct input should return 200 OK', async () => {
      expect.assertions(2);
      const res = await request(app).patch(`/api/menu/${menuID}`)
        .send({
          name: 'Teriyaki Chicken Salad',
          category: 'Main',
          spicy: false,
          vegetarian: false,
          vegan: false,
        });
      expect(res.status).toBe(200);
      expect(res.body.message[0].msg).toBe('Menu item has been updated.');
    });
  });

  describe('DELETE /api/menu/:id route', () => {
    let menuID: Schema.Types.ObjectId;

    beforeAll(async () => {
      const menu = await Menu.findOne({}).exec();
      menuID = menu!._id;
    });

    test('invalid id should return 400 Bad Request', async () => {
      expect.assertions(2);
      const res = await request(app).delete('/api/menu/123');
      expect(res.status).toBe(400);
      expect(res.body.message[0].msg).toBe('That ID is invalid.');
    });

    test('id of non-existent menu should return 404 Not Found', async () => {
      expect.assertions(2);
      const res = await request(app).delete(`/api/menu/${mongoose.Types.ObjectId()}`);
      expect(res.status).toBe(404);
      expect(res.body.message[0].msg).toBe('That menu item was not found.');
    });

    test('correct input should return 200 OK', async () => {
      expect.assertions(3);
      const res = await request(app).delete(`/api/menu/${menuID}`);
      expect(res.status).toBe(200);
      expect(res.body.message[0].msg).toBe('Menu item has been deleted.');
      const menu = await Menu.findById(menuID);
      expect(menu).toBeNull();
    });
  });

  afterAll(async () => {
    await Business.deleteMany({}).exec();
    await Menu.deleteMany({}).exec();
    mongoose.connection.close();
  });
});
