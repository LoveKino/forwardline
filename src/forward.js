import line from "./line";
import Node from "./Node";
import TypeChecker from "typevalidator";

var typeChecker = TypeChecker();

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

var validateMap = searchMap => {
    for (let name in searchMap) {
        let searchRules = searchMap[name];
        typeChecker.check("array", searchRules);
        for (let i = 0; i < searchRules.length; i++) {
            let searchRule = searchRules[i];
            typeChecker.check("pureObj", searchRule);
            typeChecker.check("function", searchRule.filter);
            typeChecker.check("number", searchRule.dis);
        }
    }
}

export default (searchMap = {}) => {
    validateMap(searchMap);
    var head = null;

    var push = (data) => {
        let node = new Node(data);
        if (head) head.addNext(node);
        head = node;
    }

    /**
     * store data and return cared other data
     *
     * data : tos store
     * type : trigger which kind of search rules to search line
     * wait : delay search or not
     */
    var store = (data, type, cb, wait) => {
        // push first
        push(data);
        let refer = head;
        let searchRules = searchMap[type];
        if (typeof wait === "number") {
            setTimeout(() => {
                searchByType(refer, searchRules, cb);
            }, wait);
        } else if (likePromise(wait)) {
            wait.then(res => {
                searchByType(refer, searchRules, cb);
            });
        } else {
            searchByType(refer, searchRules, cb);
        }
    }

    var searchByType = (refer, searchRules, cb) => {
        let res = [];
        if (searchRules) {
            for (let i = 0; i < searchRules.length; i++) {
                let { filter, dis } = searchRules[i];
                let target = line.search(refer, filter, dis);
                let data = target && target.getData();
                res.push(data);
            }
        }
        cb && cb(res);
    }

    var likePromise = v => v && typeof v === "object" &&
        typeof v.then === "function";

    //
    return {
        store
    }
}