const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const mongoose = require('mongoose');
const UserModel = require('./models/users');
mongoose.connect("mongodb+srv://luckyskywalker2003:bcblentNTeVagtVC@test-application.7sel4bf.mongodb.net/testappdatabase?retryWrites=true&w=majority&appName=test-application");

app.get('/getUsers', (req, res) => {
    UserModel.find().then(data => {
        res.json(data);
    })
      .catch(error => {
        res.status(500).send(error);
    });
});

app.post('/createUser', async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user);
});

app.listen(3001, () => {
    console.log('server runs on port 3001');
});