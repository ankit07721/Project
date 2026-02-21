const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const Chef = require('../models/Chef');
const { protect, requireRole } = require('../middleware/auth');

// GET /api/menu/:chefId
router.get('/:chefId', async (req, res, next) => {
  try {
    const items = await MenuItem.find({ chef: req.params.chefId });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// POST /api/menu
router.post('/', protect, requireRole('chef'), async (req, res, next) => {
  try {
    const chef = await Chef.findOne({ user: req.user._id });
    if (!chef) return res.status(404).json({ message: 'Chef profile not found' });

    const { name, description, price, category, dietaryTags, imageUrl } = req.body;
    const item = await MenuItem.create({ chef: chef._id, name, description, price, category, dietaryTags, imageUrl });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

// PUT /api/menu/:id
router.put('/:id', protect, requireRole('chef'), async (req, res, next) => {
  try {
    const chef = await Chef.findOne({ user: req.user._id });
    if (!chef) return res.status(404).json({ message: 'Chef profile not found' });

    const item = await MenuItem.findOne({ _id: req.params.id, chef: chef._id });
    if (!item) return res.status(404).json({ message: 'Menu item not found' });

    Object.assign(item, req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/menu/:id
router.delete('/:id', protect, requireRole('chef'), async (req, res, next) => {
  try {
    const chef = await Chef.findOne({ user: req.user._id });
    if (!chef) return res.status(404).json({ message: 'Chef profile not found' });

    const item = await MenuItem.findOneAndDelete({ _id: req.params.id, chef: chef._id });
    if (!item) return res.status(404).json({ message: 'Menu item not found' });

    res.json({ message: 'Menu item deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
