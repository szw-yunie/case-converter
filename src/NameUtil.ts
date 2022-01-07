
export function toUpperCamelCase(s: string) {
    return toCamelCase(s, true);
}

export function toLowerCamelCase(s: string) {
    return toCamelCase(s, false);
}

export function toUnderScoreCase(s: string) {
    return toSeparatorCase(s, ['-',' '], '_');

}

export function toKebabCase(s: string) {
    return toSeparatorCase(s, ['_',' '], '-');
}

export function toBlankCase(s: string) {
    return toSeparatorCase(s, ['_', '-'], ' ');
}

function toCamelCase(s: string, isUpper: boolean) {
    s = s.trim();
    if (s.length === 0) {
        return s;
    }

    let result = '';

    let ch = s.charAt(0);
    ch = isUpper ? ch.toUpperCase() : ch.toLowerCase();
    result += ch;

    let flag = false;
    for (let i = 1; i < s.length; i++) {
        ch = s.charAt(i);
        if (ch === '_' || ch === '-' || ch === ' ') {
            flag = true;
        } else {
            if (flag) {
                ch = ch.toUpperCase();
                flag = false;
            }
            result += ch;
        }
    }

    return result;
}

function toSeparatorCase(s: string, from: string[], to: string) {
    s = s.trim();
    if (s.length === 0) {
        return s;
    }

    let result = '';

    let ch = s.charAt(0);
    ch = ch.toLowerCase();
    result += ch;

    let flag = false;
    for (let i = 1; i < s.length; i++) {
        ch = s.charAt(i);
        if (from.find((value: string) => value === ch)) {
            ch = to;
        } else if (ch.charCodeAt(0) <= 90) {
            result += to;
            ch = ch.toLowerCase();
        }
        result += ch;
    }

    return result;
}