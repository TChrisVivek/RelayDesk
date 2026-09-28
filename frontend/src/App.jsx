import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Personnel from './pages/Personnel';
import Budget from './pages/Budget';
import Reports from './pages/Reports';
import SettingsPage from './pages/Settings';
import ProjectDetail from './pages/ProjectDetail';
import BlockDashboard from './pages/BlockDashboard';
import ProjectPlanManager from './components/ProjectPlanManager';
import Login from './pages/Login';
import PendingApproval from './pages/PendingApproval';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from './pages/UserProfile';
import BlockedAccess from './pages/BlockedAccess';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen overflow-hidden">
        {/* Global Demo Banner */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] md:text-xs font-semibold py-2 px-4 text-center z-[9999] shrink-0 shadow-md flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
            <div className="flex items-center gap-1.5">
                <span className="flex items-center justify-center bg-white/20 rounded-full w-4 h-4 text-[10px] shrink-0">!</span>
                <span>This is a white-labeled demonstration environment.</span>
            </div>
            <span className="opacity-90">All data, projects, and metrics are simulated for representation purposes only.</span>
        </div>
        
        {/* App Content */}
        <div className="flex-1 overflow-hidden relative">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/pending-approval" element={<ProtectedRoute requireRole="Pending"><PendingApproval /></ProtectedRoute>} />
            <Route path="/blocked" element={<ProtectedRoute requireRole="Blocked"><BlockedAccess /></ProtectedRoute>} />

            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
            <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
            <Route path="/projects/:projectId/blocks/:blockId" element={<ProtectedRoute><BlockDashboard /></ProtectedRoute>} />
            <Route path="/personnel" element={<ProtectedRoute allowedRoles={['Admin', 'Site Manager']}><Personnel /></ProtectedRoute>} />
            <Route path="/budget" element={<ProtectedRoute allowedRoles={['Admin']}><Budget /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute allowedRoles={['Admin', 'Site Manager', 'Client']}><Reports /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute allowedRoles={['Admin', 'Site Manager']}><SettingsPage /></ProtectedRoute>} />
            <Route path="/plan-manager" element={<ProtectedRoute><ProjectPlanManager /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
