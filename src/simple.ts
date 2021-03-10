import { Cls } from ".";

export enum searchType {
    classSqno = 0,
    classUrlPath = 1,
    subjectCode = 2
}

export async function classListSearch(
    token: string,
    data: { orderType?: string, schoolAffairsYear: number, searchType: string, searchWord: string, tabType: string },
    searchOptions: {
        searchType: searchType,
        searchValue: any
    }
) {
    let res = await Cls.mypage.myClassListByTabType(token, data);
    let list: Array<any> = res.data.list;
    switch (searchOptions.searchType) {
        case searchType.classSqno:
            return list.find(x => x.classSequenceNo == searchOptions.searchValue);
        case searchType.classUrlPath:
            return list.find(x => x.classUrlPath == searchOptions.searchValue);
        case searchType.subjectCode:
            return list.find(x => x.subjectCode == searchOptions.searchValue);
    }
}