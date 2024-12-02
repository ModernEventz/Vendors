// store.js
import { createSlice} from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  totalPosts: 0,
  totalOrders: 0,
 
};

// Define a slice for the tasks and budget
export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setTotalPosts: (state ) => {
      state.totalPosts += 1;
    },
  
    setTotalOrders: (state, action) => {
      state.totalOrders = action.payload;
    },
  },
});


// Export actions
export const { setTotalPosts, setTotalOrders } = dataSlice.actions;

export default dataSlice.reducer

