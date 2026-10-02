import React, { useState } from 'react';
import { usePolaris } from '../../context/PolarisContext';
import PolarisMap from '../maps/PolarisMap';
import {
  ArrowLeft,
  AlertTriangle,
  Boxes,
  Truck,
  Clock,
  Compass,
  GitFork,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  MapPin,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function CargoDetails() {
  const {
    selectedCargoId,
    cargoList,
    missionsList,
    setCurrentScreen,
    setSelectedCargoId
  } = usePolaris();

  const [activeTab, setActiveTab] = useState('impact');

  const cargo = cargoList.find(c => c.id === (selectedCargoId || 'C-421')) || cargoList[0];
  const affectedMissions = missionsList.filter(m => cargo.linkedMissions && cargo.linkedMissions.includes(m.id));

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Top Breadcrumb & Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => setCurrentScreen('cargo')}
            className="btn btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.78rem' }}
          >
            <ArrowLeft size={14} />
            <span>All Cargo</span>
          </button>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-cyan)', fontWeight: 700 }}>
            {cargo.id}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>&bull;</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {cargo.description}
          </span>
        </div>

        {/* Primary CTA from README: VIEW DEPENDENCY IMPACT */}
        <button
          onClick={() => setCurrentScreen('cascade')}
          className="btn btn-critical"
          style={{ padding: '10px 20px', fontSize: '0.88rem', fontWeight: 700 }}
        >
          <GitFork size={16} />
          <span>VIEW DEPENDENCY IMPACT</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Main Cargo Header Panel */}
      <div className="polaris-panel critical" style={{ padding: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span className="badge badge-critical" style={{ fontSize: '0.75rem' }}>
                DELAYED — 7 DAYS
              </span>
              <span className="badge badge-warning">
                PRIORITY: {cargo.priority}
              </span>
              <span className="badge badge-info">
                AFFECTED MISSIONS: {cargo.affectedMissionsCount}
              </span>
            </div>

            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
              {cargo.id} — {cargo.description}
            </h1>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: 4, maxWidth: 750 }}>
              {cargo.riskImpact}
            </p>
          </div>

          {/* Quick Metrics Badge Card */}
          <div style={{
            background: 'rgba(8, 14, 28, 0.8)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 18px',
            display: 'flex',
            gap: 20
          }}>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Weight</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>{cargo.weight}</div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: 18 }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Current Location</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f87171' }}>Schirmacher Oasis Pass</div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: 18 }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Revised ETA</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24', fontFamily: 'var(--font-mono)' }}>{cargo.etaRevised}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div style={{ display: 'flex', gap: 10, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10 }}>
        {[
          { id: 'impact', label: 'Affected Missions & Impact' },
          { id: 'timeline', label: 'Tracking Timeline' },
          { id: 'items', label: 'Bill of Materials & Specs' },
          { id: 'risk', label: 'Risk Analysis' },
          { id: 'optimization', label: 'Optimization Options' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.8rem', padding: '7px 14px' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Affected Missions & Dependency Impact */}
      {activeTab === 'impact' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20 }}>
          {/* Affected Missions List */}
          <div className="polaris-panel" style={{ padding: 18 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: 12 }}>
              Directly Threatened Missions ({affectedMissions.length})
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
              Failure or delay of C-421 compromises the following scheduled polar operations at Bharati Station:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {affectedMissions.map(m => (
                <div
                  key={m.id}
                  style={{
                    background: 'rgba(8, 14, 28, 0.7)',
                    border: '1px solid var(--border-critical)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '14px 16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#f87171' }}>
                        {m.id}
                      </span>
                      <strong style={{ color: '#ffffff', fontSize: '0.9rem' }}>
                        {m.name}
                      </strong>
                    </div>
                    <span className="badge badge-critical">{m.status}</span>
                  </div>

                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 6 }}>
                    {m.description}
                  </p>

                  <div style={{
                    marginTop: 10,
                    padding: '8px 10px',
                    background: 'rgba(239, 68, 68, 0.08)',
                    borderRadius: 4,
                    fontSize: '0.72rem',
                    color: '#fca5a5',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}>
                    <AlertTriangle size={13} color="#f87171" />
                    <span><strong>Cascade Consequence:</strong> Station generator offline &rarr; power load shedding &rarr; Cryo Freezers 1, 2, 3 powered down!</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Transition CTA */}
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <button
                onClick={() => setCurrentScreen('cascade')}
                className="btn btn-critical"
                style={{ width: '100%', padding: '12px', fontSize: '0.9rem', fontWeight: 700 }}
              >
                <GitFork size={18} />
                <span>Simulate Dependency Cascade &rarr;</span>
              </button>
            </div>
          </div>

          {/* Right Column: Route Map Snippet */}
          <div className="polaris-panel" style={{ padding: 18 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: 4 }}>
              Traverse Stoppage Location
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 12 }}>
              Convoy stalled at 70°45′S 11°44′E in Category 4 Blizzard
            </p>

            <PolarisMap height={320} showControls={false} />

            <div style={{
              marginTop: 14,
              padding: '10px 12px',
              background: 'rgba(16, 28, 54, 0.6)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.75rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: 'var(--text-muted)' }}>Assigned Carrier:</span>
                <strong style={{ color: '#ffffff' }}>{cargo.carrier}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Blizzard Wind Speed:</span>
                <strong style={{ color: '#f59e0b' }}>58 kt (Gusts to 72 kt)</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Tracking Timeline */}
      {activeTab === 'timeline' && (
        <div className="polaris-panel" style={{ padding: 22 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: 16 }}>
            Chronological Shipment Milestones
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, borderLeft: '2px solid var(--border-medium)', paddingLeft: 20, marginLeft: 10 }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-cyan)', fontFamily: 'var(--font-mono)' }}>2026-09-18 08:30 UTC</div>
              <strong style={{ color: '#ffffff', fontSize: '0.85rem' }}>Dispatched from NCPOR Goa Depot to Cape Town Air Freight</strong>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Customs cleared for Antarctic research payload.</div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-cyan)', fontFamily: 'var(--font-mono)' }}>2026-09-24 14:10 UTC</div>
              <strong style={{ color: '#ffffff', fontSize: '0.85rem' }}>Arrived at Cape Town International (CPT) Polar Hub</strong>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Transferred to ALCI Ilyushin Il-76TD-90VD cargo bay.</div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-cyan)', fontFamily: 'var(--font-mono)' }}>2026-09-29 19:40 UTC</div>
              <strong style={{ color: '#ffffff', fontSize: '0.85rem' }}>Landed at Novolazarevskaya / ALCI Blue Ice Airfield</strong>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Loaded onto PistenBully heavy overland traverse convoy 02.</div>
            </div>

            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
              <div style={{ fontSize: '0.72rem', color: '#f87171', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>2026-10-01 03:00 UTC &bull; INCIDENT</div>
              <strong style={{ color: '#ffffff', fontSize: '0.85rem' }}>Traverse Halted: Category 4 Blizzard En Route to Bharati</strong>
              <div style={{ fontSize: '0.76rem', color: '#fca5a5' }}>Zero visibility. Winds exceeding safety threshold. Convoy anchored with survival pods. 7-day delay declared.</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Bill of Materials & Specs */}
      {activeTab === 'items' && (
        <div className="polaris-panel" style={{ padding: 22 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: 12 }}>
            Bill of Materials (BOM) — Cargo Manifest C-421
          </h3>
          <table className="polaris-table">
            <thead>
              <tr>
                <th>Part No.</th>
                <th>Item Description</th>
                <th>Qty</th>
                <th>Weight</th>
                <th>Target Asset</th>
                <th>Criticality</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontFamily: 'var(--font-mono)' }}>GF-200</td>
                <td>High-Pressure Generator Fuel Filter Assembly</td>
                <td>4 Units</td>
                <td>48 kg</td>
                <td>Generator G-1</td>
                <td><span className="badge badge-critical">CRITICAL</span></td>
              </tr>
              <tr>
                <td style={{ fontFamily: 'var(--font-mono)' }}>TS-880-HP</td>
                <td>Turbine Ceramic High-Temperature Shaft Seals</td>
                <td>2 Sets</td>
                <td>12 kg</td>
                <td>Generator G-1</td>
                <td><span className="badge badge-critical">CRITICAL</span></td>
              </tr>
              <tr>
                <td style={{ fontFamily: 'var(--font-mono)' }}>ECU-V25</td>
                <td>Microprocessor Governor &amp; Load Controller</td>
                <td>1 Unit</td>
                <td>8 kg</td>
                <td>Power Grid Sync Bus</td>
                <td><span className="badge badge-warning">HIGH</span></td>
              </tr>
              <tr>
                <td style={{ fontFamily: 'var(--font-mono)' }}>LUB-SYN-POL</td>
                <td>Extreme Cold (-55°C) Synthetic Turbine Lubricant</td>
                <td>16 Drums</td>
                <td>772 kg</td>
                <td>Central Power Plant</td>
                <td><span className="badge badge-info">MEDIUM</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 4: Risk Analysis */}
      {activeTab === 'risk' && (
        <div className="polaris-panel" style={{ padding: 22 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: 12 }}>
            Multi-Tier Risk Assessment Matrix
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
            Automated POLARIS Risk Engine evaluated the operational propagation of this 7-day delay.
          </p>

          <div className="grid-cols-3">
            <div style={{ background: 'rgba(8, 14, 28, 0.8)', padding: 14, borderRadius: 6, border: '1px solid var(--border-critical)' }}>
              <div style={{ color: '#f87171', fontWeight: 700, fontSize: '0.85rem' }}>Tier 1: Power Infrastructure</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: 6 }}>
                Bharati Station running with 0% N+1 generator redundancy. Auxiliary G-2 generator operating at 92% load limit.
              </div>
            </div>

            <div style={{ background: 'rgba(8, 14, 28, 0.8)', padding: 14, borderRadius: 6, border: '1px solid var(--border-critical)' }}>
              <div style={{ color: '#f87171', fontWeight: 700, fontSize: '0.85rem' }}>Tier 2: Cryo Vault Hazard</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: 6 }}>
                Forced load-shedding drops power to Freezers 1, 2, 3. Exponential thermal warming threatens paleoclimate ice cores.
              </div>
            </div>

            <div style={{ background: 'rgba(8, 14, 28, 0.8)', padding: 14, borderRadius: 6, border: '1px solid var(--border-amber)' }}>
              <div style={{ color: '#fbbf24', fontWeight: 700, fontSize: '0.85rem' }}>Tier 3: Mission Derailment</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: 6 }}>
                M-102 (Ice Cores) &amp; M-103 (Marine Microbes) facing permanent data destruction without immediate intervention.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Optimization Options */}
      {activeTab === 'optimization' && (
        <div className="polaris-panel" style={{ padding: 22 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>
            AI Optimization Recommendations
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
            Recommended immediate intervention pathway:
          </p>

          <div style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid var(--border-bright)', borderRadius: 6, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ color: '#ffffff', fontSize: '0.92rem' }}>
                Resolution Plan A: Targeted Cryo-Triage &amp; Load Prioritization
              </strong>
              <span className="badge badge-healthy">OPTIMAL PATH</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#bae6fd', marginTop: 6 }}>
              Execute thermal preservation of Freezer 1 (Medical Wing Backup) and Freezer 2 (Portable Battery Alpha).
            </p>
            <div style={{ marginTop: 12 }}>
              <button onClick={() => setCurrentScreen('cryo')} className="btn btn-cyan">
                Launch Cryo-Triage Engine &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
