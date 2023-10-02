const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  token: null,
  username: null,
  firstname: null,
  lastname: null,
  admin: false,
  time: {startTime: null, endTime: null},
  tasks: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    setUserData: (state, action) => {
      const {token, username, firstname, lastname, admin} = action.payload;
      state.token = token;
      state.username = username;
      state.firstname = firstname;
      state.lastname = lastname;
      state.admin = admin === 'admin';
    },
    setUserTime: (state, action) => {
      state.time = {startTime: action?.payload?.startTime, endTime: action?.payload?.endTime};
    },
    resetUserData: (state, action) => {
      state.token = null;
      state.username = null;
      state.firstname = null;
      state.lastname = null;
      state.admin = false;
      state.time = {startTime: null, endTime: null};
      state.tasks = [];
    },
    setUserTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const {setUserToken, setUserData, setUserTime, resetUserData, setUserTasks} = userSlice.actions;

export default userSlice.reducer;
