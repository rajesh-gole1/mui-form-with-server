import { get } from "superagent";
const { createSlice } = require("@reduxjs/toolkit");
const { createAsyncThunk } = require("@reduxjs/toolkit");
const { axios } = require("axios");

const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

// export const fetchUsers = createAsyncThunk(
//   "users/fetchUsers",
//   async (data: any = {}, thunkAPI) => {
//     const response: any = await get(
//       "https://642badead7081590f9271819.mockapi.io/users"
//     );
//     // const result =
//     return response.body;
//   }
// );

export const fetchUsers = createAsyncThunk("user/all-users", async () => {
  const response = await get("http://localhost:3008/userDetails");
  console.log("res", response.body);
  return response.body;
});

const initialUsers = {
  user: [
    // {
    //     id:uuidv4(),
    //     name:'Rajesh Gole',
    //     email:'rajesh.gole@softobiz.com',
    //     phone:'8967120236',
    //     createdAt: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    // }
  ],
};

export const usersSlice = createSlice({
  name: "user",
  initialState: initialUsers,
  reducers: {
    // showUsers: (state) => state,
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      console.log("error");
      state.error = "Something went Wrong";
      state.loading = false;
    });
  },
});

export const { showUsers, addUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
