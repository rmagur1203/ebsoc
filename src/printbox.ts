export let maxLen = 120;

export function lightPrintBox(title: string, ...lines: Array<string>) {
    console.log(`┎─${strip("─", title)}─┒`);
    for (let line of lines)
        console.log(`┃ ${strip(" ", line)} ┃`);
    console.log(`┖─${"─".repeat(maxLen)}─┚`);
    function size(text: string) {
        let len = text.length;
        for (let i = 0; i < text.length; i++)
            if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text[i])) len += 1;
        return len;
    }
    function strip(ch: string, text: string) {
        return text + ch.repeat(maxLen - size(text));
    }
}

export default function printBox(options: {
    title?: string,
    titleColor?: string,
    boxColor?: string,
    bgColor?: string
}, ...lines: Array<Array<any>>) {
    options.title ||= "";
    options.titleColor ||= "\x1b[33m";
    options.boxColor ||= "";
    options.bgColor ||= "";

    let header = `${options.bgColor}${options.boxColor}┎─\x1b[0m`;
    header += `${options.bgColor}${options.titleColor}${options.title}\x1b[0m`;
    header += `${options.bgColor}${options.boxColor}${"─".repeat(maxLen - size(options.title || ""))}─┒\x1b[0m`;
    console.log(header);

    for (let line of lines) {
        let count = maxLen - size(line.map(x => tostr(x)).join(' ')) - 1;
        let bodyHead = `${options.bgColor}${options.boxColor}┃\x1b[0m${options.bgColor}`;
        let bodyTail = `${options.bgColor}${options.boxColor}${' '.repeat(count)} ┃\x1b[0m`;
        console.log(bodyHead, ...line, bodyTail);
    }

    let footer = `${options.bgColor}${options.boxColor}┖─${"─".repeat(maxLen)}─┚\x1b[0m`;
    console.log(footer);

    function tostr(obj: any) {
        if (typeof obj == 'object')
            return JSON.stringify(obj) + " ";
        return obj.toString();
    }
    function size(text: string) {
        let len = text.length;
        for (let i = 0; i < text.length; i++)
            if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text[i])) len += 1;
        return len;
    }
}