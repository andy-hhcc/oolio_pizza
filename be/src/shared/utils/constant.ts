import * as cdk from "aws-cdk-lib";

export const GENERAL_UNSUCCESS_MESSAGE_KEY = 'not_success'
export const GENERAL_UNSUCCESS_MESSAGE = 'Not success!'
export const SAMPLE_TENANT_ID = 'sample_tenant_id'
export const TEST = 'TEST'
export const DEV = 'dev'
export const PROD = 'prod'
export const STAGING = 'staging'
export const DB = {
    PK: 'PK',
    SK: 'SK',
    GSI: 'GSI',
    PRICING_RULES: 'Pricing-Rules',
    ORDERS: 'Orders',
    MIN_RCU: 1,
    MAX_RCU: 5,
    MIN_WRU: 1,
    MAX_WRU: 5,
}
export const HttpStatus = {
    Ok: 200,
    Created: 201,
    NoContent: 204,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    Conflict: 409,
    Gone: 410,
    UnprocessableEntity: 422,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
}