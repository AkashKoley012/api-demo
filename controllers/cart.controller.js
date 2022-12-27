const Cart = require('../models/Cart');

exports.createCart = async (req, res) => {
    const cart = new Cart(req.body);
    const savedCart = cart.save();
    return res.status(200).json(savedCart);
};

exports.updateCart = async (req, res) => {
    const cart = await Cart.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        {new: true}
    );
    return res.status(200).json(cart);
};

exports.deleteCart = async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id);
    return res.status(200).json("Cart deleted...");
};

exports.getUserCart = async (req, res) => {
    const cart = await Cart.findOne({userId: req.params.userId});
    return res.status(200).json(cart);
};

exports.getAllCart = async (req,res) => {
    const cart = await Cart.find();
    return res.status(200).json(cart);
};