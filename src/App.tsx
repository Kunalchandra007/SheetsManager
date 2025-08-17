import React, { useState, useEffect } from 'react';
import { FileSpreadsheet, Settings as SettingsIcon, MessageCircle, Zap, Brain, Database, TrendingUp, Sparkles } from 'lucide-react';
import FileUpload from './components/FileUpload';
import ChatInterface from './components/ChatInterface';
import Settings from './components/Settings';

function App() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [n8nUrl, setN8nUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'chat' | 'settings'>('upload');

  // Load settings from localStorage
  useEffect(() => {
    const savedUrl = localStorage.getItem('n8n_url');
    if (savedUrl) {
      setN8nUrl(savedUrl);
    }
  }, []);

  // Save settings to localStorage
  const handleN8nUrlChange = (url: string) => {
    setN8nUrl(url);
    localStorage.setItem('n8n_url', url);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFiles(prev => [...prev, file]);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getTabButtonClass = (tab: string) => {
    const baseClass = "flex items-center space-x-3 px-8 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden";
    return activeTab === tab
      ? `${baseClass} bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white shadow-2xl border border-cyan-400/30 backdrop-blur-xl`
      : `${baseClass} text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/10`;
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-cyan-900/20 to-pink-900/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-7xl relative z-10">
        {/* Futuristic Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center transform rotate-12 animate-pulse">
                <FileSpreadsheet className="w-8 h-8 text-white transform -rotate-12" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-3 h-3 text-black" />
              </div>
            </div>
            <div>
              <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                SheetsManager
              </h1>
              <div className="text-cyan-300 text-lg font-light tracking-widest uppercase">
                AI-Powered Data Intelligence
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Experience the future of data management with quantum-powered AI analysis. 
            Transform your spreadsheets into intelligent insights with neural processing capabilities.
          </p>
        </div>

        {/* Futuristic Navigation */}
        <div className="relative mb-12">
          <div className="bg-black/40 backdrop-blur-2xl border border-cyan-500/30 rounded-3xl p-3 shadow-2xl">
            <div className="flex space-x-3">
              <button
                onClick={() => setActiveTab('upload')}
                className={getTabButtonClass('upload')}
              >
                <div className="relative">
                  <FileSpreadsheet className="w-6 h-6" />
                  {activeTab === 'upload' && (
                    <div className="absolute -inset-1 bg-cyan-400/30 rounded-full blur animate-pulse"></div>
                  )}
                </div>
                <span className="text-lg">Neural Upload</span>
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={getTabButtonClass('chat')}
              >
                <div className="relative">
                  <Brain className="w-6 h-6" />
                  {activeTab === 'chat' && (
                    <div className="absolute -inset-1 bg-purple-400/30 rounded-full blur animate-pulse"></div>
                  )}
                </div>
                <span className="text-lg">AI Interface</span>
                {uploadedFiles.length > 0 && (
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm px-3 py-1 rounded-full font-bold shadow-lg animate-pulse">
                    {uploadedFiles.length}
                  </div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={getTabButtonClass('settings')}
              >
                <div className="relative">
                  <SettingsIcon className="w-6 h-6" />
                  {activeTab === 'settings' && (
                    <div className="absolute -inset-1 bg-pink-400/30 rounded-full blur animate-pulse"></div>
                  )}
                </div>
                <span className="text-lg">Quantum Config</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'upload' && (
            <FileUpload
              onFileUpload={handleFileUpload}
              uploadedFiles={uploadedFiles}
              onRemoveFile={handleRemoveFile}
            />
          )}

          {activeTab === 'chat' && (
            <div className="space-y-8">
              <ChatInterface uploadedFiles={uploadedFiles} n8nUrl={n8nUrl} />
              
              {/* Futuristic Quick Actions */}
              <div className="bg-gray-900/50 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Zap className="w-7 h-7 text-yellow-400 mr-3 animate-pulse" />
                    Quantum Operations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <button className="group relative p-6 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-400/30 text-white rounded-2xl hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative z-10 text-center">
                        <TrendingUp className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                        <div className="text-xl font-bold mb-2">Neural Analysis</div>
                        <div className="text-sm text-emerald-200">Deep learning insights from your data</div>
                      </div>
                    </button>
                    <button className="group relative p-6 bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-400/30 text-white rounded-2xl hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative z-10 text-center">
                        <Database className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                        <div className="text-xl font-bold mb-2">Quantum Report</div>
                        <div className="text-sm text-orange-200">Generate intelligent summaries</div>
                      </div>
                    </button>
                    <button className="group relative p-6 bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-400/30 text-white rounded-2xl hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative z-10 text-center">
                        <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                        <div className="text-xl font-bold mb-2">Data Synthesis</div>
                        <div className="text-sm text-purple-200">AI-powered data optimization</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <Settings n8nUrl={n8nUrl} onN8nUrlChange={handleN8nUrlChange} />
          )}
        </div>

        {/* Futuristic Status Bar */}
        <div className="mt-12 bg-black/60 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Neural Networks: <strong className="text-white">{uploadedFiles.length} Active</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full animate-pulse ${n8nUrl ? 'bg-emerald-400' : 'bg-orange-400'}`}></div>
                <span className="text-gray-300">Quantum Link: <strong className={n8nUrl ? 'text-emerald-400' : 'text-orange-400'}>
                  {n8nUrl ? 'Connected' : 'Awaiting Configuration'}
                </strong></span>
              </div>
            </div>
            <div className="text-xs text-gray-500 font-mono">
              SheetsManager Quantum v2.0.0 | Neural Engine Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;