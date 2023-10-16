import { ReactSVG } from 'react-svg'
import s from './Bottombar.module.scss';

import rightArrowIcon from "../../../assets/svg/rightArrow.svg"
import leftArrowIcon from "../../../assets/svg/leftArrow.svg"
import editArrowIcon from "../../../assets/svg/edit.svg"

export default function Bottombar() {
    return (
        <div className={s.bottomBar}>
            <button> <ReactSVG src={editArrowIcon} /> Save as draft</button>
            <button className={s.btnPrimary}><ReactSVG src={leftArrowIcon} /> Back</button>
            <button className={s.btnPrimary}>Continue <ReactSVG src={rightArrowIcon} /></button>
        </div>
    )
}
