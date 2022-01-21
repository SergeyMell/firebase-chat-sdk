"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.docWithId = void 0;
function docWithId(d) {
    return Object.assign({ id: d.id }, d.data());
}
exports.docWithId = docWithId;
