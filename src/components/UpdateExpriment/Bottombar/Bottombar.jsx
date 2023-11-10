import { ReactSVG } from 'react-svg';
import s from './Bottombar.module.scss';
import cx from "classnames";

import rightArrowIcon from "../../../assets/svg/rightArrow.svg"
import leftArrowIcon from "../../../assets/svg/leftArrowLight.svg"
import editArrowIcon from "../../../assets/svg/edit.svg"
import { useDispatch } from 'react-redux';
import { addSwatchImage } from '../../../store/features/updateExpriment';

export default function Bottombar() {
    const dispatch = useDispatch();
    const handleSaveAsDraft = () => {
        console.log("ddddddddddddddddddddddddddddddddkk")
        dispatch(addSwatchImage())
    }

    return (
        <div className={cx(s.bottomBar, "")}>
            <button style={{ color: "#3771C3" }} className={s.saveAsDraft} onClick={handleSaveAsDraft}> <ReactSVG src={editArrowIcon} /> Save as draft</button>
            <button className={cx(s.btnPrimary, s.disabled)}><ReactSVG src={leftArrowIcon} />&nbsp;  Back</button>
            <button className={s.btnPrimary}>Continue<ReactSVG src={rightArrowIcon} /></button>
        </div>
    )
}
