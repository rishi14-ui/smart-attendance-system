import React, { useState, useEffect, useRef } from 'react';
import { Camera, User, Database, CheckCircle, AlertCircle, Scan, Upload } from 'lucide-react';

interface FaceEncoding {
  id: string;
  studentId: string;
  encoding: number[];
  confidence: number;
  timestamp: string;
}

interface DetectionResult {
  detected: boolean;
  confidence: number;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  encoding?: number[];
}

export const FaceDetection: React.FC = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [encodingProgress, setEncodingProgress] = useState(0);
  const [databaseSize, setDatabaseSize] = useState(1247);
  const [processingStage, setProcessingStage] = useState<string>('');
  const videoRef = useRef<HTMLDivElement>(null);

  const detectionStages = [
    'Initializing camera feed...',
    'Detecting faces in frame...',
    'Extracting facial features...',
    'Generating face encoding...',
    'Comparing with database...',
    'Matching complete!'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDetecting) {
      let currentStage = 0;
      interval = setInterval(() => {
        setEncodingProgress((prev) => {
          const newProgress = prev + 16.67; // 6 stages, ~16.67% each
          
          if (currentStage < detectionStages.length) {
            setProcessingStage(detectionStages[currentStage]);
            currentStage++;
          }

          if (newProgress >= 100) {
            setIsDetecting(false);
            setProcessingStage('');
            // Simulate successful detection
            setTimeout(() => {
              setDetectionResult({
                detected: true,
                confidence: 98.5,
                boundingBox: { x: 120, y: 80, width: 160, height: 200 },
                encoding: Array.from({ length: 128 }, () => Math.random() * 2 - 1)
              });
            }, 500);
            return 100;
          }
          return newProgress;
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isDetecting]);

  const startDetection = () => {
    setIsDetecting(true);
    setEncodingProgress(0);
    setDetectionResult(null);
    setProcessingStage(detectionStages[0]);
  };

  const resetDetection = () => {
    setDetectionResult(null);
    setEncodingProgress(0);
    setProcessingStage('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Face Detection & Encoding</h2>
        <p className="text-slate-400">Advanced facial recognition with machine learning-based encoding</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Detection Feed */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Live Detection Feed</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400">Camera Active</span>
            </div>
          </div>

          <div className="relative">
            <div 
              ref={videoRef}
              className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-600 relative overflow-hidden"
            >
              {/* Simulated camera feed background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
              
              {!isDetecting && !detectionResult && (
                <div className="text-center z-10">
                  <Camera className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-400">Click "Start Detection" to begin</p>
                </div>
              )}

              {isDetecting && (
                <div className="text-center z-10">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white font-medium">{processingStage}</p>
                  <div className="mt-4 w-64 bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${encodingProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-400 mt-2">{Math.round(encodingProgress)}% Complete</p>
                </div>
              )}

              {detectionResult && detectionResult.detected && (
                <div className="relative w-full h-full">
                  {/* Simulated face detection box */}
                  <div 
                    className="absolute border-2 border-green-400 bg-green-400/10"
                    style={{
                      left: `${detectionResult.boundingBox?.x}px`,
                      top: `${detectionResult.boundingBox?.y}px`,
                      width: `${detectionResult.boundingBox?.width}px`,
                      height: `${detectionResult.boundingBox?.height}px`,
                    }}
                  >
                    <div className="absolute -top-8 left-0 bg-green-400 text-black px-2 py-1 rounded text-xs font-medium">
                      Face Detected ({detectionResult.confidence}%)
                    </div>
                  </div>
                  
                  {/* Simulated person silhouette */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-40 bg-gradient-to-b from-slate-600 to-slate-700 rounded-full opacity-60"></div>
                  </div>
                </div>
              )}

              {/* Scanning overlay effect */}
              {isDetecting && (
                <div className="absolute inset-0 border-2 border-blue-500 rounded-lg animate-pulse"></div>
              )}
            </div>

            {/* Control buttons */}
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={startDetection}
                disabled={isDetecting}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Scan className="w-5 h-5" />
                <span>{isDetecting ? 'Detecting...' : 'Start Detection'}</span>
              </button>
              
              <button
                onClick={resetDetection}
                className="flex items-center space-x-2 px-6 py-3 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-600 transition-all duration-300"
              >
                <Camera className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detection Results & Encoding */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Detection Results & Encoding</h3>

          {detectionResult ? (
            <div className="space-y-6">
              {/* Detection Status */}
              <div className="flex items-center space-x-3 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-green-400 font-medium">Face Successfully Detected</p>
                  <p className="text-sm text-slate-300">Confidence: {detectionResult.confidence}%</p>
                </div>
              </div>

              {/* Face Encoding Information */}
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <h4 className="text-white font-medium mb-3">Face Encoding Generated</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Encoding Length</p>
                    <p className="text-white font-medium">128 dimensions</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Algorithm</p>
                    <p className="text-white font-medium">Deep CNN</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Processing Time</p>
                    <p className="text-white font-medium">4.8 seconds</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Quality Score</p>
                    <p className="text-white font-medium">Excellent</p>
                  </div>
                </div>

                {/* Encoding Visualization */}
                <div className="mt-4">
                  <p className="text-slate-400 text-sm mb-2">Encoding Vector (first 16 values):</p>
                  <div className="bg-slate-800/50 p-3 rounded font-mono text-xs text-slate-300 overflow-x-auto">
                    [{detectionResult.encoding?.slice(0, 16).map(val => val.toFixed(3)).join(', ')}...]
                  </div>
                </div>
              </div>

              {/* Database Matching */}
              <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <h4 className="text-blue-400 font-medium mb-3">Database Matching</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Compared against:</span>
                    <span className="text-white font-medium">{databaseSize.toLocaleString()} encodings</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Best match:</span>
                    <span className="text-white font-medium">Emma Thompson (ST001234)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Match confidence:</span>
                    <span className="text-green-400 font-medium">98.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Threshold:</span>
                    <span className="text-slate-400">95.0%</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
                  Mark Attendance
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Save Encoding
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Database className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400">No detection results yet</p>
              <p className="text-sm text-slate-500 mt-2">Start face detection to see encoding details</p>
            </div>
          )}
        </div>
      </div>

      {/* Database Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg">
              <Database className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="text-white font-bold">Encoding Database</h4>
              <p className="text-slate-400 text-sm">Stored face encodings</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Total Encodings</span>
              <span className="text-white font-medium">{databaseSize.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Active Students</span>
              <span className="text-white font-medium">1,189</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Database Size</span>
              <span className="text-white font-medium">2.4 GB</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h4 className="text-white font-bold">Detection Accuracy</h4>
              <p className="text-slate-400 text-sm">System performance</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Success Rate</span>
              <span className="text-green-400 font-medium">98.7%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">False Positives</span>
              <span className="text-yellow-400 font-medium">0.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Avg. Processing</span>
              <span className="text-white font-medium">3.2s</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg">
              <Upload className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h4 className="text-white font-bold">Today's Activity</h4>
              <p className="text-slate-400 text-sm">Detection statistics</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Detections</span>
              <span className="text-white font-medium">1,089</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">New Encodings</span>
              <span className="text-blue-400 font-medium">23</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Matches Found</span>
              <span className="text-green-400 font-medium">1,066</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};