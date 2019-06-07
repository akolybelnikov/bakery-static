import { navigate } from "gatsby"
import React from "react"
import { handleLogin } from "./services/auth"

const Login = () => {
  const handleSubmit = () => handleLogin(() => navigate(`/app/profile`))

  return (
    <>
      <h1>Log in</h1>
      <button onClick={handleSubmit}>log in</button>
    </>
  )
}

export default Login
