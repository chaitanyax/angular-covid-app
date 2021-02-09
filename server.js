const express = require("express");
var request = require('request');
var cheerio = require('cheerio');
const extractDomain = require('extract-domain');
var cors = require('cors');
var app = express();
app.use(cors());
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// serve static files from the `public` folder
app.use(express.static(__dirname + "/dist"));

// Restful API to get the home page
app.get('/', function(req, res){
	res.sendfile('/dist/index.html');
});

app.get('/home', function(req, res){
	res.redirect('/');
});

app.get('/charts', function(req, res){
	res.redirect('/');
});

app.get('/updates', function(req, res){
	res.redirect('/');
});

app.get("/getUrls", (req, res) => {
    var queryUrl = req.query.url;
    var siteUrls = [];
    var error = "";
    if (queryUrl) {
        request(queryUrl, function (err, resp, body) {
            if (body) {
                $ = cheerio.load(body);
                var domain = extractDomain(queryUrl);
                links = $('a');
                $(links).each(function (i, link) {
                    var urlValues = $(link).attr('href');
                    var prefix = "https://www."
                    siteUrls.push({
                        url: urlValues.includes(domain) || urlValues.includes('www') || urlValues.includes('http') ? urlValues : prefix + domain + urlValues,
                        id: i,
                        title: $(link).text()
                    });
                });
            } else {
                error = err;
            }
            res.json({
                url: siteUrls,
                status: 200,
                error: error
            });
        });
    } else {
        res.json({
            url: siteUrls,
            status: 200,
            error: "URL param is not defined"
        });
    }
});

app.get("/getImages", (req, res) => {
    var queryUrl = req.query.url;
    var siteImages = [];
    var error = "";
    if (queryUrl) {
        request(queryUrl, function (err, resp, body) {
            if (body) {
                $ = cheerio.load(body);
                var domain = extractDomain(queryUrl);
                links = $('img');
                $(links).each(function (i, link) {
                    var urlValues = $(link).attr('src');
                    var prefix = "https://www."
                    siteImages.push({
                        url: urlValues.includes(domain) || urlValues.includes('www') || urlValues.includes('http') ? urlValues : prefix + domain + urlValues,
                        id: i,
                        title: $(link).attr('alt')
                    });
                });
            } else {
                error = err;
            }
            res.json({
                url: siteImages,
                status: 200,
                error: error
            });
        });
    } else {
        res.json({
            url: siteImages,
            status: 200,
            error: "URL param is not defined"
        });
    }
});

app.get("/getCovidData", (req, res) => {
    request({ 
        url: "https://api.covid19india.org/state_district_wise.json",
        headers: {'content-type' : 'application/json'},
        json: true
    }, function (err, resp, body) {
        if (body) {
            res.json(body);
        } else {
            res.json({
                status: 200,
                error: "Request Failed"
            });
        }
    });
});

app.get("/getCovidFullData", (req, res) => {
    request({ 
        url: "https://api.covid19india.org/data.json",
        headers: {'content-type' : 'application/json'},
        json: true
    }, function (err, resp, body) {
        if (body) {
            res.json(body);
        } else {
            res.json({
                status: 200,
                error: "Request Failed"
            });
        }
    });
});

app.get("/getCovidLogs", (req, res) => {
    request({ 
        url: "https://api.covid19india.org/updatelog/log.json",
        headers: {'content-type' : 'application/json'},
        json: true
    }, function (err, resp, body) {
        if (body) {
            res.json(body);
        } else {
            res.json({
                status: 200,
                error: "Request Failed"
            });
        }
    });
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});
