import React from 'react';
import { usePolaris } from '../../context/PolarisContext';
import { X, ShieldCheck, Cpu, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

export default function ExplainDecisionModal() {
  const { isExplainModalOpen, setIsExplainModalOpen } = usePolaris();

  if (!isExplainModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsExplainModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 740, padding: 24 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 14 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge badge-info">AI DECISION EXPLAINABILITY</span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-cyan)', fontFamily: 'var(--font-mono)' }}>
                MILP SOLVER ENGINE v2.4
              </span>
            </div>
            <h2 id="explain-modal-heading" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginTop: 4 }}>
              Why Was Resolution Plan A Selected?
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Deterministic constraint satisfaction and mission objective mathematical reasoning.
            </p>
          </div>

          <button
            onClick={() => setIsExplainModalOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Structured Explanation Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
          {/* Factor 1: Mission Priority & Irreplaceability */}
          <div style={{ background: 'rgba(8, 14, 28, 0.7)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8', fontWeight: 700, fontSize: '0.88rem' }}>
              <CheckCircle2 size={16} />
              <span>1. Scientific Heritage &amp; Irreplaceability Weighting</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.5 }}>
              The <strong>Paleoclimate Ice Cores (Freezer 1)</strong> represent a 120,000-year deep glacial record extracted over 15 seasons of Indian Antarctic Research at an estimated replacement cost exceeding ₹85 Crores. If thawed past -15°C, volatile atmospheric gas bubbles permanently escape. Hence, Freezer 1 carries the maximal objective weight ($\omega_1 = 0.65$).
            </p>
          </div>

          {/* Factor 2: TTCF vs Transfer Window */}
          <div style={{ background: 'rgba(8, 14, 28, 0.7)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8', fontWeight: 700, fontSize: '0.88rem' }}>
              <CheckCircle2 size={16} />
              <span>2. Time-to-Critical-Failure (TTCF) Feasibility Margin</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.5 }}>
              Freezer 1 has a TTCF of <strong>04h 12m</strong>. Moving samples to the Medical Wing Backup Freezer takes <strong>45 minutes</strong>, providing a comfortable safety buffer of <strong>3 hours 27 minutes</strong> before thermal threshold violation.
            </p>
          </div>

          {/* Factor 3: Power Budget Allocation */}
          <div style={{ background: 'rgba(8, 14, 28, 0.7)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8', fontWeight: 700, fontSize: '0.88rem' }}>
              <CheckCircle2 size={16} />
              <span>3. Battery Alpha Longevity (72h Extension)</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.5 }}>
              Deploying <strong>Portable Battery Alpha (48 kWh)</strong> exclusively to <strong>Freezer 2 (Marine Microbes)</strong> provides exactly 72 hours of uninterrupted refrigeration. Coupled with the 11h 45m passive TTCF, this bridges the 96-hour blizzard delay until AL-77 fuel resupply arrives.
            </p>
          </div>

          {/* Factor 4: The Trade-off (Freezer 3 Deprioritization) */}
          <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-sm)', padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f87171', fontWeight: 700, fontSize: '0.88rem' }}>
              <AlertTriangle size={16} />
              <span>4. Calculated Sacrifice: Freezer 3 Food Inventory</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#fca5a5', marginTop: 6, lineHeight: 1.5 }}>
              Station logistics verify <strong>1,200 packaged MRE dry-rations</strong> are in stock (90-day survival buffer). Sacrificing perishable meat/vegetables eliminates 0 human safety risk while saving both irreplaceable scientific missions. Naive battery-sharing (Plan B) would deplete all power in 6 hours, destroying all three assets.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <button onClick={() => setIsExplainModalOpen(false)} className="btn btn-secondary" style={{ padding: '8px 18px' }}>
            Close Explanation
          </button>
        </div>
      </div>
    </div>
  );
}
