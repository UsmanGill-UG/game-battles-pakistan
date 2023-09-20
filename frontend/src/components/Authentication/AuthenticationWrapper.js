import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {resetSignInStatus} from '../../store/authSlice'
import PropTypes from 'prop-types'

function AuthenticationWrapper({ Component, signInLink }) { 
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const navigate = useNavigate()

    useEffect(() => { 
        if (!isAuthenticated) { 
            dispatch(resetSignInStatus())
            navigate(signInLink)
        }
    }, [isAuthenticated])

    return isAuthenticated ? <Component/> : null
}

AuthenticationWrapper.propTypes = { 
    Component: PropTypes.elementType.isRequired
}

export default AuthenticationWrapper
