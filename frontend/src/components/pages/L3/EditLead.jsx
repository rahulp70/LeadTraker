import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from 'react-phone-input-2';
import checkSessionValidity from "../../CheckSessionValidity";




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
    const [showProb, setShowProb] = useState(false);
    const [Probability, setProbability] = useState('');
    const [showRef, setshowRef] = useState(false);
    const [Reference, setReference] = useState('');
    const [ClientEmail, setClientEmail] = useState('');
    const [comments, setComments] = useState('');

    const[LeadReports, setLeadReports]= useState([]);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [todaysDate, setTodaysDate] = useState('');
    
    const [editingLeadReport, setEditingLeadReport] = useState(null);
    
    const { id } = useParams();

    //const navigation= useNavigate();
    const currentLocation = useLocation();

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




    // Set editingLeadReport after LeadReports is populated
    useEffect(() => {
        if (LeadReports.length > 0) {
            const ReportToEdit = LeadReports.find(LeadReport => String(LeadReport.id) === String(id));
            setEditingLeadReport(ReportToEdit || null);
            console.log(ReportToEdit); // Log the found report
        }
    }, [LeadReports, id]); // Correct dependencies
    
    // Fetch LeadReports once
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get('https://qtracker.site:9001/api/leads');
                if (response.status >= 200 && response.status < 300) {
                    setLeadReports(response.data);
                } else {
                    enqueueSnackbar('Failed to fetch leads', { variant: 'error' });
                }
            } catch (error) {
                console.error('Error:', error);
                enqueueSnackbar('Connection Error!', { variant: 'error' });
            }
        };
        fetchStatus();
    }, [enqueueSnackbar]); // Correct dependencies
    


     

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
          } else if((Status === "Pending" && !comments)){
               
              enqueueSnackbar('Please enter Comments!', { variant: 'error' });
          }else if((Source === "Reference" && !Reference)){
             
            enqueueSnackbar('Please enter Reference!', { variant: 'error' });
        }
        else{
            try {
                const response = await axios.put(`https://qtracker.site:9001/api/leads/${editingLeadReport.id}`, {
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
                const response = await axios.get('https://qtracker.site:9001/api/groups');
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
                const response = await axios.get('https://qtracker.site:9001/api/LeadTypes');
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

    const Prob = (e) => {
        e.preventDefault();
        if (Status === 'Pending'){
            setShowProb(true);
        }
        else{
            setShowProb(false);
        }
    };

    const [statuses, setStatuses] = useState([]); 
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get('https://qtracker.site:9001/api/Status');
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
                const response = await axios.get('https://qtracker.site:9001/api/Source');
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

    const Ref = (e) => {
        e.preventDefault();
        if (Source === 'Reference'){
            setshowRef(true);
        }
        else{
            setshowRef(false);
        }
    };

    const [serviceTypes, setServiceTypes] = useState([]); 
    useEffect(() => {
        const fetchServiceTypes = async () => {
            try {
                const response = await axios.get('https://qtracker.site:9001/api/serviceTypes');
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
       

       <div className='ml-80 p-4 bg-white mb-16  border border-gray-200 relative overflow-hidden shadow-lg w-3/4 justify-center top-16'>
                    <h1 className='text-2xl mb-2 font-semibold'>Edit Follow Ups</h1><hr /><hr /><br />
                    <div className='flex justify-start w-full'>
                        <div className='mx-2 w-full'>
                        <label className="block  text-gray-700" htmlFor="date">
                    Lead Date:
                 <span className="text-red-700 text-xl">*</span>
             </label>
            <DatePicker
             selected={LeadDate}
             onChange={(date) => setLeadDate(date)}
             dateFormat="MM-dd-yyyy" // Custom format
             className={`border border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none ${Source !== 'Reference' ? ' w-72 ' : 'w-full'}`}
             placeholderText="mm-dd-yyyy"
             maxDate={new Date()}
        required/>
                        </div>

                        <div className='mx-2 w-full'>
                            <label className='block' htmlFor="Name">Client Name:</label>
                            <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="text" placeholder='Enter Name' value={ClientName} onChange={(e) => setClientName(e.target.value)}/>
                        </div>

                        <div className='mx-3 w-full'>
                        <label className='block' htmlFor="Name">Source:</label>
                        <select  onClick={Ref} className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' value={Source} onChange={(e) => setSource(e.target.value)} name="auth" id="auth">
                            <option value="" disabled>Select Source</option>
                            {Sources.map(Sourc => (
                                <option key={Sourc.id} value={Sourc.newSource}>{Sourc.newSource}</option>
                            ))}
                        </select>
                    </div>

                    {showRef && (
                        <div className='mx-3 w-full'>
                            <label className='block' htmlFor="Name">Reference:</label>
                            <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="text" placeholder='Enter Reference' value={Reference} onChange={(e) => setReference(e.target.value)}/>
                        </div>
                    )}

                    
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

                        <div className='mx-3 w-full'>
                        <label className='block' htmlFor="Name">Type of Service:</label>
                        <select className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' value={TypeService} onChange={(e) => setTypeService(e.target.value)} name="auth" id="auth">
                            <option value="" disabled>Select Service Type</option>
                            {serviceTypes.map(serviceType => (
                                <option key={serviceType.id} value={serviceType.ServiceType}>{serviceType.ServiceType}</option>
                            ))}
                        </select>
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
                    <div className='flex justify-start w-full mt-4'>

                    <div className='mx-4 w-full'>
                        <label className='block' htmlFor="Name">Contact Person:</label>
                        <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="text" placeholder='Enter Name' value={ClientContactName} onChange={(e) => setClientContactName(e.target.value)}/>
                    </div>

                    <div className='mx-4 w-full'>
                        <label className='block' htmlFor="email">Email ID:</label>
                        <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="text" placeholder='Enter Email ID' value={ClientEmail} onChange={(e) => setClientEmail(e.target.value)}/>
                    </div>

                    <div className='mx-4 w-full'>
                        <label className='block' htmlFor="Name">Mobile Number:</label>
                        <PhoneInput country={'us'} value={String(ClientPhone)}
                         onChange={(value) => {
                            console.log("Phone input change value:", value); 
                        }} inputProps={{  required: true, className: 'w-11/12 border border-gray-400 outline-0 rounded overflow-hidden shadow-md ml-9 p-2', style: { fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}}/>
                    </div>
                     
                    <div className='mx-2 w-full ml-7'>
                            <label className='block' htmlFor="Name">Lead Type:</label>
                            <select className='border w-38 border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' value={LeadType} onChange={(e) => setLeadType(e.target.value)} name="auth" id="auth">
                                <option value="" disabled>Select Lead Type</option>
                                {LeadTypes.map(LeadTyp => (
                                    <option key={LeadTyp.id} value={LeadTyp.LeadType}>{LeadTyp.LeadType}</option>
                                ))}
                            </select>
                        </div>
                   

                    </div>

                    <div className='flex justify-start w-full mt-4'>

                    <div className='mx-2 w-full'>
                            <label className='block' htmlFor="Name">Status:</label>
                            <select onClick={Prob} className='border w-72 border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' value={Status} onChange={(e) => setStatus(e.target.value)} name="auth" id="auth">
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
                            <option value="" disabled>Select Probability</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    )}

                <div className='mx-2 w-full'>
                        <label className='block' htmlFor="date">
                       {Status === "Won" || Status === "Lost" ? "No Follow-up Date Required": "Next Follow-up Date:"}
                     </label>
                     {Status !== "Won" && Status !== "Lost" && (
                      <DatePicker
                      selected={FollowupDate}
                      onChange={(date) => setFollowupDate(date)}
                      dateFormat="MM-dd-yyyy" // Customize the format as per your requirement
                      className="border w-full border-gray-400 rounded-md p-1.5 overflow-hidden shadow-md outline-none"
                      minDate={todaysDate} // Disable past dates
                      placeholderText="mm-dd-yyyy" // Placeholder
                      disabled={Status === "Won" || Status === "Lost"} // Disable the field based on status
                    />
                    )}
                        </div>

                    </div>

                    <div className='flex justify-start w-full'>
                    <div className='mx-3 w-1/3 mt-4'>
            <label className='block' htmlFor="comments">Comments:</label>
            <textarea 
            className='border w-[550px] border-gray-400 rounded-md p-4 overflow-hidden shadow-md outline-none resize-y ' 
            placeholder="Enter Comments" 
            id="comments" 
            value={comments}  
            onChange={(e) => setComments(e.target.value)}  
            required={Status === "Pending"} 
            name="comments"
            rows={2}  // Default height, you can change this as needed
              />
            </div>
                    </div>
                    <br />
                    <div className='flex mt-8 justify-center'>
                        <button onClick={Submit} className='mx-2 py-2 px-5 bg-blue-600 hover:bg-blue-900 overflow-hidden shadow-md text-white rounded-sm'>Confirm</button>
                        <button onClick={Cancel} className='mx-2 py-2 px-5 bg-black hover:bg-white hover:text-black border border-black overflow-hidden shadow-md text-white rounded-sm'>Cancel</button>
                    </div>
                    <br />
                </div>

        
    
    </> );
}

export default EditLead;