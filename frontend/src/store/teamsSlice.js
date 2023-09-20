import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {FAILED, LOADING, SUCCEEDED} from '../constants'
import getConfig from '../utils'
import {TEAM_JOIN_URL, TEAM_LEAVE_URL, TEAMS_CREATE_URL, TEAMS_FETCH_URL} from '../urls'

export const fetchTeams = createAsyncThunk(
    'teams/fetchTeams',
    async () => {
        const response = await axios.get(TEAMS_FETCH_URL, getConfig())
        return response.data
    },
)

export const createTeam = createAsyncThunk(
    'teams/createTeam',
    async (name) => {
        const response = await axios.post(TEAMS_CREATE_URL, name, getConfig())
        return response.data
    },
)

export const joinTeam = createAsyncThunk(
    'teams/joinTeam',
    async (teamId) => {
        const response = await axios.post(
            TEAM_JOIN_URL,
            {team_id: teamId},
            getConfig(),
        )
        return response.data
    },
)

export const leaveTeam = createAsyncThunk(
    'teams/leaveTeam',
    async (teamId) => {
        const response = await axios.post(
            TEAM_LEAVE_URL,
            {team_id: teamId},
            getConfig(),
        )
        return response.data
    },
)

const teamsSlice = createSlice({
    name: 'teams',
    initialState: {
        teams: [],
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
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTeams.pending, state => {
                state.fetchStatus = LOADING
            })
            .addCase(fetchTeams.fulfilled, (state, action) => {
                state.fetchStatus = SUCCEEDED
                state.teams = action.payload
            })
            .addCase(fetchTeams.rejected, (state, action) => {
                state.fetchStatus = FAILED
                alert(`Teams Fetching Failed! ${action.error.message}`)
            })
            .addCase(createTeam.pending, state => {
                state.createStatus = LOADING
            })
            .addCase(createTeam.fulfilled, state => {
                state.createStatus = SUCCEEDED
            })
            .addCase(createTeam.rejected, (state, action) => {
                state.createStatus = FAILED
                alert(`Team Creation Failed! ${action.error.message}`)
            })
            .addCase(joinTeam.pending, state => {
                state.joinStatus = LOADING
            })
            .addCase(joinTeam.fulfilled, state => {
                state.joinStatus = SUCCEEDED
            })
            .addCase(joinTeam.rejected, (state, action) => {
                state.joinStatus = FAILED
                alert(`Team Join Failed! ${action.error.message}`)
            })
            .addCase(leaveTeam.pending, state => {
                state.leaveStatus = LOADING
            })
            .addCase(leaveTeam.fulfilled, state => {
                state.leaveStatus = SUCCEEDED
            })
            .addCase(leaveTeam.rejected, (state, action) => {
                state.leaveStatus = FAILED
                alert(`Team Leave Failed! ${action.error.message}`)
            })
    },
})

export const {resetCreateStatus, resetJoinStatus, resetLeaveStatus} = teamsSlice.actions
export default teamsSlice.reducer
