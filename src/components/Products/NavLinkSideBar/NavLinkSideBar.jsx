import { ReactSVG } from "react-svg";
import homeIcon from "../../../assets/svg/home.svg";

import s from './NavLinkSideBar.module.scss';

export default function NavLinkSideBar() {
    return (
        <div>
            <div className={s.link}>
                <ReactSVG className={s.icon} src={homeIcon} />
                <div className={s.text}>Home</div>
            </div>
            <div className={s.link}>
                <ReactSVG className={s.icon} src={homeIcon} />
                <div className={s.text}>Product & Swatches</div>
            </div>
        </div>
    )
}
