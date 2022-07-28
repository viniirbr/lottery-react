import Form from "components/Form";
import Input from "components/UI/Input";
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import sendEmailSchema from "schemas/sendEmailSchema";
import { useState } from "react";
import { toast } from 'react-toastify'
import { auth } from 'shared/services'

interface FormData {
  email: string
}

interface Props {
  goToChangePassword: React.Dispatch<React.SetStateAction<boolean>>,
  setTokenToResetPassword: React.Dispatch<React.SetStateAction<string>>
}

function SendEmail({ goToChangePassword, setTokenToResetPassword }: Props) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(sendEmailSchema)
  });
  const { reset } = auth();

  const handleSendEmail = async (data: FormData) => {
    console.log('a')
    setIsLoading(true);
    const { email } = data;
    try {
      const response = await reset({ "email": email });
      toast.success("Email enviado com sucesso");
      goToChangePassword(true);
      setTokenToResetPassword(response.token);
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

  return (
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
  )
}

export default SendEmail