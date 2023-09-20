import React, {useContext, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    createTeam,
    fetchTeams,
    joinTeam,
    leaveTeam,
    resetCreateStatus,
    resetJoinStatus,
    resetLeaveStatus
} from '../../../store/teamsSlice'
import {SUCCEEDED, SUCCESS} from '../../../constants'
import Container from '@mui/material/Container'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import TeamDialog from './TeamDialog'
import TeamAccordion from './TeamAccordion'
import {SnackbarContext} from '../../../SnackbarContext'
import {addIconFab} from '../../../AppStyles'

function Teams() {  
    const dispatch = useDispatch()
    const createStatus = useSelector(state => state.teams.createStatus)
    const teams = useSelector(state => state.teams.teams)
    const joinStatus = useSelector(state => state.teams.joinStatus)
    const leaveStatus = useSelector(state => state.teams.leaveStatus)
    const user = localStorage.getItem('user')
    const [createOpen, setCreateOpen] = useState(false)
    const [name, setName] = useState('')
    const { showSnackbar } = useContext(SnackbarContext)

    useEffect(() => {  
        dispatch(fetchTeams())
    }, [])

    useEffect(() => {  
        if (joinStatus === SUCCEEDED) {  
            dispatch(resetJoinStatus())
            dispatch(fetchTeams())
            showSnackbar('Joined team successfully!', SUCCESS)            
         }
    }, [joinStatus])

    useEffect(() => {  
        if (leaveStatus === SUCCEEDED) {  
            dispatch(resetLeaveStatus())
            dispatch(fetchTeams())
            showSnackbar('Left team successfully!', SUCCESS)
         }
    }, [leaveStatus])

    const handleClickOpen = () => {  
        setCreateOpen(true)
    }

    const handleClose = () => {  
        setCreateOpen(false)
    }

    useEffect(() => {  
        if (createStatus === SUCCEEDED) {  
            dispatch(fetchTeams())
            dispatch(resetCreateStatus())
            setName('')
            showSnackbar('Team created successfully!', SUCCESS)
        }
    }, [createStatus])

    const handleCreateTeam = () => {  
        dispatch(createTeam({  name }))
        setCreateOpen(false)
    }

    return (
        <Container >
            <Fab
                color='primary'
                aria-label='add'
                sx={addIconFab}
                onClick={ handleClickOpen }
            >
                <AddIcon/>
            </Fab>
            { teams.map((team) => (
                <TeamAccordion
                    key={ team.id } 
                    team={ team }
                    user={ user }
                    joinTeam={ joinTeam }
                    leaveTeam={ leaveTeam }
                />
            ))}
            <TeamDialog
                open={ createOpen }
                handleClose={ handleClose }
                handleCreateTeam={ handleCreateTeam }
                name={ name }
                setName={ setName }
            />
        </Container>
    )
 }

export default Teams
