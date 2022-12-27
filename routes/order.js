const router = require('express').Router();
const { createOrder, updateOrder, deleteOrder, getUserOrder, getAllOrder, getIncome } = require('../controllers/order.controller');
const { verifyToken, admin, authorization } = require('../middlewares/verifyToken');

const use = fn => (req, res , next) => 
    Promise.resolve(fn(req, res, next)).catch(next);

router.post('/', verifyToken, use(createOrder));
router.put('/:id', admin, use(updateOrder));
router.delete('/:id', admin, use(deleteOrder));
router.get('/find/:id', authorization, use(getUserOrder));
router.get('/', admin, use(getAllOrder));
router.get('/income',admin, use(getIncome));

module.exports = router;