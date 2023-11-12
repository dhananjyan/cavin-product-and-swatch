import React from 'react'
import s from "./MiddleBar.module.scss";
import cx from "classnames";
import { useDispatch, useSelector } from 'react-redux';
import { updateWashCount } from '../../../store/features/updateExpriment';

const MiddleBar = () => {
    const activeSwatch = useSelector(state => state?.updateExperiment?.activeSwatch)
    const currentSwatchStatus = useSelector(state => state?.updateExperiment?.currentSwatchStatus)
    const washCount = useSelector(state => state?.updateExperiment?.washCount)
    console.log(activeSwatch, "activeSwatch");
    const dispatch = useDispatch();
    const handleInputChange = (count) => {
        console.log('ddd', count);
        dispatch(updateWashCount(count))
    }
    return (
        <div className={s.middlebar}>
            <div className={cx(s.label, "ms-4")}>Product Name</div>
            <div className={s.value}>Meera Herbal Shampoo 50ml</div>
            <div className={cx(s.label, "ms-4")}>{activeSwatch?.swatch_name}</div>
            <div className={s.value}>MHS - Swatch 1</div>
            {currentSwatchStatus?.steps === 3 ? <>
                <div className={cx(s.label, "ms-4")}>Wash Number</div>
                <input className={s.input} value={washCount} type="number" onChange={e => handleInputChange(e.target.value)} />
            </> : ""}
        </div>
    )
}

export default MiddleBar
