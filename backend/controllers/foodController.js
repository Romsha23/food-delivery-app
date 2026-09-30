const foodModel = require('../model/foodModel');
const fsPromises = require('fs').promises;
const path = require('path');

const addFood = async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'Image is required' });
  try {
    await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      image: req.file.filename
    });
    res.json({ success: true, message: 'Food added' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding food' });
  }
};
const listFood = async (_req, res) => {
  try {
    res.status(200).json({ success: true, data: await foodModel.find() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching foods' });
  }
};
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.query.id);
    if (!food) return res.status(404).json({ success: false, message: 'Food not found' });
    if (!food.seeded) await fsPromises.unlink(path.join(__dirname, '..', 'uploads', food.image)).catch(() => {});
    await foodModel.deleteOne({ _id: req.query.id });
    res.status(200).json({ success: true, message: 'Food deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting food' });
  }
};
module.exports = { addFood, listFood, removeFood };
