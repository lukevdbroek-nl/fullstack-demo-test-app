module.exports = (req, res) => {
    const UserModel = require('../models/users.js');

    UserModel.find().then(data => {
        res.json(data);
    })
      .catch(error => {
        res.status(500).send(error);
    });
}
