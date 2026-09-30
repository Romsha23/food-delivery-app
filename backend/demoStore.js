const { randomUUID } = require('crypto');
const seedFoods = require('./data/foodSeed.json');

const collections = {
  foods: seedFoods.map((food) => ({ ...food })),
  users: [],
  orders: [],
};
const clone = (value) => value == null ? value : JSON.parse(JSON.stringify(value));
const matches = (record, query = {}) =>
  Object.entries(query).every(([key, value]) => record[key] === value);

function modelFor(collection) {
  const records = collections[collection];
  return {
    async find(query = {}) {
      return records.filter((record) => matches(record, query)).map(clone);
    },
    async findOne(query = {}) {
      return clone(records.find((record) => matches(record, query)) || null);
    },
    async findById(id) {
      return clone(records.find((record) => record._id === String(id)) || null);
    },
    async create(data) {
      const record = { ...clone(data), _id: String(data._id || randomUUID()) };
      if (collection === 'users') record.cartData ||= {};
      if (collection === 'orders') {
        record.status ||= 'Food processing';
        record.date ||= new Date().toISOString();
        record.payment ||= 'Cash on delivery';
      }
      records.push(record);
      return clone(record);
    },
    async findByIdAndUpdate(id, update) {
      const record = records.find((item) => item._id === String(id));
      if (!record) return null;
      Object.assign(record, clone(update.$set || update));
      return clone(record);
    },
    async deleteOne(query = {}) {
      const index = records.findIndex((record) => matches(record, query));
      if (index < 0) return { deletedCount: 0 };
      records.splice(index, 1);
      return { deletedCount: 1 };
    },
    async findByIdAndDelete(id) {
      const index = records.findIndex((record) => record._id === String(id));
      if (index < 0) return null;
      return clone(records.splice(index, 1)[0]);
    },
  };
}
module.exports = {
  foodModel: modelFor('foods'),
  userModel: modelFor('users'),
  orderModel: modelFor('orders'),
};
