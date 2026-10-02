import React from 'react';
import { PolarisProvider, usePolaris } from './context/PolarisContext';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import MobileNav from './components/common/MobileNav';
import Toast from './components/common/Toast';

// Screens
import LoginView from './components/login/LoginView';
import Dashboard from './components/dashboard/Dashboard';
import CargoList from './components/cargo/CargoList';
import CargoDetails from './components/cargo/CargoDetails';
import DependencyCascade from './components/cascade/DependencyCascade';
import CryoTriage from './components/cryo/CryoTriage';
import UpdatedStateView from './components/cryo/UpdatedStateView';
import StationLocalNode from './components/localNode/StationLocalNode';
import SyncCenter from './components/sync/SyncCenter';
import MissionsList from './components/missions/MissionsList';
import InventoryList from './components/inventory/InventoryList';
import PersonnelList from './components/personnel/PersonnelList';
import AssetsList from './components/assets/AssetsList';
import RiskOptimization from './components/risk/RiskOptimization';
import EmergencyResponse from './components/emergency/EmergencyResponse';
import PolarisMap from './components/maps/PolarisMap';
import ReportsView from './components/reports/ReportsView';
import SettingsView from './components/settings/SettingsView';
import ArchitectureView from './components/architecture/ArchitectureView';

function PolarisApp() {
  const { isAuthenticated, currentScreen, isMobilePreview } = usePolaris();

  if (!isAuthenticated) {
    return <LoginView />;
  }

  // Mobile Layout Container
  if (isMobilePreview) {
    return (
      <div style={{
        maxWidth: 440,
        margin: '20px auto',
        minHeight: '90vh',
        background: 'var(--bg-deep-space)',
        border: '8px solid #162649',
        borderRadius: 36,
        overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0,0,0,0.8), var(--shadow-glow-cyan)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        paddingBottom: 65
      }}>
        <Header />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {renderScreen(currentScreen)}
        </main>
        <MobileNav />
        <Toast />
      </div>
    );
  }

  // Desktop Command Center Layout
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content-area">
        <Header />
        <main style={{ flex: 1, paddingBottom: 40 }}>
          {renderScreen(currentScreen)}
        </main>
      </div>
      <Toast />
    </div>
  );
}

function renderScreen(screen) {
  switch (screen) {
    case 'dashboard':
      return <Dashboard />;
    case 'cargo':
      return <CargoList />;
    case 'cargo-detail':
      return <CargoDetails />;
    case 'cascade':
      return <DependencyCascade />;
    case 'cryo':
      return <CryoTriage />;
    case 'updated-state':
      return <UpdatedStateView />;
    case 'local-node':
      return <StationLocalNode />;
    case 'sync-center':
      return <SyncCenter />;
    case 'missions':
      return <MissionsList />;
    case 'inventory':
      return <InventoryList />;
    case 'personnel':
      return <PersonnelList />;
    case 'assets':
      return <AssetsList />;
    case 'risk':
      return <RiskOptimization />;
    case 'emergency':
      return <EmergencyResponse />;
    case 'maps':
      return (
        <div style={{ padding: '20px 24px' }}>
          <div style={{ marginBottom: 16 }}>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              Antarctica Expedition Operations Map
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Interactive Polar Stereographic Cartographic Viewer &bull; Real-time GPS &amp; Weather Overlays
            </p>
          </div>
          <PolarisMap height={620} showControls={true} />
        </div>
      );
    case 'reports':
      return <ReportsView />;
    case 'settings':
      return <SettingsView />;
    case 'architecture':
      return <ArchitectureView />;
    default:
      return <Dashboard />;
  }
}

export default function App() {
  return (
    <PolarisProvider>
      <PolarisApp />
    </PolarisProvider>
  );
}
