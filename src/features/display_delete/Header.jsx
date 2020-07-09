import React from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase/app'

const Header = () => {
    const onLogOutButtonClick = () => {
        firebase.auth().signOut()
    }

    return (
        <header>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/add">Add Expense</Link>
            <button onClick={onLogOutButtonClick}>Log Out</button>
        </header>
    )
}

export default Header
