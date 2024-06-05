module.exports =async (req, res) => {
    const UserModel = require('../models/users.js');

    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user);
}
