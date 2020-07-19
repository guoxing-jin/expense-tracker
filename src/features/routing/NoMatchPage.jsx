import React from 'react'
import Logo from '../../components/Logo'
import BackButton from './BackButton'
import StyledPageWrapper from '../../components/StyledPageWrapper'

const NoMatchPage = () => {
    return (
        <StyledPageWrapper>
            <Logo title={`404 - This page doesn't exist.`} />
            <BackButton />
        </StyledPageWrapper>
    )
}

export default NoMatchPage
