import React from 'react'
import Logo from '../../components/Logo'
import ExpenseListFilters from './ExpenseListFilters'
import ExpenseList from './ExpenseList'
import LogOutButton from '../routing/LogOutButton'
import StyledPageWrapper from '../../components/StyledPageWrapper'
import StyledLink from '../../components/StyledLink'
import styled from 'styled-components'

const StyledAddExpense = styled(StyledLink)`
    width: 128px;
    height: 40px;
    border: var(--border-transparent);
    box-shadow: none;

    text-decoration-line: none;

    padding-left: 2px; /* tweak */
`

const ExpenseDashboardPage = () => {
    return (
        <StyledPageWrapper>
            <Logo title="Expense Dashboard" />
            <ExpenseListFilters />
            <ExpenseList />
            <StyledAddExpense to="/add">New Expense</StyledAddExpense>
            <LogOutButton />
        </StyledPageWrapper>
    )
}

export default ExpenseDashboardPage
