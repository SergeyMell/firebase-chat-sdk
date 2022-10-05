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
import { collection, doc, getDoc, getDocs, getFirestore, limit, onSnapshot, query, setDoc, startAfter, where, orderBy, writeBatch } from 'firebase/firestore';
import { docWithId } from '../_utils/firebase-snapshot.utils';
import { arrayToObject, objectToArray } from '../_utils/array.utils';
var _collectionPath = '/channels';
function _collectionRef() {
    var db = getFirestore();
    return collection(db, _collectionPath);
}
export function _docRef(id) {
    var db = getFirestore();
    return doc(db, "".concat(_collectionPath, "/").concat(id));
}
export function batchRef() {
    var db = getFirestore();
    return writeBatch(db);
}
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
        tags: objectToArray(record.tags),
        members: record.members,
    };
}
export function createChannel(id, data) {
    return __awaiter(this, void 0, void 0, function () {
        var tags, channel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tags = arrayToObject(data.tags);
                    channel = {
                        title: data.title,
                        payload: JSON.stringify(data.payload || null),
                        tags: tags,
                        members: [],
                        updatedAt: Date.now(),
                    };
                    return [4 /*yield*/, setDoc(_docRef(id), channel)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, channelRecordToChannel(channel, id)];
            }
        });
    });
}
export function getChannel(id) {
    return __awaiter(this, void 0, void 0, function () {
        var doc, channel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDoc(_docRef(id))];
                case 1:
                    doc = _a.sent();
                    if (!doc.exists()) {
                        return [2 /*return*/, null];
                    }
                    channel = docWithId(doc);
                    return [2 /*return*/, channelRecordToChannel(channel, doc.id)];
            }
        });
    });
}
export function findChannelsByTags(tags, take, sortByLastUpdate, after) {
    if (tags === void 0) { tags = []; }
    if (take === void 0) { take = 10; }
    if (sortByLastUpdate === void 0) { sortByLastUpdate = false; }
    return __awaiter(this, void 0, void 0, function () {
        var queryConstraints, _i, tags_1, tag;
        return __generator(this, function (_a) {
            queryConstraints = [
                limit(take),
            ];
            if (sortByLastUpdate) {
                queryConstraints.push(orderBy('updatedAt', 'desc'));
            }
            if (after) {
                queryConstraints.push(startAfter(after));
            }
            for (_i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
                tag = tags_1[_i];
                queryConstraints.push(where("tags.".concat(tag), '==', true));
            }
            return [2 /*return*/, _findByQuery(queryConstraints)];
        });
    });
}
export function findChannelsByUser(userId, tags, take, sortByLastUpdate, after) {
    if (tags === void 0) { tags = []; }
    if (take === void 0) { take = 10; }
    if (sortByLastUpdate === void 0) { sortByLastUpdate = false; }
    return __awaiter(this, void 0, void 0, function () {
        var queryConstraints, _i, tags_2, tag;
        return __generator(this, function (_a) {
            queryConstraints = [
                where('members', 'array-contains', userId),
                limit(take),
            ];
            if (sortByLastUpdate) {
                queryConstraints.push(orderBy('updatedAt', 'desc'));
            }
            if (after) {
                queryConstraints.push(startAfter(after));
            }
            for (_i = 0, tags_2 = tags; _i < tags_2.length; _i++) {
                tag = tags_2[_i];
                queryConstraints.push(where("tags.".concat(tag), '==', true));
            }
            return [2 /*return*/, _findByQuery(queryConstraints)];
        });
    });
}
function _findByQuery(queryConstraints) {
    return __awaiter(this, void 0, void 0, function () {
        var q, docs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    q = query.apply(void 0, __spreadArray([_collectionRef()], queryConstraints, false));
                    return [4 /*yield*/, getDocs(q).then(function (response) { return response.docs; })];
                case 1:
                    docs = _a.sent();
                    return [2 /*return*/, {
                            // @ts-ignore
                            channels: docs.map(docWithId).map(function (doc) { return channelRecordToChannel(doc, doc.id); }),
                            next: docs[docs.length - 1],
                        }];
            }
        });
    });
}
export function subscribeChannels(callback) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, onSnapshot(_collectionRef(), function (channelData) {
                    var channels = [];
                    // Check that this is not the first snapshot request, but adding a new document to the listener
                    if (channelData.docs.length !== channelData.docChanges().length) {
                        // @ts-ignore
                        channels = channelData.docChanges().map(function (docData) { return docData.doc; }).map(docWithId).map(function (doc) { return channelRecordToChannel(doc, doc.id); });
                    }
                    callback(channels, channelData);
                })];
        });
    });
}
export function subscribeChannel(channelId, callback) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, onSnapshot(_docRef(channelId), function (channelData) {
                    // let channels: IChannel[] = [];
                    // // Check that this is not the first snapshot request, but adding a new document to the listener
                    // if (channelData.docs.length !== channelData.docChanges().length) {
                    //   // @ts-ignore
                    //   channels = channelData.docChanges().map(docData => docData.doc).map(docWithId).map(doc => channelRecordToChannel(doc, doc.id));
                    // }
                    callback(channelData);
                })];
        });
    });
}
export function unsubscribeChannel(unsubscribe) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            unsubscribe();
            return [2 /*return*/];
        });
    });
}
