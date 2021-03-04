import axios from 'axios';
import path from './path.json';

export let mypage = {
    myClassListByTabType: async function (token: string, data: { orderType?: string, schoolAffairsYear: number, searchType: string, searchWord: string, tabType: string }) {
        let url: string = "https://" + path.host + path.common.member;
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
        let url: string = "https://" + path.host + path.common.member;
        let req = await axios({
            method: 'POST',
            url: url,
            headers: {
                "X-AUTH-TOKEN": token,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
            }
        });
        return req.data;
    }
};

export let communityChattingRoom = {
    communityMyChattingParticipationListCnt: async function (token: string) {
        let url: string = "https://" + path.host + path.common.member;
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