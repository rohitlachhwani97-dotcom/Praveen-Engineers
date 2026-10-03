import { ProductCategory, IndustryItem, ClientItem, SourcingCountry } from './types';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'power-sector-forgings',
    title: 'Power Sector Forgings',
    icon: 'Hammer',
    description: 'High-integrity open and closed die forgings, forged shafts, rings, discs, sleeves, and cylinders engineered for severe power equipment applications.',
    items: [
      'Open die forgings',
      'Closed die forgings',
      'Forged shafts',
      'Rings',
      'Discs',
      'Sleeves',
      'Cylinders'
    ]
  },
  {
    id: 'turbine-generator-shafts',
    title: 'Turbine & Generator Shafts',
    icon: 'Disc',
    description: 'Precision engineered shafts meeting stringent dimensional tolerances and non-destructive examination standards.',
    items: [
      'Hydro turbine shafts',
      'Generator shafts',
      'Rotor shafts',
      'Steam turbine shafts',
      'Roll shafts',
      'Crankshafts'
    ]
  },
  {
    id: 'heavy-steel-castings-machined-components',
    title: 'Heavy Steel Castings & Machined Components',
    icon: 'Flame',
    description: 'Heavy castings, precision machining, and fabricated components manufactured to client specifications and international codes.',
    items: [
      'Heavy castings',
      'Precision machining',
      'Fabricated components'
    ]
  },
  {
    id: 'power-plant-components',
    title: 'Power Plant Components',
    icon: 'Zap',
    description: 'Critical high-reliability parts for power plant installations, generation infrastructure, and industrial pressure systems.',
    items: [
      'Hydro-generator components',
      'Steam-turbine components',
      'Pressure-vessel components'
    ]
  },
  {
    id: 'industrial-valves',
    title: 'Industrial Valves',
    icon: 'Settings2',
    description: 'Heavy-duty valve bodies, critical industrial valves, and engineered special valves for high-pressure fluid control.',
    items: [
      'Valve bodies',
      'Industrial valves',
      'Special valves'
    ]
  },
  {
    id: 'power-generation-bearings',
    title: 'Power Generation Bearings',
    icon: 'ShieldCheck',
    description: 'Specialized bearing solutions including PTFE thrust pads, guide pads, Babbitt bearing pads, and full bearing assemblies for power plants.',
    items: [
      'PTFE thrust pads',
      'Guide bearing pads',
      'Babbitt bearing pads',
      'Thrust bearings',
      'Guide bearings'
    ]
  },
  {
    id: 'industrial-bearings-critical-spares',
    title: 'Industrial Bearings & Critical Spares',
    icon: 'CircleDot',
    description: 'Comprehensive range of spherical, cylindrical, tapered, slewing, rolling-mill, and custom large-diameter industrial bearings.',
    items: [
      'Spherical bearings',
      'Cylindrical bearings',
      'Tapered bearings',
      'Deep-groove bearings',
      'Rolling-mill bearings',
      'Slewing bearings',
      'Large-diameter and custom bearings'
    ]
  },
  {
    id: 'heavy-steel-plates',
    title: 'Heavy Steel Plates',
    icon: 'Layers',
    description: 'Heavy plates in carbon steel, alloy steel, stainless steel, boiler quality, and high-strength grades with full mill test certificates.',
    items: [
      'Carbon Steel Heavy Plates',
      'Alloy Steel Heavy Plates',
      'Stainless Steel Heavy Plates',
      'Special Steel Plates',
      'Pressure Vessel & Boiler Plates',
      'High-Strength Plates'
    ]
  }
];

export const INDUSTRIES: IndustryItem[] = [
  {
    id: 'power-plants',
    name: 'Power Plants',
    icon: 'Zap',
    description: 'Supplying critical boiler, turbine, and auxiliary components for thermal, hydro, and gas power generation.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'steel',
    name: 'Steel Industries',
    icon: 'HardHat',
    description: 'Providing heavy forgings, castings, wear-resistant plates, and process-control automation for rolling mills.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'oil-gas',
    name: 'Oil & Gas',
    icon: 'Fuel',
    description: 'Sourcing high-pressure actuated valves, precision instrumentation, and safety-compliant chemical pumps.',
    image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'petrochemical',
    name: 'Petrochemical',
    icon: 'FlaskConical',
    description: 'Sourcing corrosion-resistant PTFE bearings, specialized mechanical seals, and explosion-proof valves.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'mining',
    name: 'Mining & Excavation',
    icon: 'Shovel',
    description: 'Providing wear-resistant castings, heavy-duty gear pumps, and high-tensile custom structural parts.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cement',
    name: 'Cement Industry',
    icon: 'Building',
    description: 'Sourcing wear-resistant casting plates, robust roller bearings, and heavy fabrication spare parts.',
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'heavy-engineering',
    name: 'Heavy Engineering',
    icon: 'Construction',
    description: 'Procuring heavy custom forged shafts, giant flange rings, and precision CNC components.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    icon: 'Milestone',
    description: 'Delivering structural steel plates, custom fasteners, tubes, and infrastructure engineering assemblies.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'government',
    name: 'Government Sectors',
    icon: 'Building2',
    description: 'Participating in public tenders and delivering fully certified technical equipment to state-run bodies.',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'epc',
    name: 'EPC Contractors',
    icon: 'ClipboardCheck',
    description: 'Facilitating bulk packages, sourcing valves, and coordinating logistics for large-scale industrial projects.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing Plants',
    icon: 'Component',
    description: 'Supporting daily MRO, automation switch replacements, sensors, and standard machine tooling components.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800'
  }
];

