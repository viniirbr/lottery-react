import { Input } from "components";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import SignInWrapper from "./styles";
import { useAppDispatch } from "store/hooks";
import { login } from "store/auth-slice";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import signInSchema from "schemas/signInSchema";
import { AxiosError } from "axios";
import { toast } from 'react-toastify';
import auth from '../../shared/services/auth'
import { Token } from "shared/interfaces/AuthInterfaces";

type FormData = {
    email: string,
    password: string
}

const SignIn = () => {

    const [isLoading, setIsloading] = useState<boolean>(false);
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(signInSchema)
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { login: loginUser } = auth();

    const handleSignInSubmit = async (data: FormData) => {
        setIsloading(true);
        const { email, password } = data;
        try {
            const loginResponse = await loginUser({
                "email": email,
                "password": password
            });
            dispatch(login(loginResponse.token as Token))
            localStorage.setItem('token', JSON.stringify(loginResponse.token));
            navigate('/')

        } catch (e) {
            const error = e as AxiosError;
            if (error.response?.status === 401) {
                toast.error('Email ou senha inválidos.');
                return;
            }
            toast.error('Ocorreu um erro na sua requisição.');
        } finally {
            setIsloading(false);
        }
    }

    return (
        <SignInWrapper
            className=""
            title="Authentication"
            handleSubmit={handleSubmit(async (data) => handleSignInSubmit(data))}
            submitButtonTitle="Log In"
            exitButtonTitle="SignUp"
            exitRoute="/signup"
            isLoading={isLoading}
            exitRouteFoward={true}>
            <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field: { value, onChange, onBlur } }) =>
                    <Input
                        label="Email"
                        inputAttributes={{
                            type: 'email', id: 'email', placeholder: 'Email', value: value,
                            onChange: onChange, onBlur: onBlur
                        }}
                    />} />
            <p>{errors.email?.message}</p>

            <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field: { value, onChange, onBlur } }) =>
                    <Input
                        label="Password"
                        inputAttributes={{
                            type: 'password', id: 'password', placeholder: 'Password', value: value,
                            onChange: onChange, onBlur: onBlur
                        }} />} />
            <p>{errors.password?.message}</p>

            <Link to={'/reset'}>I forgot my password</Link>
        </SignInWrapper>
    )
}

export default SignIn;