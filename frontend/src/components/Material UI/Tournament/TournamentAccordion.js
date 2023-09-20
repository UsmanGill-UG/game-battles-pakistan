import React, {useContext} from 'react'
import {useDispatch} from 'react-redux'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {ERROR} from '../../../constants'
import {SnackbarContext} from '../../../SnackbarContext'
import {joinTournament, leaveTournament} from '../../../store/tournamentSlice'
import {buttonBox} from './TournamentStyles'
import {accordion, iconBlue, joinButton, leaveButton, textLight600} from '../../../AppStyles'

function TournamentAccordion({ 
    tournament, 
    isTeamRegistered, 
    selectedTeamId, 
}) { 
    const dispatch = useDispatch()
    const { showSnackbar } = useContext(SnackbarContext)

    const handleJoinClick = e => {
        e.stopPropagation()
        if (!selectedTeamId) {
            showSnackbar('Please select a team to join the tournament', ERROR)
            return
        }
        dispatch(joinTournament({ tournamentId: tournament.id, selectedTeamId }))
    }

    const handleLeaveClick = e => {
        e.stopPropagation()
        if (!selectedTeamId) {
            showSnackbar('Please select a team to leave the tournament', ERROR)
            return
        }
        dispatch(leaveTournament({ tournamentId: tournament.id, selectedTeamId }))
    }

    return (
        <Accordion
            key={ tournament.id }
            sx={ accordion }
        >
            <AccordionSummary
                expandIcon={ 
                    <ExpandMoreIcon
                        sx={ iconBlue }
                    />
                }
            >
                <Typography
                    variant='h5'
                    sx={ textLight600 }
                >
                    { tournament.name }
                </Typography>
                <Box
                    sx={ buttonBox }
                >
                    { isTeamRegistered(tournament) ?
                         <Button
                            variant='contained'
                            onClick={ handleLeaveClick }
                            sx={ leaveButton }
                        >
                            Leave
                        </Button>
                        :
                        <Button
                            variant='contained'
                            onClick={ handleJoinClick }
                            sx={ joinButton }
                        >
                            Join
                        </Button>
                     }
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                { tournament.teams_registered.map((team, idx) => (
                    <Box
                        key={ team.id }
                    >
                        <Typography 
                            sx={ textLight600 }
                        >
                            { team.name }
                        </Typography>
                    </Box>
                ))}
            </AccordionDetails>
        </Accordion>
    )
 }


export default TournamentAccordion
