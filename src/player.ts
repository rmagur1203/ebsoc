import CryptoJS from 'crypto-js';
import { student } from './lecture';
import Path from './path.json';

const interval_sec = 30;
const interval_callback = () => {

}
const complete_callback = () => {

}
const pause_callback = () => {

}
export { interval_sec, interval_callback, complete_callback, pause_callback };

export default class Player {
    constructor(options: {token: string, memberSeq: number, lctreLrnSqno: number, video: string}) {

    }
    play() {
        if (Number.isNaN(this.timer))
            this.timer = setInterval(interval_callback, interval_sec * 1000);
    }
    stop() {
        clearInterval(this.timer);
    }
    timer = NaN;
}

const key = CryptoJS.enc.Latin1.parse('l40jsfljasln32uf');
const iv = CryptoJS.enc.Latin1.parse('asjfknal3bafjl23');
export { key, iv };

export function encrypt(memberSeq: number, lctreLrnSqno: number, progressRate: number) {
    var data = `${memberSeq}|${lctreLrnSqno}|${progressRate}`;

    var encrypted = CryptoJS.AES.encrypt(
        data,
        key,
        {
            iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding
        });
    console.log('encrypted: ' + encrypted);
    //var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding });
    //console.log('decrypted: '+decrypted.toString(CryptoJS.enc.Utf8));

    return encrypted.toString();
    // return decrypted;
}

export function callApi(token: string, data: { memberSeq: number, lctreLrnSqno: number, rate: number }) {
    let encriptedProgressRate = encrypt(data.memberSeq, data.lctreLrnSqno, data.rate);
    student.learningProgress(token, data.lctreLrnSqno, { encriptedProgressRate });
}

export function makeRate(current: number, duration: number) {
    let rate = current / duration * 100;
    if (rate > 66) rate = 100;
    return Math.min(rate, 100);
}