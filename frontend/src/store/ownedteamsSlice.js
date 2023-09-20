import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import getConfig from '../utils'
import { SUCCEEDED, FAILED, LOADING } from '../constants'
import { OWNED_TEAMS_FETCH_URL } from '../urls'

export const fetchownedTeams = createAsyncThunk(
  'ownedteams/fetchownedTeams',
  async () => {
    const response = await axios.get(OWNED_TEAMS_FETCH_URL, getConfig())
    return response.data
  },
)

const ownedteamsSlice = createSlice({
  name: 'ownedteams',
  initialState: {
    ownedTeams: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchownedTeams.pending, state => {
        state.status = LOADING
      })
      .addCase(fetchownedTeams.fulfilled, (state, action) => {
        state.status = SUCCEEDED
        state.ownedTeams = action.payload
      })
      .addCase(fetchownedTeams.rejected, (state, action) => {
        state.status = FAILED
        alert(`Owned Teams Fetching Failed! ${ action.error.message }`)
      })
  }
  ,
})

export default ownedteamsSlice.reducer
