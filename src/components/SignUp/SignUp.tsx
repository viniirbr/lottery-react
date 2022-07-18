import SignInWrapper from "components/SignIn/SignInWrapper"
import Input from "components/UI/Input/Input"
import { FormEvent } from "react"

const SignUp = () => {

  const handleSignUpSubmit = (event: FormEvent) => {
        
  }
  return (
    <SignInWrapper
      className=""
      handleSubmit={handleSignUpSubmit}
      title="Registration"
      submitButtonTitle="Register"
      exitButtonTitle="Back"
      exitRoute="/">
      <Input
        label="Name"
        inputAttributes={{ type: 'name', id: 'name', placeholder: 'Name' }} />
      <Input
        label="Email"
        inputAttributes={{ type: 'email', id: 'email', placeholder: 'Email' }} />
      <Input
        label="Password"
        inputAttributes={{ type: 'password', id: 'password', placeholder: 'Password' }} />
    </SignInWrapper>
  )
}

export default SignUp