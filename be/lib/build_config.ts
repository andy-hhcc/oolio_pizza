export interface BuildConfig {
    readonly AWSAccountID: string
    readonly AWSProfileName: string
    readonly AWSProfileRegion: string

    readonly App: string
    Environment: string
    readonly Version: string
    readonly Build: string

    readonly Parameters: BuildParameters
}

export interface BuildParameters {
    readonly LambdaInsightsLayer: string
    readonly TenantPublicApiUrl: string
}