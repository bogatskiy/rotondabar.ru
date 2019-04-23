let mongoose = require('mongoose');

module.exports = mongoose.model('User',{
  id: String,
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  isAdmin: {
    type: Boolean,
    default: false
  }
});