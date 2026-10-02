import React, { useState } from 'react';
import { usePolaris } from '../../context/PolarisContext';
import {
  Radio,
  Sliders,
  Play,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Cpu,
  Layers,
  Snowflake,
  ShieldCheck
} from 'lucide-react';

export default function RiskOptimization() {
  const { setCurrentScreen, setIsExplainModalOpen, setIsApprovalModalOpen, isPlanAuthorized } = usePolaris();
  const [activeTab, setActiveTab] = useState('ACTIVE_RISKS');

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-info">AI DECISION INTELLIGENCE</span>
            <span className="badge badge-simulated">OR-TOOLS SOLVER</span>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              Risk Engine &amp; Mathematical Optimization
            </h1>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>
            Simulating contingency scenarios and solving resource allocation constraints under polar hazards.
          </p>
        </div>

        <button onClick={() => setCurrentScreen('cryo')} className="btn btn-cyan" style={{ fontSize: '0.82rem' }}>
          <Snowflake size={14} />
          <span>Launch Cryo-Triage Engine &rarr;</span>
        </button>
      </div>

      {/* Tabs Row */}
      <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10 }}>
        {[
          { id: 'ACTIVE_RISKS', label: 'Active Risks & Impact' },
          { id: 'OPTIMIZATION', label: 'Optimization Plans' },
          { id: 'SIMULATIONS', label: 'Scenario Simulations' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.78rem', padding: '6px 12px' }}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active Risks Tab */}
      {activeTab === 'ACTIVE_RISKS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="polaris-panel critical" style={{ padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <AlertTriangle size={20} color="#f87171" />
                <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>
                  Risk 01: Multi-System Power Grid &amp; Cryo Runaway (Bharati)
                </strong>
              </div>
              <span className="badge badge-critical">SEVERITY: 9.4 / 10</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 14 }}>
              <div style={{ background: 'rgba(8, 14, 28, 0.6)', padding: 10, borderRadius: 4 }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Affected Missions</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', marginTop: 2 }}>M-101, M-102, M-105</div>
              </div>
              <div style={{ background: 'rgba(8, 14, 28, 0.6)', padding: 10, borderRadius: 4 }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Inventory Impact</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f87171', marginTop: 2 }}>GF-200 Stockout</div>
              </div>
              <div style={{ background: 'rgba(8, 14, 28, 0.6)', padding: 10, borderRadius: 4 }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Dependency Cascade</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f87171', marginTop: 2 }}>5 Subsystems Down</div>
              </div>
              <div style={{ background: 'rgba(8, 14, 28, 0.6)', padding: 10, borderRadius: 4 }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Risk Status</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: isPlanAuthorized ? '#34d399' : '#f87171', marginTop: 2 }}>
                  {isPlanAuthorized ? 'MITIGATED' : 'ACTIVE THREAT'}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button onClick={() => setCurrentScreen('cascade')} className="btn btn-secondary" style={{ fontSize: '0.78rem' }}>
                View Cascade Graph
              </button>
              <button onClick={() => setCurrentScreen('cryo')} className="btn btn-critical" style={{ fontSize: '0.78rem' }}>
                Run Cryo-Triage Resolution
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Optimization Tab */}
      {activeTab === 'OPTIMIZATION' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Plan A (Recommended) */}
          <div className="polaris-panel" style={{ padding: 20, border: '1px solid #10b981' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-healthy">RECOMMENDED &bull; OR-TOOLS</span>
              <strong style={{ fontSize: '1.1rem', color: '#34d399', fontFamily: 'var(--font-mono)' }}>94.8% VALUE</strong>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginTop: 8 }}>
              Plan A: Targeted Cryo-Decay Preservation
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
              Protect Freezer 1 via Medical Wing vault; connect Battery Alpha to Freezer 2; allow Freezer 3 food to decay and switch to dry rations.
            </p>

            <ul style={{ fontSize: '0.78rem', color: 'var(--text-primary)', marginTop: 12, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li><strong>Cost:</strong> 42 kWh emergency power &bull; 3.5 man-hours</li>
              <li><strong>Time:</strong> 45 min relocation (safe within 4h 12m limit)</li>
              <li><strong>Outcome:</strong> 100% scientific samples saved &bull; 0 human risk</li>
            </ul>

            <div style={{ marginTop: 16 }}>
              <button onClick={() => setCurrentScreen('cryo')} className="btn btn-primary" style={{ width: '100%' }}>
                Inspect &amp; Authorize Plan A &rarr;
              </button>
            </div>
          </div>

          {/* Plan B (Naive Alternative) */}
          <div className="polaris-panel" style={{ padding: 20, border: '1px solid rgba(239, 68, 68, 0.4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-critical">NON-FEASIBLE ALTERNATIVE</span>
              <strong style={{ fontSize: '1.1rem', color: '#f87171', fontFamily: 'var(--font-mono)' }}>0.0% VALUE</strong>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginTop: 8 }}>
              Plan B: Equal Load Splitting
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
              Attempt to split battery packs evenly across all 3 freezers without moving any samples.
            </p>

            <ul style={{ fontSize: '0.78rem', color: '#fca5a5', marginTop: 12, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li><strong>Cost:</strong> All batteries exhausted in ~6 hours</li>
              <li><strong>Time:</strong> Fails before blizzard abates (96h gap)</li>
              <li><strong>Outcome:</strong> ALL 3 freezers undergo simultaneous thermal failure. Complete catastrophic sample loss.</li>
            </ul>

            <div style={{ marginTop: 16 }}>
              <button disabled className="btn btn-secondary" style={{ width: '100%', opacity: 0.6, cursor: 'not-allowed' }}>
                Rejected by Mathematical Constraints
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scenario Simulations Tab */}
      {activeTab === 'SIMULATIONS' && (
        <div className="polaris-panel" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: 8 }}>
            Polar Scenario Monte Carlo Simulator
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
            Run simulated blizzard duration extensions (+24h, +48h) to test station resilience buffers.
          </p>

          <div style={{ background: 'rgba(8, 14, 28, 0.7)', padding: 14, borderRadius: 6, border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ color: '#ffffff', fontSize: '0.88rem' }}>Simulation: Extended 120-Hour Blizzard Gap</strong>
              <button className="btn btn-outline" style={{ fontSize: '0.75rem' }}>Run Simulation</button>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 6 }}>
              Evaluates whether secondary Battery Beta can be chained to Freezer 2 if ALCI traverse is delayed an extra 24 hours.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
