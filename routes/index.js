var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res) {

    var host = (req.hostname == "127.0.0.1" ? "us-central1-doug-rehnstrom.cloudfunctions.net" : req.hostname);
    var model = {
        title: 'Converter',
        value: '-40',
        answer: '-40',
        location: host
    };
    res.render('index', model);
});


router.post('/', function(req, res) {
    var valueToConvert = req.body.valuetoconvert;
    var whichFunction;

    if (req.body.conversion === 'Celsius') {
        whichFunction = 'to-celsius';
    }
    else {
        whichFunction = 'to-fahrenheit';
    }
    var host = (req.hostname == "127.0.0.1" ? "us-central1-doug-rehnstrom.cloudfunctions.net" : req.hostname);
    var URL = "https://" + host + "/converter/api/conversions/";

    request.get({ url: URL + whichFunction + "/" + valueToConvert },
        function(error, response, body) {
            if (!error && response.statusCode === 200) {

                var data = JSON.parse(body);

                var model = {
                    title: 'Converter',
                    value: data.valueToConvert,
                    answer: data.convertedValue
                };
                res.render('index', model);
            }
        });
});

module.exports = router;
