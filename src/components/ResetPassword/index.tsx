import { useState } from "react"
import { auth } from "shared/services"
import { Form, Input } from "components"
import { useForm, Controller } from 'react-hook-form'
import resetSchema from "schemas/sendEmailSchema"
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import SendEmail from "./SendEmail"
import ChangePassword from "./ChangePassword"

type FormData = {
  email: string
  password: string,
  confirmPassword: string
}

const ResetPassword = () => {

  const [isSettingPassword, setIsSettingPassword] = useState<boolean>(false);
  const [tokenToReset, setTokenToReset] = useState<string>('');
  const { control, handleSubmit, formState: { errors }, resetField } = useForm<FormData>({
    resolver: yupResolver(resetSchema)
  });
  console.log(errors)

  return (
    <>
      {!isSettingPassword ?
        <SendEmail
          goToChangePassword={setIsSettingPassword}
          setTokenToResetPassword={setTokenToReset} />
        :
        <ChangePassword token={tokenToReset}/>}
    </>


  )
}

export default ResetPassword