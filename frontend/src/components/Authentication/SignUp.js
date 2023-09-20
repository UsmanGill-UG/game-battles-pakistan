import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormCard from '../UI/Form/FormCard'
import FormInput from '../UI/Form/FormInput'
import { signUp, resetSignUpStatus } from '../../store/authSlice'
import { SIGN_IN } from '../../urls'
import { SUCCEEDED } from '../../constants'

function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const signUpStatus = useSelector(state => state.auth.signUpStatus)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (signUpStatus === SUCCEEDED) {
      navigate(SIGN_IN)
    }
  }, [signUpStatus])

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(signUp({ email, username, password }))
  }

  return (
    <FormCard title='Sign Up' handleSubmit={ handleSubmit } buttonName='Sign Up'>
      <FormInput
        placeholder='Email'
        type='email'
        name='email'
        value={ email }
        handleChange={ e => setEmail(e.target.value) }
        required
      />
      <FormInput
        placeholder='Username'
        type='text'
        name='username'
        value={ username }
        handleChange={ e => setUsername(e.target.value) }
        required
      />
      <FormInput
        placeholder='Password'
        type='password'
        name='password'
        value={ password }
        handleChange={ e => setPassword(e.target.value) }
        required
      />
    </FormCard>
  )
}

export default SignUp
