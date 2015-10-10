import Node from "./node";

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
var search = (refer, filter, dis) => {
    if (dis > 0) { // look back
        let prev = refer.getPrev();
        let steps = 0;
        while (prev) {
            if (filter(prev.getData())) {
                steps++;
                if (steps === dis) return prev;
            }
            prev = prev.getPrev();
        }
    } else if (dis < 0) {
        let next = refer.getNext();
        let steps = 0;
        while (next) {
            if (filter(next.getData())) {
                steps--;
                if (steps === dis) return next;
            }
            next = next.getNext();
        }
    }
}

var print = (refer) => {
    let cur = findHead(refer);
    let str = "";
    while (cur) {
        str += " -> " + cur.getData().toString();
        cur = cur.getNext();
    }
    console.log(str);
}

var findHead = refer => {
    let head = refer;
    while (head) {
        let next = head.getPrev();
        if (!next) return head;
        head = next;
    }
    return head;
}

export default {
    search,
    print
}