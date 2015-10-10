var Node = function(data){
    this.prev = null;
    this.next = null;
    this.data = data;
}

Node.prototype = {
    constructor: Node,
    addPrev: function(n){
        this.prev = n;
        n.next = this;
    },
    addNext: function(n){
        this.next = n;
        n.prev = this;
    },
    getPrev: function(){
        return this.prev;
    },
    getNext: function(){
        return this.next;
    },
    getData: function(){
        return this.data;
    }
}

export default Node;