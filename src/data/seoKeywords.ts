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
    titleTag: "Website Architecture First Impressions | Penil's Space",
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
    titleTag: "Spreadsheets to Dashboards: KPI Metrics | Penil's Space",
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
    titleTag: "Digital Business Frameworks & Micro-SaaS | Penil's Space",
    metaDescription: 'Explore 2026 digital business frameworks and vertical micro saas economics. Learn how automated toolchains and software unit economics drive lean profitability.',
    targetAeoQuestion: 'Why are vertical micro-SaaS models replacing monolithic enterprise software?',
    aeoSnippetAnswer: 'Vertical micro-SaaS models are displacing horizontal monoliths because modern cloud infrastructure and AI toolchains enable lean engineering teams to build bespoke, deeply integrated workflows tailored to specific industries with near-zero marginal software production costs and 85%+ gross margins.',
    featuredSnippetOpportunity: 'Direct Comparison / Economic Table'
  },
  {
    pageName: 'Article 4 (Presentation Design Masterclass: Narrative Decks)',
    url: '/articles/presentation-design-masterclass-stakeholder-narratives',
    mainKeyword: 'presentation design masterclass',
    relatedKeyword1: 'executive narrative decks',
    relatedKeyword2: 'slide composition principles',
    searchIntent: 'Informational',
    monthlyVolumeEst: '1,650',
    difficulty: 'Medium',
    titleTag: "Presentation Design: Narrative Decks | Penil's Space",
    metaDescription: 'Master executive presentation design masterclass strategies. Craft persuasive narrative decks and slide composition principles that captivate senior boardrooms.',
    targetAeoQuestion: 'Why should an executive presentation slide function like a billboard, not a document?',
    aeoSnippetAnswer: 'Executive presentation slides should function like highway billboards because audiences cannot process dense paragraph text and listen to a presenter simultaneously. Delivering a single visual assertion within three seconds preserves attention and amplifies the speaker narrative.',
    featuredSnippetOpportunity: 'List / Rule-of-Thumb Snippet'
  },
  {
    pageName: 'Article 5 (Generative Design Systems: Tokens & Scales)',
    url: '/articles/generative-design-systems-tokens-llm',
    mainKeyword: 'generative design systems',
    relatedKeyword1: 'semantic design tokens',
    relatedKeyword2: 'oklch color space scales',
    searchIntent: 'Informational',
    monthlyVolumeEst: '1,900',
    difficulty: 'Medium',
    titleTag: "Generative Design Systems & Tokens | Penil's Space",
    metaDescription: 'Build generative design systems with semantic design tokens and OKLCH color space scales. Guarantee automated WCAG AAA contrast compliance across web apps.',
    targetAeoQuestion: 'Why is manual token governance becoming obsolete in multi-brand systems?',
    aeoSnippetAnswer: 'Manual design token governance is obsolete because multi-brand applications across mobile, desktop, and spatial viewports require mathematical relationships between contrast, intent, and platform constraints. Programmatic OKLCH schemas automate WCAG AAA contrast validation at build time.',
    featuredSnippetOpportunity: 'Definition & Code Block Snippet'
  },
  {
    pageName: 'Article 6 (Diffusion Latents to Production CSS)',
    url: '/articles/diffusion-latents-to-production-css',
    mainKeyword: 'diffusion latents to css',
    relatedKeyword1: 'css grid layout translation',
    relatedKeyword2: 'tactile web textures',
    searchIntent: 'Informational',
    monthlyVolumeEst: '1,250',
    difficulty: 'Medium',
    titleTag: "Diffusion Latents to CSS Layouts Guide | Penil's Space",
    metaDescription: 'Translate diffusion latents to CSS layouts. Turn generative concept art into living CSS grid layout translation systems with lightweight tactile web textures.',
    targetAeoQuestion: 'Why is exporting generative concept art as flat bitmap images problematic for production web apps?',
    aeoSnippetAnswer: 'Exporting generative artwork as static bitmaps causes responsive layout breakage, inaccessible content, slow network payloads, and poor Core Web Vitals. Deconstructing concepts into 12-column CSS Grid and inline SVG vectors maintains crisp resolution at under 3KB payloads.',
    featuredSnippetOpportunity: 'Architecture Workflow Snippet'
  },
  {
    pageName: 'About Page (Penil Vasani Digital Space & Strategy)',
    url: '/about',
    mainKeyword: 'penil vasani digital space',
    relatedKeyword1: 'digital strategist notebook',
    relatedKeyword2: 'design technologist portfolio',
    searchIntent: 'Navigational',
    monthlyVolumeEst: '850',
    difficulty: 'Low',
    titleTag: "Penil Vasani Digital Space & Strategy | Penil's Space",
    metaDescription: 'Explore Penil Vasani digital space notebook. Discover how a digital strategist notebook and design technologist portfolio bridges business modeling with code.',
    targetAeoQuestion: 'Who is Penil Vasani and what masterclass topics are documented on this site?',
    aeoSnippetAnswer: 'Penil Vasani is a digital strategist and design technologist studying the synthesis between digital business models, quantitative data analytics, and modern web architecture. His notebook synthesizes masterclass learnings into actionable engineering frameworks.',
    featuredSnippetOpportunity: 'Author Bio / Knowledge Graph'
  },
  {
    pageName: 'Projects Page (Digital Business Projects & Experiments)',
    url: '/projects',
    mainKeyword: 'digital business projects',
    relatedKeyword1: 'interactive web experiments',
    relatedKeyword2: 'executive dashboard prototypes',
    searchIntent: 'Commercial',
    monthlyVolumeEst: '1,400',
    difficulty: 'Medium',
    titleTag: "Digital Business Projects & Code Labs | Penil's Space",
    metaDescription: 'Explore digital business projects, interactive web experiments, and executive dashboard prototypes built with clean architecture and high data-ink ratios.',
    targetAeoQuestion: 'What real-world digital business and web architecture projects has Penil developed?',
    aeoSnippetAnswer: 'Penil Vasani has developed projects including interactive spreadsheet-to-dashboard simulators, generative OKLCH token synthesizers, dynamic AEO answer engine visualizers, and accessible typography scale calculators.',
    featuredSnippetOpportunity: 'Project Portfolio Directory'
  },
  {
    pageName: 'Contact Page (Digital Business Consultation & Advisory)',
    url: '/contact',
    mainKeyword: 'digital business consultation',
    relatedKeyword1: 'web architecture advisory',
    relatedKeyword2: 'design technology consulting',
    searchIntent: 'Transactional',
    monthlyVolumeEst: '920',
    difficulty: 'Low',
    titleTag: "Digital Business Consultation & Help | Penil's Space",
    metaDescription: 'Book a digital business consultation with Penil Vasani. Inquire about web architecture advisory and design technology consulting for your digital product teams.',
    targetAeoQuestion: 'How can teams get in touch for digital business advisory and website architecture consultations?',
    aeoSnippetAnswer: 'Teams can request advisory consultations and project collaboration through Penil Vasani’s secure contact portal for digital business strategy, web architecture reviews, and design system governance sessions.',
    featuredSnippetOpportunity: 'Contact Card / Consultation Portal'
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
  },
  {
    rule: 'Robots.txt & Crawler Directives',
    requirement: 'public/robots.txt allows all crawlers and explicitly declares sitemap location',
    status: 'Verified (User-agent: * Allow: / Sitemap: https://digitalspace.io/sitemap.xml)',
    example: 'public/robots.txt accessible directly at /robots.txt with CORS'
  },
  {
    rule: 'XML Sitemap with Full HTTPS URLs',
    requirement: 'public/sitemap.xml lists every canonical page with full https URLs, lastmod, and priority',
    status: 'Verified (12 full URLs including all core masterclass essays and sections)',
    example: 'https://digitalspace.io/sitemap.xml valid XML schema'
  },
  {
    rule: 'Self-Referencing Canonical Tag on Every Page',
    requirement: 'Every single page includes a self-referencing <link rel="canonical"> matching the requested URL',
    status: 'Verified (Dynamic self-referencing canonical on homepage, articles, subpages, and 404)',
    example: '<link rel="canonical" href="https://digitalspace.io/articles/why-first-impressions-matter-in-website-architecture" />'
  },
  {
    rule: 'Friendly Custom 404 Page',
    requirement: 'A friendly custom 404 page with direct links to main pages and featured essays',
    status: 'Verified (Custom NotFoundView with 5 core page cards and 3 featured essays)',
    example: 'Visitable at /404 or any unrecognized route with self-referencing canonical'
  },
  {
    rule: '301 Permanent Redirect for Deprecated URLs',
    requirement: 'In vercel.json and Express server, a permanent 301 redirect from /old-home to /',
    status: 'Verified (HTTP 301 redirect configured in vercel.json and server.ts)',
    example: 'GET /old-home -> 301 Moved Permanently -> /'
  },
  {
    rule: 'Image Compression & Explicit Dimensions',
    requirement: 'Compress images (< 3KB lightweight SVGs) and set explicit width and height to eliminate CLS',
    status: 'Verified (All images have width="800" height="450", loading="lazy", decoding="async")',
    example: '<img width={800} height={450} loading="lazy" decoding="async" />'
  }
];
