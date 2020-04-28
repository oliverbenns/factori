"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var Factory = /** @class */ (function () {
    function Factory(data) {
        this.defaultData = data;
    }
    Factory.prototype.createItem = function (data) {
        if (data === void 0) { data = {}; }
        // @NOTE: This limits us to not having nested objects.
        // Nested objects will be shared amongst creations.
        // Ways we might fix this could be use TS ReadOnly
        // or pass in options into constructor with a merge type and use _.cloneDeep.
        return __assign(__assign({}, this.defaultData), data);
    };
    Factory.prototype.create = function (x) {
        var data = typeof x === "function" ? x(this.defaultData) : x;
        return this.createItem(data);
    };
    Factory.prototype.createList = function (count, x) {
        var items = Array(count);
        for (var i = 0; i < count; i++) {
            var data = typeof x === "function" ? x(this.defaultData, i) : x;
            items[i] = this.createItem(data);
        }
        return items;
    };
    return Factory;
}());
exports["default"] = Factory;
