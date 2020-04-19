import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./AuthProvider";

const Login = ({ history }) => {
  const { login } = useContext(AuthContext);

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    login(email.value, password.value, history);
  }

  const handleToSignUpPage = () => {
    history.push("/signup");
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
        <button onClick={handleToSignUpPage}>Sign up</button>
      </form>
    </div>
  )
}

export default withRouter(Login);