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

export const setNotification = (content, during) => {

  return async dispatch => {
    dispatch(_setNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, during * 1000)
  }

}

export default notificationSlice.reducer