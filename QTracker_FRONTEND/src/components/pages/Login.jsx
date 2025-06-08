<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible); // Toggle the password visibility
  };

  const handleLogin = async () => {
    if (!email || !password) {
      enqueueSnackbar("Please fill all the fields!", { variant: "error" });
    } else {
      try {
        const response = await axios.post(
          "http://localhost:9000/employees/login",
          { email, password }
        );
        if (response.status >= 200 && response.status < 300) {
          const { dashboardUrl, name, token } = response.data;
          const now = new Date().getTime(); // Store current timestamp
          localStorage.setItem("email", email);
          localStorage.setItem("name", name);
          localStorage.setItem("token", token);
          localStorage.setItem("lastActivity", now); // Save last activity timestamp

          enqueueSnackbar("Logged in successfully!", { variant: "success" });
          console.log(dashboardUrl);
          navigate(dashboardUrl);
        } else {
          enqueueSnackbar("Incorrect Login Credentials!", { variant: "error" });
          setEmail("");
          setPassword("");
        }
      } catch (error) {
        console.error("Error during login:", error);
        if (error.response && error.response.status === 401) {
          enqueueSnackbar("Incorrect Login Credentials!", { variant: "error" });
        } else {
          enqueueSnackbar("An Error Occurred During Login!", {
            variant: "error",
          });
        }
      }
    }
  };

  const forgotpw = () => {
    navigate("/forgotpw");
  };

  return (
    <div className="min-h-screen flex items-center bg-gray-100 justify-center">
      <div className="text-center my-20 px-48 py-12 bg-white overflow-hidden shadow-2xl rounded-lg border border-gray-200">
        <h1 className="text-7xl font-extrabold">
          <span className="text-pink-600">Q</span>
          <span className="text-teal-600">Trackr</span>
        </h1>
        <br />
        <br />
        <h1 className="font-extrabold text-2xl">Login</h1>
        <br />
        <div className="flex justify-center">
          <FaUser style={{ alignItems: "center", marginTop: "3%" }} size={24} />
          <input
            className="border ml-2 w-full border-gray-300 rounded-md p-2 overflow-hidden shadow-md outline-none"
            value={email}
            type="text"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            autocomplete="off"
          />
        </div>

        <br />

        <div className="flex items-center relative">
          <FaLock style={{ alignItems: "center", marginTop: "3%" }} size={24} />
          <input
            className="border ml-2 w-full border-gray-300 rounded-md p-2 overflow-hidden shadow-md outline-none"
            value={password}
            type={passwordVisible ? "text" : "password"} // Toggle input type
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            autocomplete="off"
          />
          <div
            className="absolute right-4 cursor-pointer"
            onClick={togglePassword}
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            {passwordVisible ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </div>
        </div>
        <h1
          onClick={forgotpw}
          className="text-right mt-2 text-sm underline text-blue-900 hover:text-red-600 cursor-pointer"
        >
          Forgot Password?
        </h1>
        <br />
        <button
          onClick={handleLogin}
          className="py-1 text-center mt-2 overflow-hidden shadow-md rounded-sm text-white px-6 bg-blue-600 hover:bg-blue-900"
        >
          Login
        </button>
      </div>
    </div>
  );
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); // State for toggling password visibility
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible); // Toggle the password visibility
    };

    const handleLogin = async () => {
        if (!email || !password) {
            enqueueSnackbar('Please fill all the fields!', { variant: 'error' });
        } else {
            try {
                const response = await axios.post('http://localhost:9000/employees/login', { email, password });
                if (response.status >= 200 && response.status < 300) {
                    const { dashboardUrl, name, token } = response.data;
                    const now = new Date().getTime(); // Store current timestamp
                    localStorage.setItem('email', email);
                    localStorage.setItem('name', name);
                    localStorage.setItem('token', token);
                    localStorage.setItem('lastActivity', now); // Save last activity timestamp

                    enqueueSnackbar('Logged in successfully!', { variant: 'success' });
                    navigate(dashboardUrl);
                } else {
                    enqueueSnackbar('Incorrect Login Credentials!', { variant: 'error' });
                    setEmail('');
                    setPassword('');
                }
            } catch (error) {
                console.error('Error during login:', error);
                if (error.response && error.response.status === 401) {
                    enqueueSnackbar('Incorrect Login Credentials!', { variant: 'error' });
                } else {
                    enqueueSnackbar('An Error Occurred During Login!', { variant: 'error' });
                }
            }
        }
    };

    const forgotpw = () => {
        navigate('/forgotpw');
    };

    return (
        <div className="min-h-screen flex items-center bg-gray-100 justify-center">
            <div className="text-center my-20 px-48 py-12 bg-white overflow-hidden shadow-2xl rounded-lg border border-gray-200">
                <h1 className="text-7xl font-extrabold">
                    <span className="text-pink-600">Q</span>
                    <span className="text-teal-600">Trackr</span>
                </h1>
                <br />
                <br />
                <h1 className="font-extrabold text-2xl">Login</h1>
                <br />
                <br />
                <div className="flex justify-center">
                    <FaUser style={{ alignItems: 'center', marginTop: '3%' }} size={24} />
                    <input
                        className="border ml-2 w-full border-gray-300 rounded-md p-2 overflow-hidden shadow-md outline-none"
                        value={email}
                        type="text"
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                        autocomplete="off"
                    />
                </div>
                <br />
                <div className="flex items-center relative">
                    <FaLock style={{ alignItems: 'center', marginTop: '3%' }} size={24} />
                    <input
                        className="border ml-2 w-full border-gray-300 rounded-md p-2 overflow-hidden shadow-md outline-none"
                        value={password}
                        type={passwordVisible ? "text" : "password"} // Toggle input type
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                        autocomplete="off"
                    />
                    <div
                        className="absolute right-4 cursor-pointer"
                        onClick={togglePassword}
                        style={{ top: '50%', transform: 'translateY(-50%)' }}
                    >
                        {passwordVisible ? (
                            <FaEye size={20} />
                        ) : (
                            <FaEyeSlash size={20} />
                        )}
                    </div>
                </div>
                <h1
                    onClick={forgotpw}
                    className="text-right mt-2 text-sm underline text-blue-900 hover:text-red-600 cursor-pointer"
                >
                    Forgot Password?
                </h1>
                <br />
                <br />
                <button
                    onClick={handleLogin}
                    className="py-1 text-center overflow-hidden shadow-md rounded-sm text-white px-6 bg-blue-600 hover:bg-blue-900"
                >
                    Login
                </button>
            </div>
        </div>
    );
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
};

export default Login;
