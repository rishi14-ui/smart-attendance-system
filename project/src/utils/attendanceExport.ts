export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  class: string;
  date: string;
  time: string;
  method: 'face' | 'fingerprint' | 'motion';
  confidence: number;
  status: 'present' | 'late' | 'absent';
}

export const exportToCSV = (records: AttendanceRecord[], filename?: string) => {
  const headers = ['Student ID', 'Student Name', 'Class', 'Date', 'Time', 'Method', 'Confidence (%)', 'Status'];
  
  const csvContent = [
    headers.join(','),
    ...records.map(record => [
      record.studentId,
      `"${record.studentName}"`, // Wrap in quotes to handle names with commas
      record.class,
      record.date,
      record.time,
      record.method,
      record.confidence.toString(),
      record.status
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename || `attendance_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

export const exportToExcel = (records: AttendanceRecord[], filename?: string) => {
  // For Excel format, we'll create a more structured CSV that Excel can read better
  const headers = ['Student ID', 'Student Name', 'Class', 'Date', 'Time', 'Recognition Method', 'Confidence Percentage', 'Attendance Status'];
  
  const excelContent = [
    headers.join(','),
    ...records.map(record => [
      record.studentId,
      `"${record.studentName}"`,
      record.class,
      record.date,
      record.time,
      record.method.charAt(0).toUpperCase() + record.method.slice(1),
      `${record.confidence}%`,
      record.status.toUpperCase()
    ].join(','))
  ].join('\n');

  const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename || `attendance_${new Date().toISOString().split('T')[0]}.xlsx`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

export const saveAttendanceRecord = (record: AttendanceRecord) => {
  // Get existing records from localStorage
  const existingRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
  
  // Add new record
  const updatedRecords = [...existingRecords, record];
  
  // Save back to localStorage
  localStorage.setItem('attendanceRecords', JSON.stringify(updatedRecords));
  
  return updatedRecords;
};

export const getTodaysAttendanceRecords = (): AttendanceRecord[] => {
  const allRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
  const today = new Date().toISOString().split('T')[0];
  
  return allRecords.filter((record: AttendanceRecord) => record.date === today);
};

export const getAllAttendanceRecords = (): AttendanceRecord[] => {
  return JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
};