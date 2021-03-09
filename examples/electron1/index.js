"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path_1 = __importDefault(require("path"));
var url_1 = __importDefault(require("url"));
//윈도우 객체의 전역으로 선언합니다. 그렇지 않으면 윈도우가 자동으로 닫는다.
//자바 스크립트 객체가 가비지 수집 될 때 자동으로 닫는다.
var win;
function createWindow() {
    // 브라우저 창을 만듭니다.
    win = new electron_1.BrowserWindow({ width: 800, height: 600 });
    //index.html를 로드합니다.
    win.loadURL(url_1.default.format({
        pathname: path_1.default.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    // 개발툴을 사용하기 위해 오픈한다.
    win.webContents.openDevTools();
    // 윈도우가 닫힐 때 발생되는 이벤트다.
    win.on('closed', function () {
    });
}
//사용 준비가 완료되면 윈도우를 연다.
electron_1.app.on('ready', createWindow);
// 모든 창이 닫히면 종료한다.
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // macOS에서 독 아이콘이 클릭되고 다른 창은 열리지 않는다.
    if (win === null) {
        createWindow();
    }
});
//# sourceMappingURL=index.js.map