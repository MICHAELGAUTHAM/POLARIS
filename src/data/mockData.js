// POLARIS Prototype Deterministic Data Store
// Aligned with SIH26062 - NCPOR / MoES Requirements

export const STATIONS = [
  {
    id: 'bharati',
    name: 'Bharati Station',
    location: 'Larsemann Hills, East Antarctica',
    coordinates: '69°24′28″S 76°11′14″E',
    status: 'OPERATIONAL',
    connectivity: 'OFFLINE_LOCAL',
    temp: -28,
    wind: '42 kt (Gusts 58 kt)',
    weather: 'Category 4 Blizzard',
    powerGrid: '50% Load Shedding Active',
    personnelCount: 24,
    leadOfficer: 'Dr. Michael Gautham (Commander)'
  },
  {
    id: 'maitri',
    name: 'Maitri Station',
    location: 'Schirmacher Oasis, Queen Maud Land',
    coordinates: '70°45′58″S 11°43′56″E',
    status: 'OPERATIONAL',
    connectivity: 'ONLINE_IRIDIUM',
    temp: -19,
    wind: '18 kt',
    weather: 'Overcast, Blowing Snow',
    powerGrid: 'Nominal (3x 120kVA)',
    personnelCount: 18,
    leadOfficer: 'Dr. Rajesh Sharma'
  },
  {
    id: 'dakshin_gangotri',
    name: 'Dakshin Gangotri',
    location: 'Ice Shelf (Unmanned Supply Depot)',
    coordinates: '70°05′37″S 12°00′00″E',
    status: 'REMOTE_MONITORED',
    connectivity: 'INTERMITTENT',
    temp: -34,
    wind: '32 kt',
    weather: 'Severe Cold Freeze',
    powerGrid: 'Autonomous Solar/Wind Buffer',
    personnelCount: 0,
    leadOfficer: 'Remote Sensor Node 04'
  }
];

export const INITIAL_CARGO = [
  {
    id: 'C-421',
    description: 'Generator Spare Parts & High-Pressure Turbine Seals',
    category: 'Critical Engineering',
    status: 'DELAYED',
    delayDays: 7,
    priority: 'HIGH',
    affectedMissionsCount: 3,
    location: 'ALCI Airfield Transit (Delayed at Schirmacher Oasis)',
    carrier: 'ALCI Air Cargo / PistenBully Traverse 02',
    weight: '840 kg',
    etaOriginal: '2026-10-02',
    etaRevised: '2026-10-09 (+7 Days)',
    destinationStation: 'Bharati Station',
    linkedMissions: ['M-105', 'M-102', 'M-103'],
    riskImpact: 'Primary power turbine overhaul at Bharati blocked. Station running on single auxiliary generator with 0% n+1 redundancy.',
    notes: 'Blocked by Category 4 Blizzard across Ingrid Christensen Coast.'
  },
  {
    id: 'C-422',
    description: 'ALCI Resupply Traverse AL-77 (10,000 L Jet A-1 Fuel)',
    category: 'Fuel & Energy',
    status: 'DELAYED',
    delayHours: 96,
    priority: 'CRITICAL',
    affectedMissionsCount: 4,
    location: 'Schirmacher Oasis Glacier Pass (Halted)',
    carrier: 'Heavy Snowcat Convoy 07',
    weight: '8,200 kg',
    etaOriginal: '2026-10-01',
    etaRevised: '2026-10-05 (+96 Hours)',
    destinationStation: 'Bharati Station',
    linkedMissions: ['M-101', 'M-102', 'M-103', 'M-105'],
    riskImpact: 'Forces station load-shedding protocol. Non-essential research freezers powered down.',
    notes: 'Trigger event for Bharati Ice Core Cryo-Triage Crisis.'
  },
  {
    id: 'C-423',
    description: 'Deep Ice Core Drilling Drill Bits (Tungsten-Carbide)',
    category: 'Scientific Equipment',
    status: 'IN_TRANSIT',
    delayDays: 0,
    priority: 'MEDIUM',
    affectedMissionsCount: 1,
    location: 'En route from Cape Town (Vessel MV Vasiliy Golovnin)',
    carrier: 'Ocean Icebreaker',
    weight: '1,200 kg',
    etaOriginal: '2026-10-18',
    etaRevised: '2026-10-18 (On Schedule)',
    destinationStation: 'Bharati Station',
    linkedMissions: ['M-102'],
    riskImpact: 'None currently.',
    notes: 'Vessel penetrating outer pack ice belt at 64°S.'
  },
  {
    id: 'C-424',
    description: 'Cryogenic Liquid Nitrogen Dewars (4x 200L)',
    category: 'Cryogenic Consumables',
    status: 'AT_STATION',
    delayDays: 0,
    priority: 'HIGH',
    affectedMissionsCount: 2,
    location: 'Bharati Station Science Bay Alpha',
    carrier: 'Station Inventory',
    weight: '980 kg',
    etaOriginal: 'Delivered',
    etaRevised: 'Stored',
    destinationStation: 'Bharati Station',
    linkedMissions: ['M-102', 'M-103'],
    riskImpact: 'Reserve boil-off rate 2.2% per day.',
    notes: 'Monitored under asset cryo-telemetry.'
  },
  {
    id: 'C-425',
    description: 'Emergency Dry Rations (1,200 MRE Packs)',
    category: 'Life Support / Food',
    status: 'AT_STATION',
    delayDays: 0,
    priority: 'MEDIUM',
    affectedMissionsCount: 0,
    location: 'Bharati Habitation Module B',
    carrier: 'Station Logistics',
    weight: '620 kg',
    etaOriginal: 'Delivered',
    etaRevised: 'Stocked',
    destinationStation: 'Bharati Station',
    linkedMissions: [],
    riskImpact: 'Full 90-day survival buffer intact.',
    notes: 'Used as fallback if Freezer 3 food inventory decays.'
  }
];

