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
var ebsoc_1 = require("ebsoc");
var process_1 = require("process");
var readline_1 = __importDefault(require("readline"));
var stream_1 = require("stream");
var mute = false;
var mutableStdout = new stream_1.Writable({
    write: function (chunk, encoding, callback) {
        if (!mute)
            process.stdout.write(chunk, encoding);
        callback();
    }
});
var input = readline_1.default.createInterface({
    input: process.stdin,
    output: mutableStdout,
    terminal: true
});
var question = function (query) { return new Promise(function (resolve) {
    input.question(query, function (answer) {
        resolve(answer);
    });
}); };
var password = function (query) { return new Promise(function (resolve) {
    process.stdout.write(query);
    mute = true;
    input.question("", function (answer) {
        mute = false;
        process.stdout.write("\n");
        resolve(answer);
    });
}); };
var run = function (url, member) { return new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
    var token, memberSeq, classUrlPath, lessonSeq, lectureSeq, lectures, lecture, lectureLearningSeq, subLessonSeq, player;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = member.data.token;
                memberSeq = member.data.memberInfo.memberSeq;
                classUrlPath = url.split('/')[4];
                lessonSeq = Number.parseInt(url.split('/')[6]);
                lectureSeq = Number.parseInt(url.split('/')[8]);
                return [4 /*yield*/, ebsoc_1.Lecture.$classUrlPath.lesson.lecture.attend.list.$lessonSeq(token, {
                        classUrlPath: classUrlPath,
                        lessonSeq: lessonSeq
                    })];
            case 1:
                lectures = (_a.sent()).data.list;
                console.log(lectures);
                lecture = lectures.find(function (x) { return x.lectureSeq == lectureSeq; });
                if (lecture === undefined)
                    return [2 /*return*/, console.log(urls, "찾을 수 없습니다.")];
                lectureLearningSeq = lecture.lectureLearningSeq;
                subLessonSeq = lecture.lessonSeq;
                player = new ebsoc_1.Player.default(token, {
                    memberSeq: memberSeq,
                    lctreLrnSqno: lectureLearningSeq,
                    lessonSeq: lessonSeq,
                    subLessonSeq: subLessonSeq,
                    classUrlPath: classUrlPath
                });
                ebsoc_1.Player.progressIntervalInSeconds = 20;
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
                player.endCallback = function () {
                    resolve(null);
                };
                player.play();
                player.openVideo();
                return [2 /*return*/];
        }
    });
}); }); };
var courses = ["https://sel2.ebsoc.co.kr/class/sunrinenglisha/course/5326", "https://sel2.ebsoc.co.kr/class/jinro112/course/5139"];
var urls = [];
var id, pwd;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var member, _i, courses_1, course, _a, _b, _c, urls_1, url;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, question("아이디: ")];
            case 1:
                id = _d.sent();
                return [4 /*yield*/, password("비밀번호: ")];
            case 2:
                pwd = _d.sent();
                return [4 /*yield*/, ebsoc_1.Auth.login(id, pwd).catch(function (ex) {
                        //if (ex.response.status === 404)
                        ebsoc_1.PrintBox.default({
                            title: "로그인",
                            boxColor: ebsoc_1.Colors.Foreground.FgRed,
                            fgColor: ebsoc_1.Colors.Effect.Bright
                        }, [ex.response.data.message]);
                        process_1.exit();
                    })];
            case 3:
                member = _d.sent();
                _i = 0, courses_1 = courses;
                _d.label = 4;
            case 4:
                if (!(_i < courses_1.length)) return [3 /*break*/, 7];
                course = courses_1[_i];
                _b = (_a = urls).concat;
                return [4 /*yield*/, GetCourseUrls(member.data.token, course)];
            case 5:
                urls = _b.apply(_a, [_d.sent()]);
                _d.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 4];
            case 7:
                _c = 0, urls_1 = urls;
                _d.label = 8;
            case 8:
                if (!(_c < urls_1.length)) return [3 /*break*/, 11];
                url = urls_1[_c];
                console.log(url);
                return [4 /*yield*/, run(url, member)];
            case 9:
                _d.sent();
                _d.label = 10;
            case 10:
                _c++;
                return [3 /*break*/, 8];
            case 11:
                process_1.exit();
                return [2 /*return*/];
        }
    });
}); })();
function GetCourseUrls(token, course) {
    return __awaiter(this, void 0, void 0, function () {
        var data, urls;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ebsoc_1.Lecture.$classUrlPath.lesson.lecture.attend.list.$lessonSeq(token, {
                        classUrlPath: course.split('/')[4],
                        lessonSeq: parseInt(course.split('/')[6])
                    })];
                case 1:
                    data = _a.sent();
                    urls = data.data.list
                        .filter(function (x) { return x.contentsTypeCode == "001"; })
                        .map(function (x) { return course + "/lecture/" + x.lectureSeq; });
                    return [2 /*return*/, urls];
            }
        });
    });
}
//# sourceMappingURL=test.js.map