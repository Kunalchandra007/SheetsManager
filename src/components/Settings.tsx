import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Eye, EyeOff, Link, Zap, Shield, Brain } from 'lucide-react';

interface SettingsProps {
  n8nUrl: string;
  onN8nUrlChange: (url: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ n8nUrl, onN8nUrlChange }) => {
  const [tempUrl, setTempUrl] = useState(n8nUrl);
  const [showUrl, setShowUrl] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onN8nUrlChange(tempUrl);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Settings Panel */}
      <div className="bg-gray-900/50 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5 animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-8">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center animate-pulse">
                <SettingsIcon className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center animate-spin">
                <Zap className="w-3 h-3 text-black" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Quantum Configuration</h2>
              <p className="text-purple-300">Neural network connection parameters</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* n8n URL Configuration */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <label className="block text-lg font-semibold text-white mb-3 flex items-center">
                <Link className="w-5 h-5 mr-2 text-purple-400" />
                n8n AI Agent Neural Link
              </label>
              
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Brain className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showUrl ? 'text' : 'password'}
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  placeholder="https://your-n8n-quantum-processor.com/webhook/neural-endpoint"
                  className="w-full pl-12 pr-24 py-4 bg-gray-900/60 border border-purple-500/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300"
                />
                
                <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-3">
                  <button
                    type="button"
                    onClick={() => setShowUrl(!showUrl)}
                    className="p-2 text-gray-400 hover:text-white transition-colors rounded-xl hover:bg-gray-700/50"
                  >
                    {showUrl ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  
                  <button
                    onClick={handleSave}
                    disabled={!tempUrl.trim()}
                    className={`px-4 py-2 text-sm rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold flex items-center space-x-2 ${
                      saved
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                        : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-400 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg'
                    }`}
                  >
                    {saved ? (
                      <>
                        <Shield className="w-4 h-4" />
                        <span>Quantum Link Established!</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Activate Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {/* URL Validation */}
              {tempUrl && (
                <div className={`text-sm flex items-center space-x-2 mb-4 ${
                  isValidUrl(tempUrl) ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    isValidUrl(tempUrl) ? 'bg-emerald-400' : 'bg-red-400'
                  }`}></div>
                  <span>{isValidUrl(tempUrl) ? 'Valid quantum endpoint detected' : 'Invalid neural link format'}</span>
                </div>
              )}
              
              <p className="text-gray-400 text-sm">
                Configure your n8n AI agent webhook URL to enable quantum-level sheet processing and neural analysis
              </p>
            </div>

            {/* Connection Status */}
            <div className={`p-4 rounded-2xl border ${
              n8nUrl 
                ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300' 
                : 'bg-orange-500/10 border-orange-400/30 text-orange-300'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full animate-pulse ${
                  n8nUrl ? 'bg-emerald-400' : 'bg-orange-400'
                }`}></div>
                <span className="font-medium">
                  Neural Network Status: {n8nUrl ? 'QUANTUM_LINKED' : 'AWAITING_CONNECTION'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="bg-gray-900/50 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Brain className="w-6 h-6 text-cyan-400 mr-3" />
            Neural Network Setup Protocol
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-gray-800/40 rounded-2xl border border-gray-600/30">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Initialize n8n Quantum Workflow</h4>
                <p className="text-gray-400 text-sm">Create a new workflow in n8n with a webhook trigger node for neural processing</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-gray-800/40 rounded-2xl border border-gray-600/30">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Configure AI Processing Nodes</h4>
                <p className="text-gray-400 text-sm">Add your AI processing nodes (OpenAI GPT, Google AI, Claude, etc.) for intelligent analysis</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-gray-800/40 rounded-2xl border border-gray-600/30">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Enable Quantum Data Transfer</h4>
                <p className="text-gray-400 text-sm">Configure webhook to accept POST requests with multipart/form-data for file uploads</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-gray-800/40 rounded-2xl border border-gray-600/30">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Establish Neural Link</h4>
                <p className="text-gray-400 text-sm">Copy the webhook URL and configure it above to activate the quantum connection</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl border border-cyan-500/20">
            <p className="text-cyan-300 text-sm font-medium flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Pro Tip: Your n8n workflow will receive 'message', 'fileCount', and 'file_X' parameters for processing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;