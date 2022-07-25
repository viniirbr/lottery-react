import Input from "components/UI/Input/Input";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import SignInWrapper from "./SignInWrapper";
import { axiosBase } from "api/AxiosConfig";
import { useAppDispatch } from "store/hooks";
import { login } from "store/auth-slice";
import User from "types/User";
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import signInSchema from "schemas/signInSchema";


type FormData = {
    email: string,
    password: string
}


const SignIn = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [hasError, setHasError] = useState<boolean>(false);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(signInSchema)
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSignInSubmit = async (data: FormData) => {
        setIsloading(true);
        const { email, password } = data;
        try {

            const response = await axiosBase.post('/login', {
                "email": email,
                "password": password
            });

            const { data } = response;
            const user: User = { id: data.user.id, token: data.token };
            dispatch(login(user))
            localStorage.setItem('token', JSON.stringify(user.token));
            navigate('/')

        } catch (e) {
            setHasError(true);
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
                rules={{ minLength: 6 }}
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


            {hasError && <p style={{ color: 'red' }}>Houve um erro</p>}
            <Link to={'/reset'}>I forgot my password</Link>
        </SignInWrapper>
    )
}

export default SignIn;