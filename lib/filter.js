"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _typevalidator = require("typevalidator");

var _typevalidator2 = _interopRequireDefault(_typevalidator);

var typeChecker = (0, _typevalidator2["default"])();

/**
 * type: equal, in, regular
 */
var getFilter = function getFilter(obj) {
    var name = obj.name;
    var type = obj.type || "equal";
    var value = obj.value;

    if (type === "in") {
        typeChecker.check("array", value);
    } else if (type === "regular") {
        typeChecker.check("regExp", value);
    }

    return function (data) {
        if (name) data = data[name];
        if (type === "equal") return data === value;
        if (type === "in") return contain(value, data);
        if (type === "regular") return value.test(data);
    };
};

var contain = function contain(list, item) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] === item) {
            return true;
        }
    }
    return false;
};

exports["default"] = {
    getFilter: getFilter
};
module.exports = exports["default"];