<<<<<<< HEAD
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import "react-phone-input-2/lib/style.css";

import { IoIosArrowDown, IoIosArrowUp, IoIosMail } from "react-icons/io";
import { FaUserCircle, FaTrash } from "react-icons/fa";
import { SiPivotaltracker } from "react-icons/si";
import {
  MdDashboard,
  MdContacts,
  MdLogout,
  MdEditSquare,
} from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
=======
import React, { useState,useCallback, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import 'react-phone-input-2/lib/style.css';

import { IoIosArrowDown, IoIosArrowUp, IoIosMail} from "react-icons/io";
import { FaUserCircle, FaTrash } from "react-icons/fa";
import { SiPivotaltracker } from "react-icons/si";
import { MdDashboard, MdContacts, MdLogout, MdEditSquare } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";


import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
//import { format } from 'date-fns';

import Q from "../../Assets/Qtrackr.png";
import loram from "../../Assets/loram.png";
import checkSessionValidity from "../../CheckSessionValidity";

const LeadReport = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const token = localStorage.getItem("token");
  if (!token) {
    enqueueSnackbar("Login to Navigate!", { variant: "error" });
    navigate("/");
  }

  const [leadTracker, setLeadTracker] = useState(true);
  const [, setMasters] = useState(false);
  const [Contact, setshowcontact] = useState(false);
  const [showLogout, setshowlogout] = useState(false);

  const toggleLeadTracker = (e) => {
    e.preventDefault();
    setLeadTracker(!leadTracker);
    setMasters(false);
    setshowcontact(false);
  };

  /*const toggleMasters = (e) => {
=======

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const token = localStorage.getItem('token');
    if (!token) {
        enqueueSnackbar('Login to Navigate!', { variant: 'error' });
        navigate('/');
    }

    const [leadTracker, setLeadTracker] = useState(true);
    const [, setMasters] = useState(false);
    const [Contact, setshowcontact] = useState(false);
    const [showLogout, setshowlogout] = useState(false);

    const toggleLeadTracker = (e) => {
        e.preventDefault();
        setLeadTracker(!leadTracker);
        setMasters(false);
        setshowcontact(false);
    };

    /*const toggleMasters = (e) => {
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
        e.preventDefault();
        setMasters(!masters);
        setshowcontact(false);
        setLeadTracker(false);
    };*/

<<<<<<< HEAD
  const toggleContact = (e) => {
    e.preventDefault();
    setshowcontact(!Contact);
    setLeadTracker(false);
    setMasters(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    window.location.href =
      "mailto:info@dext.site?subject=Contact%20Us&body=Hello%2C%0D%0A%0D%0A";
  };

  const addLead = (e) => {
    e.preventDefault();
    navigate("/addlead_3");
  };
  const dash = (e) => {
    e.preventDefault();
    navigate("/dashboard_3");
  };
  const leadReport = (e) => {
    e.preventDefault();
    navigate("/leadreport_3");
  };

  const logout = (e) => {
    e.preventDefault();
    setshowlogout(!showLogout);
  };
  const logoutUser = (e) => {
    e.preventDefault();
    enqueueSnackbar("Successfully Logged out!", { variant: "success" });
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleFromDateChange = (date) => {
    setDateRange({ ...dateRange, fromDate: date });
  };

  const handleToDateChange = (date) => {
    setDateRange({ ...dateRange, toDate: date });
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [LeadReports, setLeadReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLeadReports, setFilteredLeadReports] = useState([]);
  const empGroups = localStorage.getItem("groupAssigned");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get("http://localhost:9000/leads");
        if (response.status >= 200 && response.status < 300) {
          const filteredData = response.data.filter(
            (lead) => empGroups.includes(lead.AssignedGroup) // Check if the AssignedGroup is in empGroups
          );

          setLeadReports(filteredData);
          setFilteredLeadReports(filteredData); // Use the filtered data directly
        } else {
          enqueueSnackbar("Failed to fetch Status", { variant: "error" });
        }
      } catch (error) {
        console.error("Error:", error);
        enqueueSnackbar("Connection Error!", { variant: "error" });
      }
    };
    fetchStatus();
  }, [enqueueSnackbar, empGroups]); // No need for LeadReports dependency

  const [ClientName, setClientName] = useState("");
  const [TypeService, setTypeService] = useState("");
  const [LeadType, setLeadType] = useState("");
  const [AssignedGroup, setAssignedGroup] = useState("all");
  const [QuotedValue, setQuotedValue] = useState("");
  const [ProjectName, setProjectName] = useState("");
  const [LeadDate, setLeadDate] = useState("");
  const [Reference, setReference] = useState("");
  const [ClientPhone, setClientPhone] = useState("");
  const [ClientContactName, setClientContactName] = useState("");
  const [ClientEmail, setClientEmail] = useState("");
  const [Status, setStatus] = useState("");
  const [Source, setSource] = useState("");
  const [FollowupDate, setFollowupDate] = useState("");
  const [Probability, setProbability] = useState("");
  const [showProb, setShowProb] = useState(false);
  const [showRef, setshowRef] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [, setTodaysDate] = useState("");
  const [comments, setComments] = useState("");

  const [editingLeadReport] = useState(null);

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
      setClientEmail(editingLeadReport.ClientEmail);
      setProjectName(editingLeadReport.ProjectName);
      setTypeService(editingLeadReport.TypeService);
      setQuotedValue(editingLeadReport.QuotedValue);
      setAssignedGroup(editingLeadReport.AssignedGroup);
      setLeadType(editingLeadReport.LeadType);
      setStatus(editingLeadReport.Status);
      setProbability(editingLeadReport.Probability);
      setFollowupDate(editingLeadReport.FollowupDate);
      setComments(editingLeadReport.comments);
    }
  }, [editingLeadReport]);

  const filterLeadReports = (query) => {
    const filtered = LeadReports.filter(
      (LeadReport) =>
        LeadReport.ClientName.toLowerCase().includes(query.toLowerCase()) ||
        LeadReport.ProjectName.toLowerCase().includes(query.toLowerCase()) ||
        LeadReport.ClientContactName.toLowerCase().includes(
          query.toLowerCase()
        ) ||
        LeadReport.ClientEmail.toLowerCase().includes(query.toLowerCase()) ||
        LeadReport.Status.toLowerCase().includes(query.toLowerCase()) ||
        LeadReport.AssignedGroup.includes(query)
    );
    setFilteredLeadReports(filtered);
    console.log(filteredLeadReports);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    filterLeadReports(e.target.value);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const Submit = async (e) => {
    e.preventDefault();
    if (
      !ClientName ||
      !FollowupDate ||
      !LeadDate ||
      !Source ||
      !ClientPhone ||
      !ClientContactName ||
      !TypeService ||
      !Status ||
      !ProjectName ||
      !QuotedValue
    ) {
      enqueueSnackbar("Please fill all the fields!", { variant: "error" });
    } else if (!emailRegex.test(ClientEmail)) {
      // Show a message if the email format is invalid
      enqueueSnackbar("Please enter a valid email address!", {
        variant: "error",
      });
    } // else if((Status === "Pending" && !comments)){

    //enqueueSnackbar('Please enter Comments!', { variant: 'error' });
    // }
    else if (Source === "Reference" && !Reference) {
      enqueueSnackbar("Please enter Reference!", { variant: "error" });
    } else {
      try {
        const response = await axios.put(
          `http://localhost:9000/leads/${editingLeadReport.id}`,
          {
            ClientName: ClientName,
            ClientEmail: ClientEmail,
            ProjectName: ProjectName,
            LeadDate: LeadDate,
            ClientPhone: ClientPhone,
            QuotedValue: QuotedValue,
            ClientContactName: ClientContactName,
            Status: Status,
            Source: Source,
            TypeService: TypeService,
            AssignedGroup: AssignedGroup,
            LeadType: LeadType,
            FollowupDate: FollowupDate,
            Probability: Probability,
            Reference: Reference,
            comments: comments,
          }
        );

        if (response.status >= 200 && response.status < 300) {
          enqueueSnackbar("Lead Edited Successfully!", { variant: "success" });
          setClientName("");
          setLeadDate("");
          setClientPhone("");
          setClientContactName("");
          setStatus("");
          setClientEmail("");
          setProjectName("");
          setQuotedValue("");
          setTypeService("");
          setAssignedGroup("");
          setLeadType("");
          setFollowupDate("");
          setShowProb(false);
          setProbability("");
          setSource("");
          setshowRef(false);
          setReference("");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          enqueueSnackbar("Please Check Your Connection!", {
            variant: "error",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        enqueueSnackbar("Connection Error!", { variant: "error" });
      }
    }
  };

  const Prob = (e) => {
    e.preventDefault();
    if (Status === "Pending") {
      setShowProb(true);
    } else {
      setShowProb(false);
    }
  };

  const Ref = (e) => {
    e.preventDefault();
    if (Source === "Reference") {
      setshowRef(true);
    } else {
      setshowRef(false);
    }
  };

  const Cancel = (e) => {
    e.preventDefault();
    setClientName("");
    setClientEmail("");
    setLeadDate("");
    setClientPhone("");
    setClientContactName("");
    setStatus("");
    setProjectName("");
    setQuotedValue("");
    setTypeService("");
    setLeadType("");
    setAssignedGroup("");
    setSource("");
    setFollowupDate("");
    setShowProb(false);
    setProbability("");
    setshowRef(false);
    setReference("");
    setShowEdit(false);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so +1
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const deleteLeadReport = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/leads/${id}`
      );
      if (response.status === 200) {
        enqueueSnackbar("Lead Report deleted successfully!", {
          variant: "success",
        });
        setFilteredLeadReports((prevReports) =>
          prevReports.filter((report) => report.id !== id)
        );
      } else {
        enqueueSnackbar("Failed to delete!", { variant: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
      enqueueSnackbar("Connection Error!", { variant: "error" });
    }
  };

  useEffect(() => {
    setFilteredLeadReports(LeadReports);
  }, [LeadReports]);

  const [GroupNames, setGroupNames] = useState([]);
  useEffect(() => {
    const fetchGroupName = async () => {
      try {
        const response = await axios.get("http://localhost:9000/groups");
        if (response.status === 200) {
          const filteredGroups = response.data.filter(
            (group) => empGroups.includes(group.newGroupName) // Check if the group is in empGroups
          );
          setGroupNames(filteredGroups);
        } else {
          enqueueSnackbar("Failed to fetch GroupNames", { variant: "error" });
        }
      } catch (error) {
        console.error("Error fetching GroupNames:", error);
        enqueueSnackbar("Connection Error!", { variant: "error" });
      }
    };
    fetchGroupName();
  }, [enqueueSnackbar, empGroups]);

  const [Sources, setSources] = useState([]);
  useEffect(() => {
    const fetchSources = async () => {
      try {
        const response = await axios.get("http://localhost:9000/Source");
        if (response.status === 200) {
          setSources(response.data);
        } else {
          enqueueSnackbar("Failed to fetch sources", { variant: "error" });
        }
      } catch (error) {
        console.error("Error fetching sources:", error);
        enqueueSnackbar("Connection Error!", { variant: "error" });
      }
    };
    fetchSources();
  }, [enqueueSnackbar]);

  const [LeadTypes, setLeadTypes] = useState([]);
  useEffect(() => {
    const fetchLeadTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/LeadTypes"
        );
        if (response.status >= 200 && response.status < 300) {
          setLeadTypes(response.data);
        } else {
          console.log("Failed to fetch Data");
        }
      } catch (error) {
        console.error("Error:", error);
        enqueueSnackbar("Connection Error!", { variant: "error" });
      }
    };
    fetchLeadTypes();
  }, [enqueueSnackbar]);

  const [statuses, setStatuses] = useState([]);
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get("http://localhost:9000/Status");
        if (response.status >= 200 && response.status < 300) {
          setStatuses(response.data);
        } else {
          enqueueSnackbar("Failed to fetch Status", { variant: "error" });
        }
      } catch (error) {
        console.error("Error:", error);
        enqueueSnackbar("Connection Error!", { variant: "error" });
      }
    };
    fetchStatus();
  }, [enqueueSnackbar]);

  function formatNumberWithCommas(number) {
    if (!number) return ""; // Handle case where number is undefined or null
    const parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  const [dateRange, setDateRange] = useState({
    fromDate: "",
    toDate: "",
  });

  /*const handleDateChange = (e) => {
=======

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
        navigate('/addlead_3');
    };
    const dash = (e) => {
        e.preventDefault();
        navigate('/dashboard_3');
    };
    const leadReport = (e) => {
        e.preventDefault();
        navigate('/leadreport_3');
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

    const handleFromDateChange = (date) => {
        setDateRange({ ...dateRange, fromDate: date });
    };

    const handleToDateChange = (date) => {
        setDateRange({ ...dateRange, toDate: date });
    };

    const dropdownRef = useRef(null);

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    const [LeadReports, setLeadReports] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredLeadReports, setFilteredLeadReports] = useState([]);
    const empGroups = localStorage.getItem('groupAssigned');

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get('http://localhost:9000/leads');
                if (response.status >= 200 && response.status < 300) {
                    const filteredData = response.data.filter(lead =>
                        empGroups.includes(lead.AssignedGroup) // Check if the AssignedGroup is in empGroups
                    );
    
                    setLeadReports(filteredData); 
                    setFilteredLeadReports(filteredData); // Use the filtered data directly
                } else {
                    enqueueSnackbar('Failed to fetch Status', { variant: 'error' });
                }
            } catch (error) {
                console.error('Error:', error);
                enqueueSnackbar('Connection Error!', { variant: 'error' });
            }
        };
        fetchStatus();
    }, [enqueueSnackbar, empGroups]); // No need for LeadReports dependency
    

    const [ClientName, setClientName] = useState('');
    const [TypeService, setTypeService] = useState('');
    const [LeadType, setLeadType] = useState('');
    const [AssignedGroup, setAssignedGroup] = useState('all');
    const [QuotedValue, setQuotedValue] = useState('');
    const [ProjectName, setProjectName] = useState('');
    const [LeadDate, setLeadDate] = useState('');
    const [Reference, setReference] = useState('');
    const [ClientPhone, setClientPhone] = useState('');
    const [ClientContactName, setClientContactName] = useState('');
    const [ClientEmail, setClientEmail] = useState('');
    const [Status, setStatus] = useState('');
    const [Source, setSource] = useState('');
    const [FollowupDate, setFollowupDate] = useState('');
    const [Probability, setProbability] = useState('');
    const [showProb, setShowProb] = useState(false);
    const [showRef, setshowRef] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [, setTodaysDate] = useState('');
        const [comments, setComments] = useState('');
    
    const [editingLeadReport,] = useState(null);
    
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
            setClientEmail(editingLeadReport.ClientEmail);
            setProjectName(editingLeadReport.ProjectName);
            setTypeService(editingLeadReport.TypeService);
            setQuotedValue(editingLeadReport.QuotedValue);
            setAssignedGroup(editingLeadReport.AssignedGroup);
            setLeadType(editingLeadReport.LeadType);
            setStatus(editingLeadReport.Status);
            setProbability(editingLeadReport.Probability);
            setFollowupDate(editingLeadReport.FollowupDate);
            setComments(editingLeadReport.comments);
        }
    }, [editingLeadReport]);


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
        console.log(filteredLeadReports);
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        filterLeadReports(e.target.value);
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const Submit = async (e) => {
        e.preventDefault();
        if (!ClientName || !FollowupDate || !LeadDate || !Source || !ClientPhone || !ClientContactName || !TypeService || !Status || !ProjectName || !QuotedValue) {
            enqueueSnackbar('Please fill all the fields!', { variant: 'error' });
        } else if (!emailRegex.test(ClientEmail)) {
            // Show a message if the email format is invalid
            enqueueSnackbar('Please enter a valid email address!', { variant: 'error' });
        }// else if((Status === "Pending" && !comments)){
             
            //enqueueSnackbar('Please enter Comments!', { variant: 'error' });
       // }
        else if((Source === "Reference" && !Reference)){
           
          enqueueSnackbar('Please enter Reference!', { variant: 'error' });
      }
        else {
            try {
                const response = await axios.put(`http://localhost:9000/leads/${editingLeadReport.id}`, {
                    ClientName: ClientName,
                    ClientEmail: ClientEmail,
                    ProjectName: ProjectName,
                    LeadDate: LeadDate,
                    ClientPhone: ClientPhone,
                    QuotedValue: QuotedValue,
                    ClientContactName: ClientContactName,
                    Status: Status,
                    Source: Source,
                    TypeService: TypeService,
                    AssignedGroup: AssignedGroup,
                    LeadType: LeadType,
                    FollowupDate: FollowupDate,
                    Probability: Probability,
                    Reference: Reference,
                    comments: comments
                });

                if (response.status >= 200 && response.status < 300) {
                    enqueueSnackbar('Lead Edited Successfully!', { variant: 'success' });
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
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                } else {
                    enqueueSnackbar('Please Check Your Connection!', { variant: 'error' });
                }
            } catch (error) {
                console.error('Error:', error);
                enqueueSnackbar('Connection Error!', { variant: 'error' });
            }
        }
    };


    const Prob = (e) => {
        e.preventDefault();
        if (Status === 'Pending') {
            setShowProb(true);
        }
        else {
            setShowProb(false);
        }
    };

    const Ref = (e) => {
        e.preventDefault();
        if (Source === 'Reference') {
            setshowRef(true);
        }
        else {
            setshowRef(false);
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
        setShowEdit(false);
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so +1
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
    };


    const deleteLeadReport = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:9000/leads/${id}`);
            if (response.status === 200) {
                enqueueSnackbar('Lead Report deleted successfully!', { variant: 'success' });
                setFilteredLeadReports(prevReports => prevReports.filter(report => report.id !== id));
            } else {
                enqueueSnackbar('Failed to delete!', { variant: 'error' });
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
                const response = await axios.get('http://localhost:9000/groups');
                if (response.status === 200) {
                    const filteredGroups = response.data.filter(group =>
                        empGroups.includes(group.newGroupName)  // Check if the group is in empGroups
                    );
                    setGroupNames(filteredGroups);
                } else {
                    enqueueSnackbar('Failed to fetch GroupNames', { variant: 'error' });
                }
            } catch (error) {
                console.error('Error fetching GroupNames:', error);
                enqueueSnackbar('Connection Error!', { variant: 'error' });
            }
        };
        fetchGroupName();
    }, [enqueueSnackbar, empGroups]);



    const [Sources, setSources] = useState([]);
    useEffect(() => {
        const fetchSources = async () => {
            try {
                const response = await axios.get('http://localhost:9000/Source');
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


    const [LeadTypes, setLeadTypes] = useState([]);
    useEffect(() => {
        const fetchLeadTypes = async () => {
            try {
                const response = await axios.get('http://localhost:9000/LeadTypes');
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
                const response = await axios.get('http://localhost:9000/Status');
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

    function formatNumberWithCommas(number) {
        if (!number) return ''; // Handle case where number is undefined or null
        const parts = number.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join('.');
    }

    const [dateRange, setDateRange] = useState({
        fromDate: '',
        toDate: ''
    });

    /*const handleDateChange = (e) => {
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
        const { name, value } = e.target;
        setDateRange(prevRange => ({ ...prevRange, [name]: value }));
    };*/

<<<<<<< HEAD
  const handleVisibilityChange = useCallback(() => {
    if (!document.hidden) {
      // Fires only when the tab becomes visible
      const isSessionValid = checkSessionValidity();
      if (!isSessionValid) {
        navigate("/login"); // Redirect to login if session is invalid
      }
    }
  }, [navigate]);

  useEffect(() => {
    // Check session validity on component mount
    const isSessionValid = checkSessionValidity();
    if (!isSessionValid) {
      navigate("/login");
    }

    // Add event listener for visibility change
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup listener on unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange, navigate]);

  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedStatuses((prevStatuses) => {
      if (prevStatuses.includes(value)) {
        // Remove if already selected
        return prevStatuses.filter((status) => status !== value);
      } else {
        // Add if not selected
        return [...prevStatuses, value];
      }
    });
  };

  // Convert selected statuses to a comma-separated string
  const selectedStatusesString = selectedStatuses.join(", ");

  /* const filteredReports = LeadReports.filter((LeadReport) => {
=======

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





    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        setSelectedStatuses((prevStatuses) => {
            if (prevStatuses.includes(value)) {
                // Remove if already selected
                return prevStatuses.filter((status) => status !== value);
            } else {
                // Add if not selected
                return [...prevStatuses, value];
            }
        });
    };

    // Convert selected statuses to a comma-separated string
    const selectedStatusesString = selectedStatuses.join(', ');

   /* const filteredReports = LeadReports.filter((LeadReport) => {
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
        const leadDate = new Date(LeadReport.LeadDate);
        const fromDate = dateRange.fromDate ? new Date(dateRange.fromDate) : null;
        const toDate = dateRange.toDate ? new Date(dateRange.toDate) : null;

        // Check if the lead date is within the range
        if (fromDate && leadDate < fromDate) {
            return false;
        }
        if (toDate && leadDate > toDate) {
            return false;
        }
        return true;
    });*/

<<<<<<< HEAD
  const filteredLeadReport = filteredLeadReports.filter((LeadReport) => {
    // If no filters are applied, return all data
    console.log("No filter selected", selectedStatuses);
    console.log("No filter selected", AssignedGroup);

    if (
      !dateRange.fromDate &&
      !dateRange.toDate && // No date filter
      selectedStatuses.length === 0 && // No status filter
      AssignedGroup === "all" // No group filter
    ) {
      console.log("No filter selected", selectedStatuses);
      console.log("No filter selected", AssignedGroup);

      return true; // No filters, so include all data
    }

    // Check if the LeadDate is within the selected date range
    const leadDate = new Date(LeadReport.LeadDate);
    const isWithinDateRange =
      (!dateRange.fromDate && !dateRange.toDate) ||
      (dateRange.fromDate &&
        dateRange.toDate &&
        leadDate >= dateRange.fromDate &&
        leadDate <= dateRange.toDate) ||
      (dateRange.fromDate &&
        !dateRange.toDate &&
        leadDate >= dateRange.fromDate) ||
      (!dateRange.fromDate && dateRange.toDate && leadDate <= dateRange.toDate);

    // If no date filter is applied, include all dates
    if (!isWithinDateRange) return false;

    // Check if the LeadReport matches the selected statuses
    const matchesStatus =
      selectedStatuses.length === 0 ||
      selectedStatuses.includes(LeadReport.Status);

    // If no status filter is applied, include all statuses
    if (!matchesStatus) return false;

    // Check if the LeadReport matches the selected group
    const matchesGroup =
      AssignedGroup === "all" || LeadReport.AssignedGroup === AssignedGroup;

    // If no group filter is applied, include all groups
    if (!matchesGroup) return false;

    // If all conditions are met, include the LeadReport
    return true;
  });

  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  const [itemsPerPage] = useState(10);

  // Function to calculate the number of pages
  const totalPages = Math.ceil(filteredLeadReport.length / itemsPerPage);

  const totalItems = filteredLeadReport.length;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  // Slice the filteredLeadReport based on the current page
  const currentData = filteredLeadReport.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // const handleItemsPerPageChange = (e) => {
  //     setItemsPerPage(Number(e.target.value)); // Update itemsPerPage with the selected value
  // };

  const location = useLocation();

  return (
    <>
      <div className="fixed flex justify-end z-10 py-3  overflow-hidden w-full text-white ">
        <div className="cursor-pointer mr-4 bg-black">
          <FaUserCircle onClick={logout} size={28} />
        </div>
        {showLogout && (
          <>
            <div className="fixed text-black text-center px-2 w-1/12 shadow-2xl overflow-hidden bg-white border border-gray-400 mr-1 mt-10 z-50 justify-end rounded-lg">
              <h1 className="px-6 py-2 rounded-md my-1">Name</h1>
              <h1
                onClick={logoutUser}
                className="flex px-6 py-2 rounded-md my-1 cursor-pointer hover:bg-black hover:text-white"
              >
                <MdLogout size={24} /> Logout
              </h1>
            </div>
          </>
        )}
      </div>

      <div
        className="fixed z-20 flex flex-col min-h-screen w-1/6 shadow-2xl overflow-hidden bg-black text-white"
        style={{ width: "15%" }}
      >
        <img className="p-4" src={Q} alt="Q-Trackr Logo" />

        <h1
          onClick={toggleLeadTracker}
          className="flex items-center justify-between p-2 cursor-pointer bg-white mx-3 rounded-md my-3 text-black"
        >
          <div className="flex items-center">
            <SiPivotaltracker size={24} />
            &nbsp;Lead Tracker
          </div>
          {leadTracker ? (
            <IoIosArrowUp size={24} />
          ) : (
            <IoIosArrowDown size={24} />
          )}
        </h1>
        {leadTracker && (
          <div className="ml-3">
            <h1
              onClick={dash}
              className="p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black"
            >
              <MdDashboard size={24} />
              &nbsp;Dashboard
            </h1>
            <h1
              onClick={addLead}
              className="p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black"
            >
              <MdAddBox size={24} />
              &nbsp;Add Lead
            </h1>
            <h1
              onClick={leadReport}
              className="p-1 cursor-pointer bg-white mx-3 flex rounded-md mb-1 text-black"
            >
              <BiSolidReport size={24} />
              &nbsp;Lead Reports
            </h1>
          </div>
        )}

        {/* <h1 onClick={toggleMasters} className="flex items-center justify-between p-2 cursor-pointer hover:bg-white mx-3 rounded-md my-2 hover:text-black">
=======
    const filteredLeadReport = filteredLeadReports.filter((LeadReport) => {
        // If no filters are applied, return all data
        console.log("No filter selected", selectedStatuses);
        console.log("No filter selected", AssignedGroup);


        if (
            (!dateRange.fromDate && !dateRange.toDate) &&  // No date filter
            (selectedStatuses.length === 0) &&            // No status filter
            (AssignedGroup === 'all')                      // No group filter
        ) {
            console.log("No filter selected", selectedStatuses);
            console.log("No filter selected", AssignedGroup);

            return true;  // No filters, so include all data
        }

        // Check if the LeadDate is within the selected date range
        const leadDate = new Date(LeadReport.LeadDate);
        const isWithinDateRange =
            (!dateRange.fromDate && !dateRange.toDate) ||
            (dateRange.fromDate && dateRange.toDate && leadDate >= dateRange.fromDate && leadDate <= dateRange.toDate) ||
            (dateRange.fromDate && !dateRange.toDate && leadDate >= dateRange.fromDate) ||
            (!dateRange.fromDate && dateRange.toDate && leadDate <= dateRange.toDate);

        // If no date filter is applied, include all dates
        if (!isWithinDateRange) return false;

        // Check if the LeadReport matches the selected statuses
        const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(LeadReport.Status);

        // If no status filter is applied, include all statuses
        if (!matchesStatus) return false;

        // Check if the LeadReport matches the selected group
        const matchesGroup = AssignedGroup === 'all' || LeadReport.AssignedGroup === AssignedGroup;

        // If no group filter is applied, include all groups
        if (!matchesGroup) return false;

        // If all conditions are met, include the LeadReport
        return true;
    });



    const [currentPage, setCurrentPage] = useState(1); // Track the current page

    const [itemsPerPage, setItemsPerPage] = useState(2);

    // Function to calculate the number of pages
    const totalPages = Math.ceil(filteredLeadReport.length / itemsPerPage);

    // Slice the filteredLeadReport based on the current page
    const currentData = filteredLeadReport.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value)); // Update itemsPerPage with the selected value
    };


    const location = useLocation();


    return (
        <>
            <div className='fixed flex justify-end z-10 py-3  overflow-hidden w-full text-white '>
                <div className='cursor-pointer mr-4 bg-black'>
                    <FaUserCircle onClick={logout} size={28} />
                </div>
                {showLogout && (
                    <>
                        <div className='fixed text-black text-center px-2 w-1/12 shadow-2xl overflow-hidden bg-white border border-gray-400 mr-1 mt-10 z-50 justify-end rounded-lg'>
                            <h1 className='px-6 py-2 rounded-md my-1'>Name</h1>
                            <h1 onClick={logoutUser} className='flex px-6 py-2 rounded-md my-1 cursor-pointer hover:bg-black hover:text-white'><MdLogout size={24} /> Logout</h1>
                        </div>
                    </>
                )}
            </div>

            <div className="fixed z-20 flex flex-col min-h-screen w-1/6 shadow-2xl overflow-hidden bg-black text-white" style={{width:"15%"}}>
    <img className="p-4" src={Q} alt="Q-Trackr Logo" />
    
    <h1 onClick={toggleLeadTracker} className="flex items-center justify-between p-2 cursor-pointer bg-white mx-3 rounded-md my-3 text-black">
        <div className="flex items-center">
            <SiPivotaltracker size={24} />
            &nbsp;Lead Tracker
        </div>
        {leadTracker ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
    </h1>
    {leadTracker && (
        <div className="ml-3">
            <h1 onClick={dash} className="p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black">
                <MdDashboard size={24} />
                &nbsp;Dashboard
            </h1>
            <h1 onClick={addLead} className="p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black">
                <MdAddBox size={24} />
                &nbsp;Add Lead
            </h1>
            <h1 onClick={leadReport} className="p-1 cursor-pointer bg-white mx-3 flex rounded-md mb-1 text-black">
                <BiSolidReport size={24} />
                &nbsp;Lead Reports
            </h1>
        </div>
    )}

    {/* <h1 onClick={toggleMasters} className="flex items-center justify-between p-2 cursor-pointer hover:bg-white mx-3 rounded-md my-2 hover:text-black">
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
        <div className="flex items-center">
            <MdFolderCopy size={24} />
            &nbsp;Masters
        </div>
        {masters ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
    </h1>
    {masters && (
        <div className="ml-3">
            <h1 onClick={NavEmployees} className="p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black">
                <IoIosPeople size={24} />
                &nbsp;Employees
            </h1>
            <h1 onClick={NavServiceType} className="p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black">
                <FaServicestack size={24} />
                &nbsp;Service Type
            </h1>
            <h1 onClick={NavLeadType} className="p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black">
                <MdCategory size={24} />
                &nbsp;Lead Type
            </h1>
            <h1 onClick={NavStatus} className="p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black">
                <MdPending size={24} />
                &nbsp;Status
            </h1>
            <h1 onClick={NavSource} className="p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black">
                <DiOpensource size={24} />
                &nbsp;Source
            </h1>
            <h1 onClick={NavClientMaster} className="p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black">
                <RiMastercardFill size={24} />
                &nbsp;Client Master
            </h1>
            <h1 onClick={NavAddGrp} className="p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md mb-1 hover:text-black">
                <MdGroupAdd size={24} />
                &nbsp;Add Group
            </h1>
        </div>
    )} */}

<<<<<<< HEAD
        <h1
          onClick={toggleContact}
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-white mx-3 rounded-md my-2 hover:text-black"
        >
          <div className="flex items-center">
            <MdContacts size={24} />
            &nbsp;Contact Us
          </div>
          {Contact ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
        </h1>
        {Contact && (
          <div className="ml-3">
            <h1
              onClick={sendEmail}
              className="p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md hover:text-black"
            >
              <IoIosMail size={24} />
              &nbsp;info@dext.site
            </h1>
          </div>
        )}

        <img className="p-4 mt-auto bg-white" src={loram} alt="Loram Logo" />
      </div>

      {showEdit && (
        <div className="ml-80 p-4 bg-white mb-16  border border-gray-200 relative overflow-hidden shadow-lg w-3/4 justify-center top-24">
          <h1 className="text-2xl mb-2 font-semibold">Edit Lead Report</h1>
          <hr />
          <hr />
          <br />
          <div className="flex justify-start w-full">
            <div className="mx-3 w-full">
              <label className="block" htmlFor="Name">
                Client Name:
              </label>
              <input
                className="border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none"
                type="text"
                placeholder="Enter Name"
                value={ClientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>
            <div className="mx-3 w-full">
              <label className="block" htmlFor="date">
                Lead Date:
              </label>
              <input
                className="border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none"
                type="date"
                id="date"
                name="date"
                value={LeadDate}
                onChange={(e) => setLeadDate(e.target.value)}
              />
            </div>
            <div className="mx-3 w-full">
              <label className="block" htmlFor="Name">
                Source:
              </label>
              <select
                onClick={Ref}
                className="border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none"
                value={Source}
                onChange={(e) => setSource(e.target.value)}
                name="auth"
                id="auth"
              >
                <option value="" disabled>
                  Select Source
                </option>
                {Sources.map((Sourc) => (
                  <option key={Sourc.id} value={Sourc.newSource}>
                    {Sourc.newSource}
                  </option>
                ))}
              </select>
            </div>
            {showRef && (
              <div className="mx-3 w-full">
                <label className="block" htmlFor="Name">
                  Reference:
                </label>
                <input
                  className="border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none"
                  type="text"
                  placeholder="Enter Reference"
                  value={Reference}
                  onChange={(e) => setReference(e.target.value)}
                />
              </div>
            )}
          </div>
          <br />
          <div className="flex justify-start w-full">
            <div className="mx-3 w-full">
              <label className="block" htmlFor="Name">
                Project Name:
              </label>
              <input
                className="border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none"
                type="text"
                placeholder="Enter Project Name"
                value={ProjectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="mx-3 w-full">
              <label className="block" htmlFor="Name">
                Quoted Value:
              </label>
              <input
                className="border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none"
                type="text"
                placeholder="Enter Quoted Value"
                inputMode="numeric"
                pattern="[0-9]*"
                value={formatNumberWithCommas(QuotedValue)}
                onChange={(e) =>
                  setQuotedValue(
                    e.target.value.replace(/,/g, "").replace(/\D/g, "")
                  )
                }
              />
            </div>
            <div className="mx-3 w-full">
              <label className="block" htmlFor="Name">
                Group Assigned:
              </label>
              <select
                className="border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none"
                value={AssignedGroup}
                onChange={(e) => setAssignedGroup(e.target.value)}
                name="auth"
                id="auth"
              >
                <option value="" disabled>
                  Select Group
                </option>
                {GroupNames.map((group) => (
                  <option key={group.id} value={group.newGroupName}>
                    {group.newGroupName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <br />
          <div className="flex justify-start w-full">
            <div className="mx-3 w-full">
              <label className="block" htmlFor="Name">
                Lead Type:
              </label>
              <select
                className="border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none"
                value={LeadType}
                onChange={(e) => setLeadType(e.target.value)}
                name="auth"
                id="auth"
              >
                <option value="" disabled>
                  Select Lead Type
                </option>
                {LeadTypes.map((LeadTyp) => (
                  <option key={LeadTyp.id} value={LeadTyp.LeadType}>
                    {LeadTyp.LeadType}
                  </option>
                ))}
              </select>
            </div>
            <div className="mx-3 w-full">
              <label className="block" htmlFor="Name">
                Status:
              </label>
              <select
                onClick={Prob}
                className="border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none"
                value={Status}
                onChange={(e) => setStatus(e.target.value)}
                name="auth"
                id="auth"
              >
                <option value="" disabled>
                  Select Status
                </option>
                {statuses.map((statuse) => (
                  <option key={statuse.id} value={statuse.status}>
                    {statuse.status}
                  </option>
                ))}
              </select>
            </div>
            {showProb && (
              <div className="mx-3 w-full">
                <label className="block" htmlFor="Name">
                  Probability:
                </label>
                <select
                  className="border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none"
                  value={Probability}
                  onChange={(e) => setProbability(e.target.value)}
                  name="auth"
                  id="auth"
                >
                  <option value="null" disabled>
                    Select Probability
                  </option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            )}
            <div className="mx-3 w-full">
              <label className="block" htmlFor="date">
                Next Follow-up Date:
              </label>
              <input
                className="border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none"
                type="date"
                id="date"
                name="date"
                value={FollowupDate}
                onChange={(e) => setFollowupDate(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="flex mt-14 justify-center">
            <button
              onClick={Submit}
              className="mx-2 py-2 px-5 bg-blue-600 hover:bg-blue-900 overflow-hidden shadow-md text-white rounded-sm"
            >
              Confirm
            </button>
            <button
              onClick={Cancel}
              className="mx-2 py-2 px-5 bg-black hover:bg-white hover:text-black border border-black overflow-hidden shadow-md text-white rounded-sm"
            >
              Cancel
            </button>
          </div>
          <br />
        </div>
      )}

      <div className="ml-80 p-4 bg-white  border border-gray-200 relative overflow-hidden shadow-lg w-3/4 justify-center top-24">
        <div className="flex-col">
          <h1 className="text-2xl w-4/5 mb-2 font-semibold">
            All Lead Reports
          </h1>

          <div className="mb-1">
            <form className="flex flex-wrap">
              <div className="mb-4 mr-4">
                <label htmlFor="fromDate" className="block text-gray-700 ">
                  From Date:
                </label>
                <DatePicker
                  selected={dateRange.fromDate}
                  onChange={handleFromDateChange}
                  dateFormat="MM-dd-yyyy"
                  className="p-2 pl-4 shadow-md outline-0 border border-gray-500 rounded-lg w-full"
                  placeholderText="mm-dd-yyyy"
                />
              </div>

              <div className="mb-4 mr-4">
                <label htmlFor="toDate" className="block text-gray-700">
                  To Date:
                </label>
                <DatePicker
                  selected={dateRange.toDate}
                  onChange={handleToDateChange}
                  dateFormat="MM-dd-yyyy"
                  className="p-2 pl-4 shadow-md outline-0 border border-gray-500 rounded-lg w-full"
                  placeholderText="mm-dd-yyyy"
                />
              </div>

              <div></div>
              <div className="flex mb-4 mr-4 items-start">
                {/* Select Status Field */}
                <div
                  className="mb-4 mr-4"
                  ref={dropdownRef}
                  style={{ flex: "1 0 auto" }}
                >
                  <label
                    htmlFor="selectedStatus"
                    className="block text-gray-700  "
                  >
                    Status:
                  </label>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDropdownOpen(!isDropdownOpen);
                    }}
                    className="flex items-center justify-between border border-gray-400 rounded-md p-2 shadow-md w-auto min-w-[15rem] max-w-full"
                  >
                    {selectedStatusesString || "Select Status"}
                    <span
                      className={`ml-2 text-sm font-black transition-transform transform`}
                    >
                      ⌵
                    </span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-10 border border-gray-400 bg-white w-1/4 shadow-md mt-1 rounded-md">
                      {statuses.map((statuse) => (
                        <div key={statuse.id} className="flex items-center p-2">
                          <input
=======
    <h1 onClick={toggleContact} className="flex items-center justify-between p-2 cursor-pointer hover:bg-white mx-3 rounded-md my-2 hover:text-black" >
        <div className="flex items-center">
            <MdContacts size={24} />
            &nbsp;Contact Us
        </div>
        {Contact ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
    </h1>
    {Contact && (
        <div className="ml-3">
            <h1 onClick={sendEmail} className="p-1 cursor-pointer hover:bg-white mx-3 flex rounded-md hover:text-black">
                <IoIosMail size={24} />
                &nbsp;info@dext.site
            </h1>
        </div>
    )}

    <img className="p-4 mt-auto bg-white" src={loram} alt="Loram Logo" />
</div>


            {showEdit && (
                <div className='ml-80 p-4 bg-white mb-16  border border-gray-200 relative overflow-hidden shadow-lg w-3/4 justify-center top-24'>
                    <h1 className='text-2xl mb-2 font-semibold'>Edit Lead Report</h1><hr /><hr /><br />
                    <div className='flex justify-start w-full'>
                        <div className='mx-3 w-full'>
                            <label className='block' htmlFor="Name">Client Name:</label>
                            <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="text" placeholder='Enter Name' value={ClientName} onChange={(e) => setClientName(e.target.value)} />
                        </div>
                        <div className='mx-3 w-full'>
                            <label className='block' htmlFor="date">Lead Date:</label>
                            <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="date" id="date" name="date" value={LeadDate} onChange={(e) => setLeadDate(e.target.value)} />
                        </div>
                        <div className='mx-3 w-full'>
                            <label className='block' htmlFor="Name">Source:</label>
                            <select onClick={Ref} className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' value={Source} onChange={(e) => setSource(e.target.value)} name="auth" id="auth">
                                <option value="" disabled>Select Source</option>
                                {Sources.map(Sourc => (
                                    <option key={Sourc.id} value={Sourc.newSource}>{Sourc.newSource}</option>
                                ))}
                            </select>
                        </div>
                        {showRef && (
                            <div className='mx-3 w-full'>
                                <label className='block' htmlFor="Name">Reference:</label>
                                <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="text" placeholder='Enter Reference' value={Reference} onChange={(e) => setReference(e.target.value)} />
                            </div>
                        )}
                    </div>
                    <br />
                    <div className='flex justify-start w-full'>
                        <div className='mx-3 w-full'>
                            <label className='block' htmlFor="Name">Project Name:</label>
                            <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="text" placeholder='Enter Project Name' value={ProjectName} onChange={(e) => setProjectName(e.target.value)} />
                        </div>
                        <div className='mx-3 w-full'>
                            <label className='block' htmlFor="Name">Quoted Value:</label>
                            <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="text" placeholder='Enter Quoted Value' inputMode="numeric" pattern="[0-9]*" value={formatNumberWithCommas(QuotedValue)} onChange={(e) => setQuotedValue(e.target.value.replace(/,/g, '').replace(/\D/g, ''))} />
                        </div>
                        <div className='mx-3 w-full'>
                            <label className='block' htmlFor="Name">Group Assigned:</label>
                            <select className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' value={AssignedGroup} onChange={(e) => setAssignedGroup(e.target.value)} name="auth" id="auth">
                                <option value="" disabled>Select Group</option>
                                {GroupNames.map(group => (
                                    <option key={group.id} value={group.newGroupName}>{group.newGroupName}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <br />
                    <div className='flex justify-start w-full'>

                        <div className='mx-3 w-full'>
                            <label className='block' htmlFor="Name">Lead Type:</label>
                            <select className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' value={LeadType} onChange={(e) => setLeadType(e.target.value)} name="auth" id="auth">
                                <option value="" disabled>Select Lead Type</option>
                                {LeadTypes.map(LeadTyp => (
                                    <option key={LeadTyp.id} value={LeadTyp.LeadType}>{LeadTyp.LeadType}</option>
                                ))}
                            </select>
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
                            <label className='block' htmlFor="date">Next Follow-up Date:</label>
                            <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="date" id="date" name="date" value={FollowupDate} onChange={(e) => setFollowupDate(e.target.value)} />
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
                <div className='flex-col'>
                    <h1 className='text-2xl w-4/5 mb-2 font-semibold'>All Lead Reports</h1>

                    <div className='mb-1' >
                        <form className='flex flex-wrap'>
                            
                                <div className="mb-4 mr-4">
                                    <label htmlFor="fromDate" className="block text-gray-700 ">From Date:</label>
                                    <DatePicker
                                        selected={dateRange.fromDate}
                                        onChange={handleFromDateChange}
                                        dateFormat="MM-dd-yyyy"
                                        className="p-2 pl-4 shadow-md outline-0 border border-gray-500 rounded-lg w-full"
                                        placeholderText='mm-dd-yyyy'
                                    />
                                </div>

                                <div className="mb-4 mr-4">
                                    <label htmlFor="toDate" className="block text-gray-700">To Date:</label>
                                    <DatePicker
                                        selected={dateRange.toDate}
                                        onChange={handleToDateChange}
                                        dateFormat="MM-dd-yyyy"
                                        className="p-2 pl-4 shadow-md outline-0 border border-gray-500 rounded-lg w-full"
                                        placeholderText='mm-dd-yyyy'
                                    />
                                </div>

                            <div></div>
                            <div className='flex mb-4 mr-4 items-start'>
    {/* Select Status Field */}
    <div className='mb-4 mr-4' ref={dropdownRef} style={{ flex: "1 0 auto" }}>
        <label htmlFor="selectedStatus" className="block text-gray-700  ">Status:</label>
        <button
            type="button"
            onClick={(e) => {
                e.preventDefault();
                setIsDropdownOpen(!isDropdownOpen);
            }}
            className='flex items-center justify-between border border-gray-400 rounded-md p-2 shadow-md w-auto min-w-[15rem] max-w-full'
        >
            {selectedStatusesString || 'Select Status'}
            <span
                className={`ml-2 text-sm font-black transition-transform transform`}
            >
                ⌵
            </span>
        </button>

        {isDropdownOpen && (
            <div className='absolute z-10 border border-gray-400 bg-white w-1/4 shadow-md mt-1 rounded-md'>
                {statuses.map((statuse) => (
                    <div key={statuse.id} className='flex items-center p-2'>
                        <input
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                            type="checkbox"
                            id={statuse.id}
                            value={statuse.status}
                            onChange={handleCheckboxChange}
                            checked={selectedStatuses.includes(statuse.status)}
<<<<<<< HEAD
                            className="mr-2"
                          />
                          <label htmlFor={statuse.id}>{statuse.status}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Adjacent Group Field */}
                <div className="mb-4 w-full">
                  <label className="block   " htmlFor="Name">
                    Group:<span className="text-red-500">*</span>
                  </label>
                  <select
                    className="border min-w-[15rem] h-[42px] border-gray-400 rounded-md p-2 shadow-md outline-none"
                    value={AssignedGroup}
                    onChange={(e) => {
                      setAssignedGroup(e.target.value); // Update the selected group
                      setCurrentPage(1); // Reset pagination to the first page
                    }}
                    name="auth"
                    id="auth"
                    required
                  >
                    <option value="all">All</option>
                    {GroupNames.map((group) => (
                      <option key={group.id} value={group.newGroupName}>
                        {group.newGroupName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          </div>

          <div className="flex justify-between items-center">
            {/* <div className='mt-4'>
=======
                            className='mr-2'
                        />
                        <label htmlFor={statuse.id}>{statuse.status}</label>
                    </div>
                ))}
            </div>
        )}
    </div>

    {/* Adjacent Group Field */}
    <div className='mb-4 w-full'>
        <label className='block   ' htmlFor="Name">Group:<span className='text-red-500'>*</span></label>
        <select
            className='border min-w-[15rem] h-[42px] border-gray-400 rounded-md p-2 shadow-md outline-none'
            value={AssignedGroup}
            onChange={(e) => {
                setAssignedGroup(e.target.value); // Update the selected group
                setCurrentPage(1); // Reset pagination to the first page
            }}
            name="auth"
            id="auth"
            required
        >
            <option value="all">All</option>
            {GroupNames.map(group => (
                <option key={group.id} value={group.newGroupName}>{group.newGroupName}</option>
            ))}
        </select>
    </div>
</div>

                            


                        </form>
                    </div>

                    <div className='flex justify-between items-center'> 
                        <div className='mt-4'>
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                            <label htmlFor="entriesPerPage">Show Entries: </label>
                            <select className='border-2 border-gray-400 rounded-md mb-2 p-1 overflow-hidden shadow-md outline-none' id="entriesPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                                <option value={2}>2</option>
                                <option value={4}>4</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
<<<<<<< HEAD
                        </div> */}

            <div className="flex w-64">
              <label className="mt-4 mr-2">Search:</label>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="border w-full  border-gray-300 rounded-md mb-2 p-2 overflow-hidden shadow-md outline-none"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
        <hr />
        <hr />
        <br />
        <div className="max-h-[500px] overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-black sticky top-0">
              <tr className="text-white">
                <th className="px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 w-24 py-3 text-center border text-xs font-medium uppercase tracking-wider">
                  Lead Date
                </th>
                <th className="px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider">
                  Client Name
                </th>
                <th className="px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider">
                  Lead type
                </th>
                <th className="px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider">
                  Quoted Value
                </th>
                <th className="px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider">
                  Source
                </th>
                <th className="px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider">
                  Group
                </th>
                <th className="px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider">
                  Followup Date
                </th>
                <th className="px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider">
                  Edit
                </th>
                <th className="px-8 py-3 text-center border text-xs font-medium uppercase tracking-wider">
                  <FaTrash size={18} />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((LeadReport, index) => (
                <tr className="border text-sm" key={LeadReport.id}>
                  <td className="px-3 text-center py-2">
                    {index + 1 + (currentPage - 1) * 10}
                  </td>
                  <td className="px-3 text-center py-2">
                    {formatDate(LeadReport.LeadDate)}
                  </td>
                  <td className="px-3 text-center py-2">
                    {LeadReport.ClientName}
                  </td>
                  <td className="px-3 text-center py-2">
                    {LeadReport.ProjectName}
                  </td>
                  <td className="px-3 text-center py-2">
                    {LeadReport.LeadType}
                  </td>
                  <td className="px-3 text-center py-2">
                    ${LeadReport.QuotedValue}
                  </td>
                  <td className="px-3 text-center py-2">{LeadReport.Status}</td>
                  <td className="px-3 text-center py-2">{LeadReport.Source}</td>
                  <td className="px-3 text-center py-2">
                    {LeadReport.AssignedGroup}
                  </td>
                  <td className="px-3 text-center py-3">
                    {LeadReport.Status === "Won" || LeadReport.Status === "Lost"
                      ? "N/A"
                      : formatDate(LeadReport.FollowupDate)}
                  </td>
                  <td
                    onClick={() =>
                      navigate(`/editlead2/${LeadReport.id}`, {
                        state: { from: location.pathname },
                      })
                    }
                    className="px-4 hover:bg-black cursor-pointer hover:text-white text-center py-2"
                  >
                    <MdEditSquare size={20} />
                  </td>
                  <td
                    onClick={() => deleteLeadReport(LeadReport.id)}
                    className="px-8 hover:bg-black cursor-pointer hover:text-white text-center py-2"
                  >
                    <FaTrash size={18} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination mt-4 flex justify-between items-center">
          <div>
            Showing {startIdx + 1} to {Math.min(endIdx, totalItems)} of{" "}
            {totalItems} entries
          </div>

          <div>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 mx-2 border rounded"
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: 3 }, (_, index) => {
              // Calculate the page number for the current range
              const pageNumber = currentPage - 1 + index;

              // Ensure the pageNumber stays within bounds
              if (pageNumber >= 1 && pageNumber <= totalPages) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-4 py-2 mx-2 border rounded ${
                      currentPage === pageNumber ? "bg-gray-300" : ""
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              }

              // Return null for out-of-bounds values
              return null;
            })}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-4 py-2 mx-2 border rounded"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
=======
                        </div>

                        <div className='flex w-64'>
                            <label className='mt-4 mr-2'>Search:</label>
                            <input type="text" value={searchQuery} onChange={handleSearchInputChange} className='border w-full  border-gray-300 rounded-md mb-2 p-2 overflow-hidden shadow-md outline-none' placeholder='Search' />
                        </div>
                    </div>
                </div>
                <hr /><hr /><br />
                <div className="max-h-[500px] overflow-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-black sticky top-0">
                            <tr className='text-white'>
                                <th className="px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider">#</th>
                                <th className="px-4 w-24 py-3 text-center border text-xs font-medium uppercase tracking-wider">Lead Date</th>
                                <th className="px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider">Client Name</th>
                                <th className="px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider">Project Name</th>
                                <th className="px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider">Lead type</th>
                                <th className="px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider">Quoted Value</th>
                                <th className="px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider">Source</th>
                                <th className="px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider">Group</th>
                                <th className="px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider">Followup Date</th>
                                <th className="px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider">Edit</th>
                                <th className="px-8 py-3 text-center border text-xs font-medium uppercase tracking-wider"><FaTrash size={18} /></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentData.map(LeadReport => (
                                <tr className='border text-sm' key={LeadReport.id}>
                                    <td className="px-3 text-center py-2">{LeadReport.id}</td>
                                    <td className="px-3 text-center py-2">{formatDate(LeadReport.LeadDate)}</td>
                                    <td className="px-3 text-center py-2">{LeadReport.ClientName}</td>
                                    <td className="px-3 text-center py-2">{LeadReport.ProjectName}</td>
                                    <td className="px-3 text-center py-2">{LeadReport.LeadType}</td>
                                    <td className="px-3 text-center py-2">${LeadReport.QuotedValue}</td>
                                    <td className="px-3 text-center py-2">{LeadReport.Status}</td>
                                    <td className="px-3 text-center py-2">{LeadReport.Source}</td>
                                    <td className="px-3 text-center py-2">{LeadReport.AssignedGroup}</td>
                                    <td className="px-3 text-center py-3">{LeadReport.Status === "Won" || LeadReport.Status === "Lost" ?  'N/A' : formatDate(LeadReport.FollowupDate) }</td>
                                    <td onClick={() =>navigate(`/editlead2/${LeadReport.id}`, {state: { from: location.pathname },})} className="px-4 hover:bg-black cursor-pointer hover:text-white text-center py-2"><MdEditSquare size={20} /></td>
                                    <td onClick={() => deleteLeadReport(LeadReport.id)} className="px-8 hover:bg-black cursor-pointer hover:text-white text-center py-2"><FaTrash size={18} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> 

                <div className="pagination mt-4 flex justify-center">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className="px-4 py-2 mx-2 border rounded"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-4 py-2 mx-2 border rounded ${currentPage === index + 1 ? 'bg-gray-300' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className="px-4 py-2 mx-2 border rounded"
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>


            </div>
        </>
    );
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
};

export default LeadReport;
