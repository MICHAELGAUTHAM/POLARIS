import React from 'react';
import { usePolaris } from '../../context/PolarisContext';
import {
  Workflow,
  Server,
  Database,
  Cpu,
  Layers,
  HardDrive,
  Cloud,
  CheckCircle2,
  Lock,
  ArrowDown,
  RefreshCw
} from 'lucide-react';

export default function ArchitectureView() {
  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Title */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="badge badge-info">SYSTEM BLUEPRINT</span>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
            POLARIS Production Architecture Specification
          </h1>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>
          Full-stack deployment topology designed for zero-connectivity Antarctic resilience and central MoES cloud synchronization.
        </p>
      </div>

      {/* Target Stack Diagram Panel */}
      <div className="polaris-panel" style={{ padding: 24 }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginBottom: 16 }}>
          Layer-by-Layer Architectural Decomposition
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 840, margin: '0 auto' }}>
          {/* Layer 1: Client Tier */}
          <div style={{ background: 'rgba(2, 132, 199, 0.15)', border: '1px solid #0284c7', borderRadius: 8, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Workflow size={20} color="#38bdf8" />
                <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>1. Client Presentation &amp; Mobile Tier</strong>
              </div>
              <span className="badge badge-info">REACT / NEXT.JS / VANILLA CSS</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#bae6fd', marginTop: 6 }}>
              Responsive web application and ruggedized field tablet UI. Progressive Web App (PWA) with Service Workers for local caching.
            </p>
          </div>

          <div style={{ textAlign: 'center', color: '#38bdf8' }}><ArrowDown size={20} style={{ margin: '0 auto' }} /></div>

          {/* Layer 2: API & Gateway */}
          <div style={{ background: 'rgba(6, 182, 212, 0.15)', border: '1px solid #06b6d4', borderRadius: 8, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Server size={20} color="#22d3ee" />
                <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>2. API &amp; Microservices Gateway</strong>
              </div>
              <span className="badge badge-info">FASTAPI / PYTHON / REST / WEBSOCKETS</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#cffafe', marginTop: 6 }}>
              High-throughput async Python backend providing RBAC enforcement, telemetry ingestion, and geospatial query routing.
            </p>
          </div>

          <div style={{ textAlign: 'center', color: '#22d3ee' }}><ArrowDown size={20} style={{ margin: '0 auto' }} /></div>

          {/* Layer 3: Mission Intelligence Layer */}
          <div style={{ background: 'rgba(168, 85, 247, 0.15)', border: '1px solid #a855f7', borderRadius: 8, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Cpu size={20} color="#c084fc" />
                <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>3. Mission Intelligence &amp; Cryo-Triage Engine</strong>
              </div>
              <span className="badge badge-info">OR-TOOLS / NUMPY / PANDAS / SCIKIT-LEARN</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#f3e8ff', marginTop: 6 }}>
              Thermal decay numerical solvers, Mixed-Integer Linear Programming (MILP) optimization, and dependency graph propagation.
            </p>
          </div>

          <div style={{ textAlign: 'center', color: '#c084fc' }}><ArrowDown size={20} style={{ margin: '0 auto' }} /></div>

          {/* Layer 4: Offline Edge Persistence */}
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: 8, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <HardDrive size={20} color="#34d399" />
                <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>4. Station Local Node (Edge Operations)</strong>
              </div>
              <span className="badge badge-healthy">SQLITE / WAL / INDEXEDDB / IRIDIUM SYNC</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#d1fae5', marginTop: 6 }}>
              Local station server operating autonomously during complete satellite blackout. Event-sourced mutation ledger with conflict-free replication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
