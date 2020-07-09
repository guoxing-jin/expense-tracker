import React from 'react'
import { useSelector } from 'react-redux'
import { authSelector } from '../../store/selectors'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

// <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
const PublicRoute = ({ component: Component, ...restProps }) => {
    const auth = useSelector(authSelector)
    const isAuthenticated = !!auth.uid

    return (
        <Route
            {...restProps}
            // props is passed by Route automatically (e.g. history and location etc.)
            component={(props) => {
                return isAuthenticated ? (
                    <div>
                        <Redirect to="/dashboard" />
                    </div>
                ) : (
                    <Component {...props} />
                )
            }}
        />
    )
}

PublicRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
}

export default PublicRoute
