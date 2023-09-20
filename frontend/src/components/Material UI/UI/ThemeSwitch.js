import React from 'react'
import {Box, Switch} from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import DarkModeIcon from '@mui/icons-material/DarkMode'

function ThemeSwitch({isDarkTheme, setTheme}) {
    
    const handleThemeChange = () => { 
        localStorage.setItem('darkTheme', !isDarkTheme)
        setTheme(!isDarkTheme)
    }

    return (
        <Switch
            checked={ isDarkTheme }
            onChange={ handleThemeChange }
            color='secondary'
            icon={
                <Box
                    sx={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'grey.300'
                    }}
                    >
                    <WbSunnyIcon color='primary' />
                </Box>
            }
            checkedIcon={
                <Box
                    sx={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'grey.300'
                    }}
                >
                <DarkModeIcon color='action' />
                </Box>
            }
        />
    )
 }

export default ThemeSwitch
