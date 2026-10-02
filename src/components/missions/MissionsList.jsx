import React, { useState } from 'react';
import { usePolaris } from '../../context/PolarisContext';
import {
  Compass,
  Search,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  Users,
  Cpu,
  GitFork,
  X
} from 'lucide-react';

export default function MissionsList() {
  const { missionsList, setCurrentScreen, setSelectedCargoId, isPlanAuthorized } = usePolaris();

  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedMission, setSelectedMission] = useState(null);

  const filteredMissions = missionsList.filter(m => {
    if (activeTab === 'AT_RISK' && m.status !== 'AT_RISK' && m.status !== 'BLOCKED') return false;
    if (activeTab === 'ACTIVE' && m.status !== 'ACTIVE' && m.status !== 'STABILIZED') return false;
    return true;
  });

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-info">OPERATIONS PLANNING</span>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              Expedition Missions
            </h1>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>
            Coordinated scientific research, traverse support, and station life-support operations.
          </p>
        </div>

        <button
          onClick={() => setCurrentScreen('cascade')}
          className="btn btn-secondary"
          style={{ fontSize: '0.8rem' }}
        >
          <GitFork size={14} color="#f59e0b" />
          <span>View Mission Dependency Cascade</span>
        </button>
      </div>

      {/* Tabs Row */}
      <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10 }}>
        {[
          { id: 'ALL', label: 'All Missions' },
          { id: 'ACTIVE', label: 'Active & Stabilized' },
          { id: 'AT_RISK', label: 'At Risk / Blocked' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.78rem', padding: '6px 12px' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Missions Table */}
      <div className="polaris-panel" style={{ padding: 18 }}>
        <table className="polaris-table">
          <thead>
            <tr>
              <th>Mission ID</th>
              <th>Mission Name</th>
              <th>Station</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Schedule</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMissions.map(m => (
              <tr key={m.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedMission(m)}>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--text-cyan)', fontSize: '0.84rem' }}>
                  {m.id}
                </td>
                <td>
                  <strong style={{ color: '#ffffff', fontSize: '0.86rem' }}>{m.name}</strong>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    Lead: {m.lead}
                  </div>
                </td>
                <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {m.station}
                </td>
                <td>
                  <span className={`badge ${
                    m.status === 'STABILIZED'
                      ? 'badge-healthy'
                      : m.status === 'AT_RISK'
                      ? 'badge-critical'
                      : m.status === 'BLOCKED'
                      ? 'badge-warning'
                      : 'badge-info'
                  }`}>
                    {m.status}
                  </span>
                </td>
                <td>
                  <span className={`badge ${m.priority === 'CRITICAL' ? 'badge-critical' : m.priority === 'HIGH' ? 'badge-warning' : 'badge-info'}`}>
                    {m.priority}
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {m.startDate} &rarr; {m.endDate}
                </td>
                <td style={{ width: 120 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, height: 6, background: 'rgba(56, 189, 248, 0.1)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${m.progress}%`, height: '100%', background: '#38bdf8' }} />
                    </div>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-cyan)' }}>
                      {m.progress}%
                    </span>
                  </div>
                </td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMission(m);
                    }}
                    className="btn btn-outline"
                    style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                  >
                    <span>Inspect</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mission Detail Drawer / Modal */}
      {selectedMission && (
        <div className="modal-overlay" onClick={() => setSelectedMission(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 680, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 14 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="badge badge-info">{selectedMission.id}</span>
                  <span className={`badge ${selectedMission.status === 'STABILIZED' ? 'badge-healthy' : 'badge-critical'}`}>
                    {selectedMission.status}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginTop: 6 }}>
                  {selectedMission.name}
                </h2>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Station: {selectedMission.station} &bull; Lead Scientist: {selectedMission.lead}
                </div>
              </div>

              <button onClick={() => setSelectedMission(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Objective</div>
                <div style={{ fontSize: '0.85rem', color: '#ffffff', marginTop: 3 }}>
                  {selectedMission.objective}
                </div>
              </div>

              <div style={{
                background: 'rgba(8, 14, 28, 0.8)',
                padding: 12,
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>
                  Dependencies &amp; Blockers
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {selectedMission.dependencies.map(dep => (
                    <span key={dep} className="badge badge-warning">
                      Dependency: {dep}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 14 }}>
                <button
                  onClick={() => {
                    setSelectedMission(null);
                    setCurrentScreen('cascade');
                  }}
                  className="btn btn-secondary"
                >
                  <GitFork size={14} />
                  <span>Inspect Cascade Graph</span>
                </button>
                <button
                  onClick={() => setSelectedMission(null)}
                  className="btn btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
