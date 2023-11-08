import { configureStore } from '@reduxjs/toolkit'
import products from './features/products'
import experiment from './features/expriment'
import updateExperiment from './features/updateExpriment'
import { reducer as toastrReducer } from 'react-redux-toastr'


export default configureStore({
    reducer: {
        products,
        experiment,
        updateExperiment,
        toastr: toastrReducer
    }
})