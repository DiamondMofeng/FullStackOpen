import { createSlice } from "@reduxjs/toolkit";

const initialState = ""

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {

    setNotification: (state, action) => {
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

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer