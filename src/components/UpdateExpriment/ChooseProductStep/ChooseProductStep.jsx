import s from './ChooseProductStep.module.scss';
import { ReactSVG } from "react-svg";
import Inputs from "../../common/Inputs/Inputs";


import { useForm, useFieldArray } from "react-hook-form";

import plusIcon from "../../../assets/svg/plus.svg"
import closeCircleIcon from "../../../assets/svg/circleClose.svg"
import InputImage from '../../common/InputImage/InputImage';


export default function ChooseProductStep(props) {
    const { control, register, errors } = props;


    const { fields, append, remove } = useFieldArray({
        control,
        name: "swatches"
    });

    return (
        <div className={s.stepOne}>
            <div className={s.textTitle}>Choose product and swatch</div>
            <div className={s.titleDesc}>Placeholder text comes here....</div>
            <div className={s.threeFields}>
                <div>
                    <Inputs
                        inputGroupClassname={s.input}
                        name="product"
                        label="Product name"
                        register={register}
                        placeholder="Name"
                        validation={{
                            required: "*Required",
                            minLength: {
                                value: 3,
                                message: "Minimum length is 3"
                            }
                        }}
                    />
                    {errors.name && <span role="alert" className={s.errorMessage}>{errors.name.message}</span>}

                </div>
                <div>
                    <Inputs
                        inputGroupClassname={s.input}
                        name="swatch"
                        label="Swatch name"
                        register={register}
                        placeholder="Name"
                        validation={{
                            required: "*Required",
                            minLength: {
                                value: 3,
                                message: "Minimum length is 3"
                            }
                        }}
                    />
                    {errors.name && <span role="alert" className={s.errorMessage}>{errors.name.message}</span>}

                </div>
                <div>
                    <Inputs
                        inputGroupClassname={s.input}
                        name="date"
                        type="date"
                        label="Date"
                        register={register}
                        placeholder="Name"
                        validation={{
                            required: "*Required",
                            minLength: {
                                value: 3,
                                message: "Minimum length is 3"
                            }
                        }}
                    />
                    {errors.name && <span role="alert" className={s.errorMessage}>{errors.name.message}</span>}

                </div>

            </div>
            <div className={s.textTitle}>Choose product and swatch</div>
            <div className={s.titleDesc}>Placeholder text comes here....</div>
            {fields.map((item, index) => (
                <div key={item.id}>
                    <div className={s.threeFields}>
                        <div>
                            <Inputs
                                inputGroupClassname={s.input}
                                name={`swatches.${index}.name`}
                                label={`Swatch ${index + 1}`}
                                register={register}
                                placeholder="Name"
                                validation={{
                                    required: "*Required",
                                    minLength: {
                                        value: 3,
                                        message: "Minimum length is 3"
                                    }
                                }}
                            />
                            {errors.name && <span role="alert" className={s.errorMessage}>{errors.name.message}</span>}

                        </div>
                        <div>
                            <div role='button' className={s.removeBtn} onClick={() => remove(index)}><ReactSVG src={closeCircleIcon} />Remove this swatch</div>
                        </div>

                    </div>

                    <div className={s.threeFields}>
                        <div>
                            <InputImage
                                inputGroupClassname={s.input}
                                name={`swatches.${index}.name`}
                                label={`Swatch ${index + 1}`}
                                register={register}
                                placeholder="Name"
                                validation={{
                                    required: "*Required",
                                    minLength: {
                                        value: 3,
                                        message: "Minimum length is 3"
                                    }
                                }}
                            />
                            {errors.name && <span role="alert" className={s.errorMessage}>{errors.name.message}</span>}
                        </div>

                    </div>
                    <div>
                        <label>Swatch 2 front image</label>
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={() => append({ firstName: "bill", lastName: "luo" })}
                className={s.btnSecondary}
            ><ReactSVG src={plusIcon} /> Add new swatch</button>
        </div>
    )
}
