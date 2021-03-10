import { Auth, Cls, Common, Lecture, Player } from 'ebsoc';
import printBox from './printbox'

let urls = ["https://sel2.ebsoc.co.kr/class/totaldesign2021/course/2399/lecture/626673",
    "https://sel2.ebsoc.co.kr/class/totaldesign2021/course/2399/lecture/626672",
    "https://sel2.ebsoc.co.kr/class/totaldesign2021/course/2399/lecture/626674"];
(async () => {
    for (let url of urls)
        await run(url);
})();

async function run(url: string) {
    let member = await Auth.login("아이디", "비밀번호");
    let token: string = member.data.token;
    let memberSeq: number = member.data.memberInfo.memberSeq;
    let classUrlPath: string = url.split('/')[4];
    let lessonSeq: number = Number.parseInt(url.split('/')[6]);
    let lectureSeq: number = Number.parseInt(url.split('/')[8]);
    let lectures: Array<any> = (await Lecture.$classUrlPath.lesson.lecture.attend.list.$lessonSeq(token, {
        classUrlPath: classUrlPath,
        lessonSeq: lessonSeq
    })).data.list;
    let lecture = lectures.find(x => x.lectureSeq == lectureSeq);
    if (lecture === undefined) return console.log(urls, "찾을 수 없습니다.");
    let lectureLearningSeq = lecture.lectureLearningSeq;
    let subLessonSeq = lecture.lessonSeq;

    Player.progressIntervalInSeconds = 20;
    let player = new Player.default(token, {
        memberSeq: memberSeq,
        lctreLrnSqno: lectureLearningSeq,
        lessonSeq: lessonSeq,
        subLessonSeq: subLessonSeq,
        classUrlPath: classUrlPath
    });
    if (lecture.rtpgsRt == 0) {
        console.log("lecture create!");
        player.create(token, {
            contentsSeq: lecture.contentsSeq,
            contentsTypeCode: lecture.contentsTypeCode,
            lectureSeq: lectureSeq,
            lessonAttendanceSeq: lecture.lessonAttendanceSeq,
            lessonSeq: subLessonSeq,
            officeEduCode: lecture.officeEduCode,
            schoolCode: lecture.schoolCode
        });
    }
    player.play();
}