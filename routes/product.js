const router = require('express').Router();
const { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } = require('../controllers/product.controller');
const { authorization, admin, verifyToken } = require('../middlewares/verifyToken');

const use = fn => (req, res , next) => 
    Promise.resolve(fn(req, res, next)).catch(next);

router.post('/', admin, use(createProduct));
router.put('/:id', admin, use(updateProduct));
router.delete('/:id', admin, use(deleteProduct));
router.get('/find/:id', use(getProduct));
router.get('/', use(getAllProduct));

module.exports = router;