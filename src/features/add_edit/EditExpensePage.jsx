import React, { useState } from 'react'
import Logo from '../../components/Logo'
import { SingleDatePicker } from 'react-dates'
import BackButton from '../routing/BackButton'
import { useDispatch, useSelector } from 'react-redux'
import { startEditExpense } from '../../store/slices'
import { expensesSelector } from '../../store/selectors'
import { useHistory, useParams } from 'react-router-dom'
import moment from 'moment'
import PropTypes from 'prop-types'
import StyledPageWrapper from '../../components/StyledPageWrapper'
import StyledInput from '../../components/StyledInput'
import StyledButton from '../../components/StyledButton'
import styled from 'styled-components'

const StyledEditExpenseForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    /* remove default browser input number spinner */
    & input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    & input[type='number'] {
        -moz-appearance: textfield;
    }
`

const StyledErrorMessage = styled.p`
    text-align: center;

    font: var(--font-body);
    color: var(--error-red-100);
    white-space: pre-line;

    margin-bottom: 16px;
`

const StyledRequiredInputWrapper = styled.div`
    display: flex;

    margin-bottom: 16px;
`

const StyledDescription = styled(StyledInput)`
    width: 160px;
    height: 40px;

    padding-left: 8px;

    margin-right: 8px;
`

const StyledAmount = styled(StyledInput)`
    width: 100px;
    height: 40px;

    padding-left: 8px;

    margin-right: 8px;
`

const StyledSingleDatePickerWrapper = styled.div`
    & .SingleDatePickerInput {
        width: 128px;
        height: 40px;
        border: var(--border);
        border-radius: 3px;
        box-shadow: var(--shadow);

        display: flex;
        justify-content: center;
        align-items: center;

        overflow: hidden; /* hide overflowing default styles */

        :focus-within {
            border: var(--border-focused);
        }
    }
    & .DateInput_input {
        text-align: center;
        font: var(--font-body);
        color: var(--cod-gray-100);

        padding: 0; /* remove default paddings */
        border-bottom: none; /* remove default border-bottom */
        padding-top: 2px; /* tweak */
        padding-left: 2px; /* tweak */
    }
    & .SingleDatePicker_picker {
        /* align date picker with textarea */
        /* use !important rule to override the inline styles */
        top: 56.25px !important;
    }
    & .DayPicker {
        font: var(--font-body);
    }
    & .CalendarDay__today {
        text-decoration-line: underline;
    }
    & .CalendarDay__default {
        border: var(--border-transparent);
    }
    & .CalendarDay__selected {
        background-color: var(--lily-white-100);
        outline: none;

        color: var(--cod-gray-100);
    }
    & .DayPickerKeyboardShortcuts_buttonReset {
        display: none;
    }
`

const StyledNoteTextarea = styled.textarea`
    width: 404px;
    height: 80px;
    padding: 8px;
    border: var(--border);
    border-radius: 3px;
    box-shadow: var(--shadow);

    font: var(--font-body);
    color: var(--cod-gray-100);

    margin-bottom: 24px;

    :focus {
        border: var(--border-focused);
        outline: none;
    }
`

const StyledButtonWrapper = styled.div`
    width: 200px;

    display: flex;
    justify-content: space-between;
`

const StyledEdit = styled(StyledButton)`
    width: 96px;
    height: 40px;

    padding-top: 1px; /* tweak */
    padding-left: 1px; /* tweak */
`

const EditExpensePage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const expenses = useSelector(expensesSelector)
    const { expenseId } = useParams()
    const targetExpense = expenses.find((expense) => expense.id === expenseId)

    const [description, setDescription] = useState(targetExpense.description)
    const onDescriptionChange = (event) => setDescription(event.target.value)
    const [amount, setAmount] = useState(targetExpense.amount)
    const onAmountChange = (event) => setAmount(event.target.value)
    const [note, setNote] = useState(targetExpense.note)
    const onNoteChange = (event) => setNote(event.target.value)
    const [createdAt, setCreatedAt] = useState(targetExpense.createdAt)
    const onDateChange = (date) => setCreatedAt(date.toISOString()) // date: Moment
    const [focused, setFocused] = useState(false)
    const onFocusChange = ({ focused }) => setFocused(focused) // { focused: boolean }

    /*----------
        form submit handling & error handling
    ----------*/

    const [editButtonText, setEditButtonText] = useState('Edit')
    const [disabled, setDisabled] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onFormSubmit = (evt) => {
        evt.preventDefault()

        if (description === '' || amount === '') {
            setErrorMessage(
                `The content for description or amount can't be empty.`
            )
            return
        } else if (!amount.match(/^\d+(\.\d{0,2})?$/)) {
            setErrorMessage('This is an invalid format for amount number.')
            return
        } else {
            setErrorMessage('')
        }

        setEditButtonText('Editing...')
        setDisabled(true)

        dispatch(
            startEditExpense({
                expenseId: targetExpense.id,
                updates: { description, amount, note, createdAt },
            })
        ).then(() => {
            history.push('/dashboard')
        })
    }

    return (
        <StyledPageWrapper>
            <Logo title="Edit Expense" />
            <StyledEditExpenseForm onSubmit={onFormSubmit}>
                <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
                <StyledRequiredInputWrapper>
                    <StyledDescription
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={onDescriptionChange}
                        disabled={disabled}
                        autoFocus
                    />
                    <StyledAmount
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={onAmountChange}
                        disabled={disabled}
                    />
                    <StyledSingleDatePickerWrapper>
                        <SingleDatePicker
                            date={moment(createdAt)}
                            onDateChange={onDateChange}
                            focused={focused}
                            onFocusChange={onFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                            disabled={disabled}
                            readOnly
                        />
                    </StyledSingleDatePickerWrapper>
                </StyledRequiredInputWrapper>
                <StyledNoteTextarea
                    placeholder="Note for this expense"
                    value={note}
                    onChange={onNoteChange}
                    disabled={disabled}
                />
                <StyledButtonWrapper>
                    <BackButton />
                    <StyledEdit>{editButtonText}</StyledEdit>
                </StyledButtonWrapper>
            </StyledEditExpenseForm>
        </StyledPageWrapper>
    )
}

EditExpensePage.propTypes = {
    targetExpense: PropTypes.shape({
        id: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        amount: PropTypes.string.isRequired,
        note: PropTypes.string,
        createdAt: PropTypes.string.isRequired,
    }),
}

export default EditExpensePage
