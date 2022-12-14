import AppError from './base'
import { HttpStatus } from '../shared/utils/constant'

export const GeneralInvalidParameters = (details: Array<string>) =>
    new AppError(
        'GeneralInvalidParameters',
        HttpStatus.BadRequest,
        details,
    )

export const GeneralInternalServerError = (details: Array<string>, stack: any) =>
    new AppError(
        'GeneralInternalServerError',
        HttpStatus.InternalServerError,
        details,
        stack,
    )
