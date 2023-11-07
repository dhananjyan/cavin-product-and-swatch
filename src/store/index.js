import { configureStore } from '@reduxjs/toolkit'
import products from './features/products'
import experiment from './features/expriment'
import updateExperiment from './features/updateExpriment'

export default configureStore({
    reducer: {
        products,
        experiment,
        updateExperiment
    }
})