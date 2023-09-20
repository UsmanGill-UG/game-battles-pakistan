import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import getConfig from '../utils'
import {FAILED, LOADING, SUCCEEDED} from '../constants'
import {TOURNAMENTS_CREATE_URL, TOURNAMENTS_FETCH_URL, TOURNAMENTS_JOIN_URL, TOURNAMENTS_LEAVE_URL} from '../urls'

export const fetchTournaments = createAsyncThunk(
  'tournaments/fetchTournaments',
  async () => {
    const response = await axios.get(TOURNAMENTS_FETCH_URL, getConfig())
    return response.data
  },
)

export const createTournament = createAsyncThunk(
  'tournaments/createTournament',
  async ({ name, prize, game }) => {
    const response = await axios.post(TOURNAMENTS_CREATE_URL, 
                                        { name, prize, game }, 
                                        getConfig())
    return response.data
  },
)

export const joinTournament = createAsyncThunk(
  'tournaments/joinTournament',
  async ({ tournamentId, selectedTeamId }) => {
    const response = await axios.post(
      TOURNAMENTS_JOIN_URL,
      {
        'tournament_id': tournamentId,
        'team_id': selectedTeamId,
      },
      getConfig(),
    )
    return response.data
  },
)

export const leaveTournament = createAsyncThunk(
  'tournaments/leaveTournament',
  async ({ tournamentId, selectedTeamId }) => {
    const response = await axios.post(
      TOURNAMENTS_LEAVE_URL,
      {
        tournament_id: tournamentId,
        team_id: selectedTeamId,
      },
      getConfig(),
    )
    return response.data
  },
)

const tournamentsSlice = createSlice({
  name: 'tournaments',
  initialState: {
    tournaments: [],
    fetchStatus: 'idle',
    createStatus: 'idle',
    joinStatus: 'idle',
    leaveStatus: 'idle',
  },
  reducers: {
    resetCreateStatus(state) {
      state.createStatus = 'idle'
    }, 
    resetJoinStatus(state) {
      state.joinStatus = 'idle'
    },
    resetLeaveStatus(state) {
      state.leaveStatus = 'idle'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTournaments.pending, state => {
        state.fetchStatus = LOADING
      })
      .addCase(fetchTournaments.fulfilled, (state, action) => {
        state.fetchStatus = SUCCEEDED
        state.tournaments = action.payload
      })
      .addCase(fetchTournaments.rejected, (state, action) => {
        state.fetchStatus = FAILED
        alert(`Tournament Fetching Failed! ${ action.error.message }`)
      })
      .addCase(createTournament.pending, state => {
        state.createStatus = LOADING
      })
      .addCase(createTournament.fulfilled, state => {
        state.createStatus = SUCCEEDED
      })
      .addCase(createTournament.rejected, (state, action) => {
        state.createStatus = FAILED
        alert(`Tournament Creation Failed! ${ action.error.message }`)
      })
      .addCase(joinTournament.pending, state => {
        state.joinStatus = LOADING
      })
      .addCase(joinTournament.fulfilled, state => {
        state.joinStatus = SUCCEEDED
      })
      .addCase(joinTournament.rejected, (state, action) => {
        state.joinStatus = FAILED
        alert(`Error !, Team Joining Failed! ${ action.error.message }`)
      })
      .addCase(leaveTournament.pending, state => {
        state.leaveStatus = LOADING
      })
      .addCase(leaveTournament.fulfilled, state => {
        state.leaveStatus = SUCCEEDED
      })
      .addCase(leaveTournament.rejected, (state, action) => {
        state.leaveStatus = FAILED
        alert(`Error !, Team Leaving Failed! ${ action.error.message }`)
      })
  },
})

export const { resetCreateStatus, resetJoinStatus, resetLeaveStatus } = tournamentsSlice.actions
export default tournamentsSlice.reducer
