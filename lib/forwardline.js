"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _forward = require("./forward");

var _forward2 = _interopRequireDefault(_forward);

var _filter = require("./filter");

var _filter2 = _interopRequireDefault(_filter);

var _typevalidator = require("typevalidator");

var _typevalidator2 = _interopRequireDefault(_typevalidator);

var typeChecker = (0, _typevalidator2["default"])();

var validateMap = function validateMap(searchMap) {
    for (var _name in searchMap) {
        var searchRules = searchMap[_name];
        typeChecker.check("array", searchRules);
        for (var i = 0; i < searchRules.length; i++) {
            var searchRule = searchRules[i];
            typeChecker.check("pureObj", searchRule);
            typeChecker.check("pureObj", searchRule.filter);
            typeChecker.check("number", searchRule.dis);
        }
    }
};

/**
 *
 * searchMap
 *     type   searchRules
 *
 * searchRule = (filter, dis)
 *
 * filter
 *     name
 *     type
 *     value
 * 
 */

exports["default"] = function (searchMap) {
    validateMap(searchMap);
    for (var _name2 in searchMap) {
        var searchRules = searchMap[_name2];
        for (var i = 0; i < searchRules.length; i++) {
            var searchRule = searchRules[i];
            searchRule.filter = _filter2["default"].getFilter(searchRule.filter);
        }
    }
    var forwardline = (0, _forward2["default"])(searchMap);
    return forwardline;
};

module.exports = exports["default"];