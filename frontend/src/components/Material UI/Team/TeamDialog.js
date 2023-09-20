import React from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import {TransitionUp} from '../UI/Transitions'

function TeamDialog({ open, handleClose, name, setName, handleCreateTeam }) { 
    return (
        <Dialog
            open={ open }
            onClose={ handleClose }
            TransitionComponent={ TransitionUp }
            fullWidth
        >
            <DialogTitle>
                Create Team
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
            </DialogContent>
            <DialogActions>
                <Button onClick={ handleClose }>Cancel</Button>
                <Button onClick={ handleCreateTeam }>Create</Button>
            </DialogActions>
        </Dialog>
    )
 }

export default TeamDialog
