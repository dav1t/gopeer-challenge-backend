const { User, validate } = require("../models/user.model");

module.exports = class UserController {
    async getUser(id) {
        return User.find(id).select('-password');
    }
    
    async registerUser(user) {
        const { error } = validate(user);
        if (error) throw new Error(error.details[0].message);
      
        let user = await User.findOne({ name: user.name });
        if (user) throw new Error("User already registered.");
      
        user = new User({
          name: user.name,
          password: user.password
        });

        await user.save();
        return user;
    }
}