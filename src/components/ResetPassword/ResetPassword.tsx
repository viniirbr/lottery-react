import Form from "components/Form/Form"
import Input from "components/UI/Input/Input"
import { FormEvent } from "react"

const ResetPassword = () => {

  const handleSignUpSubmit = (event: FormEvent) => {
        
  }

  return (
    <Form
      className=""
      handleSubmit={handleSignUpSubmit}
      title="Reset password"
      submitButtonTitle="Send link"
      exitButtonTitle="Back"
      exitRoute="/">
      <Input
        label="Email"
        inputAttributes={{ type: 'email', id: 'email', placeholder: 'Email' }} />
    </Form>
  )
}

export default ResetPassword