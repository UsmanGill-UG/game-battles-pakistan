import {createTheme} from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
      primary: {
        light: '#FFFFFF', 
        main: '#222933',
        dark: '#0A0E17' 
      },
      secondary: {
        main: '#34B3EA',
      },
      text: {
        white: '#FFFFFF',
        light: '#6C829D',
        primary: '#000000',
        dark: '#000000'
      },
      icon: {
        primary: '#34B3EA',
        secondary: 'white'
      }
    }
  })
  
export const lightTheme = createTheme({
    palette: {
        primary: {
        light: '#FFFFFF', 
        main: '#000000',
        dark: '#F2F2F2',
        },
        secondary: {
        main: '#34B3EA',
        },
        text: {
        white: '#FFFFFF',
        light: '#FFFFFF',
        primary: '#000000',
        dark: '#000000',
        },
        icon: {
        primary: '#34B3EA',
        secondary: '#FFFFFF'
        }
    }
})
