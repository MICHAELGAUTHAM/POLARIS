import React from 'react';
import { usePolaris } from '../../context/PolarisContext';
import PolarisMap from '../maps/PolarisMap';
import {
  AlertTriangle,
  Compass,
  Boxes,
  Layers,
  Users,
  ArrowRight,
  Flame,
  Snowflake,
  ShieldCheck,
  Clock,
  ChevronRight,
  TrendingDown,
  RefreshCw,
  HardDrive
} from 'lucide-react';

export default function Dashboard() {
  const {
    setCurrentScreen,
    setSelectedCargoId,
    cargoList,
    missionsList,
    inventoryList,
    personnelList,
    cryoAssets,
    stationConnectivity,
    isPlanAuthorized
  } = usePolaris();

  const c421 = cargoList.find(c => c.id === 'C-421');

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Top Banner: Mandatory Killer Demo Alert Banner */}
      <div id="dashboard-crisis-banner" style={{
        background: isPlanAuthorized 
          ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.18) 0%, rgba(8, 14, 28, 0.8) 100%)'
          : 'linear-gradient(90deg, rgba(239, 68, 68, 0.22) 0%, rgba(8, 14, 28, 0.8) 100%)',
        border: isPlanAuthorized 
          ? '1px solid rgba(16, 185, 129, 0.5)'
          : '1px solid rgba(239, 68, 68, 0.5)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        boxShadow: isPlanAuthorized ? '0 0 20px rgba(16, 185, 129, 0.15)' : 'var(--shadow-glow-critical)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 8,
            background: isPlanAuthorized ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: isPlanAuthorized ? '1px solid #10b981' : '1px solid #ef4444'
          }}>
            {isPlanAuthorized ? (
              <ShieldCheck size={26} color="#34d399" />
            ) : (
              <AlertTriangle size={26} color="#f87171" className="pulse-critical" />
            )}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className={`badge ${isPlanAuthorized ? 'badge-healthy' : 'badge-critical'}`}>
                {isPlanAuthorized ? 'CRYO CRISIS RESOLVED' : 'HIGH PRIORITY LOGISTICS ALERT'}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                CARGO C-421 &bull; SCHIRMACHER PASS
              </span>
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginTop: 3 }}>
              {isPlanAuthorized
                ? 'Resolution Plan A Dispatched: Ice Cores & Microbes Protected at Bharati Station'
                : 'Cargo C-421 Delayed 7 Days — Generator Overhaul Blocked at Bharati Station'}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>
              {isPlanAuthorized
                ? 'Local Edge execution active. Station operations safeguarded during Cat 4 Blizzard.'
                : 'Traverse AL-77 also halted (96h). Single auxiliary generator at 92% load. 3 scientific missions threatened.'}
            </div>
          </div>
        </div>

        {/* Action Button: Start Killer Demo Flow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {!isPlanAuthorized ? (
            <button
              onClick={() => {
                setSelectedCargoId('C-421');
                setCurrentScreen('cargo-detail');
              }}
              className="btn btn-critical"
              style={{ padding: '10px 18px', fontSize: '0.85rem' }}
            >
              <span>Inspect Cargo &amp; Impact</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => setCurrentScreen('sync-center')}
              className="btn btn-cyan"
              style={{ padding: '10px 18px', fontSize: '0.85rem' }}
            >
              <span>Check Sync Center</span>
              <ArrowRight size={16} />
            </button>
          )}

          <button
            onClick={() => setCurrentScreen('cascade')}
            className="btn btn-secondary"
            style={{ padding: '10px 14px', fontSize: '0.85rem' }}
          >
            <Flame size={15} color="#f59e0b" />
            <span>Dependency Cascade</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid-cols-4">
        {/* KPI 1: Active Missions */}
        <div className="polaris-panel" style={{ padding: '16px 18px', cursor: 'pointer' }} onClick={() => setCurrentScreen('missions')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
              Active Missions
            </span>
            <Compass size={18} color="#38bdf8" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: 8, fontFamily: 'var(--font-display)' }}>
            4 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ 5 Total</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, fontSize: '0.74rem' }}>
            <span style={{ color: isPlanAuthorized ? '#34d399' : '#f87171', fontWeight: 600 }}>
              {isPlanAuthorized ? '0 Missions Critical' : '2 Missions At Risk'}
            </span>
            <span style={{ color: 'var(--text-muted)' }}>&bull; Bharati &amp; Maitri</span>
          </div>
        </div>

        {/* KPI 2: Total Cargo */}
        <div className="polaris-panel" style={{ padding: '16px 18px', cursor: 'pointer' }} onClick={() => setCurrentScreen('cargo')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
              In-Transit Cargo
            </span>
            <Boxes size={18} color="#06b6d4" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: 8, fontFamily: 'var(--font-display)' }}>
            1,420 <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>Tonnes</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, fontSize: '0.74rem' }}>
            <span style={{ color: '#fbbf24', fontWeight: 600 }}>2 Delayed</span>
            <span style={{ color: 'var(--text-muted)' }}>&bull; C-421 &amp; AL-77 Fuel</span>
          </div>
        </div>

        {/* KPI 3: Critical Inventory */}
        <div className="polaris-panel" style={{ padding: '16px 18px', cursor: 'pointer' }} onClick={() => setCurrentScreen('inventory')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
              Station Inventory
            </span>
            <Layers size={18} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: 8, fontFamily: 'var(--font-display)' }}>
            3,840 <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>SKUs</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, fontSize: '0.74rem' }}>
            <span style={{ color: '#f87171', fontWeight: 600 }}>1 Stockout (GF-200)</span>
            <span style={{ color: 'var(--text-muted)' }}>&bull; Jet A-1 at 4.2d buffer</span>
          </div>
        </div>

        {/* KPI 4: Personnel On Field */}
        <div className="polaris-panel" style={{ padding: '16px 18px', cursor: 'pointer' }} onClick={() => setCurrentScreen('personnel')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
              Personnel On Field
            </span>
            <Users size={18} color="#10b981" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: 8, fontFamily: 'var(--font-display)' }}>
            42 <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>Scientists/Ops</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, fontSize: '0.74rem' }}>
            <span style={{ color: '#34d399', fontWeight: 600 }}>100% Accounted</span>
            <span style={{ color: 'var(--text-muted)' }}>&bull; GPS Beacons Active</span>
          </div>
        </div>
      </div>

      {/* Main Section: Antarctica Operations Map */}
      <div className="polaris-panel" style={{ padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge badge-info">LIVE TELEMETRY</span>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
                EXPEDITION OPERATIONS MAP — EAST ANTARCTICA
              </h2>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 2 }}>
              Real-time spatial visualization of research stations, overland traverse convoys, blizzard zones, and telemetry.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setCurrentScreen('maps')}
              className="btn btn-secondary"
              style={{ fontSize: '0.78rem', padding: '6px 12px' }}
            >
              <span>Full Screen Map</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Map Canvas Component */}
        <PolarisMap height={440} showControls={true} />
      </div>

      {/* Two Column Section: Missions & In-Transit Cargo */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20 }}>
        {/* Left Column: Ongoing Missions */}
        <div className="polaris-panel" style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff' }}>
                Ongoing Expedition Missions
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Track progress and dependency status across Indian stations
              </p>
            </div>
            <button onClick={() => setCurrentScreen('missions')} className="btn btn-outline" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>
              View All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {missionsList.slice(0, 4).map(mission => (
              <div
                key={mission.id}
                style={{
                  background: 'rgba(8, 14, 28, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background 0.15s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-cyan)', fontWeight: 700 }}>
                      {mission.id}
                    </span>
                    <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>
                      {mission.name}
                    </strong>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                    Station: {mission.station} &bull; Lead: {mission.lead}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className={`badge ${
                    mission.status === 'STABILIZED'
                      ? 'badge-healthy'
                      : mission.status === 'AT_RISK'
                      ? 'badge-critical'
                      : mission.status === 'BLOCKED'
                      ? 'badge-warning'
                      : 'badge-info'
                  }`}>
                    {mission.status}
                  </span>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>
                    Progress: {mission.progress}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: In-Transit Cargo & Alerts */}
        <div className="polaris-panel" style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff' }}>
                Cargo &amp; Logistics Tracking
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Critical traverse supply shipments
              </p>
            </div>
            <button onClick={() => setCurrentScreen('cargo')} className="btn btn-outline" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>
              View Cargo
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {cargoList.slice(0, 3).map(cargo => {
              const isC421 = cargo.id === 'C-421';
              return (
                <div
                  key={cargo.id}
                  onClick={() => {
                    setSelectedCargoId(cargo.id);
                    setCurrentScreen('cargo-detail');
                  }}
                  style={{
                    background: isC421 ? 'rgba(239, 68, 68, 0.08)' : 'rgba(8, 14, 28, 0.6)',
                    border: isC421 ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: isC421 ? '#f87171' : 'var(--text-cyan)'
                      }}>
                        {cargo.id}
                      </span>
                      <strong style={{ fontSize: '0.84rem', color: '#ffffff' }}>
                        {cargo.description.length > 36 ? cargo.description.substring(0, 36) + '...' : cargo.description}
                      </strong>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 4 }}>
                      Location: {cargo.location.substring(0, 32)}...
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span className={`badge ${cargo.status === 'DELAYED' ? 'badge-critical' : 'badge-info'}`}>
                      {cargo.status === 'DELAYED' ? `+${cargo.delayDays || 4}d DELAY` : cargo.status}
                    </span>
                    <div style={{ fontSize: '0.72rem', color: isC421 ? '#f87171' : 'var(--text-muted)', marginTop: 4, fontWeight: isC421 ? 700 : 400 }}>
                      {isC421 ? 'Affects 3 Missions' : cargo.weight}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Cryo-Triage Teaser */}
          <div style={{
            marginTop: 14,
            padding: '12px 14px',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(2, 132, 199, 0.12) 100%)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Snowflake size={20} color="#22d3ee" />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
                  CRYO-TRIAGE Engine Status
                </div>
                <div style={{ fontSize: '0.72rem', color: '#bae6fd' }}>
                  {isPlanAuthorized ? 'Stabilization Plan Active &bull; Ice Cores Safe' : 'Ice Cores Threatened (TTCF: 04h 12m)'}
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentScreen('cryo')}
              className="btn btn-cyan"
              style={{ fontSize: '0.74rem', padding: '6px 12px' }}
            >
              Open Engine
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
