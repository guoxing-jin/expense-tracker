import React, { useState } from 'react'
import { SingleDatePicker } from 'react-dates'
import { useDispatch } from 'react-redux'
import { startAddExpense } from '../../store/slices'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import PropTypes from 'prop-types'

const AddExpenseForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    /*----------
        form input handling
    ----------*/

    const [description, setDescription] = useState('')
    const onDescriptionChange = (event) => setDescription(event.target.value)

    const [amount, setAmount] = useState('')
    const onAmountChange = (event) => setAmount(event.target.value)

    const [note, setNote] = useState('')
    const onNoteChange = (event) => setNote(event.target.value)

    const [createdAt, setCreatedAt] = useState(moment().toISOString())
    const onDateChange = (date) => setCreatedAt(date.toISOString()) // date: Moment

    const [focused, setFocused] = useState(false)
    const onFocusChange = ({ focused }) => setFocused(focused) // { focused: boolean }

    /*----------
        form submit handling & error handling
    ----------*/

    const [descriptionErrMsg, setDescriptionErrMsg] = useState('')
    const [amountErrMsg, setAmountErrMsg] = useState('')

    const [addBtnText, setAddBtnText] = useState('Add')
    const [disabled, setDisabled] = useState(false)

    const onFormSubmit = (evt) => {
        evt.preventDefault()

        if (description === '') {
            setDescriptionErrMsg(`Description can't be empty`)
            return
        }
        if (amount === '') {
            setAmountErrMsg(`Amount can't be empty`)
            return
        }
        if (!amount.match(/^\d+(\.\d{0,2})?$/)) {
            setAmountErrMsg('Invalid format')
            return
        }

        setAddBtnText('Adding expense...')
        setDisabled(false)

        dispatch(
            startAddExpense({ description, amount, note, createdAt })
        ).then(() => {
            history.push('/dashboard')
        })
    }

    return (
        <form onSubmit={onFormSubmit}>
            <div>
                <span>{descriptionErrMsg}</span>
                <input
                    type="text"
                    placeholder="Expense description..."
                    value={description}
                    onChange={onDescriptionChange}
                    autoFocus
                    disabled={disabled}
                />
            </div>
            <div>
                <span>{amountErrMsg}</span>
                <input
                    type="number"
                    placeholder="Expense amount..."
                    value={amount}
                    onChange={onAmountChange}
                    disabled={disabled}
                />
            </div>
            <textarea
                placeholder="Note for this expense..."
                value={note}
                onChange={onNoteChange}
                disabled={disabled}
            />
            <SingleDatePicker
                date={moment(createdAt)}
                onDateChange={onDateChange}
                focused={focused}
                onFocusChange={onFocusChange}
                numberOfMonths={1}
                isOutsideRange={() => false}
                disabled={disabled}
            />
            <button>{addBtnText}</button>
        </form>
    )
}

AddExpenseForm.propTypes = {
    targetExpense: PropTypes.shape({
        id: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        amount: PropTypes.string.isRequired,
        note: PropTypes.string,
        createdAt: PropTypes.string.isRequired,
    }),
}

export default AddExpenseForm
