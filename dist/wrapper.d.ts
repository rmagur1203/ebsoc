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
export declare function notificationCount(token: string, openYn: boolean): Promise<{
    data: any;
    err?: undefined;
} | {
    err: any;
    data?: undefined;
}>;
export declare function scheduleList(token: string, classDate: string, memberSeq: number): Promise<void>;
