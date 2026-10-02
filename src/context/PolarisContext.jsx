import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  STATIONS,
  INITIAL_CARGO,
  INITIAL_MISSIONS,
  INITIAL_INVENTORY,
  INITIAL_PERSONNEL,
  INITIAL_ASSETS,
  CRYO_ASSETS_DATA,
  EMERGENCY_RESOURCES,
  OPTIMIZATION_PLAN_A,
  INITIAL_SYNC_QUEUE,
  INITIAL_AUDIT_LOGS
} from '../data/mockData';

const PolarisContext = createContext();

export function PolarisProvider({ children }) {
  // Authentication & Profile
  const [isAuthenticated, setIsAuthenticated] = useState(true); // default true for immediate demo access
  const [userRole, setUserRole] = useState('Station Commander');
  const [userName, setUserName] = useState('Dr. Michael Gautham');
  
  // Navigation & Screen Control
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [selectedCargoId, setSelectedCargoId] = useState('C-421');
  const [selectedMissionId, setSelectedMissionId] = useState('M-102');
  const [selectedInventoryId, setSelectedInventoryId] = useState('INV-GF200');
  const [selectedPersonnelId, setSelectedPersonnelId] = useState('P-01');
  
  // Modals & Drawers
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isExplainModalOpen, setIsExplainModalOpen] = useState(false);
  const [isProcurementModalOpen, setIsProcurementModalOpen] = useState(false);
  
  // Mobile UI Toggle
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  
  // Demo State Machine
  const [killerDemoStep, setKillerDemoStep] = useState('INITIAL');
  // 'INITIAL' -> 'CARGO_VIEWED' -> 'CASCADE_VIEWED' -> 'CRYO_VIEWED' -> 'AUTHORIZED' -> 'OFFLINE_CHECKED' -> 'SYNCED'
  
  // Core Entities State
  const [cargoList, setCargoList] = useState(INITIAL_CARGO);
  const [missionsList, setMissionsList] = useState(INITIAL_MISSIONS);
  const [inventoryList, setInventoryList] = useState(INITIAL_INVENTORY);
  const [personnelList, setPersonnelList] = useState(INITIAL_PERSONNEL);
  const [assetsList, setAssetsList] = useState(INITIAL_ASSETS);
  const [cryoAssets, setCryoAssets] = useState(CRYO_ASSETS_DATA);
  const [emergencyResources, setEmergencyResources] = useState(EMERGENCY_RESOURCES);
  const [syncQueue, setSyncQueue] = useState(INITIAL_SYNC_QUEUE);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  
  // Connectivity & Station Local Node
  const [stationConnectivity, setStationConnectivity] = useState('OFFLINE'); // OFFLINE -> SYNCING -> SYNCED
  const [activeStation, setActiveStation] = useState('bharati');
  
  // Authorization State
  const [isPlanAuthorized, setIsPlanAuthorized] = useState(false);
  const [authorizedDetails, setAuthorizedDetails] = useState(null);
  
  // Toast System
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'info' });
    }, 4500);
  };

  // Login handler with credential check
  const login = (username, password, role) => {
    const validUser = username && username.trim().length > 0;
    // Accept demo passcode 'polaris2026' or 'admin'
    if (validUser && (password === 'polaris2026' || password === 'admin')) {
      setIsAuthenticated(true);
      if (role) setUserRole(role);
      setCurrentScreen('dashboard');
      showToast(`Welcome back, Commander. Authenticated into POLARIS Command Center.`, 'success');
      return { success: true };
    }
    return {
      success: false,
      message: 'Invalid credentials. Enter passcode: polaris2026'
    };
  };

  // Logout handler
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
    showToast('Signed out of POLARIS Command Center.', 'info');
  };

  // Add a new offline station event to the queue
  const addOfflineEvent = (eventTitle, entityName = 'Bharati Local Sensor') => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const newId = `SYNC-EVT-${(syncQueue.length + 1).toString().padStart(2, '0')}`;
    const newEvent = {
      id: newId,
      event: 'STATION_MANUAL_LOG',
      description: eventTitle || 'Manual station inspection logged offline',
      status: 'SAVED_LOCALLY',
      timestamp,
      entity: entityName,
      hash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`
    };

    setSyncQueue(prev => [newEvent, ...prev]);

    // Also add to audit log
    const newLog = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp,
      actor: userName,
      action: 'OFFLINE_EVENT_CREATED',
      details: eventTitle,
      severity: 'NORMAL'
    };
    setAuditLogs(prev => [newLog, ...prev]);

    showToast(`Offline Event ${newId} saved to local SQLite ledger!`, 'info');
  };

  // Live Simulated Antarctic Clock
  const [simulatedTime, setSimulatedTime] = useState(new Date('2026-10-02T17:25:00Z'));
  useEffect(() => {
    const timer = setInterval(() => {
      setSimulatedTime(prev => new Date(prev.getTime() + 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // TTCF countdown tick (deterministic)
  useEffect(() => {
    if (isPlanAuthorized) return; // Freeze or reset after resolution
    const countdownInterval = setInterval(() => {
      setCryoAssets(prev =>
        prev.map(asset => ({
          ...asset,
          ttcfSeconds: Math.max(0, (typeof asset.ttcfSeconds === 'number' && !isNaN(asset.ttcfSeconds)) ? asset.ttcfSeconds - 1 : 0)
        }))
      );
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, [isPlanAuthorized]);

  // Check RBAC clearance for plan authorization
  const canAuthorizePlan = (role = userRole) => {
    // Only Field Officer is restricted; Station Commander, Chief Scientist, Admin, Logistics Officer can authorize
    return role !== 'Field Officer';
  };

  // Handle Plan Authorization (The Killer Action!)
  const authorizePlanA = (operatorName = userName) => {
    if (!canAuthorizePlan(userRole)) {
      showToast(`Permission Denied: ${userRole} lacks Level-5 Command authorization. Switch to Station Commander or Admin.`, 'error');
      return;
    }

    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    setIsPlanAuthorized(true);
    setKillerDemoStep('AUTHORIZED');
    
    // Update Cryo Assets status
    setCryoAssets(prev =>
      prev.map(asset => {
        if (asset.id === 'freezer-1') {
          return {
            ...asset,
            state: 'SAFE_TRANSFER',
            statusLabel: 'SAFE / STABLE',
            thermalRisk: 'STABLE (Transfer to Medical Wing Vault in progress)',
            currentTemp: -24.1,
            transferStatus: 'Relocating to -80°C Backup Vault (ETA 35m)'
          };
        }
        if (asset.id === 'freezer-2') {
          return {
            ...asset,
            state: 'STABILIZED_BATTERY',
            statusLabel: 'STABILIZED',
            thermalRisk: 'STABILIZED (+72h runtime with Battery Alpha)',
            currentTemp: -79.5,
            transferStatus: 'Battery Alpha Active — 48 kWh Online'
          };
        }
        if (asset.id === 'freezer-3') {
          return {
            ...asset,
            state: 'DECAY_ALLOWED',
            statusLabel: 'LOW PRIORITY / DECAY ALLOWED',
            thermalRisk: 'DECAY PERMITTED (Mitigated by Dry Rations)',
            currentTemp: -12.4,
            transferStatus: 'Rations Rerouted to Habitation Core'
          };
        }
        return asset;
      })
    );

    // Update Missions list
    setMissionsList(prev =>
      prev.map(m => {
        if (m.id === 'M-102') {
          return { ...m, status: 'STABILIZED', riskLevel: 'RESOLVED_LOCAL' };
        }
        if (m.id === 'M-103') {
          return { ...m, status: 'STABILIZED', riskLevel: 'MONITORED' };
        }
        return m;
      })
    );

    // Update Resources
    setEmergencyResources(prev =>
      prev.map(r => {
        if (r.id === 'res-bat-alpha') return { ...r, assignedStatus: 'ASSIGNED_FREEZER_2' };
        if (r.id === 'res-bkp-frz') return { ...r, assignedStatus: 'ASSIGNED_ICE_CORES' };
        if (r.id === 'res-personnel') return { ...r, assignedStatus: 'DEPLOYED_CRYO_TRANSFER' };
        return r;
      })
    );

    // Add Audit Log
    const newLog = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp,
      actor: operatorName,
      action: 'CRYO_TRIAGE_PLAN_AUTHORIZED',
      details: 'Plan A authorized: Ice Cores -> Medical Vault; Battery Alpha -> Freezer 2; Food -> Rations rerouted.',
      severity: 'CRITICAL_GOVERNANCE'
    };
    setAuditLogs(prev => [newLog, ...prev]);

    setAuthorizedDetails({
      operator: operatorName,
      timestamp,
      plan: OPTIMIZATION_PLAN_A
    });

    setIsApprovalModalOpen(false);
    showToast('RESOLUTION APPLIED: Emergency Protocol Dispatched to Station Local Bus', 'success');
    setCurrentScreen('updated-state');
  };

  // Simulate Reconnection & Event-Based Synchronization
  const simulateReconnection = () => {
    setStationConnectivity('SYNCING');
    showToast('Iridium Satellite Carrier Re-established. Syncing pending events...', 'info');

    setTimeout(() => {
      setStationConnectivity('SYNCED');
      setKillerDemoStep('SYNCED');
      setSyncQueue(prev =>
        prev.map(evt => ({
          ...evt,
          status: 'SYNCED',
          syncedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
        }))
      );

      // Add sync audit log
      const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
      const newLog = {
        id: `AUD-${Date.now().toString().slice(-4)}`,
        timestamp,
        actor: 'IRIDIUM_EDGE_SYNC',
        action: 'BATCH_SYNC_COMPLETED',
        details: 'Station Local Node reconciled with Central MoES PostgreSQL Cloud.',
        severity: 'NORMAL'
      };
      setAuditLogs(prev => [newLog, ...prev]);

      showToast('SYNC COMPLETE: Station Local Node successfully merged with Central MoES Cloud!', 'success');
    }, 2800);
  };

  // Reset Demo to Initial State
  const resetDemo = () => {
    setKillerDemoStep('INITIAL');
    setIsPlanAuthorized(false);
    setAuthorizedDetails(null);
    setStationConnectivity('OFFLINE');
    setCryoAssets(CRYO_ASSETS_DATA);
    setMissionsList(INITIAL_MISSIONS);
    setCargoList(INITIAL_CARGO);
    setSelectedCargoId('C-421');
    setEmergencyResources(EMERGENCY_RESOURCES);
    setSyncQueue(INITIAL_SYNC_QUEUE);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setCurrentScreen('dashboard');
    showToast('Demo State Reset to Default Scenario', 'info');
  };

  return (
    <PolarisContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        userRole,
        setUserRole,
        userName,
        setUserName,
        currentScreen,
        setCurrentScreen,
        selectedCargoId,
        setSelectedCargoId,
        selectedMissionId,
        setSelectedMissionId,
        selectedInventoryId,
        setSelectedInventoryId,
        selectedPersonnelId,
        setSelectedPersonnelId,
        isApprovalModalOpen,
        setIsApprovalModalOpen,
        isExplainModalOpen,
        setIsExplainModalOpen,
        isProcurementModalOpen,
        setIsProcurementModalOpen,
        isMobilePreview,
        setIsMobilePreview,
        killerDemoStep,
        setKillerDemoStep,
        cargoList,
        missionsList,
        inventoryList,
        personnelList,
        assetsList,
        cryoAssets,
        emergencyResources,
        syncQueue,
        addOfflineEvent,
        auditLogs,
        stationConnectivity,
        setStationConnectivity,
        activeStation,
        setActiveStation,
        isPlanAuthorized,
        authorizedDetails,
        authorizePlanA,
        canAuthorizePlan,
        simulateReconnection,
        resetDemo,
        simulatedTime,
        toast,
        showToast
      }}
    >
      {children}
    </PolarisContext.Provider>
  );
}

export function usePolaris() {
  const context = useContext(PolarisContext);
  if (!context) {
    throw new Error('usePolaris must be used within a PolarisProvider');
  }
  return context;
}
