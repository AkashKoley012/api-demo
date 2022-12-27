const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    const order = new Order(req.body);
    const savedOrder = order.save();
    return res.status(201).json(savedOrder);
};

exports.updateOrder = async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        {new: true}
    );
    return res.status(201).json(order);
};

exports.deleteOrder = async (req, res) => {
    await Order.findByIdAndDelete(req.params.id);
    return res.status(204).json("Order deleted...");
};

exports.getUserOrder = async (req, res) => {
    const orders = await Order.find({userId: req.params.userId});
    return res.status(200).json(orders);
};

exports.getAllOrder = async (req, res) => {
    const orders = await Order.find();
    return res.status(200).json(orders);
};

exports.getIncome = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(lastMonth.getMonth(lastMonth.getMonth() - 1));

    const income = await Order.aggregate([
        {
            $match :{
                createdAt: {
                    $get: previousMonth
                }
            }
        },
        {
            $project: {
                month: {
                    $month: "$createdAt"
                },
                sales: "$amount"
            }
        },
        {
            $group: {
                _id: "$month",
                total: {
                    $sum: "$sales"
                }
            }
        }
    ]);
    return res.status(200).json(income);
};