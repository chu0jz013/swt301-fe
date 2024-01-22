import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import userFormReducer from './features/userFormSlice';
import picReducer from './features/picSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    userForm: userFormReducer,
    pic: picReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
