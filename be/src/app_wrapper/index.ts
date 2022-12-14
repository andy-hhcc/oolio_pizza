import afterExecute from './afterExecute'
import catchError from './catchError'
import { createSuccessResponse, createUnSuccessResponse } from '../shared/utils/generic_result'
import beforeExecute from './beforeExecute'
import captureHeaders from './captureHeaders'
import { HttpStatus } from '../shared/utils/constant'

interface IAppWrapper {
    fn: any
}

export default ({ fn }: IAppWrapper) => async (
    event: any,
    context: any,
    callback: any,
) => {
    context.callbackWaitsForEmptyEventLoop = false
    try {
        const res = {
            statusCode: HttpStatus.Ok,
            data: {},
        }
        const { event: _event } = await beforeExecute({
            event,
        })

        captureHeaders(_event)
        await fn({ event: _event, context, res })

        callback(null, createSuccessResponse(res))
    } catch (error) {
        const appError = catchError(error)
        callback(null, createUnSuccessResponse(appError.toJSON()))
    } finally {
        await afterExecute({})
    }
}
