import logging from '../shared/utils/logging'

export default class AppError extends Error {
    public error: string
    public statusCode: number
    public date: Date
    public details: Array<String>
    public data: any

    constructor(error: string, statusCode: number, details: Array<String> = [], stack: any = null, data = '') {
        super()

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor)
        }

        this.name = error
        this.error = error
        this.statusCode = statusCode
        this.date = new Date()
        this.details = details

        if (stack) {
            this.stack = stack
        }

        if (data) {
            this.data = data
        }
    }

    toString() {
        return `${this.stack} ${this.date}`
    }

    toJSON() {
        if (this.statusCode >= 500) {
            logging(this.toString())
        }

        const errorObj: any = {
            messageKey: this.error,
        }

        if (this.details.length) {
            errorObj.details = this.details
        }

        if (this.data) {
            errorObj.data = this.data
        }

        return {
            statusCode: this.statusCode,
            ...errorObj,
        }
    }
}
