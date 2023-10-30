import s from "./GroupsSideBar.module.scss";
import cx from "classnames"

export default function GroupsSideBar() {
    return (
        <div>
            <div className={s.item}>
                <div className={cx(s.titleBold, "pb-2")}>Group name 1</div>
                <div className={cx(s.titleSmall1, "pb-1")}>Total no. of experiments&nbsp;&nbsp;<b>15</b></div>
                <div className={cx("d-flex align-items-center gap-2")}>
                    <div className={s.avatar}>AH</div>
                    <div className={s.smallText}>Allison Herwitz</div>
                </div>
            </div>
        </div>
    )
}
