# POLARIS — Google Stitch Prototype README

## Project

**POLARIS**  
**Integrated Polar Expedition Logistics and Asset Management System**

- **Problem Statement:** SIH26062
- **Organization:** Ministry of Earth Sciences (MoES)
- **Department:** National Centre for Polar and Ocean Research (NCPOR)
- **Theme:** Smart Automation
- **Team:** The Last Of Us
- **Team ID:** 156265
- **Tagline:** **PLAN. TRACK. OPTIMIZE. RESPOND. KEEP MISSIONS MOVING.**

---

## 1. Purpose

This README is **exclusively for Google Stitch**.

Use it as the complete UI/UX and clickable-prototype specification for POLARIS.

The goal is to create a **high-fidelity, responsive, connected prototype** for both desktop web and mobile.

Do not create a static image collage.  
Do not create a generic logistics SaaS dashboard.

The prototype must preserve all important functionality from the POLARIS PPT and add the **Cryo-Triage** innovation from the research document.

---

## 2. Source of Truth

Use the supplied materials in this order:

### A. POLARIS PPT
Defines the required core product capabilities and original logistics workflow.

### B. Polar Logistics Research Plan / Deep Research PDF
Adds:
- Cryo-Triage
- thermal prediction
- TTCF countdowns
- thermal decay curves
- emergency resource allocation
- optimization scenario
- offline local execution
- dedicated intelligence screens

### C. POLARIS UI/UX reference images
Define:
- visual language
- colors
- Antarctic visual identity
- layout
- cards
- tables
- maps
- alerts
- typography
- spacing
- overall polish

**Do not remove PPT functionality when integrating the research innovation.**

---

# 3. Product Concept

POLARIS is a centralized polar expedition operations system that connects:

- Mission Planning
- Cargo Tracking
- Inventory Management
- Personnel Tracking
- Asset Tracking
- Emergency Response
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
- Audit Logs
- Mapping
- Weather / operational context
- Simulated GPS / IoT data

The product should feel like a **professional Antarctic operations command center**.

---

# 4. Core Product Logic

The interface must communicate:

**DATA**
→ **DEPENDENCIES**
→ **RISK**
→ **PHYSICAL IMPACT**
→ **OPTIMIZATION**
→ **HUMAN DECISION**
→ **MISSION CONTINUITY**

### Standard POLARIS logistics flow

Cargo Delay  
→ Dependency Engine  
→ Affected Missions  
→ Inventory Check  
→ Risk  
→ Optimization  
→ Operator Approval

### Advanced Cryo-Triage flow

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

# 5. Visual Design System

Use the attached POLARIS visual references as the **primary design language**.

### Look and feel

- premium polar mission command center
- futuristic but realistic
- enterprise-grade
- professional
- high information density without clutter
- cinematic Antarctic imagery
- dark navy interface
- ice blue + cyan accents
- white typography
- green healthy states
- amber warnings
- red critical states
- blue active/information states
- modern glass + solid-panel hybrid
- rounded cards
- crisp borders
- subtle glow
- clear data hierarchy
- polished micro-interactions

### Colors

Primary:
- Deep Navy
- Ice Blue
- Cyan
- White

Status:
- Green = Healthy / Normal
- Blue = Active / Informational
- Amber = Warning
- Red = Critical

Use red and amber only where operational severity requires them.

### Avoid

- childish UI
- cartoon imagery
- generic admin dashboard templates
- excessive neon
- excessive glassmorphism
- unnecessary holograms
- fake sci-fi controls
- clutter
- hospital-style visual language

---

# 6. Global Desktop Shell

Use one consistent desktop application shell.

## Sidebar

POLARIS branding and:

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

Include:

- Global search
- Notifications
- Weather / Environment
- Connectivity state
- **SIMULATED DATA** badge
- User profile
- Date / Time

The sidebar and header should remain consistent across screens.

---

# 7. Mobile App

Create a genuine mobile experience.

Do not simply shrink the desktop dashboard.

Use:

- bottom navigation
- stacked cards
- large touch targets
- simple action hierarchy
- full-screen detail pages
- quick access to alerts and emergency

Recommended mobile navigation:

- Home
- Missions
- Cargo
- Inventory
- More

Emergency access must always remain easy to reach.

---

# 8. Required Screens

Create separate, usable, connected screens.

## 1. Login / Landing

Background:
- Antarctic research station
- snow
- mountains
- research vehicles
- ice
- polar sky

Left:
- POLARIS logo
- product name
- tagline
- feature tiles

Feature tiles:
- Mission Planning
- Cargo Tracking
- Inventory Management
- Personnel Movement
- Asset Management
- Emergency Response

Right:
- Welcome to POLARIS
- Command Center
- Username
- Password
- Sign In
- Forgot Password

Role selection:
- Admin
- Operator
- Field Officer

Notice:
**SIMULATED DATA**

Prototype disclaimer:
**Prototype using public documentation and synthetic/demo data.**

---

## 2. Global Mission Dashboard

Primary home screen.

### KPI cards

- Active Missions
- Total Cargo
- Inventory Items
- Personnel On Field

