const express = require('express');
const orderRouter = express.Router();
const { placeOrder, verifyOrder, userOrders, listOrders, updateState } = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.get('/list', adminAuth, listOrders);
orderRouter.post('/userorders', authMiddleware, userOrders);
orderRouter.post('/status', adminAuth, updateState);
module.exports = orderRouter;
