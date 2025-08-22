import React, { useState } from 'react';
import { 
  Camera, 
  Fingerprint, 
  Activity, 
  Shield, 
  Bell, 
  Database,
  Wifi,
  Settings as SettingsIcon,
  Save
} from 'lucide-react';

export const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    faceRecognition: {
      enabled: true,
      confidence: 95,
      captureQuality: 'high',
      autoEnroll: false
    },
    fingerprint: {
      enabled: true,
      scanAttempts: 3,
      quality: 'medium',
      timeout: 10
    },
    motionDetection: {
      enabled: true,
      sensitivity: 75,
      bodyTracking: true,
      gestureRecognition: false
    },
    security: {
      encryption: true,
      dataRetention: 90,
      accessLogs: true,
      twoFactor: false
    },
    notifications: {
      realTime: true,
      email: true,
      sms: false,
      dailyReports: true
    },
    system: {
      autoBackup: true,
      updateChecks: true,
      performanceMode: 'balanced',
      logLevel: 'info'
    }
  });

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean, onChange: (value: boolean) => void }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        enabled ? 'bg-blue-600' : 'bg-slate-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">System Settings</h2>
          <p className="text-slate-400">Configure biometric sensors and system preferences</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300">
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Face Recognition Settings */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-600/20 rounded-lg">
              <Camera className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Face Recognition</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Enable Face Recognition</p>
                <p className="text-sm text-slate-400">Use AI-powered facial recognition</p>
              </div>
              <ToggleSwitch 
                enabled={settings.faceRecognition.enabled} 
                onChange={(value) => handleSettingChange('faceRecognition', 'enabled', value)}
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Confidence Threshold</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="80"
                  max="99"
                  value={settings.faceRecognition.confidence}
                  onChange={(e) => handleSettingChange('faceRecognition', 'confidence', parseInt(e.target.value))}
                  className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-white font-medium w-12">{settings.faceRecognition.confidence}%</span>
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Capture Quality</label>
              <select
                value={settings.faceRecognition.captureQuality}
                onChange={(e) => handleSettingChange('faceRecognition', 'captureQuality', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="high">High (1080p)</option>
                <option value="medium">Medium (720p)</option>
                <option value="low">Low (480p)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fingerprint Settings */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-600/20 rounded-lg">
              <Fingerprint className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Fingerprint Scanner</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Enable Fingerprint Scanning</p>
                <p className="text-sm text-slate-400">Biometric fingerprint authentication</p>
              </div>
              <ToggleSwitch 
                enabled={settings.fingerprint.enabled} 
                onChange={(value) => handleSettingChange('fingerprint', 'enabled', value)}
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Max Scan Attempts</label>
              <select
                value={settings.fingerprint.scanAttempts}
                onChange={(e) => handleSettingChange('fingerprint', 'scanAttempts', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:ring-2 focus:ring-green-500"
              >
                <option value={1}>1 attempt</option>
                <option value={3}>3 attempts</option>
                <option value={5}>5 attempts</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Scan Timeout</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={settings.fingerprint.timeout}
                  onChange={(e) => handleSettingChange('fingerprint', 'timeout', parseInt(e.target.value))}
                  className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-white font-medium w-12">{settings.fingerprint.timeout}s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Motion Detection Settings */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-600/20 rounded-lg">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Motion Detection</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Enable Motion Detection</p>
                <p className="text-sm text-slate-400">Full-body motion recognition</p>
              </div>
              <ToggleSwitch 
                enabled={settings.motionDetection.enabled} 
                onChange={(value) => handleSettingChange('motionDetection', 'enabled', value)}
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Sensitivity Level</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="25"
                  max="100"
                  value={settings.motionDetection.sensitivity}
                  onChange={(e) => handleSettingChange('motionDetection', 'sensitivity', parseInt(e.target.value))}
                  className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-white font-medium w-12">{settings.motionDetection.sensitivity}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Body Tracking</p>
                <p className="text-sm text-slate-400">Track full body movement patterns</p>
              </div>
              <ToggleSwitch 
                enabled={settings.motionDetection.bodyTracking} 
                onChange={(value) => handleSettingChange('motionDetection', 'bodyTracking', value)}
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-red-600/20 rounded-lg">
              <Shield className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Security</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Data Encryption</p>
                <p className="text-sm text-slate-400">Encrypt biometric data at rest</p>
              </div>
              <ToggleSwitch 
                enabled={settings.security.encryption} 
                onChange={(value) => handleSettingChange('security', 'encryption', value)}
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Data Retention (days)</label>
              <input
                type="number"
                min="30"
                max="365"
                value={settings.security.dataRetention}
                onChange={(e) => handleSettingChange('security', 'dataRetention', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Access Logs</p>
                <p className="text-sm text-slate-400">Log all system access attempts</p>
              </div>
              <ToggleSwitch 
                enabled={settings.security.accessLogs} 
                onChange={(value) => handleSettingChange('security', 'accessLogs', value)}
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-yellow-600/20 rounded-lg">
              <Bell className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Notifications</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Real-time Alerts</p>
                <p className="text-sm text-slate-400">Instant attendance notifications</p>
              </div>
              <ToggleSwitch 
                enabled={settings.notifications.realTime} 
                onChange={(value) => handleSettingChange('notifications', 'realTime', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Email Notifications</p>
                <p className="text-sm text-slate-400">Send alerts via email</p>
              </div>
              <ToggleSwitch 
                enabled={settings.notifications.email} 
                onChange={(value) => handleSettingChange('notifications', 'email', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Daily Reports</p>
                <p className="text-sm text-slate-400">Automated daily attendance reports</p>
              </div>
              <ToggleSwitch 
                enabled={settings.notifications.dailyReports} 
                onChange={(value) => handleSettingChange('notifications', 'dailyReports', value)}
              />
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-indigo-600/20 rounded-lg">
              <SettingsIcon className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white">System</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Auto Backup</p>
                <p className="text-sm text-slate-400">Automatic data backup</p>
              </div>
              <ToggleSwitch 
                enabled={settings.system.autoBackup} 
                onChange={(value) => handleSettingChange('system', 'autoBackup', value)}
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Performance Mode</label>
              <select
                value={settings.system.performanceMode}
                onChange={(e) => handleSettingChange('system', 'performanceMode', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="power">Power (High CPU usage)</option>
                <option value="balanced">Balanced (Recommended)</option>
                <option value="efficiency">Efficiency (Low CPU usage)</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Update Checks</p>
                <p className="text-sm text-slate-400">Check for system updates</p>
              </div>
              <ToggleSwitch 
                enabled={settings.system.updateChecks} 
                onChange={(value) => handleSettingChange('system', 'updateChecks', value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};