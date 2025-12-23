import React from 'react';
import { SCENARIOS } from '../constants';
import { ArrowRight, BrainCircuit, Activity, HeartPulse } from 'lucide-react';

const Applications: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 's1': return <BrainCircuit size={32} />;
      case 's2': return <Activity size={32} />;
      case 's3': return <HeartPulse size={32} />;
      default: return <BrainCircuit size={32} />;
    }
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">智能应用</h1>
        <p className="text-slate-400">将您的领域知识部署到实际业务场景中。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SCENARIOS.map((scenario) => (
          <div key={scenario.id} className="glass-panel rounded-2xl overflow-hidden hover:translate-y-[-5px] transition-all duration-300 group cursor-pointer">
            <div className={`h-2 bg-gradient-to-r ${scenario.color}`}></div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-800 rounded-xl text-slate-200 group-hover:text-white transition-colors">
                  {getIcon(scenario.id)}
                </div>
                <div className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-slate-400 border border-slate-700">
                  v2.0
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">{scenario.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 h-12">
                {scenario.description}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-700/50">
                <span className="text-sm font-semibold text-blue-400">{scenario.stats}</span>
                <button className="flex items-center text-slate-300 hover:text-white text-sm font-medium transition-colors">
                  启动 <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Placeholder */}
        <div className="border-2 border-dashed border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-500 hover:border-slate-500 hover:text-slate-300 transition-colors cursor-pointer min-h-[300px]">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4">
             <span className="text-2xl">+</span>
          </div>
          <span className="font-medium">创建新场景</span>
        </div>
      </div>
    </div>
  );
};

export default Applications;