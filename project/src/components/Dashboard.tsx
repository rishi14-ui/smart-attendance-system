import React from 'react';
import { 
  Users, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Activity
} from 'lucide-react';
import { StatsCard } from './StatsCard';
import { RecentActivity } from './RecentActivity';
import { SensorStatus } from './SensorStatus';

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '1,247',
      change: '+12.5%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Present Today',
      value: '1,089',
      change: '+5.2%',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Attendance Rate',
      value: '87.3%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Late Arrivals',
      value: '23',
      change: '-8.4%',
      icon: Clock,
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
          <p className="text-slate-400">Monitor attendance and system status in real-time</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 bg-green-900/20 text-green-400 px-3 py-2 rounded-lg border border-green-500/30">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-medium">System Online</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <SensorStatus />
        </div>
      </div>
    </div>
  );
};