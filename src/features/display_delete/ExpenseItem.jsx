import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import PropTypes from 'prop-types'

const ExpenseItem = ({ expense }) => {
    const { id, description, amount, note, createdAt } = expense

    return (
        <div>
            <Link to={`/edit/${id}`}>{description}</Link>
            <p>{amount}</p>
            <p>{note}</p>
            <p>{moment(createdAt).format('YYYY-MM-DD')}</p>
        </div>
    )
}

ExpenseItem.propTypes = {
    expense: PropTypes.shape({
        id: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        amount: PropTypes.string.isRequired,
        note: PropTypes.string,
        createdAt: PropTypes.string.isRequired,
    }),
}

export default ExpenseItem
