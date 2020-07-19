import React from 'react'
import HomePage from '../features/routing/HomePage'
import NoMatchPage from '../features/routing/NoMatchPage'
import PublicRoute from '../features/routing/PublicRoute'
import PrivateRoute from '../features/routing/PrivateRoute'
import LogInPage from '../features/auth/LogInPage'
import SignUpPage from '../features/auth/SignUpPage'
import ExpenseDashboardPage from '../features/display_delete/ExpenseDashboardPage'
import AddExpensePage from '../features/add_edit/AddExpensePage'
import EditExpensePage from '../features/add_edit/EditExpensePage'
import { Provider } from 'react-redux'
import store from '../store'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <PublicRoute path="/" exact component={HomePage} />
                    <PublicRoute path="/login" component={LogInPage} />
                    <PublicRoute path="/signup" component={SignUpPage} />
                    <PrivateRoute
                        path="/dashboard"
                        component={ExpenseDashboardPage}
                    />
                    <PrivateRoute path="/add" component={AddExpensePage} />
                    <PrivateRoute
                        path="/edit/:expenseId"
                        component={EditExpensePage}
                    />
                    <Route component={NoMatchPage} />
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default App
