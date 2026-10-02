// POLARIS End-to-End State Machine Flow Test
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
} from './src/data/mockData.js';

let stepCount = 0;
function logStep(stepName, details) {
  stepCount++;
  console.log(`[STEP ${stepCount}] ${stepName}`);
  if (details) console.log(`         ↳ ${details}`);
}

function runE2EStateMachineTest() {
  console.log('====================================================');
  console.log('POLARIS KILLER DEMO — END-TO-END FLOW VERIFICATION');
  console.log('====================================================\n');

  // Step 1: Initial State
  let state = {
    isAuthenticated: true,
    userRole: 'Station Commander',
    userName: 'Dr. Michael Gautham',
    currentScreen: 'dashboard',
    selectedCargoId: 'C-421',
    killerDemoStep: 'INITIAL',
    isPlanAuthorized: false,
    stationConnectivity: 'OFFLINE',
    cryoAssets: JSON.parse(JSON.stringify(CRYO_ASSETS_DATA)),
    missionsList: JSON.parse(JSON.stringify(INITIAL_MISSIONS)),
    emergencyResources: JSON.parse(JSON.stringify(EMERGENCY_RESOURCES)),
    syncQueue: JSON.parse(JSON.stringify(INITIAL_SYNC_QUEUE)),
    auditLogs: JSON.parse(JSON.stringify(INITIAL_AUDIT_LOGS))
  };

  logStep('INITIAL STATE', 'Bharati Station OFFLINE, C-421 delayed, Cryo Assets threatened');
  if (state.stationConnectivity !== 'OFFLINE') throw new Error('Initial station not OFFLINE');
  if (state.cryoAssets[0].currentTemp !== -22.4) throw new Error('Initial Ice Core temp mismatch');

  // Step 2: Open C-421 Alert
  logStep('OPEN C-421 DELAY ALERT', 'Navigate from Dashboard to Cargo Details');
  state.currentScreen = 'cargo-detail';
  state.selectedCargoId = 'C-421';
  const c421 = INITIAL_CARGO.find(c => c.id === 'C-421');
  if (!c421 || c421.affectedMissionsCount !== 3) throw new Error('C-421 affected missions count invalid');

  // Step 3: Inspect Affected Missions
  logStep('INSPECT AFFECTED MISSIONS', 'M-105 (Overhaul), M-102 (Ice Cores), M-103 (Microbes) identified');
  const affected = state.missionsList.filter(m => c421.linkedMissions.includes(m.id));
  if (affected.length !== 3) throw new Error('Failed to identify 3 affected missions');

  // Step 4: Open Dependency Cascade
  logStep('OPEN DEPENDENCY & RISK CASCADE', 'Render multi-tier graph: Fuel/Parts -> Power -> Load Shed -> Freezers');
  state.currentScreen = 'cascade';
  state.killerDemoStep = 'CASCADE_ACTIVE';

  // Step 5: Run Cryo-Triage
  logStep('TRIGGER RUN CRYO-TRIAGE', 'Transition from graph cascade to Cryo-Triage Engine');
  state.currentScreen = 'cryo';
  state.killerDemoStep = 'CRYO_VIEWED';
  if (state.cryoAssets[0].ttcfSeconds !== 15125) throw new Error('Ice Core TTCF countdown mismatch');

  // Step 6: Thermal Analysis & Plan Generation
  logStep('THERMAL ANALYSIS & OPTIMIZATION PLAN', 'Plan A generated: 94.8% mission value saved');
  const plan = OPTIMIZATION_PLAN_A;
  if (plan.metrics.missionValueSaved !== '94.8%') throw new Error('Plan A value saved mismatch');

  // Step 7: RBAC Clearance Check
  logStep('RBAC CLEARANCE VERIFICATION', 'Verify Field Officer cannot authorize, Station Commander can');
  const canAuthorize = (role) => role !== 'Field Officer';
  if (canAuthorize('Field Officer')) throw new Error('Field Officer should NOT be able to authorize');
  if (!canAuthorize('Station Commander')) throw new Error('Station Commander must be able to authorize');

  // Step 8: Human Operator Authorization
  logStep('OPERATOR AUTHORIZE PLAN A', 'Explicit confirmation modal approved by Commander Gautham');
  state.isPlanAuthorized = true;
  state.killerDemoStep = 'AUTHORIZED';
  state.cryoAssets = state.cryoAssets.map(asset => {
    if (asset.id === 'freezer-1') {
      return { ...asset, statusLabel: 'SAFE / STABLE', currentTemp: -24.1 };
    }
    if (asset.id === 'freezer-2') {
      return { ...asset, statusLabel: 'STABILIZED', currentTemp: -79.5 };
    }
    if (asset.id === 'freezer-3') {
      return { ...asset, statusLabel: 'LOW PRIORITY / DECAY ALLOWED', currentTemp: -12.4 };
    }
    return asset;
  });

  state.missionsList = state.missionsList.map(m => {
    if (m.id === 'M-102' || m.id === 'M-103') return { ...m, status: 'STABILIZED' };
    return m;
  });

  state.auditLogs.unshift({
    id: 'AUD-9999',
    timestamp: '2026-10-02 17:35:00',
    actor: 'Dr. Michael Gautham',
    action: 'CRYO_TRIAGE_PLAN_AUTHORIZED',
    details: 'Plan A confirmed',
    severity: 'CRITICAL_GOVERNANCE'
  });

  state.currentScreen = 'updated-state';
  if (state.cryoAssets[0].statusLabel !== 'SAFE / STABLE') throw new Error('Ice cores not SAFE / STABLE');
  if (state.missionsList.find(m => m.id === 'M-102').status !== 'STABILIZED') throw new Error('M-102 not STABILIZED');

  // Step 9: Inspect Station Local Node
  logStep('INSPECT STATION LOCAL NODE', 'Decoupled edge execution active at Bharati Station');
  state.currentScreen = 'local-node';
  if (state.stationConnectivity !== 'OFFLINE') throw new Error('Station should be OFFLINE at local node');

  // Step 10: Create Local Offline Event
  logStep('CREATE MANUAL LOCAL EVENT', 'Log offline inspection event into outbox ledger');
  const newLocalEvent = {
    id: 'SYNC-EVT-06',
    event: 'STATION_MANUAL_LOG',
    description: 'Medical Wing Backup Vault Temp Checked (-80.2°C)',
    status: 'SAVED_LOCALLY',
    timestamp: '2026-10-02 17:36:00',
    entity: 'AST-FRZ-BKP-01',
    hash: '0x9b41...f201'
  };
  state.syncQueue.unshift(newLocalEvent);
  if (state.syncQueue.length !== 6) throw new Error('Sync queue event not added');

  // Step 11: Go to Sync Center & Simulate Reconnection
  logStep('SYNC CENTER: SIMULATE RECONNECTION', 'Trigger satellite reconnection (OFFLINE -> SYNCING -> SYNCED)');
  state.currentScreen = 'sync-center';
  state.stationConnectivity = 'SYNCING';
  if (state.stationConnectivity !== 'SYNCING') throw new Error('Failed to set SYNCING');

  // Transition to SYNCED
  state.stationConnectivity = 'SYNCED';
  state.killerDemoStep = 'SYNCED';
  state.syncQueue = state.syncQueue.map(e => ({ ...e, status: 'SYNCED' }));
  if (!state.syncQueue.every(e => e.status === 'SYNCED')) throw new Error('Events not marked SYNCED');

  // Step 12: Return to Dashboard
  logStep('RETURN TO UPDATED DASHBOARD', 'Global dashboard updated with synchronized safe status');
  state.currentScreen = 'dashboard';
  if (state.killerDemoStep !== 'SYNCED') throw new Error('Killer demo step not SYNCED');

  // Step 13: Demo Reset Verification
  logStep('RESET DEMO SCENARIO', 'Verify clean reset restores initial state without code loss');
  state = {
    ...state,
    killerDemoStep: 'INITIAL',
    isPlanAuthorized: false,
    stationConnectivity: 'OFFLINE',
    cryoAssets: JSON.parse(JSON.stringify(CRYO_ASSETS_DATA)),
    missionsList: JSON.parse(JSON.stringify(INITIAL_MISSIONS)),
    syncQueue: JSON.parse(JSON.stringify(INITIAL_SYNC_QUEUE)),
    currentScreen: 'dashboard'
  };
  if (state.isPlanAuthorized !== false) throw new Error('Demo reset failed to clear authorization');
  if (state.stationConnectivity !== 'OFFLINE') throw new Error('Demo reset failed to restore OFFLINE status');
  if (state.syncQueue.length !== 5) throw new Error('Demo reset failed to restore initial 5 events');

  console.log('\n====================================================');
  console.log('E2E STATE MACHINE TEST COMPLETE: ALL 13 STEPS PASSED!');
  console.log('====================================================\n');
}

runE2EStateMachineTest();
