import { createSlice } from "@reduxjs/toolkit";

const initialState = ""

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {

    _setNotification: (state, action) => {
      console.log('setNotification', action.payload)
      let newNotification = action.payload;
      // can not do the below, because we do not have the "dispatch" function

      // setTimeout(() => {
      //   removeNotification()
      // }, 5000)
      return newNotification;
    },

    removeNotification: (state, action) => {
      console.log('removeNotification', action.payload)
      return ""
    },

  }

})

export const { _setNotification, removeNotification } = notificationSlice.actions

//* Below are functions that return async reducers

let timeout //TODO should use a throttle function and include "timeout" variable in a closure

export const setNotification = (content, during) => {

  return async dispatch => {
    dispatch(_setNotification(content))
    console.log("start", new Date())

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      dispatch(removeNotification())
      console.log("end", new Date())
    }, during * 1000)

  }

}

export default notificationSlice.reducer