import CryptoJS from 'crypto-js';

import { student } from './lecture';
import { lessonDetail } from './common';

import Path from './path.json';

export let currentDuration = 0;

const progressIntervalInSeconds = 30;
export { progressIntervalInSeconds };

const key = CryptoJS.enc.Latin1.parse('l40jsfljasln32uf');
const iv = CryptoJS.enc.Latin1.parse('asjfknal3bafjl23');
export { key, iv };

export function encrypt(memberSeq: number, lctreLrnSqno: number, progressRate: number) {
    var data = `${memberSeq}|${lctreLrnSqno}|${progressRate}`;

    var encrypted = CryptoJS.AES.encrypt(
        data,
        key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        }
    );
    //console.log('encrypted: ' + encrypted);
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

export async function getTotalDuration(token: string, lessonSeq: number) {
    const data = await lessonDetail(token, lessonSeq);
    return data.lectureContentsDto.lectureContentsMvpDto.playTime;
}

export async function getCurrentDuration(token: string, video: { url: string, duration: number }) {
    const path = video.url.split("/");
    const classSqno = parseInt(path[6]);
    const data = await student.lectureAttendList(token, { classUrlPath: path[4], classSqno: classSqno });
    let current: number = 0;
    for (let i = 0; i < data.list.length; i++) {
        if (data.list[i] == classSqno) {
            current = data.list[i].rtpgsRt;
            break;
        }
    }

    /* Use this when debugging
    console.log(`[DEBUG] current: ${current} `);
     */

    return video.duration * current;
}

export function intervalCallback(token: string, data: { memberSeq: number, lctreLrnSqno: number, currentDuration: number, playTime: number }) {
    callApi(token, {
        memberSeq: data.memberSeq,
        lctreLrnSqno: data.lctreLrnSqno,
        rate: makeRate(data.currentDuration, data.playTime)
    });
    currentDuration += progressIntervalInSeconds;

    /* Use this when debugging
    console.log(`[DEBUG] currentDuration: ${currentDuration}`);
     */
}

export default class Player {
    timer: number = NaN;
    fields: {
        token: string,
        data: {
            memberSeq: number,
            lctreLrnSqno: number,
            lessonSeq: number
        },
        video: {
            url: string,
            duration: number
        }
    };
    clearIntvl: number = NaN;
    constructor(token: string, options: { memberSeq: number, lctreLrnSqno: number, lessonSeq: number, videoUrl: string }) {
        this.fields = {
            token: token,
            data: {
                memberSeq: options.memberSeq,
                lctreLrnSqno: options.lctreLrnSqno,
                lessonSeq: options.lessonSeq
            },
            video: {
                url: options.videoUrl,
                duration: NaN
            }
        };
        this.getDuration(token, options.lessonSeq);
    }
    async getDuration(token: string, lessonSeq: number) {
        const duration = await getTotalDuration(token, lessonSeq);
        this.fields.video.duration = duration;
        currentDuration = await getCurrentDuration(token, duration);
    }
    play() {
        if (Number.isNaN(this.timer)) {
            this.timer = setInterval(intervalCallback, progressIntervalInSeconds * 1000, this.fields);
            this.clearIntvl = setTimeout(this.stop, this.fields.video.duration * 1000);
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
}