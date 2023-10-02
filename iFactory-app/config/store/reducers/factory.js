const {createSlice} = require('@reduxjs/toolkit');

const initialState = {items: null};

const factorySlice = createSlice({
  name: 'factory',
  initialState,
  reducers: {
    setFactoryItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const {setFactoryItems} = factorySlice.actions;

export default factorySlice.reducer;
