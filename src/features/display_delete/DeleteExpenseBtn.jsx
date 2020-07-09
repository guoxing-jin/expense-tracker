import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { startRemoveExpense } from '../../store/slices'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

const DeleteExpenseBtn = ({ expense }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [deleteBtnText, setDeleteBtnText] = useState('Delete')

    const onDeleteBtnClick = () => {
        setDeleteBtnText('Deleting expense...')

        dispatch(startRemoveExpense(expense.id)).then(() => {
            history.push('/dashboard')
        })
    }

    return <button onClick={onDeleteBtnClick}>{deleteBtnText}</button>
}

DeleteExpenseBtn.propTypes = {
    expense: PropTypes.shape({
        id: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        amount: PropTypes.string.isRequired,
        note: PropTypes.string,
        createdAt: PropTypes.string.isRequired,
    }),
}

export default DeleteExpenseBtn