### Main map

**LIVE EXPEDITION MAP — ANTARCTICA**

Show:
- stations
- missions
- personnel
- cargo
- assets
- routes
- alerts

### Recent Alerts

Example:
**Cargo C-421 delayed**  
**Expected delay: 7 days**  
**Priority: High**

Other alerts:
- Generator spare-part low
- Team arrival updated
- Weather alert

Supporting cards:
- Ongoing Missions
- Cargo Tracking
- Inventory Status
- Personnel Tracking

The dashboard must quickly answer:
- What is happening?
- What is at risk?
- What is affected?
- What should the operator inspect?

---

## 3. Mission Operations

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

Synthetic examples:
- Maitri Station Supply
- Bharati Research Support
- Geological Survey
- Equipment Maintenance

Mission details:
- objective
- progress
- schedule
- route
- cargo
- personnel
- assets
- timeline

---

## 4. Cargo Tracking

Title:
**Cargo Tracking**

Subtitle:
Track expedition cargo, shipments and critical supplies across missions and stations.

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

### Mandatory PPT scenario

**C-421**  
Generator Spare Parts  
**Delayed — 7 days**  
Priority: High  
Affected Missions: 3

Detail tabs:
- Tracking Timeline
- Item Details
- Affected Missions
- Risk Analysis
- Optimization Options

Route map:
- Origin
- Current Location
- Destination
- Delay

---

## 5. Inventory Management

Top cards:
- Total Items
- Low Stock
- Critical Stock
- Stations

Tabs:
- All Items
- Low Stock
- Critical

Filters:
- Category
- Station
- Search

Table:
- Item Name
- Category
- Station
- Current Stock
- Minimum Stock
- Status
- Actions

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

## 6. Personnel Tracking

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

Map:
- stations
- personnel
- field teams
- routes
- alerts

Selected personnel panel:
- profile
- role
- station
- coordinates
- current mission
- team
- expected return
- last check-in
- status

Display:
**SIMULATED DATA**

---

## 7. Asset Tracking

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

Asset details:
- status
- location
- mission dependency
- power dependency
- maintenance
- temperature profile
- risk status

---

# 9. Intelligence Screens

## 8. Dependency & Risk Cascade

Flagship flow screen.

Title:
**Dependency & Risk Cascade**

Interactive node-link graph:

Fuel Delay  
↓  
Power Shortage  
↓  
Load Shedding  
↓  
Freezers Offline  
↓  
Scientific Assets Threatened

Also connect:
- Cargo
- Mission
- Inventory
- Power
- Station
- Assets
- Personnel

State colors:
- normal = green/blue
- warning = amber
- critical = red

Primary action:
**RUN CRYO-TRIAGE**

---

## 9. Risk & Optimization

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

Every recommendation shows:
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

# 10. Cryo-Triage

## 10. Cryo-Triage Intelligence

Flagship innovation.

Title:
**CRYO-TRIAGE**

Subtitle:
**Thermal-Decay-Aware Asset Protection Engine**

Purpose:
Connect logistics failures to physical thermal risk and optimize emergency resource allocation.

### Crisis banner

**BHARATI ICE CORE CRISIS**

Simulated event:
- ALCI Resupply Traverse AL-77
- Fuel: 10,000 L Jet A-1
- Delay: 96 hours
- Cause: Category 4 Blizzard
- Location: Schirmacher Oasis

Show:
**SIMULATED SCENARIO**

---

## 11. Cryo Assets

### Asset A
Freezer 1  
Paleoclimate Ice Cores  
Priority: **CRITICAL**

### Asset B
Freezer 2  
Marine Microbes  
Priority: **HIGH**

### Asset C
Freezer 3  
Perishable Food  
Priority: **LOW**

Each card:
- Current Temperature
- Critical Threshold
- Thermal Risk
- Time-to-Critical-Failure

Simulated example values:
- Ice Cores: **04h 12m 05s**
- Microbes: **11h 45m 00s**

---

## 12. Thermal Analysis

Main chart:
**Temperature vs Time**

For each asset show:
- current temperature
- critical threshold
- predicted crossing time
- thermal decay curve
- critical crossing point
- countdown

The visual should immediately answer:

**HOW MUCH TIME REMAINS?**

---

## 13. Emergency Resources

Show:
- Portable Battery Alpha
- Portable Battery Beta
- 1 Backup Freezer
- Available Personnel
- Available Shift Time

Each resource:
- power capacity
- location
- availability
- travel time
- assigned status

---

## 14. Optimization Recommendation

### Resolution Plan A

**Action 1**
Move Ice Cores to Medical Wing backup freezer.  
Transfer Time: 45 minutes.  
Status: Safe within TTCF.

**Action 2**
Connect Portable Battery Alpha to Freezer 2.  
Expected survival extension: 72 hours.

**Action 3**
Allow Freezer 3 food inventory to decay.  
Redirect personnel to secure dry-ration stores.

Show:
- Mission Value Saved
- Power Used
- Personnel Time
- Transfer Time
- Risk Reduction

Buttons:
- **EXPLAIN DECISION**
- **AUTHORIZE PLAN**

