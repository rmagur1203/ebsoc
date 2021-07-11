export declare function fetchUserData(token: string): Promise<{
    data: any;
    err?: undefined;
} | {
    err: any;
    data?: undefined;
}>;
export declare const SEARCH_TYPE: Readonly<{
    NONE: string;
}>;
export declare const TAB_TYPE: Readonly<{
    SBSCE: string;
}>;
export declare function fetchClassList(token: string, data: {
    orderType?: string;
    schoolAffairsYear: number;
    searchType: string;
    searchWord: string;
    tabType: string;
}): Promise<{
    data: any;
    err?: undefined;
} | {
    err: any;
    data?: undefined;
}>;
export declare function fetchNotice(token: string, data: {
    classSqno: number;
}): Promise<any>;
export declare const COURSE_STATUS: Readonly<{
    ALL: string;
    BEFORE_LEARNING: string;
    DURING_LEARNING: string;
    COMPLETE_LEARNING: string;
}>;
export declare const COURSE_ORDER_BY: Readonly<{
    LAST_STUDY_DATE: number;
    COURSE_NAME: number;
    REGISTRATION_DATE: number;
    STUDY_START_DATE: number;
}>;
export declare function fetchCourse(token: string, classUrlPath: string, query: {
    status: string;
    orderBy: number;
    searchWord?: string;
}): Promise<any>;
export declare function isMemberOfCourse(token: string, classUrlPath: string): Promise<any>;
export declare class SimplePlayer {
    token: string;
    classUrlPath: string;
    lessonSeq: number;
    lectureInfo: any;
    private contentsSeq;
    private contentsTypeCode;
    private lectureSeq;
    private lessonAttendanceSeq;
    private officeEduCode;
    private schoolCode;
    constructor(token: string, classUrlPath: string, lessonSeq: number);
    lectureData(): Promise<any>;
    lectureDetail(): Promise<{
        err: any;
    } | undefined>;
    create(): Promise<any>;
}
export declare function notificationCount(token: string, openYn: boolean): Promise<{
    data: any;
    err?: undefined;
} | {
    err: any;
    data?: undefined;
}>;
export declare function scheduleList(token: string, classDate: string, memberSeq: number): Promise<void>;
