import React from 'react';
import Input from '../inputs/Input';
import { CiUser } from 'react-icons/ci';
import { useForm } from 'react-hook-form';

interface IRegisterFormProps {}

const RegisterForm: React.FunctionComponent<IRegisterFormProps> = (props) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();
    const onSubmit = (data: any) => console.log(data);
    console.log(watch());

    return (
        <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
            <div className="gap-2 md:flex">
                <Input
                    name="first_name"
                    label="First Name"
                    type="text"
                    icon={<CiUser />}
                    placeholder="example"
                    register={register}
                    error="error here"
                    disabled={isSubmitting}
                />
            </div>
        </form>
    );
};

export default RegisterForm;
