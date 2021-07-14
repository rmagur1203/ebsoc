import axios from 'axios';
import Path from './path.json';
import './substitute';

export let schedule = {
    student: {
        list: async function (token: string, data: { classDate: string, memberSeq: number }) {
            let url: string = "https://" + Path.host + Path.lecture.schedule.student.list;
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
        let url: string = "https://" + Path.host + Path.lecture.student.learning;
        let req = await axios({
            method: 'GET',
            url: url,
            headers: {
                "X-AUTH-TOKEN": token,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
            }
        });
        return req.data;
    },
    learningProgress: async function (token: string, lectureLearningSeq: number, data: { encriptedProgressRate: string }) {
        ///common_domain/lecture/api/v1/sunrinkorean1/lesson/lecture/attend/list/1903 => lectureLearningSeq
        //console.log(lectureLearningSeq)
        let url: string = "https://" + Path.host + Path.lecture.student.learningProgress
            .replace('${lectureLearningSeq}', lectureLearningSeq.toString());
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

export let lesson = {
    lecture: {
        attend: {
            create: async function (token: string, data: {
                contentsSeq: number
                contentsTypeCode: string
                lectureSeq: number
                lessonAttendanceSeq: number
                lessonSeq: number
                officeEduCode: string
                schoolCode: string
            }) {
                let url: string = "https://" + Path.host + Path.lecture.lesson.lecture.attend.create;
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
    }
}

export let $classUrlPath = {
    lesson: {
        list: async function (token: string, path: { classUrlPath: string }, query: { atltStsCd: any, orderBy: number, lsnNm?: string }) {
            let url: string = "https://" + Path.host + Path.lecture.$classUrlPath.lesson.list
                .substitute(path);
            let req = await axios({
                method: 'GET',
                url: url,
                headers: {
                    "X-AUTH-TOKEN": token,
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
                }
            });
            return req.data;
        },
        info: async function (token: string, path: { classUrlPath: string, lessonSeq: number }) {
            let url: string = "https://" + Path.host + Path.lecture.$classUrlPath.lesson.info
                .substitute(path);
            //console.log(url)
            let req = await axios({
                method: 'GET',
                url: url,
                headers: {
                    "X-AUTH-TOKEN": token,
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
                }
            });
            return req.data;
        },
        lecture: {
            attend: {
                list: {
                    $lessonSeq: async function (token: string, path: { classUrlPath: string, lessonSeq: number }) {
                        let url: string = "https://" + Path.host + Path.lecture.$classUrlPath.lesson.lecture.attend.list.$lessonSeq
                            .substitute(path);
                        //console.log(url);
                        let req = await axios({
                            method: 'GET',
                            url: url,
                            headers: {
                                "X-AUTH-TOKEN": token,
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
                            }
                        });
                        return req.data;
                    },
                    _$lessonSeq: {
                        $subLessonSeq: async function (token: string, path: { classUrlPath: string, lessonSeq: number, subLessonSeq: number }) {
                            let url: string = "https://" + Path.host + Path.lecture.$classUrlPath.lesson.lecture.attend.list._$lessonSeq.$subLessonSeq
                                .substitute(path);
                            //console.log(url);
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
        }
    }
}