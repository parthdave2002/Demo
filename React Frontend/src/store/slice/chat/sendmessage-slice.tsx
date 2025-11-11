import { createSlice } from "@reduxjs/toolkit";
import { invitationAPI } from "../../../api/api";
import { toast } from "react-toastify";

const data:any = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const sendmessageSlice = createSlice({
  name: "invitation",
  initialState: data,
  reducers: {
    sendmessageSlice(state) {
      state.isLoading = false;
    },
    sendmessageSliceSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    sendmessageSliceFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    sendmessageSliceReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const sendMessageHandler = (data: any) => async (dispatch: any) => {
  try {
    dispatch(sendMessageAction.sendmessageSlice());
    const response: any = await invitationAPI(data); 
    dispatch(sendMessageAction.sendmessageSliceSuccess(response));
    return response;
  } catch (e: any) {
    dispatch(sendMessageAction.sendmessageSliceFailure(e?.response?.data));
    toast.error(e?.response?.data?.msg);
    throw e;
  }
};
export default sendmessageSlice.reducer;
export const sendMessageAction = sendmessageSlice.actions;