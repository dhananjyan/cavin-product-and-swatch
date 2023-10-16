import { configureStore } from '@reduxjs/toolkit'
import products from './features/products'
import expriment from './features/expriment'
import updateExpriment from './features/updateExpriment'

export default configureStore({
    reducer: {
        products,
        expriment,
        updateExpriment
    }
})