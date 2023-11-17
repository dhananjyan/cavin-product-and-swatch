import { Outlet, Link, useNavigate } from "react-router-dom";
import Header from "../components/common/Header/Header";

import cx from "classnames"
import s from "../assets/scss/routes/Layout.module.scss";
import Popup from "../components/common/Popup/Popup";
import AddExpriment from "../components/AddExpriment/AddExpriment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";
import ImageCrop from "../components/UpdateExpriment/AddSwatch/ImageCrop/ImageCrop";
import { updateNavigateTo } from "../store/features/products";

export default function Layout() {
    const mainRef = useRef();
    const isModalOpen = useSelector(state => state.experiment.isModalOpen);
    const isImageModalOpen = useSelector(state => state.updateExperiment.isImageModalOpen);
    const redirectTo = useSelector((state) => state.products?.redirectTo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (redirectTo) {
            dispatch(updateNavigateTo(null))
            navigate(redirectTo); // Redirect to the specified route
        }

    }, [redirectTo])

    useEffect(() => {
        if (isModalOpen) mainRef.current.scrollTo({ top: 0 });
    }, [isModalOpen, isImageModalOpen])

    const handleClose = () => {
        
    }

    return (
        <div className={cx(s.layout)}>
            <Header close={handleClose} />
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
