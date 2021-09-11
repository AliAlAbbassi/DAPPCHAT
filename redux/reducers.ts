import { Reducer, AnyAction } from '@reduxjs/toolkit'
import { SET_USER_DATA } from './actionTypes'

interface UserProps {
  username: string
}

const initialState = {
  username: '',
}

export const User: Reducer<UserProps, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_USER_DATA:
      return action.payload
  }
  return state
}
