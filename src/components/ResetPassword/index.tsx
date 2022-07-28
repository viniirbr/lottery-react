import { useState } from "react"
import { auth } from "shared/services"
import { Form, Input } from "components"
import { useForm, Controller } from 'react-hook-form'
import resetSchema from "schemas/resetSchema"
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

type FormData = {
  email: string
  password: string,
  confirmPassword: string
}

const ResetPassword = () => {
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSettingPassword, setIsSettingPassword] = useState<boolean>(false);
  const [tokenToReset, setTokenToReset] = useState<string>('');
  const { control, handleSubmit, formState: { errors }, resetField } = useForm<FormData>({
    resolver: yupResolver(resetSchema)
  });
  const { reset } = auth();
  console.log(errors)

  const handleSendEmail = async (data: FormData) => {
    console.log('a')
    setIsLoading(true);
    const { email } = data;
    try {
      const response = await reset({ "email": email });
      toast.success("Email enviado com sucesso");
      setIsSettingPassword(true);
      setTokenToReset(response.token);
      resetField("email")
    } catch (error: any) {
      if (error.status === 404) {
        toast.error('O email inserido não existe.');
        return;
      }
      toast.error('Ocorreu um erro inesperado. Verifique sua conexão.')
    } finally {
      setIsLoading(false);
    }
  }

  const handleResetPassword = async (data: FormData) => {
    console.log(data)
  }

  const sendEmailComponent =
    <Form
      className=""
      handleSubmit={handleSubmit(async (data) => handleSendEmail(data))}
      title="Reset password"
      submitButtonTitle="Send link"
      exitButtonTitle="Back"
      exitRoute="/"
      isLoading={isLoading}>

      <Controller
        name="email"
        control={control}
        defaultValue=""
        shouldUnregister={true}
        render={({ field: { value, onChange, onBlur } }) =>
          <Input
            label="Email"
            inputAttributes={{
              type: 'email', id: 'email', placeholder: 'Email',
              value: value, onChange: onChange, onBlur: onBlur
            }} />} />
      <p>{errors.email?.message}</p>
    </Form>

  const setPasswordComponent =
    <Form
      className=""
      handleSubmit={handleSubmit(async (data) => handleResetPassword(data))}
      title="Change password"
      submitButtonTitle="Create new password"
      exitButtonTitle="Authentication"
      exitRoute="/"
      isLoading={isLoading}>

      <Controller
        name="password"
        control={control}
        defaultValue=""
        shouldUnregister={true}
        render={({ field: { value, onChange, onBlur } }) =>
          <Input
            label="Password"
            inputAttributes={{
              type: 'password', id: 'password', placeholder: 'Password',
              value: value, onChange: onChange, onBlur: onBlur
            }} />} />
      <p>{errors.password?.message}</p>

      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        shouldUnregister={true}
        render={({ field: { value, onChange, onBlur } }) =>
          <Input
            label="Password"
            inputAttributes={{
              type: 'password', id: 'confirmPassword', placeholder: 'Confirm Password',
              value: value, onChange: onChange, onBlur: onBlur
            }} />} />
      <p>{errors.confirmPassword?.message}</p>
    </Form>

  return (
    <>
      {!isSettingPassword ? sendEmailComponent : setPasswordComponent}
    </>


  )
}

export default ResetPassword