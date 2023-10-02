const {createSlice} = require('@reduxjs/toolkit');

const initialState = {users: []};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersList: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const {setUsersList} = usersSlice.actions;

export default usersSlice.reducer;
