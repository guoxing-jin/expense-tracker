import React from 'react'
import logo from '../../assets/logo.png'
import styled from 'styled-components'

const StyledLogo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-bottom: 24px;
`

const StyledLogoImage = styled.img`
    width: 136px;

    margin-bottom: 16px;
`

const StyledLogoHeading = styled.h1`
    font: var(--font-h1);
`

const Logo = ({ title }) => {
    return (
        <StyledLogo>
            <StyledLogoImage src={logo} alt="Logo" />
            <StyledLogoHeading>{title}</StyledLogoHeading>
        </StyledLogo>
    )
}

export default Logo
