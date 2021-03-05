import { login } from "./auth";
import { mypage } from "./cls";
import { member } from "./common";
import Player, { encrypt } from "./player";

(async () => {
    let data = await login("rmagur12032", "password");
    let token: string = data.data.token;
    let player = new Player(token, {
        memberSeq: 6915982,
        lctreLrnSqno: 4738,
        lessonSeq: 1933,
        videoUrl: 'https://sel2.ebsoc.co.kr/class/sunrinkorean1/course/1903/lecture/554904'
    });
    /*
    let player = new Player({
        token: token,
        memberSeq: 
    });
    */
    encrypt(6915982, 4860, 32);
})();