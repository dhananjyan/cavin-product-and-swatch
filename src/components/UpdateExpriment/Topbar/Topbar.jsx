import { ReactSVG } from "react-svg";
import s from "./Topbar.module.scss";
import cx from "classnames";

import leftArrowIcon from "../../../assets/svg/leftArrow.svg";
import closeIcon from "../../../assets/svg/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { showFinalStep } from "../../../store/features/updateExpriment";
import { useNavigate } from "react-router-dom";

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


export default function Topbar(props) {
    const navigate = useNavigate();
    const currentSwatchStatus = useSelector(state => state?.updateExperiment?.currentSwatchStatus);
    const currentExperiment = useSelector(state => state?.updateExperiment?.currentExperiment);
    const showFinal = useSelector(state => state?.updateExperiment?.showFinal)
    const step = showFinal ? 4 : currentSwatchStatus?.steps;
    console.log(currentExperiment,"78");
    const handleClose = () => {
        if (typeof onClose === "function")
            onClose();
    }

    const dispatch = useDispatch();

    const handleStepFourClick = () => {
        dispatch(showFinalStep(true));
    }

    const handleBack = () => {
        navigate("/");
    }

    return (
        <div className={s.topbar}>
            {/* <Line options={options} data={data} /> */}
            <div className={cx(s.container, s.section)}>
                <div className="d-flex gap-2">
                    <ReactSVG src={leftArrowIcon} role="button" onClick={handleBack} />
                    <div>
                        <div className={s.step}>{currentExperiment?.experiment_id} - {currentExperiment?.experiment_name}</div>
                        <div className={cx(s.stepDesc, "pt-2")}>Step 1 - Upload the swatch images</div>
                    </div>
                </div>
                <div className={cx("d-flex align-items-center gap-4")}>
                    <div className={cx("d-flex align-items-center gap-5", s.linkSection)}>
                        <div className={s.multiStepHorizontal}>
                            <div className={s.horizontalLine}></div>
                            <div className={cx(s.multiStepItem, { [s.active]: (![2, 3, 4].includes(step)) })}>
                                <span>1</span>
                            </div>
                            <div className={cx(s.multiStepItem, { [s.active]: (step === 2) })}>
                                <span>2</span>
                            </div>
                            <div className={cx(s.multiStepItem, { [s.active]: (step === 3) })}>
                                <span>3</span>
                            </div>
                            <div className={cx(s.multiStepItem, { [s.active]: (step === 4) })} onClick={handleStepFourClick} role="button">
                                <span>4</span>
                            </div>
                        </div>
                        {/* <div className={s.activityLink}>
                            <ReactSVG src={eyeIcon} />
                            View overall activity
                        </div> */}
                    </div>
                    <div >
                        <ReactSVG role="button" onClick={handleBack} src={closeIcon} />
                    </div>
                </div>
            </div>
        </div>
    )
}
