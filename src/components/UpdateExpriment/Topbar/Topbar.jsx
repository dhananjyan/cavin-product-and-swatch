import { ReactSVG } from "react-svg";
import s from "./Topbar.module.scss";
import cx from "classnames";

import leftArrowIcon from "../../../assets/svg/leftArrow.svg";
import closeIcon from "../../../assets/svg/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { closeImageModal, showFinalStep, updateBackImage, updateCurrentStep, updateFrontImage } from "../../../store/features/updateExpriment";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';


// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// );


// export const options = {
//     responsive: true,
//     plugins: {
//         legend: {
//             position: 'top',
//         },
//         title: {
//             display: true,
//             text: 'Chart.js Line Chart',
//         },
//     },
// };


// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


export default function Topbar({ hideBtn }) {
    const navigate = useNavigate();
    const currentExperiment = useSelector(state => state?.updateExperiment?.currentExperiment);
    const currentStep = useSelector(state => state?.updateExperiment?.currentStep)
    const frontImage = useSelector(state => state?.updateExperiment?.frontImage);
    const backImage = useSelector(state => state?.updateExperiment?.backImage);
    const swatchList = useSelector(state => state?.updateExperiment?.swatchList);
    const [stepText, setStepText] = useState(null)
    const dispatch = useDispatch();

    const handleStepFourClick = () => {
        dispatch(closeImageModal())
        dispatch(showFinalStep(true));
    }

    const handleBack = () => {
        navigate("/");
    }

    useEffect(() => {

        const text = getTextByStep(currentStep);
        setStepText(text)
    }, [currentStep])


    const getTextByStep = step => {
        switch (step) {
            case 1:
                return "Pre-measurement"
                break;
            case 2:
                return "After Coloring"
                break;
            case 3:
                return "After Washing"
                break;
            case 4:
                return "Final result"
                break;

            default:
                return "Pre-measurement"
                break;
        }
    }

    const handleStepClick = (step) => {
        if (frontImage || backImage) {
            if (window.confirm("Are you sure to discard the image?")) {

                dispatch(updateBackImage(null));
                dispatch(updateFrontImage(null));
                dispatch(updateCurrentStep(step))
            }
        } else
            dispatch(updateCurrentStep(step))
    }
    const isDisabled = step => {
        let lastItemStep = (swatchList?.[swatchList?.length - 1]?.steps || 0) + 1;
        if (step == 4 && lastItemStep >= 2)
            return false;
        return !(step <= lastItemStep);
    }
    return (
        <div className={s.topbar}>
            {/* <Line options={options} data={data} /> */}
            <div className={cx(s.container, s.section)}>
                <div className="d-flex gap-2">
                    {hideBtn ? "" : <ReactSVG src={leftArrowIcon} role="button" onClick={handleBack} />}
                    <div>
                        <div className={s.step}>{currentExperiment?.experiment_id} - {currentExperiment?.experiment_name}</div>
                        <div className={cx(s.stepDesc, "pt-2")}>Step {currentStep || 1} - {stepText}</div>
                    </div>
                </div>
                <div className={cx("d-flex align-items-center gap-4")}>
                    <div className={cx("d-flex align-items-center gap-5", s.linkSection)}>
                        <div className={s.multiStepHorizontal}>
                            <div className={s.horizontalLine}></div>
                            <div className={cx(s.multiStepItem, { [s.active]: (currentStep === 1), [s.disabled]: false })} onClick={() => handleStepClick(1)} role="button">
                                <span>1</span>
                            </div>
                            <div className={cx(s.multiStepItem, { [s.active]: (currentStep === 2), [s.disabled]: isDisabled(2) })} onClick={() => handleStepClick(2)} role="button">
                                <span>2</span>
                            </div>
                            <div className={cx(s.multiStepItem, { [s.active]: (currentStep === 3), [s.disabled]: isDisabled(3) })} onClick={() => handleStepClick(3)} role="button">
                                <span>3</span>
                            </div>
                            <div className={cx(s.multiStepItem, { [s.active]: (currentStep === 4), [s.disabled]: isDisabled(4) })} onClick={() => handleStepClick(4)} role="button">
                                <span>4</span>
                            </div>
                        </div>
                        {/* <div className={s.activityLink}>
                            <ReactSVG src={eyeIcon} />
                            View overall activity
                        </div> */}
                    </div>
                    <div >
                        {hideBtn ? "" : <ReactSVG role="button" onClick={handleBack} src={closeIcon} />}
                    </div>
                </div>
            </div>
        </div>
    )
}
