"use strict";
exports.__esModule = true;
var _1 = require(".");
var product = {
    id: 1,
    name: "Apple"
};
var productFactory = new _1["default"](product);
describe("Factory", function () {
    describe("create", function () {
        it("creates an object with default data", function () {
            var result = productFactory.create();
            expect(result).toEqual(product);
        });
        it("creates an object with overwritten data", function () {
            var result = productFactory.create({
                name: "Orange"
            });
            expect(result).toEqual({ id: 1, name: "Orange" });
        });
        it("creates an object with altered property", function () {
            var result = productFactory.create(function (product) { return ({
                name: product.name + " Juice"
            }); });
            expect(result.name).toBe("Apple Juice");
        });
    });
    describe("createList", function () {
        it("creates objects with default data", function () {
            var results = productFactory.createList(2);
            expect(results).toHaveLength(2);
            expect(results[0]).toEqual(product);
        });
        it("creates objects with overwritten data", function () {
            var results = productFactory.createList(2, {
                name: "Orange"
            });
            expect(results).toHaveLength(2);
            expect(results[0].name).toBe("Orange");
            expect(results[1].name).toBe("Orange");
        });
        it("creates objects with altered property based on index", function () {
            var results = productFactory.createList(2, function (product, index) { return ({
                id: index
            }); });
            expect(results).toHaveLength(2);
            expect(results[0].id).toBe(0);
            expect(results[1].id).toBe(1);
        });
    });
});
