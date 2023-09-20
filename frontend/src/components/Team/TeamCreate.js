import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormCard from '../UI/Form/FormCard'
import FormInput from '../UI/Form/FormInput'
import { createTeam, resetCreateStatus } from '../../store/teamsSlice'
import './Team.css'
import { SUCCEEDED } from '../../constants'

function TeamCreate() {
  const dispatch = useDispatch()
  const createStatus = useSelector(state => state.teams.createStatus)
  const [name, setName] = useState('')

  useEffect(() => {
    if (createStatus === SUCCEEDED) {
      dispatch(resetCreateStatus())
      setName({ name: '' })
    }
  }, [createStatus])

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(createTeam({ name }))
  }

  return (
    <FormCard title='Create Team' handleSubmit={ handleSubmit } buttonName='Create'>
      <FormInput
        placeholder='name'
        type='text'
        name='name'
        value={ name }
        handleChange={ e => setName(e.target.value) }
        required
      />
    </FormCard>
  )
}

export default TeamCreate
