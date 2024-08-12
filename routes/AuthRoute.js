const router = require('express').Router();
const AuthCtrl = require('../controllers/AuthCtrl');

router.post('/singIn', AuthCtrl.SingIn);
router.get('/logout', AuthCtrl.logOut);

module.exports = router;