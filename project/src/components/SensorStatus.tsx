import React from 'react';
import { Camera, Fingerprint, Activity, Wifi, AlertTriangle } from 'lucide-react';

export const SensorStatus: React.FC = () => {
  const sensors = [
    {
      name: 'Face Recognition Camera #1',
      status: 'online',
      accuracy: '98.5%',
      icon: Camera,
      lastUpdate: '2s ago'
    },
    {
      name: 'Face Recognition Camera #2',
      status: 'online',
      accuracy: '97.8%',
      icon: Camera,
      lastUpdate: '1s ago'
    },
    {
      name: 'Fingerprint Sensor #1',
      status: 'online',
      accuracy: '99.2%',
      icon: Fingerprint,
      lastUpdate: '3s ago'
    },
    {
      name: 'Fingerprint Sensor #2',
      status: 'maintenance',
      accuracy: 'N/A',
      icon: Fingerprint,
      lastUpdate: '5m ago'
    },
    {
      name: 'Motion Detection System',
      status: 'online',
      accuracy: '94.7%',
      icon: Activity,
      lastUpdate: '1s ago'
    },
    {
      name: 'Network Connection',
      status: 'online',
      accuracy: '100%',
      icon: Wifi,
      lastUpdate: 'Active'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-400 bg-green-900/30';
      case 'maintenance':
        return 'text-yellow-400 bg-yellow-900/30';
      case 'offline':
        return 'text-red-400 bg-red-900/30';
      default:
        return 'text-slate-400 bg-slate-700/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />;
      case 'maintenance':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'offline':
        return <div className="w-2 h-2 bg-red-400 rounded-full" />;
      default:
        return <div className="w-2 h-2 bg-slate-400 rounded-full" />;
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">Sensor Status</h3>
      <div className="space-y-4">
        {sensors.map((sensor, index) => {
          const Icon = sensor.icon;
          return (
            <div key={index} className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-lg">
              <div className="flex-shrink-0">
                <Icon className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white truncate">{sensor.name}</p>
                  {getStatusIcon(sensor.status)}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(sensor.status)}`}>
                    {sensor.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-500">{sensor.lastUpdate}</span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Accuracy</span>
                    <span className="text-white font-medium">{sensor.accuracy}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};