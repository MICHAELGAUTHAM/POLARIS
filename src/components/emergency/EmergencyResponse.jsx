import React, { useState } from 'react';
import { usePolaris } from '../../context/PolarisContext';
import {
  ShieldAlert,
  AlertTriangle,
  CloudSnow,
  Zap,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Snowflake,
  MapPin
} from 'lucide-react';

export default function EmergencyResponse() {
  const { setCurrentScreen, isPlanAuthorized } = usePolaris();
  const [activeTab, setActiveTab] = useState('ACTIVE_ALERTS');

  const alerts = [
    {
      id: 'EMERG-01',
      title: 'Category 4 Blizzard & Extreme Gale Force Winds',
      severity: 'CRITICAL',
      location: 'Schirmacher Oasis to Larsemann Hills corridor',
      detail: 'Winds 42-58 knots, visibility under 10 meters, whiteout conditions. External traverses halted.',
      action: 'Station Lockdown Protocol Active. Internal tunnel transit only.'
    },
    {
      id: 'EMERG-02',
      title: 'Traverse AL-77 Fuel Resupply Delay (10,000L Jet A-1)',
      severity: 'CRITICAL',
      location: 'Glacier Pass Sector 4',
      detail: 'Convoy halted 96 hours. Forces load shedding at Bharati Station.',
      action: 'Triggered Cryo-Triage Asset Protection Engine.'
    },
    {
      id: 'EMERG-03',
      title: 'Scientific Cryo Freezer Power Outage',
      severity: isPlanAuthorized ? 'STABILIZED' : 'CRITICAL',
      location: 'Bharati Science Lab 1',
      detail: 'Freezers 1, 2, 3 unpowered due to load shedding. Ice cores threatening irreversible thaw.',
      action: isPlanAuthorized ? 'Plan A Dispatched & Safeguarded.' : 'Immediate Operator Authorization Required.'
    }
  ];

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-critical">INCIDENT COMMAND SYSTEM</span>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              Emergency Operations Center
            </h1>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>
            Central incident dispatch for weather crises, logistical freezes, and life-support stabilization.
          </p>
        </div>

        <button onClick={() => setCurrentScreen('cryo')} className="btn btn-critical" style={{ fontSize: '0.82rem' }}>
          <Snowflake size={14} />
          <span>Go to Cryo-Triage Response &rarr;</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10 }}>
        {[
          { id: 'ACTIVE_ALERTS', label: 'Active Alerts & Incidents' },
          { id: 'CONTACTS', label: 'Emergency Contacts & Sat-Com' },
          { id: 'PLANS', label: 'Standard Operating Procedures (SOP)' }
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

      {/* Active Alerts List */}
      {activeTab === 'ACTIVE_ALERTS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {alerts.map(alert => (
            <div
              key={alert.id}
              className={`polaris-panel ${alert.severity === 'CRITICAL' ? 'critical' : ''}`}
              style={{ padding: 18 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className={`badge ${alert.severity === 'CRITICAL' ? 'badge-critical' : 'badge-healthy'}`}>
                      {alert.severity}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-cyan)', fontFamily: 'var(--font-mono)' }}>
                      {alert.id} &bull; {alert.location}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginTop: 4 }}>
                    {alert.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                    {alert.detail}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setCurrentScreen('maps')} className="btn btn-secondary" style={{ fontSize: '0.75rem' }}>
                    <MapPin size={13} />
                    <span>View Location</span>
                  </button>
                  <button onClick={() => setCurrentScreen('cryo')} className="btn btn-primary" style={{ fontSize: '0.75rem' }}>
                    <span>Launch Response</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>

              <div style={{
                marginTop: 12,
                padding: '8px 12px',
                background: 'rgba(8, 14, 28, 0.7)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.78rem',
                color: '#bae6fd'
              }}>
                <strong>Recommended Action:</strong> {alert.action}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Emergency Contacts Tab */}
      {activeTab === 'CONTACTS' && (
        <div className="polaris-panel" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: 14 }}>
            Emergency Communications Directory
          </h3>
          <div className="grid-cols-3">
            <div style={{ background: 'rgba(8, 14, 28, 0.7)', padding: 14, borderRadius: 6 }}>
              <div style={{ color: 'var(--text-cyan)', fontWeight: 700, fontSize: '0.85rem' }}>NCPOR Goa HQ Command</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                Sat-Phone: +8816 3144 8920 &bull; Iridium SBD: NCPOR-OPS-01
              </div>
            </div>
            <div style={{ background: 'rgba(8, 14, 28, 0.7)', padding: 14, borderRadius: 6 }}>
              <div style={{ color: 'var(--text-cyan)', fontWeight: 700, fontSize: '0.85rem' }}>Maitri Station Station Link</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                VHF Channel 16 / Sat-Link &bull; Officer: Dr. Rajesh Sharma
              </div>
            </div>
            <div style={{ background: 'rgba(8, 14, 28, 0.7)', padding: 14, borderRadius: 6 }}>
              <div style={{ color: 'var(--text-cyan)', fontWeight: 700, fontSize: '0.85rem' }}>ALCI Aviation Logistics (Cape Town)</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                Air Traffic Ops &bull; Polar Flight Desk: CPT-ALCI-76
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