export const INITIAL_MISSIONS = [
  {
    id: 'M-101',
    name: 'Bharati Winter Power & Fuel Continuity',
    station: 'Bharati',
    status: 'AT_RISK',
    priority: 'CRITICAL',
    startDate: '2026-09-15',
    endDate: '2026-11-30',
    progress: 42,
    lead: 'Dr. Michael Gautham',
    objective: 'Maintain uninterrupted 24/7 life support, scientific lab heating, and cryogenic preservation through winter blizzards.',
    dependencies: ['C-421', 'C-422'],
    riskLevel: 'CRITICAL',
    description: 'Threatened by fuel traverse delay (AL-77) and generator spare parts delay (C-421).'
  },
  {
    id: 'M-102',
    name: 'Paleoclimate Deep Ice Core Extraction & Preservation',
    station: 'Bharati',
    status: 'AT_RISK',
    priority: 'CRITICAL',
    startDate: '2026-08-01',
    endDate: '2026-12-15',
    progress: 68,
    lead: 'Dr. Ananya Sen (Paleoclimatologist)',
    objective: 'Safeguard 120,000-year glacial climate archive extracted from Larsemann inland ice dome.',
    dependencies: ['C-422', 'Freezer 1'],
    riskLevel: 'SEVERE_THERMAL',
    description: 'Irreplaceable sample worth 15 years of expedition funding. Critical failure threshold at -15.0°C.'
  },
  {
    id: 'M-103',
    name: 'Larsemann Hills Marine Microbial Extremophiles',
    station: 'Bharati',
    status: 'AT_RISK',
    priority: 'HIGH',
    startDate: '2026-09-01',
    endDate: '2026-11-20',
    progress: 55,
    lead: 'Dr. Vikram Seth (Marine Biologist)',
    objective: 'Cultivate sub-zero psychrophilic bacteria synthesizing novel cold-active enzymes.',
    dependencies: ['C-422', 'Freezer 2'],
    riskLevel: 'HIGH_THERMAL',
    description: 'Strains stored in Freezer 2. Threshold -50.0°C. TTCF 11h 45m.'
  },
  {
    id: 'M-104',
    name: 'Queen Maud Land Geological & Magnetic Survey',
    station: 'Maitri',
    status: 'ACTIVE',
    priority: 'MEDIUM',
    startDate: '2026-09-10',
    endDate: '2026-10-30',
    progress: 74,
    lead: 'Dr. Rajesh Sharma',
    objective: 'Lithospheric geophysical transect using ground-penetrating radar.',
    dependencies: [],
    riskLevel: 'LOW',
    description: 'Operations proceeding normally from Maitri main hub.'
  },
  {
    id: 'M-105',
    name: 'Bharati Central Turbine & Generator Overhaul',
    station: 'Bharati',
    status: 'BLOCKED',
    priority: 'HIGH',
    startDate: '2026-09-28',
    endDate: '2026-10-14',
    progress: 15,
    lead: 'Eng. David O’Connor (Chief Electrical)',
    objective: 'Rebuild high-pressure seals and replace turbine bearings on Generator unit #1.',
    dependencies: ['C-421'],
    riskLevel: 'HIGH',
    description: 'Blocked awaiting arrival of C-421 spare parts.'
  }
];

