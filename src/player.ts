import CryptoJS from 'crypto-js';

import { $classUrlPath, lesson, student } from './lecture';
import { lecture } from './common';

import Path from './path.json';

const progressIntervalInSeconds = 5;//30;
export { progressIntervalInSeconds };

const key = CryptoJS.enc.Latin1.parse('l40jsfljasln32uf');
const iv = CryptoJS.enc.Latin1.parse('asjfknal3bafjl23');
export { key, iv };

//#region type
type FieldType = {
    token: string,
    data: {
        memberSeq: number,
        lctreLrnSqno: number,
        lessonSeq: number,
        subLessonSeq: number
    },
    video: {
        url: string,
        duration: number
    },
    current: Date
};
type CallbackData = {
    token: string,
    data: {
        memberSeq: number,
        lctreLrnSqno: number,
        startTime: Date,
        playTime: number
    }
}
//#endregion type

//#region basicfunctions
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
    return student.learningProgress(token, data.lctreLrnSqno, { encriptedProgressRate });
}

export function makeRate(current: number, duration: number) {
    let rate = current / duration;
    if (rate > 66) rate = 100;
    return Math.min(rate, 100);
}

export async function lessonList(token: string, path: { classUrlPath: string, lessonSeq: number }) {
    const res = await $classUrlPath.lesson.lecture.attend.list.$lessonSeq(token, path);
    const list: Array<any> = res.data.list;
    return list;
}
//#endregion basicfunctions
//#region mvpfunctions
export async function mvpDto(token: string, path: { subLessonSeq: number }) {
    const learning = await lecture.detail.lesson.$subLessonSeq(token, path);
    return learning.data.lectureContentsDto.lectureContentsMvpDto;
}

export async function mvpFileUrlPath(token: string, path: { subLessonSeq: number }) {
    const Dto = await mvpDto(token, path);
    return Dto.mvpFileUrlPath;
}

export async function mvpPlayTime(token: string, path: { subLessonSeq: number }) {
    const Dto = await mvpDto(token, path);
    return Dto.playTime;
}

export async function mvpCurrentPercent(token: string, path: { classUrlPath: string, lessonSeq: number }, search: { subLessonSeq: number }) {
    const res = await $classUrlPath.lesson.lecture.attend.list.$lessonSeq(token, path);
    const list: Array<any> = res.data.list;
    const first = list.find(x => x.lessonSeq == search.subLessonSeq);
    return first.rtpgsRt / 100;
}
//#endregion mvpfuncitons
//#region callbacks
const intervalCallback = async (data: CallbackData) => {
    let sec = (new Date().getTime() - data.data.startTime.getTime()) / 1000;
    let rate = Math.floor(makeRate(sec, data.data.playTime));
    let res = await callApi(data.token, {
        memberSeq: data.data.memberSeq,
        lctreLrnSqno: data.data.lctreLrnSqno,
        rate: rate
    });
    console.log(sec, rate, res);
}
//#endregion callbacks

export default class Player {
    timer: number = -1;
    fields: FieldType;
    clearIntvl: number = NaN;
    constructor(token: string, options: {
        memberSeq: number,
        lctreLrnSqno: number,
        lessonSeq: number,
        subLessonSeq: number
    }) {
        this.fields = {
            token: token,
            data: {
                memberSeq: options.memberSeq,
                lctreLrnSqno: options.lctreLrnSqno,
                lessonSeq: options.lessonSeq,
                subLessonSeq: options.subLessonSeq
            },
            video: {
                url: "",
                duration: NaN
            },
            current: new Date()
        };
    }
    async create(token: string, data: {
        contentsSeq: number
        contentsTypeCode: string
        lectureSeq: number
        lessonAttendanceSeq: number
        lessonSeq: number
        officeEduCode: string
        schoolCode: string
    }) {
        await lesson.lecture.attend.create(token, data);
    }
    play() {
        if (this.timer === -1) {
            (async()=>{
                const startTime = new Date();
                const playTime = await mvpPlayTime(this.fields.token, {
                    subLessonSeq: this.fields.data.subLessonSeq
                });
                intervalCallback({
                    token: this.fields.token,
                    data: {
                        memberSeq: this.fields.data.memberSeq,
                        lctreLrnSqno: this.fields.data.lctreLrnSqno,
                        startTime: startTime,
                        playTime: playTime
                    }
                });
                this.timer = setInterval(intervalCallback, progressIntervalInSeconds * 1000, {
                    token: this.fields.token,
                    data: {
                        memberSeq: this.fields.data.memberSeq,
                        lctreLrnSqno: this.fields.data.lctreLrnSqno,
                        startTime: startTime,
                        playTime: playTime
                    }
                });
            })();
        }
    }
    pause() {
        //미지원
    }
    resume() {
        //미지원
    }
    stop() {
        if (this.timer != -1)
            clearInterval(this.timer);
    }
}