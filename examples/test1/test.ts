import { Auth, Cls, Common, Lecture, Player } from 'ebsoc';

(async () => {
    let member = await Auth.login("아아디", "비밀번호");
    let token: string = member.data.token;
    let memberSeq: number = member.data.memberInfo.memberSeq;
    let schoolCode: string = member.data.memberInfo.memberSchoolCode;
    let classUrlPath = "tongsa1c";

    let clsDetail = await Cls.lctClass.detail(token, {
        classUrlPath: classUrlPath
    });
    let classSqno: number = clsDetail.data.classSqno;

    clsDetail = await Cls.lctClass.classSqno(token, classSqno, { schoolCode: schoolCode });

    let lessons = await Lecture.$classUrlPath.lesson.list(token, { classUrlPath });
    let lessonSeq = 1815;

    let learnings = await Lecture.$classUrlPath.lesson.lecture.attend.list.$lessonSeq(token, {
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
    let player = new Player.default(token, {
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
    //encrypt(6915982, 4860, 32);
})();