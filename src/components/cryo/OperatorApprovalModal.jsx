import React from 'react';
import { usePolaris } from '../../context/PolarisContext';
import {
  ShieldAlert,
  CheckCircle2,
  X,
  AlertTriangle,
  ArrowRight,
  UserCheck,
  Clock,
  ShieldCheck,
  Zap,
  Snowflake
} from 'lucide-react';

export default function OperatorApprovalModal() {
  const {
    isApprovalModalOpen,
    setIsApprovalModalOpen,
    authorizePlanA,
    canAuthorizePlan,
    userName,
    userRole,
    setUserRole,
    simulatedTime
  } = usePolaris();

  if (!isApprovalModalOpen) return null;

  const hasClearance = canAuthorizePlan ? canAuthorizePlan(userRole) : true;

  const currentFormattedTime = simulatedTime.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

  return (
    <div className="modal-overlay" onClick={() => setIsApprovalModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 660, padding: 24 }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 14 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge badge-critical">HUMAN-IN-THE-LOOP GOVERNANCE</span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-cyan)', fontFamily: 'var(--font-mono)' }}>
                NCPOR SAFETY PROTOCOL 4.2
              </span>
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginTop: 4 }}>
              Authorize Emergency Resolution?
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Executing operational intervention for Bharati Station Cryo-Triage Crisis.
            </p>
          </div>

          <button
            onClick={() => setIsApprovalModalOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Plan Summary Table / Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
          {/* Selected Plan */}
          <div style={{
            background: 'rgba(8, 14, 28, 0.7)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 14px'
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Selected Plan</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8', marginTop: 2 }}>
              Resolution Plan A: Targeted Cryo-Decay Preservation
            </div>
          </div>

          {/* Resources Allocated */}
          <div style={{
            background: 'rgba(8, 14, 28, 0.7)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 14px'
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>
              Resources To Be Allocated
            </div>
            <ul style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li><strong>Medical Wing Backup Freezer (-80°C):</strong> Reassigned to Paleoclimate Ice Cores.</li>
              <li><strong>Portable Battery Alpha (48 kWh):</strong> Connected directly to Freezer 2 compressor.</li>
              <li><strong>Logistics Team Alpha (2 Officers):</strong> Mobilized with thermal transfer sleds.</li>
            </ul>
          </div>

          {/* Affected Assets & Expected Outcome */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: 'rgba(8, 14, 28, 0.7)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Affected Assets</div>
              <div style={{ fontSize: '0.82rem', color: '#ffffff', marginTop: 3 }}>
                Freezer 1 (Safe) &bull; Freezer 2 (+72h) &bull; Freezer 3 (Decay Allowed)
              </div>
            </div>

            <div style={{ background: 'rgba(8, 14, 28, 0.7)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Expected Outcome</div>
              <div style={{ fontSize: '0.82rem', color: '#34d399', fontWeight: 700, marginTop: 3 }}>
                94.8% Mission Value Saved &bull; 0 Human Risk
              </div>
            </div>
          </div>

          {/* Operator Signature Block */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(16, 28, 54, 0.8)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 14px'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Authorized Operator</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <UserCheck size={16} color="#38bdf8" />
                <span>{userName} ({userRole})</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Timestamp</div>
              <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-cyan)', marginTop: 2 }}>
                {currentFormattedTime}
              </div>
            </div>
          </div>

          {/* Mandatory Warning Banner from README */}
          <div style={{
            background: hasClearance ? 'rgba(239, 68, 68, 0.12)' : 'rgba(245, 158, 11, 0.15)',
            border: `1px solid ${hasClearance ? 'rgba(239, 68, 68, 0.4)' : 'rgba(245, 158, 11, 0.5)'}`,
            borderRadius: 'var(--radius-sm)',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <ShieldAlert size={20} color={hasClearance ? '#f87171' : '#fbbf24'} style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.78rem', color: hasClearance ? '#fca5a5' : '#fde68a' }}>
              {hasClearance ? (
                <><strong>Notice:</strong> This action requires authorized operator approval. Autonomous or unattended execution is strictly prohibited under MoES Polar Safety Regulations.</>
              ) : (
                <><strong>RBAC Clearance Restriction:</strong> Role <em>{userRole}</em> is not cleared for emergency grid dispatch. Switch to <strong>Station Commander</strong> to authorize.</>
              )}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, borderTop: '1px solid var(--border-subtle)', paddingTop: 14 }}>
          {!hasClearance ? (
            <button
              onClick={() => setUserRole('Station Commander')}
              className="btn btn-outline"
              style={{ fontSize: '0.78rem' }}
            >
              Elevate Role to Station Commander
            </button>
          ) : <div />}

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => setIsApprovalModalOpen(false)}
              className="btn btn-secondary"
              style={{ padding: '8px 18px' }}
            >
              Cancel
            </button>

            <button
              onClick={() => authorizePlanA(userName)}
              className="btn btn-critical"
              style={{
                padding: '10px 24px',
                fontSize: '0.9rem',
                fontWeight: 700,
                opacity: hasClearance ? 1 : 0.45,
                cursor: hasClearance ? 'pointer' : 'not-allowed'
              }}
              disabled={!hasClearance}
            >
              <ShieldCheck size={16} />
              <span>Confirm Authorization</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