export const SOURCING_COUNTRIES: SourcingCountry[] = [
  {
    name: 'Germany',
    flag: 'DE',
    description: 'Precision heavy machinery, advanced control/solenoid valves, and high-load industrial bearings engineered to stringent DIN/EN rules.',
    coordinates: { x: 49.5, y: 35.0 },
    primaryComponents: ['Control Valves', 'Safety Relief Valves', 'High-Load Ball Bearings', 'Open-Die Ring Forgings', 'Solenoid Valves', 'Precision Seals'],
    standards: ['DIN', 'EN 10204 3.1', 'TÜV', 'CE'],
    transitTime: '22-26 Days',
    shippingMode: 'Both'
  },
  {
    name: 'Italy',
    flag: 'IT',
    description: 'Actuated flow-control systems, high-integrity instrumentation manifolds, and custom heavy open-die forgings.',
    coordinates: { x: 50.5, y: 39.0 },
    primaryComponents: ['Actuated Gate/Globe Valves', 'Pneumatic Actuators', 'Instrumentation Manifolds', 'Heavy Forged Shafts', 'Flange Connections'],
    standards: ['ASME', 'EN 10204 3.2', 'PED 2014/68/EU', 'API 6D'],
    transitTime: '24-28 Days',
    shippingMode: 'Both'
  },
  {
    name: 'Slovenia',
    flag: 'SI',
    description: 'Specialized electromagnetic coils, custom motor parts, and high-performance explosion-proof casting assemblies.',
    coordinates: { x: 52.0, y: 36.8 },
    primaryComponents: ['Solenoid Coils', 'Explosion-Proof Coils', 'Pneumatic Spares', 'Vacuum Pump Shafts', 'Stainless Castings'],
    standards: ['ATEX', 'IECEx', 'CE', 'ISO 9001'],
    transitTime: '25-30 Days',
    shippingMode: 'Both'
  },
  {
    name: 'Japan',
    flag: 'JP',
    description: 'World-renowned high-speed bearings, robust automation sensors, and sub-micron machined rotating components.',
    coordinates: { x: 83.0, y: 44.0 },
    primaryComponents: ['High-speed Bearings', 'Sub-micron CNC Parts', 'Automation Sensors', 'Proximity Switches', 'Thrust Bearings'],
    standards: ['JIS', 'ISO 9001', 'KS', 'JASO'],
    transitTime: '15-18 Days',
    shippingMode: 'Both'
  },
  {
    name: 'South Korea',
    flag: 'KR',
    description: 'High-yield steel plate alloys, heavy boiler components, and large-scale sand and investment castings.',
    coordinates: { x: 80.5, y: 43.5 },
    primaryComponents: ['Alloy Steel Plates', 'Boiler Tubes', 'Heavy Sand Castings', 'Turbine Rotor Components', 'Expansion Joints'],
    standards: ['KS', 'JIS', 'ASME Section IX', 'Lloyds Register'],
    transitTime: '14-17 Days',
    shippingMode: 'Sea'
  },
  {
    name: 'Taiwan',
    flag: 'TW',
    description: 'Bespoke precision CNC machined items, high-efficiency solenoid assemblies, and custom engineering plastics.',
    coordinates: { x: 79.5, y: 48.0 },
    primaryComponents: ['CNC Machined Spares', 'High-efficiency Coils', 'PTFE Guide Bushings', 'Bronze Alloys', 'Level Switches'],
    standards: ['CNS', 'ISO 9001', 'UL Listed', 'CE'],
    transitTime: '12-15 Days',
    shippingMode: 'Both'
  },
  {
    name: 'China',
    flag: 'CN',
    description: 'Extensive casting foundries, heavy-duty raw forged blocks, and cost-optimized carbon/stainless steel structural profiles.',
    coordinates: { x: 74.0, y: 45.0 },
    primaryComponents: ['Steel Castings', 'Iron Casting Plates', 'Forged Gear Rings', 'Seamless Pipes', 'Wear Resistant Liners'],
    standards: ['GB', 'ASTM', 'EN 10204 3.1', 'ISO 14001'],
    transitTime: '10-14 Days',
    shippingMode: 'Sea'
  },
  {
    name: 'Canada',
    flag: 'CA',
    description: 'Advanced mining exploration components, wear-resistant slurry pumps, and specialized heavy-duty processing spares.',
    coordinates: { x: 22.0, y: 32.0 },
    primaryComponents: ['Heavy Slurry Pumps', 'Mining Drill Heads', 'Abrasion-Resistant Spares', 'High-pressure Seals'],
    standards: ['CSA', 'ASME Section VIII', 'CRN (Canadian Registration)'],
    transitTime: '30-35 Days',
    shippingMode: 'Both'
  },
  {
    name: 'USA',
    flag: 'US',
    description: 'High-precision flow control valves, specialized API specification oilfield equipment, and aerospace-grade alloys.',
    coordinates: { x: 25.0, y: 38.0 },
    primaryComponents: ['API Flow Valves', 'High-pressure Seals', 'Precision Alloy Shafts', 'Specialized Actuators'],
    standards: ['ASME', 'API', 'ANSI', 'ASTM'],
    transitTime: '25-30 Days',
    shippingMode: 'Both'
  },
  {
    name: 'Other European Markets',
    flag: 'EU',
    description: 'Consolidated procurement hubs across 15+ European states for specialized, rare, and legacy OEM equipment replacements.',
    coordinates: { x: 47.0, y: 32.0 },
    primaryComponents: ['Legacy OEM Spares', 'Instrumentation Switches', 'Special Bronze Bushings', 'Pneumatic Actuated Valves'],
    standards: ['CE', 'EN', 'DIN', 'TÜV Rheinland'],
    transitTime: '20-25 Days',
    shippingMode: 'Both'
  }
];

