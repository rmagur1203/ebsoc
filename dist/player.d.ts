import CryptoJS from 'crypto-js';
declare const progressIntervalInSeconds = 5;
export { progressIntervalInSeconds };
declare const key: CryptoJS.lib.WordArray;
declare const iv: CryptoJS.lib.WordArray;
export { key, iv };
declare type FieldType = {
    token: string;
    data: {
        memberSeq: number;
        lctreLrnSqno: number;
        lessonSeq: number;
        subLessonSeq: number;
    };
    video: {
        url: string;
        duration: number;
    };
    current: Date;
};
export declare function encrypt(memberSeq: number, lctreLrnSqno: number, progressRate: number): string;
export declare function callApi(token: string, data: {
    memberSeq: number;
    lctreLrnSqno: number;
    rate: number;
}): Promise<any>;
export declare function makeRate(current: number, duration: number): number;
export declare function lessonList(token: string, path: {
    classUrlPath: string;
    lessonSeq: number;
}): Promise<any[]>;
export declare function mvpDto(token: string, path: {
    subLessonSeq: number;
}): Promise<any>;
export declare function mvpFileUrlPath(token: string, path: {
    subLessonSeq: number;
}): Promise<any>;
export declare function mvpPlayTime(token: string, path: {
    subLessonSeq: number;
}): Promise<any>;
export declare function mvpCurrentPercent(token: string, path: {
    classUrlPath: string;
    lessonSeq: number;
}, search: {
    subLessonSeq: number;
}): Promise<number>;
export default class Player {
    timer: number;
    fields: FieldType;
    clearIntvl: number;
    constructor(token: string, options: {
        memberSeq: number;
        lctreLrnSqno: number;
        lessonSeq: number;
        subLessonSeq: number;
    });
    create(token: string, data: {
        contentsSeq: number;
        contentsTypeCode: string;
        lectureSeq: number;
        lessonAttendanceSeq: number;
        lessonSeq: number;
        officeEduCode: string;
        schoolCode: string;
    }): Promise<void>;
    play(): void;
    pause(): void;
    resume(): void;
    stop(): void;
}
