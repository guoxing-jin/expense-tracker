import React from 'react'
import ExpenseItem from './ExpenseItem'
import DeleteExpenseBtn from './DeleteExpenseBtn'
import { useSelector } from 'react-redux'
import {
    filtersSelector,
    filteredExpensesSelector,
} from '../../store/selectors'
import moment from 'moment'

const ExpenseList = () => {
    const { startDate, endDate } = useSelector(filtersSelector)
    const filteredExpenses = useSelector(filteredExpensesSelector)

    const totalAmount = filteredExpenses.reduce((total, { amount }) => {
        return total + Number.parseFloat(amount)
    }, 0)

    if (filteredExpenses.length === 0) {
        return <p>No expenses</p>
    }

    return (
        <div>
            <div>
                Your total spend from {moment(startDate).format('MMM D')} to{' '}
                {moment(endDate).format('MMM D')} is {totalAmount}.
            </div>

            {filteredExpenses.map((expense) => (
                <div key={expense.id}>
                    <ExpenseItem expense={expense} />
                    <DeleteExpenseBtn expense={expense} />
                </div>
            ))}
        </div>
    )
}

export default ExpenseList
