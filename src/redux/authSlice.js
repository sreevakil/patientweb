import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    error: ''
}

const authSlice = createSlice({  
  name: 'auth',
  initialState,
  reducers: {

    authenticate: state => {
        state.loading = true
        state.error = ''
    },    
    
    authSuccess: (state, action) => {
        const content = action.payload;
        localStorage.setItem('USER_KEY',content.token);
        state.loading = false
        state.error = ''  
    },
    
    authFailure: (state, action) => {
        state.loading = false
        state.error = action.payload;
    }   
  }
})

export const { authenticate, authSuccess, authFailure } = authSlice.actions;
export default authSlice.reducer;