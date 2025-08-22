import React, { useState } from 'react';
import { Search, Plus, Edit3, Trash2, Eye, User } from 'lucide-react';

export const StudentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  const students = [
    {
      id: 'ST001234',
      name: 'Emma Thompson',
      class: '10-A',
      email: 'emma.thompson@school.edu',
      phone: '+1 234-567-8901',
      status: 'Active',
      lastAttendance: '2024-01-15',
      attendanceRate: 95.5,
      biometricStatus: {
        face: true,
        fingerprint: true,
        motion: true
      }
    },
    {
      id: 'ST001235',
      name: 'James Wilson',
      class: '10-A',
      email: 'james.wilson@school.edu',
      phone: '+1 234-567-8902',
      status: 'Active',
      lastAttendance: '2024-01-15',
      attendanceRate: 89.2,
      biometricStatus: {
        face: true,
        fingerprint: false,
        motion: true
      }
    },
    {
      id: 'ST001236',
      name: 'Sarah Davis',
      class: '10-B',
      email: 'sarah.davis@school.edu',
      phone: '+1 234-567-8903',
      status: 'Active',
      lastAttendance: '2024-01-14',
      attendanceRate: 92.8,
      biometricStatus: {
        face: true,
        fingerprint: true,
        motion: false
      }
    },
    {
      id: 'ST001237',
      name: 'Michael Brown',
      class: '10-B',
      email: 'michael.brown@school.edu',
      phone: '+1 234-567-8904',
      status: 'Inactive',
      lastAttendance: '2024-01-10',
      attendanceRate: 78.3,
      biometricStatus: {
        face: false,
        fingerprint: true,
        motion: true
      }
    }
  ];

  const classes = ['all', '10-A', '10-B', '11-A', '11-B', '12-A', '12-B'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Student Management</h2>
          <p className="text-slate-400">Manage student profiles and biometric enrollment</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
          <Plus className="w-5 h-5" />
          <span>Add Student</span>
        </button>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
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
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>
                  {cls === 'all' ? 'All Classes' : `Class ${cls}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left py-4 px-4 text-slate-300 font-medium">Student</th>
                <th className="text-left py-4 px-4 text-slate-300 font-medium">Class</th>
                <th className="text-left py-4 px-4 text-slate-300 font-medium">Contact</th>
                <th className="text-left py-4 px-4 text-slate-300 font-medium">Attendance</th>
                <th className="text-left py-4 px-4 text-slate-300 font-medium">Biometric Status</th>
                <th className="text-left py-4 px-4 text-slate-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{student.name}</p>
                        <p className="text-sm text-slate-400">{student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm">
                      {student.class}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-white text-sm">{student.email}</p>
                      <p className="text-slate-400 text-sm">{student.phone}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-white font-medium">{student.attendanceRate}%</p>
                      <p className="text-slate-400 text-sm">Last: {student.lastAttendance}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${student.biometricStatus.face ? 'bg-green-400' : 'bg-red-400'}`} title="Face Recognition" />
                      <div className={`w-3 h-3 rounded-full ${student.biometricStatus.fingerprint ? 'bg-green-400' : 'bg-red-400'}`} title="Fingerprint" />
                      <div className={`w-3 h-3 rounded-full ${student.biometricStatus.motion ? 'bg-green-400' : 'bg-red-400'}`} title="Motion Detection" />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-all duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-900/20 rounded-lg transition-all duration-200">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};