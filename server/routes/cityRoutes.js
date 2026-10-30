let express = require('express');
let router = express.Router();
let { getCites, createCity, updateCity, deleteCity, getCityById } = require('../controllers/cityController');

router.get('/', getCites);
router.post('/', createCity);
router.put('/:id', updateCity);
router.delete('/:id', deleteCity);
router.get('/:id', getCityById);

module.exports = router;