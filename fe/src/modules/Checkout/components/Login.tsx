import React from 'react'
import { useRecoilState } from 'recoil'
import { currentUserState } from '../store'
import { UserType } from '../types'

const Login = () => {
  const [currentUser, setUser] = useRecoilState(currentUserState)

  const handleLogin = (user: UserType) => () => {
    setUser(user)
  }

  return (
    <div>
      <div>You are logged as {currentUser}</div>
      <br/>
      <button onClick={handleLogin(UserType.GUEST)}>Login as Guest</button>
      <button onClick={handleLogin(UserType.MICROSOFT)}>Login as Microsoft User</button>
      <button onClick={handleLogin(UserType.GOOGLE)}>Login as Google User</button>
      <button onClick={handleLogin(UserType.AWS)}>Login as AWS User</button>
    </div>
  )
}

export default Login
