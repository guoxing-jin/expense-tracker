import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { logIn, startSetExpenses, logOut, emptyExpenses } from './store/slices'
import firebase from 'firebase/app'
import store from './store'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components'

const Loader = (props) => (
    <ContentLoader
        speed={2}
        width={360}
        height={364}
        viewBox="0 0 360 364"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <path d="M 80.5 140.5 h 279 v 31 h -279 z M 0.5 140.5 h 71 v 31 H 0.5 z M 80.5 236.5 h 279 v 31 h -279 z M 80.5 332.5 h 279 v 31 h -279 z M 0.5 236.5 h 71 v 31 H 0.5 z M 0.5 332.5 h 71 v 31 H 0.5 z M 80.5 188.5 h 279 v 31 h -279 z M 0.5 188.5 h 71 v 31 H 0.5 z M 80.5 284.5 h 279 v 31 h -279 z M 0.5 284.5 h 71 v 31 H 0.5 z M 122.5 0.5 h 115 v 115 h -115 z" />
    </ContentLoader>
)

const StyledContentLoader = styled(Loader)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -75%);
`

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('logged in')
        store.dispatch(logIn(user.uid))

        ReactDOM.render(
            <StyledContentLoader />,
            document.getElementById('root')
        )

        store.dispatch(startSetExpenses()).then(() => {
            ReactDOM.render(<App />, document.getElementById('root'))
        })
    } else {
        console.log('logged out')
        store.dispatch(logOut())

        // clear out Redux expenses state populated by the last logged-in user
        store.dispatch(emptyExpenses())

        ReactDOM.render(<App />, document.getElementById('root'))
    }
})
