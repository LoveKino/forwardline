"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _node = require("./node");

var _node2 = _interopRequireDefault(_node);

/**
 * search target node from line
 * @param   refer  reference point
 * @param   filter which kind of node to concern about
 * @param   dis    distance between refer and target node
 *                 dis > 0 means look back
 *                 dis < 0 means look forward
 *
 * -------------e1-----------e------------e2------------
 *              |----dis > 0 | --dis < 0---|
 * @return
 */
var search = function search(refer, filter, dis) {
    if (dis > 0) {
        // look back
        var prev = refer.getPrev();
        var steps = 0;
        while (prev) {
            if (filter(prev.getData())) {
                steps++;
                if (steps === dis) return prev;
            }
            prev = prev.getPrev();
        }
    } else if (dis < 0) {
        var next = refer.getNext();
        var steps = 0;
        while (next) {
            if (filter(next.getData())) {
                steps--;
                if (steps === dis) return next;
            }
            next = next.getNext();
        }
    }
};

var print = function print(refer) {
    var cur = findHead(refer);
    var str = "";
    while (cur) {
        str += " -> " + cur.getData().toString();
        cur = cur.getNext();
    }
    console.log(str);
};

var findHead = function findHead(refer) {
    var head = refer;
    while (head) {
        var next = head.getPrev();
        if (!next) return head;
        head = next;
    }
    return head;
};

exports["default"] = {
    search: search,
    print: print
};
module.exports = exports["default"];