import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer, expensesReducer, filtersReducer } from './slices'

const rootReducer = combineReducers({
    auth: authReducer,
    expenses: expensesReducer,
    filters: filtersReducer,
})

const store = configureStore({ reducer: rootReducer })

export default store
