import { axiosBase } from "api/AxiosConfig";
import SignInWrapper from "components/SignIn/SignInWrapper"
import Input from "components/UI/Input/Input"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";

const SignUp = () => {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsloading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSignUpSubmit = async (event: FormEvent) => {
    setIsloading(true);
    event.preventDefault();
    try {
      const response = await axiosBase.post('/user/create', {
        "name": name, "email": email, "password": password
      });
      navigate('/')
    } catch(e) {

    } finally {
      setIsloading(false);
    }
   
  }
  return (
    <SignInWrapper
      className=""
      handleSubmit={handleSignUpSubmit}
      title="Registration"
      submitButtonTitle="Register"
      exitButtonTitle="Back"
      exitRoute="/"
      isLoading={isLoading}
      exitRouteFoward={false}>
      <Input
        label="Name"
        inputAttributes={{
          type: 'name', id: 'name', placeholder: 'Name',
          value: name, onChange: (e) => setName(e.target.value)
        }} />
      <Input
        label="Email"
        inputAttributes={{
          type: 'email', id: 'email', placeholder: 'Email',
          value: email, onChange: (e) => setEmail(e.target.value)
        }} />
      <Input
        label="Password"
        inputAttributes={{
          type: 'password', id: 'password', placeholder: 'Password',
          value: password, onChange: (e) => setPassword(e.target.value)
        }} />
    </SignInWrapper>
  )
}

export default SignUp