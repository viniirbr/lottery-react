import { axiosBase } from "api/AxiosConfig"
import Form from "components/Form/Form"
import Input from "components/UI/Input/Input"
import { FormEvent, useState } from "react"

const ResetPassword = () => {

  const [email, setEmail] = useState<string>('');

  const handleResetPassword = async (event: FormEvent) => {
      event.preventDefault();
      const response = await axiosBase.post('/reset', {
        "email":email
      })
      console.log(response)
  }

  return (
    <Form
      className=""
      handleSubmit={handleResetPassword}
      title="Reset password"
      submitButtonTitle="Send link"
      exitButtonTitle="Back"
      exitRoute="/">
      <Input
        label="Email"
        inputAttributes={{ type: 'email', id: 'email', placeholder: 'Email',
        value: email, onChange: (e) => setEmail(e.target.value)}} />
    </Form>
  )
}

export default ResetPassword