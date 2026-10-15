export interface KeywordResearchEntry {
  pageName: string;
  url: string;
  mainKeyword: string;
  relatedKeyword1: string;
  relatedKeyword2: string;
  searchIntent: 'Informational' | 'Navigational' | 'Commercial' | 'Transactional';
  monthlyVolumeEst: string;
  difficulty: 'Low' | 'Medium' | 'High';
  titleTag: string; // 50-60 characters following title rules
  metaDescription: string; // 140-160 characters following meta description rules
  targetAeoQuestion: string; // Direct user question for Answer Engine Optimization
  aeoSnippetAnswer: string; // 40-60 word authoritative answer
  featuredSnippetOpportunity: string;
}

export const KEYWORD_RESEARCH_TABLE: KeywordResearchEntry[] = [
  {
    pageName: 'Homepage (Digital Business & Design Notes)',
    url: '/',
    mainKeyword: 'digital business and design notes',
    relatedKeyword1: 'modern website architecture',
    relatedKeyword2: 'business data analytics frameworks',
    searchIntent: 'Informational',
    monthlyVolumeEst: '4,400',
    difficulty: 'Medium',
    titleTag: "Digital Business & Design Notes | Penil's Digital Space",
    metaDescription: 'Explore digital business and design notes on modern website architecture, executive data analytics frameworks, and vertical micro-SaaS strategy by Penil Vasani.',
    targetAeoQuestion: 'What is the intersection between digital business strategy and modern website architecture?',
    aeoSnippetAnswer: "The intersection of digital business and website architecture bridges quantitative business metrics (CAC, LTV, conversion velocity) with disciplined visual ergonomics (typographic measure, 50ms cognitive trust, high data-ink ratios). Balancing clean engineering with strategic monetization creates sustainable, high-margin digital products.",
    featuredSnippetOpportunity: 'Definition & Conceptual Overview'
  },
  {
    pageName: 'Article 1 (Website Architecture First Impressions)',
    url: '/articles/why-first-impressions-matter-in-website-architecture',
    mainKeyword: 'website architecture first impressions',
    relatedKeyword1: 'readable typography guidelines',
    relatedKeyword2: 'landing page cognitive threshold',
    searchIntent: 'Informational',
    monthlyVolumeEst: '2,900',
    difficulty: 'Low',
    titleTag: "Website Architecture First Impressions: Typography & UX | Penil's Space",
    metaDescription: 'Master website architecture first impressions. Learn why readable typography guidelines beat visual clutter within the 50ms landing page cognitive threshold.',
    targetAeoQuestion: 'Why do first impressions matter within 50 milliseconds in website architecture?',
    aeoSnippetAnswer: 'Users form aesthetic and credibility assessments of a website within 50 milliseconds because the human visual cortex evaluates balance, negative space, and typography before cognitive reading begins. Prioritizing spatial clarity and typographic restraint over distracting animations directly reduces bounce rates and establishes visitor trust.',
    featuredSnippetOpportunity: 'Featured Paragraph / Q&A Box'
  },
  {
    pageName: 'Article 2 (Organizing Business Data: Spreadsheets to Dashboards)',
    url: '/articles/organizing-business-data-spreadsheets-to-dashboards',
    mainKeyword: 'spreadsheets to dashboards',
    relatedKeyword1: 'executive business metrics',
    relatedKeyword2: 'high data ink ratio',
    searchIntent: 'Informational',
    monthlyVolumeEst: '3,800',
    difficulty: 'Medium',
    titleTag: "Spreadsheets to Dashboards: Executive Business Metrics | Penil's Space",
    metaDescription: 'Transform messy spreadsheets to dashboards with executive business metrics. Discover Edward Tufte\'s high data ink ratio principles for clear decision-making.',
    targetAeoQuestion: 'How do you triage raw business metrics into an effective executive dashboard?',
    aeoSnippetAnswer: 'Triage raw spreadsheet metrics by sorting records into three hierarchical tiers: one overarching North Star Metric (e.g., Net ARR), two to three Leading Indicators that forecast trajectory (e.g., Qualified Pipeline Velocity), and granular Trailing Diagnostic Drivers reserved for root-cause audits.',
    featuredSnippetOpportunity: 'Step-by-Step List Snippet'
  },
  {
    pageName: 'Article 3 (Digital Business Frameworks in 2026)',
    url: '/articles/digital-business-frameworks-generative-monetization',
    mainKeyword: 'digital business frameworks',
    relatedKeyword1: 'vertical micro saas economics',
    relatedKeyword2: 'software unit economics 2026',
    searchIntent: 'Commercial',
    monthlyVolumeEst: '2,100',
    difficulty: 'Medium',
    titleTag: "Digital Business Frameworks & Vertical Micro-SaaS | Penil's Space",
    metaDescription: 'Explore 2026 digital business frameworks and vertical micro saas economics. Learn how automated toolchains and software unit economics drive lean profitability.',
    targetAeoQuestion: 'Why are vertical micro-SaaS models replacing monolithic enterprise software?',
    aeoSnippetAnswer: 'Vertical micro-SaaS models are displacing horizontal monoliths because modern cloud infrastructure and AI toolchains enable lean engineering teams to build bespoke, deeply integrated workflows tailored to specific industries with near-zero marginal software production costs and 85%+ gross margins.',
    featuredSnippetOpportunity: 'Direct Comparison / Economic Table'
  }
];

