import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Eye, EyeOff } from 'lucide-react';

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
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
          <SettingsIcon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            n8n AI Agent URL
          </label>
          <div className="relative">
            <input
              type={showUrl ? 'text' : 'password'}
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder="https://your-n8n-instance.com/webhook/your-endpoint"
              className="w-full px-4 py-2 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-2">
              <button
                type="button"
                onClick={() => setShowUrl(!showUrl)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showUrl ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={handleSave}
                disabled={!tempUrl.trim()}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  saved
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                {saved ? (
                  <span className="flex items-center space-x-1">
                    <span>Saved!</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-1">
                    <Save className="w-3 h-3" />
                    <span>Save</span>
                  </span>
                )}
              </button>
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Configure your n8n AI agent webhook URL to enable intelligent sheet processing
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">How to set up your n8n AI Agent:</h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Create a new workflow in n8n with a webhook trigger</li>
            <li>Add your AI processing nodes (OpenAI, Google AI, etc.)</li>
            <li>Configure the webhook to accept POST requests with file uploads</li>
            <li>Copy the webhook URL and paste it above</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Settings;