<<<<<<< HEAD
import React, { useState, useCallback, useEffect, useRef } from 'react';
=======
import React, { useState,useCallback, useEffect, useRef } from 'react';
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import Chart from 'chart.js/auto';

import { IoIosArrowDown, IoIosArrowUp, IoIosMail } from "react-icons/io";
import { FaUserCircle, FaTrash } from "react-icons/fa";
import { SiPivotaltracker } from "react-icons/si";
import { MdDashboard, MdContacts, MdLogout, MdSearch, MdEditSquare } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import checkSessionValidity from '../CheckSessionValidity';

import loram from "../Assets/loram.png";
import Q from "../Assets/Qtrackr.png";
import icon from "../Assets/icon1.png";
import DatePicker from 'react-datepicker';
import hand from "../Assets/hand.png";
import fire from "../Assets/fire.jpeg";
<<<<<<< HEAD
import Loader from '../loader/Loader';
Chart.defaults.plugins.legend.display = false;
const Dashboard1 = () => {


    const [probabilityFilterDateFrom, setProbabilityFilterDateFrom] = useState();
    const [probabilityFilterDateTo, setProbabilityFilterDateTo] = useState();
    const [statusFilterDateFrom, setStatusFilterDateFrom] = useState();
    const [statusFilterDateTo, setStatusFilterDateTo] = useState();
    const [LeadCount, setLeadCount] = useState(0);
    const [totalQuotedValue, setTotalQuotedValue] = useState(0);
    const [wonLeadCount, setWonLeadCount] = useState(0);
    const [wonTotalQuotedValue, setWonTotalQuotedValue] = useState(0);
    const [wonRecurringLeadCount, setWonRecurringLeadCount] = useState(0);
    const [wonRecurringTotalQuotedValue, setWonRecurringTotalQuotedValue] = useState(0);
    const [pendingLeadCount, setPendingLeadCount] = useState(0);
    const [pendingTotalQuotedValue, setPendingTotalQuotedValue] = useState(0);
    const [lostLeadCount, setLostLeadCount] = useState(0);
    const [lostTotalQuotedValue, setLostTotalQuotedValue] = useState(0);
    const [filteredLeadReports, setFilteredLeadReports] = useState([]);

    const [groupFilter, setGroupFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [, setShowProb] = useState(false);
    const [sourceFilterDateFrom, setSourceFilterDateFrom] = useState();
    const [sourceFilterDateTo, setSourceFilterDateTo] = useState();
    const [selectedSource, setSelectedSource] = useState();
    const [potentialStatus, setPotentialStatus] = useState([]);
    const [potentialSource, setPotentialSource] = useState([]);
    const [probabilityStatus, setProbabilityStatus] = useState([]);
    const [totalStatusAmount, setTotalStatusAmount] = useState(0);
    const [totalProbabilityAmount, setTotalProbabilityAmount] = useState(0);
    const [totalSourceAmount, setTotalSourceAmount] = useState(0);
    const [, setTotalStatusCount] = useState(0);
    const [, setTotalProbabilityCount] = useState(0);
    const [, setTotalSourceCount] = useState(0);
    const statusChartRef = useRef(null);
    const sourceChartRef = useRef(null);
    const probChartRef = useRef(null);

    const [uploadLoader, setUploadLoader] = useState(false);
    const [deleteLoader, setDeleteLoader] = useState(false);
    const [downloadLoader, setDownloadLoader] = useState(false);

    const getRowClass = (followUpDate) => {
        if (!followUpDate) return ""; // No color if date is not present
        const today = new Date();
        const followDate = new Date(followUpDate);
        const diffInMonths = (followDate.getFullYear() - today.getFullYear()) * 12 + (followDate.getMonth() - today.getMonth());

        if (diffInMonths < 2) return "bg-red-700"; // Less than 2 months: Red
        if (diffInMonths >= 2 && diffInMonths < 4) return "bg-orange-500"; // 2-4 months: Orange
        if (diffInMonths >= 4 && diffInMonths < 6) return "bg-green-500"; // 4-6 months: Green

        return "bg-green-500"; // Default: no color if more than 6 months
    };
    /*const getRowClass2 = (Status) => {
        if (!Status) return ""; // No color if date is not present
        
    
        if (Status === "Won") return "bg-green-700"; // Less than 2 months: Red
        if (Status === "Won Recurring") return "bg-blue-700";
        if (Status === "Pending") return "bg-yellow-400";
        if (Status === "Lost") return "bg-red-700";
    };*/

    useEffect(() => {
        // Update the count of filtered leads
        setLeadCount(filteredLeadReports.length);

        // Calculate the total QuotedValue
        const total = filteredLeadReports.reduce((sum, lead) => sum + (lead.QuotedValue || 0), 0);
        setTotalQuotedValue(total);

        // Filter and calculate count and total for leads with "Won" status
        const wonLeads = filteredLeadReports.filter(lead => lead.Status === "Won");
        setWonLeadCount(wonLeads.length);

        const wonTotal = wonLeads.reduce((sum, lead) => sum + (lead.QuotedValue || 0), 0);
        setWonTotalQuotedValue(wonTotal);

        const wonRecurringLeads = filteredLeadReports.filter(lead => lead.Status === "Won Recurring");
        setWonRecurringLeadCount(wonRecurringLeads.length);

        const wonRecurringTotal = wonRecurringLeads.reduce((sum, lead) => sum + (lead.QuotedValue || 0), 0);
        setWonRecurringTotalQuotedValue(wonRecurringTotal);

        const pendingLeads = filteredLeadReports.filter(lead => lead.Status === "Pending");
        setPendingLeadCount(pendingLeads.length);

        const pendingTotal = pendingLeads.reduce((sum, lead) => sum + (lead.QuotedValue || 0), 0);
        setPendingTotalQuotedValue(pendingTotal);

        const lostLeads = filteredLeadReports.filter(lead => lead.Status === "Lost");
        setLostLeadCount(lostLeads.length);

        const lostTotal = lostLeads.reduce((sum, lead) => sum + (lead.QuotedValue || 0), 0);
        setLostTotalQuotedValue(lostTotal);

    }, [filteredLeadReports]);

    const handleSubmit = () => {

        console.log(groupFilter);  // Check the value of groupFilter
        console.log(LeadReports);
        if (groupFilter === "") {
            // If 'All' is selected, reset the filtered data to the original data
            setFilteredLeadReports(LeadReports);

        } else {
            // Filter the LeadReports based on the selected group
            const filtered = LeadReports.filter(report => report.AssignedGroup === groupFilter);
            setFilteredLeadReports(filtered);
            console.log(filteredLeadReports);
        }

    };

    const handleFilter = () => {
        // Filter data based on date range and group selection
        const filteredData = filteredLeadReports.filter((LeadReport) => {
            const reportDate = new Date(LeadReport.LeadDate); // Replace 'date' with the actual date field name
            const isWithinDateRange =
                (!probabilityFilterDateFrom || reportDate >= probabilityFilterDateFrom) &&
                (!probabilityFilterDateTo || reportDate <= probabilityFilterDateTo);
            const isWithinGroup =
                !AssignedGroup || AssignedGroup === "all" || LeadReport.AssignedGroup === AssignedGroup;

            return isWithinDateRange && isWithinGroup;
        });

        // Pass the filtered data to aggregate function
        aggregateProbabilityData(filteredData);
    };

    const aggregateProbabilityData = (data) => {
        const probMap = new Map();
        let totalProbAmount = 0;
        let totalCount = 0;

        data.forEach((LeadReport) => {
            const prob = LeadReport.Probability;
            if (!prob) return;

            const count = probMap.has(prob) ? probMap.get(prob).count + 1 : 1;
            const amount = parseFloat(LeadReport.QuotedValue);
            totalProbAmount += amount;
            totalCount++;
            probMap.set(prob, { count, amount: (probMap.get(prob)?.amount || 0) + amount });
        });

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
    const Prob = (e) => {
        e.preventDefault();
        if (Status === 'Pending') {
            setShowProb(true);
        }
        else {
            setShowProb(false);
        }
    };
    const handlePotentialStatusFilter = () => {
        // Filter data based on date range and status selection
        const filteredData = filteredLeadReports.filter((item) => {


            const itemDate = new Date(item.LeadDate); // Replace 'date' with your actual date field name

            const isWithinDateRange =
                (!statusFilterDateFrom || itemDate >= statusFilterDateFrom) &&
                (!statusFilterDateTo || itemDate <= statusFilterDateTo);



            const isMatchingStatus =
                !statusFilter || statusFilter === "all" || item.Status === statusFilter;



            return isWithinDateRange && isMatchingStatus;
        });

        // Update state or pass filtered data for further processing
        setPotentialStatus(filteredData);
        aggregatePotentialStatusData(filteredData);
        console.log(potentialStatus);


    };
    const aggregatePotentialStatusData = (filteredData) => {

        const statusMap = new Map();
        let totalStatusAmount = 0;
        let totalCount = 0;

        filteredData.forEach((LeadReport) => {
            const status = LeadReport.Status;
            if (!status) return;

            const count = statusMap.has(status) ? statusMap.get(status).count + 1 : 1;
            const amount = parseFloat(LeadReport.QuotedValue);
            totalStatusAmount += amount;
            totalCount++;
            statusMap.set(status, { count, amount: (statusMap.get(status)?.amount || 0) + amount });
        });

        const potentialStatusArray = Array.from(statusMap, ([status, { count, amount }]) => ({
            status,
            count,
            amount,
            percentage: ((amount / totalStatusAmount) * 100).toFixed(2),
        }));

        setPotentialStatus(potentialStatusArray);
        console.log(potentialStatusArray);
        setTotalStatusAmount(totalStatusAmount);
        setTotalStatusCount(totalCount);

    };
    const handleLeadingSourceFilter = () => {
        // Filter data based on date range and status selection
        const filteredData = filteredLeadReports.filter((item) => {


            const itemDate = new Date(item.LeadDate); // Replace 'date' with your actual date field name

            const isWithinDateRange =
                (!sourceFilterDateFrom || itemDate >= sourceFilterDateFrom) &&
                (!sourceFilterDateTo || itemDate <= sourceFilterDateTo);

            console.log("selected source", selectedSource)
            const isMatchingSource =
                !selectedSource || selectedSource === "all" || item.Source.trim().toLowerCase() === selectedSource.trim().toLowerCase();


            console.log("Item:", item);
            console.log("isWithinDateRange:", isWithinDateRange);
            console.log("isMatchingSource:", isMatchingSource);

            return isWithinDateRange && isMatchingSource;
        });

        // Update state or pass filtered data for further processing
        setPotentialSource(filteredData);
        console.log("filtered data", filteredData);
        aggregatePotentialSourceData(filteredData);
        console.log(potentialStatus);


    };


    useEffect(() => {
        console.log("potential source filter", potentialSource);
    }, [potentialSource]);



    // Helper function to format the date if not already done
    /*const formattheDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString();
    };*/

    const aggregatePotentialSourceData = (filteredData) => {

        const sourceMap = new Map();
        let totalSourceAmount = 0;
        let totalCount = 0;

        filteredData.forEach((LeadReport) => {
            const source = LeadReport.Source;
            if (!source) return;

            const count = sourceMap.has(source) ? sourceMap.get(source).count + 1 : 1;
            const amount = parseFloat(LeadReport.QuotedValue);
            totalSourceAmount += amount;
            totalCount++;
            sourceMap.set(source, { count, amount: (sourceMap.get(source)?.amount || 0) + amount });
        });

        const potentialSourceArray = Array.from(sourceMap, ([source, { count, amount }]) => ({
            source,
            count,
            amount,
            percentage: ((amount / totalSourceAmount) * 100).toFixed(2),
        }));

        console.log("Source Map:", sourceMap);

        setPotentialSource(potentialSourceArray);
        console.log(potentialSourceArray);
        setTotalSourceAmount(totalSourceAmount);
        setTotalSourceCount(totalCount);

    };

    const { enqueueSnackbar } = useSnackbar();
    const [Sources, setSources] = useState([]);
    useEffect(() => {
        const fetchSources = async () => {
            try {
                const response = await axios.get('http://localhost:9000/Source');
=======
Chart.defaults.plugins.legend.display = false;
const Dashboard1 = () => {

    
const [probabilityFilterDateFrom, setProbabilityFilterDateFrom] = useState();
const [probabilityFilterDateTo, setProbabilityFilterDateTo] = useState();
const [statusFilterDateFrom, setStatusFilterDateFrom] = useState();
const [statusFilterDateTo, setStatusFilterDateTo] = useState();
const [LeadCount, setLeadCount] = useState(0);
const [totalQuotedValue, setTotalQuotedValue] = useState(0);
const [wonLeadCount, setWonLeadCount] = useState(0);
const [wonTotalQuotedValue, setWonTotalQuotedValue] = useState(0);
const [wonRecurringLeadCount, setWonRecurringLeadCount] = useState(0);
const [wonRecurringTotalQuotedValue, setWonRecurringTotalQuotedValue] = useState(0);
const [pendingLeadCount, setPendingLeadCount] = useState(0);
const [pendingTotalQuotedValue, setPendingTotalQuotedValue] = useState(0);
const [lostLeadCount, setLostLeadCount] = useState(0);
const [lostTotalQuotedValue, setLostTotalQuotedValue] = useState(0);
const [filteredLeadReports, setFilteredLeadReports] = useState([]);

const [groupFilter, setGroupFilter] = useState('');
const [statusFilter, setStatusFilter] = useState('');
const [, setShowProb] = useState(false);
const [sourceFilterDateFrom, setSourceFilterDateFrom] = useState();
const [sourceFilterDateTo, setSourceFilterDateTo] = useState();
const [selectedSource, setSelectedSource] = useState();
const [potentialStatus, setPotentialStatus] = useState([]);
const [potentialSource, setPotentialSource] = useState([]);
const [probabilityStatus, setProbabilityStatus] = useState([]);
const [totalStatusAmount, setTotalStatusAmount] = useState(0);
const [totalProbabilityAmount, setTotalProbabilityAmount] = useState(0);
const [totalSourceAmount, setTotalSourceAmount] = useState(0);
const [, setTotalStatusCount] = useState(0);
const [, setTotalProbabilityCount] = useState(0);
const [, setTotalSourceCount] = useState(0);
const statusChartRef = useRef(null);
const sourceChartRef = useRef(null);
const probChartRef = useRef(null);

const getRowClass = (followUpDate) => {
    if (!followUpDate) return ""; // No color if date is not present
    const today = new Date();
    const followDate = new Date(followUpDate);
    const diffInMonths = (followDate.getFullYear() - today.getFullYear()) * 12 + (followDate.getMonth() - today.getMonth());

    if (diffInMonths < 2) return "bg-red-700"; // Less than 2 months: Red
    if (diffInMonths >= 2 && diffInMonths < 4) return "bg-orange-500"; // 2-4 months: Orange
    if (diffInMonths >= 4 && diffInMonths < 6) return "bg-green-500"; // 4-6 months: Green

    return "bg-green-500"; // Default: no color if more than 6 months
};
/*const getRowClass2 = (Status) => {
    if (!Status) return ""; // No color if date is not present
    

    if (Status === "Won") return "bg-green-700"; // Less than 2 months: Red
    if (Status === "Won Recurring") return "bg-blue-700";
    if (Status === "Pending") return "bg-yellow-400";
    if (Status === "Lost") return "bg-red-700";
};*/

useEffect(() => {
    // Update the count of filtered leads
    setLeadCount(filteredLeadReports.length);

    // Calculate the total QuotedValue
    const total = filteredLeadReports.reduce((sum, lead) => sum + (lead.QuotedValue || 0), 0);
    setTotalQuotedValue(total);

    // Filter and calculate count and total for leads with "Won" status
    const wonLeads = filteredLeadReports.filter(lead => lead.Status === "Won");
    setWonLeadCount(wonLeads.length);

    const wonTotal = wonLeads.reduce((sum, lead) => sum + (lead.QuotedValue || 0), 0);
    setWonTotalQuotedValue(wonTotal);

    const wonRecurringLeads = filteredLeadReports.filter(lead => lead.Status === "Won Recurring");
    setWonRecurringLeadCount(wonRecurringLeads.length);

    const wonRecurringTotal = wonRecurringLeads.reduce((sum, lead) => sum + (lead.QuotedValue || 0), 0);
    setWonRecurringTotalQuotedValue(wonRecurringTotal);

    const pendingLeads = filteredLeadReports.filter(lead => lead.Status === "Pending");
    setPendingLeadCount(pendingLeads.length);

    const pendingTotal = pendingLeads.reduce((sum, lead) => sum + (lead.QuotedValue || 0), 0);
    setPendingTotalQuotedValue(pendingTotal);

    const lostLeads = filteredLeadReports.filter(lead => lead.Status === "Lost");
    setLostLeadCount(lostLeads.length);

    const lostTotal = lostLeads.reduce((sum, lead) => sum + (lead.QuotedValue || 0), 0);
    setLostTotalQuotedValue(lostTotal);

}, [filteredLeadReports]);

const handleSubmit = () => {

    console.log(groupFilter);  // Check the value of groupFilter
    console.log(LeadReports);
    if (groupFilter === "") {
        // If 'All' is selected, reset the filtered data to the original data
        setFilteredLeadReports(LeadReports);

    } else {
        // Filter the LeadReports based on the selected group
        const filtered = LeadReports.filter(report => report.AssignedGroup === groupFilter);
        setFilteredLeadReports(filtered);
        console.log(filteredLeadReports);
    }

};

const handleFilter = () => {
    // Filter data based on date range and group selection
    const filteredData = filteredLeadReports.filter((LeadReport) => {
        const reportDate = new Date(LeadReport.LeadDate); // Replace 'date' with the actual date field name
        const isWithinDateRange =
            (!probabilityFilterDateFrom || reportDate >= probabilityFilterDateFrom) &&
            (!probabilityFilterDateTo || reportDate <= probabilityFilterDateTo);
        const isWithinGroup =
            !AssignedGroup || AssignedGroup === "all" || LeadReport.AssignedGroup === AssignedGroup;

        return isWithinDateRange && isWithinGroup;
    });

    // Pass the filtered data to aggregate function
    aggregateProbabilityData(filteredData);
};

const aggregateProbabilityData = (data) => {
    const probMap = new Map();
    let totalProbAmount = 0;
    let totalCount = 0;

    data.forEach((LeadReport) => {
        const prob = LeadReport.Probability;
        if (!prob) return;

        const count = probMap.has(prob) ? probMap.get(prob).count + 1 : 1;
        const amount = parseFloat(LeadReport.QuotedValue);
        totalProbAmount += amount;
        totalCount++;
        probMap.set(prob, { count, amount: (probMap.get(prob)?.amount || 0) + amount });
    });

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
const Prob = (e) => {
    e.preventDefault();
    if (Status === 'Pending') {
        setShowProb(true);
    }
    else {
        setShowProb(false);
    }
};
const handlePotentialStatusFilter = () => {
    // Filter data based on date range and status selection
    const filteredData = filteredLeadReports.filter((item) => {


        const itemDate = new Date(item.LeadDate); // Replace 'date' with your actual date field name

        const isWithinDateRange =
            (!statusFilterDateFrom || itemDate >= statusFilterDateFrom) &&
            (!statusFilterDateTo || itemDate <= statusFilterDateTo);



        const isMatchingStatus =
            !statusFilter || statusFilter === "all" || item.Status === statusFilter;



        return isWithinDateRange && isMatchingStatus;
    });

    // Update state or pass filtered data for further processing
    setPotentialStatus(filteredData);
    aggregatePotentialStatusData(filteredData);
    console.log(potentialStatus);


};
const aggregatePotentialStatusData = (filteredData) => {

    const statusMap = new Map();
    let totalStatusAmount = 0;
    let totalCount = 0;

    filteredData.forEach((LeadReport) => {
        const status = LeadReport.Status;
        if (!status) return;

        const count = statusMap.has(status) ? statusMap.get(status).count + 1 : 1;
        const amount = parseFloat(LeadReport.QuotedValue);
        totalStatusAmount += amount;
        totalCount++;
        statusMap.set(status, { count, amount: (statusMap.get(status)?.amount || 0) + amount });
    });

    const potentialStatusArray = Array.from(statusMap, ([status, { count, amount }]) => ({
        status,
        count,
        amount,
        percentage: ((amount / totalStatusAmount) * 100).toFixed(2),
    }));

    setPotentialStatus(potentialStatusArray);
    console.log(potentialStatusArray);
    setTotalStatusAmount(totalStatusAmount);
    setTotalStatusCount(totalCount);

};
const handleLeadingSourceFilter = () => {
    // Filter data based on date range and status selection
    const filteredData = filteredLeadReports.filter((item) => {


        const itemDate = new Date(item.LeadDate); // Replace 'date' with your actual date field name

        const isWithinDateRange =
            (!sourceFilterDateFrom || itemDate >= sourceFilterDateFrom) &&
            (!sourceFilterDateTo || itemDate <= sourceFilterDateTo);

        console.log("selected source", selectedSource)
        const isMatchingSource =
            !selectedSource || selectedSource === "all" || item.Source.trim().toLowerCase() === selectedSource.trim().toLowerCase();


        console.log("Item:", item);
        console.log("isWithinDateRange:", isWithinDateRange);
        console.log("isMatchingSource:", isMatchingSource);

        return isWithinDateRange && isMatchingSource;
    });

    // Update state or pass filtered data for further processing
    setPotentialSource(filteredData);
    console.log("filtered data", filteredData);
    aggregatePotentialSourceData(filteredData);
    console.log(potentialStatus);


};


useEffect(() => {
    console.log("potential source filter", potentialSource);
}, [potentialSource]);



// Helper function to format the date if not already done
/*const formattheDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
};*/

const aggregatePotentialSourceData = (filteredData) => {

    const sourceMap = new Map();
    let totalSourceAmount = 0;
    let totalCount = 0;

    filteredData.forEach((LeadReport) => {
        const source = LeadReport.Source;
        if (!source) return;

        const count = sourceMap.has(source) ? sourceMap.get(source).count + 1 : 1;
        const amount = parseFloat(LeadReport.QuotedValue);
        totalSourceAmount += amount;
        totalCount++;
        sourceMap.set(source, { count, amount: (sourceMap.get(source)?.amount || 0) + amount });
    });

    const potentialSourceArray = Array.from(sourceMap, ([source, { count, amount }]) => ({
        source,
        count,
        amount,
        percentage: ((amount / totalSourceAmount) * 100).toFixed(2),
    }));

    console.log("Source Map:", sourceMap);

    setPotentialSource(potentialSourceArray);
    console.log(potentialSourceArray);
    setTotalSourceAmount(totalSourceAmount);
    setTotalSourceCount(totalCount);

};

const { enqueueSnackbar } = useSnackbar();
const [Sources, setSources] = useState([]);
    useEffect(() => {
        const fetchSources = async () => {
            try {
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


    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }


    /*const downloadFile = async (filename) => {
        try {
<<<<<<< HEAD
            const response = await axios.get(`http://localhost:9000/download/${filename}`, {
=======
            const response = await axios.get(`http://localhost:9000/download/${filename}`, {
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                responseType: 'blob', // Required to handle binary data
            });

            // Create a URL for the downloaded file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename); // Set the filename
            document.body.appendChild(link);
            link.click(); // Trigger the download
            link.remove(); // Clean up the link
        } catch (error) {
            console.error('Error downloading the file:', error);
            alert('Error downloading the file!');
        }
    };*/

    const [fileUpload, setFileUpload] = useState(0);

    /*const handleFileUpload = async (event, id) => {
        const file = event.target.files[0];
        console.log("id", id);
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', id);

        try {
            // Use Axios to send the request
<<<<<<< HEAD
            const response = await axios.post('http://localhost:9000/api/upload', formData, {
=======
            const response = await axios.post('http://localhost:9000/api/upload', formData, {
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                headers: {
                    'Content-Type': 'multipart/form-data',  // Required for file upload
                },
            });

            console.log('File uploaded successfully:', response.data.updatedLead);
            // Optionally update the local state
            setFileUpload((prev) => prev + 1);
        } catch (error) {
            // Handle the error
            if (error.response) {
                console.error('Error uploading file:', error.response.data.error || error.response.data);
            } else {
                console.error('Error uploading file:', error.message);
            }
        }
    };*/

    useEffect(() => {
        const fetchStatus = async () => {
            try {
<<<<<<< HEAD
                const response = await axios.get('http://localhost:9000/leads');
                if (response.status >= 200 && response.status < 300) {

                    setLeadReports(response.data);
                    setFilteredLeadReports(response.data);

=======
                const response = await axios.get('http://localhost:9000/leads');
                if (response.status >= 200 && response.status < 300) {
                    
                    setLeadReports(response.data);
                    setFilteredLeadReports(response.data);
                    
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d


                } else {
                    enqueueSnackbar('Failed to fetch Status', { variant: 'error' });
                }
            } catch (error) {
                console.error('Error:', error);
                enqueueSnackbar('Connection Error!', { variant: 'error' });
            }
        };
        fetchStatus();
    }, [enqueueSnackbar, fileUpload]);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Set items per page

    // Calculate pagination details
    const totalItems = filteredLeadReports.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const filteredReports1 = filteredLeadReports.filter(
        (lead) => lead.Status === "Pending" || lead.Status === "Won Recurring"
    );
    const currentItems = filteredReports1.slice(startIdx, endIdx);

    const handlePageChange = (page) => setCurrentPage(page);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };


    const navigate = useNavigate();
<<<<<<< HEAD


    const token = localStorage.getItem('token');
    if (!token) {
        enqueueSnackbar('Login to Navigate!', { variant: 'error' });
=======
    

    const token = localStorage.getItem('token');
    if (!token){
        enqueueSnackbar('Login to Navigate!',{variant:'error'});
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
        navigate('/');
    }


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
<<<<<<< HEAD
    }, [handleVisibilityChange, navigate]);
=======
    }, [handleVisibilityChange,navigate]);
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d



    const [leadTracker, setLeadTracker] = useState(true);
    const [Contact, setshowcontact] = useState(false);
    const [showLogout, setshowlogout] = useState(false);

    const toggleLeadTracker = (e) => {
        e.preventDefault();
        setLeadTracker(!leadTracker);
        setshowcontact(false);
    };
    const toggleContact = (e) => {
        e.preventDefault();
        setshowcontact(!Contact);
        setLeadTracker(false);
    };


    const sendEmail = (e) => {
        e.preventDefault();
        window.location.href = 'mailto:info@dext.site?subject=Contact%20Us&body=Hello%2C%0D%0A%0D%0A';
    };

    const addLead = (e) => {
        e.preventDefault();
        navigate('/addlead_2');
    };
    const dash = (e) => {
        e.preventDefault();
        navigate('/dashboard_2');
    };
    const leadReport = (e) => {
        e.preventDefault();
        navigate('/leadreport_2');
    };


    const logout = (e) => {
        e.preventDefault();
        setshowlogout(!showLogout);
    };
    const logoutUser = (e) => {
        e.preventDefault();
<<<<<<< HEAD
        enqueueSnackbar('Successfully Logged out!', { variant: 'success' });
=======
        enqueueSnackbar('Successfully Logged out!', { variant: 'success'});
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
        localStorage.removeItem('token');
        navigate('/');
    };


<<<<<<< HEAD
    const [LeadReports, setLeadReports] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    // const [filteredLeadReports, setFilteredLeadReports] = useState([]);
=======
    const [LeadReports, setLeadReports] = useState([]); 
    const [searchQuery, setSearchQuery] = useState('');
   // const [filteredLeadReports, setFilteredLeadReports] = useState([]);
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
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
<<<<<<< HEAD
            LeadReport.ClientContactName.toLowerCase().includes(query.toLowerCase()) ||
=======
            LeadReport.ClientContactName.toLowerCase().includes(query.toLowerCase()) || 
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
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
    const [ClientEmail, setClientEmail] = useState('');
    const [Status, setStatus] = useState('');
    const [Source, setSource] = useState('');
    const [FollowupDate, setFollowupDate] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [Reference, setReference] = useState('');
    const [Probability, setProbability] = useState('');
<<<<<<< HEAD



    const [editingLeadReport,] = useState(null);
=======
    


    const [editingLeadReport, ] = useState(null);
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
    /*const editLeadReport = (id) => {
        const ReportToEdit = LeadReports.find(LeadReport => LeadReport.id === id);
        setEditingLeadReport(ReportToEdit);
        setShowEdit(true);
    };*/
<<<<<<< HEAD

=======
        
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
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
            setFollowupDate(editingLeadReport.FollowupDate);
        }
    }, [editingLeadReport]);


<<<<<<< HEAD
    const Submit = async (e) => {
        e.preventDefault();
        if (!ClientName || !FollowupDate || !LeadDate || !Source || !ClientPhone || !ClientContactName || !TypeService || !Status || !ProjectName || !QuotedValue) {
            enqueueSnackbar('Please fill all the fields!', { variant: 'error' });
        }
        else {
            try {
                const response = await axios.put(`http://localhost:9000/leads/${editingLeadReport.id}`, {
=======
    const Submit = async(e) => {
        e.preventDefault();
        if(!ClientName || !FollowupDate || !LeadDate || !Source || !ClientPhone || !ClientContactName || !TypeService || !Status || !ProjectName || !QuotedValue){
          enqueueSnackbar('Please fill all the fields!', { variant: 'error'});
        }
        else{
            try {
                const response = await axios.put(`http://localhost:9000/leads/${editingLeadReport.id}`, {
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
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
                    Reference: Reference
                });
<<<<<<< HEAD

                if (response.status >= 200 && response.status < 300) {
                    enqueueSnackbar('Follow-Up Updated Successfully!', { variant: 'success' });
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
                    setReference('');
                    setProbability('');
                    setSource('');
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
=======
          
                if (response.status >= 200 && response.status < 300) {
                  enqueueSnackbar('Follow-Up Updated Successfully!', { variant: 'success'});
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
                  setReference('');
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
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
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
        setShowEdit(false);
        setTimeout(() => {
            window.location.reload();
        }, 100);
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



<<<<<<< HEAD
    const [LeadTypes, setLeadTypes] = useState([]);
    useEffect(() => {
        const fetchLeadTypes = async () => {
            try {
                const response = await axios.get('http://localhost:9000/LeadTypes');
=======
    const [LeadTypes, setLeadTypes] = useState([]); 
    useEffect(() => {
        const fetchLeadTypes = async () => {
            try {
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

<<<<<<< HEAD
    const [statuses, setStatuses] = useState([]);
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get('http://localhost:9000/Status');
=======
    const [statuses, setStatuses] = useState([]); 
    useEffect(() => {
        const fetchStatus = async () => {
            try {
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


<<<<<<< HEAD





=======
    
    
     
    
      
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d


    useEffect(() => {
        // Function to aggregate status data
        const aggregateStatusData = () => {
            const statusMap = new Map();
            let totalStatusAmount = 0;
            let totalCount = 0; // Initialize total count
<<<<<<< HEAD

=======
    
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
            filteredLeadReports.forEach(LeadReport => {
                const status = LeadReport.Status;
                const count = statusMap.has(status) ? statusMap.get(status).count + 1 : 1;
                const amount = parseFloat(LeadReport.QuotedValue);
                totalStatusAmount += amount;
                totalCount++; // Increment total count
                // Update statusMap with both count and amount
                statusMap.set(status, { count, amount: (statusMap.get(status)?.amount || 0) + amount });
            });
<<<<<<< HEAD

=======
    
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
            // Convert map to array for rendering
            const potentialStatusArray = Array.from(statusMap, ([status, { count, amount }]) => ({
                status,
                count,
                amount,
<<<<<<< HEAD
                //   percentage: ((amount / totalStatusAmount) * 100).toFixed(2), // Calculate percentage based on amount
=======
           //   percentage: ((amount / totalStatusAmount) * 100).toFixed(2), // Calculate percentage based on amount
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
            }));
            setPotentialStatus(potentialStatusArray);
            setTotalStatusAmount(totalStatusAmount); // Set the total status amount
            setTotalStatusCount(totalCount); // Set the total status count
        };
<<<<<<< HEAD

        aggregateStatusData();
    }, [filteredLeadReports]);

=======
    
        aggregateStatusData();
    }, [filteredLeadReports]);
    
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
    useEffect(() => {
        // Function to aggregate source data
        const aggregateSourceData = () => {
            const sourceMap = new Map();
            let totalSourceAmount = 0;
            let totalCount = 0; // Initialize total count
<<<<<<< HEAD

=======
    
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
            filteredLeadReports.forEach(LeadReport => {
                const source = LeadReport.Source;
                const count = sourceMap.has(source) ? sourceMap.get(source).count + 1 : 1;
                const amount = parseFloat(LeadReport.QuotedValue);
                totalSourceAmount += amount;
                totalCount++; // Increment total count
                // Update sourceMap with both count and amount
                sourceMap.set(source, { count, amount: (sourceMap.get(source)?.amount || 0) + amount });
            });
<<<<<<< HEAD

=======
    
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
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
<<<<<<< HEAD

=======
    
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
        aggregateSourceData();
    }, [filteredLeadReports]);

    useEffect(() => {
        // Function to aggregate probability data
        const aggregateProbabilityData = () => {
            const probMap = new Map();
            let totalProbAmount = 0;
            let totalCount = 0; // Initialize total count
<<<<<<< HEAD

            filteredLeadReports.forEach(LeadReport => {
                const prob = LeadReport.Probability;
                if (!prob) return; // Skip if probability is empty or undefined

=======
    
            filteredLeadReports.forEach(LeadReport => {
                const prob = LeadReport.Probability;
                if (!prob) return; // Skip if probability is empty or undefined
    
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                const count = probMap.has(prob) ? probMap.get(prob).count + 1 : 1;
                const amount = parseFloat(LeadReport.QuotedValue);
                totalProbAmount += amount;
                totalCount++;
                probMap.set(prob, { count, amount: (probMap.get(prob)?.amount || 0) + amount });
            });
<<<<<<< HEAD

=======
    
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
            // Convert map to array for rendering
            const potentialProbabilityArray = Array.from(probMap, ([prob, { count, amount }]) => ({
                prob,
                count,
                amount,
<<<<<<< HEAD
                //  percentage: ((amount / totalProbAmount) * 100).toFixed(2),
=======
           //  percentage: ((amount / totalProbAmount) * 100).toFixed(2),
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
            }));
            setProbabilityStatus(potentialProbabilityArray);
            setTotalProbabilityAmount(totalProbAmount);
            setTotalProbabilityCount(totalCount);
        };
<<<<<<< HEAD

        aggregateProbabilityData();
    }, [filteredLeadReports]);


    useEffect(() => {
        if (potentialStatus.length > 0) {
            const ctxStatus = document.getElementById('statusPieChart');
            if (statusChartRef.current) {
                statusChartRef.current.destroy();
            }
            statusChartRef.current = new Chart(ctxStatus, {
                type: 'bar',
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
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.label || '';
                                    if (context.raw !== null) {
                                        label += ': $' + context.raw;
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: { display: false },
                        },
                        y: {
                            grid: { display: false },
                            ticks: { display: false },
                        }
                    }
                },
            });
        }

        return () => {
            if (statusChartRef.current) {
                statusChartRef.current.destroy();
            }
        };
    }, [potentialStatus]);

    useEffect(() => {
        if (potentialSource.length > 0) {
            const ctxSource = document.getElementById('sourcePieChart');
            if (sourceChartRef.current) {
                sourceChartRef.current.destroy();
            }
            sourceChartRef.current = new Chart(ctxSource, {
                type: 'bar',
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
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.label || '';
                                    if (context.raw !== null) {
                                        label += ': $' + context.raw;
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: { display: false },
                        },
                        y: {
                            grid: { display: false },
                            ticks: { display: false },
                        }
                    }
                },
            });
        }

        return () => {
            if (sourceChartRef.current) {
                sourceChartRef.current.destroy();
            }
        };
    }, [potentialSource]);

    useEffect(() => {
        if (probabilityStatus.length > 0) {
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
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.label || '';
                                    if (context.raw !== null) {
                                        label += ': $' + context.raw;
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    cutout: '50%',
                },
            });
        }

        return () => {
            if (probChartRef.current) {
                probChartRef.current.destroy();
            }
        };
    }, [probabilityStatus]);


    const [popupVisibleId, setPopupVisibleId] = useState(null); // Tracks which popup is visible
=======
    
        aggregateProbabilityData();
    }, [filteredLeadReports]);
    
    
    useEffect(() => {
            if (potentialStatus.length > 0) {
                const ctxStatus = document.getElementById('statusPieChart');
                if (statusChartRef.current) {
                    statusChartRef.current.destroy();
                }
                statusChartRef.current = new Chart(ctxStatus, {
                    type: 'bar',
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
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        let label = context.label || '';
                                        if (context.raw !== null) {
                                            label += ': $' + context.raw;
                                        }
                                        return label;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                grid: { display: false },
                            },
                            y: {
                                grid: { display: false },
                                ticks: { display: false },
                            }
                        }
                    },
                });
            }
        
            return () => {
                if (statusChartRef.current) {
                    statusChartRef.current.destroy();
                }
            };
        }, [potentialStatus]);
    
        useEffect(() => {
            if (potentialSource.length > 0) {
                const ctxSource = document.getElementById('sourcePieChart');
                if (sourceChartRef.current) {
                    sourceChartRef.current.destroy();
                }
                sourceChartRef.current = new Chart(ctxSource, {
                    type: 'bar',
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
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        let label = context.label || '';
                                        if (context.raw !== null) {
                                            label += ': $' + context.raw;
                                        }
                                        return label;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                grid: { display: false },
                            },
                            y: {
                                grid: { display: false },
                                ticks: { display: false },
                            }
                        }
                    },
                });
            }
        
            return () => {
                if (sourceChartRef.current) {
                    sourceChartRef.current.destroy();
                }
            };
        }, [potentialSource]);
    
        useEffect(() => {
            if (probabilityStatus.length > 0) {
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
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        let label = context.label || '';
                                        if (context.raw !== null) {
                                            label += ': $' + context.raw;
                                        }
                                        return label;
                                    }
                                }
                            }
                        },
                        cutout: '50%',
                    },
                });
            }
        
            return () => {
                if (probChartRef.current) {
                    probChartRef.current.destroy();
                }
            };
        }, [probabilityStatus]);
        

        const [popupVisibleId, setPopupVisibleId] = useState(null); // Tracks which popup is visible
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
    const [uploadedFiles, setUploadedFiles] = useState([]); // Tracks uploaded files for each LeadReport

    // Toggle the popup
    const togglePopup = (id) => {
        setPopupVisibleId(id === popupVisibleId ? null : id);
<<<<<<< HEAD

=======
        
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
    };


    const handleFileUpload = async (event, id) => {
        const file = event.target.files[0];
        console.log("leadId", id); // Ensure leadId is passed correctly
        if (!file) return;
<<<<<<< HEAD

        const formData = new FormData();
        formData.append('file', file); // Appending the file
        formData.append('leadId', id); // Appending the leadId
        setUploadLoader(true);

        try {
            const response = await axios.post('http://localhost:9000/api/files', formData, {
=======
    
        const formData = new FormData();
        formData.append('file', file); // Appending the file
        formData.append('leadId', id); // Appending the leadId
    
        try {
            const response = await axios.post('http://localhost:9000/api/files', formData, {
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
<<<<<<< HEAD

            console.log('File uploaded successfully:', response.data);
            enqueueSnackbar('File uploaded successfully', { variant: 'success' });

            // Assuming the response contains the uploaded file details
            const uploadedFile = response.data; // Replace this with your API response structure

=======
    
            console.log('File uploaded successfully:', response.data);
            enqueueSnackbar('File uploaded successfully', { variant: 'success' });
    
            // Assuming the response contains the uploaded file details
            const uploadedFile = response.data; // Replace this with your API response structure
    
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
            // Update uploadedFiles state to include the new file

            //need to send array in this setUploadedFiles  + fetchFiles 2 baar call hota hai might we use useeffect for it ******************************************************************************************************************************************************************************************************************
            setUploadedFiles((prevFiles) => [
                ...prevFiles,
                {
                    fileName: uploadedFile.fileName, // Adjust this based on your API response
                    LeadReport: { Id: id }, // Associate the file with the correct LeadReport.Id
                },
<<<<<<< HEAD

            ]);
            console.log(uploadedFiles);

=======
                
            ]);
            console.log(uploadedFiles);
             
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
            // Optionally update any other state
            setFileUpload((prev) => prev + 1);
            fetchFiles(id);
        } catch (error) {
            if (error.response) {
                console.error('Error uploading file:', error.response.data.error || error.response.data);
            } else {
                console.error('Error uploading file:', error.message);
            }
<<<<<<< HEAD
        } finally {
            setUploadLoader(false);
        }
    };


    const downloadFile = async (filename, id) => {
        setDownloadLoader(true)
        setDownloadLoader(true)
        try {
            const response = await axios.get(`http://localhost:9000/api/files/download/${id}/${filename}`, {
=======
        }
    };
    

    const downloadFile = async (filename,id) => {
        try {
            const response = await axios.get(`http://localhost:9000/api/files/download/${id}/${filename}`, {
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error downloading the file:", error);
            alert("Error downloading the file!");
<<<<<<< HEAD
        } finally {
            setDownloadLoader(false);
        }
    };
    const deleteFile = async (fileName, leadId) => {
        setDeleteLoader(true)
        try {
            // Call the API to delete the file
            const response = await axios.delete(`http://localhost:9000/api/files/${leadId}/${fileName}`);

            console.log(`File deleted successfully:`, response.data);

=======
        }
    };
    const deleteFile = async (fileName, leadId) => {
        try {
            // Call the API to delete the file
            const response = await axios.delete(`http://localhost:9000/api/files/${leadId}/${fileName}`);
            
            console.log(`File deleted successfully:`, response.data);
    
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
            // Update the state to remove the deleted file
            setUploadedFiles((prevFiles) =>
                prevFiles.filter((file) => !(file.fileName === fileName && file.LeadReport?.id === leadId))
            );
            fetchFiles(leadId);
            enqueueSnackbar('File deleted successfully', { variant: 'success' });
        } catch (error) {
            console.error("Error deleting the file:", error.response?.data || error.message);
            alert("Error deleting the file!");
<<<<<<< HEAD
        } finally {
            setDeleteLoader(false)
        }
    };

    const fetchFiles = async (leadId) => {
        try {
            console.log(leadId, "Hiiii");
            const response = await axios.get(`http://localhost:9000/api/files/${leadId}`);
            console.log(response.data);
            setUploadedFiles(response.data); // Save files in state
            console.log(uploadedFiles);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };


    const handleCombineAction = (leadId) => {
        togglePopup(leadId); // Function to toggle the popup
        fetchFiles(leadId); // Function to fetch files
    };
=======
        }
    };

        const fetchFiles = async (leadId) => {
            try {
                console.log(leadId, "Hiiii");
                const response = await axios.get(`http://localhost:9000/api/files/${leadId}`);
                console.log(response.data);
                setUploadedFiles(response.data); // Save files in state
                console.log(uploadedFiles);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };
        
        
        const handleCombineAction = (leadId) => {
            togglePopup(leadId); // Function to toggle the popup
            fetchFiles(leadId); // Function to fetch files
        };
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d


    return (
        <>
            <div className="grid grid-rows-[auto_1fr] grid-cols-[15%_1fr] h-screen">
                <div className='fixed flex justify-end z-10 py-3 w-full  overflow-hidden text-white bg-white'>
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
<<<<<<< HEAD
                    <img className='p-4' src={Q} alt="Q-Trackr Logo" />

                    <h1 onClick={toggleLeadTracker} className='flex items-center justify-between p-2 cursor-pointer bg-white mx-3 rounded-md my-3 text-black'>
                        <span className='flex items-center'>
                            <SiPivotaltracker size={24} />
                            &nbsp;Lead Tracker
                        </span>
                        {leadTracker ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
                    </h1>

                    {leadTracker && (
                        <div className='ml-3'>
                            <h1 onClick={dash} className='p-1 cursor-pointer bg-white mx-3 flex rounded-md mb-1 text-black'>
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

                    <h1 onClick={toggleContact} className='flex items-center justify-between p-2 cursor-pointer hover:bg-white mx-3 rounded-md my-2 hover:text-black'>
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

                    <div style={{ backgroundColor: "#fff", position: "absolute", bottom: "0px" }}>
                        <img className='p-4 mt-auto bg-white' src={loram} alt="Loram Logo" />
                    </div>
                </div>
=======
    <img className='p-4' src={Q} alt="Q-Trackr Logo" />

    <h1 onClick={toggleLeadTracker} className='flex items-center justify-between p-2 cursor-pointer bg-white mx-3 rounded-md my-3 text-black'>
        <span className='flex items-center'>
            <SiPivotaltracker size={24} />
            &nbsp;Lead Tracker
        </span>
        {leadTracker ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
    </h1>

    {leadTracker && (
        <div className='ml-3'>
            <h1 onClick={dash} className='p-1 cursor-pointer bg-white mx-3 flex rounded-md mb-1 text-black'>
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

    <h1 onClick={toggleContact} className='flex items-center justify-between p-2 cursor-pointer hover:bg-white mx-3 rounded-md my-2 hover:text-black'>
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

    <div style={{ backgroundColor: "#fff", position: "absolute", bottom: "0px" }}>
        <img className='p-4 mt-auto bg-white' src={loram} alt="Loram Logo" />
    </div>
</div>
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d


                <div className="row-span-1 col-start-2 col-span-1 bg-white min-h-screen pb-12">

<<<<<<< HEAD
                    <div className=' p-4 relative overflow-hidden shadow-lg w-full flex items-center top-16'>
=======
                <div className=' p-4 relative overflow-hidden shadow-lg w-full flex items-center top-16'>
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                        <div className='flex flex-col'>
                            <h1 className='text-xl font-semibold mb-2'>GROUP</h1>
                            <div className='flex items-center space-x-2'>
                                <select
                                    className='border border-gray-300 rounded-md shadow-md outline-none'
                                    value={groupFilter}
                                    onChange={(e) => setGroupFilter(e.target.value)}
                                    style={{
                                        backgroundColor: '#f8f5fc',  // Light background color for dropdown
                                        width: '200px',              // Set the width
                                        height: '40px',              // Set the height
                                        fontSize: '16px',            // Adjust the font size
                                        padding: '8px'               // Adjust padding
                                    }}
                                >

                                    <option value="">--All--</option>
                                    {GroupNames.map(group => (
                                        <option key={group.id} value={group.newGroupName}>{group.newGroupName}</option>
                                    ))}
                                </select>
                                <button
                                    className='bg-green-600 hover:bg-green-800 text-white rounded-md text-sm'
                                    onClick={handleSubmit} // Submit handler
                                    style={{
                                        width: '100px',              // Set the width
                                        height: '40px',              // Set the height
                                        fontSize: '16px',            // Adjust the font size
                                        padding: '8px 16px'          // Adjust padding
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className=' p-4 relative overflow-hidden shadow-lg w-full justify-center top-16'>
                        <div className='grid grid-cols-5 gap-4'>
                            <div className="bg-white border rounded-2xl shadow-md overflow-hidden relative">
                                <div className="bg-purple-500 text-white text-left p-2">
                                    <h2 className="text-lg font-semibold">ALL</h2>
                                </div>
                                <div className="p-4 flex justify-between items-center">
                                    <div className="flex-col">
                                        <div className="flex gap-8">
                                            <p className="text-sm">Lead Counts</p>
                                            <h1 className="text-2xl font-bold">{LeadCount}</h1>
                                        </div>
                                        <div className="flex gap-4">
                                            <p className="text-lg mt-2">
                                                ${totalQuotedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <img
                                    src={hand}
                                    alt="handshake icon"
                                    className="w-12 h-9 absolute bottom-2 right-2"
                                />
                            </div>
                            <div className="bg-white border rounded-2xl shadow-md overflow-hidden relative">
                                <div className="bg-green-700 text-white text-left p-2">
                                    <h2 className="text-lg font-semibold">Won</h2>
                                </div>
                                <div className="p-4 flex justify-between items-center">
                                    <div className="flex-col">
                                        <div className="flex gap-8">
                                            <p className="text-sm">Lead Counts</p>
                                            <h1 className="text-2xl font-bold">{wonLeadCount}</h1>
                                        </div>
                                        <div className="flex gap-4">
                                            <p className="text-lg mt-2">
                                                ${wonTotalQuotedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <img
                                    src={hand}
                                    alt="handshake icon"
                                    className="w-12 h-9 absolute bottom-2 right-2"
                                />
                            </div>


                            <div className="bg-white border rounded-2xl shadow-md overflow-hidden relative">
                                <div className="bg-blue-700 text-white text-left p-2">
                                    <h2 className="text-lg font-semibold">Won Recurring</h2>
                                </div>
                                <div className="p-4 flex justify-between items-center">
                                    <div className="flex-col">
                                        <div className="flex gap-8">
                                            <p className="text-sm">Lead Counts</p>
                                            <h1 className="text-2xl font-bold">{wonRecurringLeadCount}</h1>
                                        </div>
                                        <div className="flex gap-4">
                                            <p className="text-lg mt-2">
                                                ${wonRecurringTotalQuotedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <img
                                    src={hand}
                                    alt="handshake icon"
                                    className="w-12 h-9 absolute bottom-2 right-2"
                                />
                            </div>


                            <div className="bg-white border rounded-2xl shadow-md overflow-hidden relative">
                                <div className="bg-yellow-400 text-white text-left p-2">
                                    <h2 className="text-lg font-semibold">Pending</h2>
                                </div>
                                <div className="p-4 flex justify-between items-center">
                                    <div className="flex-col">
                                        <div className="flex gap-8">
                                            <p className="text-sm">Lead Counts</p>
                                            <h1 className="text-2xl font-bold">{pendingLeadCount}</h1>
                                        </div>
                                        <div className="flex gap-4">
                                            <p className="text-lg mt-2">
                                                ${pendingTotalQuotedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <img
                                    src={hand}
                                    alt="handshake icon"
                                    className="w-12 h-9 absolute bottom-2 right-2"
                                />
                            </div>


                            <div className="bg-white border rounded-2xl shadow-md overflow-hidden relative">
                                <div className="bg-red-700 text-white text-left p-2">
                                    <h2 className="text-lg font-semibold">Lost</h2>
                                </div>
                                <div className="p-4 flex justify-between items-center">
                                    <div className="flex-col">
                                        <div className="flex gap-8">
                                            <p className="text-sm">Lead Counts</p>
                                            <h1 className="text-2xl font-bold">{lostLeadCount}</h1>
                                        </div>
                                        <div className="flex gap-4">
                                            <p className="text-lg mt-2">
                                                ${lostTotalQuotedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <img
                                    src={fire}
                                    alt="handshake icon"
                                    className="w-9 h-7 absolute bottom-2 right-2"
                                />
                            </div>

                        </div>
                    </div>



                    {showEdit && (
                        <div className='ml-80 p-4 bg-white mb-16  border border-gray-200 relative overflow-hidden shadow-lg w-3/4 justify-center top-16'>
                            <h1 className='text-2xl mb-2 font-semibold'>Edit Follow-up 2</h1><hr /><hr /><br />
                            <div className='flex justify-start w-full'>
                                <div className='mx-2 w-full'>
                                    <label className='block' htmlFor="Name">Client Name:</label>
                                    <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="text" placeholder='Enter Name' value={ClientName} onChange={(e) => setClientName(e.target.value)} />
                                </div>
                                <div className='mx-2 w-full'>
                                    <label className='block' htmlFor="date">Lead Date:</label>
                                    <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="date" id="date" name="date" value={LeadDate} onChange={(e) => setLeadDate(e.target.value)} />
                                </div>
                                <div className='mx-2 w-full'>
                                    <label className='block' htmlFor="Name">Project Name:</label>
                                    <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="text" placeholder='Enter Project Name' value={ProjectName} onChange={(e) => setProjectName(e.target.value)} />
                                </div>
                                <div className='mx-2 w-full'>
                                    <label className='block' htmlFor="Name">Quoted Value:</label>
                                    <input className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' type="number" placeholder='Enter Quoted Value' inputMode="numeric" pattern="[0-9]*" value={QuotedValue} onChange={(e) => setQuotedValue(e.target.value)} />
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
                                    <select className='border w-full border-gray-400 rounded-md p-2 overflow-hidden shadow-md outline-none' value={Status} onChange={(e) => setStatus(e.target.value)} name="auth" id="auth">
                                        <option value="" disabled>Select Status</option>
                                        {statuses.map(statuse => (
                                            <option key={statuse.id} value={statuse.status}>{statuse.status}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mx-2 w-full'>
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


                    <div className='  p-4 pl-10 bg-white  border border-gray-200 relative overflow-hidden shadow-lg w-full justify-center top-16'>
                        <div className='flex'>
                            <h1 className='text-2xl w-4/5 mb-2 font-semibold'>Follow-up</h1>
                            <div className='flex w-1/5'>
                                <MdSearch size={40} />
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
                                        <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Attachment</th>
                                        <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Edit</th>
                                        <th className="px-8 py-3 text-center border text-sm font-medium uppercase tracking-wider"><FaTrash size={18} /></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
<<<<<<< HEAD
                                    {currentItems.map((LeadReport, index) => (
                                        <tr className={`border text-sm ${getRowClass(LeadReport.FollowupDate)}`} key={LeadReport.id}>
                                            <td className="px-3 text-center py-2">{index + 1}</td>
=======
                                    {currentItems.map((LeadReport,index) => (
                                        <tr className={`border text-sm ${getRowClass(LeadReport.FollowupDate)}`} key={LeadReport.id}>
                                            <td className="px-3 text-center py-2">{index+1}</td>
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                                            <td className="px-3 text-center py-2">{LeadReport.LeadDate ? formatDate(LeadReport.LeadDate) : 'N/A'}</td>
                                            <td className="px-3 text-center py-2">{LeadReport.ClientName}</td>
                                            <td className="px-3 text-center py-2">{LeadReport.ProjectName}</td>
                                            <td className="px-3 text-center py-2">{LeadReport.LeadType}</td>
                                            <td className="px-3 text-center py-2">${LeadReport.QuotedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            <td className="px-3 text-center py-2">{LeadReport.Status}</td>
                                            <td className="px-3 text-center py-2">{LeadReport.AssignedGroup}</td>
                                            <td className="px-3 text-center py-3">{LeadReport.FollowupDate ? formatDate(LeadReport.FollowupDate) : 'N/A'}</td>

                                            <td className="flex justify-center items-center py-3">
                                                {/* Button to open popup */}
                                                <button
                                                    className="  cursor-pointer"
                                                    onClick={() => handleCombineAction(LeadReport.id)}
                                                >
                                                    <img src={icon} alt='file' width="16" height="16" title="Attachment" />
                                                </button>


                                                {/* Popup */}
                                                {popupVisibleId === LeadReport.id && (
                                                    <div
                                                        id="file-upload-popup"
                                                        className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50 bg-black"
                                                    >
                                                        <div className="w-[800px] bg-white shadow-lg rounded-lg p-6">
                                                            <div className="flex justify-between items-center mb-6">
                                                                <h2 className="text-lg font-bold">File Manager</h2>
                                                                <button
                                                                    className="text-gray-500 hover:text-black"
                                                                    onClick={() => togglePopup(LeadReport.id)} // Close popup
                                                                >
                                                                    Close
                                                                </button>
                                                            </div>

                                                            {/* File Upload Section */}
<<<<<<< HEAD
                                                            <div className='flex items-start gap-4'>

                                                                {
                                                                    uploadLoader ?
                                                                        (<Loader isLoading={uploadLoader} />) :
                                                                        (<div className="flex items-center mb-6">
                                                                            <input

                                                                                type="file"
                                                                                id={`file-upload-${LeadReport.id}`}
                                                                                className="hidden"
                                                                                onChange={(e) => handleFileUpload(e, LeadReport.id)} // Use your predefined function
                                                                            />
                                                                            <label
                                                                                htmlFor={`file-upload-${LeadReport.id}`}
                                                                                className="bg-gray-200 text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300"
                                                                            >
                                                                                Upload File
                                                                            </label>
                                                                        </div>)
                                                                }

                                                                <div className='flex gap-2 text-red-500'>
                                                                    <h4 className='font-bold text-md'>*</h4>
                                                                    <p>Please Upload .pdf and .docx files only</p>
                                                                </div>
=======
                                                            <div className="flex items-center mb-6">
                                                                <input

                                                                    type="file"
                                                                    id={`file-upload-${LeadReport.id}`}
                                                                    className="hidden"
                                                                    onChange={(e) => handleFileUpload(e, LeadReport.id)} // Use your predefined function
                                                                />
                                                                <label
                                                                    htmlFor={`file-upload-${LeadReport.id}`}
                                                                    className="bg-gray-200 text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300"
                                                                >
                                                                    Upload File
                                                                </label>
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                                                            </div>

                                                            {/* Uploaded Files Table */}
                                                            <div>
                                                                <table className="w-full text-left border-collapse">
                                                                    <thead>
                                                                        <tr className="border-b">
                                                                            <th className="py-2 px-4">Sr. No.</th>
                                                                            <th className="py-2 px-4">File Name</th>
<<<<<<< HEAD

=======
                                                                            
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                                                                            <th className="py-2 px-4 text-right">Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
<<<<<<< HEAD
                                                                        {
                                                                            (deleteLoader || downloadLoader ? <Loader isLoading={deleteLoader || downloadLoader} /> :
                                                                                (
                                                                                    uploadedFiles
                                                                                        .filter(file => file.leadId === LeadReport.id) // Filter files for the given Id
                                                                                        .map((file, index) => (
                                                                                            <tr key={file.name} className="border-b">
                                                                                                <td className="py-2 px-4">{index + 1}</td>
                                                                                                <td className="py-2 px-4">{file.fileName}</td>

                                                                                                <td className="py-2 px-4 text-right space-x-2">
                                                                                                    <button
                                                                                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                                                                                                        onClick={() => downloadFile(file.fileName, LeadReport.id)} // Use your predefined function
                                                                                                    >
                                                                                                        Download
                                                                                                    </button>
                                                                                                    <button
                                                                                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                                                                                                        onClick={() => deleteFile(file.fileName, LeadReport.id)}
                                                                                                    >
                                                                                                        Delete
                                                                                                    </button>
                                                                                                </td>
                                                                                            </tr>
                                                                                        ))
                                                                                ))
                                                                        }
=======
                                                                        {uploadedFiles  
                                                                            .filter(file => file.leadId === LeadReport.id) // Filter files for the given Id
                                                                            .map((file, index) => (
                                                                            <tr key={file.name} className="border-b">
                                                                                <td className="py-2 px-4">{index + 1}</td>
                                                                                <td className="py-2 px-4">{file.fileName}</td>
                                                                                
                                                                                <td className="py-2 px-4 text-right space-x-2">
                                                                                    <button
                                                                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                                                                                        onClick={() => downloadFile(file.fileName,LeadReport.id)} // Use your predefined function
                                                                                    >
                                                                                        Download
                                                                                    </button>
                                                                                    <button
                                                                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                                                                                        onClick={() => deleteFile(file.fileName, LeadReport.id)}
                                                                                    >
                                                                                        Delete
                                                                                    </button>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                                                                        {/*uploadedFiles[LeadReport.id]?.map((file, index) => (
                                                                            <tr key={file.name} className="border-b">
                                                                                <td className="py-2 px-4">{index + 1}</td>
                                                                                <td className="py-2 px-4">{file.name}</td>
                                                                                <td className="py-2 px-4"><a
<<<<<<< HEAD
                                                                                    href={`http://localhost:9000/uploads/${LeadReport.attachment
=======
                                                                                    href={`http://localhost:9000/uploads/${LeadReport.attachment
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                                                                                        .split('\\')
                                                                                        .pop()
                                                                                        .split('/').pop()}`}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    className="text-blue-500 underline text-sm mt-1"
                                                                                >
                                                                                    <img src={icon} alt='file' width="16" height="16" title="Attachment" />
                                                                                </a>
                                                                                </td>
                                                                                <td className="py-2 px-4 text-right space-x-2">

                                                                                    <button
                                                                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                                                                                        onClick={() => downloadFile(`${LeadReport.attachment.split('\\').pop().split('/').pop()}`)
                                                                                        } // Use your predefined function
                                                                                    >
                                                                                        Download
                                                                                    </button>
                                                                                    <button
                                                                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                                                                                        onClick={() => deleteFile(file.name, LeadReport.id)}
                                                                                    >
                                                                                        Delete
                                                                                    </button>
                                                                                </td>
                                                                            </tr>
                                                                        ))*/}

                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>

                                            <td onClick={() => navigate(`/editlead1/${LeadReport.id}`)} className="px-4 hover:bg-black cursor-pointer hover:text-white text-center py-2"><MdEditSquare size={20} /></td>
                                            <td onClick={() => deleteLeadReport(LeadReport.id)} className="px-8 hover:bg-black cursor-pointer hover:text-white text-center py-2"><FaTrash size={18} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center mt-4">
                            <div>
                                Showing {startIdx + 1} to {Math.min(endIdx, totalItems)} of {totalItems} entries
                            </div>
                            <div className="space-x-2">
                                <button onClick={handlePrevious} disabled={currentPage === 1} className="px-2 py-1 rounded">
                                    Previous
                                </button>
                                {[...Array(totalPages).keys()].map(page => (
                                    <button
                                        key={page + 1}
                                        onClick={() => handlePageChange(page + 1)}
                                        className={`px-2 py-1 rounded ${currentPage === page + 1 ? 'bg-gray-300' : ''}`}
                                    >
                                        {page + 1}
                                    </button>
                                ))}
                                <button onClick={handleNext} disabled={currentPage === totalPages} className="px-2 py-1 rounded">
                                    Next
                                </button>
                            </div>
                        </div>


                    </div>
<<<<<<< HEAD

=======
                    
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d

                    <div className=' p-4 pl-10 pt-10 bg-white border border-gray-200 relative overflow-hidden shadow-lg w-full justify-center top-24' style={{ fontFamily: 'Lora', fontWeight: 600 }}>
                        <div className='flex'>
                            <h1 className='text-2xl w-4/5 mb-2 font-semibold'>POTENTIAL STATUS </h1>
                        </div>
                        <hr /><hr /><br />


                        <div className=' flex items-center mb-4'>
<<<<<<< HEAD
                            <label className='bg-gray-500 text-white px-1.5 py-1 rounded-md text-xs' >From</label>
                            <DatePicker
                                selected={statusFilterDateFrom}
                                onChange={(date) => setStatusFilterDateFrom(date)}
                                dateFormat="MM-dd-yyyy" // Customize the format as per your requirement
                                className="border w-28 h-6  border-gray-400 rounded-md p-1.5 overflow-hidden shadow-md outline-none"
                                placeholderText="mm-dd-yyyy" // Placeholder

                            />
                            <label className='bg-gray-500 text-white px-1.5 py-1 rounded-md ml-2 text-xs' >To</label>
                            <DatePicker
                                selected={statusFilterDateTo}
                                onChange={(date) => setStatusFilterDateTo(date)}
                                dateFormat="MM-dd-yyyy" // Customize the format as per your requirement
                                className="border w-28 h-6 border-gray-400 rounded-md p-1.5 overflow-hidden shadow-md outline-none"
                                placeholderText="mm-dd-yyyy" // Placeholder

                            />

                            <div className='mx-3 '>


                                <select onClick={Prob} className='border w-36 border-gray-400 rounded-md p-0.5 overflow-hidden shadow-md outline-none' value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} name="auth" id="auth">
                                    <option value="" disabled hidden className='text-xs'>Select Status</option>
                                    <option value="all" >All</option>
                                    {statuses.map(statuse => (
                                        <option key={statuse.id} value={statuse.status}>{statuse.status}</option>
                                    ))}
                                </select>


                            </div>

                            <div>
                                <button className='text-white bg-green-600 py-1 px-2 text-sm rounded-lg' onClick={handlePotentialStatusFilter}>SUBMIT</button>
                            </div>

                        </div>
=======
                                                    <label className='bg-gray-500 text-white px-1.5 py-1 rounded-md text-xs' >From</label>
                                                    <DatePicker
                                                        selected={statusFilterDateFrom}
                                                        onChange={(date) => setStatusFilterDateFrom(date)}
                                                        dateFormat="MM-dd-yyyy" // Customize the format as per your requirement
                                                        className="border w-28 h-6  border-gray-400 rounded-md p-1.5 overflow-hidden shadow-md outline-none"
                                                        placeholderText="mm-dd-yyyy" // Placeholder
                        
                                                    />
                                                    <label className='bg-gray-500 text-white px-1.5 py-1 rounded-md ml-2 text-xs' >To</label>
                                                    <DatePicker
                                                        selected={statusFilterDateTo}
                                                        onChange={(date) => setStatusFilterDateTo(date)}
                                                        dateFormat="MM-dd-yyyy" // Customize the format as per your requirement
                                                        className="border w-28 h-6 border-gray-400 rounded-md p-1.5 overflow-hidden shadow-md outline-none"
                                                        placeholderText="mm-dd-yyyy" // Placeholder
                        
                                                    />
                        
                                                    <div className='mx-3 '>
                        
                        
                                                        <select onClick={Prob} className='border w-36 border-gray-400 rounded-md p-0.5 overflow-hidden shadow-md outline-none' value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} name="auth" id="auth">
                                                            <option value="" disabled hidden className='text-xs'>Select Status</option>
                                                            <option  value="all" >All</option>
                                                            {statuses.map(statuse => (
                                                                <option  key={statuse.id} value={statuse.status}>{statuse.status}</option>
                                                            ))}
                                                        </select>
                        
                        
                                                    </div>
                        
                                                    <div>
                                                        <button className='text-white bg-green-600 py-1 px-2 text-sm rounded-lg' onClick={handlePotentialStatusFilter}>SUBMIT</button>
                                                    </div>
                        
                                                </div>
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d



                        <div className="max-h-[300px] overflow-auto flex">
                            <div className='w-1/2'>
                                <div className="max-h-[300px] overflow-auto">
                                    <table className="w-full divide-y divide-gray-200">
                                        <thead className="bg-black sticky top-0">
                                            <tr className='text-white'>
                                                {/*<th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">#</th>*/}
                                                <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Status</th>
                                                <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Count</th>
                                                <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Amount</th>
                                                {/*<th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">%</th>*/}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {potentialStatus.sort((a, b) => {
                                                const statusOrder = ['WON', 'WON RECURRING', 'PENDING', 'LOST']; // Define desired order
                                                return statusOrder.indexOf(a.status.toUpperCase()) - statusOrder.indexOf(b.status.toUpperCase());
                                            }).map((item, index) => (
                                                <tr className='border text-md' key={index}>
                                                    {/*<td className="px-3 text-center py-2">{index + 1}</td>*/}
                                                    <td className="px-3 text-left py-2">{item.status.toUpperCase()}</td>
                                                    <td className="px-3 text-center py-2">{item.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                    <td className="px-3 text-right py-2">${item.amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                    {/*<td className="px-3 text-center py-2">{item.percentage} %</td>*/}
                                                </tr>
                                            ))}
                                            {/* Display total row */}
                                            <tr className='border bg-gray-200 font-bold text-md'>
                                                {/*<td className="px-3 text-center py-2" colSpan="1">#</td>*/}
                                                <td className="px-3 text-left py-2"></td>
                                                <td className="px-3 text-center py-2"></td>
                                                {/*<td className="px-3 text-center py-2">{totalStatusCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>*/}
                                                <td className="px-3 text-right py-2">TOTAL  :  ${totalStatusAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                {/*<td className="px-3 text-center py-2">100 %</td>*/}
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
<<<<<<< HEAD

=======
                    
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d



                    <div className=' p-10 bg-white border border-gray-200 relative overflow-hidden shadow-lg w-full justify-center top-24' style={{ fontFamily: 'Lora', fontWeight: 600 }}>
                        <div className='flex'>
                            <h1 className='text-2xl w-4/5 mb-2 font-semibold'>PROBABILITY STATUS   </h1>
                        </div>
                        <hr /><hr /><br />
                        <div className="max-h-[300px] overflow-auto flex">
                            <div className='w-1/2'>

                                {/* start of filter */}
                                <div className=' flex items-center'>
                                    <label className='bg-gray-500 text-white px-1.5 py-1 rounded-md text-xs' >From</label>
                                    <DatePicker
                                        selected={probabilityFilterDateFrom}
                                        onChange={(date) => setProbabilityFilterDateFrom(date)}
                                        dateFormat="MM-dd-yyyy" // Customize the format as per your requirement
                                        className="border w-28 h-6  border-gray-400 rounded-md p-1.5 overflow-hidden shadow-md outline-none"
                                        placeholderText="mm-dd-yyyy" // Placeholder

                                    />
                                    <label className='bg-gray-500 text-white px-1.5 py-1 rounded-md ml-2 text-xs' >To</label>
                                    <DatePicker
                                        selected={probabilityFilterDateTo}
                                        onChange={(date) => setProbabilityFilterDateTo(date)}
                                        dateFormat="MM-dd-yyyy" // Customize the format as per your requirement
                                        className="border w-28 h-6 border-gray-400 rounded-md p-1.5 overflow-hidden shadow-md outline-none"
                                        placeholderText="mm-dd-yyyy" // Placeholder

                                    />

                                    <div className='mx-3 '>

                                        <select className='border w-36 border-gray-400 rounded-md p-0.5 overflow-hidden shadow-md outline-none' value={AssignedGroup} onChange={(e) => setAssignedGroup(e.target.value)} name="auth" id="auth">
<<<<<<< HEAD
                                            <option value="" hidden disabled>Select Group</option>
=======
                                            <option  value="" hidden disabled>Select Group</option>
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                                            <option value="all" >All</option>
                                            {GroupNames.map(group => (
                                                <option key={group.id} value={group.newGroupName}>{group.newGroupName}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <button className='text-white bg-green-600 py-1 px-2 text-sm rounded-lg relative inline-block' onClick={handleFilter}>SUBMIT</button>

                                    </div>

                                </div>
                                {/* end of filter */}


                                <div className="max-h-[300px] overflow-auto pt-4" >
                                    <table className="w-full divide-y divide-gray-200">
                                        <thead className="bg-black sticky top-0">
                                            <tr className='text-white'>
                                                {/*<th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">#</th>*/}
                                                <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Probability</th>
                                                <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Count</th>
                                                <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Amount</th>
                                                {/*<th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">%</th>*/}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {probabilityStatus
                                                .sort((a, b) => {
                                                    const probOrder = ['HIGH', 'MEDIUM', 'LOW']; // Define the desired order
                                                    return probOrder.indexOf(a.prob.toUpperCase()) - probOrder.indexOf(b.prob.toUpperCase());
                                                })
                                                .map((item, index) => (
                                                    <tr className='border text-md' key={index}>
                                                        {/*<td className="px-3 text-center py-2">{index + 1}</td>*/}
                                                        <td className="px-3 text-left py-2">{item.prob.toUpperCase()}</td>
                                                        <td className="px-3 text-center py-2">{item.count}</td>
                                                        <td className="px-3 text-right py-2">${item.amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                        {/*<td className="px-3 text-center py-2">{item.percentage} %</td>*/}
                                                    </tr>
                                                ))}
                                            {/* Display total row */}
                                            <tr className='border bg-gray-200 font-bold text-md'>
                                                {/*<td className="px-3 text-center py-2" colSpan="1">#</td>*/}
                                                <td className="px-3 text-left py-2"></td>
                                                <td className="px-3 text-center py-2"></td>
                                                {/*<td className="px-3 text-center py-2">{totalProbabilityCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>*/}
                                                <td className="px-3 text-right py-2">TOTAL  :  ${totalProbabilityAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                {/*<td className="px-3 text-center py-2">100 %</td>*/}
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
<<<<<<< HEAD

=======
                    
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d

                    <div className=' pl-10 pt-10 p-4 bg-white border border-gray-200 relative overflow-hidden shadow-lg w-full justify-center top-24' style={{ fontFamily: 'Lora', fontWeight: 600 }}>
                        <div className='flex'>
                            <h1 className='text-2xl w-4/5 mb-2 font-semibold'>LEAD SOURCE </h1>
                        </div>
                        <hr /><hr /><br />


                        <div className=' flex items-center mb-4'>
                            <label className='bg-gray-500 text-white px-1.5 py-1 rounded-md text-xs' >From</label>
                            <DatePicker
                                selected={sourceFilterDateFrom}
                                onChange={(date) => setSourceFilterDateFrom(date)}
                                dateFormat="MM-dd-yyyy" // Customize the format as per your requirement
                                className="border w-28 h-6  border-gray-400 rounded-md p-1.5 overflow-hidden shadow-md outline-none"
                                placeholderText="mm-dd-yyyy" // Placeholder

                            />
                            <label className='bg-gray-500 text-white px-1.5 py-1 rounded-md ml-2 text-xs' >To</label>
                            <DatePicker
                                selected={sourceFilterDateTo}
                                onChange={(date) => setSourceFilterDateTo(date)}
                                dateFormat="MM-dd-yyyy" // Customize the format as per your requirement
                                className="border w-28 h-6 border-gray-400 rounded-md p-1.5 overflow-hidden shadow-md outline-none"
                                placeholderText="mm-dd-yyyy" // Placeholder

                            />

                            <div className='mx-3 '>

                                <select className='border w-36 border-gray-400 rounded-md p-0.5 overflow-hidden shadow-md outline-none' value={selectedSource} onChange={(e) => setSelectedSource(e.target.value)} name="auth" id="auth" required>
<<<<<<< HEAD
                                    <option value="" hidden disabled>Select Source</option>
=======
                                    <option  value="" hidden disabled>Select Source</option>
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d
                                    <option value="all" >All</option>
                                    {Sources.map(Sourc => (
                                        <option key={Sourc.id} value={Sourc.newSource}>{Sourc.newSource}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <button className='text-white bg-green-600 py-1 px-2 text-sm rounded-lg' onClick={handleLeadingSourceFilter}>SUBMIT</button>
                            </div>

                        </div>



                        <div className="max-h-[300px] overflow-auto flex">
                            <div className='w-1/2'>
                                <div className="max-h-[300px] overflow-auto">
                                    <table className="w-full divide-y divide-gray-200">
                                        <thead className="bg-black sticky top-0">
                                            <tr className='text-white'>
                                                {/*<th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">#</th>*/}
                                                <th className="px-4 py-3 text-left border text-sm font-medium uppercase tracking-wider">Source</th>
                                                <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">Count</th>
                                                <th className="px-4 py-3 text-center border text-sm font-medium uppercase tracking-wider">%</th>
                                                <th className="px-4 py-3 text-right border text-sm font-medium uppercase tracking-wider">Amount</th>

                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {potentialSource.map((item, index) => (
                                                <tr className='border text-md' key={index}>
                                                    {/*<td className="px-3 text-center py-2">{index + 1}</td>*/}
                                                    <td className="px-3 text-left py-2">{item.source.toUpperCase()}</td>
                                                    <td className="px-3 text-center py-2">{item.count}</td>
                                                    <td className="px-3 text-center py-2">{item.percentage} %</td>
                                                    <td className="px-3 text-right py-2">${item.amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                </tr>
                                            ))}
                                            {/* Display total row */}
                                            <tr className='border bg-gray-200 font-bold text-md'>
                                                {/*<td className="px-3 text-center py-2" colSpan="1">#</td>*/}
                                                <td className="px-3 text-left py-2"></td>
                                                <td className="px-3 text-center py-2"></td>
                                                <td className="px-3 text-center py-2"></td>
                                                {/*<td className="px-3 text-center py-2">{totalSourceCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>*/}
                                                <td className="px-3 text-right py-2">TOTAL  :  ${totalSourceAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                {/*<td className="px-3 text-center py-2">100 %</td>*/}
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
                </div>
<<<<<<< HEAD
            </div>
=======
            </div>    
>>>>>>> d01921e03d8f442df2a15f95ec9e4853fc9f328d

            <br /><br /><br />
        </>
    );
};

export default Dashboard1;
