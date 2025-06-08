import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import checkSessionValidity from "../../CheckSessionValidity";
import Q from "../../Assets/Qtrackr.png";
import loram from "../../Assets/loram.png";

const AddLead = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const token = localStorage.getItem('token');
    if (!token) {
        enqueueSnackbar('Login to Navigate!', { variant: 'error' });
        navigate('/');
    }

    const [leadTracker, setLeadTracker] = useState(true);
    const [masters, setMasters] = useState(false);
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
        enqueueSnackbar('Successfully Logged out!', { variant: 'success' });
        localStorage.removeItem('token');
        navigate('/');
    };


    const [ClientName, setClientName] = useState('');
    const [TypeService, setTypeService] = useState('');
    const [LeadType, setLeadType] = useState('');
    const [AssignedGroup, setAssignedGroup] = useState('');
    const [QuotedValue, setQuotedValue] = useState('');
    const [ProjectName, setProjectName] = useState('');

    const [Reference, setReference] = useState('');
    const [ClientPhone, setClientPhone] = useState('');
    const [ClientContactName, setClientContactName] = useState('');
    const [ClientEmail, setClientEmail] = useState('');
    const [Status, setStatus] = useState('');
    const [Source, setSource] = useState('');
    const [FollowupDate, setFollowupDate] = useState('');
    const [Probability, setProbability] = useState('');
    const [, setShowProb] = useState(false);
    const [, setshowRef] = useState(false);
<<<<<<< HEAD
    const [, setTodaysDate] = useState('');
=======
    const [todaysDate, setTodaysDate] = useState('');
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
    const [comments, setComments] = useState('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const Submit = async (e) => {
        e.preventDefault();

<<<<<<< HEAD
        if (!ClientName || ((Status !== "Won" && Status !== "Lost") && !FollowupDate) || !LeadDate || !Source || !ClientPhone || !ClientContactName || !TypeService || !Status || !QuotedValue) {
=======
        if (!ClientName || !LeadType || ((Status !== "Won" && Status !== "Lost") && !FollowupDate) || !LeadDate || !Source || !ClientPhone || !ClientContactName || !TypeService || !Status || !ProjectName || !QuotedValue) {
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
            enqueueSnackbar('Please fill all the fields!', { variant: 'error' });
        } else if (!emailRegex.test(ClientEmail)) {
            // Show a message if the email format is invalid
            enqueueSnackbar('Please enter a valid email address!', { variant: 'error' });
        } // else if ((Status === "Pending" && !comments)) {
        //enqueueSnackbar('Please enter Comments!', { variant: 'error' });} 
        else if ((Source === "Reference" && !Reference)) {

            enqueueSnackbar('Please enter Reference!', { variant: 'error' });
        }
        else {
            try {
<<<<<<< HEAD
                const response = await axios.post('http://localhost:9000/leads', {
=======
                const response = await axios.post('http://localhost:9000/leads', {
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                    ClientName,
                    ClientEmail,
                    ProjectName,
                    LeadDate,
                    ClientPhone,
                    QuotedValue,
                    ClientContactName,
                    Status,
                    Source,
                    TypeService,
                    AssignedGroup,
                    LeadType,
                    FollowupDate,
                    Probability,
                    Reference
                });

                if (response.status >= 200 && response.status < 300) {
                    enqueueSnackbar('Lead Added Successfully!', { variant: 'success' });
                    setClientName('');
                    setLeadDate('');
                    setClientPhone('');
                    setClientContactName('');
                    setStatus('');
                    setClientEmail('');
                    setProjectName('');
                    setQuotedValue('');
                    setTypeService('');
                    setAssignedGroup('');
                    setLeadType('');
                    setFollowupDate('');
                    setShowProb(false);
                    setProbability('');
                    setSource('');
                    setshowRef(false);
                    setReference('');
                } else {
                    enqueueSnackbar('Please Check Your Connection!', { variant: 'error' });
                }
            } catch (error) {
                console.error('Error:', error);
                enqueueSnackbar('Connection Error!', { variant: 'error' });
            }
        }
    };



    const Cancel = (e) => {
        e.preventDefault();
        setClientName('');
        setClientEmail('');
        setLeadDate('');
        setClientPhone('');
        setClientContactName('');
        setStatus('');
        setProjectName('');
        setQuotedValue('');
        setTypeService('');
        setLeadType('');
        setAssignedGroup('');
        setSource('');
        setFollowupDate('');
        setShowProb(false);
        setProbability('');
        setshowRef(false);
        setReference('');
    };



    /*const Prob = (e) => {
        e.preventDefault();
        if (Status === 'Pending') {
            setShowProb(true);
        }
        else {
            setShowProb(false);
            setProbability('');
        }
    };

    const Ref = (e) => {
        e.preventDefault();
        if (Source === 'Reference') {
            setshowRef(true);
        }
        else {
            setshowRef(false);
            setReference('');
        }
    };*/


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
    }, [handleVisibilityChange, navigate]);



    const [serviceTypes, setServiceTypes] = useState([]);
    useEffect(() => {
        const fetchServiceTypes = async () => {
            try {
<<<<<<< HEAD
                const response = await axios.get('http://localhost:9000/serviceTypes');
=======
                const response = await axios.get('http://localhost:9000/serviceTypes');
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                if (response.status >= 200 && response.status < 300) {
                    setServiceTypes(response.data);
                } else {
                    console.log('Failed to fetch Data');
                }
            } catch (error) {
                console.error('Error:', error);
                enqueueSnackbar('Connection Error!', { variant: 'error' });
            }
        };
        fetchServiceTypes();
    }, [enqueueSnackbar]);


    const [Sources, setSources] = useState([]);
    useEffect(() => {
        const fetchSources = async () => {
            try {
<<<<<<< HEAD
                const response = await axios.get('http://localhost:9000/Source');
=======
                const response = await axios.get('http://localhost:9000/Source');
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                if (response.status === 200) {
                    console.log(response.data);
                    setSources(response.data);
                } else {
                    enqueueSnackbar('Failed to fetch sources', { variant: 'error' });
                }
            } catch (error) {
                console.error('Error fetching sources:', error);
                enqueueSnackbar('Connection Error!', { variant: 'error' });
            }
        };
        fetchSources();
    }, [enqueueSnackbar]);

    console.log(Status);
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setTodaysDate(today);
    }, []);


    const [LeadTypes, setLeadTypes] = useState([]);
    useEffect(() => {
        const fetchLeadTypes = async () => {
            try {
<<<<<<< HEAD
                const response = await axios.get('http://localhost:9000/leadTypes');
=======
                const response = await axios.get('http://localhost:9000/leadTypes');
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                if (response.status >= 200 && response.status < 300) {
                    setLeadTypes(response.data);
                } else {
                    console.log('Failed to fetch Data');
                }
            } catch (error) {
                console.error('Error:', error);
                enqueueSnackbar('Connection Error!', { variant: 'error' });
            }
        };
        fetchLeadTypes();
    }, [enqueueSnackbar]);

    const [statuses, setStatuses] = useState([]);
    useEffect(() => {
        const fetchStatus = async () => {
            try {
<<<<<<< HEAD
                const response = await axios.get('http://localhost:9000/Status');
=======
                const response = await axios.get('http://localhost:9000/Status');
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                if (response.status >= 200 && response.status < 300) {
                    setStatuses(response.data);
                } else {
                    enqueueSnackbar('Failed to fetch Status', { variant: 'error' });
                }
            } catch (error) {
                console.error('Error:', error);
                enqueueSnackbar('Connection Error!', { variant: 'error' });
            }
        };
        fetchStatus();
    }, [enqueueSnackbar]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so +1
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
    };

    const [LeadDate, setLeadDate] = useState(() => formatDate(new Date()));




    function formatNumberWithCommas(number) {
        if (!number) return ''; // Handle case where number is undefined or null
        const parts = number.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join('.');
    }
    const name = localStorage.getItem('name');


    // Track Client Name error
    const [ClientError, setClientError] = useState(false);
    const [SourceError, setSourceError] = useState(false);
    const [ReferenceError, setReferenceError] = useState(false);
    const [GroupError, setGroupError] = useState(false);
    const [ServiceError, setServiceError] = useState(false);
    const [ProjectNameError, setProjectNameError] = useState(false);
    const [QuotedValueError, setQuotedValueError] = useState(false);
    const [ClientContactNameError, setClientContactNameError] = useState(false);
    const [ClientEmailError, setClientEmailError] = useState(false);
    const [ClientPhoneError, setClientPhoneError] = useState(false);
    const [LeadTypeError, setLeadTypeError] = useState(false);
    const [StatusError, setStatusError] = useState(false);
    const [ProbabilityError, setProbabilityError] = useState(false); // State for validation error
    const [FollowupDateError, setFollowupDateError] = useState(true);











    const handleClientNameChange = (e) => {
        const value = e.target.value;
        setClientName(value);
        setClientError(value === ""); // Set error state based on input value
    };
    const handleSourceChange = (e) => {
        const value = e.target.value;
        setSource(value);

        // Clear the error when a valid source is selected
        if (value !== "") {
            setSourceError(false);
        }
    };
    const handleReferenceChange = (e) => {
        const value = e.target.value;
        setReference(value);

        // Clear the error when the Reference field is not empty
        if (value !== "") {
            setReferenceError(false);
        }
    };
    const handleGroupChange = (e) => {
        const value = e.target.value;
        setAssignedGroup(value);

        // Clear the error when a valid group is selected
        if (value !== "") {
            setGroupError(false);
        }
    };
    const handleServiceChange = (e) => {
        const value = e.target.value;
        setTypeService(value);

        // Clear the error when a valid service is selected
        if (value !== "") {
            setServiceError(false);
        }
    };

    // Format the quoted value with commas


    // Handle Project Name change
    const handleProjectNameChange = (e) => {
        const value = e.target.value;
        setProjectName(value);

        if (value === "") {
            setProjectNameError(true);
        } else {
            setProjectNameError(false);
        }
    };

    // Handle Quoted Value change
    const handleQuotedValueChange = (e) => {
        const value = e.target.value.replace(/,/g, "").replace(/\D/g, ""); // Strip non-numeric characters
        setQuotedValue(value);

        if (value === "") {
            setQuotedValueError(true);
        } else {
            setQuotedValueError(false);
        }
    };
    const handleClientContactNameChange = (e) => {
        const value = e.target.value;
        setClientContactName(value);

        if (value === "") {
            setClientContactNameError(true);
        } else {
            setClientContactNameError(false);
        }
    };

    // Handle Client Email change
    const handleClientEmailChange = (e) => {
        const value = e.target.value;
        setClientEmail(value);

        if (value === "") {
            setClientEmailError(true);
        } else {
            setClientEmailError(false);
        }
    };


    // Handle Lead Type change
    const handleLeadTypeChange = (e) => {
        const value = e.target.value;
        setLeadType(value);

        // Clear the error when a valid lead type is selected
        if (value !== "") {
            setLeadTypeError(false);
        }
    };
    const handlePhoneChange = (value) => {
        setClientPhone(value);

        // Clear the error if the phone number is valid
        if (value && value.length >= 10) {
            setClientPhoneError(false);
        }
    };

    const handlePhoneBlur = () => {
        // Set error if phone number is empty or invalid length
        setClientPhoneError(ClientPhone === "" || ClientPhone.length < 10);
    };
    const handleStatusChange = (e) => {
        const value = e.target.value;
        setStatus(value);
        if (value === 'Pending') {
            setProbabilityError(true);
        }

        // Clear the error if a valid status is selected
        if (value !== "") {
            setStatusError(false);
        }
    };

    const handleStatusBlur = () => {
        // Set error if no status is selected
        setStatusError(Status === "");
    };
    const handleProbabilityChange = (e) => {
        const value = e.target.value;
        setProbability(value);
        setProbabilityError(true);

        // Clear the error if a valid probability is selected
        if (value !== "") {
            setProbabilityError(false);
        }
    };

    const handleProbabilityBlur = () => {
        // Set error if no probability is selected and status is "Pending"
        if (Status === "Pending" && Probability === "") {
            setProbabilityError(true);
        }
    };

    const handleFollowupDateChange = (date) => {
        setFollowupDate(date);
        setFollowupDateError(false);


    }







    return (
        <>

            <div className='fixed flex justify-end z-10  overflow-hidden py-3 w-full text-white '>
                <div className='cursor-pointer mr-4 bg-black'>
                    <FaUserCircle onClick={logout} size={28} />
                </div>
                {showLogout && (
                    <>
                        <div className='fixed text-black text-center px-2 w-1/12 shadow-2xl overflow-hidden bg-white border border-gray-400 mr-1 mt-10 z-50 justify-end rounded-lg'>
                            <h1 className='px-6 py-2 rounded-md my-1'>{name}</h1>
                            <h1 onClick={logoutUser} className='flex px-6 py-2 rounded-md my-1 cursor-pointer hover:bg-black hover:text-white'><MdLogout size={24} /> Logout</h1>
                        </div>
                    </>
                )}
            </div>

            <div id="menu-bar" className="row-span-1 col-span-1 fixed z-20 shadow-2xl overflow-hidden flex flex-col min-h-screen bg-black text-white transition-transform duration-300 ease-in-out" style={{ width: "15%" }}>
                <img className='p-4' src={Q} alt="Q-Trackr Logo" />

                <div >
                    <h1 onClick={toggleLeadTracker} className='flex items-center justify-between p-2 cursor-pointer hover:bg-white mx-1 rounded-md my-2 hover:text-black'>
                        <div className='flex items-center' style={{ paddingLeft: '5px' }}>
                            <SiPivotaltracker size={24} />&nbsp;Lead Tracker
                        </div>
                        {leadTracker ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
                    </h1>
                    {leadTracker && (
                        <div className='ml-3'>
                            <h1 onClick={dash} className='p-1 cursor-pointer bg-white mx-3 flex rounded-md mb-1 text-black'><MdDashboard style={{ alignItems: 'center' }} size={24} />&nbsp;Dashboard</h1>
                            <h1 onClick={addLead} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'><MdAddBox style={{ alignItems: 'center' }} size={24} />&nbsp;Add Lead</h1>
                            <h1 onClick={leadReport} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'><BiSolidReport style={{ alignItems: 'center' }} size={24} />&nbsp;Lead Reports</h1>
                        </div>
                    )}

                    <h1 onClick={toggleMasters} className='flex items-center justify-between p-2 cursor-pointer hover:bg-white mx-1 rounded-md my-2 hover:text-black'>
                        <div className='flex items-center' style={{ paddingLeft: '5px' }}>
                            <MdFolderCopy size={24} />&nbsp; Masters
                        </div>
                        {masters ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
                    </h1>
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
                    <h1 onClick={toggleContact} className='flex items-center justify-between p-2 cursor-pointer hover:bg-white mx-1 rounded-md my-2 hover:text-black'>
                        <div className='flex items-center' style={{ paddingLeft: '5px' }}>
                            <MdContacts size={24} />&nbsp;Contact Us
                        </div>
                        {Contact ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
                    </h1>
                    {Contact && (
                        <>
                            <div className='ml-3'>
                                <h1 onClick={sendEmail} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md hover:text-black'><IoIosMail style={{ alignItems: 'center' }} size={24} />&nbsp;info@dext.site</h1>
                            </div>
                        </>
                    )}
                    <div style={{ backgroundColor: "#fff", position: "absolute", bottom: "0px" }}>
                        <img className='p-4 mt-auto' src={loram} alt="Loram Logo" />
                    </div>
                </div>
            </div>



            <div className=' ml-64 p-3 pl-5 bg-white  border border-gray-200 relative overflow-hidden shadow-lg w-3/4 justify-center top-24' style={{ marginLeft: "20%", paddingLeft: "4%" }} >
                <h1 className='text-2xl mb-2 font-semibold'>Add Lead</h1><hr /><hr /><br />
                <div className='flex justify-start w-full'>
                    <div className="mx-4" style={{ width: '22%', height: '4%' }}>
                        <label className="block " htmlFor="date">
                            Lead Date:
                            <span className="text-red-700">*</span>
                        </label>
                        <DatePicker
                            selected={LeadDate}
                            onChange={(date) => setLeadDate(date)}
                            dateFormat="MM-dd-yyyy" // Custom format
                            className="border w-full mr-14 pr-16 border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none"
                            placeholderText="mm-dd-yyyy"
                            maxDate={new Date()}
                            required
                        />
                    </div>

                    <div className='mx-4' style={{ width: '22%', height: '4%' }}>
                        <label className='block' htmlFor="ClientName">
                            Client Name:<span className='text-red-700 text-md'>*</span>
                        </label>
                        <input
                            className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none'
                            type="text"
                            placeholder='Enter Name'
                            value={ClientName}
                            onChange={handleClientNameChange}
                            onBlur={() => setClientError(ClientName === "")}  // Trigger blur validation
                            required
                        />
                        {ClientError && <small className="text-red-500 ">Enter Client Name</small>}
                    </div>

                    <div className='mx-4' style={{ width: '22%', height: '4%' }}>
                        <label className='block' htmlFor="Source">
                            Source:<span className='text-red-500 text-md'>*</span>
                        </label>
                        <select
                            className='border w-full h-full border-gray-400 rounded-md p-2 pb-3 overflow-hidden shadow-md outline-none'
                            value={Source}
                            onChange={handleSourceChange}
                            onBlur={() => setSourceError(Source === "")}  // Trigger blur validation
                            required
                        >
                            <option value="" disabled>Select Source</option>
                            {/* Assuming Sources is an array of objects with `id` and `newSource` */}
                            {Sources.map(Sourc => (
                                <option key={Sourc.id} value={Sourc.newSource}>{Sourc.newSource}</option>
                            ))}
                        </select>
                        {SourceError && (
                            <small className="text-red-500 ">Please select a source</small>
                        )}
                    </div>

                    {/* Reference Input Field */}
                    <div className='mx-4' style={{ width: '22%', height: '4%' }}>
                        <label className="block" htmlFor="Name">Reference:{Source === "Reference" ? <span className="text-red-700 text-md">*</span> : <span className="text-red-700"></span>}</label>
                        <input
                            type="text"
                            className='border w-full border-gray-400 rounded-md p-2 ml-1 overflow-hidden shadow-md outline-none'
                            placeholder='Enter Reference'
                            value={Reference}
                            onChange={handleReferenceChange}
                            onBlur={() => setReferenceError(Reference === "" && Source === "Reference")}  // Trigger validation when Reference is required
                            disabled={Source !== "Reference"} // Only enabled when Source is "Reference"
                            required={Source === "Reference"}  // Makes the field required only when Source is "Reference"

                        />
                        {ReferenceError && Source === "Reference" && (
                            <small className="text-red-500">Enter Reference</small>
                        )}
                    </div>

                </div>
                
                <br />
                <div className='flex justify-start w-full'>
                    <div className='mx-4' style={{ width: '22%', height: '4%' }}>
                        <label className='block text-md' htmlFor="Group">
                            Group:<span className='text-red-500'>*</span>
                        </label>
                        <select
                            className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none'
                            value={AssignedGroup}
                            onChange={handleGroupChange}
                            onBlur={() => setGroupError(AssignedGroup === "")}  // Trigger blur validation
                            required
                        >
                            <option value="">Select Group</option>
                            {GroupNames.map(group => (
                                <option key={group.id} value={group.newGroupName}>{group.newGroupName}</option>
                            ))}
                        </select>
                        {GroupError && (
                            <small className="text-red-500 ">Please select a group</small>
                        )}
                    </div>

                    <div className='mx-4' style={{ width: '22%', height: '4%'}}>
                        <label className='block' htmlFor="TypeService" style={{marginBottom: '0.5px'}}>
                            Type of Service:<span className='text-red-500'>*</span>
                        </label>
                        <select
                            className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none'
                            value={TypeService}
                            onChange={handleServiceChange}
                            onBlur={() => setServiceError(TypeService === "")}  // Trigger blur validation
                            required
                        >
                            <option value="" >Select Service Type</option>
                            {serviceTypes.map(serviceType => (
                                <option key={serviceType.id} value={serviceType.ServiceType}>
                                    {serviceType.ServiceType}
                                </option>
                            ))}
                        </select>
                        {ServiceError && (
                            <small className="text-red-500">
                                Please select a service type
                            </small>
                        )}
                    </div>

                    <div className='mx-4' style={{ width: '22%', height: '4%' }}>
                        <label className='block' htmlFor="ProjectName">
                            Project Name:<span className='text-red-500'>*</span>
                        </label>
                        <input
                            className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none'
                            type="text"
                            placeholder='Enter Project Name'
                            value={ProjectName}
                            onChange={handleProjectNameChange}
                            onBlur={() => setProjectNameError(ProjectName === "")}  // Trigger blur validation
<<<<<<< HEAD
                            // required
=======
                            required
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                        />
                        {ProjectNameError && (
                            <small className="text-red-500">
                                Please enter the project name
                            </small>
                        )}
                    </div>

                    <div className='mx-4' style={{ width: '22%', height: '4%' }}>
                        <label className='block' htmlFor="QuotedValue">
                            Quoted Value:<span className='text-red-500'>*</span>
                        </label>
                        <input
                            className='border w-full border-gray-400 rounded-md p-2 ml-1 overflow-hidden shadow-md outline-none'
                            type="text"
                            placeholder='Enter Quoted Value'
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={formatNumberWithCommas(QuotedValue)}
                            onChange={handleQuotedValueChange}
                            onBlur={() => setQuotedValueError(QuotedValue === "")}  // Trigger blur validation
                            required
                        />
                        {QuotedValueError && (
                            <small className="text-red-500 ">
                                Please enter the quoted value
                            </small>
                        )}
                    </div>
                </div>

                <br />

                <div className='flex justify-start w-full'>
                    <div className='mx-4' style={{ width: '22%', height: '4%' }}>
                        <label className="block" htmlFor="ClientContactName">
                            Client Contact Person Name:<span className="text-red-500">*</span>
                        </label>
                        <input
                            className="border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none"
                            type="text"
                            placeholder="Enter Name"
                            value={ClientContactName}
                            onChange={handleClientContactNameChange}
                            onBlur={() => setClientContactNameError(ClientContactName === "")} // Trigger blur validation
                            required
                        />
                        {ClientContactNameError && (
                            <small className="text-red-500">
                                Please enter the contact person name
                            </small>
                        )}
                    </div>

                    <div className="mx-4" style={{ width: '22%', height: '4%' }}>
                        <label className="block" htmlFor="ClientEmail">
                            Email ID:<span className="text-red-500">*</span>
                        </label>
                        <input
                            className="border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none"
                            type="email"
                            placeholder="Enter Email ID"
                            value={ClientEmail}
                            onChange={handleClientEmailChange}
                            onBlur={() => setClientEmailError(ClientEmail === "")} // Trigger blur validation
                            required
                        />
                        {ClientEmailError && (
                            <small className="text-red-500 ">
                                Please enter the email ID
                            </small>
                        )}
                    </div>

                    <div className="mx-4" style={{ width: '21%', height: '4%' }}>
                        <label className="block" htmlFor="ClientPhone">
                            Mobile Number:<span className="text-red-500">*</span>
                        </label>
                        <PhoneInput
                            country={"us"}
                            value={ClientPhone}
                            onChange={handlePhoneChange}
                            onBlur={handlePhoneBlur}
                            inputProps={{
                                required: true,
                                className:
                                    "w-11/12 border border-gray-400 outline-0 rounded overflow-hidden shadow-md ml-10 p-2",
                                style: {
                                    fontFamily:
                                        "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
                                },
                            }}
                        />

                        {ClientPhoneError && (
                            <small className="text-red-500">
                                Please enter a valid mobile number
                            </small>
                        )}
                    </div>

                    <div className="mx-[2.5%]" style={{ width: '22%', height: '4%' }}>
                        <label className="block" htmlFor="LeadType">
                            Lead Type:<span className="text-red-500">*</span>
                        </label>
                        <select
                            className="border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none"
                            value={LeadType}
                            onChange={handleLeadTypeChange}
                            onBlur={() => setLeadTypeError(LeadType === "")}  // Trigger blur validation
                            name="LeadType"
                            id="LeadType"
<<<<<<< HEAD
                            // required
=======
                            required
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                        >
                            <option value="" disabled>Select Lead Type</option>
                            {LeadTypes.map((LeadTyp) => (
                                <option key={LeadTyp.id} value={LeadTyp.LeadType}>
                                    {LeadTyp.LeadType}
                                </option>
                            ))}
                        </select>
                        {LeadTypeError && (
                            <small className="text-red-500">
                                Please select a lead type
                            </small>
                        )}
                    </div>
                </div>

                <br />
                <div className='flex justify-start w-full'>
                    <div className="mx-4" style={{ width: '22%', height: '4%' }}>
                        <label className="block text-base" htmlFor="Status">
                            Status:<span className="text-red-500">*</span>
                        </label>
                        <select
                            className="border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none"
                            value={Status}
                            onChange={handleStatusChange}
                            onBlur={handleStatusBlur}
                            name="auth"
                            id="auth"
                        >
                            <option value="" disabled>
                                Select Current Status
                            </option>
                            {statuses.map((statuse) => (
                                <option key={statuse.id} value={statuse.status}>
                                    {statuse.status}
                                </option>
                            ))}
                        </select>
                        {StatusError && (
                            <small className="text-red-500">Please select a status</small>
                        )}
                    </div>

                    <div className="mx-4" style={{ width: '22%', height: '4%' }}>
                        <label className="block" htmlFor="Name">Probability:{Status === "Pending" ? <span className="text-red-700">*</span> : <span className="text-red-700"></span>}</label>
                        <select
                            className="border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none"
                            value={Probability}
                            onChange={handleProbabilityChange}
                            onBlur={handleProbabilityBlur}
                            name="auth"
                            id="auth"
                            disabled={Status !== "Pending"} // Disable when Status is not "Pending"
                        >
                            <option value="" disabled>
                                Select Probability
                            </option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        {ProbabilityError && Status === 'Pending' && (
                            <small className="text-red-500">
                                Please select a probability
                            </small>
                        )}
                    </div>

                    <div className='mx-4' style={{ width: '22%', height: '3%' }}>
                        <label className='block' htmlFor="date">
                            {Status === "Won" || Status === "Lost" ? "" : "Next Follow-up Date:"}
                        </label>
                        {Status !== "Won" && Status !== "Lost" && (
                            <DatePicker
                                selected={FollowupDate}
                                onChange={handleFollowupDateChange}
                                dateFormat="MM-dd-yyyy" // Customize the format as per your requirement
                                className="border w-full mr-14 pr-16 ml-1 border-gray-400 rounded-md p-1.5 overflow-hidden shadow-md outline-none"
<<<<<<< HEAD
                                 // Disable past dates
=======
                                minDate={todaysDate} // Disable past dates
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                                placeholderText="mm-dd-yyyy" // Placeholder
                                disabled={Status === "Won" || Status === "Lost"} // Disable the field based on status

                            />
                        )}
                        {FollowupDateError && Status === 'Pending' && (
                            <small className="text-red-500">
                                Please select a Followup Date
                            </small>
                        )}
                    </div>

                    <div className='mx-4' style={{ width: '22%', height: '4%' }}>
                        {/* Empty div (as in the original code) */}
                    </div>

                </div>

                <br></br>
                <div className='mx-[1%]' style={{ width: '47%' }}>
                    <label className='block' htmlFor="comments">Comments:</label>
                    <textarea
                        className='border w-full border-gray-400 rounded-md p-4 overflow-hidden shadow-md outline-none resize-y'
                        placeholder="Enter Comments"
                        id="comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        required={Status === "Pending"}
                        name="comments"
                        rows={2}  // Default height, you can change this as needed
                    />
                </div>

                <br />
                <div className='flex  justify-left'>
                    <button onClick={Submit} className='mx-3 py-2 px-7 bg-black hover:bg-blue-900 overflow-hidden shadow-md text-white rounded-lg'>Submit</button>
                    <button onClick={Cancel} className='mx-3 py-2 px-7 bg-red-600 hover:bg-white hover:text-black border border-black overflow-hidden shadow-md text-white rounded-lg'>Cancel</button>

                </div>
                <br />
            </div>
            <br /><br /><br /><br /><br /><br />
        </>
    );
};

export default AddLead;
