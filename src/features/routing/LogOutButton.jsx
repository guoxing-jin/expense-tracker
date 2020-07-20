import React from 'react'
import firebase from 'firebase/app'
import StyledButton from '../../components/StyledButton'
import styled from 'styled-components'

const StyledLogOutButton = styled(StyledButton)`
    width: 96px;
    height: 40px;
    border: var(--border-transparent);

    color: var(--error-red-60);

    position: fixed;
    bottom: 48px;
    right: 48px;

    padding-left: 2px; /* tweak */

    :hover,
    :focus {
        color: var(--error-red-100);
    }
`

const LogOutButton = () => {
    const onLogOutButtonClick = () => {
        firebase.auth().signOut()
    }

    return (
        <StyledLogOutButton onClick={onLogOutButtonClick} type="button">
            Log Out
        </StyledLogOutButton>
    )
}

export default LogOutButton
