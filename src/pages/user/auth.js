import { navigate } from "gatsby"
import React from "react"
import { handleLogin } from "./services/auth"

const Authenticator = () => {
  const handleSubmit = () => handleLogin(() => navigate(`/user/profile`))

  return (
    <>
      <h1>Log in</h1>
      <button onClick={handleSubmit}>log in</button>
    </>
  )
}

export default Authenticator
