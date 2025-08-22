import React, { useState, useEffect } from 'react';
import { Camera, Fingerprint, Activity, User, CheckCircle, XCircle, Download, FileSpreadsheet } from 'lucide-react';
import { exportToCSV, exportToExcel, saveAttendanceRecord, getTodaysAttendanceRecords, AttendanceRecord } from '../utils/attendanceExport';

export const AttendanceCapture: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState('face');
  const [isCapturing, setIsCapturing] = useState(false);
  const [recognizedStudent, setRecognizedStudent] = useState<any>(null);
  const [captureProgress, setCaptureProgress] = useState(0);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCapturing) {
      interval = setInterval(() => {
        setCaptureProgress((prev) => {
          if (prev >= 100) {
            setIsCapturing(false);
            // Simulate recognition
            setTimeout(() => {
              setRecognizedStudent({
                name: 'Emma Thompson',
                id: 'ST001234',
                class: '10-A',
                confidence: 98.5
              });
              setAttendanceMarked(false);
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isCapturing]);

  const startCapture = () => {
    setIsCapturing(true);
    setCaptureProgress(0);
    setRecognizedStudent(null);
    setAttendanceMarked(false);
    setAttendanceMarked(false);
  };

  const markAttendance = () => {
    if (!recognizedStudent) return;

    const now = new Date();
    const attendanceRecord: AttendanceRecord = {
      studentId: recognizedStudent.id,
      studentName: recognizedStudent.name,
      class: recognizedStudent.class,
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString(),
      method: activeMethod as 'face' | 'fingerprint' | 'motion',
      confidence: recognizedStudent.confidence,
      status: 'present'
    };

    // Save to localStorage
    saveAttendanceRecord(attendanceRecord);
    setAttendanceMarked(true);
    
    // Show success message
    alert(`Attendance marked successfully for ${recognizedStudent.name}!`);
  };

  const exportTodaysAttendance = (format: 'csv' | 'excel') => {
    const todaysRecords = getTodaysAttendanceRecords();
    
    if (todaysRecords.length === 0) {
      alert('No attendance records found for today.');
      return;
    }

    const filename = `attendance_${new Date().toISOString().split('T')[0]}`;
    
    if (format === 'csv') {
      exportToCSV(todaysRecords, `${filename}.csv`);
    } else {
      exportToExcel(todaysRecords, `${filename}.xlsx`);
    }
    
    setShowExportOptions(false);
  };

  const methods = [
    {
      id: 'face',
      name: 'Face Recognition',
      icon: Camera,
      description: 'Advanced AI-powered facial recognition',
      color: 'blue'
    },
    {
      id: 'fingerprint',
      name: 'Fingerprint Scan',
      icon: Fingerprint,
      description: 'Secure biometric fingerprint authentication',
      color: 'green'
    },
    {
      id: 'motion',
      name: 'Motion Detection',
      icon: Activity,
      description: 'Full-body motion pattern recognition',
      color: 'purple'
    }
  ];

  const getMethodColor = (color: string) => {
    const colors = {
      blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
      green: 'from-green-500/20 to-green-600/20 border-green-500/30',
      purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Attendance Capture</h2>
        <p className="text-slate-400">Select a biometric method to record student attendance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {methods.map((method) => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              onClick={() => setActiveMethod(method.id)}
              className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
                activeMethod === method.id
                  ? `bg-gradient-to-br ${getMethodColor(method.color)} scale-105`
                  : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50'
              }`}
            >
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-br ${getMethodColor(method.color)} flex items-center justify-center mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{method.name}</h3>
                <p className="text-sm text-slate-400">{method.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Live Capture Feed</h3>
            <div className="relative">
              <button
                onClick={() => setShowExportOptions(!showExportOptions)}
                className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Export Today</span>
              </button>
              
              {showExportOptions && (
                <div className="absolute right-0 top-12 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10 min-w-48">
                  <button
                    onClick={() => exportTodaysAttendance('csv')}
                    className="w-full flex items-center space-x-2 px-4 py-3 text-white hover:bg-slate-700 transition-colors rounded-t-lg"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Export as CSV</span>
                  </button>
                  <button
                    onClick={() => exportTodaysAttendance('excel')}
                    className="w-full flex items-center space-x-2 px-4 py-3 text-white hover:bg-slate-700 transition-colors rounded-b-lg"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Export as Excel</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-600">
              {isCapturing ? (
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white font-medium">Capturing... {captureProgress}%</p>
                </div>
              ) : (
                <div className="text-center">
                  <Camera className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-400">Camera feed will appear here</p>
                </div>
              )}
            </div>
            {isCapturing && (
              <div className="absolute inset-0 border-2 border-blue-500 rounded-lg animate-pulse"></div>
            )}
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={startCapture}
              disabled={isCapturing}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCapturing ? 'Capturing...' : 'Start Capture'}
            </button>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Recognition Results</h3>
          
          {recognizedStudent ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-green-400 font-medium">Recognition Successful</p>
                  <p className="text-sm text-slate-300">Student identified with high confidence</p>
                </div>
              </div>

              <div className="p-6 bg-slate-700/30 rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{recognizedStudent.name}</h4>
                    <p className="text-slate-400">Student ID: {recognizedStudent.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Class</p>
                    <p className="text-white font-medium">{recognizedStudent.class}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Confidence</p>
                    <p className="text-white font-medium">{recognizedStudent.confidence}%</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Time</p>
                    <p className="text-white font-medium">{new Date().toLocaleTimeString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Status</p>
                    <p className="text-green-400 font-medium">Present</p>
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={markAttendance}
                  disabled={attendanceMarked}
                  className={`flex-1 px-4 py-2 font-medium rounded-lg transition-colors ${
                    attendanceMarked 
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {attendanceMarked ? 'Attendance Marked ✓' : 'Mark Attendance'}
                </button>
                <button 
                  onClick={() => exportToCSV([{
                    studentId: recognizedStudent.id,
                    studentName: recognizedStudent.name,
                    class: recognizedStudent.class,
                    date: new Date().toISOString().split('T')[0],
                    time: new Date().toLocaleTimeString(),
                    method: activeMethod as 'face' | 'fingerprint' | 'motion',
                    confidence: recognizedStudent.confidence,
                    status: 'present'
                  }], `${recognizedStudent.name}_attendance_${new Date().toISOString().split('T')[0]}.csv`)}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Export Record
                </button>
              </div>
              
              {attendanceMarked && (
                <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm font-medium">
                    ✓ Attendance has been recorded and saved to the system
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400">No student recognized yet</p>
              <p className="text-sm text-slate-500 mt-2">Start capture to begin recognition</p>
              
              {/* Show today's attendance count */}
              <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
                <p className="text-slate-300 text-sm">Today's Attendance Records</p>
                <p className="text-white font-bold text-2xl">{getTodaysAttendanceRecords().length}</p>
                <div className="flex justify-center space-x-2 mt-3">
                  <button
                    onClick={() => exportTodaysAttendance('csv')}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    <span>CSV</span>
                  </button>
                  <button
                    onClick={() => exportTodaysAttendance('excel')}
                    className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    <span>Excel</span>
                  </button>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};