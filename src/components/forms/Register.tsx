import React, { FunctionComponent, useEffect, useState } from 'react';
import Input from '../inputs/Input';
import { CiUser } from 'react-icons/ci';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TfiEmail } from 'react-icons/tfi';
import { BsTelephone } from 'react-icons/bs';
import validator from 'validator';
import { FiLock } from 'react-icons/fi';
import zxcvbn from 'zxcvbn';
import SlideButton from '../buttons/SlideButton';

interface IRegisterFormProps {}
type FormSchemaType = z.infer<typeof FormSchema>;

const FormSchema = z
    .object({
        first_name: z
            .string()
            .min(2, 'First name must be at least 2 characters')
            .max(32, 'First name must be less than 32 characters')
            .regex(new RegExp('^[a-zA-Z ]+$'), 'No special characters allowed'),
        last_name: z
            .string()
            .min(2, 'Last name must be at least 2 characters')
            .max(32, 'Last name must be less than 32 characters')
            .regex(new RegExp('^[a-zA-Z ]+$'), 'No special characters allowed'),
        email: z.string().email('Invalid email address'),
        phone: z.string().refine(validator.isMobilePhone, {
            message: 'Invalid phone number',
        }),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .max(32, 'Password must be less than 32 characters'),
        confirmPassword: z.string(),
        accept: z.literal(true, {
            errorMap: () => ({
                message: 'You must accept the terms and conditions',
            }),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

const RegisterForm: FunctionComponent<IRegisterFormProps> = (props) => {
    const [passwordScore, setPasswordScore] = useState<number>(0);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
    });
    const onSubmit = (data: any) => console.log(data);
    // console.log(watch());

    const validatePasswordStrength = () => {
        const password = watch().password;
        return zxcvbn(password ? password : '').score;
    };
    // console.log('Password Scrore: ', zxcvbn('asdasdasdad@£').score);

    useEffect(() => {
        setPasswordScore(validatePasswordStrength());
    }, [watch().password]);

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
                <Input
                    name="last_name"
                    label="Last Name"
                    type="text"
                    icon={<CiUser />}
                    placeholder="example"
                    register={register}
                    error={errors?.last_name?.message}
                    disabled={isSubmitting}
                />
            </div>
            <Input
                name="email"
                label="Email address"
                type="text"
                icon={<TfiEmail />}
                placeholder="example@example.com"
                register={register}
                error={errors?.email?.message}
                disabled={isSubmitting}
            />
            <Input
                name="phone"
                label="Phone number"
                type="text"
                icon={<BsTelephone />}
                placeholder="+(xxx) xxx-xxxx-xxx"
                register={register}
                error={errors?.phone?.message}
                disabled={isSubmitting}
            />
            <Input
                name="password"
                label="Password"
                type="password"
                icon={<FiLock />}
                placeholder="********"
                register={register}
                error={errors?.password?.message}
                disabled={isSubmitting}
            />
            {watch().password?.length > 0 && (
                <div className="flex mt-2">
                    {Array.from(Array(5).keys()).map((span, i) => (
                        <span className="w-1/5 px-1" key={i}>
                            <div
                                className={`h-2 rounded-xl b ${
                                    passwordScore <= 2
                                        ? 'bg-red-500'
                                        : passwordScore < 4
                                        ? 'bg-yellow-500'
                                        : 'bg-green-500'
                                }`}
                            ></div>
                        </span>
                    ))}
                </div>
            )}
            <Input
                name="confirmPassword"
                label="Confirm password"
                type="password"
                icon={<FiLock />}
                placeholder="********"
                register={register}
                error={errors?.confirmPassword?.message}
                disabled={isSubmitting}
            />
            <div className="flex items-center mt-3">
                <input
                    type="checkbox"
                    id="accept"
                    className="mr-2 focus:ring-0 rounded"
                    {...register('accept')}
                />
                <label htmlFor="accept" className="text-gray-700">
                    I accept the&nbsp;
                    <a
                        href="http://"
                        target="_blank"
                        className="text-blue-700 hover:underline"
                    >
                        terms
                    </a>
                    &nbsp;and&nbsp;
                    <a
                        href="http://"
                        target="_blank"
                        className="text-blue-700 hover:underline"
                    >
                        privacy policy
                    </a>
                </label>
            </div>
            <div>
                {errors.accept && (
                    <p className="text-sm text-red-600 mt-1">
                        {errors?.accept?.message}
                    </p>
                )}
            </div>
            <SlideButton
                type="submit"
                text="Sign up"
                slide_text="Secure sign in"
                icon={<FiLock />}
                disabled={isSubmitting}
            />
        </form>
    );
};

export default RegisterForm;
