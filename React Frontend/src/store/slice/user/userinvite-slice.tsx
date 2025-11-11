import { createSlice } from "@reduxjs/toolkit";
import { invitationAPI } from "../../../api/api";
import { toast } from "react-toastify";

const data:any = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const invitationSlice = createSlice({
  name: "invitation",
  initialState: data,
  reducers: {
    invitationSlice(state) {
      state.isLoading = false;
    },
    invitationSliceSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    invitationSliceFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    invitationSliceReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const invitationUserHandler = (data: any) => async (dispatch: any) => {
  try {
    dispatch(invitationUserAction.invitationSlice());
    const response: any = await invitationAPI(data); 
    toast.success(response?.msg);
    dispatch(invitationUserAction.invitationSliceSuccess(response));
    return response;
  } catch (e: any) {
    dispatch(invitationUserAction.invitationSliceFailure(e?.response?.data));
    toast.error(e?.response?.data?.msg);
    throw e;
  }
};
export default invitationSlice.reducer;
export const invitationUserAction = invitationSlice.actions;