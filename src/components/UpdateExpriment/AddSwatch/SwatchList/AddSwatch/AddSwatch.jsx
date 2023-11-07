import { useForm } from 'react-hook-form';
import s from './AddSwatch.module.scss';

import cx from "classnames"
import { useDispatch } from 'react-redux';
import Inputs from '../../../../common/Inputs/Inputs';
// import { createGroup, updateAddGroupPopupStatus } from '../../../../store/features/products';

export default function AddSwatch() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data)// dispatch(createGroup(data?.groupName))

    const dispatch = useDispatch();

    const handleCancel = () => {
        // dispatch(updateAddGroupPopupStatus(false))
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='p-3'>
            <div className={cx("pb-2")}>
                <Inputs
                    register={register}
                    inputClassName={s.input}
                    name="groupName"
                    autofocus
                    placeholder="Enter group name"
                    validation={{ required: true, pattern: /\S/ }}
                    showError={errors.groupName}
                    error={"Required"}
                />
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}
            </div>
            <div className={cx("d-flex justify-content-end gap-2")}>
                <button className={cx(s.btnSecondary, s.smallBtn)} onClick={handleCancel}>Cancel</button>
                <button type='submit' className={cx(s.btnPrimary, s.smallBtn)}>Add</button>
            </div>
        </form>
    )
}
