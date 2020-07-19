import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledExpenseItem = styled(Link)`
    height: 48px; /* expend hover area */

    padding-left: 24px; /* expend hover area */
    display: flex;
    align-items: center;

    font: var(--font-h4);
    text-decoration-line: none;
    color: var(--cod-gray-100);

    :hover {
        & :first-child {
            text-decoration-line: underline;
            color: var(--main-blue-100);
        }
    }
`

const StyledDescription = styled.p`
    width: 160px;

    text-overflow: ellipsis;
    white-space: nowrap; /* required for text-overflow to work */
    overflow: hidden; /* required for text-overflow to work */

    margin-right: 16px;
`

const StyledAmount = styled.p`
    width: 80px;

    text-overflow: ellipsis;
    white-space: nowrap; /* required for text-overflow to work */
    overflow: hidden; /* required for text-overflow to work */

    margin-right: 16px;
`

const StyledNote = styled.p`
    width: 312px;

    text-overflow: ellipsis;
    white-space: nowrap; /* required for text-overflow to work */
    overflow: hidden; /* required for text-overflow to work */

    margin-right: 16px;
`

const ExpenseItem = ({ expense }) => {
    const { id, description, amount, note, createdAt } = expense

    return (
        <StyledExpenseItem to={`/edit/${id}`}>
            <StyledDescription>{description}</StyledDescription>
            <StyledAmount>${amount}</StyledAmount>
            <StyledNote>{note}</StyledNote>
            <p>{moment(createdAt).format('YYYY-MM-DD')}</p>
        </StyledExpenseItem>
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
