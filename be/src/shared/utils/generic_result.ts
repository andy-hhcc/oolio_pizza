import {GENERAL_UNSUCCESS_MESSAGE_KEY, GENERAL_UNSUCCESS_MESSAGE, HttpStatus} from './constant'

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
}

interface Options {
    statusCode?: number
    messageKey?: string
    message?: string
    data?: any
    details?: any
}
export interface IHttpResponse {
    statusCode: number,
    headers: any,
    body: string
}
export const createSuccessResponse = (options?: Options):IHttpResponse => ({
    statusCode: options?.statusCode || 200,
    headers,
    body: JSON.stringify({
        success: true,
        data: options?.data
    })
})


export const createUnSuccessResponse = (options?: Options) => ({
    statusCode: options?.statusCode || HttpStatus.InternalServerError,
    headers,
    body: JSON.stringify({
        success: false,
        messageKey: options?.messageKey || GENERAL_UNSUCCESS_MESSAGE_KEY,
        message: options?.message || GENERAL_UNSUCCESS_MESSAGE,
        details: options?.details,
    }) 
})
