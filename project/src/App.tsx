import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { AttendanceCapture } from './components/AttendanceCapture';
import { FaceDetection } from './components/FaceDetection';
import { AttendanceDatabase } from './components/AttendanceDatabase';
import { AttendanceReports } from './components/AttendanceReports';
import { StudentManagement } from './components/StudentManagement';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import { Sidebar } from './components/Sidebar';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'capture':
        return <AttendanceCapture />;
      case 'detection':
        return <FaceDetection />;
      case 'database':
        return <AttendanceDatabase />;
      case 'reports':
        return <AttendanceReports />;
      case 'students':
        return <StudentManagement />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;