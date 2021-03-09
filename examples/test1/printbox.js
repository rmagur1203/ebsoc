"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function size(text) {
    var len = text.length;
    for (var i = 0; i < text.length; i++)
        if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text[i]))
            len += 1;
    return len;
}
var maxLen = 46;
function strip(ch, text) {
    return text + ch.repeat(maxLen - size(text));
}
function printBox(title, text) {
    console.log("\u250E\u2500" + strip("─", title) + "\u2500\u2512");
    console.log("\u2503 " + strip(" ", text) + " \u2503");
    console.log("\u2516\u2500" + "─".repeat(maxLen) + "\u2500\u251A");
}
exports.default = printBox;
//# sourceMappingURL=printbox.js.map