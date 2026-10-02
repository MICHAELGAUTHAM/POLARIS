import React, { useState } from 'react';
import { usePolaris } from '../../context/PolarisContext';
import {
  GitFork,
  ArrowRight,
  Snowflake,
  AlertTriangle,
  Flame,
  Zap,
  HardDrive,
  Users,
  Compass,
  Boxes,
  Play,
  RotateCcw,
  CheckCircle2,
  Info
} from 'lucide-react';

export default function DependencyCascade() {
  const { setCurrentScreen, setKillerDemoStep, showToast } = usePolaris();

  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedNode, setSelectedNode] = useState('node-freezers');

  const nodes = [
    {
      id: 'node-cargo',
      label: 'Cargo C-421 & AL-77 Fuel',
      category: 'CARGO ROOT EVENT',
      status: 'CRITICAL',
      color: '#ef4444',
      x: 180,
      y: 90,
      icon: Boxes,
      detail: '7-day delay of generator spare parts (C-421) combined with 96-hour delay of Jet A-1 fuel traverse (AL-77) due to Category 4 Blizzard.'
    },
    {
      id: 'node-inventory',
      label: 'Zero GF-200 Stock & Low Fuel',
      category: 'STATION INVENTORY',
      status: 'CRITICAL',
      color: '#ef4444',
      x: 500,
      y: 90,
      icon: HardDrive,
      detail: 'Generator filter stock is 0. Turbine fuel reserve reduced to 4.2 days of winter operations.'
    },
    {
      id: 'node-power',
      label: 'Main Generator G-1 Offline',
      category: 'POWER GRID SHORTAGE',
      status: 'CRITICAL',
      color: '#ef4444',
      x: 340,
      y: 220,
      icon: Zap,
      detail: 'Auxiliary generator G-2 forced to run at 92% continuous load. Station power reserve drops below safety buffer.'
    },
    {
      id: 'node-loadshed',
      label: 'Emergency Load Shedding Protocol',
      category: 'STATION COMMAND BUS',
      status: 'CRITICAL',
      color: '#f59e0b',
      x: 340,
      y: 340,
      icon: Flame,
      detail: 'Life-support heating maintained in living pods. Non-essential research power bus disconnected.'
    },
    {
      id: 'node-freezers',
      label: 'Cryo Freezers 1, 2, 3 Powered Down',
      category: 'CRITICAL ASSETS OFFLINE',
      status: 'CRITICAL',
      color: '#ef4444',
      x: 340,
      y: 470,
      icon: Snowflake,
      detail: 'Freezer 1 (Paleoclimate Ice Cores) and Freezer 2 (Marine Microbes) begin passive exponential thermal decay.'
    },
    {
      id: 'node-missions',
      label: 'Missions M-101, M-102, M-103 Threat',
      category: 'MISSION CONTINUITY THREAT',
      status: 'CRITICAL',
      color: '#ef4444',
      x: 140,
      y: 470,
      icon: Compass,
      detail: 'Irreversible scientific loss of 120,000-year polar climate archives if threshold (-15°C) is breached.'
    },
    {
      id: 'node-personnel',
      label: 'Emergency Logistics Team Deployed',
      category: 'PERSONNEL ALLOCATION',
      status: 'WARNING',
      color: '#38bdf8',
      x: 560,
      y: 470,
      icon: Users,
      detail: '4 specialists available for cryo-relocation protocols before blizzard lockdown.'
    }
  ];

  const handleRunCryoTriage = () => {
    setIsSimulating(true);
    setKillerDemoStep('CASCADE_ACTIVE');
    showToast('Executing Thermal-Decay Cascade Analysis...', 'warning');

    setTimeout(() => {
      showToast('CRITICAL THERMAL RUNAWAY IDENTIFIED: Transferring to Cryo-Triage Engine!', 'error');
      setCurrentScreen('cryo');
    }, 1400);
  };

  const activeNodeData = nodes.find(n => n.id === selectedNode) || nodes[4];

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-critical">STEP 4: CASCADE ANALYSIS</span>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              Dependency &amp; Risk Cascade
            </h1>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 2 }}>
            Interactive multi-system failure propagation model: Logistics Delay &rarr; Power Shortage &rarr; Thermal Runaway.
          </p>
        </div>

        {/* Primary CTA: RUN CRYO-TRIAGE */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => setSelectedNode('node-freezers')}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem' }}
          >
            <RotateCcw size={14} />
            <span>Reset View</span>
          </button>

          <button
            onClick={handleRunCryoTriage}
            className="btn btn-critical pulse-critical"
            style={{ padding: '10px 22px', fontSize: '0.9rem', fontWeight: 700 }}
            disabled={isSimulating}
          >
            <Snowflake size={18} />
            <span>{isSimulating ? 'ANALYZING THERMAL DECAY...' : 'RUN CRYO-TRIAGE'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Main Cascade Interactive Canvas & Detail Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        {/* Interactive SVG Node-Link Graph */}
        <div className="polaris-panel" style={{ padding: 18, position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: 14,
            left: 16,
            zIndex: 10,
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-cyan)',
            background: 'rgba(8, 14, 28, 0.8)',
            padding: '4px 8px',
            borderRadius: 4,
            border: '1px solid var(--border-subtle)'
          }}>
            CLICK ANY NODE TO INSPECT SUBSYSTEM DEPENDENCY
          </div>

          <svg
            viewBox="0 0 720 580"
            style={{
              width: '100%',
              height: 520,
              background: 'radial-gradient(ellipse at center, rgba(16, 28, 54, 0.5) 0%, rgba(6, 10, 20, 0.95) 100%)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <defs>
              <linearGradient id="edgeCritGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Connecting Edges */}
            {/* Cargo -> Power */}
            <line x1="200" y1="120" x2="340" y2="220" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 4" className={isSimulating ? 'pulse-critical' : ''} />
            {/* Inventory -> Power */}
            <line x1="480" y1="120" x2="340" y2="220" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 4" />
            {/* Power -> Load Shedding */}
            <line x1="340" y1="240" x2="340" y2="340" stroke="#ef4444" strokeWidth="3" />
            {/* Load Shedding -> Freezers */}
            <line x1="340" y1="360" x2="340" y2="470" stroke="#ef4444" strokeWidth="3.5" className="pulse-critical" />
            {/* Freezers -> Missions */}
            <line x1="340" y1="470" x2="160" y2="470" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
            {/* Freezers -> Personnel */}
            <line x1="340" y1="470" x2="540" y2="470" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />

            {/* Render Nodes */}
            {nodes.map(node => {
              const Icon = node.icon;
              const isSelected = selectedNode === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => setSelectedNode(node.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer pulse when selected or simulating */}
                  {(isSelected || isSimulating) && (
                    <circle
                      r="36"
                      fill="none"
                      stroke={node.color}
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className="radar-sweep"
                    />
                  )}

                  {/* Main Node Base */}
                  <circle
                    r="26"
                    fill={isSelected ? 'rgba(239, 68, 68, 0.3)' : 'rgba(12, 21, 41, 0.95)'}
                    stroke={isSelected ? '#ffffff' : node.color}
                    strokeWidth={isSelected ? '3' : '2'}
                    filter={`drop-shadow(0 0 10px ${node.color}60)`}
                  />

                  {/* Node Icon inside */}
                  <g transform="translate(-10, -10)">
                    <Icon size={20} color={isSelected ? '#ffffff' : node.color} />
                  </g>

                  {/* Label Text Pill */}
                  <rect
                    x="-90"
                    y="32"
                    width="180"
                    height="28"
                    rx="5"
                    fill="rgba(8, 14, 28, 0.92)"
                    stroke={isSelected ? '#ffffff' : 'rgba(56, 189, 248, 0.25)'}
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="46"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9.5"
                    fontFamily="var(--font-display)"
                    fontWeight="700"
                  >
                    {node.label}
                  </text>
                  <text
                    x="0"
                    y="56"
                    textAnchor="middle"
                    fill={node.color}
                    fontSize="7.5"
                    fontFamily="var(--font-mono)"
                    fontWeight="600"
                  >
                    {node.category}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right Column: Node Inspector & Physical Consequence Callout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="polaris-panel critical" style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span className="badge badge-critical">IMPACT INSPECTOR</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {activeNodeData.id}
              </span>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
              {activeNodeData.label}
            </h3>

            <div style={{
              marginTop: 10,
              padding: '10px 12px',
              background: 'rgba(8, 14, 28, 0.8)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5
            }}>
              {activeNodeData.detail}
            </div>

            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Subsystem Status</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: activeNodeData.color, fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                ● {activeNodeData.status} — IMMEDIATE ACTION REQUIRED
              </div>
            </div>
          </div>

          {/* Physical Consequences Callout */}
          <div className="polaris-panel" style={{ padding: 18, background: 'rgba(239, 68, 68, 0.08)', borderColor: 'rgba(239, 68, 68, 0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f87171', fontWeight: 700, fontSize: '0.88rem' }}>
              <AlertTriangle size={18} />
              <span>Physical Consequence Callout</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#fca5a5', marginTop: 8, lineHeight: 1.4 }}>
              Without power, thermal decay in Bharati Science Lab 1 will cause <strong>Freezer 1 (Paleoclimate Ice Cores)</strong> to cross the <strong>-15.0°C irreversible sublimation threshold</strong> in approximately <strong>4 hours and 12 minutes</strong>.
            </p>

            <div style={{ marginTop: 14 }}>
              <button
                onClick={handleRunCryoTriage}
                className="btn btn-critical"
                style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
              >
                Launch Cryo-Triage Engine &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
