import { atom } from 'recoil'
import { CartItem, UserType } from './types'

export const currentUserState = atom<UserType>({
  key: 'currentUser',
  default: UserType.GUEST,
})

export const cartState = atom<CartItem[]>({
  key: 'cart',
  default: []
})
