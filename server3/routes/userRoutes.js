let express = require('express');
let router = express.Router();
let controller = require('../controllers/userController');

router.get('/', controller.getUsers);
router.post('/register', controller.register);
router.post('/login', controller.login);

module.exports = router;