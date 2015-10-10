import Forward from "../src/forward";
import assert from "assert";

describe("forward", () => {
    it("base", () => {
        let forward = Forward({
            "type1": [{
                filter: v => v > 10,
                dis: 1
            }]
        });

        forward.store(10, "type1", res => {
            assert.equal(res.length, 1);
            assert.equal(res[0], undefined);
        });
        forward.store(11, "type1", res => {
            assert.equal(res.length, 1);
            assert.equal(res[0], undefined);
        });
        forward.store(5, "type1", res => {
            assert.equal(res.length, 1);
            assert.equal(res[0], 11);
        });
    })

    it("base 2", () => {
        let forward = Forward({
            "type1": [{
                filter: v => v > 10,
                dis: 1
            }],
            "type2": [{
                filter: v => typeof v === "string",
                dis: 2
            }]
        });

        forward.store("ok", "type1", res => {});
        forward.store("why", "type1", res => {});
        forward.store({}, "type1", res => {});
        forward.store("one", "type1", res => {});
        forward.store(5, "type2", res => {
            assert.equal(res.length, 1);
            assert.equal(res[0], "why");
        });
    })

    it("getLength", () => {
        let forward = Forward({
            "type1": [{
                filter: v => v > 10,
                dis: 1
            }]
        });

        forward.store(10, "type1", res => {});
        forward.store(11, "type1", res => {});
        forward.store(5, "type1", res => {});

        assert.equal(forward.getLength(), 3);
    })

    it("wait no", (done) => {
        let forward = Forward({
            "type1": [{
                filter: v => v > 10,
                dis: 1
            }, {
                filter: v => v > 10,
                dis: -1
            }]
        });

        forward.store("ok", "type1", res => {
            assert.equal(res.length, 2);
            assert.equal(res[0], undefined);
            assert.equal(res[1], undefined);
        });
        forward.store(15, "type1", res => {
            assert.equal(res.length, 2);
            assert.equal(res[0], undefined);
            assert.equal(res[1], undefined);
        });

        forward.store(17, "type1", res => {
            assert.equal(res.length, 2);
            assert.equal(res[0], 15);
            assert.equal(res[1], undefined);
        });

        forward.store(18, "type1", res => {
            assert.equal(res.length, 2);
            assert.equal(res[0], 17);
            assert.equal(res[1], 19);
            done();
        }, 20);

        forward.store(19, "type1", res => {
            assert.equal(res.length, 2);
            assert.equal(res[0], 18);
            assert.equal(res[1], undefined);
        });
    })

    it("wait promise", (done) => {
        let forward = Forward({
            "type1": [{
                filter: v => v > 10,
                dis: 1
            }, {
                filter: v => v > 10,
                dis: -1
            }]
        });

        forward.store("ok", "type1", res => {
            assert.equal(res.length, 2);
            assert.equal(res[0], undefined);
            assert.equal(res[1], undefined);
        });
        forward.store(15, "type1", res => {
            assert.equal(res.length, 2);
            assert.equal(res[0], undefined);
            assert.equal(res[1], undefined);
        });

        forward.store(17, "type1", res => {
            assert.equal(res.length, 2);
            assert.equal(res[0], 15);
            assert.equal(res[1], undefined);
        });

        forward.store(18, "type1", res => {
            assert.equal(res.length, 2);
            assert.equal(res[0], 17);
            assert.equal(res[1], 19);
            done();
        }, new Promise(r => {
            setTimeout(() => r(), 100);
        }));

        forward.store(19, "type1", res => {
            assert.equal(res.length, 2);
            assert.equal(res[0], 18);
            assert.equal(res[1], undefined);
        });
    })
})