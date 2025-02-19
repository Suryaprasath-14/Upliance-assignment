import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {},
    isAuthenticated: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

 export const { setUserData, setAuthenticated } = userSlice.actions;
 export default userSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     userData: [],  // Store multiple users as an array
//     isAuthenticated: false,
//   },
//   reducers: {
//     setUserData: (state, action) => {
//       state.userData.push(action.payload);  // Add new user instead of replacing
//     },
//     setAuthenticated: (state, action) => {
//       state.isAuthenticated = action.payload;
//     },
//   },
// });

// export const { setUserData, setAuthenticated } = userSlice.actions;
// export default userSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     userData: JSON.parse(localStorage.getItem('userData')) || [], // Load userData from localStorage if available
//     isAuthenticated: false,
//   },
//   reducers: {
//     setUserData: (state, action) => {
//       // Add the new user to the userData array (without nesting)
//       state.userData = [...state.userData, action.payload];
//       // Ensure the updated data is stored in localStorage
//       localStorage.setItem('userData', JSON.stringify(state.userData));
//     },
//     setAuthenticated: (state, action) => {
//       state.isAuthenticated = action.payload;
//     },
//   },
// });

// export const { setUserData, setAuthenticated } = userSlice.actions;
// export default userSlice.reducer;
