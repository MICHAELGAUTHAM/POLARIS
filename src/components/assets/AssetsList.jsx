import React, { useState } from 'react';
import { usePolaris } from '../../context/PolarisContext';
import {
  Cpu,
  Search,
  Filter,
  Zap,
  Snowflake,
  Truck,
  Radio,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export default function AssetsList() {
  const { assetsList, setCurrentScreen, isPlanAuthorized } = usePolaris();

  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredAssets = assetsList.filter(asset => {
    if (activeCategory === 'FREEZERS' && asset.type !== 'Cryogenic Freezer' && asset.type !== 'Commercial Freezer') return false;
    if (activeCategory === 'GENERATORS' && asset.type !== 'Power Generator') return false;
    if (activeCategory === 'VEHICLES' && asset.type !== 'Vehicle') return false;
    return true;
  });

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-info">EQUIPMENT &amp; INFRASTRUCTURE</span>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              Station Assets &amp; Fleet Inventory
            </h1>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>
            Monitoring operational status, power draw, condition, and maintenance cycles.
          </p>
        </div>

        <button onClick={() => setCurrentScreen('cryo')} className="btn btn-cyan" style={{ fontSize: '0.82rem' }}>
          <Snowflake size={14} />
          <span>Launch Cryo-Triage Engine</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10 }}>
        {[
          { id: 'ALL', label: 'All Equipment' },
          { id: 'FREEZERS', label: 'Freezers & Cryo Vaults' },
          { id: 'GENERATORS', label: 'Generators & Power' },
          { id: 'VEHICLES', label: 'Vehicles & Tracked Snowcats' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`btn ${activeCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.78rem', padding: '6px 12px' }}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Assets Table */}
      <div className="polaris-panel" style={{ padding: 18 }}>
        <table className="polaris-table">
          <thead>
            <tr>
              <th>Asset ID</th>
              <th>Asset Name</th>
              <th>Type</th>
              <th>Station</th>
              <th>Power State</th>
              <th>Operating Condition</th>
              <th>Mission Linked</th>
              <th>Telemetry Update</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map(asset => {
              const isFreezer = asset.type.includes('Freezer');
              return (
                <tr key={asset.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--text-cyan)', fontSize: '0.82rem' }}>
                    {asset.id}
                  </td>
                  <td>
                    <strong style={{ color: '#ffffff', fontSize: '0.86rem' }}>{asset.name}</strong>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {asset.type}
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                    {asset.station}
                  </td>
                  <td style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: asset.powerState.includes('0 kW') ? '#f87171' : '#34d399' }}>
                    {isPlanAuthorized && isFreezer ? 'Emergency Power Active' : asset.powerState}
                  </td>
                  <td>
                    <span className={`badge ${
                      isPlanAuthorized && isFreezer
                        ? 'badge-healthy'
                        : asset.condition.includes('CRITICAL')
                        ? 'badge-critical'
                        : asset.condition.includes('DRIFT') || asset.condition.includes('AWAITING')
                        ? 'badge-warning'
                        : 'badge-healthy'
                    }`}>
                      {isPlanAuthorized && isFreezer ? 'STABILIZED' : asset.condition}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-cyan)' }}>
                    {asset.mission}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {asset.lastUpdate}
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
