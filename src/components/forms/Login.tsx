import React, { FunctionComponent, useState } from 'react';
import Input from '../inputs/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TfiEmail } from 'react-icons/tfi';
import { FiLock } from 'react-icons/fi';
import SlideButton from '../buttons/SlideButton';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

interface ILoginFormProps {
    callbackUrl: string;
    csrfToken: string;
}
type FormSchemaType = z.infer<typeof FormSchema>;

const FormSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(32, 'Password must be less than 32 characters'),
});

const LoginForm: FunctionComponent<ILoginFormProps> = (props) => {
    const { callbackUrl, csrfToken } = props;
    const router = useRouter();
    const path = router.pathname;
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
    });
    const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
        const res: any = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl,
        });

        if (res?.error) {
            return toast.error(res.error);
        } else {
            return router.push('/'); // you could also do router.push(callbackUrl)
        }
    };

    return (
        <div className="w-full px-12 py-4">
            <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
                Sign in
            </h2>
            <p className="text-center text-sm text-gray-600 mt-2">
                You do not have an account? &nbsp;
                <a
                    className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                    onClick={() => {
                        router.push({
                            pathname: path,
                            query: {
                                tab: 'signup',
                            },
                        });
                    }}
                >
                    Sign up
                </a>
            </p>
            <form
                method="post"
                action="/api/auth/signin/email"
                className="my-8 text-sm"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* What is a CSRF token?
                A CSRF Token is a secret, unique and unpredictable value a server-side application generates in order to protect CSRF vulnerable resources. The tokens are generated and submitted by the server-side application in a subsequent HTTP request made by the client. */}
                <input
                    type="hidden"
                    name="csrfToken"
                    defaultValue={csrfToken}
                />
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
                    name="password"
                    label="Password"
                    type="password"
                    icon={<FiLock />}
                    placeholder="********"
                    register={register}
                    error={errors?.password?.message}
                    disabled={isSubmitting}
                />
                <div className="mt-2 hover:underline">
                    <Link href="/forgot" className="text-blue-600">
                        Forgot password?
                    </Link>
                </div>
                <SlideButton
                    type="submit"
                    text="Sign in"
                    slide_text="Secure sign in"
                    icon={<FiLock />}
                    disabled={isSubmitting}
                />
            </form>
        </div>
    );
};

export default LoginForm;
