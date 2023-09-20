import React from 'react'
import {useDispatch} from 'react-redux'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {buttonBox} from './TeamStyles'
import {accordion, iconBlue, joinButton, leaveButton, textLight600} from '../../../AppStyles'


function TeamAccordion({ team, user, joinTeam, leaveTeam }) { 
    const dispatch = useDispatch()
    
    return (
        <Accordion
            key={ team.id }
            sx={ accordion }
        >
            <AccordionSummary
                expandIcon={ 
                    <ExpandMoreIcon sx={ iconBlue }/>
                }
            >
                <Typography
                    variant='h5'
                    noWrap
                    sx={ textLight600 }
                >
                    { team.name }
                </Typography>
                <Box
                    sx={ buttonBox }
                >
                    { team.members.some((member) => member.username === user) ?
                        <Button
                            variant='contained'
                            onClick={ event => { 
                                event.stopPropagation()
                                dispatch(leaveTeam(team.id))
                            }}
                            sx={ leaveButton }
                        >
                            Leave
                        </Button>
                        :
                        <Button
                            variant='contained'
                            onClick={ event => { 
                                event.stopPropagation()
                                dispatch(joinTeam(team.id))
                            }}
                            sx={ joinButton }
                        >
                            Join
                        </Button>
                     }
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                { team.members.map((member) => (
                    <Box key={ member.id } >
                        <Typography sx={ textLight600 }>
                            { member.username }
                        </Typography>
                    </Box>
                ))}
            </AccordionDetails>
        </Accordion>   
    )
 }


export default TeamAccordion
