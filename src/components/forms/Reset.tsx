import React, { FunctionComponent, useEffect, useState } from 'react';
import Input from '../inputs/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiLock } from 'react-icons/fi';
import zxcvbn from 'zxcvbn';
import SlideButton from '../buttons/SlideButton';
import { toast } from 'react-toastify';
import axios from 'axios';
import Link from 'next/link';

interface IResetFormProps {
    token: string;
}
type FormSchemaType = z.infer<typeof FormSchema>;

const FormSchema = z
    .object({
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .max(32, 'Password must be less than 32 characters'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

const ResetForm: FunctionComponent<IResetFormProps> = (props) => {
    const { token } = props;
    const [passwordScore, setPasswordScore] = useState<number>(0);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
    });
    const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
        try {
            const { data } = await axios.post('/api/auth/reset', {
                password: values.password,
                token,
            });

            reset();
            toast.success(data.message);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    const validatePasswordStrength = () => {
        const password = watch().password;
        return zxcvbn(password ? password : '').score;
    };

    useEffect(() => {
        setPasswordScore(validatePasswordStrength());
    }, [watch().password]);

    return (
        <div className="w-full px-12 py-4">
            <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
                Reset password
            </h2>
            <p className="text-center text-sm text-gray-600 mt-2">
                Sign instead? &nbsp;
                <Link
                    href="/auth"
                    className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                >
                    Sign in
                </Link>
            </p>
            <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
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
                <SlideButton
                    type="submit"
                    text="Change password"
                    slide_text="Securely changing password..."
                    icon={<FiLock />}
                    disabled={isSubmitting}
                />
            </form>
        </div>
    );
};

export default ResetForm;
