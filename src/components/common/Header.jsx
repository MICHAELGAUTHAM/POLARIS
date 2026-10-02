import React from 'react';
import { usePolaris } from '../../context/PolarisContext';
import {
  Search,
  CloudSnow,
  WifiOff,
  Wifi,
  RefreshCw,
  Clock,
  ShieldCheck,
  ChevronDown,
  Smartphone,
  Monitor,
  Flame,
  Snowflake,
  RotateCcw,
  LogOut
} from 'lucide-react';

export default function Header() {
  const {
    stationConnectivity,
    setCurrentScreen,
    currentScreen,
    userName,
    userRole,
    setUserRole,
    simulatedTime,
    isMobilePreview,
    setIsMobilePreview,
    resetDemo,
    logout,
    isPlanAuthorized
  } = usePolaris();

  const formattedTime = simulatedTime.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

  return (
    <header style={{
      background: 'rgba(8, 14, 28, 0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '10px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      gap: 16
    }}>
      {/* Left: Search & Station Telemetry */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(16, 28, 54, 0.8)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '6px 12px',
          width: 250
        }}>
          <Search size={15} color="var(--text-muted)" style={{ marginRight: 8 }} />
          <input
            type="text"
            placeholder="Search missions, cargo, assets..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.82rem',
              width: '100%',
              fontFamily: 'var(--font-main)'
            }}
          />
        </div>

        {/* Live Weather / Environment Widget */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '4px 12px',
          background: 'rgba(16, 28, 54, 0.6)',
          border: '1px solid rgba(56, 189, 248, 0.1)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.78rem'
        }}>
          <CloudSnow size={15} color="#38bdf8" />
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Bharati: </span>
            <strong style={{ color: '#bae6fd' }}>-28°C</strong>
            <span style={{ color: 'var(--text-muted)', marginLeft: 6 }}>Wind: </span>
            <strong style={{ color: '#f59e0b' }}>42 kt (Blizzard Cat 4)</strong>
          </div>
        </div>
      </div>

      {/* Right: Connectivity, Simulated Tag, Clock, Role & Quick Flows */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Killer Demo Flow Navigator Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            onClick={() => setCurrentScreen('cascade')}
            className="btn btn-outline"
            style={{ fontSize: '0.75rem', padding: '4px 10px', height: 32 }}
            title="Jump to Dependency & Risk Cascade"
          >
            <Flame size={13} color="#f59e0b" />
            <span>Cascade</span>
          </button>

          <button
            onClick={() => setCurrentScreen('cryo')}
            className="btn btn-cyan"
            style={{ fontSize: '0.75rem', padding: '4px 10px', height: 32 }}
            title="Jump directly to Cryo-Triage Engine"
          >
            <Snowflake size={13} />
            <span>Cryo-Triage</span>
          </button>
        </div>

        {/* Connectivity Status Badge */}
        <div
          onClick={() => {
            if (stationConnectivity === 'OFFLINE') setCurrentScreen('local-node');
            else setCurrentScreen('sync-center');
          }}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            background: stationConnectivity === 'OFFLINE'
              ? 'rgba(239, 68, 68, 0.15)'
              : stationConnectivity === 'SYNCING'
              ? 'rgba(56, 189, 248, 0.2)'
              : 'rgba(16, 185, 129, 0.15)',
            border: `1px solid ${
              stationConnectivity === 'OFFLINE'
                ? 'rgba(239, 68, 68, 0.4)'
                : stationConnectivity === 'SYNCING'
                ? 'rgba(56, 189, 248, 0.5)'
                : 'rgba(16, 185, 129, 0.4)'
            }`,
            color: stationConnectivity === 'OFFLINE' ? '#f87171' : stationConnectivity === 'SYNCING' ? '#38bdf8' : '#34d399'
          }}
          title="Click to view Station Local Node & Sync Center"
        >
          {stationConnectivity === 'OFFLINE' ? (
            <>
              <WifiOff size={13} />
              <span>OFFLINE (LOCAL NODE)</span>
            </>
          ) : stationConnectivity === 'SYNCING' ? (
            <>
              <RefreshCw size={13} className="radar-sweep" />
              <span>SYNCING...</span>
            </>
          ) : (
            <>
              <Wifi size={13} />
              <span>CENTRAL CLOUD: SYNCED</span>
            </>
          )}
        </div>

        {/* Simulated Data Badge (Mandatory Requirement) */}
        <div className="badge badge-simulated" title="Operating with synthetic demo dataset for SIH26062">
          SIMULATED DATA
        </div>

        {/* Live Antarctica UTC Time */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.74rem',
          color: 'var(--text-secondary)',
          background: 'rgba(16, 28, 54, 0.6)',
          padding: '4px 8px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)'
        }}>
          <Clock size={13} color="var(--accent-ice)" />
          <span>{formattedTime}</span>
        </div>

        {/* Device Mode Toggle */}
        <button
          onClick={() => setIsMobilePreview(!isMobilePreview)}
          className="btn btn-secondary"
          style={{ padding: '6px 10px', height: 32, fontSize: '0.75rem' }}
          title={isMobilePreview ? 'Switch to Desktop View' : 'Preview Mobile Experience'}
        >
          {isMobilePreview ? <Monitor size={14} /> : <Smartphone size={14} />}
          <span>{isMobilePreview ? 'Desktop' : 'Mobile'}</span>
        </button>

        {/* Reset Demo Button */}
        <button
          onClick={resetDemo}
          className="btn btn-secondary"
          style={{ padding: '6px 8px', height: 32 }}
          title="Reset Demo to Initial State"
        >
          <RotateCcw size={13} />
        </button>

        {/* User Profile Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '4px 10px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(16, 28, 54, 0.8)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 800,
            color: '#fff'
          }}>
            MG
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              {userName}
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-cyan)', fontFamily: 'var(--font-mono)' }}>
              {userRole}
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={logout}
          className="btn btn-secondary"
          style={{ padding: '6px 8px', height: 32 }}
          title="Sign Out to Login Screen"
        >
          <LogOut size={13} color="#f87171" />
        </button>
      </div>
    </header>
  );
}
