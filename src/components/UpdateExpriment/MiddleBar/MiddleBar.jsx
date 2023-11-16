import React from 'react'
import s from "./MiddleBar.module.scss";
import cx from "classnames";
import { useDispatch, useSelector } from 'react-redux';
import { updateWashCount } from '../../../store/features/updateExpriment';

const MiddleBar = () => {
    const currentExperiment = useSelector(state => state?.updateExperiment?.currentExperiment);
    const currentSwatchStatus = useSelector(state => state?.updateExperiment?.currentSwatchStatus)
    const washCount = useSelector(state => state?.updateExperiment?.washCount)
    const showFinal = useSelector(state => state?.updateExperiment?.showFinal)
    const dispatch = useDispatch();
    const handleInputChange = (count) => {
        dispatch(updateWashCount(count))
    }
    return (
        <div className={s.middlebar}>
            <div className={cx(s.label, "ms-4")}>Product Name</div>
            <div className={s.value}>{currentExperiment?.product_name}</div>
            {/* <div className={cx(s.label, "ms-4")}>Swatch Name</div>
            <div className={s.value}>{activeSwatch?.swatch_name}</div> */}
            {((currentSwatchStatus?.steps === 3) && !showFinal) ? <>
                <div className={cx(s.label, "ms-4")}>Wash Number</div>
                <input className={s.input} value={washCount} type="number" onChange={e => handleInputChange(e.target.value)} />
            </> : ""}
        </div>
    )
}

export default MiddleBar
