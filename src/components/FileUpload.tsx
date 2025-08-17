import React, { useState, useRef } from 'react';
import { Upload, X, FileText, FileSpreadsheet, Zap, Database } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  uploadedFiles: File[];
  onRemoveFile: (index: number) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, uploadedFiles, onRemoveFile }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      if (isValidFileType(file)) {
        onFileUpload(file);
      }
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      if (isValidFileType(file)) {
        onFileUpload(file);
      }
    });
  };

  const isValidFileType = (file: File) => {
    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    return validTypes.includes(file.type) || file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.csv')) {
      return <FileText className="w-6 h-6 text-emerald-400" />;
    }
    return <FileSpreadsheet className="w-6 h-6 text-cyan-400" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="bg-gray-900/50 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-8">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse">
                <Database className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Zap className="w-3 h-3 text-black" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Neural Data Upload</h2>
              <p className="text-cyan-300">Initialize quantum data matrices for processing</p>
            </div>
          </div>
          
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer relative overflow-hidden group ${
              isDragging
                ? 'border-cyan-400 bg-cyan-500/10 scale-105'
                : 'border-gray-600/50 hover:border-cyan-400/60 hover:bg-gray-800/30'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {/* Animated background on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="relative mb-6">
                <Upload className={`w-16 h-16 mx-auto mb-4 transition-all duration-300 ${
                  isDragging ? 'text-cyan-400 animate-bounce' : 'text-gray-400 group-hover:text-cyan-300'
                }`} />
                {isDragging && (
                  <div className="absolute -inset-2 bg-cyan-400/30 rounded-full blur-xl animate-pulse"></div>
                )}
              </div>
              
              <p className="text-xl text-gray-300 mb-3 font-semibold">
                Initialize Neural Data Transfer
              </p>
              <p className="text-sm text-gray-400 mb-6">
                Drag & drop your data matrices or activate manual selection
              </p>
              <div className="inline-flex items-center space-x-2 text-xs text-cyan-400 bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/30">
                <Zap className="w-4 h-4" />
                <span>Supports CSV, XLS, XLSX quantum formats</span>
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".csv,.xls,.xlsx"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="bg-gray-900/50 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <Database className="w-6 h-6 text-emerald-400 mr-3" />
                Active Data Matrices
              </h3>
              <div className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-400/30">
                {uploadedFiles.length} Matrix{uploadedFiles.length > 1 ? 'es' : ''} Loaded
              </div>
            </div>
            
            <div className="grid gap-4">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between bg-gray-800/40 backdrop-blur-sm rounded-2xl p-4 hover:bg-gray-700/40 transition-all duration-300 border border-gray-600/30 hover:border-cyan-400/30 hover:scale-105"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      {getFileIcon(file.name)}
                      <div className="absolute -inset-1 bg-cyan-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div>
                      <p className="text-white font-medium text-lg">{file.name}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Database className="w-4 h-4 mr-1" />
                          {formatFileSize(file.size)}
                        </span>
                        <span className="flex items-center">
                          <Zap className="w-4 h-4 mr-1" />
                          {file.type || 'Data Matrix'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFile(index);
                    }}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-300 group-hover:scale-110"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl border border-cyan-500/20">
              <p className="text-cyan-300 text-sm font-medium flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Neural networks ready for processing. Switch to AI Interface to begin analysis.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;