const router = require("express").Router();
const { createCart, updateCart, deleteCart, getUserCart, getAllCart } = require('../controllers/cart.controller');
const { authorization, admin } = require("../middlewares/verifyToken");

const use = fn => (req, res , next) => 
    Promise.resolve(fn(req, res, next)).catch(next);

router.post('/', authorization, use(createCart));
router.put('/:id', authorization, use(updateCart));
router.delete('/:id', authorization, use(deleteCart));
router.get('/find/:userId', authorization, use(getUserCart));
router.get('/', admin, use(getAllCart));

module.exports = router;