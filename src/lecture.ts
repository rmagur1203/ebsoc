import axios from 'axios';
import path from './path.json';

export let schedule = {
    student: {
        list: async function (token: string, data: { classDate: string, memberSeq: number }) {
            let url: string = "https://" + path.host + path.lecture.schedule.student.list;
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
};

export let student = {
    learning: async function (token: string) {
        let url: string = "https://" + path.host + path.lecture.student.learning;
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