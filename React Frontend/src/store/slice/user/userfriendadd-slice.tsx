import { createSlice } from "@reduxjs/toolkit";
import { addFriendAPI } from "../../../api/api";
import { toast } from "react-toastify";
import { sidebarDataHandler } from "../chat/getsidebar-slice";

const data:any = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const addFriendSlice = createSlice({
  name: "addFriend",
  initialState: data,
  reducers: {
    addFriendSlice(state) {
      state.isLoading = false;
    },
    addFriendSliceSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    addFriendSliceFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    addFriendSliceReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const addFriendUserHandler = (data: any) => async (dispatch: any) => {
  try {
    dispatch(addFriendUserAction.addFriendSlice());
    const response: any = await addFriendAPI(data); 
    dispatch(addFriendUserAction.addFriendSliceSuccess(response));
    dispatch(sidebarDataHandler());
    return response;
  } catch (e: any) {
    dispatch(addFriendUserAction.addFriendSliceFailure(e?.response?.data));
    toast.error(e?.response?.data?.msg);
    throw e;
  }
};
export default addFriendSlice.reducer;
export const addFriendUserAction = addFriendSlice.actions;