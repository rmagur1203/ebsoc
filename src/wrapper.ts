import { Cls, Common } from ".";

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

export async function notificationCount(token: string, openYn: boolean) {
    try {
        let res = await Cls.cmyNotification.totalCount(token, openYn ? "Y" : "N");
        return { data: res }
    } catch (err) {
        return { err: err };
    }
}

export async function scheduleList(token: string, classDate: string, memberSeq: number){

}

