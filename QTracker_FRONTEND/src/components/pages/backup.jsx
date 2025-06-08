import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import Chart from 'chart.js/auto';

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

import loram from "../Assets/loram.png";
import Q from "../Assets/Qtrackr.png";

const Dashboard = () => {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const token = localStorage.getItem('token');
    if (!token){
        enqueueSnackbar('Login to Navigate!',{variant:'error'});
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
        enqueueSnackbar('Successfully Logged out!', { variant: 'success'});
        localStorage.removeItem('token');
        navigate('/');
    };


    const [LeadReports, setLeadReports] = useState([]); 
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredLeadReports, setFilteredLeadReports] = useState([]);
    const name = localStorage.getItem('name');

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
            LeadReport.ClientContactName.toLowerCase().includes(query.toLowerCase()) || 
            LeadReport.ClientEmail.toLowerCase().includes(query.toLowerCase()) ||
            LeadReport.Status.toLowerCase().includes(query.toLowerCase()) ||
            LeadReport.AssignedGroup.includes(query)
        );
        setFilteredLeadReports(filtered);
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        filterLeadReports(e.target.value);
    };

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
    const [showEdit, setShowEdit] = useState(false);
    const [Probability, setProbability] = useState('');
    const [showProb, setShowProb] = useState(false);


    const [editingLeadReport, setEditingLeadReport] = useState(null);
    const editLeadReport = (id) => {
        const ReportToEdit = LeadReports.find(LeadReport => LeadReport.id === id);
        setEditingLeadReport(ReportToEdit);
        setShowEdit(true);
    };
        
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
        }
    }, [editingLeadReport]);


    const Submit = async(e) => {
        e.preventDefault();
        if(!ClientName || !FollowupDate || !LeadDate || !Source || !ClientPhone || !ClientContactName || !TypeService || !Status || !ProjectName || !QuotedValue){
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
                    ProjectName: ProjectName,
                    LeadDate: LeadDate,
                    QuotedValue: QuotedValue,
                    Status: Status,
                    AssignedGroup: AssignedGroup,
                    LeadType: LeadType,
                    FollowupDate: FollowupDate,
                    Probability: Probability,
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
        setShowEdit(false);
        setTimeout(() => {
            window.location.reload();
        }, 100);
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

    const deleteLeadReport = async (id) => {
        try {
<<<<<<< HEAD
            const response = await axios.delete(`http://localhost:9000/leads/${id}`);
=======
            const response = await axios.delete(`http://localhost:9000/leads/${id}`);
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
            if (response.status === 200) {
                enqueueSnackbar('Report deleted successfully!', { variant: 'success' });
                setFilteredLeadReports(prevReports => prevReports.filter(report => report.id !== id));
            } else {
                enqueueSnackbar('Failed to employee!', { variant: 'error' });
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


    const [potentialStatus, setPotentialStatus] = useState([]);
    const [potentialSource, setPotentialSource] = useState([]);
    const [probabilityStatus, setProbabilityStatus] = useState([]);
    const [totalStatusAmount, setTotalStatusAmount] = useState(0);
    const [totalProbabilityAmount, setTotalProbabilityAmount] = useState(0);
    const [totalSourceAmount, setTotalSourceAmount] = useState(0);
    const [totalStatusCount, setTotalStatusCount] = useState(0);
    const [totalProbabilityCount, setTotalProbabilityCount] = useState(0);
    const [totalSourceCount, setTotalSourceCount] = useState(0);
    const statusChartRef = useRef(null);
    const sourceChartRef = useRef(null);
    const probChartRef = useRef(null);
    
    useEffect(() => {
        // Function to aggregate status data
        const aggregateStatusData = () => {
            const statusMap = new Map();
            let totalStatusAmount = 0;
            let totalCount = 0; // Initialize total count
    
            filteredLeadReports.forEach(LeadReport => {
                const status = LeadReport.Status;
                const count = statusMap.has(status) ? statusMap.get(status).count + 1 : 1;
                const amount = parseFloat(LeadReport.QuotedValue);
                totalStatusAmount += amount;
                totalCount++; // Increment total count
                // Update statusMap with both count and amount
                statusMap.set(status, { count, amount: (statusMap.get(status)?.amount || 0) + amount });
            });
    
            // Convert map to array for rendering
            const potentialStatusArray = Array.from(statusMap, ([status, { count, amount }]) => ({
                status,
                count,
                amount,
                percentage: ((amount / totalStatusAmount) * 100).toFixed(2), // Calculate percentage based on amount
            }));
            setPotentialStatus(potentialStatusArray);
            setTotalStatusAmount(totalStatusAmount); // Set the total status amount
            setTotalStatusCount(totalCount); // Set the total status count
        };
    
        aggregateStatusData();
    }, [filteredLeadReports]);
    
    useEffect(() => {
        // Function to aggregate source data
        const aggregateSourceData = () => {
            const sourceMap = new Map();
            let totalSourceAmount = 0;
            let totalCount = 0; // Initialize total count
    
            filteredLeadReports.forEach(LeadReport => {
                const source = LeadReport.Source;
                const count = sourceMap.has(source) ? sourceMap.get(source).count + 1 : 1;
                const amount = parseFloat(LeadReport.QuotedValue);
                totalSourceAmount += amount;
                totalCount++; // Increment total count
                // Update sourceMap with both count and amount
                sourceMap.set(source, { count, amount: (sourceMap.get(source)?.amount || 0) + amount });
            });
    
            // Convert map to array for rendering
            const potentialSourceArray = Array.from(sourceMap, ([source, { count, amount }]) => ({
                source,
                count,
                amount,
                percentage: ((amount / totalSourceAmount) * 100).toFixed(2), // Calculate percentage based on amount
            }));
            setPotentialSource(potentialSourceArray);
            setTotalSourceAmount(totalSourceAmount); // Set the total source amount
            setTotalSourceCount(totalCount); // Set the total source count
        };
    
        aggregateSourceData();
    }, [filteredLeadReports]);

    useEffect(() => {
        // Function to aggregate probability data
        const aggregateProbabilityData = () => {
            const probMap = new Map();
            let totalProbAmount = 0;
            let totalCount = 0; // Initialize total count
    
            filteredLeadReports.forEach(LeadReport => {
                const prob = LeadReport.Probability;
                if (!prob) return; // Skip if probability is empty or undefined
    
                const count = probMap.has(prob) ? probMap.get(prob).count + 1 : 1;
                const amount = parseFloat(LeadReport.QuotedValue);
                totalProbAmount += amount;
                totalCount++;
                probMap.set(prob, { count, amount: (probMap.get(prob)?.amount || 0) + amount });
            });
    
            // Convert map to array for rendering
            const potentialProbabilityArray = Array.from(probMap, ([prob, { count, amount }]) => ({
                prob,
                count,
                amount,
                percentage: ((amount / totalProbAmount) * 100).toFixed(2),
            }));
            setProbabilityStatus(potentialProbabilityArray);
            setTotalProbabilityAmount(totalProbAmount);
            setTotalProbabilityCount(totalCount);
        };
    
        aggregateProbabilityData();
    }, [filteredLeadReports]);
    
    
    useEffect(() => {
        // Create new chart for potential status
        const ctxStatus = document.getElementById('statusPieChart');
        if (statusChartRef.current) {
            statusChartRef.current.destroy();
        }
        statusChartRef.current = new Chart(ctxStatus, {
            type: 'pie',
            data: {
                labels: potentialStatus.map(item => item.status),
                datasets: [{
                    label: 'Amount',
                    data: potentialStatus.map(item => item.amount.toFixed(2)),
                    backgroundColor: [
                        'darkorange',
                        'lightblue',
                        'yellowgreen',
                        'crimson',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'blue',
                        'purple',
                        'gold',
                        'black',
                    ],
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        });
    
        // Create new chart for potential source
        const ctxSource = document.getElementById('sourcePieChart');
        if (sourceChartRef.current) {
            sourceChartRef.current.destroy();
        }
        sourceChartRef.current = new Chart(ctxSource, {
            type: 'pie',
            data: {
                labels: potentialSource.map(item => item.source),
                datasets: [{
                    label: 'Amount',
                    data: potentialSource.map(item => item.amount.toFixed(2)),
                    backgroundColor: [
                        'purple',
                        'crimson',
                        'darkorange',
                        'yellowgreen',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'blue',
                        'lightblue',
                        'gold',
                        'black',
                    ],
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        });

        // Create new chart for potential probability
        const ctxProb = document.getElementById('probPieChart');
        if (probChartRef.current) {
            probChartRef.current.destroy();
        }
        probChartRef.current = new Chart(ctxProb, {
            type: 'pie',
            data: {
                labels: probabilityStatus.map(item => item.prob),
                datasets: [{
                    label: 'Amount',
                    data: probabilityStatus.map(item => item.amount.toFixed(2)),
                    backgroundColor: [
                        'yellowgreen',
                        'crimson',
                        'darkorange',
                        'yellowgreen',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'blue',
                        'lightblue',
                        'gold',
                        'black',
                    ],
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        });

        // Cleanup function to destroy chart instance on unmount
        return () => {
            if (statusChartRef.current) {
                statusChartRef.current.destroy();
            }
            if (sourceChartRef.current) {
                sourceChartRef.current.destroy();
            }
            if (probChartRef.current) {
                probChartRef.current.destroy();
            }
        };
    }, [potentialStatus, potentialSource, probabilityStatus]);

    function formatNumberWithCommas(number) {
        if (!number) return ''; // Handle case where number is undefined or null
        const parts = number.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join('.');
    }


    return (
        <>
            <div className='fixed flex justify-end z-10 py-3 w-full shadow-2xl overflow-hidden text-white bg-black'>
                <div className='cursor-pointer mr-4'>
                    <FaUserCircle onClick={logout} size={28}/>
                </div>
                {showLogout && (
                <>
                    <div className='fixed text-black text-center px-2 w-1/12 shadow-2xl overflow-hidden bg-white border border-gray-400 mr-1 mt-10 z-50 justify-end rounded-lg'>
                        <h1 className='px-6 py-2 rounded-md my-1'>{name}</h1>
                        <h1 onClick={logoutUser} className='flex px-6 py-2 rounded-md my-1 cursor-pointer hover:bg-black hover:text-white'><MdLogout size={24}/> Logout</h1>
                    </div>
                </>
                )}
            </div>

            <div className='fixed z-20 shadow-2xl overflow-hidden flex flex-col min-h-screen w-1/6 bg-black text-white' style={{width:"auto"}}>
                <img className='p-4' src={Q} alt="Q-Trackr Logo" />
                <h1 onClick={toggleLeadTracker} className='flex grid-cols-2 p-2 cursor-pointer bg-white mx-3 rounded-md my-3 text-black'><SiPivotaltracker size={24}/>&nbsp;Lead Tracker {leadTracker ? <IoIosArrowUp style={{ alignItems: 'center', marginLeft: '60px' }} size={24} /> : <IoIosArrowDown style={{ alignItems: 'center', marginLeft: '60px' }} size={24} />}</h1>
                {leadTracker && (
                    <div className='ml-3'>
                        <h1 onClick={dash} className='p-1 cursor-pointer bg-white mx-3 flex rounded-md mb-1 text-black'><MdDashboard style={{ alignItems: 'center' }} size={24} />&nbsp;Dashboard</h1>
                        <h1 onClick={addLead} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'><MdAddBox style={{ alignItems: 'center' }} size={24} />&nbsp;Add Lead</h1>
                        <h1 onClick={leadReport} className='p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black'><BiSolidReport style={{ alignItems: 'center' }} size={24} />&nbsp;Lead Reports</h1>
                    </div>
                )}
                <h1 onClick={toggleMasters} className='flex p-2 cursor-pointer hover:bg-white mx-3 rounded-md my-2 hover:text-black'><MdFolderCopy size={24}/>&nbsp; Masters&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{masters ? <IoIosArrowUp style={{ alignItems: 'center', marginLeft: '60px' }} size={24} /> : <IoIosArrowDown style={{ alignItems: 'center', marginLeft: '60px' }} size={24} />}</h1>
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
                <img className='p-4 mt-auto' src={loram} alt="Loram Logo" />
            </div>

            <div className='ml-80 p-4 relative overflow-hidden shadow-lg w-3/4 justify-center top-16'>
                <div className='flex flex-col'>
                    <h1 className='text-2xl mb-2 font-semibold'>Group</h1>
                    <div className='w-full mb-4'>
                        <select
                            className='border w-full border-gray-300 rounded-md p-2 overflow-hidden shadow-md outline-none'
                            value={AssignedGroup}
                            onChange={(e) => setAssignedGroup(e.target.value)}
                        >
                            <option value="">--All--</option>
                            {GroupNames.map(group => (
                                <option key={group.id} value={group.newGroupName}>{group.newGroupName}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        className='py-2 px-4 bg-green-600 hover:bg-green-800 text-white rounded-md'
                        onClick={() => { /* Add your submit handling logic here */ }}
                    >
                        Submit
                    </button>
                </div>
            </div>
            <div className='ml-80 p-4 relative overflow-hidden shadow-lg w-3/4 justify-center top-16'>
            <div className='grid grid-cols-5 gap-4'>
                <div className='bg-white border rounded-lg shadow-md overflow-hidden'>
                    <div className='bg-purple-500 text-white text-left  p-2'>
                        <h2 className='text-lg font-semibold'>ALL</h2>
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                            <p className='text-sm'>Lead Counts</p>
                            <h1 className='text-2xl font-bold'>17</h1>
                            <p className='text-lg mt-2'>$851,161</p>
                        </div>
                        <div className='flex items-end'>
                            <img src='/path/to/handshake-icon.svg' alt='handshake icon' className='w-8 h-8' />
                        </div>
                    </div>
                </div>
                <div className='bg-white border rounded-lg shadow-md overflow-hidden'>
                    <div className='bg-green-700 text-white text-left p-2'>
                        <h2 className='text-lg font-semibold'>Won</h2>
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                            <p className='text-sm'>Lead Counts</p>
                            <h1 className='text-2xl font-bold'>17</h1>
                            <p className='text-lg mt-2'>$851,161</p>
                        </div>
                        <div className='flex items-end'>
                            <img src='/path/to/handshake-icon.svg' alt='handshake icon' className='w-8 h-8' />
                        </div>
                    </div>
                </div>
                <div className='bg-white border rounded-lg shadow-md overflow-hidden'>
                    <div className='bg-blue-700 text-white text-left p-2'>
                        <h2 className='text-lg font-semibold'>Won Recurring</h2>
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                            <p className='text-sm'>Lead Counts</p>
                            <h1 className='text-2xl font-bold'>17</h1>
                            <p className='text-lg mt-2'>$851,161</p>
                        </div>
                        <div className='flex items-end'>
                            <img src='/path/to/handshake-icon.svg' alt='handshake icon' className='w-8 h-8' />
                        </div>
                    </div>
                </div>
                <div className='bg-white border rounded-lg shadow-md overflow-hidden'>
                    <div className='bg-yellow-400 text-white text-left p-2'>
                        <h2 className='text-lg font-semibold'>Pending</h2>
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                            <p className='text-sm'>Lead Counts</p>
                            <h1 className='text-2xl font-bold'>17</h1>
                            <p className='text-lg mt-2'>$851,161</p>
                        </div>
                        <div className='flex items-end'>
                            <img src='/path/to/handshake-icon.svg' alt='handshake icon' className='w-8 h-8' />
                        </div>
                    </div>
                </div>
                <div className='bg-white border rounded-lg shadow-md overflow-hidden'>
                    <div className='bg-red-700 text-white text-left p-2'>
                        <h2 className='text-lg font-semibold'>Lost</h2>
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                            <p className='text-sm'>Lead Counts</p>
                            <h1 className='text-2xl font-bold'>17</h1>
                            <p className='text-lg mt-2'>$851,161</p>
                        </div>
                        <div className='flex items-end'>
                            <img src='/path/to/handshake-icon.svg' alt='handshake icon' className='w-8 h-8' />
                        </div>
                    </div>
                </div>
            </div>
        </div>




            { showEdit && (
                <div className='ml-80 p-4 bg-white mb-16  border border-gray-200 relative overflow-hidden shadow-lg w-3/4 justify-center top-16'>
                    <h1 className='text-2xl mb-2 font-semibold'>Edit Follow-up</h1><hr /><hr /><br />
                    <div className='flex justify-start w-full'>
                        <div className='mx-2 w-full'>
                            <label className='block' htmlFor="Name">Client Name:</label>
                            <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="text" placeholder='Enter Name' value={ClientName} onChange={(e) => setClientName(e.target.value)}/>
                        </div>
                        <div className='mx-2 w-full'>
                            <label className='block' htmlFor="date">Lead Date:</label>
                            <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="date" id="date" name="date" value={LeadDate} onChange={(e) => setLeadDate(e.target.value)}/>
                        </div>
                        <div className='mx-2 w-full'>
                            <label className='block' htmlFor="Name">Project Name:</label>
                            <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="text" placeholder='Enter Project Name' value={ProjectName} onChange={(e) => setProjectName(e.target.value)}/>
                        </div>
                        <div className='mx-3 w-full'>
                            <label className='block' htmlFor="Name">Quoted Value:</label>
                            <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="text" placeholder='Enter Quoted Value' inputMode="numeric" pattern="[0-9]*" value={formatNumberWithCommas(QuotedValue)} onChange={(e) => setQuotedValue(e.target.value.replace(/,/g, '').replace(/\D/g, ''))}/>
                        </div>
                    </div>
                    <br />
                    <div className='flex justify-start w-full'>
                        <div className='mx-2 w-full'>
                            <label className='block' htmlFor="Name">Group Assigned:</label>
                            <select className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' value={AssignedGroup} onChange={(e) => setAssignedGroup(e.target.value)} name="auth" id="auth">
                                <option value="" disabled>Select Group</option>
                                {GroupNames.map(group => (
                                    <option key={group.id} value={group.newGroupName}>{group.newGroupName}</option>
                                ))}
                            </select>
                        </div>
                        <div className='mx-2 w-full'>
                            <label className='block' htmlFor="Name">Lead Type:</label>
                            <select className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' value={LeadType} onChange={(e) => setLeadType(e.target.value)} name="auth" id="auth">
                                <option value="" disabled>Select Lead Type</option>
                                {LeadTypes.map(LeadTyp => (
                                    <option key={LeadTyp.id} value={LeadTyp.LeadType}>{LeadTyp.LeadType}</option>
                                ))}
                            </select>
                        </div>
                        <div className='mx-2 w-full'>
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
                        <div className='mx-2 w-full'>
                            <label className='block' htmlFor="date">Next Follow-up Date:</label>
                            <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="date" id="date" name="date" value={FollowupDate} onChange={(e) => setFollowupDate(e.target.value)}/>
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


            <div className='ml-80 p-4 bg-white  border border-gray-200 relative overflow-hidden shadow-lg w-3/4 justify-center top-16'>
                <div className='flex'>
                <h1 className='text-2xl w-4/5 mb-2 font-semibold'>Follow-up</h1>
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
                                <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">#</th>
                                <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Lead Date</th>
                                <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Client Name</th>
                                <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Project Name</th>
                                <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Lead type</th>
                                <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Quoted Value</th>
                                <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Group</th>
                                <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Followup Date</th>
                                <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Edit</th>
                                <th className="px-8 py-3 text-center border text-sm font-medium uppercase tracking-wider"><FaTrash size={18}/></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredLeadReports.map(LeadReport => (
                                <tr className='border text-sm' key={LeadReport.id}>
                                    <td className="px-3 text-center py-2">{LeadReport.id}</td>
                                    <td className="px-3 text-center py-2">{LeadReport.LeadDate}</td>
                                    <td className="px-3 text-center py-2">{LeadReport.ClientName}</td>
                                    <td className="px-3 text-center py-2">{LeadReport.ProjectName}</td>
                                    <td className="px-3 text-center py-2">{LeadReport.LeadType}</td>
                                    <td className="px-3 text-center py-2">${LeadReport.QuotedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td className="px-3 text-center py-2">{LeadReport.Status}</td>
                                    <td className="px-3 text-center py-2">{LeadReport.AssignedGroup}</td>
                                    <td className="px-3 text-center py-3">{LeadReport.FollowupDate}</td>
                                    <td onClick={() => editLeadReport(LeadReport.id)} className="px-4 hover:bg-black cursor-pointer hover:text-white text-center py-2"><MdEditSquare size={20}/></td>
                                    <td onClick={() => deleteLeadReport(LeadReport.id)} className="px-8 hover:bg-black cursor-pointer hover:text-white text-center py-2"><FaTrash size={18}/></td>
                                </tr>
                            ))}
                        </tbody>
                </table>
                </div>
            </div> 
            <br /><br />

            <div className='ml-80 p-4 bg-white border border-gray-200 relative overflow-hidden shadow-lg w-3/4 justify-center top-24'>
                <div className='flex'>
                    <h1 className='text-2xl w-4/5 mb-2 font-semibold'>Potential Status'</h1>
                </div>  
                <hr /><hr /><br />
                <div className="max-h-[300px] overflow-auto flex">
                    <div className='w-1/2'>
                        <div className="max-h-[300px] overflow-auto">
                        <table className="w-full divide-y divide-gray-200">
                            <thead className="bg-black sticky top-0">
                                <tr className='text-white'>
                                    <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">#</th>
                                    <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Count</th>
                                    <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Amount</th>
                                    <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">%</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {potentialStatus.map((item, index) => (
                                    <tr className='border text-md' key={index}>
                                        <td className="px-3 text-center py-2">{index + 1}</td>
                                        <td className="px-3 text-center py-2">{item.status}</td>
                                        <td className="px-3 text-center py-2">{item.count}</td>
                                        <td className="px-3 text-center py-2">${item.amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        <td className="px-3 text-center py-2">{item.percentage} %</td>
                                    </tr>
                                ))}
                                {/* Display total row */}
                                <tr className='border bg-gray-200 font-bold text-md'>
                                    <td className="px-3 text-center py-2" colSpan="1">#</td>
                                    <td className="px-3 text-center py-2">Total</td>
                                    <td className="px-3 text-center py-2">{totalStatusCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td className="px-3 text-center py-2">${totalStatusAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td className="px-3 text-center py-2">100 %</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='w-1/2'>
                    <canvas id="statusPieChart" width="300" height="300"></canvas>
                </div>
                </div>
            </div> 
            <br /><br />

            <div className='ml-80 p-4 bg-white border border-gray-200 relative overflow-hidden shadow-lg w-3/4 justify-center top-24'>
                <div className='flex'>
                    <h1 className='text-2xl w-4/5 mb-2 font-semibold'>Leading Sources</h1>
                </div>  
                <hr /><hr /><br />
                <div className="max-h-[300px] overflow-auto flex">
                    <div className='w-1/2'>
                        <div className="max-h-[300px] overflow-auto">
                        <table className="w-full divide-y divide-gray-200">
                            <thead className="bg-black sticky top-0">
                                <tr className='text-white'>
                                    <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">#</th>
                                    <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Source</th>
                                    <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Count</th>
                                    <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Amount</th>
                                    <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">%</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {potentialSource.map((item, index) => (
                                    <tr className='border text-md' key={index}>
                                        <td className="px-3 text-center py-2">{index + 1}</td>
                                        <td className="px-3 text-center py-2">{item.source}</td>
                                        <td className="px-3 text-center py-2">{item.count}</td>
                                        <td className="px-3 text-center py-2">${item.amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        <td className="px-3 text-center py-2">{item.percentage} %</td>
                                    </tr>
                                ))}
                                {/* Display total row */}
                                <tr className='border bg-gray-200 font-bold text-md'>
                                    <td className="px-3 text-center py-2" colSpan="1">#</td>
                                    <td className="px-3 text-center py-2">Total</td>
                                    <td className="px-3 text-center py-2">{totalSourceCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td className="px-3 text-center py-2">${totalSourceAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td className="px-3 text-center py-2">100 %</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <canvas id="sourcePieChart" width="300" height="300"></canvas>
                    </div>
                </div>
            </div> 
            <br /><br />


            <div className='ml-80 p-4 bg-white border border-gray-200 relative overflow-hidden shadow-lg w-3/4 justify-center top-24'>
                <div className='flex'>
                    <h1 className='text-2xl w-4/5 mb-2 font-semibold'>Probability Status</h1>
                </div>  
                <hr /><hr /><br />
                <div className="max-h-[300px] overflow-auto flex">
                    <div className='w-1/2'>
                        <div className="max-h-[300px] overflow-auto">
                        <table className="w-full divide-y divide-gray-200">
                            <thead className="bg-black sticky top-0">
                                <tr className='text-white'>
                                    <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">#</th>
                                    <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Probability</th>
                                    <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Count</th>
                                    <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Amount</th>
                                    <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">%</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {probabilityStatus.map((item, index) => (
                                    <tr className='border text-md' key={index}>
                                        <td className="px-3 text-center py-2">{index + 1}</td>
                                        <td className="px-3 text-center py-2">{item.prob}</td>
                                        <td className="px-3 text-center py-2">{item.count}</td>
                                        <td className="px-3 text-center py-2">${item.amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        <td className="px-3 text-center py-2">{item.percentage} %</td>
                                    </tr>
                                ))}
                                {/* Display total row */}
                                <tr className='border bg-gray-200 font-bold text-md'>
                                    <td className="px-3 text-center py-2" colSpan="1">#</td>
                                    <td className="px-3 text-center py-2">Total</td>
                                    <td className="px-3 text-center py-2">{totalProbabilityCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td className="px-3 text-center py-2">${totalProbabilityAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td className="px-3 text-center py-2">100 %</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <canvas id="probPieChart" width="300" height="300"></canvas>
                    </div>
                </div>
            </div> 
            <br /><br /><br /><br /><br /><br />
        </>
    );
};

export default Dashboard;
{/* 
            <div className='ml-80 p-2 flex mb-16 w-3/4 relative justify-center top-24'>
                <label htmlFor="filer">Filter:</label>
                <select name="filter" id="filterDash">
                        <option value="" disabled>Select Group</option>
                        <option value="All">All</option>
                    {GroupNames.map(GroupName => (
                        <option key={GroupName.id} value={GroupName.newGroupName}>{GroupName.newGroupName}</option>
                    ))}
                </select>
            </div> */}

            {/* <div className='ml-80 p-2 flex mb-16 w-3/4 relative justify-center top-24'>
                <div className='border p-2 w-full bg-white border-gray-200 overflow-hidden shadow-lg mx-2'>
                    <h1 className="px-3 text-center text-lg font-bold bg-rose-600 text-white py-2 mb-3">Total</h1><hr />
                    <h1 className="px-3 grid grid-cols-2 gap-x-12 py-2">Lead Count:<span className='font-bold text-4xl'>{totalStatusCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></h1>
                    <h1 className="px-3 text-left font-extrabold text-xl pt-4">${totalStatusAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                    <h1 className="px-3 text-center pt-3">100 %</h1>
                </div>
                {potentialStatus.map((item, index) => (
                    <div className='border w-full p-2 text-md bg-white mx-2 border-gray-200 overflow-hidden shadow-lg' key={index}>
                        <div>
                            <h1 className="px-3 text-center py-2 bg-black text-lg font-bold text-white mb-3">{item.status}</h1><hr />
                        </div>
                        <div>
                            <h1 className="px-3 grid grid-cols-2 gap-x-12 py-2">Lead Count:<span className='font-bold text-4xl'>{item.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></h1>
                        </div>
                        <div>
                            <h1 className="px-3 text-left font-extrabold text-xl pt-4">${item.amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                        </div>
                        <div>
                            <h1 className="px-3 text-center pt-3">{item.percentage} %</h1>
                        </div>
                    </div>
                ))}
            </div> */}
