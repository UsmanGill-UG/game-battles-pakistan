import React from 'react'
import Typography from '@mui/material/Typography'
import {Link, ListItemIcon} from '@mui/material'
import {Link as RouterLink} from 'react-router-dom'
import * as styles from './NavbarLinkStyles'


function NavbarLink({ name, urlLink = '', color, children}) {
    return (
        <Link
            component = { RouterLink }   
            to={ urlLink }
            underline='none'
            color={ color }
            sx = { styles.navLink }
        >
            <ListItemIcon
                sx={ styles.listItemIcon }
            >
                { children }
            </ListItemIcon>
            <Typography
                variant='subtitle1'
                fontWeight={ 700 }
                noWrap
            >
                { name }
            </Typography>
        </Link>
    )
 }

export default NavbarLink
