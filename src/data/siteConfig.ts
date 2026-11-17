/**
 * Centralized editable configuration for Think4AD.
 * Update contact details, office location, social URLs, service offerings,
 * client feedback entries, and legal jurisdiction details in this file.
 */

export interface ServiceItem {
  id: string;
  index: string;
  category: 'ooh-branding' | 'print-design' | 'fabrication' | 'digital';
  categoryLabel: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  engagementModel: string;
  featuredSpan?: 'wide' | 'standard';
  image: string;
  imageAlt: string;
}

export interface WhyChooseItem {
  index: string;
  title: string;
  summary: string;
  detail: string;
}

export interface FeatureBenefitItem {
  title: string;
  benefit: string;
  technicalStandard: string;
}

export interface TestimonialSlot {
  id: string;
  engagementType: string;
  clientAttribution: string;
  quoteTemplate: string;
  isEditablePlaceholder: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const SITE_CONFIG = {
  brand: {
    name: 'Think4AD',
    domain: 'Think4AD',
    url: 'https://think4ad.com',
    tagline: 'OOH · Fabrication · Installation — Branding, Print, Design & Digital.',
    foundedNote: 'Planning · Execution · Results',
  },
  contact: {
    email: 'aapkaadthink4ad@gmail.com',
    emailLabel: 'aapkaadthink4ad@gmail.com',
    phoneDisplay: '+91 8934 00 4444',
    phoneHref: 'tel:+918934004444',
    whatsappNumber: '918934004444',
    whatsappDefaultMessage:
      'Hello Think4AD team, I would like to discuss a branding, printing, fabrication, or digital inquiry.',
    address: 'Vidhyawati Bhawan Lane -7, Varunapuri Colony, Phulwaria, Cantt, Varanasi - 221002',
    businessHours: 'Mon – Sat · 9:30 AM – 6:30 PM IST',
    responseExpectation: 'Replies within 1 business day.',
  },
  social: [
    {
      name: 'YouTube',
      href: 'https://youtu.be/-ewwUCW79sM?si=O-tptJkqMCZ7Rapb',
      handle: 'YouTube Channel',
    },
    {
      name: 'Pinterest',
      href: 'https://pin.it/kmrZjyGq4',
      handle: 'Pinterest',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/think-4ad-352073450/',
      handle: 'LinkedIn',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61596783265267',
      handle: 'Facebook',
    },
  ],
  images: {
    brandBanner: {
      src: '/assets/aistudio/IMG-20261116-WA0005_dfb6044c.jpg',
      alt: 'Think4AD logo and five divisions: Branding Promotion, Printing Solution, Graphic Design, Fabrication Installation, Digital Online Solution',
    },
    oohShowcase: {
      src: '/assets/aistudio/IMG-20261116-WA0006_1412758a.jpg',
      alt: 'Think4AD OOH Fabrication and Installation showcase featuring billboard structure, metro advertising, transport fleet, and manpower',
    },
    about: {
      src: '/src/assets/images/think4ad_retail_ooh_branding_1794896602134.jpg',
      alt: 'Think4AD OOH and Retail Branding: Dealer Board, Glowsign Board, Inshop Branding, and Display Van',
    },
    metroBranding: {
      src: '/src/assets/images/think4ad_metro_advertising_corridor_1794896971498.jpg',
      alt: 'Illuminated metro station advertising corridor and transit panels',
    },
    printing: {
      src: '/src/assets/images/think4ad_large_format_printing_1794896741989.jpg',
      alt: 'Large-format CMYK printing production at Think4AD',
    },
    design: {
      src: '/src/assets/images/think4ad_graphic_design_studio_1794896738970.jpg',
      alt: 'Graphic design and outdoor campaign artwork workstation',
    },
    fabrication: {
      src: '/src/assets/images/think4ad_steel_fabrication_site_1794896740940.jpg',
      alt: 'Steel billboard structure and cladding installation crew',
    },
    digital: {
      src: '/src/assets/images/service_web_engineering_1794828018900.jpg',
      alt: 'Digital and web interface engineering display',
    },
    studioTeam: {
      src: '/src/assets/images/hero_aapaakad_studio_1794828019556.jpg',
      alt: 'Think4AD planning and campaign coordination team',
    },
    displayFleet: {
      src: '/src/assets/images/think4ad_display_van_fleet_1794896971221.jpg',
      alt: 'Branded promotional display van fleet ready for nationwide campaigns',
    },
    glowsignStore: {
      src: '/src/assets/images/think4ad_glowsign_inshop_store_1794896972012.jpg',
      alt: 'Illuminated retail glowsign dealer board and inshop showroom branding',
    },
    consultation: {
      src: '/src/assets/images/contact_executive_lounge_1794828019125.jpg',
      alt: 'Client campaign consultation lounge',
    },
    highwayUnipole: {
      src: '/src/assets/images/think4ad_highway_unipole_hoarding_1794897150789.jpg',
      alt: 'Illuminated highway unipole billboard hoarding at sunset',
    },
    steelWorkshop: {
      src: '/src/assets/images/think4ad_steel_workshop_welding_1794897151947.jpg',
      alt: 'Steel billboard truss welding inside Think4AD fabrication workshop',
    },
    busShelter: {
      src: '/src/assets/images/think4ad_bus_shelter_transit_ad_1794897152135.jpg',
      alt: 'Backlit city bus shelter transit advertising display at twilight',
    },
    exhibitionBooth: {
      src: '/src/assets/images/think4ad_exhibition_booth_branding_1794897151498.jpg',
      alt: 'Custom fabricated exhibition booth and commercial brand kiosk',
    },
    safetyCrane: {
      src: '/src/assets/images/think4ad_safety_installation_crane_1794897153615.jpg',
      alt: 'Certified boom-lift crew installing commercial building fascia signage',
    },
    airportLed: {
      src: '/src/assets/images/think4ad_airport_digital_led_1794897651076.jpg',
      alt: 'Airport departure concourse digital LED video wall and backlit brand pillars',
    },
    acpCladding: {
      src: '/src/assets/images/think4ad_acp_cladding_facade_1794897649955.jpg',
      alt: 'Showroom exterior with architectural ACP cladding and 3D illuminated signage',
    },
    metroWrap: {
      src: '/src/assets/images/think4ad_metro_train_wrap_1794897650386.jpg',
      alt: 'Elevated city metro train wrapped in full-color vinyl brand advertising',
    },
    mallAtrium: {
      src: '/src/assets/images/think4ad_mall_atrium_branding_1794897652313.jpg',
      alt: 'Shopping mall atrium with suspended drop banners and escalator glass wraps',
    },
  },
  legal: {
    effectiveDate: 'November 16, 2026',
    governingJurisdiction: 'Varanasi, Uttar Pradesh, India',
    privacyOfficerEmail: 'aapkaadthink4ad@gmail.com',
  },
};

export interface GalleryItem {
  id: string;
  title: string;
  src: string;
  alt: string;
  aspect: '16:9' | '4:3';
}

export const EXECUTION_GALLERY: GalleryItem[] = [
  {
    id: 'highway-unipole',
    title: 'Highway Unipoles & Hoardings',
    src: SITE_CONFIG.images.highwayUnipole.src,
    alt: SITE_CONFIG.images.highwayUnipole.alt,
    aspect: '16:9',
  },
  {
    id: 'bus-shelter',
    title: 'Transit & Bus Shelter Displays',
    src: SITE_CONFIG.images.busShelter.src,
    alt: SITE_CONFIG.images.busShelter.alt,
    aspect: '4:3',
  },
  {
    id: 'exhibition-booth',
    title: 'Exhibition Stalls & Kiosks',
    src: SITE_CONFIG.images.exhibitionBooth.src,
    alt: SITE_CONFIG.images.exhibitionBooth.alt,
    aspect: '4:3',
  },
  {
    id: 'steel-workshop',
    title: 'Steel Truss Fabrication',
    src: SITE_CONFIG.images.steelWorkshop.src,
    alt: SITE_CONFIG.images.steelWorkshop.alt,
    aspect: '4:3',
  },
  {
    id: 'safety-crane',
    title: 'High-Elevation Site Mounting',
    src: SITE_CONFIG.images.safetyCrane.src,
    alt: SITE_CONFIG.images.safetyCrane.alt,
    aspect: '4:3',
  },
  {
    id: 'airport-led',
    title: 'Airport LED & Pillar Media',
    src: SITE_CONFIG.images.airportLed.src,
    alt: SITE_CONFIG.images.airportLed.alt,
    aspect: '4:3',
  },
  {
    id: 'acp-cladding',
    title: 'ACP Cladding & 3D Signage',
    src: SITE_CONFIG.images.acpCladding.src,
    alt: SITE_CONFIG.images.acpCladding.alt,
    aspect: '4:3',
  },
  {
    id: 'metro-wrap',
    title: 'Metro Train Exterior Wraps',
    src: SITE_CONFIG.images.metroWrap.src,
    alt: SITE_CONFIG.images.metroWrap.alt,
    aspect: '4:3',
  },
  {
    id: 'mall-atrium',
    title: 'Mall Atrium & Escalator Branding',
    src: SITE_CONFIG.images.mallAtrium.src,
    alt: SITE_CONFIG.images.mallAtrium.alt,
    aspect: '4:3',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'branding-promotion',
    index: '01',
    category: 'ooh-branding',
    categoryLabel: 'Outdoor & Retail',
    title: 'Branding & Promotion',
    shortDescription: 'Hoardings, metro ads, dealer boards, glowsigns, inshop branding & display vans.',
    fullDescription:
      'High-visibility outdoor and retail branding across hoardings, metro stations, storefronts, and display vans.',
    deliverables: [
      'Hoardings & metro ads',
      'Dealer & glowsign boards',
      'Inshop & display vans',
    ],
    engagementModel: 'Campaign rollout',
    featuredSpan: 'wide',
    image: SITE_CONFIG.images.metroBranding.src,
    imageAlt: SITE_CONFIG.images.metroBranding.alt,
  },
  {
    id: 'printing-solutions',
    index: '02',
    category: 'print-design',
    categoryLabel: 'Large-Format Print',
    title: 'Printing Solutions',
    shortDescription: 'Flex, vinyl, backlit displays, standees & commercial CMYK print.',
    fullDescription:
      'Weather-resistant outdoor flex, vinyl graphics, backlit panels, and crisp commercial print runs.',
    deliverables: [
      'Frontlit & backlit flex',
      'Vinyl wraps & glass print',
      'Standees & POS displays',
    ],
    engagementModel: 'On-demand or campaign',
    featuredSpan: 'standard',
    image: SITE_CONFIG.images.printing.src,
    imageAlt: SITE_CONFIG.images.printing.alt,
  },
  {
    id: 'graphic-design',
    index: '03',
    category: 'print-design',
    categoryLabel: 'Creative Studio',
    title: 'Graphic Design',
    shortDescription: 'Billboard creatives, brand identity & print-ready campaign layouts.',
    fullDescription:
      'Bold outdoor artwork, visual identities, and print-ready files built for instant readability.',
    deliverables: [
      'Hoarding & metro artwork',
      'Logos & brand systems',
      'Print-ready layouts',
    ],
    engagementModel: 'Project or retainer',
    featuredSpan: 'standard',
    image: SITE_CONFIG.images.design.src,
    imageAlt: SITE_CONFIG.images.design.alt,
  },
  {
    id: 'fabrication-installation',
    index: '04',
    category: 'fabrication',
    categoryLabel: 'Steel & Site Crew',
    title: 'Fabrication & Installation',
    shortDescription: 'Steel billboard structures, cladding, fleet transport & safe mounting.',
    fullDescription:
      'In-house steel fabrication, all-size cladding, nationwide transport fleet, and supervised site installation.',
    deliverables: [
      'Steel structure & cladding',
      'Nationwide fleet transport',
      'Skilled installation crew',
    ],
    engagementModel: 'Turnkey execution',
    featuredSpan: 'wide',
    image: SITE_CONFIG.images.fabrication.src,
    imageAlt: SITE_CONFIG.images.fabrication.alt,
  },
  {
    id: 'digital-online-solution',
    index: '05',
    category: 'digital',
    categoryLabel: 'Web & Online',
    title: 'Digital & Online Solutions',
    shortDescription: 'Websites, social media marketing & SEO-ready digital campaigns.',
    fullDescription:
      'Responsive websites, social media promotion, and search-ready campaigns paired with your offline reach.',
    deliverables: [
      'Websites & landing pages',
      'Social media campaigns',
      'SEO & WhatsApp funnels',
    ],
    engagementModel: 'Project or monthly',
    featuredSpan: 'wide',
    image: SITE_CONFIG.images.digital.src,
    imageAlt: SITE_CONFIG.images.digital.alt,
  },
];

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    index: '01',
    title: 'Fabrication Infrastructure',
    summary: 'Steel frames & cladding in all sizes.',
    detail: 'Workshop-built structures ready for fast site mounting.',
  },
  {
    index: '02',
    title: 'Manpower Team',
    summary: 'Skilled fabricators & site technicians.',
    detail: 'Trained field teams focused on clean, safe execution.',
  },
  {
    index: '03',
    title: 'Transportation Fleet',
    summary: 'Safe, on-time nationwide delivery.',
    detail: 'Direct logistics for structures, panels, and prints.',
  },
  {
    index: '04',
    title: 'Installation & Monitoring',
    summary: 'Safety-first mounting & tracking.',
    detail: 'Verified checklists from blueprint to final handover.',
  },
];

