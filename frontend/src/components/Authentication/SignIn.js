import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signIn, resetSignInStatus } from '../../store/authSlice'
import FormCard from '../UI/Form/FormCard'
import FormInput from '../UI/Form/FormInput'
import { HOME } from '../../urls'
import { SUCCEEDED } from '../../constants'

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
    <FormCard title='Sign In' handleSubmit={ handleSubmit } buttonName='Sign In'>
      <FormInput
        placeholder='username'
        type='text'
        name='username'
        value={ username }
        handleChange={ e => setUsername(e.target.value) }
        required
      />
      <FormInput
        placeholder='password'
        type='password'
        name='password'
        value={ password }
        handleChange={ e => setPassword(e.target.value) }
        required
      />
    </FormCard>
  )
}

export default SignIn
