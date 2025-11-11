import { createSlice } from "@reduxjs/toolkit";
import { invitationAPI } from "../../../api/api";
import { toast } from "react-toastify";

const data:any = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const getmessageSlice = createSlice({
  name: "getmessage",
  initialState: data,
  reducers: {
    getmessageSlice(state) {
      state.isLoading = false;
    },
    getmessageSliceSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    getmessageSliceFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    getmessageSliceReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const getMessageHandler = (data: any) => async (dispatch: any) => {
  try {
    dispatch(getMessageAction.getmessageSlice());
    const response: any = await invitationAPI(data); 
    dispatch(getMessageAction.getmessageSliceSuccess(response));
    return response;
  } catch (e: any) {
    dispatch(getMessageAction.getmessageSliceFailure(e?.response?.data));
    toast.error(e?.response?.data?.msg);
    throw e;
  }
};
export default getmessageSlice.reducer;
export const getMessageAction = getmessageSlice.actions;