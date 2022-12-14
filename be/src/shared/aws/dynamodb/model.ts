import * as dynamoose from 'dynamoose'
import { TEST, DB } from "../../utils/constant";

export interface IBaseModelProps {
    name: string,
    schemas: Array<IBaseSchema>,
    configs?: {},
}
export interface IBaseSchema {
    properties: {},
    settings?: {
        validate?: (value: any) => boolean,
    },
}
export const baseModel = ({ name, schemas, configs = {} }: IBaseModelProps) => {
    const defaultProperties = {
        [DB.PK]: {
            "type": String,
            "hashKey": true
        },
        [DB.SK]: {
            "type": String,
            "rangeKey": true,
        },
        "data": {
            "type": String,
            "index": {
                "name": DB.GSI,
                "global": true,
                "rangeKey": DB.SK
            }
        },
        "updatedBy": {
            "type": String,
            "default": null,
        },
    }
    const defaultSettings = {
        "timestamps": {
            "createdAt": "createdAt",
            "updatedAt": "updatedAt",
        }

    }
    const _schemas = schemas.map(schema => {
        const schemaObject: {} = {
            ...defaultProperties,
            ...schema.properties,
        }
        const schemaSettings: {} = {
            ...defaultSettings,
            ...schema?.settings,
        }
        return new dynamoose.Schema(schemaObject, schemaSettings)
    })

    const defaultConfigs = {
        "create": process.env.ENVIRONMENT === TEST,
        "waitForActive": process.env.ENVIRONMENT === TEST,
    }
    const _modelConfigs = {
        ...defaultConfigs,
        ...configs,
    }

    return dynamoose.model(name, _schemas, _modelConfigs)
}