export const INITIAL_INVENTORY = [
  {
    id: 'INV-GF200',
    partNo: 'GF-200',
    name: 'Generator Filter & Turbine High-Pressure Seal Kit',
    category: 'Power Plant Spares',
    station: 'Bharati',
    currentStock: 0,
    minStock: 4,
    status: 'CRITICAL',
    shortageImpact: 'Precludes preventative maintenance overhaul of main power generator G-1.',
    linkedMissions: ['M-105', 'M-101'],
    reorderSuggestion: 'Auto-requisitioned via C-421 (Delayed in transit)'
  },
  {
    id: 'INV-FUEL-JETA1',
    partNo: 'POL-JETA1',
    name: 'Jet A-1 Winterized Polar Turbine Fuel',
    category: 'Fuel Reserves',
    station: 'Bharati',
    currentStock: '3,400 L (4.2 Days at load shed)',
    minStock: '12,000 L',
    status: 'CRITICAL',
    shortageImpact: 'Triggers load-shedding sequence 3. All non-essential labs disconnected.',
    linkedMissions: ['M-101', 'M-102', 'M-103'],
    reorderSuggestion: 'Traverse AL-77 en route (Delayed 96 hrs due to blizzard)'
  },
  {
    id: 'INV-CRYO-N2',
    partNo: 'CRYO-LN2',
    name: 'Liquid Nitrogen (LN2) Reserve Dewars',
    category: 'Cryogenic Consumables',
    station: 'Bharati',
    currentStock: '380 L',
    minStock: '200 L',
    status: 'NOMINAL',
    shortageImpact: 'Sufficient for passive cooling backup if sealed.',
    linkedMissions: ['M-102'],
    reorderSuggestion: 'Normal stock'
  },
  {
    id: 'INV-MRE-DRY',
    partNo: 'RAT-MRE-90',
    name: 'Emergency Packaged Survival Dry Rations',
    category: 'Life Support',
    station: 'Bharati',
    currentStock: '1,200 Units (90 days)',
    minStock: '600 Units',
    status: 'NOMINAL',
    shortageImpact: 'Provides 100% human nutritional safety net if Freezer 3 perishable food is sacrificed.',
    linkedMissions: ['M-101'],
    reorderSuggestion: 'Well stocked'
  },
  {
    id: 'INV-BATT-LFP',
    partNo: 'PWR-LFP-48',
    name: 'Lithium Iron Phosphate Portable Emergency Packs',
    category: 'Emergency Power',
    station: 'Bharati',
    currentStock: 2,
    minStock: 2,
    status: 'NOMINAL',
    shortageImpact: 'Alpha & Beta units ready for Cryo-Triage deployment.',
    linkedMissions: ['M-102', 'M-103'],
    reorderSuggestion: 'Active duty'
  }
];

export const INITIAL_PERSONNEL = [
  {
    id: 'P-01',
    name: 'Dr. Michael Gautham',
    role: 'Station Operations Commander',
    station: 'Bharati',
    status: 'ON_DUTY',
    location: 'Command Center Node',
    coordinates: '69°24′28″S 76°11′14″E',
    currentMission: 'M-101 (Power Continuity)',
    lastCheckIn: '2 mins ago',
    clearance: 'COMMANDER_ADMIN'
  },
  {
    id: 'P-02',
    name: 'Dr. Ananya Sen',
    role: 'Lead Paleoclimatologist',
    station: 'Bharati',
    status: 'CRISIS_STATION',
    location: 'Cryogenic Science Lab 1',
    coordinates: '69°24′30″S 76°11′18″E',
    currentMission: 'M-102 (Ice Core Protection)',
    lastCheckIn: 'Just now',
    clearance: 'CHIEF_SCIENTIST'
  },
  {
    id: 'P-03',
    name: 'Eng. David O’Connor',
    role: 'Chief Electrical & Power Engineer',
    station: 'Bharati',
    status: 'ON_DUTY',
    location: 'Generator Bay 1',
    coordinates: '69°24′26″S 76°11′10″E',
    currentMission: 'M-105 (Overhaul Logistics)',
    lastCheckIn: '5 mins ago',
    clearance: 'LEAD_ENGINEER'
  },
  {
    id: 'P-04',
    name: 'Capt. Tenzing Norbu',
    role: 'Logistics & Overland Traverse Officer',
    station: 'Bharati',
    status: 'STANDBY',
    location: 'Vehicle Workshop & Garage',
    coordinates: '69°24′29″S 76°11′22″E',
    currentMission: 'M-101 / Traverse Liaison',
    lastCheckIn: '12 mins ago',
    clearance: 'FIELD_OFFICER'
  },
  {
    id: 'P-05',
    name: 'Dr. Vikram Seth',
    role: 'Marine Microbiologist',
    station: 'Bharati',
    status: 'ON_DUTY',
    location: 'Biology Lab 2',
    coordinates: '69°24′31″S 76°11′20″E',
    currentMission: 'M-103 (Marine Microbes)',
    lastCheckIn: '8 mins ago',
    clearance: 'SCIENTIST'
  }
];

