"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// equivalent of older: const express = require('express')
var express_1 = __importDefault(require("express"));
var routes_1 = require("./routes");
var app = express_1["default"]();
// Allow any method from any host and log requests
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    }
    else {
        console.log(req.ip + " " + req.method + " " + req.url);
        next();
    }
});
// Handle POST requests that come in formatted as JSON
app.use(express_1["default"].json());
// A default hello word route
app.use('/', routes_1.routes);
// start our server on port 4201
app.listen(4201, '127.0.0.1', function () {
    console.log("Server now listening on 4201");
});
