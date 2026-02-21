const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Chef = require('../models/Chef');
const { protect, requireRole } = require('../middleware/auth');

// POST /api/orders
router.post('/', protect, requireRole('customer', 'caregiver'), async (req, res, next) => {
  try {
    const { chefId, items, deliveryAddress, paymentMethod, notes } = req.body;
    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = await Order.create({
      customer: req.user._id,
      chef: chefId,
      items,
      totalAmount,
      deliveryAddress,
      paymentMethod: paymentMethod || 'COD',
      notes,
    });

    await Chef.findByIdAndUpdate(chefId, { $inc: { totalOrders: 1 } });
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/my
router.get('/my', protect, async (req, res, next) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .populate('chef', 'kitchenName')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/chef
router.get('/chef', protect, requireRole('chef'), async (req, res, next) => {
  try {
    const chef = await Chef.findOne({ user: req.user._id });
    if (!chef) return res.status(404).json({ message: 'Chef profile not found' });

    const orders = await Order.find({ chef: chef._id })
      .populate('customer', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// PUT /api/orders/:id/status
router.put('/:id/status', protect, requireRole('chef', 'admin'), async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const validStatuses = ['Placed', 'Accepted', 'Cooking', 'OutForDelivery', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(req.body.status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    order.status = req.body.status;
    await order.save();
    res.json(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
