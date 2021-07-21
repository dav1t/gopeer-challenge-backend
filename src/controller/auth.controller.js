const { User } = require("../models/user.model");

class AuthController {
    async authUser(user) {
        const foundUser = await User.findOne({name: user.name});

        const isMatch = foundUser.comparePassword(user.password);
        if(!isMatch) throw new Error('Wrong password');

        return foundUser.generateAuthToken()
        
    }
}

module.exports = AuthController;