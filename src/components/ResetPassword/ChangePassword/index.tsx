import Form from "components/Form";
import Input from "components/UI/Input";
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import changePasswordSchema from "schemas/changePasswordSchema";
import { useState } from "react";
import { auth } from 'shared/services'
import { useNavigate } from "react-router-dom";

interface FormData {
  password: string,
  confirmPassword: string;
}

interface Props {
  token: string;
}

function ChangePassword({ token }: Props) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(changePasswordSchema)
  });
  const { changePassword } = auth();
  const navigate = useNavigate();

  const handleResetPassword = async (data: FormData) => {
    try {
      setIsLoading(true);
      const res = await changePassword({ token: token, password: data.password });
      console.log(res);
      navigate('/');
      //TODO: INSERT TOAST HERE
    } catch (error: any) {

    } finally {
      setIsLoading(false);
    }
  }
  return (
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
  )
}

export default ChangePassword