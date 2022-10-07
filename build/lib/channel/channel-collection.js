"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsubscribeChannel = exports.subscribeChannel = exports.subscribeChannels = exports.findChannelsByUser = exports.findChannelsByTags = exports.getChannel = exports.createChannel = exports.batchRef = exports._docRef = void 0;
var firestore_1 = require("firebase/firestore");
var firebase_snapshot_utils_1 = require("../_utils/firebase-snapshot.utils");
var array_utils_1 = require("../_utils/array.utils");
var _collectionPath = '/channels';
function _collectionRef() {
    var db = (0, firestore_1.getFirestore)();
    return (0, firestore_1.collection)(db, _collectionPath);
}
function _docRef(id) {
    var db = (0, firestore_1.getFirestore)();
    return (0, firestore_1.doc)(db, "".concat(_collectionPath, "/").concat(id));
}
exports._docRef = _docRef;
function batchRef() {
    var db = (0, firestore_1.getFirestore)();
    return (0, firestore_1.writeBatch)(db);
}
exports.batchRef = batchRef;
function channelRecordToChannel(record, id) {
    var payload = null;
    try {
        payload = JSON.parse(record.payload || 'null');
    }
    catch (_a) {
    }
    return {
        id: id,
        title: record.title,
        payload: payload,
        tags: (0, array_utils_1.objectToArray)(record.tags),
        members: record.members,
    };
}
function createChannel(id, data) {
    return __awaiter(this, void 0, void 0, function () {
        var tags, channel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tags = (0, array_utils_1.arrayToObject)(data.tags);
                    channel = {
                        title: data.title,
                        payload: JSON.stringify(data.payload || null),
                        tags: tags,
                        members: [],
                        updatedAt: Date.now(),
                    };
                    return [4 /*yield*/, (0, firestore_1.setDoc)(_docRef(id), channel)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, channelRecordToChannel(channel, id)];
            }
        });
    });
}
exports.createChannel = createChannel;
function getChannel(id) {
    return __awaiter(this, void 0, void 0, function () {
        var doc, channel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, firestore_1.getDoc)(_docRef(id))];
                case 1:
                    doc = _a.sent();
                    if (!doc.exists()) {
                        return [2 /*return*/, null];
                    }
                    channel = (0, firebase_snapshot_utils_1.docWithId)(doc);
                    return [2 /*return*/, channelRecordToChannel(channel, doc.id)];
            }
        });
    });
}
exports.getChannel = getChannel;
function findChannelsByTags(tags, take, sortByLastUpdate, after) {
    if (tags === void 0) { tags = []; }
    if (take === void 0) { take = 10; }
    if (sortByLastUpdate === void 0) { sortByLastUpdate = false; }
    return __awaiter(this, void 0, void 0, function () {
        var queryConstraints, _i, tags_1, tag;
        return __generator(this, function (_a) {
            queryConstraints = [
                (0, firestore_1.limit)(take),
            ];
            if (sortByLastUpdate) {
                queryConstraints.push((0, firestore_1.orderBy)('updatedAt', 'desc'));
            }
            if (after) {
                queryConstraints.push((0, firestore_1.startAfter)(after));
            }
            for (_i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
                tag = tags_1[_i];
                queryConstraints.push((0, firestore_1.where)("tags.".concat(tag), '==', true));
            }
            return [2 /*return*/, _findByQuery(queryConstraints)];
        });
    });
}
exports.findChannelsByTags = findChannelsByTags;
function findChannelsByUser(userId, tags, take, sortByLastUpdate, after) {
    if (tags === void 0) { tags = []; }
    if (take === void 0) { take = 10; }
    if (sortByLastUpdate === void 0) { sortByLastUpdate = false; }
    return __awaiter(this, void 0, void 0, function () {
        var queryConstraints, _i, tags_2, tag;
        return __generator(this, function (_a) {
            queryConstraints = [
                (0, firestore_1.where)('members', 'array-contains', userId),
                (0, firestore_1.limit)(take),
            ];
            if (sortByLastUpdate) {
                queryConstraints.push((0, firestore_1.orderBy)('updatedAt', 'desc'));
            }
            if (after) {
                queryConstraints.push((0, firestore_1.startAfter)(after));
            }
            for (_i = 0, tags_2 = tags; _i < tags_2.length; _i++) {
                tag = tags_2[_i];
                queryConstraints.push((0, firestore_1.where)("tags.".concat(tag), '==', true));
            }
            return [2 /*return*/, _findByQuery(queryConstraints)];
        });
    });
}
exports.findChannelsByUser = findChannelsByUser;
function _findByQuery(queryConstraints) {
    return __awaiter(this, void 0, void 0, function () {
        var q, docs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    q = firestore_1.query.apply(void 0, __spreadArray([_collectionRef()], queryConstraints, false));
                    return [4 /*yield*/, (0, firestore_1.getDocs)(q).then(function (response) { return response.docs; })];
                case 1:
                    docs = _a.sent();
                    return [2 /*return*/, {
                            // @ts-ignore
                            channels: docs.map(firebase_snapshot_utils_1.docWithId).map(function (doc) { return channelRecordToChannel(doc, doc.id); }),
                            next: docs[docs.length - 1],
                        }];
            }
        });
    });
}
function subscribeChannels(callback) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, firestore_1.onSnapshot)(_collectionRef(), function (channelData) {
                    var channels = [];
                    // Check that this is not the first snapshot request, but adding a new document to the listener
                    if (channelData.docs.length !== channelData.docChanges().length) {
                        // @ts-ignore
                        channels = channelData.docChanges().map(function (docData) { return docData.doc; }).map(firebase_snapshot_utils_1.docWithId).map(function (doc) { return channelRecordToChannel(doc, doc.id); });
                    }
                    callback(channels, channelData);
                })];
        });
    });
}
exports.subscribeChannels = subscribeChannels;
function subscribeChannel(channelId, callback) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, firestore_1.onSnapshot)(_docRef(channelId), function (channelData) {
                    callback(channelData);
                })];
        });
    });
}
exports.subscribeChannel = subscribeChannel;
function unsubscribeChannel(unsubscribe) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            unsubscribe();
            return [2 /*return*/];
        });
    });
}
exports.unsubscribeChannel = unsubscribeChannel;
