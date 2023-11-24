import React from 'react'
import s from "./MiddleBar.module.scss";
import cx from "classnames";
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentSwatchStatus, updateWashCount } from '../../../store/features/updateExpriment';

const MiddleBar = () => {
    const currentExperiment = useSelector(state => state?.updateExperiment?.currentExperiment);
    const swatchList = useSelector(state => state?.updateExperiment?.swatchList)
    const washCount = useSelector(state => state?.updateExperiment?.washCount)
    const currentStep = useSelector(state => state?.updateExperiment?.currentStep)
    const dispatch = useDispatch();
    const handleInputChange = (count) => {
        dispatch(updateWashCount(count));
        let item = swatchList?.find(item => item?.wash_count == count);
        console.log("swatchList", swatchList, item, count)
        dispatch(updateCurrentSwatchStatus(item))
    }
    return (
        <div className={s.middlebar}>
            <div className={cx(s.label, "ms-4")}>Product Name</div>
            <div className={s.value}>{currentExperiment?.product_name}</div>
            {/* <div className={cx(s.label, "ms-4")}>Swatch Name</div>
            <div className={s.value}>{activeSwatch?.swatch_name}</div> */}
            {((currentStep === 3)) ? <>
                <div className={cx(s.label, "ms-4")}>Wash Number</div>
                <input className={s.input} value={washCount} type="number" onChange={e => handleInputChange(e.target.value)} />
            </> : ""}
        </div>
    )
}

export default MiddleBar
