import React, { useState,useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';

import { IoIosArrowDown, IoIosArrowUp, IoIosMail, IoIosPeople } from "react-icons/io";
import { FaUserCircle, FaTrash } from "react-icons/fa";
import { SiPivotaltracker } from "react-icons/si";
import { MdDashboard, MdContacts, MdLogout, MdCategory, MdPending, MdGroupAdd, MdEditSquare } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { MdFolderCopy } from "react-icons/md";
import { FaServicestack } from "react-icons/fa6";
import { RiMastercardFill } from "react-icons/ri";
import { DiOpensource } from "react-icons/di";

import loram from "../../Assets/loram.png";
import Q from "../../Assets/Qtrackr.png";
import checkSessionValidity from "../../CheckSessionValidity";
import ConfirmationModal from './ConfirmationModal';


const AddGroup = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const token = localStorage.getItem('token');
    if (!token){
        enqueueSnackbar('Login to Navigate!',{variant:'error'});
        navigate('/');
    }

    const [leadTracker, setLeadTracker] = useState(false);
    const [masters, setMasters] = useState(true);
    const [Contact, setshowcontact] = useState(false);
    const [showLogout, setshowlogout] = useState(false);

    const toggleLeadTracker = (e) => {
        e.preventDefault();
        setLeadTracker(!leadTracker);
        setMasters(false);
        setshowcontact(false);
    };

    const toggleMasters = (e) => {
        e.preventDefault();
        setMasters(!masters);
        setshowcontact(false);
        setLeadTracker(false);
    };


    const toggleContact = (e) => {
        e.preventDefault();
        setshowcontact(!Contact);
        setLeadTracker(false);
        setMasters(false);
    };

    const sendEmail = (e) => {
        e.preventDefault();
        window.location.href = 'mailto:info@dext.site?subject=Contact%20Us&body=Hello%2C%0D%0A%0D%0A';
    };

    const addLead = (e) => {
        e.preventDefault();
        navigate('/addlead_1');
    };
    const dash = (e) => {
        e.preventDefault();
        navigate('/dashboard_1');
    };
    const leadReport = (e) => {
        e.preventDefault();
        navigate('/leadreport_1');
    };
    const NavEmployees = (e) => {
        e.preventDefault();
        navigate('/employees_1');
    };
    const NavServiceType = (e) => {
        e.preventDefault();
        navigate('/service_type_1');
    };
    const NavLeadType = (e) => {
        e.preventDefault();
        navigate('/lead_type_1');
    };
    const NavStatus = (e) => {
        e.preventDefault();
        navigate('/status_1');
    };
    const NavGroupName = (e) => {
        e.preventDefault();
        navigate('/source_1');
    };
    const NavClientMaster = (e) => {
        e.preventDefault();
        navigate('/client_master_1');
    };
    const NavAddGrp = (e) => {
        e.preventDefault();
        navigate('/add_group_1');
    };

    const logout = (e) => {
        e.preventDefault();
        setshowlogout(!showLogout);
    };
    const logoutUser = (e) => {
        e.preventDefault();
        enqueueSnackbar('Successfully Logged out!', { variant: 'success'});
        localStorage.removeItem('token');
        navigate('/');
    };

    const [newGroupName, setNewGroupName] = useState('');
    const [editingGroupNameId, setEditingGroupNameId] = useState(null);
    const [GroupNames, setGroupNames] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groupToDelete, setGroupToDelete] = useState(null);

      
    const handleVisibilityChange = useCallback(() => {
        if (!document.hidden) { // Fires only when the tab becomes visible
            const isSessionValid = checkSessionValidity();
            if (!isSessionValid) {
                navigate('/login'); // Redirect to login if session is invalid
            }
        }
    }, [navigate]);

    useEffect(() => {
        // Check session validity on component mount
        const isSessionValid = checkSessionValidity();
        if (!isSessionValid) {
            navigate('/login');
        }

        // Add event listener for visibility change
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Cleanup listener on unmount
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [handleVisibilityChange,navigate]);



    
    const Submit = async (e) => {
        e.preventDefault();
        if (!newGroupName) {
            enqueueSnackbar('Please fill all the fields!', { variant: 'error' });
        } else {
            try {
                if (!editingGroupNameId) {
<<<<<<< HEAD
                    const response = await axios.post('http://localhost:9000/groups', {
=======
                    const response = await axios.post('http://localhost:9000/groups', {
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                        name: newGroupName
                    });
    
                    if (response.status >= 200 && response.status < 300) {
                        enqueueSnackbar('GroupName Added Successfully!', { variant: 'success' });
                        setNewGroupName('');
                        setGroupNames([...GroupNames, response.data]); // Add the new group to the state
                    } else {
                        enqueueSnackbar('Failed to add GroupName', { variant: 'error' });
                    }
                } else {
<<<<<<< HEAD
                    const response = await axios.put(`http://localhost:9000/groups/${editingGroupNameId}`, {
=======
                    const response = await axios.put(`http://localhost:9000/groups/${editingGroupNameId}`, {
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                        name: newGroupName
                    });
    
                    if (response.status >= 200 && response.status < 300) {
                        enqueueSnackbar('GroupName Updated Successfully!', { variant: 'success' });
                        setNewGroupName('');
                        setEditingGroupNameId(null);
                        setGroupNames(GroupNames.map(group => 
                            group.id === editingGroupNameId ? response.data : group
                        ));
                    } else {
                        enqueueSnackbar('Failed to update GroupName', { variant: 'error' });
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                enqueueSnackbar('Connection Error!', { variant: 'error' });
                setNewGroupName('');
            }
        }
    };
    
    const Cancel = (e) => {
        e.preventDefault();
        setNewGroupName('');
        setEditingGroupNameId(false);
    };
    
    const editGroupName = (id, GroupName) => {
        setEditingGroupNameId(id);
        setNewGroupName(GroupName.newGroupName);
    };
    
    useEffect(() => {
        const fetchGroupNames = async () => {
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
        fetchGroupNames();
    }, [enqueueSnackbar]);
    
    const deleteGroupName = async (id) => {
        try {
<<<<<<< HEAD
            const response = await axios.delete(`http://localhost:9000/groups/${id}`);
=======
            const response = await axios.delete(`http://localhost:9000/groups/${id}`);
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
            if (response.status >= 200 && response.status < 300) {
                enqueueSnackbar('Group Name Deleted Successfully!', { variant: 'success' });
                setGroupNames(GroupNames.filter(group => group.id !== id));
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                enqueueSnackbar('Failed to delete Group Name', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error:', error);
            enqueueSnackbar('Connection Error!', { variant: 'error' });
        }
    };

    const name = localStorage.getItem('name');

    const openDeleteModal = (id) => {
        setGroupToDelete(id);
        setIsModalOpen(true);
    };
    
    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setGroupToDelete(null);
    };
    
    const confirmDelete = async () => {
        if (groupToDelete) {
            await deleteGroupName(groupToDelete);  // Call your existing delete function
        }
        closeDeleteModal();
    };
    

    return (
        <>

        
        <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
            />
            <div className='fixed flex justify-end z-10 py-3 w-full  overflow-hidden text-white '>
                <div className='cursor-pointer mr-4 bg-black'>
                    <FaUserCircle onClick={logout} size={28} />
                </div>
                {showLogout && (
                    <>
                        <div className='fixed text-black text-center px-2 w-1/12 bg-white border border-gray-400 mr-1 shadow-2xl overflow-hidden mt-10 z-50 justify-end rounded-lg'>
                            <h1 className='px-6 py-2 rounded-md my-1'>{name}</h1>
                            <h1 onClick={logoutUser} className='flex px-6 py-2 rounded-md my-1 cursor-pointer hover:bg-black hover:text-white'><MdLogout size={24} /> Logout</h1>
                        </div>
                    </>
                )}
            </div>

            <div className='fixed z-20 flex flex-col min-h-screen w-1/6 shadow-2xl overflow-hidden bg-black text-white' style={{ width: "15%" }}>
    <img className='p-4' src={Q} alt="Q-Trackr Logo" />

    {/* Lead Tracker */}
    <h1
        onClick={toggleLeadTracker}
        className='flex items-center justify-between p-2 cursor-pointer hover:bg-white mx-3 rounded-md my-3 hover:text-black'
    >
        <span className='flex items-center'>
            <SiPivotaltracker size={24} />
            &nbsp;Lead Tracker
        </span>
        {leadTracker ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
    </h1>

    {leadTracker && (
        <div className='ml-3'>
            <h1 onClick={dash} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'>
                <MdDashboard size={24} />
                &nbsp;Dashboard
            </h1>
            <h1 onClick={addLead} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'>
                <MdAddBox size={24} />
                &nbsp;Add Lead
            </h1>
            <h1 onClick={leadReport} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'>
                <BiSolidReport size={24} />
                &nbsp;Lead Reports
            </h1>
        </div>
    )}

    {/* Masters */}
    <h1
        onClick={toggleMasters}
        className='flex items-center justify-between p-2 cursor-pointer bg-white mx-3 rounded-md my-2 text-black'
    >
        <span className='flex items-center'>
            <MdFolderCopy size={24} />
            &nbsp;Masters
        </span>
        {masters ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
    </h1>

    {masters && (
        <div className='ml-3'>
            <h1 onClick={NavEmployees} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'>
                <IoIosPeople size={24} />
                &nbsp;Employees
            </h1>
            <h1 onClick={NavServiceType} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'>
                <FaServicestack size={24} />
                &nbsp;Service Type
            </h1>
            <h1 onClick={NavLeadType} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'>
                <MdCategory size={24} />
                &nbsp;Lead Type
            </h1>
            <h1 onClick={NavStatus} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'>
                <MdPending size={24} />
                &nbsp;Status
            </h1>
            <h1 onClick={NavGroupName} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'>
                <DiOpensource size={24} />
                &nbsp;Source
            </h1>
            <h1 onClick={NavClientMaster} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'>
                <RiMastercardFill size={24} />
                &nbsp;Client Master
            </h1>
            <h1 onClick={NavAddGrp} className='p-1 cursor-pointer bg-white mx-3 flex rounded-md mb-1 text-black'>
                <MdGroupAdd size={24} />
                &nbsp;Add Group
            </h1>
        </div>
    )}

    {/* Contact Us */}
    <h1
        onClick={toggleContact}
        className='flex items-center justify-between p-2 cursor-pointer hover:bg-white mx-3 rounded-md my-2 hover:text-black'
    >
        <span className='flex items-center'>
            <MdContacts size={24} />
            &nbsp;Contact Us
        </span>
        {Contact ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
    </h1>

    {Contact && (
        <div className='ml-3'>
            <h1 onClick={sendEmail} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md hover:text-black'>
                <IoIosMail size={24} />
                &nbsp;info@dext.site
            </h1>
        </div>
    )}

    <img className='p-4 mt-auto bg-white' src={loram} alt="Loram Logo" />
</div>

            <div className='ml-[17%] flex w-3/4 relative top-24'>
                <div className='  p-4 h-fit w-1/2 bg-white border border-gray-200 overflow-hidden shadow-lg'>
                    <h1 className='text-2xl mb-2 font-semibold'>{editingGroupNameId ? 'Edit Group' : 'Add Group'}</h1>
                    <hr />
                    <hr />
                    <br />
                    <div className='mx-4'>
                        <label className='block' htmlFor="Name">Group Name:</label>
                        <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="text" placeholder='Enter Group Name' value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} />
                    </div>
                    <div className='mx-4 mt-8'>
                        <button onClick={Submit} className='mr-2 py-1 px-5 bg-blue-600 hover:bg-blue-900 overflow-hidden shadow-md text-white rounded-sm'>{editingGroupNameId ? 'Update' : 'Submit'}</button>
                        <button onClick={Cancel} className='ml-2 py-1 px-5 bg-black hover:bg-white hover:text-black border border-black overflow-hidden shadow-md text-white rounded-sm'>Cancel</button>
                    </div>
                </div>
                <div className=' ml-8 w-1/2 h-fit p-4 bg-white border border-gray-200 overflow-hidden shadow-lg'>
                    <h1 className='text-2xl mb-2 font-semibold'>Group Name</h1>
                    <hr />
                    <hr />
                    <br />
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className='bg-black text-white'>
                            <tr>
                                <th className="border px-6 py-3 text-center tracking-wider text-sm font-medium uppercase">#</th>
                                <th className="border px-6 py-3 text-center tracking-wider text-sm font-medium uppercase">Group Name</th>
                                <th className="border px-3 py-3 text-center tracking-wider text-sm font-medium uppercase">Edit</th>
                                <th className="border px-3 py-3 text-center tracking-wider text-sm font-medium uppercase">Delete</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {GroupNames.map((GroupName, index) => (
                                <tr className='border' key={index}>
                                    <td className="px-6 text-center py-2">{GroupName.id}</td>
                                    <td className="px-6 text-center py-2">{GroupName.newGroupName}</td>
                                    <td onClick={() => editGroupName(GroupName.id, GroupName)} className="px-3 text-center py-2 hover:bg-black hover:text-white cursor-pointer">
                                        <div className="flex justify-center items-center">
                                            <MdEditSquare size={20} />
                                        </div>
                                    </td>
                                    <td onClick={() => openDeleteModal(GroupName.id)} className="px-3 text-center py-2 hover:bg-black hover:text-white cursor-pointer">
                                        <div className="flex justify-center items-center">
                                            <FaTrash size={18} />
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            
        </>
    );
};

export default AddGroup;
