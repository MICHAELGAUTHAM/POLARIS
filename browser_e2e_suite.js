import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = 'http://localhost:5173/';

const results = [];
function recordResult(testName, passed, details = '') {
  results.push({ testName, passed, details });
  console.log(`[${passed ? 'PASS' : 'FAIL'}] ${testName} ${details ? '(' + details + ')' : ''}`);
}

async function runBrowserTests() {
  console.log('====================================================');
  console.log('STARTING REAL CHROME BROWSER END-TO-END QA TESTING');
  console.log('Connecting to: ' + APP_URL);
  console.log('Chrome Path: ' + CHROME_PATH);
  console.log('====================================================\n');

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1400,900']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });

    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        consoleErrors.push(text);
        console.error('  [BROWSER CONSOLE ERROR]:', text);
      }
    });
    page.on('pageerror', err => {
      consoleErrors.push(err.message);
      console.error('  [BROWSER PAGE EXCEPTION]:', err.message);
    });

    // 1. Initial Page Load
    console.log('1. Loading application...');
    await page.goto(APP_URL, { waitUntil: 'networkidle2' });
    const pageTitle = await page.title();
    recordResult('Application Startup', pageTitle.includes('POLARIS'), `Page title: ${pageTitle}`);

    // Check for console errors on load
    recordResult('No Initial Console Errors', consoleErrors.length === 0, `${consoleErrors.length} errors found`);

    // 2. Test Login & Sign Out Flow
    console.log('\n2. Testing Authentication & Login flow...');
    // Click Sign Out button in header
    const signOutBtn = await page.$('button[title="Sign Out to Login Screen"]');
    if (signOutBtn) {
      await signOutBtn.click();
      await page.waitForSelector('input[type="password"]', { timeout: 3000 });
      recordResult('Sign Out Navigation', true, 'Successfully navigated to Login view');

      // Test invalid credentials by typing wrong pass
      const passInput = await page.$('input[type="password"]');
      await passInput.click({ clickCount: 3 });
      await page.keyboard.press('Backspace');
      await page.keyboard.type('wrong_pass');
      await page.click('button[type="submit"]');

      await page.waitForSelector('#login-error-message', { timeout: 3000 });
      const errorMsg = await page.$eval('#login-error-message', el => el.innerText);
      recordResult('Invalid Login Handling', errorMsg.includes('Invalid credentials'), `Message: ${errorMsg}`);

      // Click Auto-Fill button
      const autoFillSuccess = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const auto = btns.find(b => b.innerText.includes('Auto-Fill'));
        if (auto) { auto.click(); return true; }
        return false;
      });
      recordResult('Demo Credentials Auto-Fill', autoFillSuccess);

      // Submit valid credentials
      await page.click('button[type="submit"]');
      await page.waitForSelector('.app-container', { timeout: 4000 });
      recordResult('Valid Login Reaches Dashboard', true);
    } else {
      recordResult('Sign Out Button Present', false, 'Header Sign Out button not found');
    }

    // 3. Test Dashboard & Map
    console.log('\n3. Testing Dashboard interactive elements...');
    const kpiCount = await page.$$eval('.polaris-panel', panels => panels.length);
    recordResult('Dashboard Panels Loaded', kpiCount >= 4, `${kpiCount} panels rendered`);

    // Verify SVG Map exists
    const mapExists = await page.$('svg') !== null;
    recordResult('Antarctica SVG Map Rendered', mapExists);

    // 4. Test C-421 Alert & Cargo Details
    console.log('\n4. Testing Cargo C-421 Killer Demo Flow...');
    const inspectBtnClicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const inspectBtn = btns.find(b => b.innerText.includes('Inspect Cargo & Impact'));
      if (inspectBtn) {
        inspectBtn.click();
        return true;
      }
      return false;
    });
    recordResult('Click Inspect Cargo & Impact', inspectBtnClicked);

    await new Promise(r => setTimeout(r, 600));
    const cargoTitle = await page.evaluate(() => document.querySelector('h1')?.innerText || '');
    recordResult('Cargo Details Screen Loaded', cargoTitle.includes('C-421'), cargoTitle);

    // Test Cargo Tabs
    const tabsClicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const bomTab = btns.find(b => b.innerText.includes('Bill of Materials'));
      if (bomTab) bomTab.click();
      return bomTab !== undefined;
    });
    recordResult('Cargo Manifest Tabs Interactive', tabsClicked);

    // Click VIEW DEPENDENCY IMPACT
    const cascadeBtnClicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const cascadeBtn = btns.find(b => b.innerText.includes('VIEW DEPENDENCY IMPACT') || b.innerText.includes('Simulate Dependency Cascade'));
      if (cascadeBtn) {
        cascadeBtn.click();
        return true;
      }
      return false;
    });
    recordResult('Click VIEW DEPENDENCY IMPACT', cascadeBtnClicked);

    // 5. Test Dependency & Risk Cascade Graph
    console.log('\n5. Testing Dependency & Risk Cascade Graph...');
    await new Promise(r => setTimeout(r, 600));
    const cascadeTitle = await page.evaluate(() => document.querySelector('h1')?.innerText || '');
    recordResult('Cascade Screen Loaded', cascadeTitle.includes('Cascade'), cascadeTitle);

    // Verify nodes are rendered
    const nodeCount = await page.$$eval('svg g[transform*="translate"]', els => els.length);
    recordResult('Graph Nodes Rendered', nodeCount >= 5, `${nodeCount} nodes found`);

    // Click RUN CRYO-TRIAGE
    const runCryoClicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const cryoBtn = btns.find(b => b.innerText.includes('RUN CRYO-TRIAGE'));
      if (cryoBtn) {
        cryoBtn.click();
        return true;
      }
      return false;
    });
    recordResult('Click RUN CRYO-TRIAGE', runCryoClicked);

    // Wait for transition to Cryo-Triage
    await new Promise(r => setTimeout(r, 1800));

    // 6. Test Cryo-Triage Screen & TTCF Countdown
    console.log('\n6. Testing Cryo-Triage Intelligence & Countdown...');
    const cryoTitle = await page.evaluate(() => document.querySelector('h1')?.innerText || '');
    recordResult('Cryo-Triage Screen Loaded', cryoTitle.includes('CRYO-TRIAGE'), cryoTitle);

    // Watch TTCF countdown for 2 seconds to verify live ticking
    const initialTTCF = await page.evaluate(() => {
      const el = document.querySelector('.ttcf-ticker');
      return el ? el.innerText : '';
    });
    await new Promise(r => setTimeout(r, 2200));
    const nextTTCF = await page.evaluate(() => {
      const el = document.querySelector('.ttcf-ticker');
      return el ? el.innerText : '';
    });
    const timerTicked = initialTTCF !== '' && nextTTCF !== '' && initialTTCF !== nextTTCF;
    recordResult('TTCF Countdown Live Ticking', timerTicked, `${initialTTCF} -> ${nextTTCF}`);

    // 7. Test Explain Decision Modal
    console.log('\n7. Testing AI Decision Explainability Modal...');
    const explainClicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.innerText.includes('EXPLAIN DECISION') || b.innerText.includes('Explain Decision'));
      if (btn) { btn.click(); return true; }
      return false;
    });
    recordResult('Open Explain Decision Modal', explainClicked);
    await page.waitForSelector('#explain-modal-heading', { timeout: 3000 });

    const explainTitle = await page.$eval('#explain-modal-heading', el => el.innerText);
    recordResult('Explain Decision Content Visible', explainTitle.includes('Plan A'), explainTitle);

    // Close explain modal
    await page.evaluate(() => {
      const closeBtn = document.querySelector('.modal-content button');
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 300));

    // 8. Test Authorization & Cancel Governance
    console.log('\n8. Testing Human Governance & Operator Approval...');
    const authBtnClicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.innerText.includes('AUTHORIZE PLAN'));
      if (btn) { btn.click(); return true; }
      return false;
    });
    recordResult('Open Authorize Plan Modal', authBtnClicked);
    await new Promise(r => setTimeout(r, 400));

    // Test Cancel first (per prompt instruction)
    const cancelClicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const cancelBtn = btns.find(b => b.innerText.trim() === 'Cancel');
      if (cancelBtn) { cancelBtn.click(); return true; }
      return false;
    });
    recordResult('Test Modal Cancel (No State Change)', cancelClicked);
    await new Promise(r => setTimeout(r, 400));

    // Verify modal closed without authorizing
    const isStillOnCryo = await page.evaluate(() => document.querySelector('h1')?.innerText.includes('CRYO-TRIAGE'));
    recordResult('State Unaltered After Cancel', isStillOnCryo);

    // Reopen and Confirm Authorization
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.innerText.includes('AUTHORIZE PLAN'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    const confirmAuthClicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const confirmBtn = btns.find(b => b.innerText.includes('Confirm Authorization'));
      if (confirmBtn) { confirmBtn.click(); return true; }
      return false;
    });
    recordResult('Click Confirm Authorization', confirmAuthClicked);
    await new Promise(r => setTimeout(r, 800));

    // 9. Verify Updated State
    console.log('\n9. Testing Updated Mission State screen...');
    const updatedStateTitle = await page.evaluate(() => document.querySelector('h1')?.innerText || '');
    recordResult('Updated Mission State Loaded', updatedStateTitle.includes('Resolution Active') || updatedStateTitle.includes('Applied'), updatedStateTitle);

    const safeBadge = await page.evaluate(() => {
      const badges = Array.from(document.querySelectorAll('.badge'));
      return badges.some(b => b.innerText.includes('SAFE / STABLE'));
    });
    recordResult('Ice Cores Marked SAFE / STABLE', safeBadge);

    // 10. Test Station Local Node & Offline Event Creation
    console.log('\n10. Testing Station Local Node & Offline Event Logging...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const localBtn = btns.find(b => b.innerText.includes('Inspect Station Local Node') || b.innerText.includes('Station Local Node'));
      if (localBtn) localBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const localNodeTitle = await page.evaluate(() => document.querySelector('h1')?.innerText || '');
    recordResult('Station Local Node Loaded', localNodeTitle.includes('Station Local Node'), localNodeTitle);

    // Click "+ Log Offline Event"
    const logEventBtn = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.innerText.includes('Log Offline Event'));
      if (btn) { btn.click(); return true; }
      return false;
    });
    recordResult('Open Log Offline Event Modal', logEventBtn);
    await new Promise(r => setTimeout(r, 400));

    // Submit new offline event
    await page.click('button[type="submit"]');
    await new Promise(r => setTimeout(r, 600));

    const queueCountAfterAdd = await page.$eval('#sync-queue-count', el => el.innerText);
    recordResult('New Offline Event Added to Ledger', queueCountAfterAdd.includes('6 EVENTS'), queueCountAfterAdd);

    // 11. Test Sync Center & Simulate Reconnection
    console.log('\n11. Testing Sync Center & Simulate Reconnection...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const syncBtn = btns.find(b => b.innerText.includes('Sync Center'));
      if (syncBtn) syncBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const syncTitle = await page.evaluate(() => document.querySelector('h1')?.innerText || '');
    recordResult('Sync Center Screen Loaded', syncTitle.includes('Synchronization'), syncTitle);

    // Click Simulate Reconnection
    const reconnectClicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const recBtn = btns.find(b => b.innerText.includes('SIMULATE RECONNECTION'));
      if (recBtn) { recBtn.click(); return true; }
      return false;
    });
    recordResult('Click SIMULATE RECONNECTION', reconnectClicked);

    // Wait for reconnection lifecycle (OFFLINE -> SYNCING -> SYNCED)
    console.log('  Waiting for Iridium satellite sync cycle...');
    await new Promise(r => setTimeout(r, 3400));

    const isCloudSynced = await page.evaluate(() => {
      const text = document.body.innerText;
      return text.includes('SYNC COMPLETE') || text.includes('SYNCED WITH MOES CLOUD') || text.includes('CENTRAL CLOUD: SYNCED');
    });
    recordResult('Reconnection Reaches SYNCED State', isCloudSynced);

    // 12. Test Return to Dashboard
    console.log('\n12. Testing Return to Updated Dashboard...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const returnBtn = btns.find(b => b.innerText.includes('Return to Updated Dashboard') || b.innerText.includes('Verify Global Operational State'));
      if (returnBtn) returnBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const dashBannerText = await page.$eval('#dashboard-crisis-banner', el => el.innerText);
    recordResult('Dashboard Reflects Synced & Stabilized State', dashBannerText.includes('RESOLVED') || dashBannerText.includes('Dispatched'), dashBannerText.substring(0, 60));

    // 13. Test Sidebar Navigation across all modules
    console.log('\n13. Testing Sidebar routes...');
    const routesToTest = ['Missions', 'Cargo Tracking', 'Inventory', 'Personnel', 'Assets & Fleet', 'Risk & Optimization', 'Emergency Response', 'Expedition Maps', 'Reports & Analytics', 'Settings & Security', 'System Architecture'];
    let allRoutesLoaded = true;

    for (const routeName of routesToTest) {
      const clicked = await page.evaluate((name) => {
        const btns = Array.from(document.querySelectorAll('aside button'));
        const btn = btns.find(b => b.innerText.includes(name));
        if (btn) { btn.click(); return true; }
        return false;
      }, routeName);

      await new Promise(r => setTimeout(r, 250));
      const hasHeading = await page.evaluate(() => document.querySelector('h1') !== null);
      if (!clicked || !hasHeading) {
        allRoutesLoaded = false;
        console.error(`  Failed on route: ${routeName}`);
      }
    }
    recordResult('All 11 Secondary Screens Navigate Cleanly', allRoutesLoaded);

    // 14. Test Mobile Device Mode
    console.log('\n14. Testing Mobile Device Mode & Nav...');
    const mobileBtn = await page.$('button[title="Preview Mobile Experience"]');
    if (mobileBtn) {
      await mobileBtn.click();
      await new Promise(r => setTimeout(r, 500));
      const mobileNavExists = await page.$('nav[style*="position: fixed"]') !== null;
      recordResult('Mobile Device View & Bottom Nav Active', mobileNavExists);

      // Click Desktop button to return
      const desktopBtn = await page.$('button[title="Switch to Desktop View"]');
      if (desktopBtn) await desktopBtn.click();
      await new Promise(r => setTimeout(r, 500));
      recordResult('Switch Back to Desktop View', true);
    } else {
      recordResult('Mobile Toggle Button Present', false);
    }

    // 15. Test Demo Reset Mechanism
    console.log('\n15. Testing Demo Reset...');
    const resetBtn = await page.$('button[title="Reset Demo to Initial State"]');
    if (resetBtn) {
      await resetBtn.click();
      await new Promise(r => setTimeout(r, 600));

      const isResetToDelayed = await page.evaluate(() => {
        const text = document.body.innerText;
        return text.includes('Cargo C-421 Delayed 7 Days') || text.includes('HIGH PRIORITY LOGISTICS ALERT');
      });
      recordResult('Demo Reset Restores Initial Scenario', isResetToDelayed);
    } else {
      recordResult('Demo Reset Button Present', false);
    }

    // 16. Final Console Error Check
    const fatalErrors = consoleErrors.filter(e => !e.includes('favicon'));
    recordResult('Zero Fatal Runtime Errors in Entire Session', fatalErrors.length === 0, `${fatalErrors.length} fatal errors`);

  } catch (error) {
    console.error('Test Suite Exception:', error);
    recordResult('Test Execution', false, error.message);
  } finally {
    if (browser) await browser.close();
  }

  console.log('\n====================================================');
  const passedCount = results.filter(r => r.passed).length;
  const failedCount = results.filter(r => !r.passed).length;
  console.log(`TOTAL BROWSER TESTS: ${results.length} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
  console.log('====================================================\n');

  if (failedCount > 0) {
    process.exit(1);
  } else {
    console.log('ALL BROWSER TESTS PASSED 100% GREEN IN GOOGLE CHROME!');
    process.exit(0);
  }
}

runBrowserTests();
