import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { startRemoveExpense } from '../../store/slices'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import StyledButton from '../../components/StyledButton'
import styled from 'styled-components'

const StyledDelete = styled(StyledButton)`
    padding: 4px 8px;
    width: 72px; /* make sure adding ellipsis won't affect the layout */
    background-color: transparent;
    border: var(--border-transparent);
    box-shadow: none;

    text-align: left; /* make sure adding ellipsis won't affect the layout */
    color: var(--error-red-60);

    margin-right: 40px;

    margin-top: 2px; /* tweak */

    :hover,
    :focus {
        background-color: transparent;
        border: var(--border-transparent);

        color: var(--error-red-100);
    }
`

const DeleteExpenseButton = ({ expense }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [deleteButtonText, setDeleteButtonText] = useState('Delete')

    const onDeleteButtonClick = () => {
        setDeleteButtonText('Deleting...')

        dispatch(startRemoveExpense(expense.id)).then(() => {
            history.push('/dashboard')
        })
    }

    return (
        <StyledDelete onClick={onDeleteButtonClick}>
            {deleteButtonText}
        </StyledDelete>
    )
}

DeleteExpenseButton.propTypes = {
    expense: PropTypes.shape({
        id: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        amount: PropTypes.string.isRequired,
        note: PropTypes.string,
        createdAt: PropTypes.string.isRequired,
    }),
}

export default DeleteExpenseButton
