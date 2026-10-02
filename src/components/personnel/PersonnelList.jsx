import React, { useState } from 'react';
import { usePolaris } from '../../context/PolarisContext';
import PolarisMap from '../maps/PolarisMap';
import {
  Users,
  Search,
  Radio,
  MapPin,
  CheckCircle2,
  Clock,
  Shield,
  ArrowRight,
  X
} from 'lucide-react';

export default function PersonnelList() {
  const { personnelList } = usePolaris();
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = personnelList.filter(p => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q) || p.station.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-info">HUMAN RESOURCES &amp; SAFETY</span>
            <span className="badge badge-simulated">SIMULATED DATA</span>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              Expedition Personnel Roster
            </h1>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>
            Real-time tracking of scientist teams, field engineers, station commanders, and emergency responders.
          </p>
        </div>

        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(16, 28, 54, 0.8)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '6px 12px',
          width: 260
        }}>
          <Search size={15} color="var(--text-muted)" style={{ marginRight: 8 }} />
          <input
            type="text"
            placeholder="Search personnel by name, role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '0.82rem', width: '100%' }}
          />
        </div>
      </div>

      {/* KPIs */}
      <div className="grid-cols-4">
        <div className="polaris-panel" style={{ padding: 16 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Total Personnel</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginTop: 4 }}>42 Members</div>
        </div>
        <div className="polaris-panel" style={{ padding: 16 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Bharati Station</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-cyan)', marginTop: 4 }}>24 Personnel</div>
        </div>
        <div className="polaris-panel" style={{ padding: 16 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Maitri Station</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-cyan)', marginTop: 4 }}>18 Personnel</div>
        </div>
        <div className="polaris-panel" style={{ padding: 16 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>GPS Beacons Active</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: 4 }}>42 / 42 (100%)</div>
        </div>
      </div>

      {/* Two Column: Table & Map */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20 }}>
        {/* Personnel Table */}
        <div className="polaris-panel" style={{ padding: 18 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: 12 }}>
            Active Duty Roster
          </h3>

          <table className="polaris-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Station / Subsystem</th>
                <th>Status</th>
                <th>Last Ping</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(person => (
                <tr key={person.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedPerson(person)}>
                  <td>
                    <strong style={{ color: '#ffffff', fontSize: '0.85rem' }}>{person.name}</strong>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ID: {person.id}</div>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {person.role}
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-cyan)' }}>
                    {person.station} &bull; {person.location}
                  </td>
                  <td>
                    <span className="badge badge-healthy">
                      {person.status}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {person.lastCheckIn}
                  </td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPerson(person);
                      }}
                      className="btn btn-outline"
                      style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                    >
                      Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Map Preview */}
        <div className="polaris-panel" style={{ padding: 18 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: 4 }}>
            GPS Telemetry Grid
          </h3>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: 12 }}>
            Location pings transmitted via station RF beacons
          </p>
          <PolarisMap height={380} showControls={false} />
        </div>
      </div>

      {/* Personnel Profile Modal (Screen 9) */}
      {selectedPerson && (
        <div className="modal-overlay" onClick={() => setSelectedPerson(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 14 }}>
              <div>
                <span className="badge badge-info">{selectedPerson.clearance}</span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginTop: 4 }}>
                  {selectedPerson.name}
                </h2>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-cyan)' }}>
                  {selectedPerson.role} &bull; {selectedPerson.station}
                </div>
              </div>
              <button onClick={() => setSelectedPerson(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
              <div style={{ background: 'rgba(8, 14, 28, 0.8)', padding: 12, borderRadius: 6 }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>GPS Coordinates</div>
                <div style={{ fontSize: '0.9rem', color: '#ffffff', fontFamily: 'var(--font-mono)', marginTop: 2 }}>{selectedPerson.coordinates}</div>
              </div>

              <div style={{ background: 'rgba(8, 14, 28, 0.8)', padding: 12, borderRadius: 6 }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Assigned Mission</div>
                <div style={{ fontSize: '0.88rem', color: '#38bdf8', marginTop: 2 }}>{selectedPerson.currentMission}</div>
              </div>

              <div style={{ background: 'rgba(8, 14, 28, 0.8)', padding: 12, borderRadius: 6 }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Last Location Ping</div>
                <div style={{ fontSize: '0.85rem', color: '#34d399', marginTop: 2 }}>{selectedPerson.location} ({selectedPerson.lastCheckIn})</div>
              </div>
            </div>

            <div style={{ marginTop: 20, textAlign: 'right' }}>
              <button onClick={() => setSelectedPerson(null)} className="btn btn-primary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
