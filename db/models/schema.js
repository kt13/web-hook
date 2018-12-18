const mongoose = require('mongoose');

// ===== Define UserSchema & UserModel =====
const webSchema = new mongoose.Schema({
  details: { type: Object},
//   name: { type: String, required: true, unique: true },
});

// Customize output for `res.json(data)`, `console.log(data)` etc.
webSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  versionKey: false,  // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
    delete ret.password;
  }
});

module.exports = mongoose.model('Website', webSchema);