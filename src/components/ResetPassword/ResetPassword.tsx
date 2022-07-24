import { axiosBase } from "api/AxiosConfig"
import Form from "components/Form/Form"
import Input from "components/UI/Input/Input"
import { FormEvent, useState } from "react"

const ResetPassword = () => {

  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResetPassword = async (event: FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const response = await axiosBase.post('/reset', {
        "email": email
      })
    } catch(e) {

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form
      className=""
      handleSubmit={handleResetPassword}
      title="Reset password"
      submitButtonTitle="Send link"
      exitButtonTitle="Back"
      exitRoute="/"
      isLoading={isLoading}>
      <Input
        label="Email"
        inputAttributes={{
          type: 'email', id: 'email', placeholder: 'Email',
          value: email, onChange: (e) => setEmail(e.target.value)
        }} />
    </Form>
  )
}

export default ResetPassword