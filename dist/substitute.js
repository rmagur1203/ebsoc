"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
String.prototype.substitute = function (obj) {
    var str = this;
    for (var _i = 0, _a = Object.getOwnPropertyNames(obj); _i < _a.length; _i++) {
        var data = _a[_i];
        str = str.replace("${" + data + "}", obj[data]);
    }
    return str;
};
//# sourceMappingURL=substitute.js.map