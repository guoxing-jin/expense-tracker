import { createSlice } from '@reduxjs/toolkit'
import database from '../firebase'
import moment from 'moment'

/*----------
    asynchronous action creators
    startSetExpenses / startAddExpense / startRemoveExpense / startEditExpense
----------*/

export const startSetExpenses = () => (dispatch, getState) => {
    const uid = getState().auth.uid

    return database
        .ref(`users/${uid}/expenses`)
        .once('value')
        .then((snapshot) => {
            const expenses = []

            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val(),
                })
            })

            dispatch(setExpenses(expenses))
        })
}

// 1. receive input values from the UI, then assign them to a temporary expense object
// 2. push the temporary expense object to Firebase which automatically generates an unique reference key
// 3. after the promise is resolved, a reference object is received
// 4. dispatch the new expense object to Redux expenses state
export const startAddExpense = (expense) => (dispatch, getState) => {
    const uid = getState().auth.uid

    return database
        .ref(`users/${uid}/expenses`)
        .push(expense)
        .then((ref) => {
            dispatch(addExpense({ id: ref.key, ...expense }))
        })
}

export const startRemoveExpense = (expenseId) => (dispatch, getState) => {
    const uid = getState().auth.uid

    return database
        .ref(`users/${uid}/expenses/${expenseId}`)
        .remove()
        .then(() => {
            dispatch(removeExpense(expenseId))
        })
}

export const startEditExpense = ({ expenseId, updates }) => (
    dispatch,
    getState
) => {
    const uid = getState().auth.uid

    return database
        .ref(`users/${uid}/expenses/${expenseId}`)
        .update(updates)
        .then(() => {
            dispatch(editExpense({ expenseId, updates }))
        })
}

/*----------
    slices
    authSlice / expensesSlice / filtersSlice
----------*/

const authSlice = createSlice({
    name: 'auth',
    initialState: { uid: null },
    reducers: {
        logIn: (state, action) => {
            state.uid = action.payload // action.payload: string
        },
        logOut: (state) => {
            state.uid = null
        },
    },
})

const expensesSlice = createSlice({
    name: 'expenses',
    initialState: [],
    reducers: {
        setExpenses: (state, action) => {
            // action.payload: Array<FinalExpense>
            for (const expense of action.payload) {
                state.push(expense)
            }
        },
        emptyExpenses: (state) => {
            state.splice(0)
        },
        addExpense: (state, action) => {
            state.push(action.payload) // action.payload: FinalExpense
        },
        removeExpense: (state, action) => {
            const targetExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload // action.payload: string
            )

            if (targetExpenseIndex === -1) {
                return state
            } else {
                state.splice(targetExpenseIndex, 1)
            }
        },
        editExpense: (state, action) => {
            const {
                expenseId,
                updates: { description, amount, note, createdAt },
            } = action.payload
            const targetExpenseId = state.findIndex(
                (expense) => expense.id === expenseId
            )

            if (targetExpenseId === -1) {
                return state
            }

            state[targetExpenseId].description = description
            state[targetExpenseId].amount = amount
            state[targetExpenseId].note = note
            state[targetExpenseId].createdAt = createdAt
        },
    },
})

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        searchTerm: '',
        sortBy: 'date',
        startDate: moment().startOf('month').toISOString(),
        endDate: moment().endOf('month').toISOString(),
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload // action.payload: string
        },
        setSortByToDate: (state) => {
            state.sortBy = 'date'
        },
        setSortByToAmount: (state) => {
            state.sortBy = 'amount'
        },
        setStartDate: (state, action) => {
            state.startDate = action.payload // action.payload: string
        },
        setEndDate: (state, action) => {
            state.endDate = action.payload // action.payload: string
        },
    },
})

/*----------
    reducer & action creator exports
----------*/

export const authReducer = authSlice.reducer
export const { logIn, logOut } = authSlice.actions

export const expensesReducer = expensesSlice.reducer
export const {
    setExpenses,
    emptyExpenses,
    addExpense,
    removeExpense,
    editExpense,
} = expensesSlice.actions

export const filtersReducer = filtersSlice.reducer
export const {
    setSearchTerm,
    setSortByToDate,
    setSortByToAmount,
    setStartDate,
    setEndDate,
} = filtersSlice.actions
