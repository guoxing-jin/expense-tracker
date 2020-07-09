import React from 'react'
import HomePage from './HomePage'
import NoMatchPage from './NoMatchPage'
import PublicRoute from '../features/routing/PublicRoute'
import PrivateRoute from '../features/routing/PrivateRoute'
import LogInForm from '../features/auth/LogInForm'
import SignUpForm from '../features/auth/SignUpForm'
import ExpenseDashboardPage from '../features/display_delete/ExpenseDashboardPage'
import AddExpenseForm from '../features/add_edit/AddExpenseForm'
import EditExpenseForm from '../features/add_edit/EditExpenseForm'
import { Provider } from 'react-redux'
import store from '../store'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <PublicRoute path="/" exact component={HomePage} />
                    <PublicRoute path="/login" component={LogInForm} />
                    <PublicRoute path="/signup" component={SignUpForm} />
                    <PrivateRoute
                        path="/dashboard"
                        component={ExpenseDashboardPage}
                    />
                    <PrivateRoute path="/add" component={AddExpenseForm} />
                    <PrivateRoute
                        path="/edit/:expenseId"
                        component={EditExpenseForm}
                    />
                    <Route component={NoMatchPage} />
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default App
