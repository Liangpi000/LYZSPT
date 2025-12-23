import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Database, Network, Cpu, UploadCloud, Search, ArrowRight, Activity } from 'lucide-react';
import { PIE_DATA, ACTIVITY_DATA } from '../constants';
import { StatCardProps } from '../types';

const COLORS = ['#3B82F6', '#F97316', '#10B981', '#8B5CF6'];

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon, trendUp }) => (
  <div className="glass-panel p-6 rounded-xl relative overflow-hidden group hover:bg-slate-800/60 transition-all duration-300">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
      {icon}
    </div>
    <div className="flex items-center space-x-4 mb-2">
      <div className="p-2 bg-slate-800/80 rounded-lg text-blue-400">
        {icon}
      </div>
      <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
    </div>
    <div className="flex items-end justify-between">
      <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
      {trend && (
        <span className={`text-xs px-2 py-1 rounded-full ${trendUp ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {trend}
        </span>
      )}
    </div>
  </div>
);

const Dashboard: React.FC<{ onViewChange: (v: any) => void }> = ({ onViewChange }) => {
  return (
    <div className="p-8 h-full overflow-y-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">知识仪表盘</h1>
        <p className="text-slate-400">领域知识萃取和图谱性能概览。</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="知识节点总数" 
          value="12,403" 
          trend="+12%" 
          trendUp={true} 
          icon={<Network size={32} />} 
        />
        <StatCard 
          title="已处理文档" 
          value="856" 
          trend="+5%" 
          trendUp={true} 
          icon={<Database size={32} />} 
        />
        <StatCard 
          title="活跃模型" 
          value="8" 
          icon={<Cpu size={32} />} 
        />
        <StatCard 
          title="今日查询" 
          value="1,204" 
          trend="-2%" 
          trendUp={false} 
          icon={<Search size={32} />} 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Type Distribution */}
        <div className="glass-panel p-6 rounded-xl lg:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
            知识分布
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Extraction Activity */}
        <div className="glass-panel p-6 rounded-xl lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
             <span className="w-1 h-6 bg-orange-500 rounded-full mr-3"></span>
             萃取活动（过去7天）
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ACTIVITY_DATA}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button onClick={() => onViewChange('extraction')} className="group glass-panel p-6 rounded-xl text-left hover:border-blue-500/50 transition-colors">
          <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <UploadCloud size={24} />
          </div>
          <h4 className="text-white font-medium mb-1">新建萃取</h4>
          <p className="text-slate-400 text-sm">上传非结构化数据以构建新图谱。</p>
        </button>

        <button onClick={() => onViewChange('graph')} className="group glass-panel p-6 rounded-xl text-left hover:border-orange-500/50 transition-colors">
          <div className="bg-orange-500/20 w-12 h-12 rounded-lg flex items-center justify-center text-orange-400 mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
            <Network size={24} />
          </div>
          <h4 className="text-white font-medium mb-1">探索图谱</h4>
          <p className="text-slate-400 text-sm">在 3D 空间中可视化关系。</p>
        </button>

        <button onClick={() => onViewChange('applications')} className="group glass-panel p-6 rounded-xl text-left hover:border-purple-500/50 transition-colors">
          <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center text-purple-400 mb-4 group-hover:bg-purple-500 group-hover:text-white transition-colors">
            <Activity size={24} />
          </div>
          <h4 className="text-white font-medium mb-1">场景测试</h4>
          <p className="text-slate-400 text-sm">运行根因分析模拟。</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;