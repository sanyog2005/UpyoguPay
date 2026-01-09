import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/Auth/Login';
import PaymentLand from './pages/landingPages/PaymentLand';
import BankingLand from './pages/landingPages/BankingLand';
import ResourcesLand from './pages/landingPages/ResourcesLand';


// Generic Page Component for Top-Level Routes</>
const GenericPage = () => {
    return (
        <div className="p-4">
            <h1>Generic Page</h1>
            <p>This is a placeholder for top-level navigation items.</p>
        </div>
    );
};

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import MerchantApprovals from './pages/Admin/MerchantApprovals';
import Reports from './pages/Admin/Reports';
import StaffManagement from './pages/Admin/StaffManagement';
import SystemSettings from './pages/Admin/SystemSettings';

// Merchant Pages
import MerchantDashboard from './pages/Merchant/MerchantDashboard';
import MerchantTransactions from './pages/Merchant/MerchantTransactions';
import MerchantKYC from './pages/Merchant/MerchantKYC';
import APISettings from './pages/Merchant/APISettings';
import RefundManagement from './pages/Merchant/RefundManagement';
import MerchantSupport from './pages/Merchant/MerchantSupport';
import Settlement from './pages/Merchant/Settlement';
import Profile from './pages/Merchant/Profile';
import ReportsMerch from './pages/Merchant/ReportsMerch';
import Developers from './pages/Merchant/Developers';
import Customers from './pages/Merchant/Customers';
import International from './pages/Merchant/International';
import QRCodes from './pages/Merchant/QrCode';
import PaymentLinks from './pages/Merchant/PaymentLinks';
import Subscriptions from './pages/Merchant/Subscriptions';
import PaymentPages from './pages/Merchant/PaymentPages';
import PaymentButton from './pages/Merchant/PaymentButton';
import Invoices from './pages/Merchant/Invoices';
import LandingPage from './pages/Auth/LandingPage';

// Staff Pages
import StaffDashboard from './pages/Staff/StaffDashBoard';
import StaffSupport from './pages/Staff/StaffSupport';
import StaffReports from './pages/Staff/StaffReports';
import StaffOperations from './pages/Staff/StaffOperations';
import SignUp from './pages/Auth/SignUp';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you are looking for does not exist.</p>
            <a href="/">Go back to Home</a>
        </div>
    );
};

const App = () => {
    // In a real app, this would come from a Context or Redux store
    const [userRole, setUserRole] = useState(null);

    const handleLogin = (role) => {
        setUserRole(role);
    };

    const handleLogout = () => {
        setUserRole(null);
    };

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Route */}
                <Route path="/" element={<LandingPage />} />
                <Route 
                    path="/login" 
                    element={!userRole ? <Login onLogin={handleLogin} /> : <Navigate to={`/${userRole}/dashboard`} />} 
                />
                 <Route path="/signup" element={<SignUp />} />

                 {/* --- New Routes for Navbar Items --- */}
      
      {/* Top Level Routes */}
      <Route path="/payment" element={<PaymentLand />} />
      <Route path="/banking" element={<BankingLand />} />
      <Route path="/payroll" element={<GenericPage />} />
      <Route path="/engage" element={<GenericPage />} />
      <Route path="/partners" element={<GenericPage />} />
      <Route path="/resources" element={<ResourcesLand />} />
      <Route path="/pricing" element={<GenericPage />} />



                {/* Protected Routes Wrapper */}
                {/* If logged in, render Layout. If not, Redirect to Login. */}
                <Route path="/" element={userRole ? <Layout role={userRole} onLogout={handleLogout} /> : <Navigate to="/login" />}>
                    
                    {/* Merchant Routes */}
                    {userRole === 'merchant' && (
                        <>
                            <Route path="merchant/dashboard" element={<MerchantDashboard />} />
                            <Route path="merchant/transactions" element={<MerchantTransactions />} />
                            <Route path="merchant/kyc" element={<MerchantKYC />} />
                            <Route path="merchant/api" element={<APISettings />} />
                            <Route path="merchant/refund" element={<RefundManagement />} />
                            <Route path="merchant/merchantSupport" element={<MerchantSupport />} />
                            <Route path="merchant/settlement" element={<Settlement />} />
                            <Route path="merchant/profile" element={<Profile />} />
                            <Route path="merchant/reportsMerch" element={<ReportsMerch />} />
                            <Route path="merchant/developers" element={<Developers />} />
                            <Route path="merchant/customers" element={<Customers />} />
                            <Route path="merchant/International" element={<International />} />
                            <Route path="merchant/QRcode" element={<QRCodes />} />
                            <Route path="merchant/PaymentLinks" element={<PaymentLinks />} />
                            <Route path="merchant/subscriptions" element={<Subscriptions />} />
                            <Route path="merchant/paymentPages" element={<PaymentPages />} />
                            <Route path="merchant/paymentButton" element={<PaymentButton />} />
                            <Route path="merchant/invoices" element={<Invoices />} />
                        </>
                    )}

                    {/* Admin Routes */}
                    {userRole === 'admin' && (
                        <>
                            <Route path="admin/dashboard" element={<AdminDashboard />} />
                            <Route path="admin/merchants" element={<MerchantApprovals />} />
                            <Route path="admin/reports" element={<Reports />} />
                            <Route path="admin/staff" element={<StaffManagement />} />
                            <Route path="admin/settings" element={<SystemSettings />} />
                        </>
                    )}

                    {/* Staff Routes */}
                    {userRole === 'staff' && (
                        <>
                            <Route path="staff/dashboard" element={<StaffDashboard />} />
                            <Route path="staff/kyc-review" element={<StaffDashboard />} />
                            <Route path="staff/support" element={<StaffSupport />} />
                            <Route path="staff/reports" element={<StaffReports />} />
                            <Route path="staff/operations" element={<StaffOperations />} />
                            {/* Note: You had duplicate routes in your snippet, I kept unique ones */}
                        </>
                    )}

                    {/* 404 Catch-All INSIDE the Layout */}
                    {/* This ensures the Sidebar/Header remains visible on the 404 page */}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;