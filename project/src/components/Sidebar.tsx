import React from 'react';
import { 
  LayoutDashboard, 
  Camera, 
  Scan,
  Database,
  FileText,
  Users, 
  BarChart3, 
  Settings,
  Fingerprint,
  Eye
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'capture', label: 'Attendance Capture', icon: Camera },
    { id: 'detection', label: 'Face Detection', icon: Scan },
    { id: 'database', label: 'Attendance Database', icon: Database },
    { id: 'reports', label: 'Reports & Analytics', icon: FileText },
    { id: 'students', label: 'Student Management', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-800/50 backdrop-blur-xl border-r border-slate-700/50 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="relative">
            <Eye className="w-8 h-8 text-blue-400" />
            <Fingerprint className="w-4 h-4 text-green-400 absolute -bottom-1 -right-1" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Smart Attendance</h1>
            <p className="text-sm text-slate-400">Biometric System</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};