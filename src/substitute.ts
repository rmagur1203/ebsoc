export { }

declare global {
    interface String {
        substitute(obj: Object): String;
    }
}

type Value = { [k: string]: string };
String.prototype.substitute = function (obj: Value) {
    let str = this;
    for (let data of Object.getOwnPropertyNames(obj)) {
        str = str.replace(`\${${data}}`, obj[data]);
    }
    return str;
}