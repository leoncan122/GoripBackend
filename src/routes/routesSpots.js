const express = require('express');
const {addSpot, getSpot} = require('../controllers/addSpot.controller')

const router = express.Router();

router.post('/', addSpot);
router.get('/:id', getSpot)

module.exports = router;