import CryptoJS from 'crypto-js';

import { student } from './lecture';
import { lessonDetail } from './common';

export const progressIntervalInSeconds: number = 30;

export let currentDuration: number = 0;

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

export function callApi(token: string, rate: number, data: { memberSeq: number, lctreLrnSqno: number }) {
    let encriptedProgressRate = encrypt(data.memberSeq, data.lctreLrnSqno, rate);
    student.learningProgress(token, data.lctreLrnSqno, { encriptedProgressRate });
}

export function makeRate(current: number, duration: number) {
    let rate = current / duration;
    if (rate > 66) rate = 100;
    return Math.min(rate, 100);
}

export function getTotalDuration(token: string, lessonSeq: number) {
    const response = lessonDetail(token, lessonSeq.toString());
    return response.data.lectureContentsDto.lectureContentsMvpDto.playTime;
}

export function getCurrentDuration(token: string, video: string, body: { playTime: number }) {
    const path = video.split("/");
    const classSqno = path[6];

    const data = student.lectureAttendList(token, path[4], { classSqno });
    const lectureSeq = parseInt(classSqno);

    let current: number = 0;

    for (let i = 0; i < data.list.length; i++) {
        if (data.list[i] == lectureSeq) {
            current = data.list[i].rtpgsRt;
            break;
        }
    }

    /* Use this when debugging
    console.log(`[DEBUG] current: ${current} `);
     */

    return body.playTime * current;
}

export function intervalCallback(token: string, memberSeq: number, lctreLrnSqno: number, playTime: number) {
    const res: number = makeRate(currentDuration, playTime);

    callApi(token, res, { memberSeq, lctreLrnSqno });
    currentDuration += progressIntervalInSeconds;

    /* Use this when debugging
    console.log(`[DEBUG] currentDuration: ${currentDuration}`);
     */
}

export default class Player {
    constructor(options: { token: string, memberSeq: number, lctreLrnSqno: number, lessonSeq: number, video: string }) {
        const playTime = getTotalDuration(options.token, options.lessonSeq);

        this.token = options.token;
        this.memberSeq = options.memberSeq;
        this.lctreLrnSqno = options.lctreLrnSqno;
        this.lessonSeq = options.lessonSeq;
        this.video = options.video;
        this.playTime = playTime;
        
        currentDuration = getCurrentDuration(options.token, options.video, { playTime });
    }
    play() {
        if (Number.isNaN(this.timer)) {
            
            this.timer = setInterval("intervalCallback(this.token, this.memberSeq, this.lctreLrnSqno, this.playTime)", progressIntervalInSeconds * 1000);
            this.clearIntvl = setTimeout(this.stop, this.playTime * 1000);
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
    clearIntvl = NaN;
    token: string;
    memberSeq: number;
    lctreLrnSqno: number;
    lessonSeq: number;
    video: string;
    playTime: number;
}