export const ON_PAGE_SEO_CHECKLIST = [
  {
    rule: 'Unique Clean URLs',
    requirement: 'Lowercase, kebab-case, keyword-rich, no parameters or file extensions',
    status: 'Verified (100% compliant across homepage, articles, and subpages)',
    example: '/articles/why-first-impressions-matter-in-website-architecture'
  },
  {
    rule: 'Target Keywords (1 Main + 2 Related)',
    requirement: 'Explicitly mapped and naturally placed in H1, opening paragraph, and body',
    status: 'Verified (Explicitly defined and declared for AI Studio and search crawlers)',
    example: 'Main: spreadsheets to dashboards | Related: executive business metrics, high data ink ratio'
  },
  {
    rule: 'Title Tag Rules',
    requirement: '50-60 characters, primary keyword in leading position, branded suffix',
    status: 'Verified (Dynamically injected into <title>, og:title, twitter:title)',
    example: "Spreadsheets to Dashboards: Executive Business Metrics | Penil's Space (58 chars)"
  },
  {
    rule: 'Meta Description Rules',
    requirement: '140-160 characters, includes primary & related keywords, active voice with CTA',
    status: 'Verified (Dynamically updated on every route and canonical sync)',
    example: "Transform messy spreadsheets to dashboards with executive business metrics... (158 chars)"
  },
  {
    rule: 'Small Image Size with Alt Text',
    requirement: 'Dedicated unique image per article, lightweight vector (<5KB), descriptive alt text',
    status: 'Verified (Zero Cumulative Layout Shift, lazy-loaded, keyword-rich alt tags)',
    example: 'alt="Website architecture first impressions diagram showing 50ms cognitive threshold"'
  },
  {
    rule: 'Descriptive Anchor Text',
    requirement: 'No "click here" or "read more" without context; anchor text clearly describes target',
    status: 'Verified (Every link has descriptive semantic anchor text and accessible labels)',
    example: 'Read complete article on website architecture first impressions'
  },
  {
    rule: 'H2 Subheadings & Paragraphs in Q&A Format (AEO)',
    requirement: 'All H2s phrased as direct user queries followed by direct 40-60 word answer paragraphs',
    status: 'Verified (Optimized for Google AI Overviews, Perplexity, and ChatGPT search)',
    example: 'H2: Why do first impressions matter within 50ms? -> Direct answer paragraph upfront'
  },
  {
    rule: 'Schema.org JSON-LD Structured Data',
    requirement: 'FAQPage and Article structured data embedded dynamically for rich snippet extraction',
    status: 'Verified (Valid Schema.org WebSite, Article, and FAQPage schemas active)',
    example: 'type="application/ld+json" with questions, accepted answers, and author metadata'
  }
];
