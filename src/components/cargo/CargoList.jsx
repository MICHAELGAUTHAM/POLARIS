import React, { useState } from 'react';
import { usePolaris } from '../../context/PolarisContext';
import {
  Boxes,
  Search,
  Filter,
  AlertTriangle,
  ArrowRight,
  Truck,
  Ship,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function CargoList() {
  const { cargoList, setCurrentScreen, setSelectedCargoId } = usePolaris();

  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCargo = cargoList.filter(cargo => {
    if (activeTab === 'DELAYED' && cargo.status !== 'DELAYED') return false;
    if (activeTab === 'IN_TRANSIT' && cargo.status !== 'IN_TRANSIT') return false;
    if (activeTab === 'AT_STATION' && cargo.status !== 'AT_STATION') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        cargo.id.toLowerCase().includes(q) ||
        cargo.description.toLowerCase().includes(q) ||
        cargo.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Title & Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-info">LOGISTICS &amp; TRANSIT</span>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              Cargo Tracking Manifest
            </h1>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>
            Real-time tracking of Antarctic resupply traverses, maritime cargo, and stationary stock.
          </p>
        </div>

        {/* Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(16, 28, 54, 0.8)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '6px 12px',
          width: 280
        }}>
          <Search size={15} color="var(--text-muted)" style={{ marginRight: 8 }} />
          <input
            type="text"
            placeholder="Filter cargo by ID, keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '0.82rem',
              width: '100%',
              fontFamily: 'var(--font-main)'
            }}
          />
        </div>
      </div>

      {/* Tabs Row */}
      <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10 }}>
        {[
          { id: 'ALL', label: 'All Cargo' },
          { id: 'DELAYED', label: 'Delayed (2 Alerts)', count: '2' },
          { id: 'IN_TRANSIT', label: 'In Transit' },
          { id: 'AT_STATION', label: 'At Station' }
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

      {/* Cargo Manifest Table */}
      <div className="polaris-panel" style={{ padding: 18 }}>
        <table className="polaris-table">
          <thead>
            <tr>
              <th>Cargo ID</th>
              <th>Description</th>
              <th>Status</th>
              <th>Location</th>
              <th>Weight</th>
              <th>ETA</th>
              <th>Target Station</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCargo.map(cargo => {
              const isC421 = cargo.id === 'C-421';
              return (
                <tr
                  key={cargo.id}
                  className={isC421 ? 'highlighted' : ''}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedCargoId(cargo.id);
                    setCurrentScreen('cargo-detail');
                  }}
                >
                  <td style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    color: isC421 ? '#f87171' : 'var(--text-cyan)',
                    fontSize: '0.84rem'
                  }}>
                    {cargo.id}
                  </td>
                  <td>
                    <strong style={{ color: '#ffffff', fontSize: '0.86rem' }}>
                      {cargo.description}
                    </strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      Category: {cargo.category}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${cargo.status === 'DELAYED' ? 'badge-critical' : cargo.status === 'IN_TRANSIT' ? 'badge-info' : 'badge-healthy'}`}>
                      {cargo.status === 'DELAYED' ? `+${cargo.delayDays || 4}d DELAYED` : cargo.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {cargo.location}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                    {cargo.weight}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: cargo.status === 'DELAYED' ? '#fbbf24' : '#ffffff' }}>
                    {cargo.etaRevised}
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-cyan)' }}>
                    {cargo.destinationStation}
                  </td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCargoId(cargo.id);
                        setCurrentScreen('cargo-detail');
                      }}
                      className="btn btn-outline"
                      style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                    >
                      <span>Details</span>
                      <ArrowRight size={12} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
