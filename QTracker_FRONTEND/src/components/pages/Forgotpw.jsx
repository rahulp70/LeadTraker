import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FaUser, FaLock } from "react-icons/fa";
<<<<<<< HEAD
import '../../App.css'
=======
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
import axios from 'axios';

const Forgotpw = () => {
    const [email, setemail] = useState('');
    const [randomCharacters, setRandomCharacters] = useState('');
    const [userInput, setUserInput] = useState('');

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        generateRandomCharacters();
    }, []);

    const generateRandomCharacters = () => {
        const characters = 'ABCDEFGHJKMNOPQRSTUVWXYZ0123456789abcdefghijkmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setRandomCharacters(result);
    };

    const handleConfirm = async(e) => {
        e.preventDefault();
        if (!email || !userInput) {
            enqueueSnackbar('Please fill both the fields!', { variant: 'error' });
        } else if (userInput !== randomCharacters) {
            enqueueSnackbar('Incorrect Captcha!', { variant: 'error' });
            setUserInput('');
        } else {
            try {
<<<<<<< HEAD
                const response = await axios.post('http://localhost:9000/employees/forgot-password', { email: email });
=======
                const response = await axios.post('http://localhost:9000/employees/forgot-password', { email: email });
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                if (response.status >= 200 && response.status < 300) {
                    enqueueSnackbar('Kindly check your email! We have sent you a link to reset your password.', { variant: 'success' });
                    navigate('/');
                } else {
                    enqueueSnackbar('Incorrect Email!', { variant: 'error' });
                    setemail('');
                    setUserInput('');
                }
            } catch (error) {
                console.error('Error during forgot password process:', error);
                enqueueSnackbar('Incorrect Email!', { variant: 'error' });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center bg-gray-100 justify-center">
            <div className='text-center my-20 px-48 py-12 bg-white overflow-hidden shadow-2xl rounded-lg border border-gray-200'>
                <h1 className='text-7xl font-extrabold'><span className='text-pink-600'>Q</span><span className='text-teal-600'>Trackr</span></h1>
                <br /><br />
                <h1 className='font-extrabold text-2xl'>Forgot Password?</h1>
                <br />
                <label htmlFor="captcha">Captcha</label>
<<<<<<< HEAD
                <p className='text-center w-full bg-black text-white p-2 rounded-md text-2xl overflow-hidden shadow-md outline-0 non-selectable'><strong>{randomCharacters}</strong></p>
=======
                <p className='text-center w-full bg-black text-white p-2 rounded-md text-2xl overflow-hidden shadow-md outline-0'><strong>{randomCharacters}</strong></p>
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                <br /><br />
                <div className='flex justify-center'>
                    <FaUser style={{ alignItems: 'center', marginTop: '3%' }} size={24} />
                    <input className='border ml-2 w-full border-gray-300 rounded-md p-2 overflow-hidden shadow-md outline-none' value={email} type="text" placeholder='Enter Email' onChange={(e) => setemail(e.target.value)} />
                </div>
                <br />
                <div className='flex'>
                    <FaLock style={{ alignItems: 'center', marginTop: '3%' }} size={24} />
                    <input className='border ml-2 w-full border-gray-300 rounded-md p-2 overflow-hidden shadow-md outline-none' value={userInput} type="text" placeholder='Enter Captcha' onChange={(e) => setUserInput(e.target.value)} />
                </div>
                <br />
                <button onClick={handleConfirm} className='py-1 text-center overflow-hidden shadow-md rounded-sm text-white px-6 bg-blue-600 hover:bg-blue-900'>Confirm</button>
            </div>
        </div>
    );
};

export default Forgotpw;