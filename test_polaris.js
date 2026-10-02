// POLARIS Automated Test & Verification Suite
import http from 'http';
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

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${testName}`);
  } else {
    failedTests++;
    failures.push({ testName, details });
    console.error(`  [FAIL] ${testName}: ${details}`);
  }
}

async function runTestSuite() {
  console.log('====================================================');
  console.log('POLARIS PROTOTYPE — AUTOMATED COMPREHENSIVE QA SUITE');
  console.log('====================================================\n');

  // Test 1: Application Server Status
  console.log('1. Testing Local Server Connectivity (http://localhost:5173/)...');
  await new Promise((resolve) => {
    http.get('http://localhost:5173/', (res) => {
      assert(res.statusCode === 200, 'Server responds with HTTP 200 OK');
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        assert(data.includes('POLARIS'), 'HTML contains POLARIS title & metadata');
        assert(data.includes('/src/main.jsx'), 'HTML loads main.jsx entry point');
        resolve();
      });
    }).on('error', (err) => {
      assert(false, 'Server HTTP connection', err.message);
      resolve();
    });
  });

  // Test 2: Data Models & Integrity
  console.log('\n2. Testing Data Models & Integrity...');
  assert(STATIONS.length >= 3, 'All 3 Indian Antarctic Stations Defined (Bharati, Maitri, Dakshin Gangotri)');
  const bharati = STATIONS.find(s => s.id === 'bharati');
  assert(bharati && bharati.coordinates === '69°24′28″S 76°11′14″E', 'Bharati coordinates accurate');
  assert(bharati && bharati.temp === -28, 'Bharati Blizzard temperature registered (-28°C)');

  const c421 = INITIAL_CARGO.find(c => c.id === 'C-421');
  assert(c421 !== undefined, 'Cargo C-421 exists');
  assert(c421 && c421.status === 'DELAYED' && c421.delayDays === 7, 'C-421 delayed 7 days');
  assert(c421 && c421.priority === 'HIGH', 'C-421 high priority');
  assert(c421 && c421.affectedMissionsCount === 3, 'C-421 affects exactly 3 missions');
  assert(c421 && c421.linkedMissions.length === 3, 'C-421 linked missions array has 3 missions');

  const al77 = INITIAL_CARGO.find(c => c.id === 'C-422');
  assert(al77 && al77.description.includes('AL-77') && al77.delayHours === 96, 'AL-77 Fuel Traverse delayed 96 hours');

  // Test 3: Inventory Integrity
  console.log('\n3. Testing Critical Inventory Stockouts...');
  const gf200 = INITIAL_INVENTORY.find(i => i.partNo === 'GF-200');
  assert(gf200 && gf200.currentStock === 0, 'Generator Filter GF-200 stockout (0 units)');
  assert(gf200 && gf200.status === 'CRITICAL', 'GF-200 status is CRITICAL');
  const jetA1 = INITIAL_INVENTORY.find(i => i.partNo === 'POL-JETA1');
  assert(jetA1 && jetA1.status === 'CRITICAL', 'Jet A-1 Fuel status is CRITICAL');
  const mres = INITIAL_INVENTORY.find(i => i.partNo === 'RAT-MRE-90');
  assert(mres && mres.currentStock.includes('1,200 Units (90 days)'), 'Dry Rations stock intact (1,200 units / 90 days)');

  // Test 4: Cryo Assets & Thermal Physics
  console.log('\n4. Testing Cryo-Triage Assets & Thermal Physics...');
  assert(CRYO_ASSETS_DATA.length === 3, '3 Cryogenic Assets Configured (Freezer 1, 2, 3)');
  const f1 = CRYO_ASSETS_DATA.find(a => a.id === 'freezer-1');
  const f2 = CRYO_ASSETS_DATA.find(a => a.id === 'freezer-2');
  const f3 = CRYO_ASSETS_DATA.find(a => a.id === 'freezer-3');

  assert(f1 && f1.priority === 'CRITICAL', 'Freezer 1 is CRITICAL priority');
  assert(f1 && f1.currentTemp === -22.4, 'Freezer 1 current temp is -22.4°C');
  assert(f1 && f1.criticalThreshold === -15.0, 'Freezer 1 threshold is -15.0°C');
  assert(f1 && f1.ttcfSeconds === 15125, 'Freezer 1 TTCF is 04h 12m 05s (15,125 seconds)');

  assert(f2 && f2.priority === 'HIGH', 'Freezer 2 is HIGH priority');
  assert(f2 && f2.currentTemp === -78.1, 'Freezer 2 current temp is -78.1°C');
  assert(f2 && f2.criticalThreshold === -50.0, 'Freezer 2 threshold is -50.0°C');
  assert(f2 && f2.ttcfSeconds === 42300, 'Freezer 2 TTCF is 11h 45m 00s (42,300 seconds)');

  assert(f3 && f3.priority === 'LOW', 'Freezer 3 is LOW priority (Food)');
  assert(f3 && f3.ttcfSeconds > 86400, 'Freezer 3 TTCF > 24 hours (28h 10m)');

  // Test 5: TTCF Formatter & Edge Cases
  console.log('\n5. Testing TTCF Formatter Edge Cases...');
  const formatTTCF = (seconds) => {
    if (typeof seconds !== 'number' || isNaN(seconds)) return '00h 00m 00s';
    if (seconds <= 0) return '00h 00m 00s (BREACHED)';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  assert(formatTTCF(15125) === '04h 12m 05s', 'Formats standard TTCF: 15125s -> 04h 12m 05s');
  assert(formatTTCF(42300) === '11h 45m 00s', 'Formats standard TTCF: 42300s -> 11h 45m 00s');
  assert(formatTTCF(101400) === '28h 10m 00s', 'Handles TTCF > 24 hours: 101400s -> 28h 10m 00s');
  assert(formatTTCF(2700) === '00h 45m 00s', 'Handles TTCF < 1 hour: 2700s -> 00h 45m 00s');
  assert(formatTTCF(0) === '00h 00m 00s (BREACHED)', 'Handles 0 seconds threshold breach');
  assert(formatTTCF(-50) === '00h 00m 00s (BREACHED)', 'Handles negative countdown gracefully');
  assert(formatTTCF(NaN) === '00h 00m 00s', 'Handles NaN safely');
  assert(formatTTCF(null) === '00h 00m 00s', 'Handles null safely');
  assert(formatTTCF(undefined) === '00h 00m 00s', 'Handles undefined safely');

  // Test 6: Optimization Recommendation Logic
  console.log('\n6. Testing Optimization Recommendation Plan A...');
  assert(OPTIMIZATION_PLAN_A.metrics.missionValueSaved === '94.8%', 'Plan A saves 94.8% mission value');
  assert(OPTIMIZATION_PLAN_A.actions.length === 3, 'Plan A has 3 explicit tactical actions');
  assert(OPTIMIZATION_PLAN_A.actions[0].title.includes('Move Ice Cores to Medical Wing Backup Freezer'), 'Action 1 protects Ice Cores');
  assert(OPTIMIZATION_PLAN_A.actions[0].transferTime === '45 minutes', 'Action 1 transfer time is 45 minutes');
  assert(OPTIMIZATION_PLAN_A.actions[1].expectedSurvivalExtension.includes('+72 Hours'), 'Action 2 extends Freezer 2 by +72 hours');
  assert(OPTIMIZATION_PLAN_A.actions[2].title.includes('Allow Freezer 3 Food Inventory to Decay'), 'Action 3 permits food decay');

  // Test 7: Emergency Resources
  console.log('\n7. Testing Emergency Resources Availability...');
  const batAlpha = EMERGENCY_RESOURCES.find(r => r.id === 'res-bat-alpha');
  assert(batAlpha && batAlpha.powerCapacity === '48 kWh', 'Battery Alpha capacity is 48 kWh');
  const bkpFrz = EMERGENCY_RESOURCES.find(r => r.id === 'res-bkp-frz');
  assert(bkpFrz && bkpFrz.location.includes('Medical Wing'), 'Backup freezer is in Medical Wing');

  // Test 8: Offline-First Ledger & Reconnection
  console.log('\n8. Testing Offline Sync Queue & Event Ledger...');
  assert(INITIAL_SYNC_QUEUE.length === 5, 'Initial offline sync queue has 5 pending events');
  assert(INITIAL_SYNC_QUEUE.every(e => e.status === 'SAVED_LOCALLY'), 'All initial events are marked SAVED_LOCALLY');
  assert(INITIAL_AUDIT_LOGS.length >= 4, 'Audit logs have initial security and alert history');

  // Summary
  console.log('\n====================================================');
  console.log(`TOTAL TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${failedTests}`);
  console.log('====================================================');

  if (failedTests > 0) {
    console.error('FAILURES SUMMARY:');
    failures.forEach(f => console.error(`- ${f.testName}: ${f.details}`));
    process.exit(1);
  } else {
    console.log('ALL TESTS PASSED WITH 100% SUCCESS!');
    process.exit(0);
  }
}

runTestSuite();
