import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Brain, Zap, AlertTriangle } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  error?: boolean;
}

interface ChatInterfaceProps {
  uploadedFiles: File[];
  n8nUrl?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ uploadedFiles, n8nUrl }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "🧠 Quantum Neural Network activated! I'm your advanced AI assistant powered by next-generation processing capabilities. Upload your data matrices and I'll decode patterns, extract intelligence, and provide quantum-level insights. Ready to revolutionize your data analysis?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'testing'>('disconnected');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Test connection when n8nUrl changes
  useEffect(() => {
    if (n8nUrl) {
      testConnection();
    } else {
      setConnectionStatus('disconnected');
    }
  }, [n8nUrl]);

  const testConnection = async () => {
    if (!n8nUrl) {
      setConnectionStatus('disconnected');
      return;
    }
    
    setConnectionStatus('testing');
    try {
      const testFormData = new FormData();
      testFormData.append('message', 'Connection test');
      testFormData.append('fileCount', '0');
      testFormData.append('test', 'true');
      
      const response = await fetch(n8nUrl, {
        method: 'POST',
        body: testFormData,
        mode: 'cors',
        headers: {
          'X-Requested-With': 'SheetsManager-Test',
        },
      });
      
      if (response.ok) {
        setConnectionStatus('connected');
        // Add a test success message
        const testMessage: Message = {
          id: `test_${Date.now()}`,
          content: "✅ Connection test successful! Neural link established.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, testMessage]);
      } else {
        setConnectionStatus('disconnected');
        console.error('Connection test failed with status:', response.status);
      }
    } catch (error: unknown) {
      setConnectionStatus('disconnected');
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Connection test failed:', errorMessage);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await sendToN8nAgent(currentInput, uploadedFiles);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setConnectionStatus('connected');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `⚠️ Neural connection error: ${errorMessage}\n\nTroubleshooting:\n• Verify your n8n webhook URL is correct\n• Check if your n8n workflow is active\n• Ensure CORS is properly configured\n• Test your webhook endpoint directly`,
        sender: 'bot',
        timestamp: new Date(),
        error: true
      };

      setMessages(prev => [...prev, errorResponse]);
      setConnectionStatus('disconnected');
    } finally {
      setIsLoading(false);
    }
  };

  const sendToN8nAgent = async (message: string, files: File[]): Promise<string> => {
    if (!n8nUrl) {
      throw new Error("Quantum link not established. Please configure your n8n AI agent URL in settings.");
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('message', message);
    formData.append('fileCount', files.length.toString());
    formData.append('timestamp', new Date().toISOString());
    formData.append('sessionId', `session_${Date.now()}`);
    
    files.forEach((file, index) => {
      formData.append(`file_${index}`, file);
      formData.append(`fileName_${index}`, file.name);
      formData.append(`fileSize_${index}`, file.size.toString());
      formData.append(`fileType_${index}`, file.type);
    });

    try {
      const response = await fetch(n8nUrl, {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: {
          'X-Requested-With': 'SheetsManager-AI',
          'Accept': 'application/json, text/plain, */*',
        },
      });

      if (!response.ok) {
        let errorDetail = '';
        try {
          const errorText = await response.text();
          errorDetail = errorText ? ` - ${errorText.substring(0, 200)}` : '';
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
        }
        
        throw new Error(`HTTP ${response.status} ${response.statusText}${errorDetail}`);
      }

      const contentType = response.headers.get('content-type');
      let data: string;
      
      if (contentType && contentType.includes('application/json')) {
        try {
          const jsonData = await response.json();
          data = jsonData.response || jsonData.message || jsonData.data || jsonData.result || JSON.stringify(jsonData, null, 2);
        } catch (jsonError) {
          console.error('Failed to parse JSON response:', jsonError);
          data = await response.text();
        }
      } else {
        data = await response.text();
      }

      if (!data || data.trim() === '') {
        return "✨ Neural processing completed successfully! Your request was processed but no specific response was returned.";
      }

      return data;
    } catch (error: unknown) {
      console.error('Error calling n8n agent:', error);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error("Network connection failed. Check if your n8n instance is running and accessible.");
      }
      
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('An unknown error occurred while contacting the neural network.');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'bg-emerald-400';
      case 'testing': return 'bg-yellow-400 animate-pulse';
      default: return 'bg-red-400';
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'QUANTUM_LINKED';
      case 'testing': return 'TESTING...';
      default: return 'OFFLINE';
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl shadow-2xl flex flex-col h-[600px] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
      
      {/* Header */}
      <div className="relative z-10 p-6 border-b border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-t-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center animate-bounce">
                <Zap className="w-3 h-3 text-black" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Neural Interface</h2>
              <p className="text-cyan-300 text-sm">
                {uploadedFiles.length > 0 
                  ? `Processing ${uploadedFiles.length} data matrix${uploadedFiles.length > 1 ? 'es' : ''}`
                  : 'Awaiting data upload for analysis'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={testConnection}
              className="text-xs font-mono text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-gray-700/50"
              disabled={connectionStatus === 'testing'}
            >
              {connectionStatus === 'testing' ? 'Testing...' : 'Test Connection'}
            </button>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getConnectionStatusColor()}`}></div>
              <span className="text-xs font-mono text-gray-400">
                {getConnectionStatusText()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-gray-800/50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-4 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender === 'bot' && (
              <div className="relative">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  message.error 
                    ? 'bg-gradient-to-br from-red-500 to-orange-600 animate-pulse' 
                    : 'bg-gradient-to-br from-cyan-400 to-purple-600 animate-pulse'
                }`}>
                  {message.error ? <AlertTriangle className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-white" />}
                </div>
                <div className={`absolute -inset-1 rounded-2xl blur animate-pulse ${
                  message.error ? 'bg-red-400/30' : 'bg-cyan-400/30'
                }`}></div>
              </div>
            )}
            
            <div
              className={`max-w-xs lg:max-w-md px-6 py-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-white border-cyan-400/30 ml-auto shadow-lg'
                  : message.error
                  ? 'bg-red-900/40 text-red-100 border-red-500/30 shadow-lg'
                  : 'bg-gray-800/60 text-gray-100 border-gray-600/30 shadow-lg'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
              <p className={`text-xs mt-2 font-mono ${
                message.sender === 'user' ? 'text-cyan-200' : 'text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </p>
            </div>

            {message.sender === 'user' && (
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start space-x-4 justify-start">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 animate-spin">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-cyan-400/30 rounded-2xl blur animate-pulse"></div>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl px-6 py-4 border border-gray-600/30">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                <span className="text-sm text-gray-300">Neural networks processing...</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="relative z-10 p-6 border-t border-cyan-500/30 bg-gray-900/80 backdrop-blur-sm rounded-b-3xl">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Transmit your neural query to the quantum processor..."
              className="w-full px-6 py-4 bg-gray-800/60 border border-cyan-500/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
              disabled={isLoading}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-2xl pointer-events-none"></div>
          </div>
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading || !n8nUrl}
            className="px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-2xl hover:from-cyan-400 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg disabled:hover:scale-100 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Send className="w-6 h-6 relative z-10" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;