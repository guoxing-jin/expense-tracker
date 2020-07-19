import React from 'react'
import Logo from '../../components/Logo'
import StyledPageWrapper from '../../components/StyledPageWrapper'
import StyledLink from '../../components/StyledLink'
import styled from 'styled-components'

const StyledLogIn = styled(StyledLink)`
    width: 208px;
    height: 40px;

    margin-bottom: 8px;
`

const StyledSignUp = styled(StyledLink)`
    width: 208px;
    height: 40px;
`

const HomePage = () => {
    return (
        <StyledPageWrapper>
            <Logo title="Expense Tracking App" />
            <StyledLogIn to="/login">Log In</StyledLogIn>
            <StyledSignUp to="/signup">Sign Up</StyledSignUp>
        </StyledPageWrapper>
    )
}

export default HomePage
