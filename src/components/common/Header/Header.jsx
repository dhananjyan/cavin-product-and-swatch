import { ReactSVG } from "react-svg";
import s from "./Header.module.scss";
import cx from "classnames";

import logoIcon from "../../../assets/svg/logo.svg";
import questionSvg from "../../../assets/svg/question.svg";
import bellNotifySvg from "../../../assets/svg/bellNotify.svg";
import avatarSvg from "../../../assets/svg/avatar.svg";
import plusIcon from "../../../assets/svg/plus.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openAddPopup } from "../../../store/features/expriment";

export default function Header() {
    const isModalOpen = useSelector(state => state.expriment.isModalOpen);
    const dispatch = useDispatch();
    const openModal = () => dispatch(openAddPopup())

    return (
        <div className={s.topBar}>
            <div className={cx(s.container, s.header)}>
                <ReactSVG src={logoIcon} />
                <div>
                    <ul className={cx(s.headerList)}>

                        <li className={s.navLink}>Dashboard</li>
                        <li className={cx(s.navLink, s.active)}>Product & swatches</li>
                    </ul>
                </div>
                <div className="d-flex gap-4">
                    <div>
                        <div role="button" onClick={openModal} className={cx({ [s.disabled]: isModalOpen }, s.btnPrimary)}>
                            <ReactSVG src={plusIcon} />
                            New experiment
                        </div>
                    </div>
                    <div className="d-flex align-items-center">

                        <ul className={cx(s.headerList)}>
                            <li>
                                <ReactSVG src={questionSvg} />
                            </li>
                            <li>
                                <ReactSVG src={bellNotifySvg} />
                            </li>
                            <li>
                                <ReactSVG src={avatarSvg} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}
