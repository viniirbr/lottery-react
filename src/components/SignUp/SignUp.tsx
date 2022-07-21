import { axiosBase } from "api/AxiosConfig";
import axios from "axios";
import SignInWrapper from "components/SignIn/SignInWrapper"
import Input from "components/UI/Input/Input"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";

const SignUp = () => {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSignUpSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const response = await axiosBase.post('/user/create', {
      "name": name, "email": email, "password": password
    });
    console.log(response)
  }
  return (
    <SignInWrapper
      className=""
      handleSubmit={handleSignUpSubmit}
      title="Registration"
      submitButtonTitle="Register"
      exitButtonTitle="Back"
      exitRoute="/">
      <Input
        label="Name"
        inputAttributes={{ type: 'name', id: 'name', placeholder: 'Name', 
        value: name, onChange:(e) => setName(e.target.value) }} />
      <Input
        label="Email"
        inputAttributes={{ type: 'email', id: 'email', placeholder: 'Email',
        value: email, onChange:(e) => setEmail(e.target.value) }} />
      <Input
        label="Password"
        inputAttributes={{ type: 'password', id: 'password', placeholder: 'Password',
        value: password, onChange:(e) => setPassword(e.target.value) }} />
    </SignInWrapper>
  )
}

export default SignUp