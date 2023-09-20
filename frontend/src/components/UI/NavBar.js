import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'
import {useDispatch, useSelector} from 'react-redux'
import {logOut, resetLogOutStatus} from '../../store/authSlice'
import {
    ADD_GAME,
    CREATE_TOURNAMENT,
    GAME_LIST,
    HOME,
    SIGN_IN,
    SIGN_UP,
    TEAM_CREATE,
    TEAM_LIST,
    TOURNAMENT_LIST
} from '../../urls'
import {SUCCEEDED} from '../../constants'


function Navbar() {
  const dispatch = useDispatch()
  const logOutStatus = useSelector((state) => state.auth.logOutStatus)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    if (logOutStatus === SUCCEEDED) {
      dispatch(resetLogOutStatus())
    }
  }, [logOutStatus])

  const handleLogout = () => {
    dispatch(logOut())
  }

  return (
    <nav className='fixed-top navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='collapse navbar-collapse d-flex justify-content-between' id='navbarNav'>
        {isAuthenticated
          ? (
            <ul className='navbar-nav ml-auto'>
              <li className='px-2 nav-item'>
                <Link className='nav-link' to={ HOME }>Home</Link>
              </li>
              <li className='px-3 nav-item dropdown'>
                <a className='nav-link dropdown-toggle' href='#' data-toggle='dropdown'>
                  Games
                </a>
                <div className='navbar-menu dropdown-menu'>
                  <Link className='navbar-dropdown-item dropdown-item' to={ ADD_GAME }>Add Game</Link>
                  <Link className='navbar-dropdown-item dropdown-item' to={ GAME_LIST }>Game List</Link>
                </div>
              </li>
              <li className='px-3 nav-item dropdown'>
                <a className='nav-link dropdown-toggle' href='#' data-toggle='dropdown'>
                  Teams
                </a>
                <div className='navbar-menu dropdown-menu'>
                  <Link className='navbar-dropdown-item dropdown-item' to={ TEAM_CREATE }>Create Team</Link>
                  <Link className='navbar-dropdown-item dropdown-item' to={ TEAM_LIST }>Team List</Link>
                </div>
              </li>
              <li className='px-3 nav-item dropdown'>
                <a className='nav-link dropdown-toggle' href='#' data-toggle='dropdown'>
                  Tournaments
                </a>
                <div className='navbar-menu dropdown-menu'>
                  <Link className='navbar-dropdown-item dropdown-item' to={ CREATE_TOURNAMENT }>Create</Link>
                  <Link className='navbar-dropdown-item dropdown-item' to={ TOURNAMENT_LIST }>List</Link>
                </div>
              </li>
              <li className='px-3 nav-item active'>
                <Link className='nav-link' to={ HOME } onClick={ handleLogout }>Sign Out</Link>
              </li>
            </ul>
          )
          : 
          (
            <ul className='navbar-nav ml-auto'>
              <li className='px-5 nav-item'>
                <Link className='nav-link' to={ SIGN_IN }>Log in</Link>
              </li>
              <li className='px-2 nav-item'>
                <button className='join-button'>
                  <Link className='nav-link' to={ SIGN_UP }>Join</Link>
                </button>
              </li>
            </ul>
          )}
      </div>
    </nav>
  )
}

export default Navbar
