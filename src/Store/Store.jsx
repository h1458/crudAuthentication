import { configureStore } from '@reduxjs/toolkit'
import { AuthSlice } from '../Redux/AuthSlice'
import { CrudSlice } from '../Redux/CrudSlice'

export const Store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        crud: CrudSlice.reducer
    }
})