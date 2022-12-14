import { OrdersModel } from "../model/orders.model"

export const OrdersDAL = {
    create: async(payload: any) => {
        const PK = "ORDER"
        const SK = (new Date().getTime()).toString()

        await OrdersModel.create({
            PK, SK, ...payload
        })
    }
}