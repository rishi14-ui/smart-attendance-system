import React, { useState } from 'react';
import { Database, Search, Download, Calendar, User, Clock, TrendingUp } from 'lucide-react';
import { getAllAttendanceRecords, exportToCSV, exportToExcel, AttendanceRecord as ExportAttendanceRecord } from '../utils/attendanceExport';

interface AttendanceRecord extends ExportAttendanceRecord {
  id?: string;
  timestamp?: string;
}

export const AttendanceDatabase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMethod, setSelectedMethod] = useState('all');

  // Get real attendance records from localStorage and merge with sample data
  const realRecords = getAllAttendanceRecords().map((record, index) => ({
    ...record,
    id: `real_${index}`,
    timestamp: `${record.date}T${record.time}`
  }));

  const sampleRecords: AttendanceRecord[] = [
    {
      id: '1',
      studentId: 'ST001234',
      studentName: 'Emma Thompson',
      class: '10-A',
      timestamp: '2024-01-15T08:15:30Z',
      date: '2024-01-15',
      time: '08:15:30',
      method: 'face',
      confidence: 98.5,
      status: 'present'
    },
    {
      id: '2',
      studentId: 'ST001235',
      studentName: 'James Wilson',
      class: '10-A',
      timestamp: '2024-01-15T08:17:45Z',
      date: '2024-01-15',
      time: '08:17:45',
      method: 'fingerprint',
      confidence: 99.2,
      status: 'present'
    },
    {
      id: '3',
      studentId: 'ST001236',
      studentName: 'Sarah Davis',
      class: '10-B',
      timestamp: '2024-01-15T08:20:12Z',
      date: '2024-01-15',
      time: '08:20:12',
      method: 'motion',
      confidence: 94.7,
      status: 'present'
    },
    {
      id: '4',
      studentId: 'ST001237',
      studentName: 'Michael Brown',
      class: '10-B',
      timestamp: '2024-01-15T09:05:22Z',
      date: '2024-01-15',
      time: '09:05:22',
      method: 'face',
      confidence: 97.8,
      status: 'late'
    },
    {
      id: '5',
      studentId: 'ST001238',
      studentName: 'Lisa Anderson',
      class: '11-A',
      timestamp: '2024-01-15T08:12:55Z',
      date: '2024-01-15',
      time: '08:12:55',
      method: 'fingerprint',
      confidence: 98.9,
      status: 'present'
    }
  ];

  // Combine real records with sample records
  const attendanceRecords = [...realRecords, ...sampleRecords];

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = selectedMethod === 'all' || record.method === selectedMethod;
    return matchesSearch && matchesMethod;
  });

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'face':
        return '👤';
      case 'fingerprint':
        return '👆';
      case 'motion':
        return '🏃';
      default:
        return '📱';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-900/30 text-green-400';
      case 'late':
        return 'bg-yellow-900/30 text-yellow-400';
      case 'absent':
        return 'bg-red-900/30 text-red-400';
      default:
        return 'bg-slate-700/30 text-slate-400';
    }
  };

  const exportToExcel = () => {
    if (filteredRecords.length === 0) {
      alert('No records to export.');
      return;
    }

    const exportRecords: ExportAttendanceRecord[] = filteredRecords.map(record => ({
      studentId: record.studentId,
      studentName: record.studentName,
      class: record.class,
      date: record.date || (record.timestamp ? new Date(record.timestamp).toISOString().split('T')[0] : ''),
      time: record.time || (record.timestamp ? new Date(record.timestamp).toLocaleTimeString() : ''),
      method: record.method,
      confidence: record.confidence,
      status: record.status
    }));

    exportToExcel(exportRecords, `attendance_database_${selectedDate}.xlsx`);
  };

  const exportToCSVFile = () => {
    if (filteredRecords.length === 0) {
      alert('No records to export.');
      return;
    }

    const exportRecords: ExportAttendanceRecord[] = filteredRecords.map(record => ({
      studentId: record.studentId,
      studentName: record.studentName,
      class: record.class,
      date: record.date || (record.timestamp ? new Date(record.timestamp).toISOString().split('T')[0] : ''),
      time: record.time || (record.timestamp ? new Date(record.timestamp).toLocaleTimeString() : ''),
      method: record.method,
      confidence: record.confidence,
      status: record.status
    }));

    exportToCSV(exportRecords, `attendance_database_${selectedDate}.csv`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Attendance Database</h2>
          <p className="text-slate-400">Comprehensive attendance records and reporting</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={exportToCSVFile}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={exportToExcel}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg">
              <User className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Records</p>
              <p className="text-2xl font-bold text-white">{filteredRecords.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Present Today</p>
              <p className="text-2xl font-bold text-white">
                {filteredRecords.filter(r => r.status === 'present').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Late Arrivals</p>
              <p className="text-2xl font-bold text-white">
                {filteredRecords.filter(r => r.status === 'late').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg">
              <Database className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Avg Confidence</p>
              <p className="text-2xl font-bold text-white">
                {(filteredRecords.reduce((acc, r) => acc + r.confidence, 0) / filteredRecords.length).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-full md:w-80"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-slate-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <select
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Methods</option>
                <option value="face">Face Recognition</option>
                <option value="fingerprint">Fingerprint</option>
                <option value="motion">Motion Detection</option>
              </select>
            </div>
          </div>
        </div>

        {/* Records Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left py-4 px-4 text-slate-300 font-medium">Student</th>
                <th className="text-left py-4 px-4 text-slate-300 font-medium">Class</th>
                <th className="text-left py-4 px-4 text-slate-300 font-medium">Date & Time</th>
                <th className="text-left py-4 px-4 text-slate-300 font-medium">Method</th>
                <th className="text-left py-4 px-4 text-slate-300 font-medium">Confidence</th>
                <th className="text-left py-4 px-4 text-slate-300 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{record.studentName}</p>
                        <p className="text-sm text-slate-400">{record.studentId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm">
                      {record.class}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-white text-sm">{record.date || (record.timestamp ? new Date(record.timestamp).toLocaleDateString() : 'N/A')}</p>
                      <p className="text-slate-400 text-sm">{record.time || (record.timestamp ? new Date(record.timestamp).toLocaleTimeString() : 'N/A')}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getMethodIcon(record.method)}</span>
                      <span className="text-white capitalize">{record.method}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                          style={{ width: `${record.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-white font-medium text-sm">{record.confidence}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                      {record.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <Database className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-400">No attendance records found</p>
            <p className="text-sm text-slate-500 mt-2">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};