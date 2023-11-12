import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { loginRoute } from "../utils/ApiRoutes";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "top-right",
    autoClost: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) navigate("/");
  }, []);
  const handleValidation = () => {
    const { password, username } = values;

    if (username.length === "") {
      toast.error("Username required.", toastOptions);
      console.log("useername");
      return false;
    } else if (password.length === "") {
      toast.error("Password required.", toastOptions);
      console.log("PASS length");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) toast.error(data.msg, toastOptions);

      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));

        navigate("/");
      }
    }
  };
  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />

            <h1>Hellow!</h1>
          </div>

          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            min="3"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            min="8"
          />

          <button type="submit">Login</button>
          <span>
            Don't Have an Account? <Link to="/register">Register It</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100 vh;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: gray;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 3rem;
    padding: 1rem 4rem;
    height: 550px;
  }
  input {
    padding: 9px;

    font-weight: bold;
    background-color: transparent;
    color: white;
    border: 0.1rem solid #ce353a;

    &:focus {
      border: 0.2rem solid #ce353a;
      outline: none;
    }
  }

  button {
    width: 50%;
    margin-left: 20%;
    font-weight: bold;
    font-family: "Courier New", Courier, monospace;
    font-size: 1rem;
    padding: 10px;
    cursor: pointer;
    border: none;
    border-radius: 4rem;

    text-transform: uppercase;
    transition: 0.4s ease-in-out;

    &:hover {
      background-color: black;
      color: white;
    }
  }
  span {
    color: white;
    text-transform: uppercase;

    a {
      color: red;
      text-transform: none;
      font-weight: bold;
      font-family: Arial, Helvetica, sans-serif;
      margin: 10px;
      &:hover {
        color: #4e0eff;
      }
    }
  }
`;
export default Login;
