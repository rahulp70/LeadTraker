import React, { useState,useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';

import { IoIosArrowDown, IoIosArrowUp, IoIosMail, IoIosPeople } from "react-icons/io";
import { FaUserCircle, FaTrash } from "react-icons/fa";
import { SiPivotaltracker } from "react-icons/si";
import { MdDashboard, MdContacts, MdLogout, MdCategory, MdPending, MdGroupAdd, MdSearch, MdEditSquare } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { MdFolderCopy } from "react-icons/md";
import { FaServicestack } from "react-icons/fa6";
import { RiMastercardFill } from "react-icons/ri";
import { DiOpensource } from "react-icons/di";

import loram from "../../Assets/loram.png";
import Q from "../../Assets/Qtrackr.png";
import checkSessionValidity from "../../CheckSessionValidity";

const ClientMaster = () => {
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


    const [LeadReports, setLeadReports] = useState([]); 
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredLeadReports, setFilteredLeadReports] = useState([]);
    const [Probability, setProbability] = useState('');
    const [showProb, setShowProb] = useState(false);

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
                    console.log(response.data);
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

    const filterLeadReports = (query) => {
        const filtered = LeadReports.filter(LeadReport =>
            LeadReport.ClientName.toLowerCase().includes(query.toLowerCase()) ||
            LeadReport.ProjectName.toLowerCase().includes(query.toLowerCase()) ||
            LeadReport.ClientContactName.includes(query) ||
            LeadReport.AssignedGroup.toLowerCase().includes(query.toLowerCase()) ||
            LeadReport.LeadDate.toLowerCase().includes(query.toLowerCase()) ||
            LeadReport.LeadType.includes(query)
        );
        setFilteredLeadReports(filtered);
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        filterLeadReports(e.target.value);
    };

    const [ClientName, setClientName] = useState('');
    const [AssignedGroup, setAssignedGroup] = useState('');
    const [ProjectName, setProjectName] = useState('');
    const [ClientPhone, setClientPhone] = useState('');
    const [ClientContactName, setClientContactName] = useState('');
    const [ClientEmail, setClientEmail] = useState('');
    const [Status, setStatus] = useState('');
    const [showEdit, setShowEdit] = useState(false);

    const [editingLeadReport, setEditingLeadReport] = useState(null);
    const editLeadReport = (id) => {
        const ReportToEdit = LeadReports.find(LeadReport => LeadReport.id === id);
        setEditingLeadReport(ReportToEdit);
        setShowEdit(true);
    };
        
    useEffect(() => {
        if (editingLeadReport) {
            setClientName(editingLeadReport.ClientName);
            setClientContactName(editingLeadReport.ClientContactName);
            setClientPhone(editingLeadReport.ClientPhone);
            setClientEmail(editingLeadReport.ClientEmail);
            setProjectName(editingLeadReport.ProjectName);
            setAssignedGroup(editingLeadReport.AssignedGroup);
            setStatus(editingLeadReport.Status);
        }
    }, [editingLeadReport]);


    const Submit = async(e) => {
        e.preventDefault();
        if(!ClientName || !AssignedGroup || !ClientPhone || !ClientContactName || !Status || !ProjectName){
          enqueueSnackbar('Please fill all the fields!', { variant: 'error'});
        }
        else{
            try {
<<<<<<< HEAD
                const response = await axios.put(`http://localhost:9000/leads/${editingLeadReport.id}`, {
=======
                const response = await axios.put(`http://localhost:9000/leads/${editingLeadReport.id}`, {
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                  ClientName: ClientName,
                  ClientEmail: ClientEmail,
                  ProjectName: ProjectName,
                  ClientContactName: ClientContactName,
                  Status: Status,
                  AssignedGroup: AssignedGroup,
                  Probability: Probability,
                });
          
                if (response.status >= 200 && response.status < 300) {
                  enqueueSnackbar('Client Details Updated Successfully!', { variant: 'success'});
                  setClientName('');
                  setClientPhone('');
                  setClientContactName('');
                  setStatus('');
                  setClientEmail('');
                  setProjectName('');
                  setAssignedGroup('');
                  setTimeout(() => {
                    window.location.reload();
                }, 2000);
                } else {
                  enqueueSnackbar('Please Check Your Connection!', { variant: 'error'});
                }
              } catch (error) {
                console.error('Error:', error);
                enqueueSnackbar('Connection Error!',{variant:'error'});
              }
        }
    };

    const Prob = (e) => {
        e.preventDefault();
        if (Status === 'Pending'){
            setShowProb(true);
        }
        else{
            setShowProb(false);
        }
    };

    const Cancel = (e) => {
        e.preventDefault();
        if(ClientName !== null || ProjectName !== null || ClientContactName !== null || ClientEmail !== null || Status !== null || AssignedGroup !== null){
            window.location.reload();
        }
        else{
            e.preventDefault();
            setClientName('');
            setClientEmail('');
            setClientPhone('');
            setClientContactName('');
            setStatus('');
            setProjectName('');
            setAssignedGroup('');
            setShowEdit(false);
        }
    };

    const deleteLeadReport = async (id) => {
        try {
<<<<<<< HEAD
            const response = await axios.delete(`http://localhost:9000/leads/${id}`);
=======
            const response = await axios.delete(`http://localhost:9000/leads/${id}`);
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
            if (response.status === 200) {
                enqueueSnackbar('Client deleted successfully!', { variant: 'success' });
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

    useEffect(() => {
        setFilteredLeadReports(LeadReports);
    }, [LeadReports]);


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

    return (
        <>
            <div className='fixed flex justify-end z-10 py-3  overflow-hidden w-full text-white '>
                <div className='cursor-pointer mr-4 bg-black'>
                    <FaUserCircle onClick={logout} size={28}/>
                </div>
                {showLogout && (
                <>
                    <div className='fixed text-black text-center shadow-2xl overflow-hidden px-2 w-1/12 bg-white border border-gray-400 mr-1 mt-10 z-50 justify-end rounded-lg'>
                        <h1 className='px-6 py-2 rounded-md my-1'>Name</h1>
                        <h1 onClick={logoutUser} className='flex px-6 py-2 rounded-md my-1 cursor-pointer hover:bg-black hover:text-white'><MdLogout size={24}/> Logout</h1>
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
            <h1 onClick={NavSource} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'>
                <DiOpensource size={24} />
                &nbsp;Source
            </h1>
            <h1 onClick={NavClientMaster} className='p-1 cursor-pointer bg-white mx-3 flex rounded-md mb-1 text-black'>
                <RiMastercardFill size={24} />
                &nbsp;Client Master
            </h1>
            <h1 onClick={NavAddGrp} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'>
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


            { showEdit && (
            <div className='ml-80 p-4 bg-white mb-16  border border-gray-200 relative overflow-hidden shadow-lg w-3/4 justify-center top-24'>
                <h1 className='text-2xl mb-2 font-semibold'>Edit Client Details</h1><hr /><hr /><br />
                <div className='flex justify-start w-full'>
                    <div className='mx-3 w-full'>
                        <label className='block' htmlFor="Name">Client Name:</label>
                        <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="text" placeholder='Enter Name' value={ClientName} onChange={(e) => setClientName(e.target.value)}/>
                    </div>
                    <div className='mx-3 w-full'>
                        <label className='block' htmlFor="Name">Project Name:</label>
                        <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="text" placeholder='Enter Project Name' value={ProjectName} onChange={(e) => setProjectName(e.target.value)}/>
                    </div>
                    <div className='mx-3 w-full'>
                        <label className='block' htmlFor="Name">Client Contact Person Name:</label>
                        <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="text" placeholder='Enter Name' value={ClientContactName} onChange={(e) => setClientContactName(e.target.value)}/>
                    </div>

                </div>
                <br />
                <div className='flex justify-start w-full'>
                    <div className='mx-3 w-full'>
                        <label className='block' htmlFor="email">Email ID:</label>
                        <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="text" placeholder='Enter Email ID' value={ClientEmail} onChange={(e) => setClientEmail(e.target.value)}/>
                    </div>
                    <div className='mx-3 w-full'>
                        <label className='block' htmlFor="Name">Status:</label>
                        <select onClick={Prob} className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' value={Status} onChange={(e) => setStatus(e.target.value)} name="auth" id="auth">
                            <option value="" disabled>Select Status</option>
                            {statuses.map(statuse => (
                                <option key={statuse.id} value={statuse.status}>{statuse.status}</option>
                            ))}
                        </select>
                    </div>
                    {showProb && (
                        <div className='mx-3 w-full'>
                            <label className='block' htmlFor="Name">Probability:</label>
                            <select className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' value={Probability} onChange={(e) => setProbability(e.target.value)} name="auth" id="auth">
                                <option value="null" disabled>Select Probability</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        )}
                    <div className='mx-3 w-full'>
                        <label className='block' htmlFor="Name">Group:</label>
                        <select className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' value={AssignedGroup} onChange={(e) => setAssignedGroup(e.target.value)} name="auth" id="auth">
                            <option value="" disabled>Select Group</option>
                            {GroupNames.map(group => (
                                <option key={group.id} value={group.newGroupName}>{group.newGroupName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <br />
                <div className='flex mt-14 justify-center'>
                    <button onClick={Submit} className='mx-2 py-2 px-5 bg-blue-600 hover:bg-blue-900 overflow-hidden shadow-md text-white rounded-sm'>Confirm</button>
                    <button onClick={Cancel} className='mx-2 py-2 px-5 bg-black hover:bg-white hover:text-black border border-black overflow-hidden shadow-md text-white rounded-sm'>Cancel</button>
                </div>
                <br />
            </div>
            )}

            <div className='ml-80 p-4 bg-white  border border-gray-200 relative overflow-hidden shadow-lg w-3/4 justify-center top-24'>
                <div className='flex'>
                <h1 className='text-2xl w-4/5 mb-2 font-semibold'>All Clients</h1>
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
                        <th className="px-3 py-3 w-fit text-center border text-xs font-medium uppercase tracking-wider">#</th>
                        <th className="px-3 py-3 w-fit text-center border text-xs font-medium uppercase tracking-wider">Client Name</th>
                        <th className="px-3 py-3 w-fit text-center border text-xs font-medium uppercase tracking-wider">Project Name</th>
                        <th className="px-3 py-3 w-fit text-center border text-xs font-medium uppercase tracking-wider">Client Contact Person Name</th>
                        <th className="px-3 py-3 w-fit text-center border text-xs font-medium uppercase tracking-wider">Client Phone</th>
                        <th className="px-3 py-3 w-fit text-center border text-xs font-medium uppercase tracking-wider">Client Email</th>
                        <th className="px-3 py-3 w-fit text-center border text-xs font-medium uppercase tracking-wider">Status</th>
                        <th className="px-3 py-3 w-fit text-center border text-xs font-medium uppercase tracking-wider">Group</th>
                        <th className="px-6 py-3 text-center border text-xs font-medium uppercase tracking-wider">Edit</th>
                        <th className="px-6 py-3 text-center border text-xs font-medium uppercase tracking-wider"><FaTrash size={18}/></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
<<<<<<< HEAD
                {filteredLeadReports.map((LeadReport, index) => (
                        <tr className='border text-sm' key={LeadReport.id}>
                            <td className="px-3 w-fit text-center py-2">{index + 1}</td>
=======
                {filteredLeadReports.map(LeadReport => (
                        <tr className='border text-sm' key={LeadReport.id}>
                            <td className="px-3 w-fit text-center py-2">{LeadReport.id}</td>
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                            <td className="px-3 w-fit text-center py-2">{LeadReport.ClientName}</td>
                            <td className="px-3 w-fit text-center py-2">{LeadReport.ProjectName}</td>
                            <td className="px-3 w-fit text-center py-2">{LeadReport.ClientContactName}</td>
                            <td className="px-3 w-fit text-center py-2">+{LeadReport.ClientPhone}</td>
                            <td className="px-3 w-fit text-center py-2">{LeadReport.ClientEmail}</td>
                            <td className="px-3 w-fit text-center py-2">{LeadReport.Status}</td>
                            <td className="px-3 w-fit text-center py-2">{LeadReport.AssignedGroup}</td>
                            <td onClick={() => editLeadReport(LeadReport.id)} className="px-6 hover:bg-black cursor-pointer hover:text-white text-center py-2"><MdEditSquare size={20}/></td>
                            <td onClick={() => deleteLeadReport(LeadReport.id)} className="px-6 hover:bg-black cursor-pointer hover:text-white text-center py-2"><FaTrash size={18}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            </div> 
            <br /><br /><br /><br /><br /><br />
        </>
    );
};

export default ClientMaster;
