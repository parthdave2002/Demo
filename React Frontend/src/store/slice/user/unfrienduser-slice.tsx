import { createSlice } from "@reduxjs/toolkit";
import { unfriendUserAPI } from "../../../api/api";
import { toast } from "react-toastify";

const data:any = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const unfrienduserSlice = createSlice({
  name: "unfrienduser",
  initialState: data,
  reducers: {
    unfrienduserSlice(state) {
      state.isLoading = false;
    },
    unfrienduserSliceSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    unfrienduserSliceFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    unfrienduserSliceReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const unfrienduserUserHandler = () => async (dispatch: any) => {
  try {
    dispatch(unfrienduserUserAction.unfrienduserSlice());
    const response: any = await unfriendUserAPI(); 
    dispatch(unfrienduserUserAction.unfrienduserSliceSuccess(response));
    return response;
  } catch (e: any) {
    dispatch(unfrienduserUserAction.unfrienduserSliceFailure(e?.response?.data));
    toast.error(e?.response?.data?.msg);
    throw e;
  }
};
export default unfrienduserSlice.reducer;
export const unfrienduserUserAction = unfrienduserSlice.actions;