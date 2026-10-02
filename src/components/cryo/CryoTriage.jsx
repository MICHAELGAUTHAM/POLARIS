import React, { useState } from 'react';
import { usePolaris } from '../../context/PolarisContext';
import ThermalChart from './ThermalChart';
import OperatorApprovalModal from './OperatorApprovalModal';
import ExplainDecisionModal from './ExplainDecisionModal';
import {
  Snowflake,
  AlertTriangle,
  Clock,
  BatteryCharging,
  Cpu,
  Layers,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Zap,
  TrendingDown,
  Info,
  Sliders,
  HardDrive
} from 'lucide-react';

export default function CryoTriage() {
  const {
    cryoAssets,
    emergencyResources,
    setIsApprovalModalOpen,
    setIsExplainModalOpen,
    isPlanAuthorized,
    setCurrentScreen,
    stationConnectivity
  } = usePolaris();

  const [selectedAssetId, setSelectedAssetId] = useState('freezer-1');

  // Format seconds to HHh MMm SSs (safe against NaN, null, and edge cases)
  const formatTTCF = (seconds) => {
    if (typeof seconds !== 'number' || isNaN(seconds)) return '00h 00m 00s';
    if (seconds <= 0) return '00h 00m 00s (BREACHED)';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Top Title & Subtitle Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="badge badge-info">FLAGSHIP INNOVATION</span>
                <span className="badge badge-simulated">SIMULATED MODEL</span>
              </div>
              <h1 style={{
                fontSize: '1.6rem',
                fontWeight: 800,
                color: '#ffffff',
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.04em',
                lineHeight: 1.1,
                marginTop: 2
              }}>
                CRYO-TRIAGE
              </h1>
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-cyan)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
            Thermal-Decay-Aware Asset Protection Engine
          </div>
        </div>

        {/* Action Buttons: Explain Decision & Authorize Plan */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => setIsExplainModalOpen(true)}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem', padding: '9px 16px' }}
          >
            <HelpCircle size={16} />
            <span>EXPLAIN DECISION</span>
          </button>

          {!isPlanAuthorized ? (
            <button
              onClick={() => setIsApprovalModalOpen(true)}
              className="btn btn-critical pulse-critical"
              style={{ fontSize: '0.9rem', padding: '10px 22px', fontWeight: 700 }}
            >
              <ShieldAlert size={18} />
              <span>AUTHORIZE PLAN</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={() => setCurrentScreen('updated-state')}
              className="btn btn-primary"
              style={{ fontSize: '0.9rem', padding: '10px 22px', fontWeight: 700 }}
            >
              <ShieldCheck size={18} />
              <span>VIEW UPDATED STATE</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Crisis Context Callout Banner */}
      <div className="polaris-panel critical" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <AlertTriangle size={22} color="#f87171" className="pulse-critical" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <strong style={{ fontSize: '0.92rem', color: '#ffffff', letterSpacing: '0.04em' }}>
                CRISIS: BHARATI ICE CORE CRISIS
              </strong>
              <span className="badge badge-critical">ACTIVE INCIDENT</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 2 }}>
              ALCI Resupply Traverse AL-77 (10,000 L Jet A-1 Fuel) delayed 96 hours by Category 4 Blizzard at Schirmacher Oasis. Station power shed; laboratory refrigeration disabled.
            </div>
          </div>
        </div>

        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          Node: Bharati Local Engine (Offline Decoupled)
        </div>
      </div>

      {/* 3 Cryogenic Assets Cards Grid (Flagship Requirement) */}
      <div className="grid-cols-3">
        {cryoAssets.map(asset => {
          const isSelected = selectedAssetId === asset.id;
          const isCrit = asset.priority === 'CRITICAL';
          const isHigh = asset.priority === 'HIGH';

          return (
            <div
              key={asset.id}
              onClick={() => setSelectedAssetId(asset.id)}
              className={`polaris-panel ${isCrit && !isPlanAuthorized ? 'critical' : ''}`}
              style={{
                padding: 18,
                cursor: 'pointer',
                borderColor: isSelected ? 'var(--accent-ice)' : undefined,
                background: isSelected ? 'rgba(16, 28, 54, 0.95)' : undefined
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>
                  {asset.name}
                </span>
                <span className={`badge ${isCrit ? 'badge-critical' : isHigh ? 'badge-warning' : 'badge-info'}`}>
                  {asset.priority}
                </span>
              </div>

              <div style={{ fontSize: '0.84rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                {asset.content}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                {asset.scientificValue}
              </div>

              {/* Temperature & Threshold Metrics */}
              <div style={{
                marginTop: 14,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
                background: 'rgba(8, 14, 28, 0.7)',
                padding: 10,
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)'
              }}>
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Current Temp</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: asset.currentTemp > asset.criticalThreshold ? '#f87171' : '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                    {asset.currentTemp}°C
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Critical Limit</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f87171', fontFamily: 'var(--font-mono)' }}>
                    {asset.criticalThreshold}°C
                  </div>
                </div>
              </div>

              {/* Time-to-Critical-Failure (TTCF) Live Countdown Ticker */}
              <div style={{ marginTop: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                    Time-to-Critical-Failure (TTCF)
                  </div>
                  <Clock size={12} color={isPlanAuthorized ? '#34d399' : '#f87171'} />
                </div>

                <div
                  className={`ttcf-ticker ${isPlanAuthorized ? 'stabilized' : ''}`}
                  style={{ fontSize: '1.35rem', marginTop: 4 }}
                >
                  {isPlanAuthorized && asset.id === 'freezer-1'
                    ? 'TRANSFER ACTIVE (SAFE)'
                    : isPlanAuthorized && asset.id === 'freezer-2'
                    ? '+72h STABILIZED'
                    : isPlanAuthorized && asset.id === 'freezer-3'
                    ? 'DECAY PERMITTED'
                    : formatTTCF(asset.ttcfSeconds)}
                </div>
              </div>

              {/* Status Note */}
              <div style={{
                marginTop: 10,
                fontSize: '0.72rem',
                color: isPlanAuthorized ? '#34d399' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: 5
              }}>
                {isPlanAuthorized ? <CheckCircle2 size={12} color="#34d399" /> : <Info size={12} />}
                <span>{asset.transferStatus || asset.thermalRisk}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Section: Thermal Analysis Chart */}
      <div className="polaris-panel" style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge badge-info">PREDICTIVE PHYSICS</span>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
                THERMAL DECAY ANALYSIS — TEMPERATURE VS. TIME
              </h2>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 2 }}>
              Calibrated exponential warming curve: $T(t) = T_{"{amb}"} - (T_{"{amb}"} - T_0)e^{"{-t/\\tau}"}$ modeling ambient convective heat ingress.
            </p>
          </div>
        </div>

        <ThermalChart selectedAssetId={selectedAssetId} />
      </div>

      {/* Two Columns: Emergency Resources & Optimization Recommendation */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: 20 }}>
        {/* Left Column: Emergency Resources Available */}
        <div className="polaris-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                Station Emergency Resources
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Field inventory available for immediate tactical deployment
              </p>
            </div>
            <span className="badge badge-info">5 UNITS READY</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {emergencyResources.map(res => (
              <div
                key={res.id}
                style={{
                  background: 'rgba(8, 14, 28, 0.7)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 14px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>{res.name}</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                      {res.type} &bull; Capacity: <span style={{ color: 'var(--text-cyan)', fontFamily: 'var(--font-mono)' }}>{res.powerCapacity}</span>
                    </div>
                  </div>
                  <span className={`badge ${res.assignedStatus === 'UNASSIGNED' ? 'badge-info' : 'badge-healthy'}`}>
                    {res.assignedStatus}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 8,
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  borderTop: '1px solid rgba(56, 189, 248, 0.08)',
                  paddingTop: 6
                }}>
                  <span>Location: {res.location}</span>
                  <span>Travel: {res.travelTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Optimization Recommendation (Resolution Plan A) */}
        <div className="polaris-panel" style={{ padding: 20, border: '1px solid var(--border-bright)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="badge badge-healthy">AI RECOMMENDED PLAN</span>
                <span className="badge badge-simulated">OR-TOOLS MILP</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginTop: 4 }}>
                Resolution Plan A: Targeted Cryo-Decay Preservation
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Mission Value Saved</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                94.8%
              </div>
            </div>
          </div>

          {/* Action Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {/* Action 1 */}
            <div style={{
              background: 'rgba(8, 14, 28, 0.8)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: '#0284c7',
                  color: '#fff',
                  fontSize: '0.72rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800
                }}>
                  1
                </span>
                <strong style={{ fontSize: '0.86rem', color: '#ffffff' }}>
                  Move Ice Cores to Medical Wing Backup Freezer
                </strong>
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: 4, paddingLeft: 28 }}>
                Transfer Time: <strong>45 minutes</strong> &bull; Status: <span style={{ color: '#34d399', fontWeight: 600 }}>Safe within TTCF of 04h 12m (3h 27m margin)</span>
              </div>
            </div>

            {/* Action 2 */}
            <div style={{
              background: 'rgba(8, 14, 28, 0.8)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: '#0284c7',
                  color: '#fff',
                  fontSize: '0.72rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800
                }}>
                  2
                </span>
                <strong style={{ fontSize: '0.86rem', color: '#ffffff' }}>
                  Connect Portable Battery Alpha to Freezer 2
                </strong>
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: 4, paddingLeft: 28 }}>
                Expected survival extension: <strong style={{ color: '#38bdf8' }}>+72 hours</strong> (Bridges 96h blizzard fuel delay)
              </div>
            </div>

            {/* Action 3 */}
            <div style={{
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: '#b91c1c',
                  color: '#fff',
                  fontSize: '0.72rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800
                }}>
                  3
                </span>
                <strong style={{ fontSize: '0.86rem', color: '#ffffff' }}>
                  Allow Freezer 3 Food Inventory to Decay &amp; Redirect Rations
                </strong>
              </div>
              <div style={{ fontSize: '0.76rem', color: '#fca5a5', marginTop: 4, paddingLeft: 28 }}>
                Redirect personnel to secure 1,200 dry-ration MRE stores in Habitation Core. 0 human nutritional hazard.
              </div>
            </div>
          </div>

          {/* Key Objective Metrics Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 8,
            background: 'rgba(8, 14, 28, 0.6)',
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            textAlign: 'center',
            marginBottom: 16
          }}>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Power Used</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>42 kWh / 72</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Personnel Time</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>3.5 Man-Hrs</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Transfer Time</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#34d399', fontFamily: 'var(--font-mono)' }}>45 Mins</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Risk Reduction</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#34d399', fontFamily: 'var(--font-mono)' }}>-82%</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => setIsExplainModalOpen(true)}
              className="btn btn-secondary"
              style={{ flex: 1, padding: '10px' }}
            >
              <HelpCircle size={16} />
              <span>Explain Decision</span>
            </button>

            {!isPlanAuthorized ? (
              <button
                onClick={() => setIsApprovalModalOpen(true)}
                className="btn btn-critical pulse-critical"
                style={{ flex: 1.5, padding: '10px', fontWeight: 700 }}
              >
                <ShieldAlert size={16} />
                <span>AUTHORIZE PLAN &rarr;</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentScreen('updated-state')}
                className="btn btn-primary"
                style={{ flex: 1.5, padding: '10px', fontWeight: 700 }}
              >
                <ShieldCheck size={16} />
                <span>VIEW UPDATED STATE</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <OperatorApprovalModal />
      <ExplainDecisionModal />
    </div>
  );
}
