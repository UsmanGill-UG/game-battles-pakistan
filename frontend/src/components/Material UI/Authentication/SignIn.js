import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {resetSignInStatus, signIn} from '../../../store/authSlice'
import {HOME} from '../../../urls'
import {SUCCEEDED} from '../../../constants'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {Container} from '@mui/material'
import {button, mainBox} from './AuthenticationStyles'
import {mt1} from '../../../AppStyles'

function SignIn() { 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const signInStatus = useSelector(state => state.auth.signInStatus)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => { 
        if (signInStatus === SUCCEEDED) { 
            navigate(HOME)
            dispatch(resetSignInStatus())
        }
    }, [signInStatus])

    const handleSubmit = e => { 
        e.preventDefault()
        dispatch(signIn({ username, password }))
    }

    return (
        <Container component='main' maxWidth='sm'>
            <Box
                bgcolor='primary.light'
                sx={ mainBox }
            >
                <Typography variant='h5' color='text.dark'>
                    Sign in
                </Typography>
                <Box 
                    component='form' 
                    onSubmit={ handleSubmit } 
                    sx={ mt1 }
                >
                    <TextField
                        required
                        onChange={ e => setUsername(e.target.value) }
                        variant='outlined'
                        margin='normal'
                        fullWidth
                        id='username'
                        label='username'
                        name='username'
                        autoFocus
                    />
                    <TextField
                        required
                        onChange={ e => setPassword(e.target.value) }
                        margin='normal'
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={ button }
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    )
 }

export default SignIn
