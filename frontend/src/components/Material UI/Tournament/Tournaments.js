import React, {useContext, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    createTournament,
    fetchTournaments,
    resetCreateStatus,
    resetJoinStatus,
    resetLeaveStatus
} from '../../../store/tournamentSlice'
import {fetchownedTeams} from '../../../store/ownedteamsSlice'
import {SUCCEEDED, SUCCESS} from '../../../constants'
import {fetchGames} from '../../../store/gamesSlice'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import {Box} from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import TournamentDialog from './TournamentDialog'
import TournamentAccordion from './TournamentAccordion'
import {SnackbarContext} from '../../../SnackbarContext'
import {mainBox, ownedTeamsBox, selectDropDown} from './TournamentStyles'
import {addIconFab, blackColor, p2, textLight600} from '../../../AppStyles'

function Tournaments() { 
    const dispatch = useDispatch()
    const { showSnackbar } = useContext(SnackbarContext)
    const games = useSelector(state => state.games.games)

    const [selectedTeamId, setSelectedTeamId] = useState(null)
    const [createOpen, setCreateOpen] = useState(false)
    const [name, setName] = useState('')
    const [prize, setPrize] = useState('')
    const [game, setGame] = useState('')

    const tournaments = useSelector(state => state.tournaments.tournaments)
    const ownedTeams = useSelector(state => state.ownedteams.ownedTeams)
    const joinStatus = useSelector(state => state.tournaments.joinStatus)
    const leaveStatus = useSelector(state => state.tournaments.leaveStatus)
    const createStatus = useSelector(state => state.tournaments.createStatus)

    useEffect(() => { 
        dispatch(fetchTournaments())
        dispatch(fetchownedTeams())
        dispatch(fetchGames())
     }, [])

    useEffect(() => { 
        if (createStatus === SUCCEEDED) { 
            dispatch(resetCreateStatus())
            dispatch(fetchTournaments())
            setName('')
            setGame('')
            setPrize('')
         }
     }, [createStatus])



    useEffect(() => { 
        if (joinStatus === SUCCEEDED) { 
            dispatch(fetchTournaments())
            dispatch(resetJoinStatus())
            showSnackbar('Joined tournament successfully!', SUCCESS)
         }
    }, [joinStatus])

    useEffect(() => { 
        if (leaveStatus === SUCCEEDED) { 
            dispatch(fetchTournaments())
            dispatch(resetLeaveStatus())
            showSnackbar('Left tournament successfully!', SUCCESS)
         }
    }, [leaveStatus])

    const isTeamRegistered = (tournament) => { 
        if (!selectedTeamId || !tournament.teams_registered) { 
            return false
         }
        return tournament.teams_registered.some(team => team.id == selectedTeamId)
    }

    const handleCreateTournament = () => { 
        dispatch(createTournament({ name, prize, game }))
        setCreateOpen(false)
    }
    
    return (
        <Container sx={ p2 }>
            <Box
                sx={mainBox}
            >
                <Box
                    sx={ownedTeamsBox}>
                    <FormControl fullWidth>
                        <InputLabel 
                            sx={textLight600}
                        >
                            Select Team
                        </InputLabel>
                        <Select
                            value={ selectedTeamId || -1 }
                            label='Select Team'
                            onChange={ e => setSelectedTeamId(e.target.value) }
                            sx={selectDropDown}
                        >
                            { ownedTeams.map((team) => (
                                <MenuItem 
                                    key={ team.id } 
                                    value={ team.id }
                                    sx={blackColor}
                                >
                                    { team.name }
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Fab
                    color='primary'
                    aria-label='add'
                    onClick={ () => setCreateOpen(true) }
                    sx={addIconFab}
                >
                    <AddIcon/>
                </Fab>
            </Box>
            { tournaments.length && (
                <Typography
                    color='text.light'
                    variant='h4'
                >
                    No tournaments to display
                </Typography>
            )}
            { tournaments.map((tournament) => (
                <TournamentAccordion
                    key={ tournament.id }
                    tournament={ tournament }
                    isTeamRegistered={ isTeamRegistered }
                    selectedTeamId={ selectedTeamId }
                />
            ))}
            <TournamentDialog
                createOpen={ createOpen }
                fullWidth
                name={ name }
                setName={ setName }
                prize={ prize }
                setPrize={ setPrize }
                selectedGame={ game }
                setSelectedGame={ setGame }
                allGames={ games }
                handleCreateTournament={ handleCreateTournament }
                handleDialogClose={ () => setCreateOpen(false) }
            />
        </Container>
    )
 }

export default Tournaments
