import React, { useState } from 'react'
import { DateRangePicker } from 'react-dates'
import { useSelector, useDispatch } from 'react-redux'
import { filtersSelector } from '../../store/selectors'
import {
    setSearchTerm,
    setSortByToDate,
    setSortByToAmount,
    setStartDate,
    setEndDate,
} from '../../store/slices'
import moment from 'moment'

const ExpenseListFilters = () => {
    const dispatch = useDispatch()

    /*----------
        form input handling
    ----------*/

    let { searchTerm, sortBy, startDate, endDate } = useSelector(
        filtersSelector
    )

    // this won't work
    // const initialStartDate = startDate
    // const initialEndDate = endDate

    const [initialStartDate] = useState(startDate)
    const [initialEndDate] = useState(endDate)

    const onSearchTermChange = (evt) =>
        dispatch(setSearchTerm(evt.target.value))
    const onSortByChange = (evt) => {
        if (evt.target.value === 'date') {
            dispatch(setSortByToDate())
        }
        if (evt.target.value === 'amount') {
            dispatch(setSortByToAmount())
        }
    }
    // { startDate: Moment, endDate: Moment }
    const onDatesChange = ({ startDate, endDate }) => {
        dispatch(setStartDate(startDate.toISOString()))
        dispatch(setEndDate(endDate.toISOString()))
    }
    const [focusedInput, setFocusedInput] = useState(null)
    // type FocusedInputs = 'startDate' | 'endDate' | null
    // focusedInput: FocusedInputs
    const onFocusChange = (focusedInput) => {
        setFocusedInput(focusedInput)
    }
    const onResetDatesBtnClick = () => {
        dispatch(setStartDate(initialStartDate))
        dispatch(setEndDate(initialEndDate))
    }

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={onSearchTermChange}
            />
            <select value={sortBy} onChange={onSortByChange}>
                <option value="date">Date</option>
                <option value="amount">Amount</option>
            </select>
            <DateRangePicker
                startDate={moment(startDate)}
                startDateId={'filterStartDateId'}
                endDate={moment(endDate)}
                endDateId={'filterEndDateId'}
                onDatesChange={onDatesChange}
                focusedInput={focusedInput}
                onFocusChange={onFocusChange}
                numberOfMonths={1}
                isOutsideRange={() => false}
            />
            <button onClick={onResetDatesBtnClick}>Reset Dates</button>
        </div>
    )
}

export default ExpenseListFilters
