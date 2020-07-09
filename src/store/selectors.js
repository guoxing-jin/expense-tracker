import moment from 'moment'

export const authSelector = (state) => state.auth

export const expensesSelector = (state) => state.expenses

export const filtersSelector = (state) => state.filters

// filtered and sorted expenses state
export const filteredExpensesSelector = (state) => {
    const {
        expenses,
        filters: { searchTerm, sortBy, startDate, endDate },
    } = state

    return expenses
        .filter((expense) => {
            const searchTermMatches =
                expense.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                expense.note.toLowerCase().includes(searchTerm.toLowerCase())
            const startDateMatches = moment(startDate).isSameOrBefore(
                moment(expense.createdAt),
                'day'
            )
            const endDateMatches = moment(endDate).isSameOrAfter(
                moment(expense.createdAt),
                'day'
            )

            return searchTermMatches && startDateMatches && endDateMatches
        })
        .sort((a, b) => {
            if (sortBy === 'date') {
                // more recent expense comes first
                return moment(a.createdAt).valueOf() >
                    moment(b.createdAt).valueOf()
                    ? -1
                    : 1
            } else if (sortBy === 'amount') {
                // larger amount expense comes first
                return Number.parseFloat(a.amount) > Number.parseFloat(b.amount)
                    ? -1
                    : 1
            }
        })
}
