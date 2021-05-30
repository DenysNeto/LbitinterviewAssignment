"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.routes = void 0;
var express = __importStar(require("express"));
exports.routes = express.Router();
var fs = require('fs');
var allTemplates;
try {
    allTemplates = fs.readFileSync('data.json', 'utf8');
    allTemplates = JSON.parse(allTemplates);
}
catch (err) {
    console.error(err);
}
function updateDataJson(template) {
    try {
        var index = allTemplates.findIndex(function (elem) { return elem.id == template.id; });
        allTemplates[index] = template;
        fs.writeFileSync('data.json', JSON.stringify(allTemplates));
    }
    catch (err) {
        console.error("ERROR UPDATE DATA ", err);
    }
}
exports.routes.get('/templates', function (req, res) { return res.send({ templates: allTemplates }); });
exports.routes.post('/templates', function (req, res) {
    updateDataJson(req.body.template);
    res.send({ body: req.body });
});
