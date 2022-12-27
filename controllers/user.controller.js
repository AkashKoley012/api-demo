const User = require('../models/User');
const CryptoJS = require('crypto-js');

//Update a user
exports.updateUser = async (req, res) => {
    if(req.body.password) req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRECT_KEY);
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        {new: true}
    );
    return res.status(200).json(updatedUser);
};

//Delete a user
exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json('User deleted...');
};

//Get a user
exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    !user && res.status(401).json('Wrong User Id');
    const {password, ...data} = user._doc;
    return res.status(200).json(data);
};