import { ExtractionModel, GraphLink, GraphNode, Scenario } from './types';

export const MOCK_NODES: GraphNode[] = [
  // Core Domain: Finance
  { id: 'Order_Approval', group: 1, val: 20, label: '订单审批', type: '流程' },
  { id: 'Amount_Limit', group: 2, val: 10, label: '> 5万', type: '约束' },
  { id: 'Role_CFO', group: 1, val: 15, label: '财务总监', type: '角色' },
  { id: 'Role_Manager', group: 1, val: 15, label: '经理', type: '角色' },
  { id: 'Dept_Sales', group: 1, val: 12, label: '销售部', type: '部门' },
  
  // Core Domain: Customer
  { id: 'High_Value_User', group: 1, val: 20, label: '高价值用户', type: '分群' },
  { id: 'Pay_Rate', group: 2, val: 10, label: '支付率 > 98%', type: '指标' },
  { id: 'Retention', group: 2, val: 10, label: '高留存', type: '指标' },
  
  // Connections
  { id: 'Rule_001', group: 3, val: 5, label: '需要', type: '规则' },
  { id: 'Feature_001', group: 3, val: 5, label: '相关', type: '特征' },
];

export const MOCK_LINKS: GraphLink[] = [
  { source: 'Order_Approval', target: 'Dept_Sales', value: 2 },
  { source: 'Order_Approval', target: 'Rule_001', value: 5 },
  { source: 'Rule_001', target: 'Amount_Limit', value: 3 },
  { source: 'Rule_001', target: 'Role_CFO', value: 3 },
  { source: 'Dept_Sales', target: 'Role_Manager', value: 2 },
  
  { source: 'High_Value_User', target: 'Pay_Rate', value: 4 },
  { source: 'High_Value_User', target: 'Retention', value: 4 },
  { source: 'High_Value_User', target: 'Dept_Sales', value: 1 }, // Cross domain link
];

export const EXTRACTION_MODELS: ExtractionModel[] = [
  {
    id: 'm1',
    name: '规则引擎萃取器',
    type: 'rule',
    description: '适用于结构化 Excel/CSV 数据。提取刚性逻辑，如“如果 X 则 Y”。',
    icon: 'settings'
  },
  {
    id: 'm2',
    name: '语义深度萃取器',
    type: 'semantic',
    description: '适用于非结构化 PDF/Word 文档。提取实体、关系和潜在特征。',
    icon: 'brain'
  }
];

export const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    title: '业务规则引擎',
    description: '基于提取的图谱规则进行财务审批的自动化决策。',
    stats: '99.9% 准确率',
    color: 'from-blue-600 to-cyan-500'
  },
  {
    id: 's2',
    title: '根因分析',
    description: '针对 30+ 种硬件故障模式的多维诊断图谱。',
    stats: '30+ 维度',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 's3',
    title: '客户意图路由',
    description: '使用语义图谱匹配对 200+ 服务意图进行智能路由。',
    stats: '200+ 意图',
    color: 'from-purple-600 to-indigo-500'
  }
];

export const PIE_DATA = [
  { name: '规则', value: 400 },
  { name: '实体', value: 300 },
  { name: '文档', value: 300 },
  { name: '特征', value: 200 },
];

export const ACTIVITY_DATA = [
  { name: '周一', count: 12 },
  { name: '周二', count: 19 },
  { name: '周三', count: 35 },
  { name: '周四', count: 22 },
  { name: '周五', count: 48 },
  { name: '周六', count: 15 },
  { name: '周日', count: 10 },
];
