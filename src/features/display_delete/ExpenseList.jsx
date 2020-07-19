import React from 'react'
import ExpenseItem from './ExpenseItem'
import DeleteExpenseButton from './DeleteExpenseButton'
import { useSelector } from 'react-redux'
import {
    filtersSelector,
    filteredExpensesSelector,
} from '../../store/selectors'
import moment from 'moment'
import styled from 'styled-components'

const StyledExpenseList = styled.div`
    margin-bottom: 24px;
`

const StyledExpenseSummary = styled.p`
    text-align: center;
    font: var(--font-h2);
    color: var(--cod-gray-100);

    margin-bottom: 24px;

    span {
        text-decoration-line: underline;
    }
`

const StyledExpenseRow = styled.div`
    width: 864px;
    height: 48px;
    background-color: var(--lily-white-40);
    border-radius: 3px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 8px;

    :last-of-type {
        margin-bottom: 0;
    }
`

const ExpenseList = () => {
    const { startDate, endDate } = useSelector(filtersSelector)
    const filteredExpenses = useSelector(filteredExpensesSelector)

    const totalAmount = filteredExpenses.reduce((total, { amount }) => {
        return total + Number.parseFloat(amount)
    }, 0)

    return (
        <StyledExpenseList>
            {filteredExpenses.length === 0 ? (
                <StyledExpenseSummary>Empty dashboard</StyledExpenseSummary>
            ) : (
                <StyledExpenseSummary>
                    Total spending from{' '}
                    <span>{moment(startDate).format('MMMM D')}</span> to{' '}
                    <span>{moment(endDate).format('MMMM D')}</span> is{' '}
                    <span>${totalAmount}</span>
                </StyledExpenseSummary>
            )}
            {filteredExpenses.map((expense) => (
                <StyledExpenseRow key={expense.id}>
                    <ExpenseItem expense={expense} />
                    <DeleteExpenseButton expense={expense} />
                </StyledExpenseRow>
            ))}
        </StyledExpenseList>
    )
}

export default ExpenseList