---

## 15. Operator Approval

Clicking **AUTHORIZE PLAN** opens a governance modal.

Title:
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

## 16. Updated Mission State

After authorization:

- Ice Cores → **SAFE / STABLE**
- Microbes → **STABILIZED**
- Food → **LOW PRIORITY / DECAY ALLOWED**

Then:
- countdown timers disappear
- dependency graph updates
- mission state updates
- task assignments update

Show:
**RESOLUTION APPLIED**

---

# 11. Offline-First Screens

## 17. Station Local Node

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

## 18. Synchronization Center

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

Flow:
Saved Locally  
→ Waiting for Connection  
→ Syncing  
→ Synced

Include conflict-resolution information.

Do not use blockchain.

---

# 12. Additional Operational Screens

## 19. Emergency Response

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

Incident details:
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

Keep human approval central.

---

## 20. Maps

Advanced Antarctica operations map.

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

Use MapLibre / Leaflet visual language.

---

## 21. Reports & Analytics

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

## 22. Settings / Security

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

# 13. Architecture Screen

Show the complete technical flow:

Users / Tablets / Web  
↓  
React / Next.js  
↓  
FastAPI  
↓  
PostgreSQL + PostGIS  
↓  
Mission Intelligence Layer  
- Prediction
- Dependency Graph
- Risk Engine
- Thermal Prediction
- Optimization
- Simulation  
↓  
Offline Synchronization Layer  
↓  
Station Local Node  
- SQLite / IndexedDB
- Local Operations

Make the architecture visually understandable rather than overly technical.

---

# 14. Technology Stack

Display:

### Frontend
React  
Next.js  
Tailwind CSS

### Backend
FastAPI  
REST APIs

### Database
PostgreSQL  
PostGIS

### AI / Data
Python  
Pandas  
NumPy  
scikit-learn

### Optimization
Google OR-Tools  
MILP

### Maps
MapLibre  
Leaflet

### Offline
SQLite  
IndexedDB  
Service Workers  
Event-based Synchronization

### Security
RBAC  
Audit Logs

---

# 15. Prototype Data

Use controlled synthetic/demo values.

Always display:

**SIMULATED DATA**

## Scenario A — Cargo

Cargo ID: C-421  
Description: Generator Spare Parts  
Delay: 7 Days  
Priority: High  
Affected Missions: 3

## Scenario B — Cryo-Triage

ALCI Resupply Traverse AL-77  
Fuel: 10,000 L Jet A-1  
Delay: 96 Hours  
Cause: Category 4 Blizzard  
Station: Bharati

## Cryogenic assets

- Paleoclimate Ice Cores
- Marine Microbes
- Perishable Food

## Emergency resources

- 2 Portable Batteries
- 1 Backup Freezer

---

# 16. Clickable Prototype Journey

The most important end-to-end flow is:

Dashboard  
→ click C-421 alert  
→ Cargo Details  
→ Affected Missions  
→ Dependency & Risk Cascade  
→ Run Cryo-Triage  
→ Cryo-Triage Intelligence  
→ inspect thermal curve  
→ inspect TTCF  
→ compare plans  
→ Explain Decision  
→ Authorize Plan  
→ Governance Modal  
→ Updated Mission State  
→ Station Local Node  
→ Sync Center  
→ Dashboard update after simulated reconnect

The prototype must have working navigation between these states.

---

# 17. Mobile Key Screens

Create mobile versions of:

1. Dashboard
2. Missions
3. Cargo
4. Cargo Details
5. Inventory
6. Personnel
7. Assets
8. Risk & Optimization
9. Dependency Cascade
10. Cryo-Triage
11. Emergency
12. Station Local Node
13. Sync Center

Keep the same POLARIS branding and visual system.

---

# 18. Stitch Design Rules

Google Stitch should:

- create each screen separately
- create reusable components
- maintain consistent spacing
- maintain consistent typography
- maintain consistent navigation
- maintain consistent maps
- maintain consistent badges
- maintain consistent alert styles
- preserve the POLARIS identity across desktop and mobile
- create usable clickable flows
- use realistic synthetic content
- avoid fake live-data claims

Do not reproduce the supplied reference collage as one screen.

Use the collage only as the visual reference.

---

# 19. What NOT to Build

Do not add:

- Blockchain governance
- Live satellite-data integrations
- Live Iridium telemetry
- Autonomous drone/robot routing
- Generic LLM chatbot interfaces

These are outside the intended prototype scope.

---

# 20. Stitch Success Criteria

The prototype is ready when:

- all PPT core capabilities are represented
- Cryo-Triage is integrated
- the standard C-421 logistics workflow works
- the Cryo-Triage crisis workflow works
- operator approval is explicit
- offline execution is visible
- sync queue is visible
- desktop and mobile share one visual identity
- simulated data is clearly labelled
- all key screens are clickable
- the UI looks like a serious Antarctic operations platform
- the entire story can be demonstrated quickly

## Final product message

**POLARIS**

**PLAN. TRACK. OPTIMIZE. RESPOND.**  
**KEEP MISSIONS MOVING.**
