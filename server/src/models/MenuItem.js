const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  chef: { type: mongoose.Schema.Types.ObjectId, ref: 'Chef', required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  category: { type: String, default: 'Main Course' },
  dietaryTags: {
    isVeg: { type: Boolean, default: false },
    isNonVeg: { type: Boolean, default: false },
    diabeticFriendly: { type: Boolean, default: false },
    softFood: { type: Boolean, default: false },
    spiceLevel: { type: String, enum: ['mild', 'medium', 'hot', 'extra-hot'], default: 'medium' },
    lowOil: { type: Boolean, default: false },
  },
  isAvailable: { type: Boolean, default: true },
  imageUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
