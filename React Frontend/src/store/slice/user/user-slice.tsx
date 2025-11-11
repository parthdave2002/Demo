import { createSlice } from "@reduxjs/toolkit";
import { signupAPI } from "../../../api/api";
import { toast } from "react-toastify";

const data:any = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const signupSlice = createSlice({
  name: "signup",
  initialState: data,
  reducers: {
    signupSlice(state) {
      state.isLoading = false;
    },
    signupSliceSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    signupSliceFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    signupSliceReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const signupUserHandler = (data: any) => async (dispatch: any) => {
  try {
    dispatch(signupUserAction.signupSlice());
    const response: any = await signupAPI(data); 
    dispatch(signupUserAction.signupSliceSuccess(response));
    return response;
  } catch (e: any) {
    dispatch(signupUserAction.signupSliceFailure(e?.response?.data));
    toast.error(e?.response?.data?.msg);
    throw e;
  }
};
export default signupSlice.reducer;
export const signupUserAction = signupSlice.actions;