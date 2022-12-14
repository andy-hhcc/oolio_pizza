export default async ({ event }: any) => {
    const {
        pathParameters = {},
        queryStringParameters = {},
        body = '{}',
    } = event

    const _body = JSON.parse(body)
    const data = {
        ...JSON.parse(JSON.stringify(queryStringParameters)),
        ...JSON.parse(JSON.stringify(pathParameters)),
        ..._body,
    }

    return {
        ...event,
        requestData: data
    }
}