import { Outlet, Link } from "react-router-dom";
import Header from "../components/common/Header/Header";

import cx from "classnames"
import s from "../assets/scss/routes/Layout.module.scss";
import Popup from "../components/common/Popup/Popup";
import AddExpriment from "../components/AddExpriment/AddExpriment";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";

export default function Layout() {
    const mainRef = useRef();
    const isModalOpen = useSelector(state => state.expriment.isModalOpen);
    useEffect(() => {
        if (isModalOpen) mainRef.current.scrollTo({ top: 0 });
    }, [isModalOpen])

    return (
        <div className={cx(s.layout)}>
            <Header />
            <div className={s.main} ref={mainRef}>
                {isModalOpen ? <Popup className={s.popupContainer}>
                    <div className={s.popup}>
                        <AddExpriment />
                    </div>
                </Popup> : ""}
                <Outlet />
            </div>
        </div>
    )
}
