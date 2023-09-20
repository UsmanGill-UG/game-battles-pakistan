import {configureStore} from '@reduxjs/toolkit'
import gamesReducer from './gamesSlice'
import teamsReducer from './teamsSlice'
import authReducer from './authSlice'
import tournamentReducer from './tournamentSlice'
import ownedteamsReducer from './ownedteamsSlice'

const store = configureStore({
  reducer: {
    teams: teamsReducer,
    games: gamesReducer,
    auth: authReducer,
    tournaments: tournamentReducer,
    ownedteams: ownedteamsReducer,
  },
})

export default store
