# POLARIS — Antigravity Prototype README

## 1. Project Identity

**Product:** POLARIS  
**Full Name:** Integrated Polar Expedition Logistics and Asset Management System  
**Problem Statement:** SIH26062  
**Organization:** Ministry of Earth Sciences (MoES)  
**Department:** National Centre for Polar and Ocean Research (NCPOR)  
**Theme:** Smart Automation  
**Category:** Software  
**Team:** The Last Of Us  
**Team ID:** 156265  

### Tagline

**PLAN. TRACK. OPTIMIZE. RESPOND.**  
**KEEP MISSIONS MOVING.**

---

# 2. Purpose of This README

This README is **exclusively for Antigravity**.

Antigravity must use this document to build the **actual working POLARIS prototype**, not just static mockups.

The result must be:

- responsive
- clickable
- stateful
- visually polished
- demo-ready
- modular
- easy to extend later

The prototype must preserve the required POLARIS functionality from the Smart India Hackathon PPT and integrate the research-derived **Cryo-Triage** innovation.

---

# 3. Source-of-Truth Rules

Use the supplied project materials in this order:

### 1. POLARIS Smart India Hackathon PPT

Defines the core POLARIS product and required capabilities:

- mission planning
- cargo
- inventory
- personnel
- assets
- emergency response
- dependency graph
- risk engine
- optimization
- explainable decision support
- offline-first operation
- event-based synchronization
- mapping
- RBAC
- audit logs

### 2. Polar Logistics Research Plan / Deep Research PDF

Adds the advanced domain-specific innovation:

**Cryo-Triage — Thermal-Decay-Aware Asset Protection Engine**

and the associated:

- thermal prediction
- Time-to-Critical-Failure (TTCF)
- thermal decay curves
- emergency resource allocation
- optimization
- operator authorization
- local/offline execution
- synchronization workflow

### 3. POLARIS UI/UX Reference Images

Define the visual direction:

- Antarctic command-center aesthetic
- dark navy
- ice blue
- cyan
- controlled amber/red alerts
- high information density
- maps
- premium cards
- tables
- charts
- responsive mobile UI

Do not remove PPT functionality when adding Cryo-Triage.

---

# 4. Main Product Concept

POLARIS is an integrated polar expedition operations platform connecting:

- Mission Planning
- Cargo Tracking
- Inventory Management
- Personnel Tracking
- Asset Tracking
- Emergency Coordination
- Risk Prediction
- Dependency Analysis
- Optimization
- Scenario Simulation
- Explainable Decision Support
- Offline-First Station Operations
- Event-Based Synchronization
- Local Station Node
- Central Cloud
- Role-Based Access Control
- Audit Logging
- Mapping
- Weather / operational context
- Simulated GPS / IoT data

POLARIS must look and behave like a serious Antarctic expedition operations system, not a generic CRUD dashboard.

---

# 5. Primary Demo Story

The most important Antigravity implementation is this connected demo:

```text
LOGIN
  ↓
GLOBAL DASHBOARD
  ↓
CARGO C-421 DELAY ALERT
  ↓
CARGO DETAILS
  ↓
AFFECTED MISSIONS
  ↓
DEPENDENCY & RISK CASCADE
  ↓
RUN CRYO-TRIAGE
  ↓
THERMAL ANALYSIS
  ↓
TTCF COUNTDOWN
  ↓
OPTIMIZATION PLAN
  ↓
EXPLAIN DECISION
  ↓
AUTHORIZE PLAN
  ↓
GOVERNANCE CONFIRMATION
  ↓
UPDATED MISSION STATE
  ↓
STATION LOCAL NODE
  ↓
SYNC CENTER
  ↓
SIMULATE RECONNECTION
  ↓
SYNCED
  ↓
UPDATED DASHBOARD
```

This flow must work before secondary screens are polished.

---

# 6. Core POLARIS Logic

The interface must communicate:

**DATA**  
→ **DEPENDENCIES**  
→ **RISK**  
→ **PHYSICAL IMPACT**  
→ **OPTIMIZATION**  
→ **HUMAN DECISION**  
→ **MISSION CONTINUITY**

Two workflows must remain available.

## Standard POLARIS Logistics Flow

