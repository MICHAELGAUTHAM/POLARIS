import React, { useState } from 'react';
import { usePolaris } from '../../context/PolarisContext';
import {
  Layers,
  CloudSnow,
  Radio,
  Compass,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  MapPin,
  Crosshair,
  Truck,
  Ship,
  Snowflake
} from 'lucide-react';

export default function PolarisMap({ height = 480, showControls = true, interactive = true }) {
  const { setCurrentScreen, setSelectedCargoId, stationConnectivity, isPlanAuthorized } = usePolaris();

  // Layer toggles
  const [layers, setLayers] = useState({
    stations: true,
    routes: true,
    blizzard: true,
    cargo: true,
    personnel: true
  });

  const [activeTooltip, setActiveTooltip] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const toggleLayer = (layerKey) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  return (
    <div className="map-canvas-container" style={{ height, position: 'relative', width: '100%' }}>
      {/* Top Left: Map Telemetry Overlay */}
      <div style={{
        position: 'absolute',
        top: 14,
        left: 16,
        zIndex: 20,
        background: 'rgba(8, 14, 28, 0.85)',
        backdropFilter: 'blur(10px)',
        padding: '8px 14px',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-subtle)',
        fontSize: '0.74rem',
        fontFamily: 'var(--font-mono)'
      }}>
        <div style={{ color: 'var(--text-cyan)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Crosshair size={13} />
          <span>POLAR STEREOGRAPHIC GRID (70°S - 90°S)</span>
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', marginTop: 2 }}>
          Coverage: East Antarctica (Larsemann Hills &amp; Schirmacher Oasis)
        </div>
      </div>

      {/* Top Right: Layer Filter Bar */}
      {showControls && (
        <div style={{
          position: 'absolute',
          top: 14,
          right: 16,
          zIndex: 20,
          display: 'flex',
          gap: 6,
          background: 'rgba(8, 14, 28, 0.85)',
          backdropFilter: 'blur(10px)',
          padding: '6px 10px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={() => toggleLayer('stations')}
            className={`btn ${layers.stations ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '3px 8px', fontSize: '0.7rem', height: 26 }}
          >
            <MapPin size={12} />
            <span>Stations</span>
          </button>
          <button
            onClick={() => toggleLayer('routes')}
            className={`btn ${layers.routes ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '3px 8px', fontSize: '0.7rem', height: 26 }}
          >
            <Compass size={12} />
            <span>Traverses</span>
          </button>
          <button
            onClick={() => toggleLayer('blizzard')}
            className={`btn ${layers.blizzard ? 'btn-critical' : 'btn-secondary'}`}
            style={{ padding: '3px 8px', fontSize: '0.7rem', height: 26 }}
          >
            <CloudSnow size={12} />
            <span>Blizzard Cat 4</span>
          </button>
          <button
            onClick={() => toggleLayer('cargo')}
            className={`btn ${layers.cargo ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '3px 8px', fontSize: '0.7rem', height: 26 }}
          >
            <Truck size={12} />
            <span>Cargo C-421</span>
          </button>
        </div>
      )}

      {/* Main SVG Map Canvas */}
      <svg
        viewBox="0 0 1000 650"
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${zoomLevel})`,
          transition: 'transform 0.3s ease',
          transformOrigin: 'center center'
        }}
      >
        <defs>
          {/* Radial Gradient for Antarctica Ice Cap */}
          <radialGradient id="antarcticaGradient" cx="50%" cy="55%" r="45%">
            <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#0e2444" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#081426" stopOpacity="0.1" />
          </radialGradient>

          {/* Blizzard Hazard Gradient */}
          <radialGradient id="blizzardZone" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Polar Stereographic Grid Rings */}
        <circle cx="500" cy="350" r="280" fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="500" cy="350" r="210" fill="none" stroke="rgba(56, 189, 248, 0.12)" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="500" cy="350" r="140" fill="none" stroke="rgba(56, 189, 248, 0.16)" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="500" cy="350" r="70" fill="none" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" />
        
        {/* Polar Crosshairs */}
        <line x1="500" y1="50" x2="500" y2="620" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="1" strokeDasharray="2 4" />
        <line x1="150" y1="350" x2="850" y2="350" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="1" strokeDasharray="2 4" />

        {/* Continental Ice Mass Outline (Antarctica) */}
        <path
          d="M 320,170 Q 420,120 540,140 Q 670,160 760,240 Q 840,320 830,420 Q 820,500 730,550 Q 640,590 510,580 Q 400,580 320,530 Q 230,470 210,380 Q 190,290 240,220 Z"
          fill="url(#antarcticaGradient)"
          stroke="rgba(56, 189, 248, 0.35)"
          strokeWidth="1.5"
          filter="drop-shadow(0 0 12px rgba(6, 182, 212, 0.15))"
        />

        {/* Ice Shelf Details */}
        <path
          d="M 680,260 Q 720,290 750,330 Q 720,360 670,330 Z"
          fill="rgba(56, 189, 248, 0.08)"
          stroke="rgba(56, 189, 248, 0.25)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <text x="715" y="315" fill="rgba(148, 163, 184, 0.6)" fontSize="9" fontFamily="var(--font-mono)">
          Amery Ice Shelf
        </text>

        {/* Blizzard Hazard Zone Overlay */}
        {layers.blizzard && (
          <g>
            <circle cx="680" cy="270" r="100" fill="url(#blizzardZone)" />
            <circle cx="680" cy="270" r="100" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" className="pulse-critical" />
            <text x="680" y="225" textAnchor="middle" fill="#f87171" fontSize="11" fontFamily="var(--font-mono)" fontWeight="700">
              ⚠ CAT 4 BLIZZARD (96h TRAVERSE HALT)
            </text>
            <text x="680" y="240" textAnchor="middle" fill="#fbbf24" fontSize="9" fontFamily="var(--font-mono)">
              Winds: 58 kt | Visibility: 0m
            </text>
          </g>
        )}

        {/* Active Overland Traverses / Routes */}
        {layers.routes && (
          <g>
            {/* Maitri to Bharati Route */}
            <path
              d="M 380,240 Q 520,220 720,280"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="5 5"
              opacity="0.75"
            />
            {/* Cape Town Shipping Lane */}
            <path
              d="M 720,80 Q 710,180 720,280"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              opacity="0.6"
            />
            {/* Convoy AL-77 Stalled Route */}
            <path
              d="M 640,240 L 720,280"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeDasharray="3 3"
            />
          </g>
        )}

        {/* Indian Research Stations */}
        {layers.stations && (
          <g>
            {/* 1. BHARATI STATION (Larsemann Hills) */}
            <g
              transform="translate(720, 280)"
              style={{ cursor: 'pointer' }}
              onClick={() => setCurrentScreen('local-node')}
              onMouseEnter={() => setActiveTooltip('bharati')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              {/* Outer pulsing ring */}
              <circle
                r="18"
                fill="none"
                stroke={stationConnectivity === 'OFFLINE' ? '#ef4444' : '#10b981'}
                strokeWidth="1.5"
                strokeDasharray="3 3"
                className="radar-sweep"
              />
              <circle
                r="9"
                fill={stationConnectivity === 'OFFLINE' ? '#ef4444' : '#10b981'}
                stroke="#ffffff"
                strokeWidth="2"
                filter="drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))"
              />
              <rect x="-65" y="14" width="130" height="22" rx="4" fill="rgba(8, 14, 28, 0.9)" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1" />
              <text x="0" y="29" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="var(--font-display)" fontWeight="700">
                BHARATI STATION
              </text>
              <text x="0" y="48" textAnchor="middle" fill={stationConnectivity === 'OFFLINE' ? '#f87171' : '#34d399'} fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">
                {stationConnectivity === 'OFFLINE' ? '● OFFLINE / CRYO CRISIS' : '● STABILIZED / SYNCED'}
              </text>
            </g>

            {/* 2. MAITRI STATION (Schirmacher Oasis) */}
            <g
              transform="translate(380, 240)"
              style={{ cursor: 'pointer' }}
              onClick={() => setCurrentScreen('missions')}
              onMouseEnter={() => setActiveTooltip('maitri')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <circle r="7" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
              <rect x="-55" y="12" width="110" height="18" rx="4" fill="rgba(8, 14, 28, 0.9)" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" />
              <text x="0" y="25" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="var(--font-display)" fontWeight="600">
                MAITRI STATION
              </text>
              <text x="0" y="42" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="var(--font-mono)">
                ● NOMINAL (360 kVA)
              </text>
            </g>

            {/* 3. DAKSHIN GANGOTRI (Supply Depot) */}
            <g transform="translate(395, 195)" style={{ cursor: 'pointer' }}>
              <circle r="5" fill="#64748b" stroke="#ffffff" strokeWidth="1.5" />
              <text x="0" y="-10" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="var(--font-mono)">
                Dakshin Gangotri Depot
              </text>
            </g>

            {/* South Pole (Amundsen-Scott) */}
            <g transform="translate(500, 350)">
              <circle r="4" fill="#a855f7" />
              <text x="0" y="14" textAnchor="middle" fill="rgba(168, 85, 247, 0.7)" fontSize="8" fontFamily="var(--font-mono)">
                South Pole 90°S
              </text>
            </g>
          </g>
        )}

        {/* Cargo Markers & Stalled Convoys */}
        {layers.cargo && (
          <g>
            {/* Cargo C-421 Alert Marker */}
            <g
              transform="translate(620, 220)"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setSelectedCargoId('C-421');
                setCurrentScreen('cargo-detail');
              }}
            >
              <circle r="12" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1.5" className="pulse-critical" />
              <circle r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
              <rect x="-55" y="-30" width="110" height="22" rx="4" fill="rgba(153, 27, 27, 0.95)" stroke="#ef4444" strokeWidth="1" />
              <text x="0" y="-16" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">
                ⚠ C-421 DELAYED
              </text>
            </g>

            {/* Supply Vessel MV Vasiliy Golovnin in Pack Ice */}
            <g transform="translate(710, 110)">
              <rect x="-8" y="-4" width="16" height="8" rx="2" fill="#06b6d4" />
              <text x="0" y="14" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="var(--font-mono)">
                MV Vasiliy Golovnin (Ship)
              </text>
            </g>
          </g>
        )}
      </svg>

      {/* Bottom Zoom & View Controls */}
      {showControls && (
        <div style={{
          position: 'absolute',
          bottom: 14,
          right: 16,
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 6
        }}>
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))}
            className="btn btn-secondary"
            style={{ width: 32, height: 32, padding: 0 }}
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
            className="btn btn-secondary"
            style={{ width: 32, height: 32, padding: 0 }}
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
        </div>
      )}

      {/* Bottom Legend */}
      <div style={{
        position: 'absolute',
        bottom: 14,
        left: 16,
        zIndex: 20,
        background: 'rgba(8, 14, 28, 0.85)',
        backdropFilter: 'blur(10px)',
        padding: '6px 12px',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        gap: 16,
        fontSize: '0.7rem',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
          <span>Critical / Delayed</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
          <span>Operational Station</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 14, height: 2, background: '#38bdf8' }} />
          <span>Overland Traverse</span>
        </div>
      </div>
    </div>
  );
}
