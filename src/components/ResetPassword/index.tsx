import { useState } from "react"
import SendEmail from "./SendEmail"
import ChangePassword from "./ChangePassword"

const ResetPassword = () => {

  const [isSettingPassword, setIsSettingPassword] = useState<boolean>(false);
  const [tokenToReset, setTokenToReset] = useState<string>('');

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