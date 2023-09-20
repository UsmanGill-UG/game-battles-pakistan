import React, {useContext, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createGame, resetCreateStatus, resetUploadStatus, uploadGameImage} from '../../../store/gamesSlice'
import {EMPTY_GAME, LOADING, SUCCEEDED} from '../../../constants'
import {Box, Button, Container, Grid, IconButton, Paper, TextField, Typography} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {SnackbarContext} from '../../../SnackbarContext'
import {buttonBox, textField} from './GameStyles'
import {ml2, mt10, p2, textLight600} from '../../../AppStyles'

function AddGame() { 
    const dispatch = useDispatch()
    const createStatus = useSelector(state => state.games.createStatus)
    const uploadStatus = useSelector(state => state.games.uploadStatus)
    const imagePath = useSelector(state => state.games.imagePath)
    const [selectedGame, setSelectedGame] = useState(null)
    const [games, setGames] = useState([EMPTY_GAME])
    const [isDisabled, setIsDisabled] = useState(false)
    const { showSnackbar } = useContext(SnackbarContext)

    useEffect(() => { 
        if (createStatus === SUCCEEDED) { 
            setGames([EMPTY_GAME])
            resetCreateStatus()
            showSnackbar('Game created successfully!', 'success')
        }
    }, [createStatus])

    useEffect(() => { 
        if (uploadStatus === LOADING) { 
            setIsDisabled(true)
        } else if (uploadStatus === SUCCEEDED) { 
            updateGame(selectedGame, { image_path: imagePath })
            setSelectedGame(null)
            dispatch(resetUploadStatus())
            setIsDisabled(false)
        }
    }, [uploadStatus])

    const handleSubmit = e => { 
        e.preventDefault()
        dispatch(createGame({ games }))
    }

    const addNewGame = () => { 
        setGames([...games, EMPTY_GAME])
    }

    const updateGame = (gameIndex, updatedGame) => { 
        const newGames = [...games]
        newGames[gameIndex] = { ...newGames[gameIndex], ...updatedGame }
        setGames(newGames)
    }

    return (
        <Container
            maxWidth='md'
            sx={ mt10 }
        >
            <form id='gameForm' onSubmit={ handleSubmit }>
                <Grid container spacing={ 2 } justifyContent='center'>
                    { games.map((game, index) => (
                        <Grid item xs={ 12 } key={ game.id }>
                            <Paper 
                                elevation={ 3 } 
                                sx={ p2 }
                            >
                                <Typography
                                    variant='h6'
                                    sx={ textLight600 }
                                >
                                    Game { index + 1 }
                                </Typography>
                                <TextField
                                    fullWidth
                                    label='Game Name'
                                    value={ game.name }
                                    required
                                    variant='outlined'
                                    margin='normal'
                                    sx={ textField }
                                    onChange={ e => { 
                                        updateGame(index, { name: e.target.value })
                                    }}
                                />
                                <input
                                    type='file'
                                    id={ `fileInput${ index }` }
                                    onChange={ e => { 
                                        setSelectedGame(index)
                                        dispatch(
                                            uploadGameImage(e.target.files[0])
                                        )
                                    }}
                                    accept='image/*'
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor={ `fileInput${ index }` }>
                                    <IconButton
                                        component='span'
                                        color='primary'
                                        disabled={ isDisabled }
                                        aria-label='Upload Image'
                                    >
                                        <CloudUploadIcon/>
                                    </IconButton>
                                </label>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                <Box
                    sx={buttonBox}
                >
                    <Button
                        type='button'
                        onClick={ addNewGame }
                        variant='contained'
                        color='secondary'
                        disabled={ isDisabled }
                    >
                        Add
                    </Button>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        sx={ ml2 }
                    >
                        Create
                    </Button>
                </Box>
            </form>
        </Container>
    )
 }

export default AddGame
