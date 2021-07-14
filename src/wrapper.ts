import { Cls, Common, Lecture } from ".";

export async function fetchUserData(token: string) {
    try {
        let res = await Common.member(token);
        return { data: res };
    } catch (err) {
        return { err: err };
    }
}
export const SEARCH_TYPE = Object.freeze({
    NONE: "NONE"
});
export const TAB_TYPE = Object.freeze({
    SBSCE: "SBSCE"
});
export async function fetchClassList(token: string, data: { orderType?: string, schoolAffairsYear: number, searchType: string, searchWord: string, tabType: string }) {
    try {
        let res = await Cls.mypage.myClassListByTabType(token, data);
        return { data: res }
    } catch (err) {
        return { err: err };
    }
}
export async function fetchNotice(token: string, data: { classSqno: number }) {
    try {
        let res = await Cls.classMenu.menuList(token, data);
        return res
    } catch (err) {
        return { err: err };
    }
}
export const COURSE_STATUS = Object.freeze({
    ALL: "",
    BEFORE_LEARNING: "000",
    DURING_LEARNING: "001",
    COMPLETE_LEARNING: "002"
});
export const COURSE_ORDER_BY = Object.freeze({
    LAST_STUDY_DATE: 1,
    COURSE_NAME: 2,
    REGISTRATION_DATE: 3,
    STUDY_START_DATE: 4
});
export async function fetchCourse(token: string, classUrlPath: string, query: { status: string, orderBy: number, searchWord?: string }) {
    try {
        let res = await Lecture.$classUrlPath.lesson.list(token,
            { classUrlPath: classUrlPath },
            { atltStsCd: query.status, orderBy: query.orderBy, lsnNm: query.searchWord });
        return res;
    } catch (err) {
        return { err: err };
    }
}
export async function isMemberOfCourse(token: string, classUrlPath: string) {
    try {
        let res = await Cls.classMember.$classUrlPath.isMember(token, { classUrlPath: classUrlPath });
        return res;
    } catch (err) {
        return { err: err };
    }
}

export class ContentsDTO {
    data: any;
    constructor(json: any){
        this.data = json;
    }
    ContentsMvp(){
        return new ContentsMvpDTO(this.data.lectureContentsMvpDto);
    }
}
export class ContentsMvpDTO {
    data: any;
    constructor(json: any){
        this.data = json;
    }
    MvpFile(){
        return this.data.mvpFileDto;
    }
}

export class SimplePlayer {
    token: string;
    classUrlPath: string;
    lessonSeq: number;

    lectureInfo: any;
    lectureDetailInfo: any;
    
    private contentsSeq: any;
    private contentsTypeCode: any;
    private lectureSeq: any;
    private lessonAttendanceSeq: any;
    private officeEduCode: any;
    private schoolCode: any;
    private subLessonSeq: number;
    constructor(token: string, classUrlPath: string, lessonSeq: number, subLessonSeq: number) {
        this.token = token;
        this.classUrlPath = classUrlPath;
        this.lessonSeq = lessonSeq;
        this.subLessonSeq = subLessonSeq;
    }
    async courseData() {
        try {
            let res = await Lecture.$classUrlPath.lesson.lecture.attend.list.$lessonSeq(this.token, {
                classUrlPath: this.classUrlPath,
                lessonSeq: this.lessonSeq
            });
            return res;
        } catch (err) {
            return { err: err };
        }
    }
    async lectureData() {
        try {
            let res = await Lecture.$classUrlPath.lesson.lecture.attend.list._$lessonSeq.$subLessonSeq(this.token, {
                classUrlPath: this.classUrlPath,
                lessonSeq: this.lessonSeq,
                subLessonSeq: this.subLessonSeq
            });
            this.lectureInfo = res.data;
            return res;
        } catch (err) {
            return { err: err };
        }
    }
    async lectureDetailData() {
        try {
            let res = await Common.lecture.detail.lesson.$subLessonSeq(this.token, {
                subLessonSeq: this.subLessonSeq
            });
            this.lectureDetailInfo = res.data;
            return res;
        } catch (err) {
            return { err: err };
        }
    }
    async create() {
        try {
            if (!this.lectureInfo)
                await this.lectureData();
            this.contentsSeq = this.lectureInfo.cntnsSqno;
            this.contentsTypeCode = this.lectureInfo.cntnsTyCd;
            this.lectureSeq = this.lectureInfo.lctreSqno;
            this.lessonAttendanceSeq = this.lectureInfo.lsnAtltSqno;
            this.officeEduCode = this.lectureInfo.ofecCd;
            this.schoolCode = this.lectureInfo.schlCd;
            let res = await Lecture.lesson.lecture.attend.create(this.token, {
                contentsSeq: this.contentsSeq,
                contentsTypeCode: this.contentsTypeCode,
                lectureSeq: this.lectureSeq,
                lessonAttendanceSeq: this.lessonAttendanceSeq,
                officeEduCode: this.officeEduCode,
                schoolCode: this.schoolCode,
                lessonSeq: this.lessonSeq
            });
            return res;
        } catch (err) {
            return { err: err };
        }
    }
    async Contents() {
        try {
            if (!this.lectureDetailInfo)
                await this.lectureData();
            return new ContentsDTO(this.lectureDetailInfo.lectureContentsDto);
        } catch (err) {
            return { err: err };
        }
    }
}


export async function notificationCount(token: string, openYn: boolean) {
    try {
        let res = await Cls.cmyNotification.totalCount(token, openYn ? "Y" : "N");
        return { data: res }
    } catch (err) {
        return { err: err };
    }
}
export async function scheduleList(token: string, classDate: string, memberSeq: number) {

}

