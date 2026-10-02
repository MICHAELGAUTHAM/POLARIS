import React, { useState } from 'react';
import { usePolaris } from '../../context/PolarisContext';
import { Clock, TrendingUp, AlertTriangle, Snowflake, ShieldCheck } from 'lucide-react';

export default function ThermalChart({ selectedAssetId = 'freezer-1' }) {
  const { cryoAssets, isPlanAuthorized } = usePolaris();
  const [activeAssetId, setActiveAssetId] = useState(selectedAssetId);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const asset = cryoAssets.find(a => a.id === activeAssetId) || cryoAssets[0];

  // SVG Chart Dimensions
  const width = 720;
  const height = 320;
  const padding = { top: 40, right: 60, bottom: 45, left: 65 };

  // Temperature Range (-90°C to +20°C)
  const minTemp = -90;
  const maxTemp = 20;

  // Time Range (0 to 14 Hours)
  const maxHours = 14;

  const scaleX = (hours) => padding.left + (hours / maxHours) * (width - padding.left - padding.right);
  const scaleY = (temp) => height - padding.bottom - ((temp - minTemp) / (maxTemp - minTemp)) * (height - padding.top - padding.bottom);

  // Generate Thermal Decay Curve Points: T(t) = T_amb - (T_amb - T_0) * exp(-t / tau)
  // Ambient indoor room temp = +18°C
  const ambient = 18;
  const points = [];
  const tau = activeAssetId === 'freezer-1' ? 6.5 : activeAssetId === 'freezer-2' ? 14.2 : 22.0;
  const startTemp = activeAssetId === 'freezer-1' ? -22.4 : activeAssetId === 'freezer-2' ? -78.1 : -18.0;

  for (let h = 0; h <= maxHours; h += 0.25) {
    let t = ambient - (ambient - startTemp) * Math.exp(-h / tau);
    // If plan is authorized, curve levels off or drops back into safe sub-zero!
    if (isPlanAuthorized && activeAssetId === 'freezer-1') {
      if (h > 0.75) t = -28.0; // Stabilized in Medical Vault
    }
    if (isPlanAuthorized && activeAssetId === 'freezer-2') {
      if (h > 0.3) t = -79.0; // Stabilized by Battery Alpha
    }
    points.push({ h, t, x: scaleX(h), y: scaleY(t) });
  }

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  // Critical Crossing Time (TTCF)
  const crossingHours = activeAssetId === 'freezer-1' ? 4.20 : activeAssetId === 'freezer-2' ? 11.75 : 28.1;
  const crossingX = scaleX(Math.min(crossingHours, maxHours));
  const crossingY = scaleY(asset.criticalThreshold);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Top Asset Switcher & Question Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        {/* The Big Question from README: HOW MUCH TIME REMAINS? */}
        <div style={{
          background: isPlanAuthorized ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          border: isPlanAuthorized ? '1px solid #10b981' : '1px solid #ef4444',
          borderRadius: 'var(--radius-sm)',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <Clock size={16} color={isPlanAuthorized ? '#34d399' : '#f87171'} />
          <strong style={{ fontSize: '0.85rem', color: '#ffffff', letterSpacing: '0.04em' }}>
            {isPlanAuthorized ? 'ASSETS PROTECTED — THERMAL EQUILIBRIUM RESTORED' : 'HOW MUCH TIME REMAINS BEFORE IRREVERSIBLE LOSS?'}
          </strong>
        </div>

        {/* Freezers Tab Selector */}
        <div style={{ display: 'flex', gap: 6 }}>
          {cryoAssets.map(a => (
            <button
              key={a.id}
              onClick={() => setActiveAssetId(a.id)}
              className={`btn ${activeAssetId === a.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.74rem', padding: '5px 10px' }}
            >
              <Snowflake size={12} />
              <span>{a.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas */}
      <div style={{ position: 'relative', width: '100%' }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{
            width: '100%',
            height: 'auto',
            background: 'rgba(8, 14, 28, 0.9)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)'
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = ((e.clientX - rect.left) / rect.width) * width;
            if (relX >= padding.left && relX <= width - padding.right) {
              const h = ((relX - padding.left) / (width - padding.left - padding.right)) * maxHours;
              const t = ambient - (ambient - startTemp) * Math.exp(-h / tau);
              setHoveredPoint({ x: relX, y: scaleY(t), h: h.toFixed(1), t: t.toFixed(1) });
            }
          }}
          onMouseLeave={() => setHoveredPoint(null)}
        >
          {/* Grid lines */}
          {[-80, -60, -40, -20, 0].map(temp => (
            <g key={temp}>
              <line
                x1={padding.left}
                y1={scaleY(temp)}
                x2={width - padding.right}
                y2={scaleY(temp)}
                stroke="rgba(56, 189, 248, 0.08)"
                strokeDasharray="3 3"
              />
              <text
                x={padding.left - 10}
                y={scaleY(temp) + 4}
                textAnchor="end"
                fill="var(--text-muted)"
                fontSize="10"
                fontFamily="var(--font-mono)"
              >
                {temp}°C
              </text>
            </g>
          ))}

          {/* Time hours grid */}
          {[0, 2, 4, 6, 8, 10, 12, 14].map(hour => (
            <g key={hour}>
              <line
                x1={scaleX(hour)}
                y1={padding.top}
                x2={scaleX(hour)}
                y2={height - padding.bottom}
                stroke="rgba(56, 189, 248, 0.08)"
                strokeDasharray="3 3"
              />
              <text
                x={scaleX(hour)}
                y={height - padding.bottom + 18}
                textAnchor="middle"
                fill="var(--text-muted)"
                fontSize="10"
                fontFamily="var(--font-mono)"
              >
                +{hour}h
              </text>
            </g>
          ))}

          {/* Axis Labels */}
          <text
            x={width / 2}
            y={height - 10}
            textAnchor="middle"
            fill="var(--text-secondary)"
            fontSize="11"
            fontFamily="var(--font-mono)"
            fontWeight="600"
          >
            ELAPSED TIME WITHOUT ACTIVE COOLING (HOURS)
          </text>

          <text
            x={-height / 2}
            y="20"
            textAnchor="middle"
            fill="var(--text-secondary)"
            fontSize="11"
            fontFamily="var(--font-mono)"
            fontWeight="600"
            transform="rotate(-90)"
          >
            TEMPERATURE (°C)
          </text>

          {/* Critical Threshold Line */}
          <line
            x1={padding.left}
            y1={scaleY(asset.criticalThreshold)}
            x2={width - padding.right}
            y2={scaleY(asset.criticalThreshold)}
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <text
            x={width - padding.right}
            y={scaleY(asset.criticalThreshold) - 8}
            textAnchor="end"
            fill="#f87171"
            fontSize="10"
            fontFamily="var(--font-mono)"
            fontWeight="700"
          >
            CRITICAL THRESHOLD: {asset.criticalThreshold}°C
          </text>

          {/* Thermal Decay Curve Path */}
          <path
            d={pathData}
            fill="none"
            stroke={isPlanAuthorized ? '#10b981' : '#f59e0b'}
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Critical Crossing Point Marker */}
          {!isPlanAuthorized && crossingHours <= maxHours && (
            <g transform={`translate(${crossingX}, ${crossingY})`}>
              <circle r="14" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1.5" className="pulse-critical" />
              <circle r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
              <rect x="-95" y="-36" width="190" height="24" rx="4" fill="rgba(153, 27, 27, 0.95)" stroke="#ef4444" strokeWidth="1" />
              <text x="0" y="-20" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="700">
                CRITICAL CROSSING: ~{crossingHours.toFixed(1)}h
              </text>
            </g>
          )}

          {/* Authorized Stabilized Safe Indicator */}
          {isPlanAuthorized && (
            <g transform={`translate(${scaleX(4)}, ${scaleY(-28)})`}>
              <rect x="-85" y="-20" width="170" height="26" rx="4" fill="rgba(6, 78, 59, 0.95)" stroke="#10b981" strokeWidth="1.5" />
              <text x="0" y="-3" textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="var(--font-mono)" fontWeight="700">
                ✓ STABILIZED IN VAULT
              </text>
            </g>
          )}

          {/* Live Hover Tooltip on SVG */}
          {hoveredPoint && (
            <g transform={`translate(${hoveredPoint.x}, ${hoveredPoint.y})`}>
              <circle r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
              <rect x="-45" y="-30" width="90" height="22" rx="4" fill="rgba(8, 14, 28, 0.95)" stroke="#38bdf8" strokeWidth="1" />
              <text x="0" y="-15" textAnchor="middle" fill="#bae6fd" fontSize="9.5" fontFamily="var(--font-mono)">
                +{hoveredPoint.h}h: {hoveredPoint.t}°C
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
