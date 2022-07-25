import { axiosBase } from "api/AxiosConfig"
import Form from "components/Form/Form"
import Input from "components/UI/Input/Input"
import { useState } from "react"
import { useForm, Controller } from 'react-hook-form'
import resetSchema from "schemas/resetSchema"
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

type FormData = {
  email: string
}

const ResetPassword = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { control, handleSubmit, formState: { errors }, resetField } = useForm<FormData>({
    resolver: yupResolver(resetSchema)
  })


  const handleResetPassword = async (data: FormData) => {
    setIsLoading(true);
    const { email } = data;
    try {
      const response = await axiosBase.post('/reset', {
        "email": email
      });
      toast.success("Email enviado com sucesso");
      resetField('email')
    } catch (e) {
      console.log(e)
      const error = e as AxiosError;
      if (error.response?.status === 404) {
        toast.error('O email inserido não existe.');
        return;
      }
      toast.error('Ocorreu um erro inesperado.')
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form
      className=""
      handleSubmit={handleSubmit(async (data) => handleResetPassword(data))}
      title="Reset password"
      submitButtonTitle="Send link"
      exitButtonTitle="Back"
      exitRoute="/"
      isLoading={isLoading}>

      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { value, onChange, onBlur } }) =>
          <Input
            label="Email"
            inputAttributes={{
              type: 'email', id: 'email', placeholder: 'Email',
              value: value, onChange: onChange, onBlur: onBlur
            }} />} />
      <p>{errors.email?.message}</p>
    </Form>
  )
}

export default ResetPassword