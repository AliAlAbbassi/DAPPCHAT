import { SET_USER_DATA } from './actionTypes'

export const setUserData = (username: string) => ({
  type: SET_USER_DATA,
  payload: {
    username,
  },
})
