const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  caregiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  chef: { type: mongoose.Schema.Types.ObjectId, ref: 'Chef', required: true },
  recipientName: { type: String, required: true },
  recipientPhone: { type: String, required: true },
  deliveryAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    lat: { type: Number },
    lng: { type: Number },
  },
  plan: { type: String, enum: ['weekly', 'monthly'], required: true },
  daysOfWeek: [{ type: String }],
  mealsPerDay: { type: Number, default: 1 },
  dietaryConstraints: [{ type: String }],
  status: { type: String, enum: ['active', 'paused', 'cancelled'], default: 'active' },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
