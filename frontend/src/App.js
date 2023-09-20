import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {getToken} from './utils'
import {setIsAuthenticated} from './store/authSlice'
// React with Bootstrap
import SignIn from './components/Authentication/SignIn'
import SignUp from './components/Authentication/SignUp'
import TeamCreate from './components/Team/TeamCreate'
import TeamList from './components/Team/TeamList'
import TournamentCreate from './components/Tournament/CreateTournament'
import TournamentList from './components/Tournament/TournamentList'
import CreateGame from './components/Game/AddGame'
import GameList from './components/Game/GameList'
// Material UI
import {
    ADD_GAME,
    ADD_GAME_MUI,
    CREATE_TOURNAMENT,
    GAME_LIST,
    GAME_LIST_MUI,
    HOME,
    SIGN_IN,
    SIGN_IN_MUI,
    SIGN_UP,
    SIGN_UP_MUI,
    TEAM_CREATE,
    TEAM_LIST,
    TEAM_LIST_MUI,
    TOURNAMENT_LIST,
    TOURNAMENT_LIST_MUI
} from './urls'
import NavbarMUI from './components/Material UI/UI/Navbar'
import {Box, Container, ThemeProvider} from '@mui/material'
import AuthenticationWrapper from './components/Authentication/AuthenticationWrapper'
import HomePageMUI from './components/Material UI/HomePage/HomePage'
import SignInMUI from './components/Material UI/Authentication/SignIn'
import SignUpMUI from './components/Material UI/Authentication/SignUp'
import GameListMUI from './components/Material UI/Game/GameList'
import Teams from './components/Material UI/Team/Teams'
import Tournaments from './components/Material UI/Tournament/Tournaments'
import CreateGameMUI from './components/Material UI/Game/AddGame'
import {darkTheme, lightTheme} from './theme'
import {SnackbarProvider} from './SnackbarContext';
import './App.css'
import './AppStyles'

function App() {
  const dispatch = useDispatch()
  const [isDarkTheme, setDarkTheme] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('darkTheme') === 'false') {
      setDarkTheme(false)
    } 
  }, [])

  if (getToken) {
    dispatch(setIsAuthenticated(true))
  }

  return (
    <ThemeProvider theme={ isDarkTheme ? darkTheme : lightTheme}>
      <SnackbarProvider>
        <Box sx={{ backgroundColor: 'primary.dark', minHeight: '100vh' }}>
          <Router>
              <NavbarMUI isDarkTheme={isDarkTheme} setTheme={setDarkTheme}/>
            <Container
              sx={{ 
                backgroundColor: 'primary.dark',
                mt:1,
              }}
            >
              <Routes>
                <Route path = { SIGN_IN } element={< SignIn /> }/>
                <Route path = { SIGN_UP } element={< SignUp /> }/>
                <Route path = { GAME_LIST } element={ <AuthenticationWrapper Component={ GameList } signInLink={SIGN_IN}/> }/>
                < Route path= { TEAM_CREATE } element={ <AuthenticationWrapper Component={ TeamCreate } signInLink={SIGN_IN}/> }/>
                <Route path = { TEAM_LIST } element={ <AuthenticationWrapper Component={ TeamList } signInLink={SIGN_IN}/> }/>
                <Route path = { TOURNAMENT_LIST } element={ <AuthenticationWrapper Component={ TournamentList } signInLink={SIGN_IN}/> }/>
                <Route path = { CREATE_TOURNAMENT } element={ <AuthenticationWrapper Component={ TournamentCreate } signInLink={SIGN_IN}/> }/>
                <Route path = { ADD_GAME } element={<AuthenticationWrapper Component={ CreateGame } signInLink={SIGN_IN}/> } />
                 {/* // Material UI Path */}
                <Route path = { HOME } element={ <HomePageMUI /> }/>
                <Route path = { GAME_LIST_MUI } element={ <AuthenticationWrapper Component={ GameListMUI } signInLink={SIGN_IN_MUI}/>}/>
                <Route path = { SIGN_IN_MUI } element={< SignInMUI /> }/>
                <Route path = { SIGN_UP_MUI } element={< SignUpMUI /> }/>
                <Route path = { TEAM_LIST_MUI } element={ <AuthenticationWrapper Component={ Teams } signInLink={SIGN_IN_MUI}/> }/>
                <Route path = { TOURNAMENT_LIST_MUI } element={ <AuthenticationWrapper Component={ Tournaments } signInLink={SIGN_IN_MUI}/> }/>
                <Route path = { ADD_GAME_MUI } element={<AuthenticationWrapper Component={ CreateGameMUI } signInLink={SIGN_IN_MUI}/> } />
              </Routes>
            </Container>
          </Router>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