Cargo Delay  
→ Dependency Engine  
→ Affected Missions  
→ Inventory Check  
→ Risk  
→ Optimization  
→ Operator Approval

## Cryo-Triage Flow

Fuel Delay  
→ Power Shortage  
→ Load Shedding  
→ Freezers Offline  
→ Thermal Prediction  
→ Time-to-Critical-Failure  
→ Resource Optimization  
→ Explainable Recommendation  
→ Human Authorization  
→ Local Save  
→ Offline Sync

---

# 7. Visual Design System

## Design Goal

Make POLARIS feel like a:

**Premium Antarctic Operations Command Center**

### Style

- futuristic but realistic
- professional
- enterprise-grade
- information-rich
- clean hierarchy
- cinematic Antarctic imagery
- dark navy interface
- ice-blue/cyan highlights
- crisp white typography
- subtle glow
- modern glass + solid panels
- rounded cards
- strong grid
- restrained animation

### Color Rules

Primary:
- Deep Navy
- Ice Blue
- Cyan
- White

Status:
- Green = healthy / normal
- Blue = active / informational
- Amber = warning
- Red = critical

### Contrast Rules

Never place white text on white/light surfaces.

Dark surface:
- white primary text
- pale blue secondary text

Light surface:
- dark navy primary text
- dark slate secondary text

### Logo Rules

Dark background:
- white/ice-blue POLARIS logo

Light background:
- dark navy/blue POLARIS logo

Never use a white POLARIS logo on a white card.

### Avoid

- childish UI
- generic SaaS templates
- excessive glassmorphism
- excessive neon
- unnecessary holograms
- fake sci-fi controls
- hospital-style UI
- clutter

---

# 8. Global Desktop Application Shell

## Sidebar

Persistent POLARIS sidebar:

- Dashboard
- Missions
- Cargo
- Inventory
- Personnel
- Assets
- Risk & Optimization
- Emergency
- Maps
- Reports
- Settings

Footer:

**NCPOR | MoES**  
**SIH 2026**

## Header

- Global Search
- Notifications
- Weather / Environment
- Connectivity Status
- SIMULATED DATA
- User Profile
- Date / Time

Use the same shell across all desktop screens.

---

# 9. Mobile Application

Create a real mobile interface.

Do not simply scale down desktop.

Use:

- bottom navigation
- stacked cards
- large touch targets
- simplified information hierarchy
- full-screen details
- prominent emergency access

Suggested navigation:

- Home
- Missions
- Cargo
- Inventory
- More

---

# 10. Required Screens

Build these screens:

1. Login
2. Dashboard
3. Missions
4. Cargo
5. Cargo Details
6. Inventory
7. Inventory Details
8. Personnel
9. Personnel Details
10. Assets
11. Risk & Optimization
12. Dependency & Risk Cascade
13. Cryo-Triage
14. Operator Approval
15. Updated Mission State
16. Station Local Node
17. Sync Center
18. Emergency Response
19. Maps
20. Reports
21. Settings
22. Mobile Dashboard
23. Mobile Mission
24. Mobile Cargo
25. Mobile Inventory
26. Mobile Emergency

---

# 11. Screen Specifications

## Screen 1 — Login

Cinematic Antarctic background.

Left:

- POLARIS logo
- POLARIS
- Integrated Polar Expedition Logistics and Asset Management System
- PLAN. TRACK. OPTIMIZE. RESPOND.
- KEEP MISSIONS MOVING.

Feature tiles:

- Mission Planning
- Cargo Tracking
- Inventory Management
- Personnel Movement
- Asset Management
- Emergency Response

Right:

**Welcome to POLARIS**  
**Command Center**

Fields:
- Username
- Password

Actions:
- Sign In
- Forgot Password

Roles:
- Admin
- Operator
- Field Officer

Show:
**SIMULATED DATA**

---

## Screen 2 — Global Dashboard

KPI cards:

- Active Missions
- Total Cargo
- Inventory Items
- Personnel On Field

Main:
**LIVE EXPEDITION MAP — ANTARCTICA**

Map items:
- stations
- missions
- personnel
- cargo
- assets
- routes
- alerts

Recent Alerts:

**Cargo C-421 delayed**  
Expected delay: 7 days  
Priority: High

Other:
- Generator spare-part low
- Team arrival updated
- Weather alert

