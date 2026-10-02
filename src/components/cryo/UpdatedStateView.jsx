import React, { useEffect } from 'react';
import { usePolaris } from '../../context/PolarisContext';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CheckCircle2,
  HardDrive,
  RefreshCw,
  ArrowRight,
  Snowflake,
  BatteryCharging,
  AlertTriangle,
  UserCheck,
  Clock,
  Compass,
  LayoutDashboard
} from 'lucide-react';

export default function UpdatedStateView() {
  const {
    cryoAssets,
    authorizedDetails,
    setCurrentScreen,
    userName,
    userRole,
    simulatedTime
  } = usePolaris();

  // Trigger celebration confetti on mount to highlight resolution
  useEffect(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#06b6d4', '#10b981', '#ffffff']
      });
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Success Resolution Banner */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.22) 0%, rgba(8, 14, 28, 0.9) 100%)',
        border: '1px solid #10b981',
        borderRadius: 'var(--radius-md)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.25)',
            border: '2px solid #10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(16, 185, 129, 0.4)'
          }}>
            <ShieldCheck size={32} color="#34d399" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="badge badge-healthy" style={{ fontSize: '0.8rem' }}>
                RESOLUTION APPLIED
              </span>
              <span style={{ fontSize: '0.75rem', color: '#bae6fd', fontFamily: 'var(--font-mono)' }}>
                OPERATOR AUTHORIZED &bull; SAVED LOCALLY
              </span>
            </div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginTop: 4 }}>
              Bharati Cryo-Triage Emergency Resolution Active
            </h1>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 2 }}>
              Plan A authorized by <strong>{authorizedDetails?.operator || userName}</strong> ({userRole}). Event written to Bharati Station SQLite ledger.
            </p>
          </div>
        </div>

        {/* Next Step CTA in Killer Demo: Station Local Node */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => setCurrentScreen('local-node')}
            className="btn btn-primary"
            style={{ padding: '12px 22px', fontSize: '0.9rem', fontWeight: 700 }}
          >
            <HardDrive size={18} />
            <span>Inspect Station Local Node &rarr;</span>
          </button>
        </div>
      </div>

      {/* 3 Cryo Assets Updated State Cards */}
      <div className="grid-cols-3">
        {/* Asset 1: Ice Cores */}
        <div className="polaris-panel" style={{ padding: 20, border: '1px solid #10b981', background: 'rgba(16, 185, 129, 0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
              Freezer 1 &bull; Paleoclimate Ice Cores
            </span>
            <span className="badge badge-healthy">SAFE / STABLE</span>
          </div>

          <div style={{ marginTop: 14, fontSize: '0.82rem', color: '#34d399', fontWeight: 700 }}>
            ✓ Relocated to Medical Wing Backup Freezer
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            Insulated cryo-transfer sled deployed. Deep glacial cores safely protected inside independent Medical Wing emergency power bus.
          </p>

          <div style={{
            marginTop: 14,
            padding: '10px 12px',
            background: 'rgba(8, 14, 28, 0.8)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.75rem',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span style={{ color: 'var(--text-muted)' }}>Status:</span>
            <strong style={{ color: '#34d399' }}>SAFE WITHIN TTCF</strong>
          </div>
        </div>

        {/* Asset 2: Marine Microbes */}
        <div className="polaris-panel" style={{ padding: 20, border: '1px solid #38bdf8', background: 'rgba(56, 189, 248, 0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
              Freezer 2 &bull; Marine Microbes
            </span>
            <span className="badge badge-info">STABILIZED</span>
          </div>

          <div style={{ marginTop: 14, fontSize: '0.82rem', color: '#38bdf8', fontWeight: 700 }}>
            ✓ Portable Battery Alpha Connected
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            48 kWh LFP battery pack hooked up directly to compressor. Active refrigeration maintained at -79.5°C.
          </p>

          <div style={{
            marginTop: 14,
            padding: '10px 12px',
            background: 'rgba(8, 14, 28, 0.8)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.75rem',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span style={{ color: 'var(--text-muted)' }}>Survival Runtime:</span>
            <strong style={{ color: '#38bdf8' }}>+72 HOURS EXTENSION</strong>
          </div>
        </div>

        {/* Asset 3: Food Decay Allowed */}
        <div className="polaris-panel" style={{ padding: 20, border: '1px solid rgba(245, 158, 11, 0.4)', background: 'rgba(245, 158, 11, 0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
              Freezer 3 &bull; Perishable Food
            </span>
            <span className="badge badge-warning">LOW PRIORITY / DECAY</span>
          </div>

          <div style={{ marginTop: 14, fontSize: '0.82rem', color: '#fbbf24', fontWeight: 700 }}>
            ⚠ Decay Permitted &bull; Dry Rations Active
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            Food loss officially accepted. Personnel redirected to access 1,200 packaged MRE dry-rations in Habitation Core.
          </p>

          <div style={{
            marginTop: 14,
            padding: '10px 12px',
            background: 'rgba(8, 14, 28, 0.8)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.75rem',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span style={{ color: 'var(--text-muted)' }}>Nutritional Safety:</span>
            <strong style={{ color: '#34d399' }}>90 DAYS BUFFER AVAILABLE</strong>
          </div>
        </div>
      </div>

      {/* Mission State & Personnel Task Updates */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Mission State Upgrades */}
        <div className="polaris-panel" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: 12 }}>
            Updated Mission Continuity State
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ background: 'rgba(8, 14, 28, 0.6)', padding: 12, borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: '#ffffff', fontSize: '0.85rem' }}>M-102: Paleoclimate Deep Ice Core</strong>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Heritage ice samples secured in Medical Vault</div>
              </div>
              <span className="badge badge-healthy">STABILIZED</span>
            </div>

            <div style={{ background: 'rgba(8, 14, 28, 0.6)', padding: 12, borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: '#ffffff', fontSize: '0.85rem' }}>M-103: Larsemann Marine Microbes</strong>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Enzyme cultures under Battery Alpha power</div>
              </div>
              <span className="badge badge-healthy">STABILIZED</span>
            </div>
          </div>
        </div>

        {/* Task Assignments Dispatched */}
        <div className="polaris-panel" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: 12 }}>
            Field Personnel Task Dispatch
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ background: 'rgba(8, 14, 28, 0.6)', padding: 12, borderRadius: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ color: '#ffffff', fontSize: '0.85rem' }}>Logistics Team Alpha (2 Technicians)</strong>
                <span className="badge badge-info">TRANSFER UNDERWAY</span>
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                Task: Escort Cryo-Transfer Sled from Lab 1 to Medical Wing Vault Bay 3.
              </div>
            </div>

            <div style={{ background: 'rgba(8, 14, 28, 0.6)', padding: 12, borderRadius: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ color: '#ffffff', fontSize: '0.85rem' }}>Eng. David O’Connor (Chief Electrical)</strong>
                <span className="badge badge-healthy">DEPLOYED</span>
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                Task: Hook up Battery Alpha DC inverter to Freezer 2 telemetry terminal.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Demo Flow Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="btn btn-secondary"
        >
          <LayoutDashboard size={16} />
          <span>Return to Dashboard</span>
        </button>

        <button
          onClick={() => setCurrentScreen('local-node')}
          className="btn btn-primary"
          style={{ padding: '12px 24px', fontSize: '0.9rem', fontWeight: 700 }}
        >
          <span>Proceed to Station Local Node</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
