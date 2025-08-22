import React from 'react';
import { TrendingUp, Calendar, Users, Clock } from 'lucide-react';

export const Analytics: React.FC = () => {
  const monthlyData = [
    { month: 'Jan', attendance: 85, total: 1200 },
    { month: 'Feb', attendance: 88, total: 1230 },
    { month: 'Mar', attendance: 92, total: 1250 },
    { month: 'Apr', attendance: 87, total: 1240 },
    { month: 'May', attendance: 90, total: 1260 },
    { month: 'Jun', attendance: 89, total: 1247 },
  ];

  const biometricStats = [
    { method: 'Face Recognition', usage: 65, accuracy: 98.5, color: 'blue' },
    { method: 'Fingerprint Scan', usage: 28, accuracy: 99.2, color: 'green' },
    { method: 'Motion Detection', usage: 7, accuracy: 94.7, color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h2>
        <p className="text-slate-400">Comprehensive attendance analytics and insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Monthly Attendance Trends</h3>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-slate-400 w-8">{data.month}</span>
                  <div className="flex-1 bg-slate-700/30 rounded-full h-3 w-40">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${data.attendance}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{data.attendance}%</p>
                  <p className="text-xs text-slate-400">{data.total} students</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Biometric Method Usage</h3>
          <div className="space-y-6">
            {biometricStats.map((stat, index) => {
              const colors = {
                blue: 'from-blue-500 to-blue-600',
                green: 'from-green-500 to-green-600',
                purple: 'from-purple-500 to-purple-600'
              };
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{stat.method}</span>
                    <span className="text-slate-400">{stat.usage}%</span>
                  </div>
                  <div className="bg-slate-700/30 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${colors[stat.color as keyof typeof colors]} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${stat.usage}%` }}
                    />
                  </div>
                  <div className="text-sm text-slate-400">
                    Accuracy: {stat.accuracy}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="text-white font-bold">Peak Hours</h4>
              <p className="text-slate-400 text-sm">Most active periods</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">8:00 - 9:00 AM</span>
              <span className="text-white font-medium">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">1:00 - 2:00 PM</span>
              <span className="text-white font-medium">32%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">9:00 - 10:00 AM</span>
              <span className="text-white font-medium">23%</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg">
              <Calendar className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h4 className="text-white font-bold">Weekly Overview</h4>
              <p className="text-slate-400 text-sm">Attendance by day</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Monday</span>
              <span className="text-white font-medium">92%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Friday</span>
              <span className="text-white font-medium">85%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Wednesday</span>
              <span className="text-white font-medium">89%</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg">
              <Clock className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h4 className="text-white font-bold">Response Time</h4>
              <p className="text-slate-400 text-sm">System performance</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Face Recognition</span>
              <span className="text-white font-medium">1.2s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Fingerprint Scan</span>
              <span className="text-white font-medium">0.8s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Motion Detection</span>
              <span className="text-white font-medium">0.5s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};