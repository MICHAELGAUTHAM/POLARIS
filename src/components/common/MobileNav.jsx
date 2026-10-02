import React from 'react';
import { usePolaris } from '../../context/PolarisContext';
import {
  LayoutDashboard,
  Compass,
  Boxes,
  Layers,
  Snowflake,
  ShieldAlert,
  Menu
} from 'lucide-react';

export default function MobileNav() {
  const { currentScreen, setCurrentScreen, isPlanAuthorized } = usePolaris();

  const tabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'missions', label: 'Missions', icon: Compass },
    { id: 'cargo', label: 'Cargo', icon: Boxes, badge: 'C-421' },
    { id: 'cryo', label: 'Cryo', icon: Snowflake, isFlagship: true, badge: isPlanAuthorized ? 'STABLE' : 'CRIT' },
    { id: 'emergency', label: 'Alerts', icon: ShieldAlert },
    { id: 'sync-center', label: 'Sync', icon: Menu }
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(8, 14, 28, 0.98)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid var(--border-medium)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '8px 4px',
      zIndex: 900
    }}>
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = currentScreen === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setCurrentScreen(tab.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: isActive ? '#38bdf8' : tab.isFlagship ? '#22d3ee' : 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px 8px',
              position: 'relative'
            }}
          >
            <Icon size={18} />
            <span style={{ fontSize: '0.68rem', fontWeight: isActive ? 700 : 500 }}>
              {tab.label}
            </span>
            {tab.badge && (
              <span style={{
                position: 'absolute',
                top: 0,
                right: 2,
                fontSize: '0.55rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                background: '#ef4444',
                color: '#fff',
                borderRadius: 4,
                padding: '1px 3px',
                lineHeight: 1
              }}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
