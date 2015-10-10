import TypeChecker from "typevalidator";

var typeChecker = TypeChecker();

/**
 * type: equal, in, regular
 */
var getFilter = (obj) => {
    let name = obj.name;
    let type = obj.type || "equal";
    let value = obj.value;

    if (type === "in") {
        typeChecker.check("array", value);
    } else if (type === "regular") {
        typeChecker.check("regExp", value);
    }

    return (data) => {
        if (name) data = data[name];
        if (type === "equal") return data === value;
        if (type === "in") return contain(value, data);
        if (type === "regular") return value.test(data);
    }
}

var contain = (list, item) => {
    for (var i = 0; i < list.length; i++) {
        if (list[i] === item) {
            return true;
        }
    }
    return false;
}

export default {
    getFilter
}