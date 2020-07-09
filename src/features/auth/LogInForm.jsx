import React, { useState } from 'react'
import firebase from 'firebase/app'

const LogInForm = () => {
    const [email, setEmail] = useState('')
    const onEmailChange = (evt) => setEmail(evt.target.value)
    const [password, setPassword] = useState('')
    const onPasswordChange = (evt) => setPassword(evt.target.value)

    /*----------
        log in authentication handling
    ----------*/

    const [logInBtnText, setLogInBtnText] = useState('Log In')
    const [disabled, setDisabled] = useState(false)

    const onFormSubmit = (email, password) => (evt) => {
        evt.preventDefault()

        setLogInBtnText('Authenticating your account...')
        setDisabled(true)

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
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
                placeholder="Enter your password..."
                value={password}
                onChange={onPasswordChange}
                disabled={disabled}
            />
            <button>{logInBtnText}</button>
        </form>
    )
}

export default LogInForm
