import { createSlice } from '@reduxjs/toolkit';
const getDefaultUser = () => {
  return {
    roleId: '',
    username: '',
    password: '',
    email: '',
    fullName: '',
    address: '',
    gender: '',
    phone: '',
    avatar: [],
  };
};
const userFormSlice = createSlice({
  name: 'userForm',
  initialState: {
    currentStep: 1,
    user: getDefaultUser(),
    openAddStudent: false,
    openAddManager: false,
    openAddGuard: false,
  },
  reducers: {
    next: (state) => {
      if (state.currentStep < 5) {
        state.currentStep += 1;
      }
    },
    back: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    chooseRole: (state, action) => {
      state.user = defaultUser;
      state.user = { ...state.user, roleId: action.payload };
    },
    updateFields: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      console.log(state.user);
    },
    setAvatar: (state, action) => {
      state.user = { ...state.user, avatar: action.payload };
    },
    open: (state, action) => {
      switch (action.payload) {
        case 'ADD_STUDENT': {
          state.openAddStudent = true;
          break;
        }
        case 'ADD_MANAGER': {
          state.openAddManager = true;
          break;
        }
        case 'ADD_GUARD': {
          state.openAddGuard = true;
          break;
        }
      }
    },
    close: (state, action) => {
      switch (action.payload) {
        case 'ADD_STUDENT': {
          state.openAddStudent = false;
          break;
        }
        case 'ADD_MANAGER': {
          state.openAddManager = false;
          break;
        }
        case 'ADD_GUARD': {
          state.openAddGuard = false;
          break;
        }
      }
    },
    resetForm: (state) => {
      state.user = getDefaultUser();
      console.log(state.user);
    },
  },
});
export const {
  next,
  back,
  chooseRole,
  updateFields,
  setAvatar,
  open,
  close,
  resetForm,
} = userFormSlice.actions;
export default userFormSlice.reducer;
