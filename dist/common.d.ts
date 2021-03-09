import './substitute';
export declare function member(token: string): Promise<any>;
export declare function noticeCommonMainList(): Promise<any>;
export declare let school: {
    info: (token: string, schoolCode: string) => Promise<any>;
};
export declare let lecture: {
    detail: {
        lesson: {
            $subLessonSeq: (token: string, path: {
                subLessonSeq: number;
            }) => Promise<any>;
        };
    };
};
