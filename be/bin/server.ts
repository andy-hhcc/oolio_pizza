#!/usr/bin/env node
import 'source-map-support/register'
import {App} from 'aws-cdk-lib'
import {BuildConfig} from '../lib/build_config'
import {load} from "js-yaml";
import {config, SSM} from "aws-sdk";
import {CheckoutStack} from '../lib/checkout_stack';


const app = new App()

const ensureString = (object: { [name: string]: any }, propName: string): string => {
    if (!object[propName] || object[propName].trim().length === 0)
        throw new Error(propName + " does not exist or is empty")

    return object[propName]
}

const getConfig = async () => {
    const env = process.env.ENVIRONMENT || app.node.tryGetContext('config')
    if (!env)
        throw new Error("Context variable missing on CDK command. Pass in as `-c config=XXX`")

    const awsProfile = process.env.AWS_PROFILE || app.node.tryGetContext('profile')
    if (!awsProfile)
        throw new Error("Context variable missing on CDK command. Pass in as `-c profile=XXX`")

    const awsRegion = process.env.AWS_DEFAULT_REGION || app.node.tryGetContext('region')
    if (!awsRegion)
        throw new Error("Context variable missing on CDK command. Pass in as `-c region=XXX`")

    config.update({
        region: awsRegion,
    })

    const ssm = new SSM()
    const ssmParamName = "rpay-configuration-" + env
    console.log("### Getting config from SSM Parameter store with name: " + ssmParamName)
    const ssmResponse = await ssm.getParameter({ Name: ssmParamName }).promise()
    console.log("### Got config!!")
    const unparsedEnv: any = load(ssmResponse?.Parameter?.Value || '')
    const buildConfig: BuildConfig = {
        AWSAccountID: ensureString(unparsedEnv, 'AWSAccountID'),
        AWSProfileName: ensureString(unparsedEnv, 'AWSProfileName'),
        AWSProfileRegion: ensureString(unparsedEnv, 'AWSProfileRegion'),

        App: ensureString(unparsedEnv, 'App'),
        Version: ensureString(unparsedEnv, 'Version'),
        Environment: ensureString(unparsedEnv, 'Environment'),
        Build: ensureString(unparsedEnv, 'Build'),

        Parameters: {
            LambdaInsightsLayer: ensureString(unparsedEnv['Parameters'], 'LambdaInsightsLayer'),
            TenantPublicApiUrl: ensureString(unparsedEnv['Parameters'], 'TenantPublicApiUrl'),
        }
    }

    return buildConfig
}


async function main() {
    const buildConfig: BuildConfig = await getConfig()
    const stackProps = {
        env: {
            region: buildConfig.AWSProfileRegion,
            account: buildConfig.AWSAccountID
        }
    }
    if (process.env.CUSTOM_ENVINROMENT) {
        buildConfig.Environment = process.env.CUSTOM_ENVINROMENT
    }

    new CheckoutStack(app, "Checkout-" + buildConfig.Environment, stackProps, buildConfig)
}

main()