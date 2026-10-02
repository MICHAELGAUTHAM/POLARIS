import React, { useState } from 'react';
import { usePolaris } from '../../context/PolarisContext';
import {
  Layers,
  Search,
  AlertTriangle,
  ArrowRight,
  PlusCircle,
  BarChart2,
  PieChart,
  CheckCircle2,
  X
} from 'lucide-react';

export default function InventoryList() {
  const {
    inventoryList,
    selectedInventoryId,
    setSelectedInventoryId,
    setCurrentScreen,
    showToast
  } = usePolaris();

  const [activeTab, setActiveTab] = useState('ALL');
  const [procurementModalItem, setProcurementModalItem] = useState(null);

  const filteredItems = inventoryList.filter(item => {
    if (activeTab === 'CRITICAL' && item.status !== 'CRITICAL') return false;
    return true;
  });

  const handleCreateProcurement = (item) => {
    setProcurementModalItem(null);
    showToast(`Emergency Procurement Request created for ${item.name} via Cape Town Air Logistics!`, 'success');
  };

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-info">SUPPLY CHAIN &amp; WAREHOUSE</span>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              Station Inventory Management
            </h1>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>
            Stock tracking across Bharati, Maitri, and Dakshin Gangotri supply depots.
          </p>
        </div>

        <button
          onClick={() => {
            const gf = inventoryList.find(i => i.id === 'INV-GF200');
            setProcurementModalItem(gf);
          }}
          className="btn btn-primary"
          style={{ fontSize: '0.82rem' }}
        >
          <PlusCircle size={15} />
          <span>New Procurement Requisition</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid-cols-4">
        <div className="polaris-panel" style={{ padding: 16 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Total SKUs Monitored</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginTop: 4 }}>3,840 Items</div>
        </div>
        <div className="polaris-panel" style={{ padding: 16, borderColor: 'var(--border-critical)' }}>
          <div style={{ fontSize: '0.72rem', color: '#f87171', textTransform: 'uppercase' }}>Critical Stockouts</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f87171', marginTop: 4 }}>1 Item (GF-200)</div>
        </div>
        <div className="polaris-panel" style={{ padding: 16 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Fuel Reserve Days</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fbbf24', marginTop: 4 }}>4.2 Days (Jet A-1)</div>
        </div>
        <div className="polaris-panel" style={{ padding: 16 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Ration Stock Days</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: 4 }}>90 Days (MREs)</div>
        </div>
      </div>

      {/* Tabs Row */}
      <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10 }}>
        {[
          { id: 'ALL', label: 'All Inventory' },
          { id: 'CRITICAL', label: 'Critical Stockouts (GF-200)', count: '1' }
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

      {/* Inventory Table */}
      <div className="polaris-panel" style={{ padding: 18 }}>
        <table className="polaris-table">
          <thead>
            <tr>
              <th>Part No.</th>
              <th>Description</th>
              <th>Category</th>
              <th>Station</th>
              <th>Current Stock</th>
              <th>Min Buffer</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => {
              const isCrit = item.status === 'CRITICAL';
              return (
                <tr key={item.id} className={isCrit ? 'highlighted' : ''}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: isCrit ? '#f87171' : 'var(--text-cyan)', fontSize: '0.84rem' }}>
                    {item.partNo}
                  </td>
                  <td>
                    <strong style={{ color: '#ffffff', fontSize: '0.85rem' }}>{item.name}</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                      Impact: {item.shortageImpact}
                    </div>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {item.category}
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                    {item.station}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem', fontWeight: 700, color: isCrit ? '#f87171' : '#ffffff' }}>
                    {item.currentStock}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {item.minStock}
                  </td>
                  <td>
                    <span className={`badge ${isCrit ? 'badge-critical' : 'badge-healthy'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setProcurementModalItem(item)}
                      className="btn btn-outline"
                      style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                    >
                      <span>Procurement Request</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Procurement Request Modal */}
      {procurementModalItem && (
        <div className="modal-overlay" onClick={() => setProcurementModalItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 580, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 14 }}>
              <div>
                <span className="badge badge-critical">EMERGENCY REQUISITION</span>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginTop: 4 }}>
                  Create Procurement Request
                </h2>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Part No: {procurementModalItem.partNo} &bull; {procurementModalItem.name}
                </div>
              </div>
              <button onClick={() => setProcurementModalItem(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Requisition Quantity</label>
                <input
                  type="number"
                  defaultValue="4"
                  style={{ width: '100%', padding: '8px 12px', background: 'rgba(8, 14, 28, 0.8)', border: '1px solid var(--border-medium)', borderRadius: 6, color: '#ffffff', fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Expedited Carrier</label>
                <select style={{ width: '100%', padding: '8px 12px', background: 'rgba(8, 14, 28, 0.8)', border: '1px solid var(--border-medium)', borderRadius: 6, color: '#ffffff' }}>
                  <option>Next ALCI Air Cargo flight (Cape Town &rarr; Novolazarevskaya)</option>
                  <option>MV Vasiliy Golovnin Icebreaker</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Justification</label>
                <textarea
                  defaultValue="Critical generator rebuild requirement. Bharati station running on single generator without n+1 redundancy."
                  rows="3"
                  style={{ width: '100%', padding: '8px 12px', background: 'rgba(8, 14, 28, 0.8)', border: '1px solid var(--border-medium)', borderRadius: 6, color: '#ffffff', fontSize: '0.8rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20, borderTop: '1px solid var(--border-subtle)', paddingTop: 14 }}>
              <button onClick={() => setProcurementModalItem(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={() => handleCreateProcurement(procurementModalItem)} className="btn btn-primary">
                Submit Requisition
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
