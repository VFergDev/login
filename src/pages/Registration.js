import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Registration = () => {
  const [phoneReg, setPhoneReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(""); // Added registration status state

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const register = async () => {
    try {
      const response = await Axios.post("http://localhost:3001/register", {
        phone: phoneReg,
        email: emailReg,
        password: passwordReg,
      });
      console.log(response);
      setRegistrationStatus("Registration complete");

      // Redirect to /main after successful registration
      navigate("/main");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      phone: phone,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].phone);

        // Redirect to /main after successful login
        navigate("/main");
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].phone);
      }
    });
  }, []);

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Phone Number</label>
        <input
          type="tel"
          onChange={(e) => {
            setPhoneReg(e.target.value);
          }}
        />
        <label>Email</label>
        <input
          type="email"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button onClick={register}> Register </button>
        <p style={{ color: "green" }}>{registrationStatus}</p> {/* Display registration status */}
      </div>

      <div className="login">
        <h1>Login</h1>
        <input
          type="tel"
          placeholder="Phone Number..."
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={login}> Login </button>
      </div>

      <h1>{loginStatus}</h1>
    </div>
  );
};

export default Registration;
