const router = require('express').Router();
const {register, login} = require('../controllers/auth.controller');

const use = fn => (req, res , next) => 
    Promise.resolve(fn(req, res, next)).catch(next);

router.post('/register', use(register));
router.post('/login', use(login));

module.exports = router;