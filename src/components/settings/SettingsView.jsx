import React from 'react';
import { usePolaris } from '../../context/PolarisContext';
import {
  Settings,
  Shield,
  UserCheck,
  HardDrive,
  Lock,
  FileText,
  Key,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function SettingsView() {
  const {
    userName,
    userRole,
    setUserRole,
    auditLogs,
    stationConnectivity,
    showToast
  } = usePolaris();

  const roles = [
    'Station Commander',
    'Lead Logistics Officer',
    'Chief Scientist',
    'Admin',
    'Field Officer'
  ];

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-info">SECURITY &amp; RBAC GOVERNANCE</span>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              System Settings &amp; Audit Logs
            </h1>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>
            Role-based access control, cryptographic operational event ledger, and local edge node preferences.
          </p>
        </div>
      </div>

      {/* Two Column Layout: RBAC Settings & Audit Logs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 20 }}>
        {/* Left Column: RBAC & User Profile */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="polaris-panel" style={{ padding: 20 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: 12 }}>
              Active Session &amp; RBAC Role
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                fontWeight: 800,
                color: '#fff'
              }}>
                MG
              </div>
              <div>
                <strong style={{ fontSize: '1rem', color: '#ffffff' }}>{userName}</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-cyan)', fontFamily: 'var(--font-mono)' }}>
                  Clearance: LEVEL-5 (COMMAND &amp; DISPATCH)
                </div>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Switch Simulated RBAC Role
              </label>
              <select
                value={userRole}
                onChange={(e) => {
                  setUserRole(e.target.value);
                  showToast(`Role switched to: ${e.target.value}`, 'info');
                }}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: 'rgba(8, 14, 28, 0.8)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#ffffff',
                  fontSize: '0.85rem'
                }}
              >
                {roles.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div style={{
              marginTop: 16,
              padding: '10px 12px',
              background: 'rgba(16, 28, 54, 0.6)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)'
            }}>
              <strong>Privilege Scope:</strong> Can authorize Cryo-Triage resolutions, override power load shedding, and sign offline synchronization batches.
            </div>
          </div>

          {/* Node Storage Info */}
          <div className="polaris-panel" style={{ padding: 20 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: 10 }}>
              Edge Node Storage (Bharati)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.78rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Local Database:</span>
                <strong style={{ color: '#ffffff' }}>SQLite 3.42 (WAL Mode)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Browser Cache:</span>
                <strong style={{ color: '#ffffff' }}>IndexedDB + ServiceWorker</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Cryptographic Hash:</span>
                <strong style={{ color: 'var(--text-cyan)', fontFamily: 'var(--font-mono)' }}>SHA-256 (Tamper-evident)</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tamper-Evident Audit Logs */}
        <div className="polaris-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                Immutable Audit Log Ledger
              </h3>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Certified chronological sequence of all operator actions and automated safety triggers
              </p>
            </div>
            <span className="badge badge-info">{auditLogs.length} LOGS</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {auditLogs.map(log => (
              <div
                key={log.id}
                style={{
                  background: 'rgba(8, 14, 28, 0.7)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 14px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-cyan)', fontWeight: 700 }}>
                      {log.id}
                    </span>
                    <strong style={{ fontSize: '0.84rem', color: '#ffffff' }}>{log.action}</strong>
                  </div>
                  <span className={`badge ${log.severity.includes('CRITICAL') ? 'badge-critical' : 'badge-warning'}`}>
                    {log.severity}
                  </span>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  {log.details}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 6,
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  borderTop: '1px solid rgba(56, 189, 248, 0.08)',
                  paddingTop: 4
                }}>
                  <span>Actor: <strong style={{ color: '#ffffff' }}>{log.actor}</strong></span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
