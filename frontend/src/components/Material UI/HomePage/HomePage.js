import React from 'react'
import {Container} from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import mainImage from '../../../Images/main.jpeg'
import styles from './HomePageStyles'
import {mt4} from '../../../AppStyles'

function HomePage() { 
    return (
        <Container sx={ mt4 }>
            <Card sx={ styles.homePageCard }>
                <Box sx={ styles.homePageCardBox }>
                    <CardContent sx={ styles.homePageCardContent }>
                        <Typography 
                            component='div' 
                            variant='h3'
                            fontWeight={ 700 }
                        >
                            Welcome to Gaming Platform
                        </Typography>
                    </CardContent>
                </Box>
                <CardMedia
                    component='img'
                    sx={ styles.homePageCardMedia }
                    image={ mainImage }
                    alt='Gaming Platform'
                />
            </Card>
        </Container>
    )
 }

export default HomePage