export const INITIAL_ASSETS = [
  {
    id: 'AST-FRZ-01',
    name: 'Freezer 1 (Ultra-Cold Scientific Vault)',
    type: 'Cryogenic Freezer',
    station: 'Bharati',
    status: 'OFFLINE_POWER_CUT',
    condition: 'CRITICAL_THERMAL_DECAY',
    powerState: '0 kW (Grid Dropped)',
    mission: 'M-102 (Ice Cores)',
    tempCurrent: -22.4,
    tempTarget: -30.0,
    tempThreshold: -15.0,
    lastUpdate: 'Live Sensor 1s ago'
  },
  {
    id: 'AST-FRZ-02',
    name: 'Freezer 2 (Biological Sample Vault)',
    type: 'Cryogenic Freezer',
    station: 'Bharati',
    status: 'OFFLINE_POWER_CUT',
    condition: 'THERMAL_DRIFT',
    powerState: '0 kW (Grid Dropped)',
    mission: 'M-103 (Microbes)',
    tempCurrent: -78.1,
    tempTarget: -80.0,
    tempThreshold: -50.0,
    lastUpdate: 'Live Sensor 1s ago'
  },
  {
    id: 'AST-FRZ-03',
    name: 'Freezer 3 (Station Food Storage)',
    type: 'Commercial Freezer',
    station: 'Bharati',
    status: 'OFFLINE_POWER_CUT',
    condition: 'THERMAL_DRIFT',
    powerState: '0 kW (Grid Dropped)',
    mission: 'General Station Logistics',
    tempCurrent: -18.0,
    tempTarget: -20.0,
    tempThreshold: -4.0,
    lastUpdate: 'Live Sensor 1s ago'
  },
  {
    id: 'AST-GEN-01',
    name: 'Main Station Generator G-1 (250 kVA)',
    type: 'Power Generator',
    station: 'Bharati',
    status: 'MAINTENANCE_HOLD',
    condition: 'AWAITING_SEALS',
    powerState: '0 kW (Shut Down)',
    mission: 'M-105',
    lastUpdate: '10 mins ago'
  },
  {
    id: 'AST-GEN-02',
    name: 'Auxiliary Generator G-2 (250 kVA)',
    type: 'Power Generator',
    station: 'Bharati',
    status: 'RUNNING_AT_MAX',
    condition: 'HIGH_LOAD',
    powerState: '165 kW (Supplying essential life support only)',
    mission: 'M-101',
    lastUpdate: 'Live'
  },
  {
    id: 'AST-VEH-01',
    name: 'PistenBully 300 Polar Tracked Transporter',
    type: 'Vehicle',
    station: 'Bharati',
    status: 'STANDBY',
    condition: 'EXCELLENT',
    powerState: 'Diesel Heated',
    mission: 'Emergency Transport Ready',
    lastUpdate: '30 mins ago'
  }
];

