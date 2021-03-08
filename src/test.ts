import { login } from "./auth";
import { lctClass, mypage } from "./cls";
import { member } from "./common";
import Player, { callApi, encrypt } from "./player";
import AxiosDebug from 'axios-debug-log';
import { $classUrlPath } from "./lecture";
AxiosDebug({
    error: function (debug, error) {
        console.log(error.request.path);
    }
});

(async () => {
    let member = await login("아이디", "비밀번호");
    let token: string = member.data.token;
    let memberSeq: number = member.data.memberInfo.memberSeq;
    let schoolCode: string = member.data.memberInfo.memberSchoolCode;
    let classUrlPath = "tongsa1c";

    let clsDetail = await lctClass.detail(token, {
        classUrlPath: classUrlPath
    });
    let classSqno: number = clsDetail.data.classSqno;

    clsDetail = await lctClass.classSqno(token, classSqno, { schoolCode: schoolCode });

    let lessons = await $classUrlPath.lesson.list(token, { classUrlPath });
    let lessonSeq = 1815;
    
    let learnings = await $classUrlPath.lesson.lecture.attend.list.$lessonSeq(token, {
        classUrlPath: classUrlPath,
        lessonSeq: lessonSeq
    });
    let subLessonSeq = 91;
    let lectureLearningSeq = 7707;
    
    /*
    callApi(token, {
        memberSeq: memberSeq,
        lctreLrnSqno: lectureLearningSeq,
        rate: 2
    });
    */
    let player = new Player(token, {
        memberSeq: member.data.memberInfo.memberSeq,
        lctreLrnSqno: lectureLearningSeq,
        lessonSeq: lessonSeq,
        subLessonSeq: subLessonSeq
    });
    player.play();
    /*
    let player = new Player({
        token: token,
        memberSeq: 
    });
    */
    encrypt(6915982, 4860, 32);
})();