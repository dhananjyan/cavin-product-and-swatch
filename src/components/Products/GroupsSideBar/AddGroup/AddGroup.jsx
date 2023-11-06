import { useForm } from 'react-hook-form';
import s from './AddGroup.module.scss';



export default function AddGroup() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data)

    console.log(watch("example")) // watch input value by passing the name of it
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <input {...register("exampleRequired", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}

            <input type="submit" />
        </form>
    )
}
