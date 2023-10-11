import s from './Popup.module.scss';

import cx from "classnames";

export default function Popup({ children, className }) {
    return (
        <div className={cx(s.popupContainer, className)}>
            {children}
        </div>
    )
}
