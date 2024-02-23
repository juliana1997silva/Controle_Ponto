import { ChangeEvent } from "react";

type Options = {
    charCodes?: {
        [key: string]: {
            regex: RegExp;
            repeat?: boolean;
            transform?: (char: string) => string;
            transformRevert?: (char: string) => string;
        }; 
    },
    maskReverse?: boolean;
}

type Pattern = {
    [key: string]: {
        regex: RegExp,
        repeat?: boolean;
        transform?: (char: string) => string;
        transformRevert?: (char: string) => string;
    }
}

let patterns: Pattern = {
    '9': { regex: /[0-9]/ },
    'a': { regex: /[a-zA-Z]/, transform: (char: string) => char.toLowerCase() },
    'A': { regex: /[a-zA-Z]/, transform: (char: string) => char.toUpperCase() },
    'z': { regex: /[a-zA-Z]/ }
}

export const MaskValue = (value: string, mask: string, options?: Options) => {
    const regExps: (Pattern | string)[] = [];

    // Patterns
    if(options?.charCodes) patterns = {
        ...patterns,
        ...options?.charCodes
    }

    const keys = Object.keys(patterns);
    const maskArray = mask.split('');

    maskArray.forEach(char => {
        if(keys.includes(char)) {
            const key = keys.find(key => key === char) as string;
            regExps.push({[`${key}`]: patterns[key]});

        } else regExps.push(char)
    })
    
    if(options?.maskReverse) regExps.reverse();

    let newValue: (string | RegExp)[] = [];

    const valueArray = value.split('');
    if(options?.maskReverse) valueArray.reverse()

    if(valueArray.length > regExps.length) return valueArray.join('').substring(
        0, valueArray.length - 1
    );

    let previuosRegexs = 0;
    for(let i = 0; i < valueArray.length; i++) {

        if(i > regExps.length - 1) return null;

        let char = valueArray[i]
        if((i + previuosRegexs) > regExps.length - 1) break;

        if(typeof regExps[i + previuosRegexs] === 'string') {
            let next = 1;
            let strings = [regExps[i + previuosRegexs] as string];
            
            while(typeof regExps[(i + previuosRegexs) + next] === 'string') {
                strings.push(regExps[(i + previuosRegexs) + next] as string);
                next++;
            }
    
            for(let index = 0; index < strings.length; index++) if(
                newValue[i + index] !== strings[index]
            ) newValue.push(strings[index]);

            const pattern = regExps[
                ((i + previuosRegexs) + ((next + 1)) <= regExps.length - 1) && strings.length > 1 ? 
                (i + previuosRegexs) + (next + 1) :
                (i + previuosRegexs) + next
            ] as Pattern;

            const key = Object.keys(pattern)[0];

            const regExp = pattern[`${key}`].regex;
            const repeatPatern = pattern[`${key}`].repeat;
            const transform = pattern[`${key}`].transform;
            
            if(repeatPatern) {
                for(let w = i; w < valueArray.length; w++) {
                    char = valueArray[w];
                    if(regExp.test(char)) {
                        if(transform !== undefined) 
                            char = transform(char);
                        newValue.push(char);
                    }
                }
                break;

            } else if(regExp.test(char)) {
                if(transform !== undefined) 
                    char = transform(char);
                newValue.push(char);
                previuosRegexs += strings.length;   
            }
            
        } else {
            const pattern = regExps[i + previuosRegexs] as Pattern;
            const key = Object.keys(pattern)[0];

            const regExp = pattern[`${key}`].regex;
            const repeatPatern = pattern[`${key}`].repeat;
            const transform = pattern[`${key}`].transform;

            if(repeatPatern) {
                for(let w = i; w < valueArray.length; w++) {
                    char = valueArray[w]
                    if(regExp.test(char)) {
                        if(transform !== undefined) 
                            char = transform(char);
                        newValue.push(char);
                    }
                }
                break;

            } else if(regExp.test(char)) {
                if(transform !== undefined) 
                    char = transform(char);
                newValue.push(char);
            }
        }
    }

    if(options?.maskReverse) newValue.reverse();
    
    return newValue.join('');
}

