const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//Create a new User object
exports.register = async (req, res) => {
    if(req.body.password) req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRECT_KEY);
    const newUser = new User(req.body);
    const saveUser = await newUser.save();
    return res.status(200).json(saveUser);
};

//Login a user
exports.login = async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if(!user) return res.status(401).json({error: {message: "Wrong User Name"}});

    const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.SECRECT_KEY);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if(originalPassword != req.body.password) return res.status(401).json({error: {message: "Wrong Password"}});

    const accessToken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin,
    },
    process.env.SECRECT_KEY,
        {expiresIn:"3d"}
    );
  
    const { password, ...others } = user._doc;  
    return res.status(200).json({...others, accessToken});

};