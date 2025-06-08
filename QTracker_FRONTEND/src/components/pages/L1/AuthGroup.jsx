import React, { useEffect,useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { IoIosArrowDown, IoIosArrowUp, IoIosMail, IoIosPeople } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { SiPivotaltracker } from "react-icons/si";
import { MdDashboard, MdContacts, MdLogout, MdCategory, MdPending, MdGroupAdd } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { MdFolderCopy } from "react-icons/md";
import { FaServicestack } from "react-icons/fa6";
import { RiMastercardFill } from "react-icons/ri";
import { DiOpensource } from "react-icons/di";

import loram from "../../Assets/loram.png";
import Q from "../../Assets/Qtrackr.png";
import checkSessionValidity from "../../CheckSessionValidity";

const AuthGroup = () => {
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
    const NavSource = (e) => {
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



    

    return (
        <>
            <div className='fixed flex justify-end z-10 py-3 w-full  overflow-hidden text-white '>
                <div className='cursor-pointer mr-4 bg-black'>
                    <FaUserCircle onClick={logout} size={28}/>
                </div>
                {showLogout && (
                <>
                    <div className='fixed text-black text-center px-2 w-1/12 shadow-2xl overflow-hidden bg-white border border-gray-400 mr-1 mt-10 z-50 justify-end rounded-lg'>
                        <h1 className='px-6 py-2 rounded-md my-1'>Name</h1>
                        <h1 onClick={logoutUser} className='flex px-6 py-2 rounded-md my-1 cursor-pointer hover:bg-black hover:text-white'><MdLogout size={24}/> Logout</h1>
                    </div>
                </>
                )}
            </div>

            <div className='fixed z-20 flex flex-col min-h-screen shadow-2xl overflow-hidden w-1/6 bg-black text-white' style={{width:"310px"}}>
                <img className='p-4' src={Q} alt="Q-Trackr Logo" />
                <h1 onClick={toggleLeadTracker} className='flex grid-cols-2 p-2 cursor-pointer hover:bg-white mx-3 rounded-md my-3 hover:text-black'><SiPivotaltracker size={24}/>&nbsp;Lead Tracker {leadTracker ? <IoIosArrowUp style={{ alignItems: 'center', marginLeft: '60px' }} size={24} /> : <IoIosArrowDown style={{ alignItems: 'center', marginLeft: '60px' }} size={24} />}</h1>
                {leadTracker && (
                    <div className='ml-3'>
                        <h1 onClick={dash} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'><MdDashboard style={{ alignItems: 'center' }} size={24} />&nbsp;Dashboard</h1>
                        <h1 onClick={addLead} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'><MdAddBox style={{ alignItems: 'center' }} size={24} />&nbsp;Add Lead</h1>
                        <h1 onClick={leadReport} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'><BiSolidReport style={{ alignItems: 'center' }} size={24} />&nbsp;Lead Reports</h1>
                    </div>
                )}
                <h1 onClick={toggleMasters} className='flex p-2 cursor-pointer bg-white mx-3 rounded-md my-2 text-black'><MdFolderCopy size={24}/>&nbsp; Masters&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{masters ? <IoIosArrowUp style={{ alignItems: 'center', marginLeft: '60px' }} size={24} /> : <IoIosArrowDown style={{ alignItems: 'center', marginLeft: '60px' }} size={24} />}</h1>
                {masters && (
                    <div className='ml-3'>
                        <h1 onClick={NavEmployees} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'><IoIosPeople style={{ alignItems: 'center' }} size={24} />&nbsp;&nbsp;Employees</h1>
                        <h1 onClick={NavServiceType} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'><FaServicestack style={{ alignItems: 'center' }} size={24} />&nbsp;&nbsp;Service Type</h1>
                        <h1 onClick={NavLeadType} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'><MdCategory style={{ alignItems: 'center' }} size={24} />&nbsp;&nbsp;Lead Type</h1>
                        <h1 onClick={NavStatus} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'><MdPending style={{ alignItems: 'center' }} size={24} />&nbsp;&nbsp;Status</h1>
                        <h1 onClick={NavSource} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'><DiOpensource style={{ alignItems: 'center' }} size={24} />&nbsp;&nbsp;Source</h1>
                        <h1 onClick={NavClientMaster} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'><RiMastercardFill style={{ alignItems: 'center' }} size={24} />&nbsp;&nbsp;Client Master</h1>
                        <h1 onClick={NavAddGrp} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'><MdGroupAdd style={{ alignItems: 'center' }} size={24} />&nbsp;&nbsp;Add Group</h1>
                    </div>
                )}
                <h1 onClick={toggleContact} className='flex p-2 cursor-pointer hover:bg-white mx-3 rounded-md my-2 hover:text-black'><MdContacts size={24}/>&nbsp; Contact Us&nbsp;&nbsp;{Contact ? <IoIosArrowUp style={{ alignItems: 'center', marginLeft: '60px' }} size={24} /> : <IoIosArrowDown style={{ alignItems: 'center', marginLeft: '60px' }} size={24} />}</h1>
                { Contact && (
                    <>
                        <div className='ml-3'>
                            <h1 onClick={sendEmail} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md hover:text-black'><IoIosMail style={{ alignItems: 'center' }} size={24} />&nbsp;info@dext.site</h1>
                        </div>
                    </>
                )}
                <img className='p-4 mt-auto bg-white' src={loram} alt="Loram Logo" />
            </div>
        </>
    );
};

export default AuthGroup;
