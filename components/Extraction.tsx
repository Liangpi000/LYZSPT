import React, { useState } from 'react';
import { Upload, Settings, Play, CheckCircle, FileText, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { EXTRACTION_MODELS } from '../constants';

const Extraction: React.FC = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startExtraction = () => {
    setProcessing(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setProcessing(false);
        setStep(4);
      }
    }, 50);
  };

  const stepLabels = {
    1: '上传',
    2: '配置',
    3: '处理',
    4: '结果'
  };

  const renderStepIndicator = () => (
    <div className="flex justify-between items-center mb-12 px-12 relative">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10"></div>
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className={`flex flex-col items-center relative z-0`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${
            step >= s ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-800 text-slate-500 border border-slate-700'
          }`}>
            {step > s ? <CheckCircle size={20} /> : s}
          </div>
          <span className={`text-xs mt-2 font-medium ${step >= s ? 'text-blue-400' : 'text-slate-600'}`}>
            {stepLabels[s as keyof typeof stepLabels]}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">知识萃取流程</h1>
        
        {renderStepIndicator()}

        <div className="glass-panel p-8 rounded-2xl min-h-[400px] flex flex-col">
          
          {/* STEP 1: UPLOAD */}
          {step === 1 && (
            <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4">
              <div className="w-full max-w-lg border-2 border-dashed border-slate-600 rounded-xl p-12 flex flex-col items-center justify-center bg-slate-900/50 hover:border-blue-500 hover:bg-slate-800/50 transition-all group">
                <input 
                  type="file" 
                  id="fileUpload" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
                <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center w-full h-full">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4 group-hover:text-blue-400 group-hover:scale-110 transition-transform">
                    {file ? (
                      file.name.endsWith('.csv') ? <FileSpreadsheet size={32} /> : <FileText size={32} />
                    ) : (
                      <Upload size={32} />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {file ? file.name : "拖拽或点击上传"}
                  </h3>
                  <p className="text-slate-400 text-center text-sm">
                    支持 .xlsx, .csv (结构化) 或 .pdf, .docx (非结构化)
                  </p>
                </label>
              </div>
              
              <button 
                disabled={!file}
                onClick={() => setStep(2)}
                className={`mt-8 px-8 py-3 rounded-lg font-medium transition-all ${
                  file 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                下一步：选择模型
              </button>
            </div>
          )}

          {/* STEP 2: MODEL SELECTION */}
          {step === 2 && (
            <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl text-white font-semibold mb-6">选择萃取模型</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {EXTRACTION_MODELS.map(model => (
                  <button 
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`p-6 rounded-xl border-2 text-left transition-all relative overflow-hidden ${
                      selectedModel === model.id 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-slate-700 bg-slate-800/40 hover:border-slate-500'
                    }`}
                  >
                    <div className={`p-3 rounded-lg w-fit mb-4 ${selectedModel === model.id ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
                      {model.icon === 'settings' ? <Settings size={24} /> : <AlertCircle size={24} />}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{model.name}</h3>
                    <p className="text-sm text-slate-400">{model.description}</p>
                    {selectedModel === model.id && (
                      <div className="absolute top-4 right-4 text-blue-500">
                        <CheckCircle size={24} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-auto">
                 <button onClick={() => setStep(1)} className="text-slate-400 hover:text-white px-4">返回</button>
                 <button 
                  disabled={!selectedModel}
                  onClick={() => setStep(3)}
                  className={`px-8 py-3 rounded-lg font-medium transition-all ${
                    selectedModel 
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  配置参数
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PROCESSING */}
          {step === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4">
              {!processing ? (
                <div className="text-center">
                  <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-500">
                    <Settings size={40} className="animate-spin-slow" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">准备萃取</h2>
                  <p className="text-slate-400 mb-8 max-w-md mx-auto">
                    基于您的选择，我们将应用 {EXTRACTION_MODELS.find(m => m.id === selectedModel)?.name} 提取实体和关系。
                  </p>
                  <button 
                    onClick={startExtraction}
                    className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-bold text-white shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all flex items-center mx-auto"
                  >
                    <Play size={20} className="mr-2 fill-current" /> 启动萃取引擎
                  </button>
                </div>
              ) : (
                <div className="w-full max-w-lg text-center">
                  <h3 className="text-xl text-white font-semibold mb-8 animate-pulse">正在萃取知识图谱...</h3>
                  <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden mb-4 relative">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-100 relative"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-[shimmer_1s_infinite]"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 font-mono">
                    <span>解析文档...</span>
                    <span>识别实体...</span>
                    <span>链接预测...</span>
                  </div>
                  <div className="mt-8 grid grid-cols-3 gap-4">
                     <div className="glass-panel p-3 rounded text-center">
                        <div className="text-2xl font-bold text-white">{Math.floor(progress * 1.2)}</div>
                        <div className="text-xs text-slate-400">节点</div>
                     </div>
                     <div className="glass-panel p-3 rounded text-center">
                        <div className="text-2xl font-bold text-white">{Math.floor(progress * 2.5)}</div>
                        <div className="text-xs text-slate-400">关系</div>
                     </div>
                     <div className="glass-panel p-3 rounded text-center">
                        <div className="text-2xl font-bold text-white">{(progress / 100).toFixed(2)}s</div>
                        <div className="text-xs text-slate-400">耗时</div>
                     </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 4 && (
            <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
               <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-400">
                 <CheckCircle size={48} />
               </div>
               <h2 className="text-3xl font-bold text-white mb-2">萃取完成</h2>
               <p className="text-slate-400 mb-8">成功生成知识图谱版本 v1.0.4</p>
               
               <div className="flex gap-4">
                 <button className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
                   下载报告
                 </button>
                 <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 shadow-lg shadow-blue-500/25 transition-colors">
                   在图谱空间查看
                 </button>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Extraction;