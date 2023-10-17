import { Outlet, Link } from "react-router-dom";
import Header from "../components/common/Header/Header";

import cx from "classnames"
import s from "../assets/scss/routes/Layout.module.scss";
import Popup from "../components/common/Popup/Popup";
import AddExpriment from "../components/AddExpriment/AddExpriment";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";
import ImageCrop from "../components/UpdateExpriment/AddSwatch/ImageCrop/ImageCrop";

export default function Layout() {
    const mainRef = useRef();
    const isModalOpen = useSelector(state => state.expriment.isModalOpen);
    const isImageModalOpen = useSelector(state => state.updateExpriment.isImageModalOpen);
    useEffect(() => {
        if (isModalOpen) mainRef.current.scrollTo({ top: 0 });
    }, [isModalOpen, isImageModalOpen])

    return (
        <div className={cx(s.layout)}>
            <Header />
            <div className={s.main} ref={mainRef}>
                {(isModalOpen || isImageModalOpen) ? <Popup className={cx({ [s.imageCropContainer]: isImageModalOpen }, s.popupContainer)}>
                    <div className={s.popup}>
                        {isModalOpen ? <AddExpriment /> : <ImageCrop />}
                    </div>
                </Popup> : ""}
                <Outlet />
            </div>
        </div>
    )
}
