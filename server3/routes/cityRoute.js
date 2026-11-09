let express = require('express');
let router = express.Router();
let controller = require('../controllers/cityController');
let { authenticateToken } = require('../middleware/authMiddleware');
router.get('/', controller.getCities);
router.post('/', controller.createCity);
router.put('/:id', controller.updateCity);
router.delete('/:id',authenticateToken, controller.deleteCity);

module.exports = router;