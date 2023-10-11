import s from "./Topbar.module.scss";
import cx from "classnames";

export default function Topbar() {
    return (
        <div className={s.topbar}>
            <div className={cx(s.container)}>
                <div>
                    <div className={s.step}>Step 1</div>
                    <div className={s.stepDesc}>Choose new product & swatch</div>
                </div>
                <div className={s.multiStepHorizontal}>
                    <div className={s.horizontalLine}></div>
                    <div className={s.multiStepItem}>
                        <span>1</span>
                    </div>
                    <div className={s.multiStepItem}>
                        <span>2</span>
                    </div>
                    <div className={s.multiStepItem}>
                        <span>3</span>
                    </div>
                    <div className={s.multiStepItem}>
                        <span>4</span>
                    </div>
                    <div className={s.multiStepItem}>
                        <span>5</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
