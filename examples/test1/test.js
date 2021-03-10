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
Object.defineProperty(exports, "__esModule", { value: true });
var ebsoc_1 = require("ebsoc");
var urls = ["https://sel2.ebsoc.co.kr/class/totaldesign2021/course/2399/lecture/626673",
    "https://sel2.ebsoc.co.kr/class/totaldesign2021/course/2399/lecture/626672",
    "https://sel2.ebsoc.co.kr/class/totaldesign2021/course/2399/lecture/626674"];
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _i, urls_1, url;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, urls_1 = urls;
                _a.label = 1;
            case 1:
                if (!(_i < urls_1.length)) return [3 /*break*/, 4];
                url = urls_1[_i];
                return [4 /*yield*/, run(url)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); })();
function run(url) {
    return __awaiter(this, void 0, void 0, function () {
        var member, token, memberSeq, classUrlPath, lessonSeq, lectureSeq, lectures, lecture, lectureLearningSeq, subLessonSeq, player;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ebsoc_1.Auth.login("rmagur12032", "djaak2799!")];
                case 1:
                    member = _a.sent();
                    token = member.data.token;
                    memberSeq = member.data.memberInfo.memberSeq;
                    classUrlPath = url.split('/')[4];
                    lessonSeq = Number.parseInt(url.split('/')[6]);
                    lectureSeq = Number.parseInt(url.split('/')[8]);
                    return [4 /*yield*/, ebsoc_1.Lecture.$classUrlPath.lesson.lecture.attend.list.$lessonSeq(token, {
                            classUrlPath: classUrlPath,
                            lessonSeq: lessonSeq
                        })];
                case 2:
                    lectures = (_a.sent()).data.list;
                    lecture = lectures.find(function (x) { return x.lectureSeq == lectureSeq; });
                    if (lecture === undefined)
                        return [2 /*return*/, console.log(urls, "찾을 수 없습니다.")];
                    lectureLearningSeq = lecture.lectureLearningSeq;
                    subLessonSeq = lecture.lessonSeq;
                    ebsoc_1.Player.progressIntervalInSeconds = 20;
                    player = new ebsoc_1.Player.default(token, {
                        memberSeq: memberSeq,
                        lctreLrnSqno: lectureLearningSeq,
                        lessonSeq: lessonSeq,
                        subLessonSeq: subLessonSeq,
                        classUrlPath: classUrlPath
                    });
                    if (lecture.rtpgsRt == 0) {
                        console.log("lecture create!");
                        player.create(token, {
                            contentsSeq: lecture.contentsSeq,
                            contentsTypeCode: lecture.contentsTypeCode,
                            lectureSeq: lectureSeq,
                            lessonAttendanceSeq: lecture.lessonAttendanceSeq,
                            lessonSeq: subLessonSeq,
                            officeEduCode: lecture.officeEduCode,
                            schoolCode: lecture.schoolCode
                        });
                    }
                    player.play();
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=test.js.map