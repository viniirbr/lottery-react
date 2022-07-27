import { user } from "shared/services";
import SignInWrapper from "components/SignIn/styles"
import { Input } from "components"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import signUpSchema from "schemas/signUpSchema";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

type FormData = {
  name: string,
  email: string,
  password: string
}

const SignUp = () => {

  const [isLoading, setIsloading] = useState<boolean>(false);
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(signUpSchema)
  });
  const navigate = useNavigate();
  const { createUser } = user();

  const handleSignUpSubmit = async (data: FormData) => {
    setIsloading(true);
    const { name, email, password } = data;
    try {
      await createUser({
        "name": name, "email": email, "password": password
      });
      toast.success('Usuário cadastrado com sucesso!')
      navigate('/');
    } catch (error: any) {
      if (error.status === 400) {
        return toast.error("Email já existe.");
      }
      toast.error('Ocorreu um erro. Verifique sua conexão.');
    } finally {
      setIsloading(false);
    }

  }
  return (
    <SignInWrapper
      className=""
      handleSubmit={handleSubmit(async (data) => handleSignUpSubmit(data))}
      title="Registration"
      submitButtonTitle="Register"
      exitButtonTitle="Back"
      exitRoute="/"
      isLoading={isLoading}
      exitRouteFoward={false}>
      <Controller
        control={control}
        name="name"
        defaultValue=""
        render={({ field: { value, onChange, onBlur } }) =>
          <Input
            label="Name"
            inputAttributes={{
              type: 'name', id: 'name', placeholder: 'Name',
              value: value, onChange: onChange, onBlur: onBlur
            }} />}
      />
      <p>{errors.name?.message}</p>

      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({ field: { value, onChange, onBlur } }) =>
          <Input
            label="Email"
            inputAttributes={{
              type: 'email', id: 'email', placeholder: 'Email',
              value: value, onChange: onChange, onBlur: onBlur
            }} />}
      />
      <p>{errors.email?.message}</p>

      <Controller
        control={control}
        name="password"
        defaultValue=""
        render={({ field: { value, onChange, onBlur } }) =>
          <Input
            label="Password"
            inputAttributes={{
              type: 'password', id: 'password', placeholder: 'Password',
              value: value, onChange: onChange, onBlur: onBlur
            }} />}
      />
      <p>{errors.password?.message}</p>
    </SignInWrapper>
  )
}

export default SignUp