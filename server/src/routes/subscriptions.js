const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const { protect, requireRole } = require('../middleware/auth');

// POST /api/subscriptions
router.post('/', protect, requireRole('caregiver'), async (req, res, next) => {
  try {
    const { chefId, recipientName, recipientPhone, deliveryAddress, plan, daysOfWeek, mealsPerDay, dietaryConstraints, startDate, endDate } = req.body;
    const sub = await Subscription.create({
      caregiver: req.user._id,
      chef: chefId,
      recipientName,
      recipientPhone,
      deliveryAddress,
      plan,
      daysOfWeek,
      mealsPerDay,
      dietaryConstraints,
      startDate,
      endDate,
    });
    res.status(201).json(sub);
  } catch (err) {
    next(err);
  }
});

// GET /api/subscriptions/my
router.get('/my', protect, async (req, res, next) => {
  try {
    const subs = await Subscription.find({ caregiver: req.user._id })
      .populate('chef', 'kitchenName')
      .sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) {
    next(err);
  }
});

// PUT /api/subscriptions/:id/pause
router.put('/:id/pause', protect, async (req, res, next) => {
  try {
    const sub = await Subscription.findOne({ _id: req.params.id, caregiver: req.user._id });
    if (!sub) return res.status(404).json({ message: 'Subscription not found' });
    sub.status = 'paused';
    await sub.save();
    res.json(sub);
  } catch (err) {
    next(err);
  }
});

// PUT /api/subscriptions/:id/cancel
router.put('/:id/cancel', protect, async (req, res, next) => {
  try {
    const sub = await Subscription.findOne({ _id: req.params.id, caregiver: req.user._id });
    if (!sub) return res.status(404).json({ message: 'Subscription not found' });
    sub.status = 'cancelled';
    await sub.save();
    res.json(sub);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
