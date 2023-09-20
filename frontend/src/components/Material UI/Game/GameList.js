import React, {useContext, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {BASE_URL, ERROR, FAILED} from '../../../constants'
import {fetchGames, resetFetchStatus} from '../../../store/gamesSlice'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {Container, Grid} from '@mui/material'
import {SnackbarContext} from '../../../SnackbarContext'
import {cardMedia, gamesCard} from './GameStyles'
import {mt2, textLight600} from '../../../AppStyles'

function GameList() { 
    const dispatch = useDispatch()
    const games = useSelector( state => state.games.games)
    const fetchStatus = useSelector( state => state.games.fetchStatus)
    const { showSnackbar } = useContext(SnackbarContext)
   
    useEffect(() => { 
        dispatch(fetchGames())
    }, [])

    useEffect(() => { 
        if (fetchStatus === FAILED) { 
            dispatch(resetFetchStatus())
            showSnackbar('Failed to fetch games!', ERROR)
        }
    }, [fetchStatus])

    return (
        <Container
            sx={ mt2 }
        >
            <Grid container>
                { games.length === 0 ? (
                    <Typography
                        color='text.secondary'
                        variant='h4'
                    >
                        No games to display
                    </Typography>
                ) : (
                    games.games.map((game) => (
                        <Grid
                            item
                            md={ 3 }
                            key={ game.id }
                            sx={ mt2 }
                        >
                            <Card
                                sx={ gamesCard }
                            >
                                <CardMedia
                                    sx={ cardMedia }
                                    image={
                                        `${ BASE_URL }media/${ game.image_path }`
                                    }
                                    title={ game.name }
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant='body1'
                                        sx={ textLight600 }
                                    >
                                        { game.name }
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )
                 }
            </Grid>
        </Container>
    )
 }

export default GameList
