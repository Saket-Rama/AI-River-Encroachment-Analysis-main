export interface EncroachmentImageItem {
  id: string;
  title: string;
  category: 'Residential Encroachment' | 'Agricultural Encroachment' | 'Riverbank Construction' | 'Waste Dumping' | 'Channel Narrowing' | 'Before & After';
  description: string;
  imageSrc: string;
  location: string;
  encroachmentSeverity: 'Moderate' | 'Severe' | 'Critical';
  floodImpact: string;
  beforeImageSrc?: string;
}

export const ENCROACHMENT_GALLERY: EncroachmentImageItem[] = [
  {
    id: 'encroach-1',
    title: 'High-Density Residential Inundation Zone',
    category: 'Residential Encroachment',
    description: 'Multi-story concrete residences and unauthorized retaining bulkheads constructed directly into the high-water active floodway, impeding natural drainage.',
    imageSrc: '/src/assets/images/encroach_residential_1794121957864.jpg',
    location: 'Lower Reaches, Ward 7 Floodplain',
    encroachmentSeverity: 'Critical',
    floodImpact: 'Restricts channel discharge capacity by 34%, creating backwater surging during monsoons.'
  },
  {
    id: 'encroach-2',
    title: 'Agricultural Expansion into Natural Wetland Buffer',
    category: 'Agricultural Encroachment',
    description: 'Commercial tillage and crop farming encroaching beyond demarcated riparian greenbelts, eroding vegetative root buffers and destabilizing riverbank slope.',
    imageSrc: '/src/assets/images/encroach_agriculture_1794121959177.jpg',
    location: 'Agricultural Catchment Basin Sector B',
    encroachmentSeverity: 'Severe',
    floodImpact: 'Eliminates 78% of natural water retention marshes, increasing peak flash runoff velocity.'
  },
  {
    id: 'encroach-3',
    title: 'Heavy Industrial Construction & Piling on Bank Edge',
    category: 'Riverbank Construction',
    description: 'Commercial foundation pilings, structural cranes, and concrete embankment walls erected within the statutory 50-meter river buffer easement.',
    imageSrc: '/src/assets/images/encroach_construction_1794121960087.jpg',
    location: 'District Port Authority Reach Mile 14',
    encroachmentSeverity: 'Critical',
    floodImpact: 'Deflects core hydraulic current towards opposite bank, aggravating severe downstream scouring.'
  },
  {
    id: 'encroach-4',
    title: 'Illegal Solid Waste & Debris Landfilling',
    category: 'Waste Dumping',
    description: 'Unregulated dumping of construction rubble, concrete blocks, and municipal refuse directly into river currents, raising bed elevation and channelling pollutants.',
    imageSrc: '/src/assets/images/encroach_waste_dump_1794121959743.jpg',
    location: 'Northern Industrial Drainage Confluence',
    encroachmentSeverity: 'Critical',
    floodImpact: 'Reduces river depth cross-section by 2.1m and obstructs culvert discharge pathways.'
  },
  {
    id: 'encroach-5',
    title: 'Severe Hydraulic Channel Narrowing & Bottleneck',
    category: 'Channel Narrowing',
    description: 'Bilateral shoreline encroachments from unauthorized rubble reclamation narrowing a 120-meter historical river channel down to under 38 meters.',
    imageSrc: '/src/assets/images/encroach_narrowed_1794121975574.jpg',
    location: 'Central Urban Transit Bottleneck',
    encroachmentSeverity: 'Critical',
    floodImpact: 'Generates upstream water ponding and amplifies rapid hydraulic head pressures.'
  },
  {
    id: 'encroach-6',
    title: 'Natural Riparian Forest vs Built Embankment',
    category: 'Before & After',
    description: 'Untouched pristine riparian wetland corridor with indigenous willow and reed ecosystems that naturally dissipate flood energy and buffer seasonal crests.',
    imageSrc: '/src/assets/images/riverbank_natural_before_1794121974988.jpg',
    beforeImageSrc: '/src/assets/images/encroach_residential_1794121957864.jpg',
    location: 'Upper Reserve Benchmark Reach',
    encroachmentSeverity: 'Moderate',
    floodImpact: 'Serves as baseline ecological benchmark for target watershed restoration programs.'
  }
];
