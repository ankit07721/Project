const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  kitchenName: { type: String, required: true, trim: true },
  bio: { type: String, default: '' },
  cuisines: [{ type: String }],
  serviceRadiusKm: { type: Number, default: 10 },
  location: {
    lat: { type: Number },
    lng: { type: Number },
    address: { type: String },
  },
  verificationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  verificationVideoUrl: { type: String, default: '' },
  isVerified: { type: Boolean, default: false },
  avgRating: { type: Number, default: 0 },
  totalOrders: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chef', chefSchema);
