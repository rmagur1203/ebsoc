import axios from 'axios';
import path from './path.json';

export async function member(token: string) {
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

export async function noticeCommonMainList(token: string) {
    let url: string = "https://" + path.host + path.common.noticeCommonMainList;
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

export async function noticeSchoolMainList(token: string) {
    let url: string = "https://" + path.host + path.common.noticeSchoolMainList;
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