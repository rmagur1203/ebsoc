import axios from 'axios';
import Path from './path.json';
import './substitute';

export async function member(token: string) {
    let url: string = "https://" + Path.host + Path.common.member;
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

export async function noticeCommonMainList() {
    let url: string = "https://" + Path.host + Path.common.noticeCommonMainList;
    let req = await axios({
        method: 'GET',
        url: url,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
        }
    });
    return req.data;
}

export let school = {
    info: async function (token: string, schoolCode: string) {
        let url: string = "https://" + Path.host + Path.common.school.info.substitute({ schoolCode });
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

export let lecture = {
    detail: {
        lesson: {
            $subLessonSeq: async function (token: string, path: { subLessonSeq: number }) {
                let url: string = "https://" + Path.host + Path.common.lecture.detail.lesson.$subLessonSeq
                    .substitute({ subLessonSeq: path.subLessonSeq });
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
        }
    }
}