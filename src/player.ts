import Url from 'url';
import CryptoJS from 'crypto-js';

import { student } from './lecture';
import { lessonDetail } from './common';

import Path from './path.json';

export const progressIntervalInSeconds = 30;

export let currentDuration = 0;

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
    let rate = current / duration;
    if (rate > 66) rate = 100;
    return Math.min(rate, 100);
}

export function getTotalDuration(token: string, lessonSeq: number) {
    const response = lessonDetail(token, lessonSeq);
    return response.data.lectureContentsDto.lectureContentsMvpDto.playTime;
}

export function getCurrentDuration(token: string, { video: string, playTime: number }) {
    const videoUrl = new Url(video);
    const path = videoUrl.pathname.split("/");
    const data = student.lectureAttendList(token, { path[2], path[4] });
    const lectureSeq = parseInt(path[6]);

    for (let i = 0; i < data.list.length; i++) {
        if (data.list[i] == lectureSeq) {
            const current = data.list[i].rtpgsRt;
            break;
        }
    }

    /* Use this when debugging
    console.log(`[DEBUG] current: ${current} `);
     */

    return playTime * current;
}

export function intervalCallback(fields: object) {
    callApi(fields.token, { fields.data.memberSeq, fields.data.lctreLrnSqno, makeRate(currentDuration, fields.data.playTime) });
    currentDuration += progressIntervalInSeconds;

    /* Use this when debugging
    console.log(`[DEBUG] currentDuration: ${currentDuration}`);
     */
}

export default class Player {
    constructor(options: { token: string, memberSeq: number, lctreLrnSqno: number, lessonSeq: number, video: string }) {
        const playTime = getTotalDuration(token, lessonSeq);

        this.fields = {
            'token': token,
            'data': {
                'memberSeq': memberSeq,
                'lctreLrnSqno': lctreLrnSqno,
                'lessonSeq': lessonSeq,
                'video': video,
                'playTime': playTime
            }
        };
        currentDuration = getCurrentDuration(token, { video, playTime });
    }
    play() {
        if (Number.isNaN(this.timer)) {
            this.timer = setInterval(intervalCallback(this.fields), progressIntervalInSeconds * 1000);
            this.clearIntvl = setTimeout(this.stop, this.fields.data.playTime * 1000);
        }
    }
    pause() {

    }
    resume() {

    }
    stop() {
        clearInterval(this.timer);
        clearInterval(this.clearIntvl);
    }
    timer = NaN;
}