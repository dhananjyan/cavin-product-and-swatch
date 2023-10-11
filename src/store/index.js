import { configureStore } from '@reduxjs/toolkit'
import products from './features/products'
import expriment from './features/expriment'

export default configureStore({
    reducer: {
        products,
        expriment
    }
})