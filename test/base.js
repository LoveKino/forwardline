import Forwardline from "../index";
import assert from "assert";

describe("forwardline", () => {
    it("base", () => {
        let forward = Forwardline({
            "type1": [{
                filter: {
                    name: "type",
                    type: "in",
                    value: ["a", "b"]
                },
                dis: 1
            }]
        });

        forward.store({
            type: "a"
        }, "type1", res => {});
        forward.store({
            type: "c"
        }, "type1", res => {
            assert.equal(res.length, 1);
            assert.equal(res[0].type, "a");
        });
        forward.store({
            type: "b"
        }, "type1", res => {
            assert.equal(res.length, 1);
            assert.equal(res[0].type, "a");
        });
    })

    it("base", () => {
        let forward = Forwardline({
            "type1": [{
                filter: {
                    name: "type",
                    type: "equal",
                    value: "a"
                },
                dis: 1
            }]
        });

        forward.store({
            type: "a"
        }, "type1", res => {});
        forward.store({
            type: "c"
        }, "type1", res => {
            assert.equal(res.length, 1);
            assert.equal(res[0].type, "a");
        });
        forward.store({
            type: "b"
        }, "type1", res => {
            assert.equal(res.length, 1);
            assert.equal(res[0].type, "a");
        });
    })

    it("base", () => {
        let forward = Forwardline({
            "type1": [{
                filter: {
                    name: "type",
                    type: "regular",
                    value: /number/
                },
                dis: 1
            }]
        });

        forward.store({
            type: "number"
        }, "type1", res => {});
        forward.store({
            type: "2c"
        }, "type1", res => {
            assert.equal(res.length, 1);
            assert.equal(res[0].type, "number");
        });
        forward.store({
            type: "2b"
        }, "type1", res => {
            assert.equal(res.length, 1);
            assert.equal(res[0].type, "number");
        });
    })
})