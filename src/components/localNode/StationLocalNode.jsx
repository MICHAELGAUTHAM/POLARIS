import React, { useState } from 'react';
import { usePolaris } from '../../context/PolarisContext';
import {
  HardDrive,
  WifiOff,
  Database,
  Cpu,
  Layers,
  Snowflake,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  Lock,
  Server,
  FileText,
  PlusCircle,
  X
} from 'lucide-react';

export default function StationLocalNode() {
  const {
    stationConnectivity,
    syncQueue,
    addOfflineEvent,
    setCurrentScreen,
    isPlanAuthorized
  } = usePolaris();

  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('Medical Wing Vault Backup Temperature Logged (-80.4°C)');
  const [entityName, setEntityName] = useState('AST-FRZ-BKP-01');

  const handleCreateEvent = (e) => {
    e.preventDefault();
    addOfflineEvent(eventTitle, entityName);
    setIsLogModalOpen(false);
  };

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Top Banner: Local Station Node Status */}
      <div className="polaris-panel" style={{ padding: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: 'rgba(2, 132, 199, 0.25)',
              border: '1px solid #0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(2, 132, 199, 0.3)'
            }}>
              <HardDrive size={26} color="#38bdf8" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="badge badge-info">OFFLINE-FIRST ARCHITECTURE</span>
                <span className={`badge ${stationConnectivity === 'OFFLINE' ? 'badge-critical' : 'badge-healthy'}`}>
                  {stationConnectivity === 'OFFLINE' ? 'CONNECTIVITY: OFFLINE' : 'ONLINE / SYNCED'}
                </span>
              </div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginTop: 4 }}>
                Station Local Node &bull; Bharati Station
              </h1>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Larsemann Hills (69°24′S 76°11′E) &bull; Satellite link interrupted by Blizzard &bull; <strong>LOCAL OPERATIONS ACTIVE</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            {/* Create Offline Event Button (Section 11 & 21 Requirement) */}
            <button
              onClick={() => setIsLogModalOpen(true)}
              className="btn btn-secondary"
              style={{ padding: '10px 16px', fontSize: '0.85rem' }}
            >
              <PlusCircle size={15} />
              <span>+ Log Offline Event</span>
            </button>

            <button
              onClick={() => setCurrentScreen('sync-center')}
              className="btn btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.88rem', fontWeight: 700 }}
            >
              <RefreshCw size={16} />
              <span>Open Sync Center ({syncQueue.length} Pending)</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Services Running Locally Matrix */}
      <div className="polaris-panel" style={{ padding: 20 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: 14 }}>
          Station Autonomous Edge Engine Services
        </h3>

        <div className="grid-cols-4">
          {/* Service 1 */}
          <div style={{ background: 'rgba(8, 14, 28, 0.7)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Database size={20} color="#38bdf8" />
              <span className="badge badge-healthy">ACTIVE LOCALLY</span>
            </div>
            <strong style={{ display: 'block', fontSize: '0.88rem', color: '#ffffff', marginTop: 10 }}>
              Local Database Engine
            </strong>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: 4 }}>
              Embedded SQLite / IndexedDB state persistence. 100% read/write available with 0ms network latency.
            </p>
          </div>

          {/* Service 2 */}
          <div style={{ background: 'rgba(8, 14, 28, 0.7)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Cpu size={20} color="#22d3ee" />
              <span className="badge badge-healthy">ACTIVE LOCALLY</span>
            </div>
            <strong style={{ display: 'block', fontSize: '0.88rem', color: '#ffffff', marginTop: 10 }}>
              Mission Intelligence
            </strong>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: 4 }}>
              Station schedule, manifest routing, and resource availability calculations executed directly on local node.
            </p>
          </div>

          {/* Service 3 */}
          <div style={{ background: 'rgba(8, 14, 28, 0.7)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Layers size={20} color="#f59e0b" />
              <span className="badge badge-healthy">ACTIVE LOCALLY</span>
            </div>
            <strong style={{ display: 'block', fontSize: '0.88rem', color: '#ffffff', marginTop: 10 }}>
              Risk &amp; Cascade Engine
            </strong>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: 4 }}>
              Subsystem failure propagation graph computed on-premises without cloud reliance.
            </p>
          </div>

          {/* Service 4 */}
          <div style={{ background: 'rgba(8, 14, 28, 0.7)', border: '1px solid var(--border-bright)', borderRadius: 'var(--radius-sm)', padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Snowflake size={20} color="#34d399" />
              <span className="badge badge-healthy">ACTIVE LOCALLY</span>
            </div>
            <strong style={{ display: 'block', fontSize: '0.88rem', color: '#ffffff', marginTop: 10 }}>
              Cryo-Triage &amp; MILP Solver
            </strong>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: 4 }}>
              Thermal decay prediction and optimization algorithms run autonomously under local station power.
            </p>
          </div>
        </div>
      </div>

      {/* Sync Ledger Queue */}
      <div className="polaris-panel" style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
              Local Outbox Ledger Queue
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Deterministic mutation events recorded offline and awaiting carrier uplink
            </p>
          </div>
          <span id="sync-queue-count" className="badge badge-simulated">{syncQueue.length} EVENTS QUEUED</span>
        </div>

        <table className="polaris-table">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Action Code</th>
              <th>Description</th>
              <th>Entity</th>
              <th>Recorded At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {syncQueue.map(evt => (
              <tr key={evt.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-cyan)' }}>
                  {evt.id}
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>
                  {evt.event}
                </td>
                <td style={{ fontSize: '0.82rem' }}>
                  {evt.description}
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>
                  {evt.entity}
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {evt.timestamp}
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

        {/* CTA to Sync Center */}
        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <button
            onClick={() => setCurrentScreen('sync-center')}
            className="btn btn-cyan"
            style={{ padding: '10px 22px', fontSize: '0.88rem' }}
          >
            <span>Proceed to Sync Center &rarr;</span>
          </button>
        </div>
      </div>

      {/* Log Offline Event Modal */}
      {isLogModalOpen && (
        <div className="modal-overlay" onClick={() => setIsLogModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 14 }}>
              <div>
                <span className="badge badge-warning">OFFLINE MUTATION</span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginTop: 4 }}>
                  Log Offline Station Event
                </h2>
              </div>
              <button onClick={() => setIsLogModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
                  Event Description
                </label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', background: 'rgba(8, 14, 28, 0.8)', border: '1px solid var(--border-medium)', borderRadius: 6, color: '#fff', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
                  Target Subsystem / Entity
                </label>
                <input
                  type="text"
                  value={entityName}
                  onChange={(e) => setEntityName(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', background: 'rgba(8, 14, 28, 0.8)', border: '1px solid var(--border-medium)', borderRadius: 6, color: '#fff', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                <button type="button" onClick={() => setIsLogModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Event Locally
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
