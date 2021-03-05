import { login } from "./auth";
import { mypage } from "./cls";
import { member } from "./common";
import Player, { encrypt } from "./player";

(async () => {
    let data = await login("rmagur12032", "password");
    let token: string = data.data.token;
    data = await member(token);
    /*
    let player = new Player({
        token: token,
        memberSeq: 
    });
    */
    encrypt(6915982, 4860, 32);
})();