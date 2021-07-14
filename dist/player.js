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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mvpCurrentPercent = exports.mvpPlayTime = exports.mvpFileUrlPath = exports.mvpDto = exports.lessonList = exports.makeRate = exports.callApi = exports.encrypt = exports.iv = exports.key = exports.progressIntervalInSeconds = void 0;
var get_video_duration_electron_1 = require("get-video-duration-electron");
var crypto_js_1 = __importDefault(require("crypto-js"));
var lecture_1 = require("./lecture");
var common_1 = require("./common");
var printbox_1 = __importDefault(require("./printbox"));
var progressIntervalInSeconds = 5; //30;
exports.progressIntervalInSeconds = progressIntervalInSeconds;
var key = crypto_js_1.default.enc.Latin1.parse('l40jsfljasln32uf');
exports.key = key;
var iv = crypto_js_1.default.enc.Latin1.parse('asjfknal3bafjl23');
exports.iv = iv;
//#endregion type
//#region basicfunctions
function encrypt(memberSeq, lctreLrnSqno, progressRate) {
    var data = memberSeq + "|" + lctreLrnSqno + "|" + progressRate;
    var encrypted = crypto_js_1.default.AES.encrypt(data, key, {
        iv: iv,
        mode: crypto_js_1.default.mode.CBC,
        padding: crypto_js_1.default.pad.ZeroPadding
    });
    //console.log('encrypted: ' + encrypted);
    //var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding });
    //console.log('decrypted: '+decrypted.toString(CryptoJS.enc.Utf8));
    return encrypted.toString();
    // return decrypted;
}
exports.encrypt = encrypt;
function callApi(token, data) {
    var encriptedProgressRate = encrypt(data.memberSeq, data.lctreLrnSqno, data.rate);
    console.log(data);
    return lecture_1.student.learningProgress(token, data.lctreLrnSqno, { encriptedProgressRate: encriptedProgressRate });
}
exports.callApi = callApi;
function makeRate(current, duration) {
    var rate = current / duration * 100;
    if (rate > 66)
        rate = 100;
    return Math.floor(Math.min(rate, 100));
}
exports.makeRate = makeRate;
function lessonList(token, path) {
    return __awaiter(this, void 0, void 0, function () {
        var res, list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, lecture_1.$classUrlPath.lesson.lecture.attend.list.$lessonSeq(token, path)];
                case 1:
                    res = _a.sent();
                    list = res.data.list;
                    return [2 /*return*/, list];
            }
        });
    });
}
exports.lessonList = lessonList;
//#endregion basicfunctions
//#region mvpfunctions
function mvpDto(token, path) {
    return __awaiter(this, void 0, void 0, function () {
        var learning;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, common_1.lecture.detail.lesson.$subLessonSeq(token, path)];
                case 1:
                    learning = _a.sent();
                    return [2 /*return*/, learning.data.lectureContentsDto.lectureContentsMvpDto];
            }
        });
    });
}
exports.mvpDto = mvpDto;
function mvpFileUrlPath(token, path) {
    return __awaiter(this, void 0, void 0, function () {
        var Dto;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mvpDto(token, path)];
                case 1:
                    Dto = _a.sent();
                    return [2 /*return*/, Dto.mvpFileUrlPath];
            }
        });
    });
}
exports.mvpFileUrlPath = mvpFileUrlPath;
function mvpPlayTime(token, path) {
    return __awaiter(this, void 0, void 0, function () {
        var Dto;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mvpDto(token, path)];
                case 1:
                    Dto = _a.sent();
                    if (!!Dto.playTime) return [3 /*break*/, 3];
                    return [4 /*yield*/, get_video_duration_electron_1.getVideoDurationInSeconds(Dto.mvpFileUrlPath)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [2 /*return*/, Dto.playTime];
            }
        });
    });
}
exports.mvpPlayTime = mvpPlayTime;
function mvpCurrentPercent(token, path, search) {
    return __awaiter(this, void 0, void 0, function () {
        var res, list, first;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, lecture_1.$classUrlPath.lesson.lecture.attend.list.$lessonSeq(token, path)];
                case 1:
                    res = _a.sent();
                    list = res.data.list;
                    first = list.find(function (x) { return x.lessonSeq == search.subLessonSeq; });
                    return [2 /*return*/, first.rtpgsRt / 100];
            }
        });
    });
}
exports.mvpCurrentPercent = mvpCurrentPercent;
//#endregion mvpfuncitons
//#region callbacks
var intervalCallback = function (data, completeCallback) { return __awaiter(void 0, void 0, void 0, function () {
    var sec, rate, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sec = (new Date().getTime() - data.data.startTime.getTime()) / 1000;
                rate = Math.min(makeRate(sec, data.data.playTime) + data.data.appendTime, 100);
                if (rate >= 66)
                    rate = 100;
                console.log(data.data);
                return [4 /*yield*/, callApi(data.token, {
                        memberSeq: data.data.memberSeq,
                        lctreLrnSqno: data.data.lctreLrnSqno,
                        rate: rate
                    })];
            case 1:
                res = _a.sent();
                printbox_1.default({
                    title: data.data.lctreLrnSqno.toString(),
                    boxColor: "\x1b[32m"
                }, [sec.toString(), "/", data.data.playTime.toString(), "=", rate.toString()], [makeRate(sec, data.data.playTime), "+", data.data.appendTime, "=", rate.toString()], [res]);
                if (rate >= 100)
                    completeCallback(data);
                return [2 /*return*/];
        }
    });
}); };
var completeCallback = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        data.player.stop();
        printbox_1.default({
            title: data.data.lctreLrnSqno.toString(),
            boxColor: "\x1b[33m"
        }, ["status", ":", "\x1b[31mstopped"]);
        if (data.endCallback)
            data.endCallback();
        return [2 /*return*/];
    });
}); };
//#endregion callbacks
var Player = /** @class */ (function () {
    function Player(token, options) {
        this.timer = -1;
        this.clearIntvl = NaN;
        this.endCallback = undefined;
        this.fields = {
            token: token,
            data: {
                memberSeq: options.memberSeq,
                lctreLrnSqno: options.lctreLrnSqno,
                lessonSeq: options.lessonSeq,
                subLessonSeq: options.subLessonSeq,
                classUrlPath: options.classUrlPath
            },
            video: {
                url: "",
                duration: NaN
            },
            current: new Date()
        };
    }
    Player.prototype.openVideo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var path, start;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mvpFileUrlPath(this.fields.token, {
                            subLessonSeq: this.fields.data.subLessonSeq
                        })];
                    case 1:
                        path = _a.sent();
                        start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
                        console.log(path);
                        return [2 /*return*/, require('child_process').exec(start + ' ' + path)];
                }
            });
        });
    };
    Player.prototype.create = function (token, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, lecture_1.lesson.lecture.attend.create(token, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Player.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, playTime, percent, currentTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.timer !== -1)
                            return [2 /*return*/];
                        startTime = new Date();
                        return [4 /*yield*/, mvpPlayTime(this.fields.token, {
                                subLessonSeq: this.fields.data.subLessonSeq
                            })];
                    case 1:
                        playTime = _a.sent();
                        return [4 /*yield*/, mvpCurrentPercent(this.fields.token, {
                                classUrlPath: this.fields.data.classUrlPath,
                                lessonSeq: this.fields.data.lessonSeq
                            }, {
                                subLessonSeq: this.fields.data.subLessonSeq
                            })];
                    case 2:
                        percent = (_a.sent());
                        currentTime = percent * 100;
                        if (currentTime >= 100) {
                            printbox_1.default({
                                title: this.fields.data.lctreLrnSqno.toString(),
                                boxColor: "\x1b[34m"
                            }, ["이미 학습한 영상입니다. \x1b[1m\x1b[34m(건너뜀)\x1b[0m"]);
                            if (this.endCallback)
                                this.endCallback();
                            return [2 /*return*/];
                        }
                        this.timer = setInitInterval(intervalCallback, progressIntervalInSeconds * 1000, {
                            token: this.fields.token,
                            data: {
                                memberSeq: this.fields.data.memberSeq,
                                lctreLrnSqno: this.fields.data.lctreLrnSqno,
                                startTime: startTime,
                                playTime: playTime,
                                appendTime: currentTime
                            },
                            player: this,
                            endCallback: this.endCallback
                        }, completeCallback);
                        return [2 /*return*/];
                }
            });
        });
    };
    Player.prototype.pause = function () {
        //미지원
    };
    Player.prototype.resume = function () {
        //미지원
    };
    Player.prototype.stop = function () {
        if (this.timer != -1)
            clearInterval(this.timer);
    };
    return Player;
}());
exports.default = Player;
function setInitInterval(handler, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    handler.apply(void 0, args);
    return setInterval.apply(void 0, __spreadArray([handler, timeout], args));
}
//# sourceMappingURL=player.js.map