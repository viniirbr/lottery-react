import Input from "components/UI/Input/Input";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import SignInWrapper from "./SignInWrapper";
import { axiosBase } from "api/AxiosConfig";

const SignIn = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [hasError, setHasError] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSignInSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            
            const response = await axiosBase.post('/login', {
                "email": email,
                "password": password
            });

            const { data } = response;

            const token = data.token.token;
            localStorage.setItem('token', token);
            console.log(data)
            navigate('/home');

        } catch (e) {
            setHasError(true);
        }
    }

    return (
        <SignInWrapper className=""
            title="Authentication"
            handleSubmit={handleSignInSubmit}
            submitButtonTitle="Log In"
            exitButtonTitle="SignUp"
            exitRoute="/signup">
            <Input
                label="Email"
                inputAttributes={{
                    type: 'email', id: 'email', placeholder: 'Email', value: email,
                    onChange: (e) => setEmail(e.target.value), onFocus: () => setHasError(false)
                }} />
            <Input
                label="Password"
                inputAttributes={{
                    type: 'password', id: 'password', placeholder: 'Password', value: password,
                    onChange: (e) => setPassword(e.target.value), onFocus: () => setHasError(false)
                }} />
                {hasError && <p style={{color:'red'}}>Houve um erro</p>}
            <Link to={'/reset'}>I forgot my password</Link>
        </SignInWrapper>
    )
}

export default SignIn;