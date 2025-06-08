import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FaLock } from "react-icons/fa";
import axios from 'axios';

const ForgotResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordAgain, setNewPasswordAgain] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const emailFromURL = queryParams.get('EmpEmail');
        if (emailFromURL) {
            setEmail(emailFromURL);
        } else {
            enqueueSnackbar('Email parameter is missing in the URL', { variant: 'error' });
        }
    }, [location.search, enqueueSnackbar]);

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
        
        if (newPassword.length <= 7){
            enqueueSnackbar('Password should be atleast 8 characters', { variant: 'error' });
        }

        if (!validatePassword(newPassword)) {
            enqueueSnackbar('Password must contain at least one capital letter, one number, and one special character', { variant: 'error' });
            return;
        }
    
        const payload = {
            email,
            newPassword
        };
    
        try {
<<<<<<< HEAD
            const response = await axios.put(`http://localhost:9000/employees/update-password`, payload);
=======
            const response = await axios.put(`http://localhost:9000/employees/update-password`, payload);
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
    
            if (response.status === 200) {
                enqueueSnackbar('Password set successfully!', { variant: 'success' });
                navigate('/'); // Redirect to home page or login page
            } else {
                enqueueSnackbar('Failed to reset password', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error during password reset:', error);
            enqueueSnackbar('An error occurred! Please try again', { variant: 'error' });
        }
    };

    return (
        <div className="min-h-screen flex items-center bg-gray-100 justify-center">
            <div className='text-center my-20 px-48 py-12 bg-white overflow-hidden shadow-2xl rounded-lg border border-gray-200'>
                <h1 className='text-7xl font-extrabold'><span className='text-pink-600'>Q</span><span className='text-teal-600'>Trackr</span></h1>
                <br /><br />
                <h1 className='font-extrabold text-2xl'>Set New Password</h1>
                <br /><br />
                <div className='flex'>
                    <FaLock style={{ alignItems: 'center', marginTop: '3%' }} size={24} />
                    <input className='border ml-2 w-full border-gray-300 rounded-md p-2 overflow-hidden shadow-md outline-none' value={newPassword} type="password" placeholder='Enter Password' onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <br />
                <div className='flex'>
                    <FaLock style={{ alignItems: 'center', marginTop: '3%' }} size={24} />
                    <input className='border ml-2 w-full border-gray-300 rounded-md p-2 overflow-hidden shadow-md outline-none' value={newPasswordAgain} type="password" placeholder='Re-Enter Password' onChange={(e) => setNewPasswordAgain(e.target.value)} />
                </div>
                <br /><br />
                <button onClick={handleConfirm} className='py-1 text-center overflow-hidden shadow-md rounded-sm text-white px-6 bg-blue-600 hover:bg-blue-900'>Confirm</button>
            </div>
        </div>
    );
};

export default ForgotResetPassword;