export const CRYO_ASSETS_DATA = [
  {
    id: 'freezer-1',
    name: 'Freezer 1',
    content: 'Paleoclimate Ice Cores (120,000 yr record)',
    priority: 'CRITICAL',
    currentTemp: -22.4,
    criticalThreshold: -15.0,
    nominalTemp: -30.0,
    thermalRisk: 'CRITICAL / IMMINENT FAILURE',
    ttcfSeconds: 15125, // 04h 12m 05s
    scientificValue: 'High Heritage (Irreplaceable)',
    decayRatePerHour: 1.75,
    thermalResistance: 4.2,
    thermalCapacitance: 120,
    volume: '220 Liters',
    state: 'THREATENED'
  },
  {
    id: 'freezer-2',
    name: 'Freezer 2',
    content: 'Marine Microbes & Cold-Active Enzymes',
    priority: 'HIGH',
    currentTemp: -78.1,
    criticalThreshold: -50.0,
    nominalTemp: -80.0,
    thermalRisk: 'HIGH',
    ttcfSeconds: 42300, // 11h 45m 00s
    scientificValue: 'Extremely Rare Bio-samples',
    decayRatePerHour: 2.39,
    thermalResistance: 5.8,
    thermalCapacitance: 95,
    volume: '180 Liters',
    state: 'THREATENED'
  },
  {
    id: 'freezer-3',
    name: 'Freezer 3',
    content: 'Perishable Food & Fresh Supplies',
    priority: 'LOW',
    currentTemp: -18.0,
    criticalThreshold: -4.0,
    nominalTemp: -20.0,
    thermalRisk: 'MODERATE',
    ttcfSeconds: 101400, // 28h 10m 00s
    scientificValue: 'Replaceable via Dry Rations',
    decayRatePerHour: 0.50,
    thermalResistance: 3.1,
    thermalCapacitance: 210,
    volume: '850 Liters',
    state: 'THREATENED'
  }
];

export const EMERGENCY_RESOURCES = [
  {
    id: 'res-bat-alpha',
    name: 'Portable Battery Alpha',
    type: 'Lithium Iron Phosphate (LFP) High-Capacity Unit',
    powerCapacity: '48 kWh',
    location: 'Workshop Bay 2',
    availability: 'IMMEDIATE',
    travelTime: '15 Minutes',
    assignedStatus: 'UNASSIGNED',
    compatibility: 'Direct DC inverter hookup to Freezer 2 or 1'
  },
  {
    id: 'res-bat-beta',
    name: 'Portable Battery Beta',
    type: 'Lithium Iron Phosphate (LFP) Mobile Unit',
    powerCapacity: '24 kWh',
    location: 'Habitation Module Corridor',
    availability: 'IMMEDIATE',
    travelTime: '20 Minutes',
    assignedStatus: 'UNASSIGNED',
    compatibility: 'Backup instrument power'
  },
  {
    id: 'res-bkp-frz',
    name: '1 Backup Ultra-Low Freezer',
    type: 'Medical Wing Cold Vault (-80°C Rated)',
    powerCapacity: 'Tied to Medical Emergency UPS Bus',
    location: 'Bharati Medical Wing (Bay 3)',
    availability: 'STANDBY',
    travelTime: '45 Minutes Transfer Window',
    assignedStatus: 'STANDBY',
    compatibility: 'Accommodates 250L Cryo-Ice Cores securely'
  },
  {
    id: 'res-personnel',
    name: 'Available Emergency Personnel',
    type: 'Field Technicians & Logistics Officers',
    powerCapacity: 'N/A',
    location: 'Station Command Hub',
    availability: '4 Specialists Ready (Team Alpha & Beta)',
    travelTime: 'Immediate',
    assignedStatus: 'STANDBY',
    compatibility: 'Certified Polar Cryo Relocation Protocols'
  },
  {
    id: 'res-shift-time',
    name: 'Available Shift Window',
    type: 'Operational Weather Window',
    powerCapacity: 'N/A',
    location: 'External Corridor Link',
    availability: '6.0 Hours before peak blizzard whiteout lockdown',
    travelTime: 'N/A',
    assignedStatus: 'TICKING',
    compatibility: 'External transit permissible with safety tethers'
  }
];

