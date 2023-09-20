import React from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import {TransitionUp} from '../UI/Transitions'
import {mt1} from '../../../AppStyles'

function TournamentDialog({ 
    createOpen, 
    handleClose,
    name, 
    setName, 
    prize, 
    setPrize, 
    selectedGame, 
    setSelectedGame,
    allGames, 
    handleDialogClose, 
    handleCreateTournament
}) { 
    return (
        <Dialog
            open={ createOpen }
            onClose={ handleClose }
            TransitionComponent={ TransitionUp }
            fullWidth
        >
            <DialogTitle color='text.dark'>
                Create Tournament
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='name'
                    type='text'
                    fullWidth
                    variant='standard'
                    value={ name }
                    onChange={ e => setName(e.target.value) }
                />
                <TextField
                    autoFocus
                    margin='dense'
                    id='prize'
                    label='prize'
                    type='text'
                    fullWidth
                    variant='standard'
                    value={ prize }
                    onChange={ e => setPrize(e.target.value) }
                />
                <FormControl fullWidth sx={ mt1 }>
                    <InputLabel>Select Game</InputLabel>
                    <Select
                        value={ selectedGame || '' }
                        label='Select Game'
                        onChange={ e => setSelectedGame(e.target.value) }
                    >
                        { allGames.games && allGames.games.map((game) => (
                            <MenuItem key={ game.id } value={ game.id }>{ game.name }</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={ handleDialogClose }>Cancel</Button>
                <Button onClick={ handleCreateTournament }>Create</Button>
            </DialogActions>
        </Dialog>
    )
 }


export default TournamentDialog
