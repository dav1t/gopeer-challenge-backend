const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
var SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  }
}, {timestamps: true});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
     
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

//Generates authToken 
UserSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAuthenticated: true }, process.env.ACCESS_SECRET_TOKEN);
  return token;
}

const User = mongoose.model('User', UserSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).max(255).required()
  });

  return schema.validate(user);
}

exports.User = User; 
exports.validate = validateUser;