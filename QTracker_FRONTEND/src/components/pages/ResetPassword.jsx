import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordAgain, setNewPasswordAgain] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [authlevel, setAuthlevel] = useState('');
    const [showPassword, setShowPassword] = useState(false); // For first field
    const [showPassword2, setShowPassword2] = useState(false); // For second field

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const emailFromURL = queryParams.get('email');
        const nameFromURL = queryParams.get('name');
        const authlevelFromURL = queryParams.get('authlevel');

        setEmail(emailFromURL);
        setName(nameFromURL);
        setAuthlevel(authlevelFromURL);
    }, [location.search, navigate, enqueueSnackbar]);

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleConfirm = async (e) => {
        e.preventDefault();

        if (newPassword !== newPasswordAgain) {
            enqueueSnackbar('Passwords do not match', { variant: 'error' });
            return;
        }

        if (newPassword.length <= 7) {
            enqueueSnackbar('Password should be at least 8 characters', { variant: 'error' });
            return;
        }

        if (!validatePassword(newPassword)) {
            enqueueSnackbar('Password must contain at least one capital letter, one number, and one special character', { variant: 'error' });
            return;
        }

        try {
<<<<<<< HEAD
            const response = await axios.post(`http://localhost:9000/employees/reset-password`, {
=======
            const response = await axios.post(`http://localhost:9000/employees/reset-password`, {
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                email,
                name,
                authlevel,
                newPassword,
                newPasswordAgain
            });

            if (response.status === 200) {
                enqueueSnackbar('Password set successfully!', { variant: 'success' });
                navigate('/'); // Redirect to home page or login page
            } else {
                enqueueSnackbar('Failed to Reset Password and Register User', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error during password reset and user registration:', error);
            enqueueSnackbar('An Error Occurred! Please Try Again', { variant: 'error' });
        }
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
                <h1 className="font-extrabold text-2xl">Set New Password</h1>
                <br />
                <br />
                <div className="flex relative w-full">
                    <FaLock style={{ alignItems: 'center', marginTop: '3%' }} size={24} />
                    <input
                        className="border ml-2 w-full border-gray-300 rounded-md p-2 pr-10 overflow-hidden shadow-md outline-none"
                        value={newPassword}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none"
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                    >
                        {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                    </button>
                </div>
                <br />
                <div className="flex relative w-full">
                    <FaLock style={{ alignItems: 'center', marginTop: '3%' }} size={24} />
                    <input
                        className="border ml-2 w-full border-gray-300 rounded-md p-2 pr-10 overflow-hidden shadow-md outline-none"
                        value={newPasswordAgain}
                        type={showPassword2 ? "text" : "password"}
                        placeholder="Re-Enter Password"
                        onChange={(e) => setNewPasswordAgain(e.target.value)}
                    />
                    <button
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none"
                        onClick={() => setShowPassword2(!showPassword2)}
                        type="button"
                    >
                        {showPassword2 ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                    </button>
                </div>
                <br />
                <br />
                <button
                    onClick={handleConfirm}
                    className="py-1 text-center overflow-hidden shadow-md rounded-sm text-white px-6 bg-blue-600 hover:bg-blue-900"
                >
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;
