import { createSlice } from "@reduxjs/toolkit";
import { loginAPI } from "../../../api/api";
import { toast } from "react-toastify";

const data:any = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState: data,
  reducers: {
    loginSlice(state) {
      state.isLoading = false;
    },
    loginSliceSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    loginSliceFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    loginSliceReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const loginUserHandler = (data: any) => async (dispatch: any) => {
  try {
    dispatch(loginUserAction.loginSlice());
    const response: any = await loginAPI(data); 
    localStorage.setItem("token", response?.data?.token);
    localStorage.setItem("userId",response?.data?.data?._id );
    dispatch(loginUserAction.loginSliceSuccess(response));
    return response;
  } catch (e: any) {
    dispatch(loginUserAction.loginSliceFailure(e?.response?.data));
    toast.error(e?.response?.data?.msg);
    // dispatch(loginUserAction.loginSliceReset());
    throw e;
  }
};
export default loginSlice.reducer;
export const loginUserAction = loginSlice.actions;