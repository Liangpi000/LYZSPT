import React from 'react';
import { LayoutDashboard, Network, Database, Layers, Settings, HelpCircle, Bell, Box } from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, onViewChange, children }) => {
  const NavItem = ({ view, icon, label }: { view: ViewState; icon: React.ReactNode; label: string }) => (
    <button
      onClick={() => onViewChange(view)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        currentView === view
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
      }`}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
      {currentView === view && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]"></div>}
    </button>
  );

  const viewLabels: Record<ViewState, string> = {
    dashboard: '仪表盘',
    extraction: '知识萃取',
    graph: '图谱空间',
    applications: '智能应用'
  };

  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-slate-800 bg-[#0f172a] flex flex-col z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-8 h-8 mr-3 object-contain"
          />
          <span className="text-lg font-bold tracking-tight text-white">领域知识平台</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-4 mt-4">平台</div>
          <NavItem view="dashboard" icon={<LayoutDashboard size={20} />} label="仪表盘" />
          <NavItem view="extraction" icon={<Database size={20} />} label="知识萃取" />
          <NavItem view="graph" icon={<Network size={20} />} label="图谱空间" />
          <NavItem view="applications" icon={<Layers size={20} />} label="应用场景" />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-white w-full transition-colors">
            <Settings size={20} />
            <span className="text-sm">设置</span>
          </button>
          <div className="mt-4 glass-panel p-4 rounded-xl">
             <div className="text-xs text-slate-400 mb-2">内存使用</div>
             <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-green-400 h-full w-[45%]"></div>
             </div>
             <div className="flex justify-between mt-1 text-[10px] text-slate-500">
                <span>4.2GB / 16GB</span>
                <span>健康</span>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-between px-8 z-10 sticky top-0">
          <div className="flex items-center text-slate-400 text-sm">
            <span>工作区</span>
            <span className="mx-2">/</span>
            <span className="text-white capitalize">{viewLabels[currentView]}</span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="text-slate-400 hover:text-white transition-colors">
              <HelpCircle size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 border border-slate-500 flex items-center justify-center text-xs font-bold text-white">
              JD
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;