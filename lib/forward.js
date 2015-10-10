"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _line = require("./line");

var _line2 = _interopRequireDefault(_line);

var _Node = require("./Node");

var _Node2 = _interopRequireDefault(_Node);

var _typevalidator = require("typevalidator");

var _typevalidator2 = _interopRequireDefault(_typevalidator);

var typeChecker = (0, _typevalidator2["default"])();

/**
 * search
 * delay search
 *
 * searchMap
 *     type   searchRules
 *
 * searchRule (filter, dis)
 * 
 */

var validateMap = function validateMap(searchMap) {
    for (var _name in searchMap) {
        var searchRules = searchMap[_name];
        typeChecker.check("array", searchRules);
        for (var i = 0; i < searchRules.length; i++) {
            var searchRule = searchRules[i];
            typeChecker.check("pureObj", searchRule);
            typeChecker.check("function", searchRule.filter);
            typeChecker.check("number", searchRule.dis);
        }
    }
};

exports["default"] = function () {
    var searchMap = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    validateMap(searchMap);
    var head = null;

    var push = function push(data) {
        var node = new _Node2["default"](data);
        if (head) head.addNext(node);
        head = node;
    };

    /**
     * store data and return cared other data
     *
     * data : tos store
     * type : trigger which kind of search rules to search line
     * wait : delay search or not
     */
    var store = function store(data, type, cb, wait) {
        // push first
        push(data);
        var refer = head;
        var searchRules = searchMap[type];
        if (typeof wait === "number") {
            setTimeout(function () {
                searchByType(refer, searchRules, cb);
            }, wait);
        } else if (likePromise(wait)) {
            wait.then(function (res) {
                searchByType(refer, searchRules, cb);
            });
        } else {
            searchByType(refer, searchRules, cb);
        }
    };

    var searchByType = function searchByType(refer, searchRules, cb) {
        var res = [];
        if (searchRules) {
            for (var i = 0; i < searchRules.length; i++) {
                var _searchRules$i = searchRules[i];
                var filter = _searchRules$i.filter;
                var dis = _searchRules$i.dis;

                var target = _line2["default"].search(refer, filter, dis);
                var data = target && target.getData();
                res.push(data);
            }
        }
        cb && cb(res);
    };

    var likePromise = function likePromise(v) {
        return v && typeof v === "object" && typeof v.then === "function";
    };

    //
    return {
        store: store
    };
};

module.exports = exports["default"];