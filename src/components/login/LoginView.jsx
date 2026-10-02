import React, { useState } from 'react';
import { usePolaris } from '../../context/PolarisContext';
import {
  Snowflake,
  Compass,
  Boxes,
  Layers,
  Users,
  Cpu,
  ShieldAlert,
  ArrowRight,
  Lock,
  UserCheck,
  AlertCircle,
  KeyRound
} from 'lucide-react';

export default function LoginView() {
  const { login, userRole, setUserRole, userName, setUserName } = usePolaris();

  const [inputUsername, setInputUsername] = useState('mgautham.ops');
  const [inputPassword, setInputPassword] = useState('polaris2026');
  const [loginError, setLoginError] = useState('');

  const featureTiles = [
    { title: 'Mission Planning', icon: Compass, desc: 'Expedition routes & traverse logistics' },
    { title: 'Cargo Tracking', icon: Boxes, desc: 'Polar cargo & delayed transit alerts' },
    { title: 'Inventory Management', icon: Layers, desc: 'Critical spares, fuel & rations' },
    { title: 'Personnel Movement', icon: Users, desc: 'Real-time GPS beacons & station duty' },
    { title: 'Asset Fleet Monitoring', icon: Cpu, desc: 'Generators, freezers & snowcats' },
    { title: 'Emergency Response', icon: ShieldAlert, desc: 'Incident command & Cryo-Triage' }
  ];

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!inputUsername.trim()) {
      setLoginError('Please enter your expedition username/service ID.');
      return;
    }

    const result = login(inputUsername, inputPassword, userRole);
    if (!result.success) {
      setLoginError(result.message);
    }
  };

  const handleAutoFill = () => {
    setInputUsername('mgautham.ops');
    setInputPassword('polaris2026');
    setUserRole('Station Commander');
    setLoginError('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      background: 'radial-gradient(ellipse at 70% 30%, #0d1e3d 0%, #050811 80%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Antarctic ice crystal glow in background */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        right: '-10%',
        width: '60vw',
        height: '60vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 65%)',
        pointerEvents: 'none'
      }} />

      {/* Main Two-Column Split Container */}
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: 1320,
        margin: '0 auto',
        padding: '30px 24px',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 40,
        zIndex: 10
      }}>
        {/* Left Column: Brand & Feature Tiles */}
        <div style={{ flex: '1 1 540px', maxWidth: 640 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 24px rgba(6, 182, 212, 0.45)'
            }}>
              <Snowflake size={30} color="#ffffff" />
            </div>
            <div>
              <h1 style={{
                fontSize: '2.4rem',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.08em',
                background: 'linear-gradient(180deg, #ffffff 0%, #bae6fd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1
              }}>
                POLARIS
              </h1>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-cyan)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
                NCPOR &bull; MINISTRY OF EARTH SCIENCES (MoES)
              </div>
            </div>
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.3 }}>
            Integrated Polar Expedition Logistics &amp; Asset Management System
          </h2>

          <div style={{
            margin: '14px 0 24px 0',
            padding: '10px 14px',
            background: 'rgba(56, 189, 248, 0.08)',
            borderLeft: '3px solid var(--accent-ice)',
            borderRadius: '0 6px 6px 0'
          }}>
            <strong style={{ fontSize: '0.85rem', color: '#bae6fd', letterSpacing: '0.05em', display: 'block' }}>
              PLAN. TRACK. OPTIMIZE. RESPOND.
            </strong>
            <span style={{ fontSize: '0.78rem', color: '#ffffff', fontWeight: 700 }}>
              KEEP MISSIONS MOVING.
            </span>
          </div>

          {/* 6 Feature Tiles Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 12
          }}>
            {featureTiles.map(tile => {
              const Icon = tile.icon;
              return (
                <div
                  key={tile.title}
                  style={{
                    background: 'rgba(16, 28, 54, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10
                  }}
                >
                  <Icon size={18} color="var(--accent-ice)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '0.82rem', color: '#ffffff', display: 'block' }}>
                      {tile.title}
                    </strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      {tile.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 18, fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            Problem Statement: SIH26062 &bull; Theme: Smart Automation &bull; Team: The Last Of Us (156265)
          </div>
        </div>

        {/* Right Column: Command Center Sign In Box */}
        <div style={{
          flex: '1 1 380px',
          maxWidth: 450,
          background: 'rgba(10, 18, 36, 0.94)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-command), var(--shadow-glow-cyan)',
          padding: 30
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span className="badge badge-info">OPERATOR PORTAL</span>
            <span className="badge badge-simulated">SIMULATED DATA</span>
          </div>

          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginTop: 4 }}>
            Command Center Sign In
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 14 }}>
            Enter your polar expedition credentials to access live station telemetry.
          </p>

          {/* Demo Credentials Helper Pill */}
          <div style={{
            background: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 12px',
            marginBottom: 16,
            fontSize: '0.75rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <KeyRound size={13} color="#38bdf8" />
                <strong style={{ color: '#ffffff' }}>Demo Credentials</strong>
              </div>
              <button
                type="button"
                onClick={handleAutoFill}
                style={{
                  background: 'rgba(56, 189, 248, 0.2)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  color: '#38bdf8',
                  borderRadius: 4,
                  padding: '2px 8px',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Auto-Fill
              </button>
            </div>
            <div style={{ color: 'var(--text-secondary)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>
              User: <span style={{ color: '#bae6fd' }}>mgautham.ops</span> &bull; Passcode: <span style={{ color: '#bae6fd' }}>polaris2026</span>
            </div>
          </div>

          {/* Error Message Alert */}
          {loginError && (
            <div id="login-error-message" style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #ef4444',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 12px',
              marginBottom: 14,
              fontSize: '0.76rem',
              color: '#f87171',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <AlertCircle size={15} style={{ flexShrink: 0 }} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
                Username / Service ID
              </label>
              <input
                type="text"
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  background: 'rgba(16, 28, 54, 0.8)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#ffffff',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
                Security Passcode
              </label>
              <input
                type="password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  background: 'rgba(16, 28, 54, 0.8)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#ffffff',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
                Expedition Clearance Role
              </label>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  background: 'rgba(16, 28, 54, 0.8)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#ffffff',
                  fontSize: '0.85rem'
                }}
              >
                <option value="Station Commander">Station Commander (Bharati Lead)</option>
                <option value="Lead Logistics Officer">Lead Logistics Officer</option>
                <option value="Chief Scientist">Chief Scientist (Cryo Lab)</option>
                <option value="Field Officer">Field Officer (Traverse Convoy)</option>
                <option value="Admin">Administrator (MoES Command)</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '11px',
                fontSize: '0.92rem',
                fontWeight: 700,
                marginTop: 6
              }}
            >
              <span>ACCESS POLARIS COMMAND</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div style={{
            marginTop: 16,
            textAlign: 'center',
            fontSize: '0.72rem',
            color: 'var(--text-muted)'
          }}>
            Protected under Ministry of Earth Sciences Polar Security Protocol
          </div>
        </div>
      </div>
    </div>
  );
}