Supporting panels:
- Ongoing Missions
- Cargo Tracking
- Inventory Status
- Personnel Tracking

---

## Screen 3 — Missions

Tabs:

- All
- Active
- Planned
- Completed
- At Risk

Table:

- Mission ID
- Mission Name
- Station
- Status
- Start Date
- End Date
- Priority
- Actions

Synthetic missions:

- Maitri Station Supply
- Bharati Research Support
- Geological Survey
- Equipment Maintenance

Mission detail:

- Objective
- Progress
- Schedule
- Route
- Cargo
- Personnel
- Assets
- Timeline

---

## Screen 4 — Cargo

Title:
**Cargo Tracking**

Tabs:
- All Cargo
- In Transit
- At Station
- Delayed

Filters:
- Search
- Mission
- Location
- Status
- Date

Table:
- Cargo ID
- Description
- Status
- Location
- ETA
- Mission
- Actions

Mandatory scenario:

**C-421**  
Generator Spare Parts  
Delayed — 7 days  
Priority — High  
Affected Missions — 3

---

## Screen 5 — Cargo Details

Selected cargo:

**C-421 — Generator Spare Parts**

Show:

- delayed 7 days
- high priority
- affected missions
- current location
- ETA

Tabs:

- Tracking Timeline
- Item Details
- Affected Missions
- Risk Analysis
- Optimization Options

Include route map.

Primary CTA:

**VIEW DEPENDENCY IMPACT**

---

## Screen 6 — Inventory

KPIs:

- Total Items
- Low Stock
- Critical Stock
- Stations

Tabs:

- All Items
- Low Stock
- Critical

Example:

**Generator Filter**  
Part No. GF-200  
Station: Maitri  
Current Stock: 0  
Minimum Stock: 4  
Status: Critical

Details:

- Shortage Impact
- Linked Missions
- Stock History
- Reorder Suggestion
- Create Procurement Request

Charts:

- Stock Distribution by Station
- Category Breakdown

---

## Screen 7 — Inventory Details

Selected item:

**Generator Filter**

Show:

- current stock
- minimum stock
- critical state
- shortage impact
- linked missions
- stock history
- reorder suggestion

CTA:

**CREATE PROCUREMENT REQUEST**

---

## Screen 8 — Personnel

KPIs:

- All Personnel
- On Field
- At Station
- On Mission

Table:
- Name
- Role
- Station / Location
- Status
- Coordinates
- Last Update
- Actions

Right:
Antarctica personnel map.

Always show:
**SIMULATED DATA**

---

## Screen 9 — Personnel Details

Show:

- profile
- role
- station
- coordinates
- current mission
- team
- expected return
- last check-in
- status

Map location included.

---

## Screen 10 — Assets

Categories:

- Vehicles
- Generators
- Freezers
- Scientific Equipment
- Communication Systems
- Emergency Equipment

Table:

- Asset ID
- Asset Name
- Type
- Station
- Status
- Condition
- Power State
- Mission
- Last Update

Details:

- status
- location
- mission dependency
- power dependency
- maintenance
- temperature profile
- risk status

---

# 12. Dependency & Risk Cascade

## Screen 11

Title:

**Dependency & Risk Cascade**

Create an interactive node-link graph.

Main chain:

Fuel Delay  
↓  
Power Shortage  
↓  
Load Shedding  
↓  
Freezers Offline  
↓  
Scientific Assets Threatened

Also show relationships to:

- Cargo
- Mission
- Inventory
- Power
- Station
- Assets
- Personnel

Color states:

- Normal = green/blue
- Warning = amber
- Critical = red

Add button:

**RUN CRYO-TRIAGE**

When Run Cryo-Triage is clicked:

1. animate graph expansion
2. change impacted nodes to warning/critical states
3. reveal the physical consequences
4. navigate to Cryo-Triage

---

# 13. Risk & Optimization

## Screen 12

Tabs:

- Active Risks
- Simulations
- Optimization
- Decision Support

Show:

- Affected Missions
- Inventory Impact
- Dependency Impact
- Risk Level
- Optimization Recommendations

Each recommendation:

- Action
- Cost
- Time
- Resource Usage
- Risk
- Reason

Actions:

- Compare
- Simulate
- Explain Decision
- Generate Plan

