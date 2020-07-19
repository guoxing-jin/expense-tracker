import React, { useState } from 'react'
import Logo from '../../components/Logo'
import BackButton from '../routing/BackButton'
import firebase from 'firebase/app'
import StyledPageWrapper from '../../components/StyledPageWrapper'
import StyledInput from '../../components/StyledInput'
import StyledButton from '../../components/StyledButton'
import styled from 'styled-components'

const StyledErrorMessage = styled.p`
    text-align: center;

    font: var(--font-body);
    color: var(--error-red-100);
    white-space: pre-line;

    margin-bottom: 16px;
`

const StyledLogInForm = styled.form`
    display: flex;
    flex-direction: column;
`

const StyledEmail = styled(StyledInput)`
    width: 280px;
    height: 40px;

    padding-left: 8px;

    margin-bottom: 8px;
`

const StyledPassword = styled(StyledInput)`
    width: 280px;
    height: 40px;

    padding-left: 8px;

    margin-bottom: 24px;
`

const StyledButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const StyledLogInButton = styled(StyledButton)`
    width: 112px;
    height: 40px;

    padding-top: 2px; /* tweak */
    padding-left: 2px; /* tweak */
`

const LogInPage = () => {
    const [email, setEmail] = useState('')
    const onEmailChange = (event) => setEmail(event.target.value)
    const [password, setPassword] = useState('')
    const onPasswordChange = (event) => setPassword(event.target.value)

    /*----------
        log in authentication handling
    ----------*/

    const [logInButtonText, setLogInButtonText] = useState('Log In')
    const [disabled, setDisabled] = useState(false)
    const [logInErrorMessage, setLogInErrorMessage] = useState('')

    const onFormSubmit = (email, password) => (event) => {
        event.preventDefault()

        setLogInButtonText('Verifying...')
        setDisabled(true)

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(() => {
                setLogInButtonText('Log In')
                setDisabled(false)
                setLogInErrorMessage(
                    'We could not verify the email or password you provided.\nPlease try a different combination.'
                )
            })
    }

    return (
        <StyledPageWrapper>
            <Logo title="Log In" />
            {logInErrorMessage ? (
                <StyledErrorMessage>{logInErrorMessage}</StyledErrorMessage>
            ) : null}
            <StyledLogInForm onSubmit={onFormSubmit(email, password)}>
                <StyledEmail
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={onEmailChange}
                    autoFocus
                    disabled={disabled}
                />
                <StyledPassword
                    type="password"
                    placeholder="Enter your password..."
                    value={password}
                    onChange={onPasswordChange}
                    disabled={disabled}
                />
                <StyledButtonWrapper>
                    <BackButton />
                    <StyledLogInButton type="submit">
                        {logInButtonText}
                    </StyledLogInButton>
                </StyledButtonWrapper>
            </StyledLogInForm>
        </StyledPageWrapper>
    )
}

export default LogInPage
