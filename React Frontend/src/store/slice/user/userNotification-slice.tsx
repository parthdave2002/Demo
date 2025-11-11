import { createSlice } from "@reduxjs/toolkit";
import { invitedNotificationAPI } from "../../../api/api";
import { toast } from "react-toastify";

const data:any = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const invitationNotificationSlice = createSlice({
  name: "invitationnofification",
  initialState: data,
  reducers: {
    invitationNotificationSlice(state) {
      state.isLoading = false;
    },
    invitationNotificationSliceSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    invitationNotificationSliceFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    invitationNotificationSliceReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const invitationNotificationHandler = () => async (dispatch: any) => {
  try {
    dispatch(invitationNotificationAction.invitationNotificationSlice());
    const response: any = await invitedNotificationAPI(); 
    dispatch(invitationNotificationAction.invitationNotificationSliceSuccess(response));
    return response;
  } catch (e: any) {
    dispatch(invitationNotificationAction.invitationNotificationSliceFailure(e?.response?.data));
    toast.error(e?.response?.data?.msg);
    throw e;
  }
};
export default invitationNotificationSlice.reducer;
export const invitationNotificationAction = invitationNotificationSlice.actions;