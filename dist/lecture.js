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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$classUrlPath = exports.lesson = exports.student = exports.schedule = void 0;
var axios_1 = __importDefault(require("axios"));
var path_json_1 = __importDefault(require("./path.json"));
require("./substitute");
exports.schedule = {
    student: {
        list: function (token, data) {
            return __awaiter(this, void 0, void 0, function () {
                var url, req;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "https://" + path_json_1.default.host + path_json_1.default.lecture.schedule.student.list;
                            return [4 /*yield*/, axios_1.default({
                                    method: 'POST',
                                    url: url,
                                    headers: {
                                        "X-AUTH-TOKEN": token,
                                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
                                    },
                                    data: data
                                })];
                        case 1:
                            req = _a.sent();
                            return [2 /*return*/, req.data];
                    }
                });
            });
        }
    }
};
exports.student = {
    learning: function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var url, req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://" + path_json_1.default.host + path_json_1.default.lecture.student.learning;
                        return [4 /*yield*/, axios_1.default({
                                method: 'GET',
                                url: url,
                                headers: {
                                    "X-AUTH-TOKEN": token,
                                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
                                }
                            })];
                    case 1:
                        req = _a.sent();
                        return [2 /*return*/, req.data];
                }
            });
        });
    },
    learningProgress: function (token, lectureLearningSeq, data) {
        return __awaiter(this, void 0, void 0, function () {
            var url, req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ///common_domain/lecture/api/v1/sunrinkorean1/lesson/lecture/attend/list/1903 => lectureLearningSeq
                        console.log(lectureLearningSeq);
                        url = "https://" + path_json_1.default.host + path_json_1.default.lecture.student.learningProgress
                            .replace('${lectureLearningSeq}', lectureLearningSeq.toString());
                        return [4 /*yield*/, axios_1.default({
                                method: 'POST',
                                url: url,
                                headers: {
                                    "X-AUTH-TOKEN": token,
                                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
                                },
                                data: data
                            })];
                    case 1:
                        req = _a.sent();
                        return [2 /*return*/, req.data];
                }
            });
        });
    }
};
exports.lesson = {
    lecture: {
        attend: {
            create: function (token, data) {
                return __awaiter(this, void 0, void 0, function () {
                    var url, req;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                url = "https://" + path_json_1.default.host + path_json_1.default.lecture.lesson.lecture.attend.create;
                                return [4 /*yield*/, axios_1.default({
                                        method: 'POST',
                                        url: url,
                                        headers: {
                                            "X-AUTH-TOKEN": token,
                                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
                                        },
                                        data: data
                                    })];
                            case 1:
                                req = _a.sent();
                                return [2 /*return*/, req.data];
                        }
                    });
                });
            }
        }
    }
};
exports.$classUrlPath = {
    lesson: {
        list: function (token, path, query) {
            return __awaiter(this, void 0, void 0, function () {
                var url, req;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "https://" + path_json_1.default.host + path_json_1.default.lecture.$classUrlPath.lesson.list
                                .substitute(path);
                            return [4 /*yield*/, axios_1.default({
                                    method: 'GET',
                                    url: url,
                                    headers: {
                                        "X-AUTH-TOKEN": token,
                                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
                                    }
                                })];
                        case 1:
                            req = _a.sent();
                            return [2 /*return*/, req.data];
                    }
                });
            });
        },
        info: function (token, path) {
            return __awaiter(this, void 0, void 0, function () {
                var url, req;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "https://" + path_json_1.default.host + path_json_1.default.lecture.$classUrlPath.lesson.info
                                .substitute(path);
                            console.log(url);
                            return [4 /*yield*/, axios_1.default({
                                    method: 'GET',
                                    url: url,
                                    headers: {
                                        "X-AUTH-TOKEN": token,
                                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
                                    }
                                })];
                        case 1:
                            req = _a.sent();
                            return [2 /*return*/, req.data];
                    }
                });
            });
        },
        lecture: {
            attend: {
                list: {
                    $lessonSeq: function (token, path) {
                        return __awaiter(this, void 0, void 0, function () {
                            var url, req;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        url = "https://" + path_json_1.default.host + path_json_1.default.lecture.$classUrlPath.lesson.lecture.attend.list
                                            .substitute(path);
                                        console.log(url);
                                        return [4 /*yield*/, axios_1.default({
                                                method: 'GET',
                                                url: url,
                                                headers: {
                                                    "X-AUTH-TOKEN": token,
                                                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
                                                }
                                            })];
                                    case 1:
                                        req = _a.sent();
                                        return [2 /*return*/, req.data];
                                }
                            });
                        });
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=lecture.js.map