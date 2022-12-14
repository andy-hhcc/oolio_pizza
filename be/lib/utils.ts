import {
    ApiKeySourceType,
    MethodLoggingLevel,
    RestApiProps,
} from 'aws-cdk-lib/aws-apigateway'
import { AttributeType } from 'aws-cdk-lib/aws-dynamodb'
import { DB, DEV, PROD } from '../src/shared/utils/constant'
import corsOptions from '../src/shared/aws/api_gw/cors'
import { BuildConfig } from './build_config'
import { BillingMode } from 'aws-cdk-lib/aws-dynamodb'
import * as cdk from 'aws-cdk-lib'

const app = new cdk.App()
export const defaultTableProps = ({ pk, sk, name }: any = {}) => {
    return {
        partitionKey: {
            name: pk || DB.PK,
            type: AttributeType.STRING,
        },
        sortKey: {
            name: sk || DB.SK,
            type: AttributeType.STRING,
        },
        tableName: name,
        billingMode: app.node.tryGetContext('config') === PROD ? BillingMode.PAY_PER_REQUEST : BillingMode.PROVISIONED,
    }
}

export const defaultGSIProps = ({ pk, sk, name }: any = {}) => {
    return {
        indexName: name || 'GSI',
        partitionKey: {
            name: pk || 'data',
            type: AttributeType.STRING,
        },
        sortKey: {
            name: sk || DB.SK,
            type: AttributeType.STRING,
        },
    }
}

export const defaultRestApiProps = (buildConfig?: BuildConfig): RestApiProps => ({
    deployOptions: {
        stageName: buildConfig?.Environment || 'dev',
        metricsEnabled: true,
        loggingLevel: MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
    },
    defaultCorsPreflightOptions: corsOptions,
    apiKeySourceType: ApiKeySourceType.AUTHORIZER,
})

