import React from 'react';
import { usePolaris } from '../../context/PolarisContext';
import { CheckCircle2, AlertTriangle, AlertOctagon, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = usePolaris();

  if (!toast.show) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={18} color="#34d399" />;
      case 'warning':
        return <AlertTriangle size={18} color="#fbbf24" />;
      case 'error':
        return <AlertOctagon size={18} color="#f87171" />;
      default:
        return <Info size={18} color="#38bdf8" />;
    }
  };

  const getBorder = () => {
    switch (toast.type) {
      case 'success':
        return 'rgba(16, 185, 129, 0.5)';
      case 'warning':
        return 'rgba(245, 158, 11, 0.5)';
      case 'error':
        return 'rgba(239, 68, 68, 0.5)';
      default:
        return 'rgba(56, 189, 248, 0.5)';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 9999,
      background: 'rgba(8, 14, 28, 0.95)',
      backdropFilter: 'blur(16px)',
      border: `1px solid ${getBorder()}`,
      borderRadius: 'var(--radius-md)',
      padding: '12px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
      maxWidth: 480,
      animation: 'scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      {getIcon()}
      <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>
        {toast.message}
      </div>
    </div>
  );
}
