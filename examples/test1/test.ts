import { Auth, Cls, Common, Lecture, Player, PrintBox, Colors } from 'ebsoc';
import { exit } from 'process';
import readline from 'readline';
import { Writable } from 'stream';

let mute = false;
const mutableStdout = new Writable({
    write: function (chunk, encoding, callback) {
        if (!mute)
            process.stdout.write(chunk, encoding);
        callback();
    }
});
const input = readline.createInterface({
    input: process.stdin,
    output: mutableStdout,
    terminal: true
});
const question = (query: string) => new Promise<string>(resolve => {
    input.question(query, function (answer) {
        resolve(answer);
    });
});
const password = (query: string) => new Promise<string>(resolve => {
    process.stdout.write(query);
    mute = true;
    input.question("", function (answer) {
        mute = false;
        process.stdout.write("\n");
        resolve(answer);
    });
});

let urls = ["https://sel2.ebsoc.co.kr/class/totaldesign2021/course/2399/lecture/616773"];
let id: string, pwd: string;
(async () => {
    id = await question("아이디: ");
    pwd = await password("비밀번호: ");
    for (let url of urls)
        await run(url);
    exit();
})();

async function run(url: string) {
    let member = await Auth.login(id, pwd).catch(ex => {
        //if (ex.response.status === 404)
        PrintBox.default({
            title: "로그인",
            boxColor: Colors.Foreground.FgRed,
            fgColor: Colors.Effect.Bright
        }, [ex.response.data.message]);
        exit();
    });
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

    let player = new Player.default(token, {
        memberSeq: memberSeq,
        lctreLrnSqno: lectureLearningSeq,
        lessonSeq: lessonSeq,
        subLessonSeq: subLessonSeq,
        classUrlPath: classUrlPath
    });
    Player.progressIntervalInSeconds = 20;
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