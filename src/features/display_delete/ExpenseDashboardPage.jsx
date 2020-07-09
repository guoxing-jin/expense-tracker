import React from 'react'
import Header from './Header'
import ExpenseListFilters from './ExpenseListFilters'
import ExpenseList from './ExpenseList'

const ExpenseDashboardPage = () => {
    return (
        <div>
            <Header />
            <ExpenseListFilters />
            <ExpenseList />
        </div>
    )
}

export default ExpenseDashboardPage
