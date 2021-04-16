import { getVideoDurationInSeconds as videoDuration } from 'get-video-duration';

import CryptoJS from 'crypto-js';

import { $classUrlPath, lesson, student } from './lecture';
import { lecture } from './common';

import Path from './path.json';
import printBox from './printbox';
import { Cls } from '.';
import { classListSearch, searchType } from './simple';

let progressIntervalInSeconds: number = 5;//30;
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
        subLessonSeq: number,
        classUrlPath: string
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
        playTime: number,
        appendTime: number,
    },
    player: Player,
    endCallback: Function
};
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
    console.log(data);
    return student.learningProgress(token, data.lctreLrnSqno, { encriptedProgressRate });
}

export function makeRate(current: number, duration: number) {
    let rate = current / duration * 100;
    if (rate > 66) rate = 100;
    return Math.floor(Math.min(rate, 100));
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
    if (!Dto.playTime)
        return await videoDuration(Dto.mvpFileUrlPath);
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
const intervalCallback = async (data: CallbackData, completeCallback: Function) => {
    let sec = (new Date().getTime() - data.data.startTime.getTime()) / 1000;
    let rate = Math.min(makeRate(sec, data.data.playTime) + data.data.appendTime, 100);
    if (rate >= 66) rate = 100;
    console.log(data.data);
    let res = await callApi(data.token, {
        memberSeq: data.data.memberSeq,
        lctreLrnSqno: data.data.lctreLrnSqno,
        rate: rate
    });
    printBox({
        title: data.data.lctreLrnSqno.toString(),
        boxColor: "\x1b[32m"
    }, [sec.toString(), "/", data.data.playTime.toString(), "=", rate.toString()],
        [makeRate(sec, data.data.playTime), "+", data.data.appendTime, "=", rate.toString()],
        [res]);
    if (rate >= 100)
        completeCallback(data);
}
const completeCallback = async (data: CallbackData) => {
    data.player.stop();
    printBox({
        title: data.data.lctreLrnSqno.toString(),
        boxColor: "\x1b[33m"
    }, ["status", ":", "\x1b[31mstopped"]);
    if (data.endCallback)
        data.endCallback();
}
//#endregion callbacks

export default class Player {
    timer: number = -1;
    fields: FieldType;
    clearIntvl: number = NaN;
    endCallback?: Function = undefined;
    constructor(token: string, options: {
        memberSeq: number,
        lctreLrnSqno: number,
        lessonSeq: number,
        subLessonSeq: number,
        classUrlPath: string
    }) {
        this.fields = {
            token: token,
            data: {
                memberSeq: options.memberSeq,
                lctreLrnSqno: options.lctreLrnSqno,
                lessonSeq: options.lessonSeq,
                subLessonSeq: options.subLessonSeq,
                classUrlPath: options.classUrlPath
            },
            video: {
                url: "",
                duration: NaN
            },
            current: new Date()
        };
    }
    async openVideo() {
        let path = await mvpFileUrlPath(this.fields.token, {
            subLessonSeq: this.fields.data.subLessonSeq
        });
        var start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
        console.log(path);
        return require('child_process').exec(start + ' ' + path);
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
    async play() {
        if (this.timer !== -1) return;
        const startTime = new Date();
        const playTime = await mvpPlayTime(this.fields.token, {
            subLessonSeq: this.fields.data.subLessonSeq
        });
        const percent = (await mvpCurrentPercent(this.fields.token, {
            classUrlPath: this.fields.data.classUrlPath,
            lessonSeq: this.fields.data.lessonSeq
        }, {
            subLessonSeq: this.fields.data.subLessonSeq
        }));
        const currentTime = percent * 100;
        if (currentTime >= 100) {
            printBox({
                title: this.fields.data.lctreLrnSqno.toString(),
                boxColor: "\x1b[34m"
            }, ["이미 학습한 영상입니다. \x1b[1m\x1b[34m(건너뜀)\x1b[0m"]);
            if (this.endCallback)
                this.endCallback();
            return;
        }
        this.timer = setInitInterval(intervalCallback, progressIntervalInSeconds * 1000, {
            token: this.fields.token,
            data: {
                memberSeq: this.fields.data.memberSeq,
                lctreLrnSqno: this.fields.data.lctreLrnSqno,
                startTime: startTime,
                playTime: playTime,
                appendTime: currentTime
            },
            player: this,
            endCallback: this.endCallback
        }, completeCallback);
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

function setInitInterval(handler: Function, timeout: number, ...args: any[]) {
    handler(...args);
    return setInterval(handler, timeout, ...args);
}