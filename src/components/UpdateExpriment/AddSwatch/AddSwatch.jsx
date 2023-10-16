
import s from "./AddSwatch.module.scss";
import Bottombar from "../Bottombar/Bottombar";
import Topbar from "../Topbar/Topbar";


import { useForm, useFieldArray } from "react-hook-form";

import ChooseProductStep from "../ChooseProductStep/ChooseProductStep";
import SwatchList from "./SwatchList/SwatchList";

import cx from "classnames";
import { ReactSVG } from "react-svg";

import closeIcon from "../../../assets/svg/close.svg";
import ActivityList from "./ActivityList/ActivityList";
import ImageUpload from "./ImageUpload/ImageUpload";


export default function AddSwatch() {

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


    const onSubmit = (data) => console.log(data)

    return (
        <div className={s.addProductSection}>
            <div className={s.topbar}>
                <Topbar />
            </div>
            <div className={s.rsidebar}>
                <div className="p-3">
                    <div className={cx("d-flex align-items-center justify-content-between")}>
                        <div className={s.title3}>Overall activity</div>
                        <ReactSVG src={closeIcon} />
                    </div>
                    <div className={s.text}>EXP125458745 - Experiment name</div>
                </div>
            </div>
            <div className={cx(s.lsidebar, s.verticalScroll)}>
                <SwatchList />
            </div>
            <div className={s.main}>
                <ImageUpload />
            </div>
            <div className={cx(s.rsidebar1, s.verticalScroll)}>
                <ActivityList />
            </div>
            {/* <div>
                <div className={s.formSection}>
                    asfd
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <ChooseProductStep control={control} register={register} errors={errors} />

                    </form>
                </div>
            </div> */}
            {/* <div>
                aksjdf
            </div> */}
            {/* <Bottombar /> */}
        </div>
    )
}
