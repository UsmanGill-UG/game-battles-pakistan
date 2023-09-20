import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {resetSignUpStatus, signUp} from '../../../store/authSlice'
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
    const signUpStatus = useSelector(state => state.auth.signUpStatus)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => { 
        if (signUpStatus === SUCCEEDED) { 
            navigate(HOME)
            dispatch(resetSignUpStatus())
        }
    }, [signUpStatus])

    const handleSubmit = e => { 
        e.preventDefault()
        dispatch(signUp({ email, username, password }))
    }

    return (
        <Container component='main' maxWidth='sm'>
            <Box
                bgcolor='primary.light'
                sx={ mainBox }
            >
                <Typography variant='h5' color='text.primary'>
                    Sign Up
                </Typography>
                <Box 
                  component='form' 
                  onSubmit={ handleSubmit } 
                  noValidate 
                  sx={ mt1 }
                >
                    <TextField
                        required
                        onChange={ e => setEmail(e.target.value) }
                        margin='normal'
                        fullWidth
                        name='email'
                        label='Email'
                        type='email'
                        id='email'
                        autoComplete='email'
                    />
                    <TextField
                        required
                        onChange={ e => setUsername(e.target.value) }
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
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    )
 }

export default SignIn
