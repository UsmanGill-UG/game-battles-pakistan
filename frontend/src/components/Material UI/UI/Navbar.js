import React, {useContext, useEffect} from 'react'
import {
    ADD_GAME_MUI,
    GAME_LIST_MUI,
    HOME,
    SIGN_IN_MUI,
    SIGN_UP_MUI,
    TEAM_LIST_MUI,
    TOURNAMENT_LIST_MUI
} from '../../../urls'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import {Box} from '@mui/system'
import {Link as RouterLink, useLocation} from 'react-router-dom'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'
import GroupsIcon from '@mui/icons-material/Groups'
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import {useDispatch, useSelector} from 'react-redux'
import {logOut, resetLogOutStatus} from '../../../store/authSlice'
import NavbarLink from './NavbarLink'
import {SUCCEEDED} from '../../../constants'
import {SnackbarContext} from '../../../SnackbarContext'
import * as styles from './NavbarStyles'
import ThemeSwitch from './ThemeSwitch'
import SideLink from './SideLink'

function Navbar({isDarkTheme, setTheme}) { 
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const logOutStatus = useSelector((state) => state.auth.logOutStatus)
    const username = localStorage.getItem('user')
    const { showSnackbar } = useContext(SnackbarContext);
    const location = useLocation()
    
    useEffect(() => { 
        if (logOutStatus === SUCCEEDED) { 
            dispatch(resetLogOutStatus())
            showSnackbar('Logged out successfully!', 'success')
        }
    }, [logOutStatus])

    const isActiveLink = (urlLink) => {
        return urlLink === location.pathname ? 'secondary.main' : 'text.light'
    }

    return (
        <AppBar position='static'>
            <Toolbar disableGutters>
                <Typography
                    variant='h6'
                    noWrap
                    component={ RouterLink }
                    to={ HOME }
                    sx={ styles.title }
                >
                    Gaming Platform
                </Typography>
                <Box
                    sx={ styles.navContentLinkBox }
                >
                    <NavbarLink
                        name='Add Game'
                        urlLink={ ADD_GAME_MUI }
                        color={ isActiveLink(ADD_GAME_MUI) }
                    >
                        <AddCircleIcon 
                            sx={{ color:isActiveLink(ADD_GAME_MUI) }}
                        />
                    </NavbarLink>
                    <NavbarLink
                        name='Game List'
                        urlLink={ GAME_LIST_MUI }
                        color={ isActiveLink(GAME_LIST_MUI) }
                    >
                        <VideogameAssetIcon
                             sx={{ color:isActiveLink(GAME_LIST_MUI) }}
                        />
                    </NavbarLink>                        
                    <NavbarLink
                        name='Teams'
                        urlLink={ TEAM_LIST_MUI }
                        color={ isActiveLink(TEAM_LIST_MUI) }
                    >
                        <GroupsIcon 
                            sx={{ color:isActiveLink(TEAM_LIST_MUI) }}
                        />
                    </NavbarLink>
                    <NavbarLink
                        name='Tournaments'
                        urlLink={ TOURNAMENT_LIST_MUI }
                        color={ isActiveLink(TOURNAMENT_LIST_MUI) }
                    >
                        <SportsKabaddiIcon 
                            sx={{ color:isActiveLink(TOURNAMENT_LIST_MUI) }}
                        />
                    </NavbarLink>
                </Box>
                <Box
                    sx={styles.navContentLinkBox}
                >
                    { isAuthenticated ? (
                        <Box sx={ styles.sideBox }>
                            <SideLink
                                name={username}
                            />
                            <SideLink
                                name='Sign Out'
                                handleClick = { () => dispatch(logOut()) }
                                urlLink={ HOME }
                            />
                        </Box>
                    ) : (
                        <Box
                            sx={ styles.sideBox }
                        >
                            <SideLink
                                name='Sign Up'
                                urlLink={ SIGN_UP_MUI }
                            />
                            <SideLink
                                name='Sign In'
                                urlLink={ SIGN_IN_MUI }
                            />
                        </Box>
                    ) }
                    <ThemeSwitch
                        isDarkTheme={ isDarkTheme }
                        setTheme={ setTheme }
                    />
                </Box>
            </Toolbar>
        </AppBar>
    )
 }

export default Navbar
