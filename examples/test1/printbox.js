"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lightPrintBox = exports.maxLen = void 0;
exports.maxLen = 46;
function lightPrintBox(title) {
    var lines = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        lines[_i - 1] = arguments[_i];
    }
    console.log("\u250E\u2500" + strip("─", title) + "\u2500\u2512");
    for (var _a = 0, lines_1 = lines; _a < lines_1.length; _a++) {
        var line = lines_1[_a];
        console.log("\u2503 " + strip(" ", line) + " \u2503");
    }
    console.log("\u2516\u2500" + "─".repeat(exports.maxLen) + "\u2500\u251A");
    function size(text) {
        var len = text.length;
        for (var i = 0; i < text.length; i++)
            if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text[i]))
                len += 1;
        return len;
    }
    function strip(ch, text) {
        return text + ch.repeat(exports.maxLen - size(text));
    }
}
exports.lightPrintBox = lightPrintBox;
function printBox(options) {
    var lines = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        lines[_i - 1] = arguments[_i];
    }
    options.title || (options.title = "");
    options.titleColor || (options.titleColor = "\x1b[33m");
    options.boxColor || (options.boxColor = "");
    options.bgColor || (options.bgColor = "");
    var count = exports.maxLen - size(lines.map(function (x) { return tostr(x); }).join(' ')) - 1;
    var header = "" + options.bgColor + options.boxColor + "\u250E\u2500\u001B[0m";
    header += "" + options.bgColor + options.titleColor + options.title + "\u001B[0m";
    header += "" + options.bgColor + options.boxColor + "─".repeat(exports.maxLen - size(options.title || "")) + "\u2500\u2512\u001B[0m";
    console.log(header);
    var bodyHead = "" + options.bgColor + options.boxColor + "\u2503\u001B[0m" + options.bgColor;
    var bodyTail = "" + options.bgColor + options.boxColor + ' '.repeat(count) + " \u2503\u001B[0m";
    console.log.apply(console, __spreadArray(__spreadArray([bodyHead], lines), [bodyTail]));
    var footer = "" + options.bgColor + options.boxColor + "\u2516\u2500" + "─".repeat(exports.maxLen) + "\u2500\u251A\u001B[0m";
    console.log(footer);
    function tostr(obj) {
        if (typeof obj == 'object')
            return JSON.stringify(obj) + " ";
        return obj.toString();
    }
    function size(text) {
        var len = text.length;
        for (var i = 0; i < text.length; i++)
            if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text[i]))
                len += 1;
        return len;
    }
}
exports.default = printBox;
//# sourceMappingURL=printbox.js.map