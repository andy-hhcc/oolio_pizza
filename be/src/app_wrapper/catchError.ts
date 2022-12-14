import AppError from '../app_error'

export default (error: any) => {
    if (error.toJSON) {
        return error
    }

    if (error.name === 'ValidationError') {
        return AppError.GeneralInvalidParameters([error?.message])
    }

    if (error.name === 'TypeMismatch') {
        return AppError.GeneralInvalidParameters([error.message])
    }

    return AppError.GeneralInternalServerError([], error.stack)
}