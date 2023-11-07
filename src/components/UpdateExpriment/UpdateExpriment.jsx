import React from 'react'
import AddSwatch from './AddSwatch/AddSwatch'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initializeExperimentPage } from '../../store/features/updateExpriment';

export default function UpdateExpriment() {
    let { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeExperimentPage(id))
    }, [])

    return (
        <AddSwatch />
    )
}
