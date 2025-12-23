import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { GraphLink, GraphNode } from '../types';
import { MOCK_NODES, MOCK_LINKS } from '../constants';
import { Search, ZoomIn, ZoomOut, Maximize, Filter } from 'lucide-react';

const GraphSpace: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    // Define Arrow markers
    svg.append("defs").selectAll("marker")
      .data(["end"])
      .enter().append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 25)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#64748b");

    // Simulation Setup
    const simulation = d3.forceSimulation<GraphNode>(JSON.parse(JSON.stringify(MOCK_NODES)))
      .force("link", d3.forceLink<GraphNode, GraphLink>(JSON.parse(JSON.stringify(MOCK_LINKS))).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide(40));

    // Groups for layering
    const linkGroup = svg.append("g").attr("class", "links");
    const nodeGroup = svg.append("g").attr("class", "nodes");

    // Draw Links
    const link = linkGroup.selectAll("line")
      .data(JSON.parse(JSON.stringify(MOCK_LINKS)))
      .enter().append("line")
      .attr("stroke", "#475569")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d: any) => Math.sqrt(d.value) * 1.5)
      .attr("marker-end", "url(#arrow)");

    // Draw Nodes
    const node = nodeGroup.selectAll("g")
      .data(simulation.nodes())
      .enter().append("g")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );

    // Node Circles
    node.append("circle")
      .attr("r", (d: any) => d.val + 5)
      .attr("fill", (d: any) => {
        if (d.group === 1) return "#3B82F6"; // Entity: Blue
        if (d.group === 2) return "#F97316"; // Attribute: Orange
        return "#10B981"; // Rule/Other: Emerald
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .attr("class", "cursor-pointer transition-all duration-300 shadow-lg glow-effect")
      .on("click", (event, d) => {
        setSelectedNode(d);
        event.stopPropagation();
      });

    // Node Labels
    node.append("text")
      .text((d: any) => d.label)
      .attr("x", 0)
      .attr("y", (d: any) => -d.val - 8)
      .attr("text-anchor", "middle")
      .attr("fill", "#cbd5e1")
      .attr("font-size", "10px")
      .attr("font-family", "sans-serif")
      .attr("font-weight", "500")
      .style("pointer-events", "none");

    // Ticks
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Toolbar */}
      <div className="absolute top-4 left-4 z-10 flex space-x-2">
        <div className="glass-panel p-2 rounded-lg flex space-x-2">
           <div className="relative">
             <Search className="absolute left-2 top-2 w-4 h-4 text-slate-400" />
             <input 
              type="text" 
              placeholder="搜索实体..." 
              className="bg-slate-900/50 border border-slate-700 rounded-md py-1 pl-8 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 w-64"
             />
           </div>
           <button className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white"><Filter className="w-5 h-5"/></button>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <button className="glass-panel p-2 rounded-lg hover:bg-slate-700/50 text-slate-300 transition-colors">
          <ZoomIn className="w-5 h-5" />
        </button>
        <button className="glass-panel p-2 rounded-lg hover:bg-slate-700/50 text-slate-300 transition-colors">
          <ZoomOut className="w-5 h-5" />
        </button>
        <button className="glass-panel p-2 rounded-lg hover:bg-slate-700/50 text-slate-300 transition-colors">
          <Maximize className="w-5 h-5" />
        </button>
      </div>

      {/* Main Graph Area */}
      <div ref={containerRef} className="flex-1 bg-gradient-to-br from-slate-900 via-[#0a0f1e] to-slate-950 overflow-hidden relative cursor-move">
         {/* Grid Background Effect */}
         <div className="absolute inset-0 pointer-events-none opacity-20" 
              style={{
                backgroundImage: 'radial-gradient(#3B82F6 1px, transparent 1px)', 
                backgroundSize: '40px 40px'
              }}>
         </div>
         
         <svg ref={svgRef} className="w-full h-full"></svg>
      </div>

      {/* Detail Panel */}
      {selectedNode && (
        <div className="absolute top-20 right-4 w-80 glass-panel rounded-xl p-4 shadow-2xl border-l-4 border-l-blue-500 animate-in slide-in-from-right duration-300">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-white">{selectedNode.label}</h3>
            <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white">×</button>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                <span className="text-sm text-slate-400">类型</span>
                <span className="text-sm font-medium text-blue-400">{selectedNode.type}</span>
             </div>
             <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                <span className="text-sm text-slate-400">重要性</span>
                <div className="flex items-center">
                   <div className="w-20 h-2 bg-slate-700 rounded-full mr-2 overflow-hidden">
                     <div className="h-full bg-orange-500" style={{width: `${(selectedNode.val / 20) * 100}%`}}></div>
                   </div>
                   <span className="text-xs text-slate-300">{selectedNode.val}</span>
                </div>
             </div>
             <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider">关联关系</span>
                <div className="mt-2 flex flex-wrap gap-2">
                   {MOCK_LINKS.filter((l: any) => l.source.id === selectedNode.id || l.target.id === selectedNode.id).slice(0, 3).map((l: any, i) => (
                      <span key={i} className="text-xs bg-slate-800 border border-slate-600 px-2 py-1 rounded text-slate-300">
                         {l.source.id === selectedNode.id ? `→ ${l.target.id || l.target}` : `← ${l.source.id || l.source}`}
                      </span>
                   ))}
                </div>
             </div>
             <button className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md text-sm font-medium transition-colors">
               探索邻居
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphSpace;