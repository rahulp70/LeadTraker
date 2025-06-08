import React, { useState, useEffect, useCallback} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from 'react-phone-input-2';
import checkSessionValidity from "../../CheckSessionValidity";

import { IoIosArrowDown, IoIosArrowUp, IoIosMail, IoIosPeople } from "react-icons/io";
import { FaUserCircle} from "react-icons/fa";
import { SiPivotaltracker } from "react-icons/si";
import { MdDashboard, MdContacts, MdLogout, MdCategory, MdPending, MdGroupAdd, } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { MdFolderCopy } from "react-icons/md";
import { FaServicestack } from "react-icons/fa6";
import { RiMastercardFill } from "react-icons/ri";
import { DiOpensource } from "react-icons/di";

import loram from '../../Assets/loram.png'
import Q from "../../Assets/Qtrackr.png";


const EditLead=()=> {

    const [ClientName, setClientName] = useState('');
    const [TypeService, setTypeService] = useState('');
    const [LeadType, setLeadType] = useState('');
    const [AssignedGroup, setAssignedGroup] = useState('');
    const [QuotedValue, setQuotedValue] = useState('');
    const [ProjectName, setProjectName] = useState('');
    const [LeadDate, setLeadDate] = useState('');
    const [ClientPhone, setClientPhone] = useState('');
    const [ClientContactName, setClientContactName] = useState('');
    const [Status, setStatus] = useState('');
    const [Source, setSource] = useState('');
    const [FollowupDate, setFollowupDate] = useState('');
    const [, setShowProb] = useState(false);
    const [Probability, setProbability] = useState('');
    const [, setshowRef] = useState(false);
    const [Reference, setReference] = useState('');
    const [ClientEmail, setClientEmail] = useState('');
    const [comments, setComments] = useState('');
    const name = localStorage.getItem('name');
    const[LeadReports, setLeadReports]= useState([]);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [todaysDate, setTodaysDate] = useState('');
    
    const [editingLeadReport, setEditingLeadReport] = useState(null);
    
    const { id } = useParams();

    //const navigation= useNavigate();
    const currentLocation = useLocation();

    const handleVisibilityChange = useCallback(() => {
        if (!document.hidden) {
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
      }, [navigate, handleVisibilityChange]);

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





    // Set editingLeadReport after LeadReports is populated
    useEffect(() => {
        if (LeadReports.length > 0) {
            const ReportToEdit = LeadReports.find(LeadReport => String(LeadReport.id) === String(id));
            setEditingLeadReport(ReportToEdit || null);
            console.log(ReportToEdit); // Log the found report
        }
    }, [LeadReports, id]);
    

   // Fetch LeadReports once
    useEffect(() => {
       const fetchStatus = async () => {
           try {
<<<<<<< HEAD
            const response = await axios.get('http://localhost:9000/leads');
=======
            const response = await axios.get('http://localhost:9000/leads');
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
            if (response.status >= 200 && response.status < 300) {
                setLeadReports(response.data);
               // console.log(LeadReports);
            } else {
                enqueueSnackbar('Failed to fetch leads', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error:', error);
            enqueueSnackbar('Connection Error!', { variant: 'error' });
        }
       };
      fetchStatus();
}, [enqueueSnackbar]);


     

    const Cancel = (e) => {
        e.preventDefault();
        setClientName('');
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
        navigate("/dashboard_1");
        
    };

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setTodaysDate(today);
    }, []);

        useEffect(() => {
           if (editingLeadReport) {
            setClientName(editingLeadReport.ClientName);
            setLeadDate(editingLeadReport.LeadDate);
            setSource(editingLeadReport.Source);
            setClientContactName(editingLeadReport.ClientContactName);
            setClientPhone(editingLeadReport.ClientPhone);
            setProjectName(editingLeadReport.ProjectName);
            setTypeService(editingLeadReport.TypeService);
            setQuotedValue(editingLeadReport.QuotedValue);
            setAssignedGroup(editingLeadReport.AssignedGroup);
            setLeadType(editingLeadReport.LeadType);
            setStatus(editingLeadReport.Status);
            setFollowupDate(editingLeadReport.FollowupDate);
            setClientEmail(editingLeadReport.ClientEmail);
            setReference(editingLeadReport.Reference);
            setComments(editingLeadReport.comments);
            setProbability(editingLeadReport.Probability);
            }
        }, [editingLeadReport]);

        useEffect(() => {
           
             if(Source==='Reference'){
                 setshowRef(true);
             }

             if(Status==='Pending'){
                setShowProb(true);
             }
             
         }, [Source,Status]);

         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const Submit = async(e) => {
        e.preventDefault();
        if(!ClientName || !LeadType || ((Status !== "Won" && Status !== "Lost") && !FollowupDate) || !LeadDate || !Source || !ClientPhone || !ClientContactName || !TypeService || !Status || !ProjectName || !QuotedValue  ){
            enqueueSnackbar('Please fill all the fields!', { variant: 'error'});
          }  else if (!emailRegex.test(ClientEmail)) {
              // Show a message if the email format is invalid
              enqueueSnackbar('Please enter a valid email address!', { variant: 'error' });
          }// else if((Status === "Pending" && !comments)){
            else if (Status === "Pending" && !Probability) {
                enqueueSnackbar('Please provide Probability for Pending status!', { variant: 'error' });
                
              }    
              //enqueueSnackbar('Please enter Comments!', { variant: 'error' });
         // }
          else if((Source === "Reference" && !Reference)){
             
            enqueueSnackbar('Please enter Reference!', { variant: 'error' });
        }
        else{
            try {
<<<<<<< HEAD
                const response = await axios.put(`http://localhost:9000/leads/${editingLeadReport.id}`, {
=======
                const response = await axios.put(`http://localhost:9000/leads/${editingLeadReport.id}`, {
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                    ClientName: ClientName,
                    ProjectName: ProjectName,
                    LeadDate: LeadDate,
                    QuotedValue: QuotedValue,
                    Status: Status,
                    AssignedGroup: AssignedGroup,
                    LeadType: LeadType,
                    FollowupDate: FollowupDate,
                    Probability: Status === "Pending" ? Probability : "",
                    Source: Source,
                    Reference: Reference,
                    TypeService: TypeService,
                    ClientContactName: ClientContactName,
                    ClientEmail: ClientEmail,
                    ClientPhone: ClientPhone,
                    comments: comments,


                });
          
                if (response.status >= 200 && response.status < 300) {
                  enqueueSnackbar('Follow-Up Updated Successfully!', { variant: 'success'});
                  setClientName('');
                  setLeadDate('');
                  setClientPhone('');
                  setClientContactName('');
                  setStatus('');
                  setProjectName('');
                  setQuotedValue('');
                  setTypeService('');
                  setAssignedGroup('');
                  setLeadType('');
                  setFollowupDate('');
                  setProbability('');
                  setSource('');
                  setReference('')
                  setTimeout(() => {
                    navigate(currentLocation.state?.from || '/dashboard_1');
                }, 1500);
                } else {
                  enqueueSnackbar('Please Check Your Connection!', { variant: 'error'});
                }
              } catch (error) {
                console.error('Error:', error);
                enqueueSnackbar('Connection Error!',{variant:'error'});
              }
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

    const [LeadTypes, setLeadTypes] = useState([]); 
    useEffect(() => {
        const fetchLeadTypes = async () => {
            try {
<<<<<<< HEAD
                const response = await axios.get('http://localhost:9000/LeadTypes');
=======
                const response = await axios.get('http://localhost:9000/LeadTypes');
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

    /*const Prob = (e) => {
        e.preventDefault();
        if (Status === 'Pending'){
            setShowProb(true);
        }
        else{
            setShowProb(false);
        }
    };*/

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

    /*const Ref = (e) => {
        e.preventDefault();
        if (Source === 'Reference'){
            setshowRef(true);
        }
        else{
            setshowRef(false);
        }
    };*/

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

    function formatNumberWithCommas(number) {
        if (!number) return ''; // Handle case where number is undefined or null
        const parts = number.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join('.');
    }
    
    return ( <>

<div className='fixed flex justify-end z-10 py-3 w-full  overflow-hidden text-white '>
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


            <div id="menu-bar" class="fixed z-20 shadow-2xl overflow-hidden flex flex-col min-h-screen bg-black text-white w-full sm:w-1/3 md:w-1/4 lg:w-1/6 transform -translate-x-full sm:translate-x-0 transition-transform duration-300 ease-in-out" style={{width:"15%"}}>
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
       

            <div className='ml-80 p-4 bg-white mb-16 border border-gray-200 relative overflow-hidden shadow-lg w-3/4 justify-center top-16' style={{ marginLeft: "20%", paddingLeft: "4%" }}>
    <h1 className='text-2xl mb-2 font-semibold'>Edit Follow-up</h1>
    <hr /><hr /><br />
    
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4' style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {/* Lead Date */}
        <div className='mb-4' style={{ width: '22%', height:'4%' }}>
            <label className="block text-gray-700" htmlFor="date">
                Lead Date:
                <span className="text-red-700 text-xl">*</span>
            </label>
            <DatePicker
                selected={LeadDate}
                onChange={(date) => setLeadDate(date)}
                dateFormat="MM-dd-yyyy"
                className="border w-full mr-14 pr-16 border-gray-400 rounded-md p-2.5 overflow-hidden shadow-md outline-none"
                placeholderText="mm-dd-yyyy"
                maxDate={new Date()}
                required
            />
        </div>

        {/* Client Name */}
        <div className='mb-4' style={{ width: '22%', height:'4%' }}>
            <label className='block' htmlFor="Name">Client Name:<span className="text-red-700 text-xl">*</span></label>
            <input
                className='border w-full border-gray-400 rounded-md p-2.5 overflow-hidden shadow-md outline-none'
                type="text"
                placeholder='Enter Name'
                value={ClientName}
                onChange={(e) => setClientName(e.target.value)}
            />
        </div>

        {/* Source */}
        <div className='mb-4' style={{ width: '22%', height:'4%' }}>
            <label className='block' htmlFor="Name">Source:<span className="text-red-700 text-xl">*</span></label>
            <select
                className='border w-full border-gray-400 rounded-md p-2.5 overflow-hidden shadow-md outline-none'
                value={Source}
                onChange={(e) => setSource(e.target.value)}
                name="auth"
                id="auth"
            >
                <option value="" disabled>Select Source</option>
                {Sources.map(Sourc => (
                    <option key={Sourc.id} value={Sourc.newSource}>{Sourc.newSource}</option>
                ))}
            </select>
        </div>

        {/* Reference */}
        <div className='mb-4' style={{ width: '22%', height:'4%' }}>
        <label className="block" htmlFor="Name">Reference:{Source === "Reference" ? <span className="text-red-700 text-xl">*</span>:<span className="text-red-700 text-xl"></span>}</label>
            <input
                className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none'
                type="text"
                placeholder='Enter Reference'
                value={Source === 'Reference' ? Reference : ''}
                onChange={(e) => setReference(e.target.value)}
                disabled={Source !== 'Reference'}
            />
        </div>
    </div>

    <div className='grid grid-cols-1 md:grid-cols-4 gap-4' style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {/* Group Assigned */}
        <div className='mb-4' style={{ width: '22%', height:'4%' }}>
            <label className='block' htmlFor="Name">Group Assigned:<span className="text-red-700 text-xl">*</span></label>
            <select
                className='border w-full border-gray-400 rounded-md p-2.5 overflow-hidden shadow-md outline-none'
                value={AssignedGroup}
                onChange={(e) => setAssignedGroup(e.target.value)}
                name="auth"
                id="auth"
            >
                <option value="" disabled>Select Group</option>
                {GroupNames.map(group => (
                    <option key={group.id} value={group.newGroupName}>{group.newGroupName}</option>
                ))}
            </select>
        </div>

        {/* Type of Service */}
        <div className='mb-4' style={{ width: '22%', height:'4%' }}>
            <label className='block' htmlFor="Name">Type of Service:<span className="text-red-700 text-xl">*</span></label>
            <select
                className='border w-full border-gray-400 rounded-md p-2.5 overflow-hidden shadow-md outline-none'
                value={TypeService}
                onChange={(e) => setTypeService(e.target.value)}
                name="auth"
                id="auth"
            >
                <option value="" disabled>Select Service Type</option>
                {serviceTypes.map(serviceType => (
                    <option key={serviceType.id} value={serviceType.ServiceType}>{serviceType.ServiceType}</option>
                ))}
            </select>
        </div>

        {/* Project Name */}
        <div className='mb-4' style={{ width: '22%', height:'4%' }}>
            <label className='block' htmlFor="Name">Project Name:<span className="text-red-700 text-xl">*</span></label>
            <input
                className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none'
                type="text"
                placeholder='Enter Project Name'
                value={ProjectName}
                onChange={(e) => setProjectName(e.target.value)}
            />
        </div>

        {/* Quoted Value */}
        <div className='mb-4' style={{ width: '22%', height:'4%' }}>
            <label className='block' htmlFor="Name">Quoted Value:<span className="text-red-700 text-xl">*</span></label>
            <input
                className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none'
                type="text"
                placeholder='Enter Quoted Value'
                inputMode="numeric"
                pattern="[0-9]*"
                value={formatNumberWithCommas(QuotedValue)}
                onChange={(e) => setQuotedValue(e.target.value.replace(/,/g, '').replace(/\D/g, ''))}
            />
        </div>
    </div>

    <div className='grid grid-cols-1 md:grid-cols-4 gap-4' style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {/* Client Contact Name */}
        <div className='mb-4' style={{ width: '22%', height:'4%' }}>
            <label className='block' htmlFor="Name">Contact Person:<span className="text-red-700 text-xl">*</span></label>
            <input
                className='border w-full border-gray-400 rounded-md p-2.5 overflow-hidden shadow-md outline-none'
                type="text"
                placeholder='Enter Name'
                value={ClientContactName}
                onChange={(e) => setClientContactName(e.target.value)}
            />
        </div>

        {/* Client Email */}
        <div className='mb-4' style={{ width: '22%', height:'4%' }}>
            <label className='block' htmlFor="email">Email ID:<span className="text-red-700 text-xl">*</span></label>
            <input
                className='border w-full border-gray-400 rounded-md p-2.5 overflow-hidden shadow-md outline-none'
                type="text"
                placeholder='Enter Email ID'
                value={ClientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
            />
        </div>

        {/* Client Phone */}
        <div className='mb-4' style={{ width: '22%', height:'4%' }}>
            <label className='block' htmlFor="Name">Mobile Number:<span className="text-red-700 text-xl">*</span></label>
            <PhoneInput
                country={'us'}
                value={String(ClientPhone)}
                onChange={(value) => setClientPhone(value)}
                inputProps={{ required: true, className: 'w-11/12 border border-gray-400 outline-0 rounded overflow-hidden shadow-md ml-7 pl-3 p-2.5', style: { fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" } }}
            />
        </div>

        {/* Lead Type */}
        <div className='mb-4' style={{ width: '22%', height:'4%' }}>
            <label className='block' htmlFor="Name">Lead Type:<span className="text-red-700 text-xl">*</span></label>
            <select
                className='border w-full border-gray-400 rounded-md p-2.5 overflow-hidden shadow-md outline-none'
                value={LeadType}
                onChange={(e) => setLeadType(e.target.value)}
                name="auth"
                id="auth"
            >
                <option value="" disabled>Select Lead Type</option>
                {LeadTypes.map(LeadTyp => (
                    <option key={LeadTyp.id} value={LeadTyp.LeadType}>{LeadTyp.LeadType}</option>
                ))}
            </select>
        </div>
    </div>

    <div className='grid grid-cols-1 md:grid-cols-4 gap-4' style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {/* Status */}
        <div className='mb-4' style={{ width: '22%', height:'4%' }}>
            <label className='block' htmlFor="Name">Status:<span className="text-red-700 text-xl">*</span></label>
            <select
                className='border w-full border-gray-400 rounded-md p-2.5 overflow-hidden shadow-md outline-none'
                value={Status}
                onChange={(e) => setStatus(e.target.value)}
                name="auth"
                id="auth"
            >
                <option value="" disabled>Select Status</option>
                {statuses.map(statuse => (
                    <option key={statuse.id} value={statuse.status}>{statuse.status}</option>
                ))}
            </select>
        </div>

        {/* Probability */}
        <div className='mb-4' style={{ width: '22%', height:'4%'}}>
        <label className="block" htmlFor="Name">Probability:{Status === "Pending" ? <span className="text-red-700 text-xl">*</span>:<span className="text-red-700 text-xl"></span>}</label>
            <select
                className='border w-full border-gray-400 rounded-md ml-1 p-2.5 overflow-hidden shadow-md outline-none'
                value={Status === 'Pending' ? Probability : ''}
                onChange={(e) => setProbability(e.target.value)}
                disabled={Status !== 'Pending'}
                name="auth"
                id="auth"
            >
                <option value="" disabled>Select Probability</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
        </div>

        {/* Follow-up Date */}
        <div className='mb-4' style={{ width: '22.5%', height:'4%' }}>
            <label className='block text-gray-700' htmlFor="date">
                {Status === "Won" || Status === "Lost" ? "" : <> Next Follow-up Date:<span className="text-red-700 text-xl">*</span></>}
            </label>
            {Status !== "Won" && Status !== "Lost" && (
                <DatePicker
                    selected={FollowupDate}
                    onChange={(date) => setFollowupDate(date)}
                    dateFormat="MM-dd-yyyy"
                    className="border w-full mr-16 ml-0.5 pr-16 border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none"
                    minDate={todaysDate}
                    placeholderText="mm-dd-yyyy"
                    disabled={Status === "Won" || Status === "Lost"}
                />
            )}
        </div>
        <div className='mb-4' style={{ width: '22%', height:'4%' }}>
            
        </div>
    </div> 
         <br></br>
        {/* Comments */}
        <div className=''>
        <label className='block' htmlFor="comments">Comments:</label>
        <textarea
            className='border w-1/2 border-gray-400 rounded-md p-4 overflow-hidden shadow-md outline-none resize-y'
            placeholder="Enter Comments"
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            required={Status === "Pending"}
            name="comments"
            rows={2}
        />
    </div>
    

    <div className='flex mt-8 justify-center'>
        <button onClick={Submit} className='mx-2 py-2 px-5 bg-blue-600 hover:bg-blue-900 overflow-hidden shadow-md text-white rounded-sm'>Confirm</button>
        <button onClick={Cancel} className='mx-2 py-2 px-5 bg-black hover:bg-white hover:text-black border border-black overflow-hidden shadow-md text-white rounded-sm'>Cancel</button>
    </div>
    <br />
</div>


        
    
    </> );
}

export default EditLead;