const router = require('express').Router();
const { updateUser, deleteUser, getUser } = require('../controllers/user.controller');
const { authorization, admin } = require('../middlewares/verifyToken');

const use = fn => (req, res , next) => 
    Promise.resolve(fn(req, res, next)).catch(next);

router.put('/:id', authorization, use(updateUser));
router.delete('/:id', authorization, use(deleteUser));
router.get('/find/:id', admin, use(getUser));

module.exports = router;