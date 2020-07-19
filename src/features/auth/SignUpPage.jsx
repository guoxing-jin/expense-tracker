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

const StyledSignUpForm = styled.form`
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

const StyledSignUpButton = styled(StyledButton)`
    width: 112px;
    height: 40px;

    padding-top: 2px; /* tweak */
    padding-left: 2px; /* tweak */
`

const SignUpPage = () => {
    const [email, setEmail] = useState('')
    const onEmailChange = (event) => setEmail(event.target.value)
    const [password, setPassword] = useState('')
    const onPasswordChange = (event) => setPassword(event.target.value)

    /*----------
        sign up authentication handling
    ----------*/

    const [signUpButtonText, setSignUpButtonText] = useState('Sign Up')
    const [disabled, setDisabled] = useState(false)
    const [signInErrorMessage, setSignInErrorMessage] = useState('')

    const onFormSubmit = (email, password) => (event) => {
        event.preventDefault()

        setSignUpButtonText('Creating...')
        setDisabled(true)

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                setSignUpButtonText('Sign Up')
                setDisabled(false)
                setSignInErrorMessage(error.message)
            })
    }

    return (
        <StyledPageWrapper>
            <Logo title="Sign Up" />
            {signInErrorMessage ? (
                <StyledErrorMessage>{signInErrorMessage}</StyledErrorMessage>
            ) : null}
            <StyledSignUpForm onSubmit={onFormSubmit(email, password)}>
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
                    placeholder="Create your password..."
                    value={password}
                    onChange={onPasswordChange}
                    disabled={disabled}
                />
                <StyledButtonWrapper>
                    <BackButton />
                    <StyledSignUpButton type="submit">
                        {signUpButtonText}
                    </StyledSignUpButton>
                </StyledButtonWrapper>
            </StyledSignUpForm>
        </StyledPageWrapper>
    )
}

export default SignUpPage