export const FEATURES_AND_BENEFITS: FeatureBenefitItem[] = [
  {
    title: 'One-Stop Execution',
    benefit: 'Design, print, fabrication, transport & installation together.',
    technicalStandard: 'Planning · Execution · Results',
  },
  {
    title: 'Safety Priority',
    benefit: 'Supervised site mounting with structural safety checks.',
    technicalStandard: 'Site safety verified',
  },
  {
    title: 'Offline + Online',
    benefit: 'Street-level OOH paired with web and digital promotion.',
    technicalStandard: 'Unified brand reach',
  },
  {
    title: 'Fast Support',
    benefit: 'Direct quotes via phone, email, or WhatsApp.',
    technicalStandard: '1-day response',
  },
];

export const TESTIMONIAL_SLOTS: TestimonialSlot[] = [
  {
    id: 'slot-1',
    engagementType: 'OOH & Fabrication',
    clientAttribution: '[Client Name] · [Company]',
    quoteTemplate: 'Editable slot: Verified client quote for hoarding or metro branding.',
    isEditablePlaceholder: true,
  },
  {
    id: 'slot-2',
    engagementType: 'Print & Design',
    clientAttribution: '[Client Name] · [Company]',
    quoteTemplate: 'Editable slot: Approved quote on print quality and artwork.',
    isEditablePlaceholder: true,
  },
  {
    id: 'slot-3',
    engagementType: 'Digital Solutions',
    clientAttribution: '[Client Name] · [Company]',
    quoteTemplate: 'Editable slot: Verified feedback on digital campaign results.',
    isEditablePlaceholder: true,
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-services',
    question: 'What services does Think4AD provide?',
    answer:
      'Branding & Promotion (OOH, Metro, Dealer & Glowsign Boards), Printing Solutions, Graphic Design, Fabrication & Installation, and Digital Solutions.',
  },
  {
    id: 'faq-fabrication',
    question: 'Do you handle both fabrication and transport?',
    answer:
      'Yes. We handle steel structures, cladding in all sizes, nationwide transport, and on-site installation.',
  },
  {
    id: 'faq-print-design',
    question: 'Do you design artwork before printing?',
    answer:
      'Yes. Our graphic design team prepares print-ready layouts for every size.',
  },
  {
    id: 'faq-contact',
    question: 'How can I request a quote?',
    answer:
      'Use the Contact form, call us, email us, or click the WhatsApp button.',
  },
];
