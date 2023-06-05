const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      console.log('Original Password:', this.password);
      console.log('Hashed Password:', hashedPassword);
      this.password = hashedPassword;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

userSchema.methods.checkPassword = async function (password) {
  try {
    console.log('Entered Password:', password);
    console.log('Stored Password:', this.password);
    const isPasswordValid = await bcrypt.compare(password, this.password);
    console.log('Is Password Valid:', isPasswordValid);
    return isPasswordValid;
  } catch (err) {
    throw new Error(err);
  }
};

const User = model('User', userSchema);

module.exports = User;
