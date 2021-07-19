const { User, validate } = require("../models/user.model");

class UserController {
    async getUser(id) {
        return User.find(id).select('-password');
    }
    
    async registerUser(user) {
        const { error } = validate(user);
        if (error) throw new Error(error.details[0].message);
      
        let existingUser = await User.findOne({ name: user.name });
        if (existingUser) throw new Error("User already registered.");
      
        user = new User({
          name: user.name,
          password: user.password
        });

        await user.save();
        return user;
    }
}

module.exports = UserController;
