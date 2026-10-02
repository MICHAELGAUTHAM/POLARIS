import React from 'react';
import { usePolaris } from '../../context/PolarisContext';
import {
  LayoutDashboard,
  Compass,
  Boxes,
  Layers,
  Users,
  Cpu,
  GitFork,
  Snowflake,
  ShieldAlert,
  MapPin,
  HardDrive,
  RefreshCw,
  BarChart3,
  Settings,
  Workflow,
  Radio
} from 'lucide-react';

export default function Sidebar() {
  const {
    currentScreen,
    setCurrentScreen,
    stationConnectivity,
    syncQueue,
    isPlanAuthorized
  } = usePolaris();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'missions', label: 'Missions', icon: Compass, count: '5' },
    { id: 'cargo', label: 'Cargo Tracking', icon: Boxes, badge: 'C-421', badgeType: 'critical' },
    { id: 'inventory', label: 'Inventory', icon: Layers, badge: '1 Alert', badgeType: 'warning' },
    { id: 'personnel', label: 'Personnel', icon: Users, count: '42' },
    { id: 'assets', label: 'Assets & Fleet', icon: Cpu },
    { id: 'cascade', label: 'Dependency Cascade', icon: GitFork, isHighlight: true },
    { id: 'cryo', label: 'Cryo-Triage', icon: Snowflake, isFlagship: true, badge: isPlanAuthorized ? 'STABLE' : 'CRITICAL' },
    { id: 'risk', label: 'Risk & Optimization', icon: Radio },
    { id: 'emergency', label: 'Emergency Response', icon: ShieldAlert, badge: 'Active' },
    { id: 'maps', label: 'Expedition Maps', icon: MapPin },
    { id: 'local-node', label: 'Station Local Node', icon: HardDrive, badge: 'Bharati' },
    { id: 'sync-center', label: 'Sync Center', icon: RefreshCw, count: stationConnectivity === 'SYNCED' ? '0' : '5' },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings & Security', icon: Settings },
    { id: 'architecture', label: 'System Architecture', icon: Workflow }
  ];

  return (
    <aside style={{
      width: 250,
      background: 'rgba(8, 14, 28, 0.98)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      flexShrink: 0,
      userSelect: 'none'
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '20px 18px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}>
        {/* Polar Ice Compass Icon */}
        <div style={{
          width: 38,
          height: 38,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 16px rgba(6, 182, 212, 0.4)'
        }}>
          <Snowflake size={22} color="#ffffff" />
        </div>
        <div>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.08em',
            background: 'linear-gradient(180deg, #ffffff 0%, #bae6fd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            POLARIS
          </div>
          <div style={{
            fontSize: '0.62rem',
            color: 'var(--text-cyan)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase'
          }}>
            Polar Command Center
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id || 
            (item.id === 'cargo' && currentScreen === 'cargo-detail') ||
            (item.id === 'cryo' && currentScreen === 'updated-state');

          return (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                borderRadius: 'var(--radius-sm)',
                border: isActive
                  ? '1px solid var(--border-medium)'
                  : item.isFlagship
                  ? '1px solid rgba(6, 182, 212, 0.3)'
                  : '1px solid transparent',
                background: isActive
                  ? 'linear-gradient(90deg, rgba(2, 132, 199, 0.25) 0%, rgba(12, 21, 41, 0.4) 100%)'
                  : item.isFlagship
                  ? 'rgba(6, 182, 212, 0.08)'
                  : 'transparent',
                color: isActive ? '#ffffff' : item.isFlagship ? '#7dd3fc' : 'var(--text-secondary)',
                fontSize: '0.82rem',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'rgba(56, 189, 248, 0.08)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = item.isFlagship ? 'rgba(6, 182, 212, 0.08)' : 'transparent';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icon
                  size={16}
                  color={
                    isActive
                      ? '#38bdf8'
                      : item.isFlagship
                      ? '#22d3ee'
                      : item.isHighlight
                      ? '#f59e0b'
                      : 'var(--text-muted)'
                  }
                />
                <span>{item.label}</span>
              </div>

              {/* Badges / Counters */}
              {item.isFlagship && (
                <span style={{
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 6px',
                  borderRadius: 4,
                  fontWeight: 700,
                  background: isPlanAuthorized ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.25)',
                  color: isPlanAuthorized ? '#34d399' : '#f87171',
                  border: isPlanAuthorized ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid rgba(239, 68, 68, 0.5)'
                }}>
                  {item.badge}
                </span>
              )}

              {item.badge && !item.isFlagship && (
                <span className={`badge ${item.badgeType === 'critical' ? 'badge-critical' : 'badge-warning'}`} style={{ fontSize: '0.65rem', padding: '1px 5px' }}>
                  {item.badge}
                </span>
              )}

              {item.count && !item.badge && (
                <span style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer / Hackathon Metadata */}
      <div style={{
        padding: '14px 16px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(5, 8, 17, 0.8)',
        fontSize: '0.72rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <strong style={{ color: 'var(--text-primary)' }}>NCPOR | MoES</strong>
          <span style={{ color: 'var(--text-cyan)', fontFamily: 'var(--font-mono)' }}>SIH26062</span>
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', display: 'flex', justifyContent: 'space-between' }}>
          <span>Team: The Last Of Us</span>
          <span>v2.4-PROD</span>
        </div>
      </div>
    </aside>
  );
}
