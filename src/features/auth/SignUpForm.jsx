import React, { useState } from 'react'
import firebase from 'firebase/app'

const SignUpForm = () => {
    const [email, setEmail] = useState('')
    const onEmailChange = (evt) => setEmail(evt.target.value)
    const [password, setPassword] = useState('')
    const onPasswordChange = (evt) => setPassword(evt.target.value)

    /*----------
        sign up authentication handling
    ----------*/

    const [signUpBtnText, setSignUpBtnText] = useState('Sign Up')
    const [disabled, setDisabled] = useState(false)

    const onFormSubmit = (email, password) => (evt) => {
        evt.preventDefault()

        setSignUpBtnText('Creating your account...')
        setDisabled(true)

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((error) => console.log(error.code, error.message))
    }

    return (
        <form onSubmit={onFormSubmit(email, password)}>
            <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={onEmailChange}
                autoFocus
                disabled={disabled}
            />
            <input
                type="password"
                placeholder="Create your password..."
                value={password}
                onChange={onPasswordChange}
                disabled={disabled}
            />
            <button>{signUpBtnText}</button>
        </form>
    )
}

export default SignUpForm
