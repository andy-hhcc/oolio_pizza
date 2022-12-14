import { Stack, App, StackProps, Duration } from 'aws-cdk-lib'
import { Table } from 'aws-cdk-lib/aws-dynamodb'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import {
    LambdaIntegration,
    RestApi,
} from 'aws-cdk-lib/aws-apigateway'
import { BuildConfig } from './build_config'
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs'
import { join } from 'path'
import {
    defaultRestApiProps,
    defaultTableProps,
} from './utils'

export class CheckoutStack extends Stack {
    private restApi: RestApi

    constructor(scope: App, id: string, props?: StackProps, buildConfig?: BuildConfig) {
        super(scope, id, props)

        /**
         * Define Tables
         */
        const PricingRulesTable = new Table(this, 'PriceRulesTable', defaultTableProps({ name: 'Pricing-Rules' }))
        const OrdersTable = new Table(this, 'OrdersTable', defaultTableProps({ name: 'Orders' }))

        /**
         * Define Rest API
         */
        this.restApi = new RestApi(this, `${this.stackName}-RestApi`, defaultRestApiProps(buildConfig))

        const checkoutFnProps: NodejsFunctionProps = {
            bundling: {
                externalModules: [
                    'aws-sdk',
                ],
            },
            entry: join(__dirname, '../src', 'index.ts'),
            depsLockFilePath: join(__dirname, '../src', 'package-lock.json'),
            runtime: Runtime.NODEJS_14_X,
        }

        // Lambda fn
        const calculate = new NodejsFunction(this, 'CalculateFn', {
            handler: 'pricingFn',
            ...checkoutFnProps,
            timeout: Duration.seconds(6),
            memorySize: 256,
        })

        const checkout = new NodejsFunction(this, 'CheckoutFn', {
            handler: 'checkoutFn',
            ...checkoutFnProps,
            timeout: Duration.seconds(6),
            memorySize: 256,
        })

        PricingRulesTable.grantReadData(calculate)
        PricingRulesTable.grantReadData(checkout)
        OrdersTable.grantWriteData(checkout)

        const calculateIntegration = new LambdaIntegration(calculate)
        const checkoutIntegration = new LambdaIntegration(checkout)

        this.restApi.root.addResource('calculate').addMethod('POST', calculateIntegration)
        this.restApi.root.addResource('checkout').addMethod('POST', checkoutIntegration)
    }
}
