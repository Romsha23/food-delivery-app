const orderModel = require('../model/orderModel');
const userModel = require('../model/userModel');

const placeOrder = async (req, res) => {
  try {
    if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Your cart is empty' });
    }
    const order = await orderModel.create({
      userId: req.body.userId,
      items: req.body.items,
      amount: Number(req.body.amount),
      address: req.body.address,
      payment: 'Cash on delivery'
    });
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    res.status(201).json({ success: true, orderId: order._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Could not place order' });
  }
};
const verifyOrder = async (_req, res) => res.json({ success: true, message: 'Order placed with cash on delivery' });
const userOrders = async (req, res) => {
  try {
    res.json({ success: true, data: await orderModel.find({ userId: req.body.userId }) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Could not fetch orders' });
  }
};
const listOrders = async (_req, res) => {
  try {
    res.json({ success: true, data: await orderModel.find() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Could not fetch orders' });
  }
};
const updateState = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: 'Order status updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Could not update order' });
  }
};
module.exports = { placeOrder, verifyOrder, userOrders, listOrders, updateState };