---

# 14. CRYO-TRIAGE

## Screen 13 — Cryo-Triage Intelligence

### Title

**CRYO-TRIAGE**

### Subtitle

**Thermal-Decay-Aware Asset Protection Engine**

### Crisis

**BHARATI ICE CORE CRISIS**

Show:

**SIMULATED SCENARIO**

Event:

ALCI Resupply Traverse AL-77  
Fuel: 10,000 L Jet A-1  
Delay: 96 hours  
Cause: Category 4 Blizzard  
Location: Schirmacher Oasis

---

## Cryo Asset A

Freezer 1  
Paleoclimate Ice Cores  
Priority: CRITICAL

## Cryo Asset B

Freezer 2  
Marine Microbes  
Priority: HIGH

## Cryo Asset C

Freezer 3  
Perishable Food  
Priority: LOW

Each card displays:

- Current Temperature
- Critical Threshold
- Thermal Risk
- Time-to-Critical-Failure

Simulated values:

**Ice Cores — 04h 12m 05s**  
**Marine Microbes — 11h 45m 00s**

---

# 15. Thermal Analysis

Large chart:

**TEMPERATURE VS TIME**

Show:

- current temperature
- critical threshold
- predicted crossing time
- thermal decay curve
- critical crossing point
- countdown

The main visual question:

**HOW MUCH TIME REMAINS?**

Use smooth chart animation.

---

# 16. Emergency Resources

Show:

- Portable Battery Alpha
- Portable Battery Beta
- 1 Backup Freezer
- Available Personnel
- Available Shift Time

Each resource:

- Power Capacity
- Location
- Availability
- Travel Time
- Assigned Status

---

# 17. Optimization Recommendation

Resolution Plan A:

### Action 1

Move Ice Cores to Medical Wing backup freezer.

Transfer Time:
45 minutes

Status:
Safe within TTCF

### Action 2

Connect Portable Battery Alpha to Freezer 2.

Expected survival extension:
72 hours

### Action 3

Allow Freezer 3 food inventory to decay.

Redirect personnel to secure dry-ration stores.

Show:

- Mission Value Saved
- Power Used
- Personnel Time
- Transfer Time
- Risk Reduction

Buttons:

**EXPLAIN DECISION**  
**AUTHORIZE PLAN**

---

# 18. Explain Decision

When clicked, open an explanation panel.

Explain the recommendation using:

- mission priority
- TTCF
- available power
- personnel availability
- transfer time
- resource constraints
- risk reduction

Do not use a generic chatbot.

This should be a structured command-center decision explanation.

---

# 19. Operator Approval

## Screen 14 / Modal

Clicking **AUTHORIZE PLAN** opens:

**Authorize Emergency Resolution?**

Show:

- Selected Plan
- Resources Allocated
- Affected Assets
- Expected Outcome
- Operator Name
- Timestamp

Warning:

**This action requires authorized operator approval.**

Buttons:

- Cancel
- Confirm Authorization

Never imply autonomous execution.

---

# 20. Updated Mission State

## Screen 15

After confirmation:

Ice Cores:
**SAFE / STABLE**

Marine Microbes:
**STABILIZED**

Perishable Food:
**LOW PRIORITY / DECAY ALLOWED**

Then update:

- countdown timers
- dependency graph
- mission state
- task assignments

Show:

**RESOLUTION APPLIED**

Add a success toast.

---

# 21. Station Local Node

## Screen 16

Title:
**Station Local Node**

Station:
**Bharati**

Connectivity:
**OFFLINE**

System:
**LOCAL OPERATIONS ACTIVE**

Services:

- Local Database — SQLite / IndexedDB
- Mission Intelligence — ACTIVE LOCALLY
- Risk Engine — ACTIVE LOCALLY
- Cryo-Triage — ACTIVE LOCALLY
- Optimization Engine — ACTIVE LOCALLY

Sync Queue:

- Asset location update
- Mission state update
- Personnel task update
- Cryo-Triage resolution event

Status:
**SAVED LOCALLY**

---

# 22. Sync Center

## Screen 17

Statuses:

- Synced
- Saved Locally
- Syncing
- Sync Failed
- Retry

Example:

**5 events pending**

- 3 asset updates
- 1 mission update
- 1 rescue-plan authorization

