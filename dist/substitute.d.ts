export {};
declare global {
    interface String {
        substitute(obj: Object): String;
    }
}
