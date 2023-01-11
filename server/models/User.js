const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Order = require('./Order');

const userSchema = new Schema({
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    isSeller: {
      type: Boolean,
      required: true,
      default: false,
    },
    
  });
// pre hashing password
  userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
//  check password middware
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  


const User = model('User', userSchema);

module.exports = User;
