import axios from 'axios';
import path from './path.json';

export let mypage = {
    myClassListByTabType: async function (token: string, data: { orderType?: string, schoolAffairsYear: number, searchType: string, searchWord: string, tabType: string }) {
        let url: string = "https://" + path.host + path.cls.mypage.myClassListByTabType;
        let req = await axios({
            method: 'POST',
            url: url,
            headers: {
                "X-AUTH-TOKEN": token,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
            },
            data: data
        });
        return req.data;
    }
};

export let cmyNote = {
    receiptNotOpenCount: async function (token: string) {
        let url: string = "https://" + path.host + path.cls.cmyNote.receiptNotOpenCount;
        let req = await axios({
            method: 'GET',
            url: url,
            headers: {
                "X-AUTH-TOKEN": token,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
            }
        });
        return req.data;
    }
};

export let cmyNotification = {
    totalCount: async function (token: string, openYn: string) {
        let url: string = "https://" + path.host + path.cls.cmyNotification.totalCount;
        let req = await axios({
            method: 'POST',
            url: url,
            headers: {
                "X-AUTH-TOKEN": token,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
            },
            data: {
                openYn: openYn
            }
        });
        return req.data;
    }
}

export let communityChattingRoom = {
    communityMyChattingParticipationListCnt: async function (token: string) {
        let url: string = "https://" + path.host + path.cls.communityChattingRoom.communityMyChattingParticipationListCnt;
        let req = await axios({
            method: 'POST',
            url: url,
            headers: {
                "X-AUTH-TOKEN": token,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
            },
            data: {}
        });
        return req.data;
    }
}

export let school = {
    schoolClassList: async function (token: string, data: { classSeCd: string, offecCd: string, orderType: string, schlGrdCd: string, schoolAffairsYear: string, schoolCode: string, searchWord: string, userSequenceNo: number }) {
        let url: string = "https://" + path.host + path.cls.school.schoolClassList;
        let req = await axios({
            method: 'POST',
            url: url,
            headers: {
                "X-AUTH-TOKEN": token,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
            },
            data: data
        });
        return req.data;
    }
};

export let lctClass = {
    detail: async function (token: string, data: { classUrlPath: string }) {
        let url: string = "https://" + path.host + path.cls.lctClass.detail;
        let req = await axios({
            method: 'POST',
            url: url,
            headers: {
                "X-AUTH-TOKEN": token,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
            },
            data: data
        });
        return req.data;
    },
    classSqno: async function (token: string, classSqno: number, data: { schoolCode: string }){
        let url: string = "https://" + path.host + path.cls.lctClass.class.replace('${classSqno}', classSqno.toString());
        let req = await axios({
            method: 'POST',
            url: url,
            headers: {
                "X-AUTH-TOKEN": token,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
            },
            data: data
        });
        return req.data;
    }
}

export let classMenu = {
    menuList: async function (token: string, data: {classSqno:number}) {

    }
}

export async function communityBoardNoticeMainList(token: string, data: { classUrlPath: string }) {
    let url: string = "https://" + path.host + path.cls.communityBoardNoticeMainList;
    let req = await axios({
        method: 'POST',
        url: url,
        headers: {
            "X-AUTH-TOKEN": token,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
        },
        data: data
    });
    return req.data;
}