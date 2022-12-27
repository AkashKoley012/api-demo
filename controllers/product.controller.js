const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    return res.status(200).json(savedProduct);
};

exports.updateProduct = async (req, res) => {
    const savedProduct = await Product.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    },{new: true});
    return res.status(200).json(savedProduct);
};

exports.deleteProduct = async (req, res) => {
    await Product.deleteByIdAndUpdate(req.params.id);
    return res.status(200).json("Product deleted...");
};

exports.getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product);
};

exports.getAllProduct = async (req, res) => {
    
    const qNew = req.query.new;
    const qCategory = req.query.category;
    let products;
    if(qNew) products = await Product.find().sort({createAt: -1}).limit(1);
    else if(qCategory) products = await Product.find({
        categories: {
            $in: [qCategory],
        }
    });
    else products = await Product.find();
    return res.status(200).json(products);
};