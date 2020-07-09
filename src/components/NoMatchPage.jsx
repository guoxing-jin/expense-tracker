import React from 'react'
import { Link } from 'react-router-dom'

const NoMatchPage = () => {
    return (
        <div>
            <div>404</div>
            <Link to="/">Home</Link>
        </div>
    )
}

export default NoMatchPage
