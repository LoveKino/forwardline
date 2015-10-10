import forward from "./forward";
import filter from "./filter";

import TypeChecker from "typevalidator";

var typeChecker = TypeChecker();

var validateMap = searchMap => {
    for (let name in searchMap) {
        let searchRules = searchMap[name];
        typeChecker.check("array", searchRules);
        for (let i = 0; i < searchRules.length; i++) {
            let searchRule = searchRules[i];
            typeChecker.check("pureObj", searchRule);
            typeChecker.check("pureObj", searchRule.filter);
            typeChecker.check("number", searchRule.dis);
        }
    }
}

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

export default (searchMap) => {
    validateMap(searchMap);
    for (let name in searchMap) {
        let searchRules = searchMap[name];
        for (let i = 0; i < searchRules.length; i++) {
            let searchRule = searchRules[i];
            searchRule.filter = filter.getFilter(searchRule.filter);
        }
    }
    let forwardline = forward(searchMap);
    return forwardline;
}