export const OPTIMIZATION_PLAN_A = {
  id: 'PLAN-A',
  name: 'Resolution Plan A: Targeted Cryo-Decay Preservation',
  title: 'Targeted Tri-Asset Protection Matrix (Recommended)',
  objective: 'MAXIMIZE MISSION VALUE SAVED (94.8%)',
  actions: [
    {
      step: 1,
      title: 'Move Ice Cores to Medical Wing Backup Freezer',
      detail: 'Deploy 2 Logistics Technicians with insulated cryo-transfer sleds. Physical relocation of Paleoclimate Ice Cores to Medical Wing -80°C vault.',
      transferTime: '45 minutes',
      status: 'Safe within TTCF (04h 12m limit; safety margin 3h 27m)',
      icon: 'Snowflake'
    },
    {
      step: 2,
      title: 'Connect Portable Battery Alpha to Freezer 2',
      detail: 'Hook up 48 kWh Battery Alpha directly to Marine Microbes refrigeration compressor.',
      expectedSurvivalExtension: '+72 Hours (Spans the 96h blizzard fuel resupply window)',
      status: 'Microbes stabilized at -78°C',
      icon: 'BatteryCharging'
    },
    {
      step: 3,
      title: 'Allow Freezer 3 Food Inventory to Decay & Redirect Rations',
      detail: 'Intentionally decouple Freezer 3. Authorize station mess transition to 1,200 packaged MRE dry-rations in Habitation Core.',
      expectedSurvivalExtension: 'Food loss accepted; zero human risk',
      status: 'Dry-ration stock confirmed adequate for 90 days',
      icon: 'AlertTriangle'
    }
  ],
  metrics: {
    missionValueSaved: '94.8%',
    powerUsed: '42 kWh / 72 kWh Available',
    personnelTime: '3.5 Man-Hours / 12 Available',
    transferTime: '45 Minutes',
    riskReduction: '82% Cascade Risk Reduction'
  },
  comparisonWithPlanB: {
    planBTitle: 'Plan B: Equal Battery Sharing (Naive Split)',
    planBOutcome: 'Battery Alpha & Beta split evenly across all 3 freezers. Both batteries deplete in ~6 hours. ALL 3 freezers undergo thermal failure simultaneously. Mission value saved: 0%. Total catastrophe.'
  }
};

export const INITIAL_SYNC_QUEUE = [
  {
    id: 'SYNC-EVT-01',
    event: 'CRYO_RESOLUTION_AUTHORIZED',
    description: 'Cryo-Triage Plan A authorized by Commander Gautham',
    status: 'SAVED_LOCALLY',
    timestamp: '2026-10-02 17:15:20',
    entity: 'Freezer 1 & 2',
    hash: '0x8f2a...c41e'
  },
  {
    id: 'SYNC-EVT-02',
    event: 'ASSET_LOCATION_UPDATE',
    description: 'Ice Cores transit logged: Science Lab 1 -> Medical Wing Vault',
    status: 'SAVED_LOCALLY',
    timestamp: '2026-10-02 17:16:05',
    entity: 'AST-FRZ-01',
    hash: '0x3d7b...9a02'
  },
  {
    id: 'SYNC-EVT-03',
    event: 'BATTERY_ALPHA_DISPATCH',
    description: 'Portable Battery Alpha deployed to Freezer 2 power bus',
    status: 'SAVED_LOCALLY',
    timestamp: '2026-10-02 17:16:40',
    entity: 'AST-FRZ-02',
    hash: '0x1e88...b5f1'
  },
  {
    id: 'SYNC-EVT-04',
    event: 'MISSION_STATE_UPDATE',
    description: 'M-102 (Ice Cores) & M-103 updated from AT_RISK to STABILIZED',
    status: 'SAVED_LOCALLY',
    timestamp: '2026-10-02 17:17:12',
    entity: 'M-102, M-103',
    hash: '0x5c90...e8d3'
  },
  {
    id: 'SYNC-EVT-05',
    event: 'PERSONNEL_TASK_ASSIGN',
    description: 'Tech Team Alpha assigned to Cryo Transport protocols',
    status: 'SAVED_LOCALLY',
    timestamp: '2026-10-02 17:17:55',
    entity: 'P-03, P-04',
    hash: '0x7a41...29cb'
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'AUD-001',
    timestamp: '2026-10-02 16:45:00',
    actor: 'SYSTEM_AUTOPOLAR',
    action: 'WEATHER_ALERT_RAISED',
    details: 'Category 4 Blizzard registered at Schirmacher Oasis. ALCI convoy halted.',
    severity: 'WARNING'
  },
  {
    id: 'AUD-002',
    timestamp: '2026-10-02 16:50:12',
    actor: 'SYSTEM_AUTOPOLAR',
    action: 'CARGO_STATUS_CHANGED',
    details: 'Cargo C-421 delay flagged (+7 days). Generator overhaul blocked.',
    severity: 'WARNING'
  },
  {
    id: 'AUD-003',
    timestamp: '2026-10-02 17:01:40',
    actor: 'BHARATI_LOCAL_ENGINE',
    action: 'POWER_LOAD_SHED',
    details: 'Auxiliary generator G-2 at 92% load. Non-essential science grid dropped.',
    severity: 'CRITICAL'
  },
  {
    id: 'AUD-004',
    timestamp: '2026-10-02 17:05:18',
    actor: 'BHARATI_LOCAL_ENGINE',
    action: 'CRYO_THERMAL_ALERT',
    details: 'Freezers 1, 2, 3 offline. Ambient indoor temperature rising.',
    severity: 'CRITICAL'
  }
];