Timeline:

Saved Locally  
↓  
Waiting for Connection  
↓  
Syncing  
↓  
Synced

Add button:

**SIMULATE RECONNECTION**

Interaction:

Offline
→ Syncing
→ Synced

Then update Dashboard.

---

# 23. Emergency Response

## Screen 18

Tabs:

- Active Alerts
- Emergency Contacts
- Response Plans

Alerts:

- Blizzard Alert
- Fuel Resupply Delay
- Power Risk
- Scientific Asset Risk
- Personnel Alert

Incident detail:

- Severity
- Location
- Affected Personnel
- Affected Assets
- Mission
- Recommended Response
- Operator Actions

Buttons:

- View Location
- Start Response

Maintain human-in-the-loop control.

---

# 24. Maps

## Screen 19

Advanced Antarctica Operations Map.

Layers:

- Missions
- Cargo
- Personnel
- Assets
- Stations
- Routes
- Alerts
- Weather

Controls:

- Zoom
- Layers
- Routes
- Stations
- Personnel
- Cargo
- Alerts

Use one reusable map component.

---

# 25. Reports & Analytics

## Screen 20

Include:

- Mission Performance
- Cargo Movement
- Inventory Trends
- Personnel Distribution
- Risk Trends
- Optimization Outcomes
- Emergency Response
- Offline Sync History

Charts:

- Line
- Bar
- Donut
- Timeline

---

# 26. Settings / Security

## Screen 21

Show:

- User Profile
- Roles
- Permissions
- Notification Preferences
- Station
- Offline Settings
- Audit Logs
- Security

Roles:

- Admin
- Station Commander
- Lead Logistics Officer
- Chief Scientist
- Field Officer

Sensitive actions require authorization.

---

# 27. Mobile Screens

Create genuine mobile versions of:

- Dashboard
- Missions
- Cargo
- Inventory
- Emergency

Also make Cryo-Triage usable on mobile through a compact workflow:

Alert
→ Risk
→ TTCF
→ Plan
→ Approve

Use large controls and readable cards.

---

# 28. Application State Machine

Implement deterministic prototype state.

## Initial State

- C-421 = delayed 7 days
- risk = active
- Cryo-Triage = not analyzed
- station = online

## After Run Cryo-Triage

- cascade = calculated
- thermal prediction = active
- TTCF = visible
- optimization plans = available

## After Authorization

- resolution = applied
- ice cores = stable
- microbes = stabilized
- food = deprioritized
- mission/task state = updated

## Offline State

- station = offline
- Cryo-Triage = active locally
- optimization = active locally
- events = saved locally

## Reconnection

- sync = syncing
- then synced
- dashboard = updated

---

# 29. Prototype Data Model

Create mock data structures for:

```text
Mission
Cargo
InventoryItem
Personnel
Asset
Station
Alert
Risk
DependencyNode
ThermalProfile
InterventionResource
OptimizationPlan
Approval
SyncEvent
AuditLog
```

### ThermalProfile

Fields:

- currentTemperature
- criticalThreshold
- thermalResistance
- thermalCapacitance
- missionPriority
- TTCF

### InterventionResource

Fields:

- resourceName
- resourceType
- powerCapacity
- location
- availability
- transferTime
- assignedStatus

Keep demo data centralized so the full demo is deterministic.

---

# 30. Cryo-Triage Prototype Logic

Implement a prototype-safe deterministic thermal model.

Use a simple exponential thermal-decay model to calculate simulated TTCF.

Label the UI:

**SIMULATED MODEL**

Do not present prototype values as calibrated production physics.

Optimization should represent:

**MAXIMIZE MISSION VALUE SAVED**

Subject to:

- available power
- personnel time
- transfer time
- TTCF

The UI should expose the reasoning behind the selected plan.

---

# 31. Architecture Preparation

Structure the frontend so a future backend can replace the mock data cleanly.

Target architecture:

```text
Users / Tablets / Web
        ↓
React / Next.js
        ↓
FastAPI
        ↓
PostgreSQL + PostGIS
        ↓
Mission Intelligence Layer
   ├── Prediction
   ├── Dependency Graph
   ├── Risk Engine
   ├── Thermal Prediction
   ├── Optimization
   └── Simulation
        ↓
Offline Synchronization
        ↓
Station Local Node
   ├── SQLite / IndexedDB
   └── Local Operations
```

