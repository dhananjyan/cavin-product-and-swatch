import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import cx from "classnames";
import s from "./AddExpriment.module.scss";

import closeIcon from "../../assets/svg/close.svg";
import leftArrowIcon from "../../assets/svg/leftArrow.svg";

import Inputs from "../common/Inputs/Inputs";
import SelectBox from "../common/SelectBox/SelectBox";
import { closeAddModal, createExperiment } from "../../store/features/expriment";
import AddContributors from "../AddContributors/AddContributors";

export default function AddExpriment() {

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        setValue,
        clearErrors
    } = useForm({
        defaultValues: {
            swatches: [{}],
            groupName: []
        }
    });

    const [options, setOptions] = useState([]);

    const groupName = watch("groupName")
    const groupList = useSelector(state => state?.products?.groupList)

    const onSubmit = (data) => dispatch(createExperiment(data));

    const dispatch = useDispatch();

    const closeModal = () => dispatch(closeAddModal());

    useEffect(() => {
        const options = groupList?.map(item => ({ label: item?.group_name, value: item?.group_id }))
        setOptions(options);
    }, [groupList]);

    const handleGroupNameChange = ({ filed, value, item }) => {
        setValue("groupName", value?.[0])
        clearErrors("groupName")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.addProductSection} >
            <div className={cx(s.container, s.formSection)}>
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
                            <input hidden {...register("groupName", { required: true })} />
                            <SelectBox
                                name="groupName"
                                // register={register}
                                options={options}
                                value={[groupName]}
                                onChange={handleGroupNameChange}
                            // showError={errors?.groupName}
                            // error={"Required"}
                            // {...register("groupName")}
                            />
                            {errors?.groupName ? <div className={s.errorText}>Required {errors?.groupName?.message}</div> : ""}
                        </div>
                        <Inputs
                            label="Experiment ID"
                            name="experimentId"
                            register={register}
                            validation={{ required: true, pattern: /\S/ }}
                            showError={errors?.experimentId}
                            error={"Required"}
                        />
                        <Inputs
                            label="Experiment name"
                            name="experimentName"
                            register={register}
                            validation={{ required: true, pattern: /\S/ }}
                            showError={errors?.experimentName}
                            error={"Required"}
                        />
                        <Inputs
                            label="Date"
                            name="date"
                            type="date"
                            register={register}
                            validation={{ required: true }}
                            showError={errors?.date}
                            error={"Required"}
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
                            register={register}
                            validation={{ required: true, pattern: /\S/ }}
                            showError={errors?.productName}
                            error={"Required"}
                        />
                        <Inputs
                            label="Swatch name"
                            name="swatchName"
                            register={register}
                            validation={{ required: true, pattern: /\S/ }}
                            showError={errors?.swatchName}
                            error={"Required"}
                        />
                    </div>
                    <AddContributors />
                </div>
            </div>
            <div className={s.bottomBar}>
                <div className={s.container}>
                    <div className="d-flex gap-3 py-3">
                        <button className={s.btnSecondary} onClick={closeModal}>Cancel</button>
                        <button type="submit" className={s.btnPrimary}>Create new experiment</button>
                    </div>
                </div>
            </div>
        </form>
    )
}
