import React from 'react';
import Input from '../inputs/Input';
import { CiUser } from 'react-icons/ci';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface IRegisterFormProps {}
type FormSchemaType = z.infer<typeof FormSchema>;

const FormSchema = z.object({
    first_name: z
        .string()
        .min(2, 'First name must be at least 2 characters')
        .max(32, 'First name must be less than 32 characters')
        .regex(
            new RegExp('^[a-zA-Z ]+$'),
            'First name must contain only letters. No special characters or numbers allowed.'
        ),
});

const RegisterForm: React.FunctionComponent<IRegisterFormProps> = (props) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
    });
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
                    error={errors?.first_name?.message}
                    disabled={isSubmitting}
                />
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default RegisterForm;
