import React, { useState, useEffect } from 'react';
import { FileSpreadsheet, Settings as SettingsIcon, MessageCircle } from 'lucide-react';
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
    const baseClass = "flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200";
    return activeTab === tab
      ? `${baseClass} bg-white text-blue-600 shadow-md`
      : `${baseClass} text-blue-100 hover:text-white hover:bg-blue-400/50`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FileSpreadsheet className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SheetsManager
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Upload, analyze, and manage your spreadsheets with AI-powered assistance. 
            Get insights, generate reports, and streamline your data workflows.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-2 mb-8 shadow-lg">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('upload')}
              className={getTabButtonClass('upload')}
            >
              <FileSpreadsheet className="w-5 h-5" />
              <span>Upload Sheets</span>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={getTabButtonClass('chat')}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat & Manage</span>
              {uploadedFiles.length > 0 && (
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  {uploadedFiles.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={getTabButtonClass('settings')}
            >
              <SettingsIcon className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'upload' && (
            <FileUpload
              onFileUpload={handleFileUpload}
              uploadedFiles={uploadedFiles}
              onRemoveFile={handleRemoveFile}
            />
          )}

          {activeTab === 'chat' && (
            <div className="space-y-6">
              <ChatInterface uploadedFiles={uploadedFiles} n8nUrl={n8nUrl} />
              
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-md transition-all">
                    <div className="text-center">
                      <div className="text-lg font-semibold">Analyze Data</div>
                      <div className="text-sm opacity-90">Get insights from your sheets</div>
                    </div>
                  </button>
                  <button className="p-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:shadow-md transition-all">
                    <div className="text-center">
                      <div className="text-lg font-semibold">Generate Report</div>
                      <div className="text-sm opacity-90">Create summary reports</div>
                    </div>
                  </button>
                  <button className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-md transition-all">
                    <div className="text-center">
                      <div className="text-lg font-semibold">Data Cleanup</div>
                      <div className="text-sm opacity-90">Clean and organize data</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <Settings n8nUrl={n8nUrl} onN8nUrlChange={handleN8nUrlChange} />
          )}
        </div>

        {/* Status Bar */}
        <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>Files uploaded: <strong>{uploadedFiles.length}</strong></span>
              <span>Status: <strong className={n8nUrl ? 'text-green-600' : 'text-orange-600'}>
                {n8nUrl ? 'Connected' : 'No AI Agent URL configured'}
              </strong></span>
            </div>
            <div className="text-xs text-gray-500">
              SheetsManager v1.0.0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;