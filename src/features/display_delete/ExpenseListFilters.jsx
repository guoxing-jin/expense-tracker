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
import StyledInput from '../../components/StyledInput'
import StyledButton from '../../components/StyledButton'
import styled from 'styled-components'

const StyledExpenseListFilters = styled.div`
    display: flex;

    margin-bottom: 48px;
`

const StyledSearchTerm = styled(StyledInput)`
    width: 160px;
    height: 40px;

    padding-left: 8px;

    margin-right: 8px;
`

const StyledSortBy = styled.select`
    width: 96px;
    height: 40px;
    border: var(--border);
    border-radius: 3px;
    box-shadow: var(--shadow);

    padding-left: 8px;
    font: var(--font-body);
    color: var(--cod-gray-100);
    background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMSAyMS44ODNsLTYuMjM1LTcuNTI3LS43NjUuNjQ0IDcuNTIxIDkgNy40NzktOS0uNzY0LS42NDUtNi4yMzYgNy41Mjl2LTIxLjg4NGgtMXYyMS44ODN6Ii8+PC9zdmc+')
        calc(100% - 6px) 50% / 12px no-repeat;
    appearance: none; /* remove default select drop-down arrow */

    margin-right: 8px;

    :focus {
        border: var(--border-focused);
        outline: none;
    }
`

const StyledDateRangePickerWrapper = styled.div`
    & .DateRangePickerInput {
        width: 256px;
        height: 40px;
        border: var(--border);
        border-radius: 3px;
        box-shadow: var(--shadow);

        display: flex;
        align-items: center; /* center arrow to the middle */

        margin-right: 16px;

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
    }
    & .DateInput_input__focused {
        text-decoration-line: underline;
    }
    & .DayPicker {
        font: var(--font-body);
    }
    & .CalendarDay__default {
        border: none;

        color: var(--cod-gray-100);
    }
    & .CalendarDay__selected_start,
    .CalendarDay__selected_end {
        outline: none;

        background-color: var(--lily-white-100);
    }
    & .CalendarDay__selected_span {
        background-color: var(--lily-white-40);
    }
    & .DayPickerKeyboardShortcuts_buttonReset {
        display: none;
    }
`

const StyledResetDates = styled(StyledButton)`
    width: 104px;
    height: 40px;
    background-color: transparent;
    border: var(--border-transparent);
    box-shadow: none;

    color: var(--cod-gray-60);

    padding-left: 2px; /* tweak */

    :hover,
    :focus {
        color: var(--cod-gray-100);
    }
`

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

    const onSearchTermChange = (event) =>
        dispatch(setSearchTerm(event.target.value))
    const onSortByChange = (event) => {
        if (event.target.value === 'date') {
            dispatch(setSortByToDate())
        }
        if (event.target.value === 'amount') {
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
    const onResetDatesButtonClick = () => {
        dispatch(setStartDate(initialStartDate))
        dispatch(setEndDate(initialEndDate))
    }

    return (
        <StyledExpenseListFilters>
            <StyledSearchTerm
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={onSearchTermChange}
            />
            <StyledSortBy value={sortBy} onChange={onSortByChange}>
                <option value="date">Date</option>
                <option value="amount">Amount</option>
            </StyledSortBy>
            <StyledDateRangePickerWrapper>
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
                    readOnly
                />
            </StyledDateRangePickerWrapper>
            <StyledResetDates onClick={onResetDatesButtonClick} type="button">
                Reset Dates
            </StyledResetDates>
        </StyledExpenseListFilters>
    )
}

export default ExpenseListFilters
