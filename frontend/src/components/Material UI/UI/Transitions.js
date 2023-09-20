import React from 'react'
import Slide from '@mui/material/Slide'

export const TransitionLeft = (props) => { 
    return <Slide { ...props } direction='left'/>
 }

export const TransitionUp = React.forwardRef(function Transition(props, ref) { 
    return <Slide direction='up' ref={ ref } { ...props } />
 })
