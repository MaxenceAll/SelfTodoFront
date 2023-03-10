import { useState } from "react";
import { setCookie, useCookies } from "react-cookie";

function Auth() {
  const [error, setError] = useState();
  const [isLoggedin, setIsLoggedin] = useState();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmePassword] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  console.log(cookies)

  const viewLogin = (status) => {
    setError(null);
    setIsLoggedin(status);
  };

  const handleSubmit = async (e, route) => {
    e.preventDefault();
    if (!isLoggedin && password !== confirmPassword) {
      setError("Passwords are not matching !");
      return;
    }
    const response = await fetch(
      `${process.env.REACT_APP_SERVERURL}/${route}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    console.log(data)
    if(data?.detail) {
      setError(data?.detail);
    }else{
      setCookie('Email', data.email)
      setCookie('AuthToken', data.token)
      window.location.reload()
    }

  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLoggedin ? "Please log in" : "Please sign up!"}</h2>
          <input
            type="email"
            placeholder="Put your email here"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your password here"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLoggedin && (
            <input
              type="password"
              placeholder="Confirm your password here"
              onChange={(e) => setConfirmePassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLoggedin ? "login" : "signup")}
          />
          {error && <p className="error">{error}</p>}
        </form>

        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{ backgroundColor: !isLoggedin ? "gray" : "white" }}
          >
            Sign up
          </button>

          <button
            onClick={() => viewLogin(true)}
            style={{ backgroundColor: !isLoggedin ? "white" : "gray" }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