export const UnmaskValue = (value: string, mask: string, options?: Options) => {
    const regExps: (Pattern | string)[] = [];
    
    // Patterns
    if(options?.charCodes) patterns = {
        ...patterns,
        ...options?.charCodes
    }

    const keys = Object.keys(patterns);
    const maskArray = mask.split('');

    maskArray.forEach(char => {
        if(keys.includes(char)) {
            const key = keys.find(key => key === char) as string;
            regExps.push({[`${key}`]: patterns[key]});

        } else regExps.push(char)
    })
    
    if(options?.maskReverse) regExps.reverse();

    let unmaskedValue: (string | RegExp)[] = [];

    const valueArray = value.split('');

    for(let i = 0; i < valueArray.length; i++) {
        if(i > regExps.length - 1) return null;

        let char = valueArray[i]

        if(typeof regExps[i] === 'string' && char !== regExps[i]) {
            let next = 1;
            while(typeof regExps[i + next] === 'string') next++;


            const pattern = regExps[i + next] as Pattern;
            const key = Object.keys(pattern)[0];

            const regExp = pattern[`${key}`].regex;
            const repeat = pattern[`${key}`].repeat;
            const transformRevert = pattern[`${key}`].transformRevert;

            if(repeat) {
                for(let w = i; w < valueArray.length; w++) {
                    char = valueArray[w]
                    if(regExp.test(char)) {
                        if(transformRevert !== undefined) char = transformRevert(char);
                        unmaskedValue.push(char);
                    }
                }
                break;

            } else if(regExp.test(char)) {
                if(transformRevert !== undefined) char = transformRevert(char);
                unmaskedValue.push(char);
            }

        } else if(typeof regExps[i] !== 'string') {
            let char = valueArray[i]

            const pattern = regExps[i] as Pattern;
            const key = Object.keys(pattern)[0];

            const regExp = pattern[`${key}`].regex;
            const repeat = pattern[`${key}`].repeat;
            const transformRevert = pattern[`${key}`].transformRevert;

            if(repeat) {
                for(let w = i; w < valueArray.length; w++) {
                    char = valueArray[w]
                    if(regExp.test(char)) {
                        if(transformRevert !== undefined) char = transformRevert(char);
                        unmaskedValue.push(char);
                    }
                }
                break;

            } else if(regExp.test(char)) {
                if(transformRevert !== undefined) char = transformRevert(char);
                unmaskedValue.push(char);
            }
        }
    }

    return unmaskedValue.join('');
}

interface ReactInputNativeEvent extends InputEvent {
    data: string | null
}

interface ReactinputEvent extends React.ChangeEvent<HTMLInputElement> {
    nativeEvent: ReactInputNativeEvent
}

export const onChangeMask = (
    event: React.ChangeEvent<HTMLInputElement>, 
    mask: string, 
    options?: Options
) => {
    const regExps: (Pattern | string)[] = [];

    // Patterns
    if(options?.charCodes) patterns = {
        ...patterns,
        ...options?.charCodes
    }

    const keys = Object.keys(patterns);
    const maskArray = mask.split('');

    maskArray.forEach(char => {
        if(keys.includes(char)) {
            const key = keys.find(key => key === char) as string;
            regExps.push({[`${key}`]: patterns[key]});

        } else regExps.push(char)
    })
    
    if(options?.maskReverse) regExps.reverse();

    let newValue: (string | RegExp)[] = [];

    const valueArray = event.currentTarget.value.split('');
    if(options?.maskReverse) valueArray.reverse()

    if(valueArray.length > regExps.length) return valueArray.join('').substring(0, valueArray.length - 1);

    let previuosRegexs = 0;
    for(let i = 0; i < valueArray.length; i++) {

        if(i > regExps.length - 1) return null;

        let char = valueArray[i]
        if((i + previuosRegexs) > regExps.length - 1) break;

        if(typeof regExps[i + previuosRegexs] === 'string') {
            let next = 1;
            let strings = [regExps[i + previuosRegexs] as string];
            
            while(typeof regExps[(i + previuosRegexs) + next] === 'string') {
                strings.push(regExps[(i + previuosRegexs) + next] as string);
                next++;
            }

            for(let index = 0; index < strings.length; index++) {
                const nativeEvent = (event as ReactinputEvent).nativeEvent

                if(nativeEvent.data == null && nativeEvent.type === 'input') {
                    if(newValue[i + index] !== strings[index]) newValue.push(strings[index]);
                } else {
                    if(strings.length > 1 && index === strings.length -1) break;
                    if(newValue[i + index] !== strings[index]) newValue.push(strings[index]);
                }
            }

            const pattern = regExps[
                ((i + previuosRegexs) + ((next + 1)) <= regExps.length - 1) && strings.length > 1 ? 
                (i + previuosRegexs) + (next + 1) :
                (i + previuosRegexs) + next
            ] as Pattern;

            const key = Object.keys(pattern)[0];

            const regExp = pattern[`${key}`].regex;
            const repeatPatern = pattern[`${key}`].repeat;
            const transform = pattern[`${key}`].transform;
            
            if(repeatPatern) {
                for(let w = i; w < valueArray.length; w++) {
                    char = valueArray[w];
                    if(regExp.test(char)) {
                        if(transform !== undefined) 
                            char = transform(char);
                        newValue.push(char);
                    }
                }
                break;

            } else if(regExp.test(char)) {
                if(transform !== undefined) 
                    char = transform(char);
                newValue.push(char);
                previuosRegexs += strings.length;   
            }
            
        } else {
            const pattern = regExps[i + previuosRegexs] as Pattern;
            const key = Object.keys(pattern)[0];

            const regExp = pattern[`${key}`].regex;
            const repeatPatern = pattern[`${key}`].repeat;
            const transform = pattern[`${key}`].transform;

            if(repeatPatern) {
                for(let w = i; w < valueArray.length; w++) {
                    char = valueArray[w]
                    if(regExp.test(char)) {
                        if(transform !== undefined) 
                            char = transform(char);
                        newValue.push(char);
                    }
                }
                break;

            } else if(regExp.test(char)) {
                if(transform !== undefined) 
                    char = transform(char);
                newValue.push(char);
            }
        }
    }

    if(options?.maskReverse) newValue.reverse();
    
    return newValue.join('');
} 