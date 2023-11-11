import { ReactSVG } from "react-svg";
import s from "./Topbar.module.scss";
import cx from "classnames";

import leftArrowIcon from "../../../assets/svg/leftArrow.svg";
import pencilIcon from "../../../assets/svg/pencil.svg";
import eyeIcon from "../../../assets/svg/eye.svg";
import closeIcon from "../../../assets/svg/close.svg";
import { useSelector } from "react-redux";


export default function Topbar(props) {
    const { onClose } = props;
    const currentSwatchStatus = useSelector(state => state?.updateExperiment?.currentSwatchStatus);
    const step = currentSwatchStatus?.steps;
    const handleClose = () => {
        if (typeof onClose === "function")
            onClose();
    }
    return (
        <div className={s.topbar}>
            <div className={cx(s.container, s.section)}>
                <div className="d-flex gap-2">
                    <ReactSVG src={leftArrowIcon} />
                    <div>
                        <div className={s.step}>EXP125458745 - Experiment name</div>
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
                            <div className={cx(s.multiStepItem, { [s.active]: (step === 4) })} role="button">
                                <span>4</span>
                            </div>
                        </div>
                        {/* <div className={s.activityLink}>
                            <ReactSVG src={eyeIcon} />
                            View overall activity
                        </div> */}
                    </div>
                    <div >
                        <ReactSVG role="button" onClick={handleClose} src={closeIcon} />
                    </div>
                </div>
            </div>
        </div>
    )
}
