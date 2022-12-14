import validator from '../middleware/validator'

export default async ({ event }: any) => {
    const _event = await validator({ event })

    return {
        event: _event,
    }
}