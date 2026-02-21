const express = require('express');
const router = express.Router();
const Chef = require('../models/Chef');
const MenuItem = require('../models/MenuItem');
const { protect, requireRole } = require('../middleware/auth');
const { getDistanceKm } = require('../utils/haversine');

// GET /api/chefs
router.get('/', async (req, res, next) => {
  try {
    const { lat, lng, maxRange } = req.query;
    let chefs = await Chef.find({ verificationStatus: 'approved' }).populate('user', 'name email');

    if (lat && lng) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);
      const range = maxRange ? parseFloat(maxRange) : 50;

      chefs = chefs
        .filter((c) => {
          if (!c.location || c.location.lat == null || c.location.lng == null) return true;
          const dist = getDistanceKm(userLat, userLng, c.location.lat, c.location.lng);
          return dist <= range;
        })
        .map((c) => {
          const dist =
            c.location && c.location.lat != null
              ? getDistanceKm(userLat, userLng, c.location.lat, c.location.lng)
              : null;
          return { ...c.toObject(), distanceKm: dist };
        })
        .sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
    }

    res.json(chefs);
  } catch (err) {
    next(err);
  }
});

// GET /api/chefs/:id
router.get('/:id', async (req, res, next) => {
  try {
    const chef = await Chef.findById(req.params.id).populate('user', 'name email');
    if (!chef) return res.status(404).json({ message: 'Chef not found' });
    const menuItems = await MenuItem.find({ chef: chef._id, isAvailable: true });
    res.json({ chef, menuItems });
  } catch (err) {
    next(err);
  }
});

// POST /api/chefs/profile
router.post('/profile', protect, requireRole('chef'), async (req, res, next) => {
  try {
    const existing = await Chef.findOne({ user: req.user._id });
    if (existing) return res.status(400).json({ message: 'Chef profile already exists' });

    const { kitchenName, bio, cuisines, serviceRadiusKm, location } = req.body;
    const chef = await Chef.create({
      user: req.user._id,
      kitchenName,
      bio,
      cuisines,
      serviceRadiusKm,
      location,
    });
    res.status(201).json(chef);
  } catch (err) {
    next(err);
  }
});

// PUT /api/chefs/profile
router.put('/profile', protect, requireRole('chef'), async (req, res, next) => {
  try {
    const chef = await Chef.findOne({ user: req.user._id });
    if (!chef) return res.status(404).json({ message: 'Chef profile not found' });

    const { kitchenName, bio, cuisines, serviceRadiusKm, location } = req.body;
    if (kitchenName !== undefined) chef.kitchenName = kitchenName;
    if (bio !== undefined) chef.bio = bio;
    if (cuisines !== undefined) chef.cuisines = cuisines;
    if (serviceRadiusKm !== undefined) chef.serviceRadiusKm = serviceRadiusKm;
    if (location !== undefined) chef.location = location;

    await chef.save();
    res.json(chef);
  } catch (err) {
    next(err);
  }
});

// POST /api/chefs/verification
router.post('/verification', protect, requireRole('chef'), async (req, res, next) => {
  try {
    const chef = await Chef.findOne({ user: req.user._id });
    if (!chef) return res.status(404).json({ message: 'Chef profile not found' });

    chef.verificationVideoUrl = req.body.verificationVideoUrl;
    chef.verificationStatus = 'pending';
    await chef.save();
    res.json({ message: 'Verification submitted', chef });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
