const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');




router.post('/register', userCtrl.register);

router.post('/login', userCtrl.login);

router.get('/logout', userCtrl.logout);

router.get('/refresh_token', userCtrl.refreshToken);

// user auth
router.get('/infor', auth, userCtrl.getUser);

// after buy products of cart page should not be deleted if page refresh
router.patch('/addcart', auth, userCtrl.addCart);

// to get cart history
router.get('/history', auth, userCtrl.history);

module.exports = router;