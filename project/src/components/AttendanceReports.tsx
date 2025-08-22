import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  Users, 
  Clock,
  BarChart3,
  PieChart
} from 'lucide-react';

export const AttendanceReports: React.FC = () => {
  const [reportType, setReportType] = useState('daily');
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-01-15'
  });

  const reportData = {
    daily: {
      totalStudents: 1247,
      present: 1089,
      absent: 158,
      late: 23,
      attendanceRate: 87.3,
      byMethod: {
        face: 712,
        fingerprint: 305,
        motion: 72
      }
    },
    weekly: {
      totalStudents: 1247,
      avgPresent: 1045,
      avgAbsent: 202,
      avgLate: 28,
      attendanceRate: 83.8,
      trends: [
        { day: 'Monday', rate: 92 },
        { day: 'Tuesday', rate: 89 },
        { day: 'Wednesday', rate: 87 },
        { day: 'Thursday', rate: 85 },
        { day: 'Friday', rate: 81 }
      ]
    },
    monthly: {
      totalStudents: 1247,
      avgPresent: 1012,
      avgAbsent: 235,
      avgLate: 35,
      attendanceRate: 81.2,
      monthlyTrends: [
        { month: 'Jan', rate: 85 },
        { month: 'Feb', rate: 88 },
        { month: 'Mar', rate: 82 },
        { month: 'Apr', rate: 79 },
        { month: 'May', rate: 83 }
      ]
    }
  };

  const currentData = reportData[reportType as keyof typeof reportData];

  const generateReport = (format: 'pdf' | 'excel' | 'csv') => {
    // Simulate report generation
    const filename = `attendance_report_${reportType}_${new Date().toISOString().split('T')[0]}.${format}`;
    
    // Create mock data for download
    let content = '';
    if (format === 'csv') {
      content = [
        ['Report Type', reportType.toUpperCase()],
        ['Generated', new Date().toLocaleString()],
        ['Date Range', `${dateRange.start} to ${dateRange.end}`],
        [''],
        ['Metric', 'Value'],
        ['Total Students', currentData.totalStudents],
        ['Present', 'present' in currentData ? currentData.present : currentData.avgPresent],
        ['Absent', 'absent' in currentData ? currentData.absent : currentData.avgAbsent],
        ['Late', 'late' in currentData ? currentData.late : currentData.avgLate],
        ['Attendance Rate', `${currentData.attendanceRate}%`]
      ].map(row => row.join(',')).join('\n');
    }

    const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Attendance Reports</h2>
          <p className="text-slate-400">Generate comprehensive attendance analytics and reports</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => generateReport('pdf')}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-300"
          >
            <FileText className="w-5 h-5" />
            <span>PDF</span>
          </button>
          <button 
            onClick={() => generateReport('excel')}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            <span>Excel</span>
          </button>
          <button 
            onClick={() => generateReport('csv')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            <BarChart3 className="w-5 h-5" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Report Configuration */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Report Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-white font-medium mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="daily">Daily Report</option>
              <option value="weekly">Weekly Report</option>
              <option value="monthly">Monthly Report</option>
            </select>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Report Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Students</p>
              <p className="text-2xl font-bold text-white">{currentData.totalStudents.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">
                {'present' in currentData ? 'Present' : 'Avg Present'}
              </p>
              <p className="text-2xl font-bold text-white">
                {'present' in currentData ? currentData.present.toLocaleString() : currentData.avgPresent.toLocaleString()}
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
              <p className="text-slate-400 text-sm">
                {'late' in currentData ? 'Late' : 'Avg Late'}
              </p>
              <p className="text-2xl font-bold text-white">
                {'late' in currentData ? currentData.late.toLocaleString() : currentData.avgLate.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg">
              <PieChart className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Attendance Rate</p>
              <p className="text-2xl font-bold text-white">{currentData.attendanceRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Method Distribution (for daily reports) */}
        {'byMethod' in currentData && (
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Recognition Method Distribution</h3>
            <div className="space-y-4">
              {Object.entries(currentData.byMethod).map(([method, count]) => {
                const percentage = (count / (currentData.present || 1)) * 100;
                return (
                  <div key={method} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium capitalize">{method} Recognition</span>
                      <span className="text-slate-400">{count} ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="bg-slate-700/30 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          method === 'face' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                          method === 'fingerprint' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                          'bg-gradient-to-r from-purple-500 to-purple-600'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Trends Chart */}
        {'trends' in currentData && (
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Weekly Attendance Trends</h3>
            <div className="space-y-4">
              {currentData.trends.map((trend, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{trend.day}</span>
                    <span className="text-slate-400">{trend.rate}%</span>
                  </div>
                  <div className="bg-slate-700/30 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${trend.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Monthly Trends */}
        {'monthlyTrends' in currentData && (
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-6">Monthly Attendance Trends</h3>
            <div className="grid grid-cols-5 gap-4">
              {currentData.monthlyTrends.map((trend, index) => (
                <div key={index} className="text-center">
                  <div className="bg-slate-700/30 rounded-lg p-4 mb-2">
                    <div className="text-2xl font-bold text-white mb-1">{trend.rate}%</div>
                    <div className="text-sm text-slate-400">{trend.month}</div>
                  </div>
                  <div className="bg-slate-700/30 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${trend.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Report Preview */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Report Preview</h3>
        <div className="bg-slate-900/50 rounded-lg p-6 font-mono text-sm">
          <div className="text-green-400 mb-4">
            ==========================================<br/>
            SMART ATTENDANCE SYSTEM - {reportType.toUpperCase()} REPORT<br/>
            ==========================================
          </div>
          <div className="text-white space-y-1">
            <div>Generated: {new Date().toLocaleString()}</div>
            <div>Period: {dateRange.start} to {dateRange.end}</div>
            <div>Report Type: {reportType.charAt(0).toUpperCase() + reportType.slice(1)}</div>
            <br/>
            <div className="text-blue-400">SUMMARY STATISTICS:</div>
            <div>Total Students: {currentData.totalStudents.toLocaleString()}</div>
            <div>Present: {'present' in currentData ? currentData.present.toLocaleString() : currentData.avgPresent.toLocaleString()}</div>
            <div>Absent: {'absent' in currentData ? currentData.absent.toLocaleString() : currentData.avgAbsent.toLocaleString()}</div>
            <div>Late: {'late' in currentData ? currentData.late.toLocaleString() : currentData.avgLate.toLocaleString()}</div>
            <div>Attendance Rate: {currentData.attendanceRate}%</div>
            
            {'byMethod' in currentData && (
              <>
                <br/>
                <div className="text-blue-400">RECOGNITION METHODS:</div>
                <div>Face Recognition: {currentData.byMethod.face}</div>
                <div>Fingerprint Scan: {currentData.byMethod.fingerprint}</div>
                <div>Motion Detection: {currentData.byMethod.motion}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};