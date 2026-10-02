import React from 'react';
import { usePolaris } from '../../context/PolarisContext';
import {
  RefreshCw,
  Wifi,
  WifiOff,
  CheckCircle2,
  Clock,
  ArrowRight,
  HardDrive,
  Cloud,
  FileCheck,
  LayoutDashboard,
  ShieldCheck
} from 'lucide-react';

export default function SyncCenter() {
  const {
    stationConnectivity,
    syncQueue,
    simulateReconnection,
    setCurrentScreen,
    isPlanAuthorized
  } = usePolaris();

  const isSynced = stationConnectivity === 'SYNCED';
  const isSyncing = stationConnectivity === 'SYNCING';

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Top Banner: Sync Center Overview */}
      <div className="polaris-panel" style={{ padding: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              background: isSynced ? 'rgba(16, 185, 129, 0.25)' : isSyncing ? 'rgba(56, 189, 248, 0.25)' : 'rgba(239, 68, 68, 0.25)',
              border: `1px solid ${isSynced ? '#10b981' : isSyncing ? '#38bdf8' : '#ef4444'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {isSynced ? (
                <CheckCircle2 size={28} color="#34d399" />
              ) : isSyncing ? (
                <RefreshCw size={28} color="#38bdf8" className="radar-sweep" />
              ) : (
                <WifiOff size={28} color="#f87171" />
              )}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="badge badge-info">SYNCHRONIZATION LEDGER</span>
                <span className={`badge ${isSynced ? 'badge-healthy' : isSyncing ? 'badge-info' : 'badge-warning'}`}>
                  {isSynced ? 'STATUS: SYNCED WITH MOES CLOUD' : isSyncing ? 'STATUS: UPLOADING EVENTS...' : 'STATUS: OFFLINE / 5 EVENTS PENDING'}
                </span>
              </div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginTop: 4 }}>
                Event-Based Synchronization Center
              </h1>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Guaranteed eventual consistency bridge between Bharati Station Edge SQLite and Central MoES PostgreSQL Cloud.
              </p>
            </div>
          </div>

          {/* Primary Action Button: SIMULATE RECONNECTION */}
          {!isSynced ? (
            <button
              onClick={simulateReconnection}
              className="btn btn-primary pulse-critical"
              style={{ padding: '12px 24px', fontSize: '0.92rem', fontWeight: 700 }}
              disabled={isSyncing}
            >
              <RefreshCw size={18} className={isSyncing ? 'radar-sweep' : ''} />
              <span>{isSyncing ? 'SYNCING IN PROGRESS...' : 'SIMULATE RECONNECTION'}</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="btn btn-cyan"
              style={{ padding: '12px 24px', fontSize: '0.92rem', fontWeight: 700 }}
            >
              <LayoutDashboard size={18} />
              <span>Return to Updated Dashboard &rarr;</span>
            </button>
          )}
        </div>
      </div>

      {/* Sync Progression Timeline (from README) */}
      <div className="polaris-panel" style={{ padding: 22 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: 16 }}>
          Sync Lifecycle Pipeline
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
          position: 'relative'
        }}>
          {/* Step 1: Saved Locally */}
          <div style={{
            background: 'rgba(8, 14, 28, 0.8)',
            border: '1px solid #10b981',
            borderRadius: 'var(--radius-sm)',
            padding: 14
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#34d399', fontSize: '0.78rem', fontWeight: 700 }}>
              <CheckCircle2 size={16} />
              <span>1. SAVED LOCALLY</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 6 }}>
              Written to SQLite WAL on Bharati Station local server.
            </div>
          </div>

          {/* Step 2: Waiting for Connection */}
          <div style={{
            background: 'rgba(8, 14, 28, 0.8)',
            border: `1px solid ${isSynced || isSyncing ? '#10b981' : '#f59e0b'}`,
            borderRadius: 'var(--radius-sm)',
            padding: 14
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: isSynced || isSyncing ? '#34d399' : '#fbbf24', fontSize: '0.78rem', fontWeight: 700 }}>
              <Clock size={16} />
              <span>2. CARRIER HANDSHAKE</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 6 }}>
              {isSynced ? 'Iridium satellite uplink locked' : 'Waiting for Blizzard signal clearance'}
            </div>
          </div>

          {/* Step 3: Syncing */}
          <div style={{
            background: 'rgba(8, 14, 28, 0.8)',
            border: `1px solid ${isSynced ? '#10b981' : isSyncing ? '#38bdf8' : 'var(--border-subtle)'}`,
            borderRadius: 'var(--radius-sm)',
            padding: 14
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: isSynced ? '#34d399' : isSyncing ? '#38bdf8' : 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 700 }}>
              <RefreshCw size={16} className={isSyncing ? 'radar-sweep' : ''} />
              <span>3. SYNCING</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 6 }}>
              {isSyncing ? 'Pushing 5 batch delta packets...' : isSynced ? 'Delta merged with 0 conflicts' : 'Pending network link'}
            </div>
          </div>

          {/* Step 4: Synced */}
          <div style={{
            background: isSynced ? 'rgba(16, 185, 129, 0.15)' : 'rgba(8, 14, 28, 0.8)',
            border: `1px solid ${isSynced ? '#10b981' : 'var(--border-subtle)'}`,
            borderRadius: 'var(--radius-sm)',
            padding: 14
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: isSynced ? '#34d399' : 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 700 }}>
              <Cloud size={16} />
              <span>4. SYNCED</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: isSynced ? '#ffffff' : 'var(--text-muted)', marginTop: 6 }}>
              {isSynced ? 'Global state synchronized across MoES nodes' : 'Awaiting uplink completion'}
            </div>
          </div>
        </div>
      </div>

      {/* Pending Events Ledger Table */}
      <div className="polaris-panel" style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
              Pending Transaction Ledger ({syncQueue.length} Events)
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Deterministic event-sourced change-log for cryo-triage and station reallocation
            </p>
          </div>
        </div>

        <table className="polaris-table">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Action Code</th>
              <th>Description</th>
              <th>Cryptographic Hash</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {syncQueue.map(evt => (
              <tr key={evt.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-cyan)' }}>
                  {evt.id}
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700 }}>
                  {evt.event}
                </td>
                <td style={{ fontSize: '0.84rem' }}>
                  {evt.description}
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {evt.hash}
                </td>
                <td>
                  <span className={`badge ${evt.status === 'SYNCED' ? 'badge-healthy' : 'badge-warning'}`}>
                    {evt.status === 'SYNCED' ? 'SYNCED' : 'SAVED LOCALLY'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Action Button after Synced */}
        {isSynced && (
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="btn btn-primary"
              style={{ padding: '12px 30px', fontSize: '0.95rem', fontWeight: 800 }}
            >
              <span>Return to Dashboard to Verify Global Operational State &rarr;</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
