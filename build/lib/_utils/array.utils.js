"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectToArray = exports.arrayToObject = void 0;
function arrayToObject(items) {
    return Object.fromEntries(items.map(function (item) { return [item, true]; }));
}
exports.arrayToObject = arrayToObject;
function objectToArray(dict) {
    return Object.entries(dict)
        .filter(function (_a) {
        var key = _a[0], value = _a[1];
        return !!value;
    })
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        return key;
    });
}
exports.objectToArray = objectToArray;
