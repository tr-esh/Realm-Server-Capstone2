const express = require('express')
// const { fetchTemp, fetchTurbidity, fetchph, fetchParameters, getHourlyMean, fetchAbnormalParameters} = require('../controllers/gettersController');

const router = express.Router()

//for testing
router.get('/api', function(req, res){
    res.send("hello po");
});



module.exports = router 