import React, { useEffect, useState } from 'react'
import './Tournament.css'
import { useDispatch, useSelector } from 'react-redux'
import SelectDropdown from '../UI/Form/SelectDropDown'
import List from '../UI/List/List'
import TournamentListCard from '../UI/List/TournamentListCard'
import { fetchTournaments, joinTournament, leaveTournament } from '../../store/tournamentSlice'
import { fetchownedTeams } from '../../store/ownedteamsSlice'
import { SUCCEEDED } from '../../constants'

function TournamentList() {
  const dispatch = useDispatch()
  const tournaments = useSelector(state => state.tournaments.tournaments)
  const ownedTeams = useSelector(state => state.ownedteams.ownedTeams)
  const joinStatus = useSelector(state => state.tournaments.joinStatus)
  const leaveStatus = useSelector(state => state.tournaments.leaveStatus)
  const [selectedTeamId, setSelectedTeamId] = useState(null)

  useEffect(() => {
    dispatch(fetchTournaments())
    dispatch(fetchownedTeams())
  }, [])

  useEffect(() => {
    if (joinStatus === SUCCEEDED) {
      dispatch(fetchTournaments())
    }
  }, [joinStatus])

  useEffect(() => {
    if (leaveStatus === SUCCEEDED) {
      dispatch(fetchTournaments())
    }
  }, [leaveStatus])

  const isTeamRegistered = (tournament) => {
    if (!selectedTeamId || !tournament.teams_registered) {
      return false
    }
    return tournament.teams_registered.some(team => team.id == selectedTeamId)
  }

  return (
    <div className='container'>
      <SelectDropdown
        classes='tournament-select-dropdown'
        id='team'
        name='team'
        label='Team'
        handleChange={ e => setSelectedTeamId(e.target.value) }
        selectedValue={ selectedTeamId || '' }
        options={ ownedTeams }
      />
      <List title='Tournament'>
        {tournaments && tournaments.map((tournament) => (
          <TournamentListCard
            cardlayout='tournament-card-layout'
            key={ tournament.id }
            title={ tournament.name }
            button={
              isTeamRegistered(tournament)
                ? (
                  <button
                    className='mx-auto my-auto btn btn-danger'
                    onClick={() => dispatch(leaveTournament({ tournamentId: tournament.id, selectedTeamId }))}
                  >
                    Leave
                  </button>
                )
                : (
                  <button
                    className='mx-auto my-auto btn btn-primary'
                    onClick={() => dispatch(joinTournament({ tournamentId: tournament.id, selectedTeamId }))}
                  >
                    Join
                  </button>
                )
            }
            tournament={ tournament }
          />
        ))}
      </List>
    </div>
  )
}

export default TournamentList
