import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import ContentLoader from 'react-content-loader'
import { logIn, startSetExpenses, logOut, emptyExpenses } from './store/slices'
import firebase from 'firebase/app'
import store from './store'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

const Loader = () => (
    <ContentLoader>
        <rect x="0" y="0" rx="5" ry="5" width="150" height="150" />
    </ContentLoader>
)

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('logged in')
        store.dispatch(logIn(user.uid))

        ReactDOM.render(<Loader />, document.getElementById('root'))

        store.dispatch(startSetExpenses()).then(() => {
            ReactDOM.render(<App />, document.getElementById('root'))
        })
    } else {
        console.log('logged out')
        store.dispatch(logOut())

        // clear out Redux expenses state populated by the last logged in user's data
        store.dispatch(emptyExpenses())

        ReactDOM.render(<App />, document.getElementById('root'))
    }
})
