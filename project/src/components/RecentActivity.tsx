import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      student: 'Emma Thompson',
      action: 'Face Recognition',
      status: 'success',
      time: '09:15 AM',
      method: 'Camera #1'
    },
    {
      id: 2,
      student: 'James Wilson',
      action: 'Fingerprint Scan',
      status: 'success',
      time: '09:12 AM',
      method: 'Sensor #2'
    },
    {
      id: 3,
      student: 'Sarah Davis',
      action: 'Motion Detection',
      status: 'success',
      time: '09:10 AM',
      method: 'Motion Sensor'
    },
    {
      id: 4,
      student: 'Michael Brown',
      action: 'Face Recognition',
      status: 'failed',
      time: '09:08 AM',
      method: 'Camera #1'
    },
    {
      id: 5,
      student: 'Lisa Anderson',
      action: 'Fingerprint Scan',
      status: 'success',
      time: '09:05 AM',
      method: 'Sensor #1'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
            <div className="flex-shrink-0">
              {getStatusIcon(activity.status)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white truncate">{activity.student}</p>
                <div className="flex items-center space-x-1 text-slate-400 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{activity.time}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-slate-400">{activity.action}</p>
                <span className="text-xs text-slate-500">{activity.method}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};