import axios from 'axios'
import { ICheckOutRequest, IPricingRequest, IResponse } from './types'
import { apiEndPoint } from './const'

export const apiPricing = (data: IPricingRequest) =>
  axios.post<IResponse<number>>(`${apiEndPoint}/calculate`, data)

export const apiCheckOut = (data: ICheckOutRequest) =>
  axios.post<IResponse<any>>(`${apiEndPoint}/checkout`, data)