export const CLIENTS: ClientItem[] = [
  { name: 'BHEL', logoText: 'BHEL', type: 'Bharat Heavy Electricals Limited' },
  { name: 'NTPC', logoText: 'NTPC', type: 'National Thermal Power Corporation' },
  { name: 'NHPC', logoText: 'NHPC', type: 'National Hydroelectric Power Corporation' },
  { name: 'ONGC', logoText: 'ONGC', type: 'Oil and Natural Gas Corporation' },
  { name: 'SAIL', logoText: 'SAIL', type: 'Steel Authority of India Limited' },
  { name: 'Larsen & Toubro', logoText: 'L&T', type: 'Larsen & Toubro Heavy Engineering' },
  { name: 'Public & Private Major Industries', logoText: 'P&P', type: 'Major Industrial OEMs & Contractors' }
];

export const CORE_VALUES = [
  {
    title: 'Mission',
    icon: 'Target',
    text: 'To connect world-class manufacturers with Indian industry by delivering quality engineering products, responsive service, and reliable sourcing solutions.'
  },
  {
    title: 'Vision',
    icon: 'Compass',
    text: 'To build Praveen Engineers into a trusted global critical product sourcing and international business development partner, providing Indian industries with easy access to qualified overseas manufacturers and OEMs.'
  },
  {
    title: 'Values',
    icon: 'ShieldAlert',
    text: 'Built on the solid rock of absolute integrity, rigorous technical excellence, stringent quality assurance, complete transparency, long-term partnerships, and reliable on-time delivery.'
  }
];

export const VALUE_LIST = [
  'Integrity',
  'Technical Excellence',
  'Quality',
  'Transparency',
  'Long-Term Partnerships',
  'Reliable Delivery'
];

export const WHY_CHOOSE_US = [
  {
    title: 'Global Manufacturing Network',
    icon: 'Globe2',
    description: 'Direct relationships with approved manufacturers in Germany, Italy, Japan, Slovenia, Canada, and East Asia, bypassing multi-tier broker markups.'
  },
  {
    title: 'Technical Expertise',
    icon: 'Award',
    description: 'Engineers who speak your language. We thoroughly review complex technical datasheets, tolerances, and design specifications to prevent mismatch errors.'
  },
  {
    title: 'Quality Assurance',
    icon: 'ShieldCheck',
    description: 'All sourced shipments are backed by accredited materials test certificates (MTCs), raw material chemical analysis, and third-party inspection compliance.'
  },
  {
    title: 'Competitive Pricing',
    icon: 'TrendingDown',
    description: 'Through consolidated sea and air freight routing and close principal arrangements, we deliver international quality at optimized cost profiles.'
  },
  {
    title: 'Reliable Delivery',
    icon: 'Truck',
    description: 'Complete hands-on management of customs handling, clearing agent coordination, logistics routing, and last-mile transport to your factory floor.'
  },
  {
    title: 'Engineering Support',
    icon: 'Users',
    description: 'We act as the local liaison between Indian engineering teams and international manufacturers, from initial RFQs to after-sales support.'
  }
];
