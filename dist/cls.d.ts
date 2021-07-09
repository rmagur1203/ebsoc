export declare let mypage: {
    myClassListByTabType: (token: string, data: {
        orderType?: string;
        schoolAffairsYear: number;
        searchType: string;
        searchWord: string;
        tabType: string;
    }) => Promise<any>;
};
export declare let cmyNote: {
    receiptNotOpenCount: (token: string) => Promise<any>;
};
export declare let cmyNotification: {
    totalCount: (token: string, openYn: string) => Promise<any>;
};
export declare let communityChattingRoom: {
    communityMyChattingParticipationListCnt: (token: string) => Promise<any>;
};
export declare let school: {
    schoolClassList: (token: string, data: {
        classSeCd: string;
        offecCd: string;
        orderType: string;
        schlGrdCd: string;
        schoolAffairsYear: string;
        schoolCode: string;
        searchWord: string;
        userSequenceNo: number;
    }) => Promise<any>;
};
export declare let lctClass: {
    detail: (token: string, data: {
        classUrlPath: string;
    }) => Promise<any>;
    classSqno: (token: string, classSqno: number, data: {
        schoolCode: string;
    }) => Promise<any>;
};
export declare let classMenu: {
    menuList: (token: string, data: {
        classSqno: number;
    }) => Promise<void>;
};
export declare function communityBoardNoticeMainList(token: string, data: {
    classUrlPath: string;
}): Promise<any>;
