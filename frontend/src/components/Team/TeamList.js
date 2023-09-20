import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import List from '../UI/List/List'
import TeamListCard from '../UI/List/TeamListCard'
import { fetchTeams, joinTeam, leaveTeam, resetJoinStatus, resetLeaveStatus } from '../../store/teamsSlice'
import './Team.css'
import { SUCCEEDED } from '../../constants'

function TeamList() {
  const dispatch = useDispatch()
  const teams = useSelector(state => state.teams.teams)
  const joinStatus = useSelector(state => state.teams.joinStatus)
  const leaveStatus = useSelector(state => state.teams.leaveStatus)
  const user = localStorage.getItem('user')

  useEffect(() => {
    dispatch(fetchTeams())
  }, [])

  useEffect(() => {
    if (joinStatus === SUCCEEDED) {
      dispatch(resetJoinStatus())
      dispatch(fetchTeams())
    }
  }, [joinStatus])

  useEffect(() => {
    if (leaveStatus === SUCCEEDED) {
      dispatch(resetLeaveStatus())
      dispatch(fetchTeams())
    }
  }, [leaveStatus])

  return (
    <List title='Teams'>
      {teams.map((team) => (
        <TeamListCard
          cardlayout='team-card-layout'
          key={ team.id }
          title={ team.name }
          button={
            team.members.some((member) => member.username === user)
              ? 
                <button 
                  className='mx-auto my-auto btn btn-danger' 
                  onClick={ () => dispatch(leaveTeam(team.id)) }
                >
                  Leave Team
                </button>
              : 
                <button 
                  className='mx-auto my-auto btn btn-primary' 
                  onClick={ () => dispatch(joinTeam(team.id)) }
                >
                  Join Team
                </button>
          }
          team={ team }
        />
      ))}
    </List>
  )
}

export default TeamList
