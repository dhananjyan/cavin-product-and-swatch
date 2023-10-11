import s from "./AddExpriment.module.scss";
import Bottombar from "./Bottombar/Bottombar";
import Topbar from "./Topbar/Topbar";

import { useForm, useFieldArray } from "react-hook-form";

import ChooseProductStep from "./ChooseProductStep/ChooseProductStep";

import leftArrowIcon from "../../assets/svg/leftArrow.svg";
import { ReactSVG } from "react-svg";

import cx from "classnames";
import Inputs from "../common/Inputs/Inputs";
import SelectBox from "../common/SelectBox/SelectBox";

import addUserIcon from "../../assets/svg/addUser.svg";
import closeIcon from "../../assets/svg/close.svg";
import { Link } from "react-router-dom";
import { closeAddModal } from "../../store/features/expriment";
import { useDispatch } from "react-redux";

export default function AddExpriment() {

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            swatches: [{}]
        }
    });

    const onSubmit = (data) => console.log(data);

    const dispatch = useDispatch();

    const closeModal = () => dispatch(closeAddModal())

    return (
        <div className={s.addProductSection}>
            <div className={cx(s.container, s.formSection)}>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className={"pt-5 d-flex justify-content-between"}>
                        <div className={cx(s.title1)}>
                            <ReactSVG src={leftArrowIcon} onClick={closeModal} role="button" />
                            New experiment
                        </div>
                        <ReactSVG src={closeIcon} onClick={closeModal} role="button" />
                    </div>
                    <div>
                        <div className={cx(s.title2, "pt-5")}>Experiment information</div>
                        <p className={cx(s.text, "pt-2")}>Placeholder text comes here....</p>
                        <div className="d-flex gap-3 flex-wrap">
                            <div>
                                <label className={cx(s.text, "form-label")} >Group name</label>
                                <SelectBox
                                    name="groupName"
                                />
                            </div>
                            <Inputs
                                label="Experiment ID"
                                name="exprimentId"
                            />
                            <Inputs
                                label="Experiment name"
                                name="exprimentName"
                            />
                            <Inputs
                                label="Date"
                                name="date"
                                type="date"
                            />
                        </div>
                    </div>
                    <div>
                        <div className={cx(s.title2, "pt-5")}>Product & swatch information</div>
                        <p className={cx(s.text, "pt-2")}>Placeholder text comes here....</p>
                        <div className="d-flex gap-3 flex-wrap">

                            <Inputs
                                label="Product name"
                                name="productName"
                            />
                            <Inputs
                                label="Swatch name"
                                name="swatchName"
                            />
                        </div>
                    </div>
                    <div className="mb-5">
                        <div className={cx(s.title2, "pt-5")}>Contributors</div>
                        <p className={cx(s.text, "pt-2")}>Placeholder text comes here....</p>
                        <div className={cx("d-flex gap-2 align-items-center", s.linkTextPrimary)}>
                            <ReactSVG src={addUserIcon} />
                            Add contributors
                        </div>
                    </div>
                </form>
            </div>
            <div className={s.bottomBar}>
                <div className={s.container}>
                    <div className="d-flex gap-3 py-3">
                        <button className={s.btnSecondary}>Cancel</button>
                        <button className={s.btnPrimary}>Create new experiment</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
