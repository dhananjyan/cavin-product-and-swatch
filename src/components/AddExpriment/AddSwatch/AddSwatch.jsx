
import s from "./AddExpriment.module.scss";
import Bottombar from "./Bottombar/Bottombar";
import Topbar from "./Topbar/Topbar";


import { useForm, useFieldArray } from "react-hook-form";

import ChooseProductStep from "../ChooseProductStep/ChooseProductStep";


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


    const onSubmit = (data) => console.log(data)

    return (
        <div className={s.addProductSection}>
            <Topbar />
            <div className={s.formSection}>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <ChooseProductStep control={control} register={register} errors={errors} />

                </form>
            </div>
            <Bottombar />
        </div>
    )
}
