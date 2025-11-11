import { createSlice } from "@reduxjs/toolkit";
import {  sidebarAPI } from "../../../api/api";
import { toast } from "react-toastify";

const data:any = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const sidebardataSlice = createSlice({
  name: "sidebardata",
  initialState: data,
  reducers: {
    sidebardataSlice(state) {
      state.isLoading = false;
    },
    sidebardataSliceSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    sidebardataSliceFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    sidebardataSliceReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const sidebarDataHandler = () => async (dispatch: any) => {
  try {
    dispatch(sidebarDataAction.sidebardataSlice());
    const response: any = await sidebarAPI(); 
    dispatch(sidebarDataAction.sidebardataSliceSuccess(response));
    return response;
  } catch (e: any) {
    dispatch(sidebarDataAction.sidebardataSliceFailure(e?.response?.data));
    toast.error(e?.response?.data?.msg);
    throw e;
  }
};
export default sidebardataSlice.reducer;
export const sidebarDataAction = sidebardataSlice.actions;