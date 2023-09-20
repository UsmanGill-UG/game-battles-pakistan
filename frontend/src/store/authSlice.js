import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import getConfig from '../utils'
import {FAILED, LOADING, SUCCEEDED} from '../constants'
import {SIGN_IN_URL, SIGN_OUT_URL, SIGN_UP_URL} from '../urls'

export const signUp = createAsyncThunk(
  'authentication/signUp',
  async ({ email, username, password }) => {
    const response = await axios.post(SIGN_UP_URL, { email, username, password })
    return response.data
  },
)

export const signIn = createAsyncThunk(
  'authentication/signIn',
  async ({ username, password }) => {
    const response = await axios.post(SIGN_IN_URL, { username, password })
    return response.data
  },
)

export const logOut = createAsyncThunk(
  'authentication/logOut',
  async () => {
    await axios.post(SIGN_OUT_URL, {}, getConfig())
  },
)

const intialAuthState = {
  isAuthenticated: false,
  signUpStatus: 'idle',
  signInStatus: 'idle',
  logOutStatus: 'idle',
}

const authSlice = createSlice({
  name: 'authentication',
  initialState: intialAuthState,
  reducers: {
    resetSignUpStatus(state) {
      state.signUpStatus = 'idle'
    },
    resetSignInStatus(state) {
      state.signInStatus = 'idle'
    },
    resetLogOutStatus(state) {
      state.logOutStatus = 'idle'
    }, 
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, state => {
        state.signInStatus = LOADING
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isAuthenticated = true
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', action.payload.user)
        state.signInStatus = SUCCEEDED
      })
      .addCase(signIn.rejected, (state, action) => {
        state.signInStatus = FAILED
        alert(`Sign In Failed! ${ action.error.message }`)
      })
      .addCase(logOut.pending, state => {
        state.logOutStatus = LOADING
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isAuthenticated = false
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        state.logOutStatus = SUCCEEDED
        state.signInStatus = 'idle'
      })
      .addCase(logOut.rejected, (state, action) => {
        state.logOutStatus = FAILED
        alert(`Log Out Failed! ${ action.error.message }`)
      })
      .addCase(signUp.pending, state => {
        state.signUpStatus = LOADING
      })
      .addCase(signUp.fulfilled, state => {
        state.signUpStatus = SUCCEEDED
        alert('Sign Up! Successful!')
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUpStatus = FAILED
        alert(`Sign Up Failed! ${ action.error.message }`)
      })
  },
})

export const { resetSignUpStatus, resetSignInStatus, resetLogOutStatus, setIsAuthenticated } = authSlice.actions
export default authSlice.reducer
