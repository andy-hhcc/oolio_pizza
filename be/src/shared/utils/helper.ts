import AppError from "../../app_error/index";

export const suffixStart = 1
export const suffixEnd = 9

export const getRandomIntInclusive = () => {
    let min = suffixStart
    let max = suffixEnd
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

interface IExtractKey {
    shardId: string,
    entity: string,
    id: string
}

export const extractKey = (key: string): IExtractKey | null => {
    if (!key) return null
    const pk = key.split(':')[0]
    const sk = key.split(':')[1]
    const entity = sk.split("#")[0]
    const id = sk.split("#")[1]
    return {
        shardId: pk,
        entity,
        id,
    }
}

export const RequestCommonValidator = (event: any = {}, isCheckBody: boolean, isCheckTenantId: boolean) => {
    if (isCheckBody) {
        if (!event.body) {
            return { error: "body is missing" }
        }
        const body = typeof event.body == 'object' ? event.body : JSON.parse(event.body)
        if (!body || Object.keys(body).length < 1) {
            return { error: "no arguments provided" }
        }
    }

    if (isCheckTenantId) {
        if (!event.requestData.tenantId) {
            return { error: "tenant id is missing" }
        }
    }

    return { error: "" }
}

export class KeyGenerator {
    /*
    * type 1: <>:<>#<>#<>...
    * type 2: <>#<>#<>#<>...
     */
    type: number

    constructor(type: number) {
        this.type = type
    }

    gen = (keys: any = []) => {
        let result = ""
        for (let i = 0; i < keys.length; i++) {
            if (i == 0) {
                switch (this.type) {
                    case 1: {
                        result += keys[0] + ":"
                        break
                    }
                    case 2: {
                        result += keys[0] + "#"
                        break
                    }
                    default: {
                        result += keys[0] + "#"
                        break
                    }
                }
            }
            else if (i + 1 == keys.length) {
                result += keys[i]
            }
            else result += keys[i] + "#"
        }
        return result
    }
}

export const random = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const randomStringNumber = (length: number) => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const jwtToObject = (token: any) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

export const parseBody = (body: any) => {
    if (!body) {
        throw AppError.GeneralInvalidParameters(['body is missing'])
    }
    return typeof body == 'object' ? body : JSON.parse(body)
}

export const isMatchWords = (str: string, words: string[]) =>{
    const regexMetachars = /[(){[*+?.\\^$|]/g;
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].replace(regexMetachars, "\\$&");
    }
    const regex = new RegExp("\\b(?:" + words.join("|") + ")\\b", "gi");
    return str.match(regex)?.length ===  words.length;
}