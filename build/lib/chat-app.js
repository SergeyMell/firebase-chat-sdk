"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initChatApp = void 0;
var app_1 = require("firebase/app");
function initChatApp(options, config) {
    (0, app_1.initializeApp)(options, config);
}
exports.initChatApp = initChatApp;
