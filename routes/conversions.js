var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('Need to call to-fahrenheit/temp or to-celsius/temp');
});

router.get('/to-fahrenheit/:temp/', function(req, res) {
    var temp= Number(req.params.temp);
    if(!temp) temp = 0.0;

    var fahr = temp * 9.0 / 5.0 + 32.0;
    var answer = {valueToConvert: temp,
        convertedValue: fahr};

    res.send(answer);
});


router.get('/to-celsius/:temp/', function(req, res) {

    var temp= Number(req.params.temp);
    if(!temp) temp = 0.0;

    var cels = (temp - 32.0) * 5.0 / 9.0;
    var answer = {valueToConvert: temp,
        convertedValue: cels};

    res.send(answer);
});

module.exports = router;