import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Login from './components/pages/Login';
import Forgotpw from './components/pages/Forgotpw';
import ResetPassword from './components/pages/ResetPassword';
import ForgotResetPassword from './components/pages/ForgotResetpw';
import Admin from './components/pages/Admin';

import Dashboard from './components/pages/Dashboard';
import AddLead from './components/pages/L1/AddLead';
import LeadReport from './components/pages/L1/LeadReport';
import Employees from './components/pages/L1/Employees';
import ServiceType from './components/pages/L1/ServiceType';
import LeadType from './components/pages/L1/LeadType';
import Status from './components/pages/L1/Status';
import Source from './components/pages/L1/Source';
import AuthGroup from './components/pages/L1/AuthGroup';
import ClientMaster from './components/pages/L1/ClientMaster';
import AddGroup from './components/pages/L1/AddGroup';
import EditLead from './components/pages/L1/EditLead';

import Dashboard1 from './components/pages/Dashboard1';
import AddLead1 from './components/pages/L2/AddLead1';
import LeadReport1 from './components/pages/L2/LeadReport1';
import EditLead1 from './components/pages/L2/EditLead1';

import Dashboard2 from './components/pages/Dashboard2';
import AddLead2 from './components/pages/L3/AddLead2';
import LeadReport2 from './components/pages/L3/LeadReport2';
import EditLead2 from './components/pages/L3/EditLead2';

const root = createRoot(document.getElementById('root'));

root.render(
    <SnackbarProvider 
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpw" element={<Forgotpw />} />
          <Route path="/setpw" element={<ResetPassword />} />
          <Route path="/resetpw" element={<ForgotResetPassword />} />

          <Route path="/dashboard" element={<Admin />} />

          <Route path="/dashboard_1" element={<Dashboard />} />
          <Route path="/addlead_1" element={<AddLead />} />
          <Route path="/leadreport_1" element={<LeadReport />} />
          <Route path="/employees_1" element={<Employees />} />
          <Route path="/service_type_1" element={<ServiceType />} />
          <Route path="/lead_type_1" element={<LeadType />} />
          <Route path="/status_1" element={<Status />} />
          <Route path="/source_1" element={<Source />} />
          <Route path="/auth_group_1" element={<AuthGroup />} />
          <Route path="/client_master_1" element={<ClientMaster />} />
          <Route path="/add_group_1" element={<AddGroup />} />
          <Route path="/editlead/:id" element={<EditLead />} />

          <Route path="/dashboard_2" element={<Dashboard1 />} />
          <Route path="/addlead_2" element={<AddLead1 />} />
          <Route path="/leadreport_2" element={<LeadReport1 />} />
          <Route path="/editlead1/:id" element={<EditLead1 />} />
          
          <Route path="/dashboard_3" element={<Dashboard2 />} />
          <Route path="/addlead_3" element={<AddLead2 />} />
          <Route path="/leadreport_3" element={<LeadReport2 />} />
          <Route path="/editlead2/:id" element={<EditLead2 />} />
        </Routes>
      </Router>
    </SnackbarProvider>
);

reportWebVitals();
