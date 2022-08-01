import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import axios from "axios";
import { getUsers } from "./users.slice";

const API = "http://localhost:4000/api/v1/users/";

export const userSelectedSlice = createSlice({
  name: "userSelected",
  initialState: null,
  reducers: {
    setUserSelected: (state, action) => action.payload,
  },
});

export const { setUserSelected } = userSelectedSlice.actions;

export const editUser = (id, data) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .put(`${API}${id}/`, data)
    .then(() => dispatch(getUsers()))
    .finally(() => dispatch(setIsLoading(false)));
};

export const addUser = (data) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(API, data)
    .then(() => dispatch(getUsers()))
    .finally(() => dispatch(setIsLoading(false)));
};

export default userSelectedSlice.reducer;
