const express = require('express');
const path = require('path');
const foodRouter = express.Router();
const { addFood, listFood, removeFood } = require('../controllers/foodController');
const adminAuth = require('../middleware/adminAuth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (_req, file, cb) => cb(null, Date.now() + '-' + path.basename(file.originalname))
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
foodRouter.post('/add', adminAuth, upload.single('image'), addFood);
foodRouter.get('/list', listFood);
foodRouter.delete('/remove', adminAuth, removeFood);
module.exports = foodRouter;
