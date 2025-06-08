import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { FaUserCircle, FaTrash } from "react-icons/fa";
import { SiPivotaltracker } from "react-icons/si";
import { MdLogout, MdEditSquare, MdSearch } from "react-icons/md";

import loram from "../Assets/loram.png";
import Q from "../Assets/Qtrackr.png";

const Admin = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [showLogout, setshowlogout] = useState(false);

    const email = localStorage.getItem('email');
    if (!email){
        enqueueSnackbar('Login to Navigate!',{variant:'error'});
        navigate('/');
    }

    const logout = (e) => {
        e.preventDefault();
        setshowlogout(!showLogout);
    };
    const logoutUser = (e) => {
        e.preventDefault();
        enqueueSnackbar('Successfully Logged out!', { variant: 'success'});
        localStorage.removeItem('email');
        navigate('/');
    };

    const [EmpFirstName, setEmpFirstName] = useState('');
    const [EmpLastName, setEmpLastName] = useState('');
    const [EmpPhone, setEmpPhone] = useState('');
    const [EmpEmail, setEmpEmail] = useState('');
    const [EmpAuthLevel, setEmpAuthLevel] = useState('');
    const [EmpGroups, setEmpGroups] = useState('');
    


    
    const [editingEmployee, setEditingEmployee] = useState(null);
    const editEmployee = (id) => {
        const employeeToEdit = employees.find(employee => employee.id === id);
        setEditingEmployee(employeeToEdit);
    };
    
    useEffect(() => {
        if (editingEmployee) {
            setEmpFirstName(editingEmployee.EmpFirstName);
            setEmpLastName(editingEmployee.EmpLastName);
            setEmpPhone(editingEmployee.EmpPhone);
            setEmpEmail(editingEmployee.EmpEmail);
            setEmpAuthLevel(editingEmployee.EmpAuthLevel);
            setEmpGroups(editingEmployee.EmpGroups);
        }
    }, [editingEmployee]);

    const Submit = async (e) => {
        e.preventDefault();
        if (!EmpFirstName || !EmpLastName || !EmpPhone || !EmpEmail || !EmpAuthLevel) {
            enqueueSnackbar('Please fill all the fields!', { variant: 'error' });
        } else {
            try {
                if (editingEmployee === null) {
<<<<<<< HEAD
                    const response = await axios.post('http://localhost:9000/employees', {
=======
                    const response = await axios.post('http://localhost:9000/employees', {
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                        EmpFirstName, 
                        EmpLastName,
                        EmpPhone,
                        EmpEmail,
                        EmpAuthLevel,
                        EmpGroups
                    });
    
                    if (response.status >= 200 && response.status < 300) {
                        enqueueSnackbar('Employee Added Successfully!', { variant: 'success' });
                        setEmpFirstName('');
                        setEmpLastName('');
                        setEmpPhone('');
                        setEmpEmail('');
                        setEmpAuthLevel('');
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    } else {
                        enqueueSnackbar('Please Fill Everything Correctly!', { variant: 'error' });
                    }
                } else {
<<<<<<< HEAD
                    const response = await axios.put(`http://localhost:9000/employees/${editingEmployee.id}`, {
=======
                    const response = await axios.put(`http://localhost:9000/employees/${editingEmployee.id}`, {
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                        EmpFirstName, 
                        EmpLastName,
                        EmpPhone,
                        EmpEmail,
                        EmpAuthLevel,
                        EmpGroups
                    });
    
                    if (response.status >= 200 && response.status < 300) {
                        enqueueSnackbar('Employee Details Updated Successfully!', { variant: 'success' });
                        setEditingEmployee(null);
                        setEmpFirstName('');
                        setEmpLastName('');
                        setEmpPhone('');
                        setEmpEmail('');
                        setEmpAuthLevel('');
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    } else {
                        enqueueSnackbar('Please Fill Everything Correctly!', { variant: 'error' });
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                enqueueSnackbar('Connection Error!', { variant: 'error' });
            }
        }
    };

    /*const Ref = (e) => {
        e.preventDefault();
        if (EmpAuthLevel === 'L3'){
            setshowGroups(true);
        }
        else{
            setshowGroups(false);
        }
    };*/

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setIsEditing(!!editingEmployee);
    }, [editingEmployee]);

    const Cancel = (e) => {
        e.preventDefault();
        if(EmpFirstName !== null || EmpLastName !== null || EmpPhone !== null || EmpEmail !== null || EmpAuthLevel !== null || EmpGroups !== null){
            window.location.reload();
        }
        else{
            setEmpFirstName('');
            setEmpLastName('');
            setEmpPhone('');
            setEmpEmail('');
            setEmpAuthLevel('');
            setEmpGroups('');
            setIsEditing(false);
        }
    };

    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
<<<<<<< HEAD
                const response = await axios.get('http://localhost:9000/employees');
=======
                const response = await axios.get('http://localhost:9000/employees');
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                setEmployees(response.data);
                setFilteredEmployees(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchEmployees();
    }, []);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        filterEmployees(e.target.value);
    };

    // Filter employees based on search query
    const filterEmployees = (query) => {
        const filtered = employees.filter(employee =>
            employee.EmpFirstName.toLowerCase().includes(query.toLowerCase()) ||
            employee.EmpLastName.toLowerCase().includes(query.toLowerCase()) ||
            employee.EmpPhone.includes(query) ||
            employee.EmpEmail.toLowerCase().includes(query.toLowerCase()) ||
            employee.EmpAuthLevel.toLowerCase().includes(query.toLowerCase()) ||
            employee.EmpGroups.includes(query)
        );
        setFilteredEmployees(filtered);
    };

    const deleteEmployee = async (id) => {
        try {
<<<<<<< HEAD
            const response = await axios.delete(`http://localhost:9000/employees/${id}`);
=======
            const response = await axios.delete(`http://localhost:9000/employees/${id}`);
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
            if (response.status === 200) {
                enqueueSnackbar('Employee deleted successfully!', { variant: 'success' });
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                enqueueSnackbar('Failed to delete employee!', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error:', error);
            enqueueSnackbar('Connection Error!', { variant: 'error' });
        }
    };


    const [GroupNames, setGroupNames] = useState([]);
    useEffect(() => {
        const fetchGroupName = async () => {
            try {
<<<<<<< HEAD
                const response = await axios.get('http://localhost:9000/groups');
=======
                const response = await axios.get('http://localhost:9000/groups');
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                if (response.status === 200) {
                    setGroupNames(response.data);
                } else {
                    enqueueSnackbar('Failed to fetch GroupNames', { variant: 'error' });
                }
            } catch (error) {
                console.error('Error fetching GroupNames:', error);
                enqueueSnackbar('Connection Error!', { variant: 'error' });
            }
        };
        fetchGroupName();
    }, [enqueueSnackbar]);

    const dash = (e) => {
        e.preventDefault();
        navigate('/dashboard_1')
    }

    return (
        <>
            <div className='fixed flex justify-end  overflow-hidden z-10 py-3 w-full text-white bg-white'>
                <div className='cursor-pointer mr-4 bg-black'>
                    <FaUserCircle onClick={logout} size={28}/>
                </div>
                {showLogout && (
                <>
                    <div className='fixed text-black text-center px-2 w-1/12 shadow-2xl overflow-hidden bg-white border border-gray-400 mr-1 mt-10 z-50 justify-end rounded-lg'>
                        <h1 className='px-6 py-2 rounded-md my-1'>Admin</h1>
                        <h1 onClick={logoutUser} className='flex px-6 py-2 rounded-md my-1 cursor-pointer hover:bg-black hover:text-white'><MdLogout size={24}/> Logout</h1>
                    </div>
                </>
                )}
            </div>

            <div className='fixed z-20 flex shadow-2xl overflow-hidden flex-col min-h-screen w-1/6 bg-black text-white' style={{width:"15%"}}>
                <img className='p-4' src={Q} alt="Q-Trackr Logo" />
                <h1 className='flex grid-cols-2 p-2 cursor-pointer bg-white mx-3 rounded-md my-3 text-black'><SiPivotaltracker size={24}/>&nbsp;Manager Users</h1>
                <h1 onClick={dash} className='flex grid-cols-2 p-2 cursor-pointer hover:bg-white mx-3 rounded-md my-3 hover:text-black'><SiPivotaltracker size={24}/>&nbsp;View Dashboard</h1>
                <img className='p-4 mt-auto bg-white' src={loram} alt="Loram Logo" />
            </div>

            <div className='ml-80 p-4 bg-white  border border-gray-200 relative overflow-hidden shadow-lg w-3/4 justify-center top-24'>
                <h1 className='text-2xl mb-2 font-semibold'>{isEditing ? 'Edit Employee Details' : 'Add Employee'}</h1><hr /><hr /><br />
                <div className='flex justify-start w-full'>
                    <div className='mx-4 w-1/3'>
                        <label className='block' htmlFor="Name">First Name:</label>
                        <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="text" placeholder='Enter First Name' value={EmpFirstName} onChange={(e) => setEmpFirstName(e.target.value)} />
                    </div>
                    <div className='mx-4 w-1/3'>
                        <label className='block' htmlFor="Name">Last Name:</label>
                        <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="text" placeholder='Enter Last Name' value={EmpLastName} onChange={(e) => setEmpLastName(e.target.value)} />
                    </div>
                    <div className='mx-4 w-1/3'>
                        <label className='block' htmlFor="Name">Mobile Number:</label>
                        <PhoneInput country={'us'} value={EmpPhone} onChange={(value) => setEmpPhone(value)} inputProps={{ required: true, className: 'w-4/5 border border-gray-400 outline-0 rounded overflow-hidden shadow-md ml-9 p-2', style: { fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" } }} />
                    </div>
                </div>
                <br />
                <div className='flex justify-start w-full'>
                    <div className='mx-4 w-1/3'>
                        <label className='block' htmlFor="email">Email ID:</label>
                        <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="email" placeholder='Enter Email ID' value={EmpEmail} onChange={(e) => setEmpEmail(e.target.value)} />
                    </div>
                    <div className='mx-4 w-1/3'>
                        <label className='block' htmlFor="Name">Authorization Level:</label>
                        <select className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' value={EmpAuthLevel} onChange={(e) => setEmpAuthLevel(e.target.value)} name="auth" id="auth">
                            <option value="" disabled>Select Authorization Level</option>
                            <option value="L1">L1</option>
                            <option value="L2">L2</option>
                            <option value="L3">L3</option>
                        </select>
                    </div>
                    <div className='mx-4 w-1/3'>
                    {EmpAuthLevel === 'L3' && (
                        <div className=' w-full'>
                            <label className='block' htmlFor="auth">Assign Group(s):</label>
                            <select className='border w-11/12 border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' value={EmpGroups} onChange={(e) => setEmpGroups(e.target.value)} name="auth" id="auth">
                                <option value="" disabled>Assign Group(s)</option>
                                {GroupNames.map(group => (
                                    <option key={group.id} value={group.newGroupName}>{group.newGroupName}</option>
                                ))}
                            </select>
                        </div>
                        
                    )} </div>

                </div>
                <div className='flex mt-14 justify-center'>
                    <button onClick={Submit} className='mx-2 py-2 px-5 bg-blue-600 hover:bg-blue-900 overflow-hidden shadow-md text-white rounded-sm'>{isEditing ? 'Update' : 'Submit'}</button>
                    <button onClick={Cancel} className='mx-2 py-2 px-5 bg-black hover:bg-white hover:text-black border border-black overflow-hidden shadow-md text-white rounded-sm'>Cancel</button>
                </div>
                <br />
            </div>
            <br /><br />
            <div className='ml-80 p-4 bg-white  border border-gray-200 relative overflow-hidden shadow-lg w-3/4 justify-center mt-24'>
                <div className='flex'>
                <h1 className='text-2xl w-4/5 mb-2 font-semibold'>Employee List</h1>
                <div className='flex w-1/5'>
                    <MdSearch size={40}/>
                    <input type="text" value={searchQuery} onChange={handleSearchInputChange} className='border w-full border-gray-300 rounded-md mb-2 p-2 overflow-hidden shadow-md outline-none' placeholder='Search' />
                </div>
                </div>  
                <hr /><hr /><br />
                <div className="max-h-[500px] overflow-auto">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-black sticky top-0">
                    <tr className='text-white'>
                        <th className="px-6 py-3 text-center border text-sm font-medium uppercase tracking-wider">#</th>
                        <th className="px-6 py-3 text-center border text-sm font-medium uppercase tracking-wider">First Name</th>
                        <th className="px-6 py-3 text-center border text-sm font-medium uppercase tracking-wider">Last Name</th>
                        <th className="px-6 py-3 text-center border text-sm font-medium uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-center border text-sm font-medium uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-center border text-sm font-medium uppercase tracking-wider">Auth Level</th>
                        <th className="px-6 py-3 text-center border text-sm font-medium uppercase tracking-wider">Group</th>
                        <th className="px-6 py-3 text-center border text-sm font-medium uppercase tracking-wider">Edit</th>
                        <th className="px-6 py-3 text-center border text-sm font-medium uppercase tracking-wider"><FaTrash size={18}/></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map(employee => (
                        <tr className='border' key={employee.id}>
                            <td className="px-6 text-center py-2">{employee.id}</td>
                            <td className="px-6 text-center py-2">{employee.EmpFirstName}</td>
                            <td className="px-6 text-center py-2">{employee.EmpLastName}</td>
                            <td className="px-6 text-center py-2">{employee.EmpPhone}</td>
                            <td className="px-6 text-center py-2">{employee.EmpEmail}</td>
                            <td className="px-6 text-center py-2">{employee.EmpAuthLevel}</td>
                            <td className="px-6 text-center py-2">{employee.EmpGroups}</td>
                            <td onClick={() => editEmployee(employee.id)} className="px-6 hover:bg-black cursor-pointer hover:text-white text-center py-2"><MdEditSquare size={20}/></td>
                            <td onClick={() => deleteEmployee(employee.id)} className="px-6 hover:bg-black cursor-pointer hover:text-white text-center py-2"><FaTrash size={18}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            </div> 
            <br /><br />
        </>
    );
};

export default Admin;
