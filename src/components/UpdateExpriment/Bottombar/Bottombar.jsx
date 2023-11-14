import { ReactSVG } from 'react-svg';
import s from './Bottombar.module.scss';
import cx from "classnames";

import rightArrowIcon from "../../../assets/svg/rightArrow.svg"
import leftArrowIcon from "../../../assets/svg/leftArrowLight.svg"
import editArrowIcon from "../../../assets/svg/edit.svg"
import { useDispatch, useSelector } from 'react-redux';
import { addSwatchImage } from '../../../store/features/updateExpriment';

export default function Bottombar() {
    const dispatch = useDispatch();
    const handleContinue = ({ isSameStep }) => {
        dispatch(addSwatchImage({ isSameStep }))
    }

    const frontImage = useSelector(state => state?.updateExperiment?.frontImage)
    const backImage = useSelector(state => state?.updateExperiment?.backImage)
    const currentSwatchStatus = useSelector(state => state?.updateExperiment?.currentSwatchStatus)

    return (
        <div className={cx(s.bottomBar, "")}>
            {(currentSwatchStatus?.steps > 3) ? "" : <button style={{ color: "#3771C3" }} className={cx(s.saveAsDraft, { [s.disabled]: !(frontImage && backImage) })} onClick={() => handleContinue({ isSameStep: true })}> <ReactSVG src={editArrowIcon} /> Save as draft</button>}
            <button className={cx(s.btnPrimary, s.disabled)}><ReactSVG src={leftArrowIcon} />&nbsp;  Back</button>
            <button className={cx(s.btnPrimary, { [s.disabled]: !(frontImage && backImage) })} onClick={() => handleContinue({ isSameStep: false })} >Continue<ReactSVG src={rightArrowIcon} /></button>
        </div >
    )
}
