import GUN from 'gun'
import 'gun/axe'
import 'gun/sea'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/actions'
import { AppDispatch, store } from '../redux/store'

// Database
export const db = GUN()

// Gun User
export const user = db.user().recall({ sessionStorage: true })

interface registerProps {
  username: string
  email: string
  password: string
}

export const register = ({ email, password, username }: registerProps) => {
  user.create(username, password, (err) => {
    if (err) {
      console.log(alert)
    } else {
      login({ username, password })
    }
  })
  db.get('emails').put({ username, email })
}

interface loginProps {
  username: string
  password: string
}

export const login = ({ password, username }: loginProps) => {
  let msg: any
  let res: boolean = true
  user.auth(username, password, (err) => {
    msg = err
    if (msg.err === 'Wrong user or password.') {
      res = false
      alert('Wrong credentials')
    } else {
      store.dispatch(setUserData(getUsername()))
    }
  })
  return res
}

export const logout = () => {
  user.leave()
}

export const getUsername = () => {
  let username: string = ''
  user.get('alias').on((v) => {
    username = v
  })
  return username
}

export const isAuth = () => (getUsername() === '' ? false : true)
