import React from 'react';
import { usePolaris } from '../../context/PolarisContext';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  CheckCircle2,
  FileText,
  PieChart,
  HardDrive
} from 'lucide-react';

export default function ReportsView() {
  const { isPlanAuthorized, syncQueue } = usePolaris();

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-info">OPERATIONAL ANALYTICS</span>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              Reports &amp; Analytics Dossier
            </h1>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>
            Comprehensive expedition metrics, cryogenic risk mitigation logs, and offline sync performance.
          </p>
        </div>

        <button className="btn btn-secondary" style={{ fontSize: '0.82rem' }}>
          <Download size={14} />
          <span>Export MoES Regulatory PDF</span>
        </button>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid-cols-4">
        <div className="polaris-panel" style={{ padding: 16 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Mission Success Rate</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: 4 }}>98.4%</div>
        </div>
        <div className="polaris-panel" style={{ padding: 16 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Cryo Assets Saved</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: 4 }}>
            {isPlanAuthorized ? '94.8% Value' : '04h 12m TTCF'}
          </div>
        </div>
        <div className="polaris-panel" style={{ padding: 16 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Offline Events Logged</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fbbf24', marginTop: 4 }}>
            {syncQueue.length} Events
          </div>
        </div>
        <div className="polaris-panel" style={{ padding: 16 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Total Traverse Distance</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginTop: 4 }}>4,280 km</div>
        </div>
      </div>

      {/* Visual Chart Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Chart 1: Cargo Movement & Traverse Transit Times */}
        <div className="polaris-panel" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: 6 }}>
            Cargo Transit Velocity by Traverse Route
          </h3>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: 16 }}>
            Kilometers per day under blizzard weather friction
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                <span style={{ color: '#ffffff' }}>Cape Town &rarr; Novolazarevskaya Air Corridor</span>
                <strong style={{ color: '#34d399' }}>820 km/h (Nominal)</strong>
              </div>
              <div style={{ width: '100%', height: 8, background: 'rgba(56, 189, 248, 0.1)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '92%', height: '100%', background: '#10b981' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                <span style={{ color: '#ffffff' }}>Maitri &rarr; Bharati Overland PistenBully Traverse</span>
                <strong style={{ color: '#f87171' }}>0 km/h (Cat 4 Blizzard Stalled)</strong>
              </div>
              <div style={{ width: '100%', height: 8, background: 'rgba(56, 189, 248, 0.1)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '12%', height: '100%', background: '#ef4444' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                <span style={{ color: '#ffffff' }}>Ocean Vessel MV Vasiliy Golovnin</span>
                <strong style={{ color: '#38bdf8' }}>14 knots (Ice Belt Penetration)</strong>
              </div>
              <div style={{ width: '100%', height: 8, background: 'rgba(56, 189, 248, 0.1)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', background: '#0284c7' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Chart 2: Inventory Burn Rates */}
        <div className="polaris-panel" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: 6 }}>
            Station Consumables Burn Rate
          </h3>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: 16 }}>
            Days of autonomy remaining at load shed status
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                <span style={{ color: '#ffffff' }}>Emergency Packaged Dry Rations</span>
                <strong style={{ color: '#34d399' }}>90 Days Remaining</strong>
              </div>
              <div style={{ width: '100%', height: 8, background: 'rgba(56, 189, 248, 0.1)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: '#10b981' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                <span style={{ color: '#ffffff' }}>Turbine Jet A-1 Fuel Buffer</span>
                <strong style={{ color: '#f59e0b' }}>4.2 Days (Critically Low)</strong>
              </div>
              <div style={{ width: '100%', height: 8, background: 'rgba(56, 189, 248, 0.1)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '22%', height: '100%', background: '#f59e0b' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                <span style={{ color: '#ffffff' }}>Liquid Nitrogen (LN2) Reserve</span>
                <strong style={{ color: '#38bdf8' }}>14.5 Days (Boil-off: 2.2%/d)</strong>
              </div>
              <div style={{ width: '100%', height: 8, background: 'rgba(56, 189, 248, 0.1)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '60%', height: '100%', background: '#06b6d4' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
