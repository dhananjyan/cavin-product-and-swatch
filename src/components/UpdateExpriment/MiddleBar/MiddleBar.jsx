import React from 'react'
import s from "./MiddleBar.module.scss";
import cx from "classnames";
import { useSelector } from 'react-redux';

const MiddleBar = () => {
    const activeSwatch = useSelector(state => state?.updateExperiment?.activeSwatch)
    console.log(activeSwatch, "activeSwatch");
    return (
        <div className={s.middlebar}>
            <div className={cx(s.label, "ms-4")}>Product Name</div>
            <div className={s.value}>-</div>
            <div className={cx(s.label, "ms-4")}>Swatch Name</div>
            <div className={s.value}>{activeSwatch?.swatch_name ? activeSwatch?.swatch_name : "-"}</div>
            <div className={cx(s.label, "ms-4")}>Wash Number</div>
            <input className={s.input} value={activeSwatch?.wash_count} />
        </div>
    )
}

export default MiddleBar
