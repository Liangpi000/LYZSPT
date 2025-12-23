import React from 'react';
import * as d3 from 'd3';

export type ViewState = 'dashboard' | 'extraction' | 'graph' | 'applications';

export interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  icon: React.ReactNode;
  trendUp?: boolean;
}

export interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  group: number; // 1: Entity, 2: Attribute, 3: Rule
  val: number; // Size
  label: string;
  type?: string;
}

export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
  value: number; // Thickness/Weight
}

export interface ExtractionModel {
  id: string;
  name: string;
  type: 'rule' | 'semantic';
  description: string;
  icon: 'settings' | 'brain';
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  stats: string;
  color: string;
}