const express = require('express');
const router = express.Router();
const Chef = require('../models/Chef');
const { protect, requireRole } = require('../middleware/auth');

// GET /api/admin/verifications
router.get('/verifications', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const chefs = await Chef.find({ verificationStatus: 'pending' }).populate('user', 'name email');
    res.json(chefs);
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/verifications/:chefId
router.put('/verifications/:chefId', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const { action } = req.body;
    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({ message: 'Action must be approve or reject' });
    }
    const chef = await Chef.findById(req.params.chefId);
    if (!chef) return res.status(404).json({ message: 'Chef not found' });

    chef.verificationStatus = action === 'approve' ? 'approved' : 'rejected';
    chef.isVerified = action === 'approve';
    await chef.save();
    res.json({ message: `Chef ${action}d successfully`, chef });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
