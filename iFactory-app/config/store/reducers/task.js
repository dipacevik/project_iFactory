const {createSlice} = require('@reduxjs/toolkit');

const initialState = {users: []};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTask: (state, action) => {
      const {userId, tasks} = action.payload;
      state.users[userId] = {tasks};
    },
    resetTask: (state, action) => {
      state.users = [];
    },
  },
});

export const {setTask, resetTask} = taskSlice.actions;

export default taskSlice.reducer;