Preferred technology direction:

### Frontend
React  
Next.js  
Tailwind CSS

### Backend target
FastAPI  
REST APIs

### Database target
PostgreSQL  
PostGIS

### AI / Data target
Python  
NumPy  
Pandas  
scikit-learn

### Optimization target
Google OR-Tools  
MILP

### Mapping target
MapLibre  
Leaflet

### Offline target
IndexedDB  
SQLite  
Service Workers  
Event-based synchronization

### Security
RBAC  
Audit Logs

For a rapid prototype, frontend mock data is acceptable, but keep the architecture modular.

---

# 32. Implementation Priority

Build in this exact order.

## Priority 1 — Killer Demo

1. Dashboard
2. Cargo C-421
3. Dependency & Risk Cascade
4. Cryo-Triage
5. Optimization
6. Operator Approval
7. Updated Mission State
8. Station Local Node
9. Sync Center

## Priority 2 — Core PPT Modules

10. Missions
11. Inventory
12. Personnel
13. Assets
14. Emergency
15. Maps

## Priority 3 — Supporting Screens

16. Reports
17. Settings
18. Mobile experience
19. Architecture view

Do not spend most of the development time on secondary pages before the primary demo works.

---

# 33. Prototype Safety / Scope Rules

Do NOT build:

- blockchain governance
- live satellite APIs
- live Iridium telemetry
- autonomous drone routing
- autonomous robot routing
- generic LLM chatbot UI

Use controlled simulated data instead.

Maintain:

**human-in-the-loop**
and
**operator authorization**

for high-impact actions.

---

# 34. Interaction Requirements

Implement real interactions.

Examples:

### Dashboard

Click C-421 alert
→ Cargo Details

### Cargo Details

Click Affected Missions
→ Dependency & Risk Cascade

### Dependency Cascade

Click Run Cryo-Triage
→ Cryo-Triage

### Cryo-Triage

Click asset
→ Asset detail

Click Compare
→ scenario comparison

Click Explain Decision
→ explanation panel

Click Authorize Plan
→ governance modal

Click Confirm
→ Updated Mission State

Click Station Local Node
→ offline operations

Click Sync Center
→ pending queue

Click Simulate Reconnection
→ Syncing
→ Synced

Return to Dashboard
→ updated state

---

# 35. UX Quality

Add professional prototype feedback:

- hover states
- focus states
- active navigation
- loading states
- empty states
- error/retry states
- toast notifications
- smooth transitions
- graph animation
- thermal chart animation
- countdown animation
- approval confirmation
- sync progress

Do not over-animate.

---

# 36. Accessibility / Readability

Ensure:

- strong contrast
- readable typography
- clear status labels
- large primary controls
- no white text on white surfaces
- no faint text on white cards
- icons paired with labels where meaning may be ambiguous
- important actions clearly visible

---

# 37. Final Demo Acceptance Test

A tester must be able to:

1. Sign in
2. See the dashboard
3. Open C-421 delay alert
4. Inspect cargo details
5. View affected missions
6. Open dependency cascade
7. Run Cryo-Triage
8. Inspect thermal decay
9. See TTCF countdown
10. View optimization plan
11. Explain the decision
12. Authorize the plan
13. See updated mission state
14. Open Station Local Node
15. See offline execution
16. Open Sync Center
17. Simulate reconnection
18. Reach Synced state
19. Return to Dashboard
20. See updated mission status

All steps must work without unexpected navigation breaks.

---

# 38. Final Acceptance Criteria

The Antigravity prototype is complete when:

- all required PPT capabilities are represented
- Cryo-Triage is integrated
- the main demo flow is fully clickable
- application state changes correctly
- operator approval is explicit
- offline execution is demonstrated
- synchronization is demonstrated
- synthetic data is clearly labelled
- maps are consistent
- desktop and mobile use the same POLARIS design system
- the UI feels like a serious Antarctic operations platform
- the prototype is suitable for a Smart India Hackathon judging demonstration

## Final brand message

**POLARIS**

**PLAN. TRACK. OPTIMIZE. RESPOND.**  
**KEEP MISSIONS MOVING.**
