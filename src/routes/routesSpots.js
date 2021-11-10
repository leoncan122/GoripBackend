const express = require('express');
const {addSpot, getSpot, getSpotsAroundMe} = require('../controllers/addSpot.controller')

const router = express.Router();

router.post('/', addSpot);
router.get('/:id', getSpot)
router.get('/get/:pc', getSpotsAroundMe)


module.exports = router;