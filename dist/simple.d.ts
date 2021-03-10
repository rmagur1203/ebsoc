export declare enum searchType {
    classSqno = 0,
    classUrlPath = 1,
    subjectCode = 2
}
export declare function classListSearch(token: string, data: {
    orderType?: string;
    schoolAffairsYear: number;
    searchType: string;
    searchWord: string;
    tabType: string;
}, searchOptions: {
    searchType: searchType;
    searchValue: any;
}): Promise<any>;
