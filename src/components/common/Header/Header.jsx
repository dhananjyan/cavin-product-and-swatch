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
import { updateNavigateTo } from "../../../store/features/products";
import { useState } from "react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

export default function Header() {

    const [showDropDown, setShowDropDown] = useState(false);

    const isModalOpen = useSelector(state => state.experiment.isModalOpen);
    const dispatch = useDispatch();
    const openModal = () => dispatch(openAddPopup())


    const handleContributors = () => {
        dispatch(updateNavigateTo("/manage-contributors"))
        setShowDropDown(true);
    }

    return (
        <div className={s.topBar}>
            <div className={cx(s.container, s.header)}>
                <ReactSVG src={logoIcon} />
                {/* <div>
                    <ul className={cx(s.headerList)}>

                        <li className={s.navLink}>Dashboard</li>
                        <li className={cx(s.navLink, s.active)}>Product & swatches</li>
                    </ul>
                </div> */}
                <h1>Swatch Analysis</h1>
                <div className="d-flex gap-4">
                    {/* <div>
                        <div role="button" onClick={openModal} className={cx({ [s.disabled]: isModalOpen }, s.btnPrimary)}>
                            <ReactSVG src={plusIcon} />
                            New experiment
                        </div>
                    </div> */}
                    <div className="d-flex align-items-center">

                        <ul className={cx(s.headerList)}>
                            <li>
                                <ReactSVG src={questionSvg} />
                            </li>
                            <li>
                                <ReactSVG src={bellNotifySvg} />
                            </li>
                            <li>
                                {/* <ReactSVG src={avatarSvg} onClick={() => setShowDropDown(prevState => !prevState)} />
                                 */}
                                 <ProfileMenu handleContributors ={handleContributors}/>
                               
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}
