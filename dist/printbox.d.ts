export declare let maxLen: number;
export declare function lightPrintBox(title: string, ...lines: Array<string>): void;
export default function printBox(options: {
    title?: string;
    titleColor?: string;
    boxColor?: string;
    bgColor?: string;
    fgColor?: string;
}, ...lines: Array<Array<any>>): void;
