import React, { useEffect, useState } from 'react'
import './Tournament.css'
import { useDispatch, useSelector } from 'react-redux'
import FormInput from '../UI/Form/FormInput'
import SelectDropdown from '../UI/Form/SelectDropDown'
import FormCard from '../UI/Form/FormCard'
import { createTournament, resetCreateStatus } from '../../store/tournamentSlice'
import { fetchGames } from '../../store/gamesSlice'
import { SUCCEEDED } from '../../constants'

function CreateTournament() {
  const dispatch = useDispatch()
  const games = useSelector(state => state.games.games)
  const createStatus = useSelector(state => state.tournaments.createStatus)
  const [name, setName] = useState('')
  const [prize, setPrize] = useState('')
  const [game, setGame] = useState('')

  useEffect(() => {
    dispatch(fetchGames())
  }, [])

  useEffect(() => {
    if (createStatus === SUCCEEDED) {
      dispatch(resetCreateStatus())
      setName('')
      setGame('')
      setPrize('')
    }
  }, [createStatus])

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(createTournament({ name, prize, game }))
  }

  return (
    <FormCard title='Create Tournament' handleSubmit={ handleSubmit } buttonName='Create Tournament'>
      <FormInput
        placeholder='name'
        type='text'
        name='name'
        value={ name }
        handleChange={ e => setName(e.target.value) }
        required
      />
      <FormInput
        placeholder='prize'
        type='text'
        name='prize'
        value={ prize }
        handleChange={ e => setPrize(e.target.value) }
        required
      />
      <SelectDropdown
        id='game'
        name='game'
        handleChange={ e => setGame(e.target.value) }
        selectedValue={ game }
        options={ games.games || [] }
      />
    </FormCard>
  )
}

export default CreateTournament
