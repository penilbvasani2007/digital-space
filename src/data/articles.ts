import { Article } from '../types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-01',
    slug: 'why-first-impressions-matter-in-website-architecture',
    title: 'Why First Impressions Matter in Website Architecture',
    subtitle: 'Readable typography and intuitive navigation triumph over flashy animations in the first fifty milliseconds.',
    excerpt: 'When studying the essentials of website design, the most striking realization is how quickly users decide to stay or leave. Let’s break down the core elements of a welcoming landing page, focusing on readable typography and intuitive navigation over flashy animations.',
    author: {
      name: 'Penil Vasani',
      role: 'Digital Strategist & Design Technologist',
      avatar: 'PV',
      bio: 'Penil explores digital business frameworks, web architecture, and data analytics. Writing notes from recent masterclasses.'
    },
    publishedAt: 'October 6, 2026',
    readTime: '5 min read',
    category: 'Web Design',
    tags: ['Web Design', 'Typography', 'Navigation', 'Ergonomics'],
    claps: 418,
    commentsCount: 34,
    featured: true,
    editorialPick: true,
    coverAccent: '#D96C4A',
    visualGraphic: 'first-impressions',
    sections: [
      {
        title: 'The 50-Millisecond Cognitive Threshold',
        content: 'When studying the essentials of website design, the most striking realization is how quickly users decide to stay or leave. Psychological studies show that people form aesthetic judgements about a webpage within 50 milliseconds. In that instantaneous sliver of time, the brain cannot parse complex marketing sentences; it simply registers balance, negative space, and visual calmness.',
        pullQuote: 'A welcoming interface does not scream for attention; it creates an immediate sense of spatial clarity and trust.'
      },
      {
        title: 'Readable Typography over Visual Clutter',
        content: 'Too many modern landing pages bombard visitors with floating cards, auto-playing video reels, and intrusive sticky banners that obscure thirty percent of the screen. In contrast, enduring digital products lead with unmistakable typographic hierarchy: high-contrast headings constrained to 65–75 characters per line, generous vertical rhythm, and an unambiguous primary pathway.',
        codeSnippet: {
          language: 'css',
          code: `/* Architectural Typographic Foundation */
:root {
  --font-display: 'Helvetica Neue', Arial, sans-serif;
  --font-body: 'Georgia', serif;
  --text-measure: 68ch;
  --line-height-body: 1.65;
}

.hero-heading {
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  line-height: 1.1;
  letter-spacing: -0.025em;
  text-wrap: balance;
}`,
          caption: 'Fig 1.1 — Clean measure and proportional heading scale'
        }
      },
      {
        title: 'The Three Zones of Intuitive Navigation',
        content: 'Navigation should adhere to the universal three-zone contract: a single-line wordmark, four to five clear text links with hover state underlines, and one high-intent action button. By eliminating nested mega-menus and ornamental badges, users feel in complete control of their journey.'
      }
    ],
    interactiveWidget: {
      type: 'architecture',
      title: 'First Impressions Layout Auditor',
      caption: 'Compare cluttered visual noise with disciplined architectural clarity.'
    },
    keyTakeaways: [
      'Users form gut-level credibility assessments within 50 milliseconds.',
      'Prioritize comfortable typographic measure (65–75ch) over heavy visual decoration.',
      'Maintain an unambiguous 3-zone top bar with zero ornamental clutter.'
    ],
    suggestedPrompt: 'Analyze this landing page layout. Audit visual density, identify elements causing cognitive overload in the first viewport, and simplify to a 3-zone semantic hierarchy.'
  },
  {
    id: 'art-02',
    slug: 'organizing-business-data-spreadsheets-to-dashboards',
    title: 'Organizing Business Data: From Spreadsheets to Dashboards',
    subtitle: 'Transforming dense tabular records into crisp, actionable visual displays that empower decision-makers.',
    excerpt: 'Raw data is only as good as the story it tells. In this post, I walk through the practical steps of taking standard spreadsheet records and turning them into clear, actionable visual dashboards that actually help teams make decisions.',
    author: {
      name: 'Penil Vasani',
      role: 'Digital Strategist & Design Technologist',
      avatar: 'PV',
      bio: 'Penil explores digital business frameworks, web architecture, and data analytics. Writing notes from recent masterclasses.'
    },
    publishedAt: 'October 3, 2026',
    readTime: '6 min read',
    category: 'Data Analytics',
    tags: ['Data Analytics', 'Dashboards', 'Business Intelligence', 'Metrics'],
    claps: 379,
    commentsCount: 29,
    featured: true,
    editorialPick: true,
    coverAccent: '#2D2A26',
    visualGraphic: 'dashboard',
    sections: [
      {
        title: 'The Spreadsheet Gridlock',
        content: 'Raw data is only as good as the story it tells. In this post, I walk through the practical steps of taking standard spreadsheet records and turning them into clear, actionable visual dashboards that actually help teams make decisions. Most teams drown in 40-column Google Sheets or Excel workbooks where critical signals are lost in a sea of identical monospace cells.',
        pullQuote: 'A dashboard is not an exhaustive encyclopedia of all recorded numbers; it is an executive cockpit designed for immediate operational clarity.'
      },
      {
        title: 'Step 1: Metric Triaging & Saliency Hierarchy',
        content: 'Before writing a single chart component or drawing a canvas, classify your spreadsheet columns into three tiers:\n1. North Star Metric: The single overarching indicator of health (e.g. Monthly Recurring Revenue, Net Retention Rate).\n2. Leading Operational Indicators: Metrics that forecast tomorrow’s performance (e.g. Qualified Demo Inbounds, Activation Rate).\n3. Trailing Diagnostic Drivers: Granular records investigated only when anomalies occur.'
      },
      {
        title: 'Step 2: Maximizing Data-Ink Ratio',
        content: 'Edward Tufte coined the data-ink ratio: the proportion of ink used to display actual information versus decorative framing. Strip away heavy gridlines, eliminate drop shadows on bars, and render numbers with tabular numerals (font-mono tabular-nums) so columns align vertically for effortless human comparison.',
        codeSnippet: {
          language: 'tsx',
          code: `// Executive Metric KPI Block
export function MetricCard({ label, value, delta, isPositive }: MetricProps) {
  return (
    <div className="p-4 bg-white border border-[#E5E0D8] rounded-lg">
      <span className="text-xs font-mono uppercase text-[#595550]">{label}</span>
      <div className="text-2xl font-mono font-semibold tabular-nums text-[#2D2A26] mt-1">
        {value}
      </div>
      <span className={\`text-xs font-mono mt-1 block \${isPositive ? 'text-emerald-700' : 'text-rose-700'}\`}>
        {delta} vs previous month
      </span>
    </div>
  );
}`,
          caption: 'Fig 2.1 — High data-ink executive metric component'
        }
      }
    ],
    interactiveWidget: {
      type: 'dashboard',
      title: 'Spreadsheet-to-Dashboard Simulator',
      caption: 'Adjust business metrics in the spreadsheet matrix to see instant executive KPIs and visual trajectory.'
    },
    keyTakeaways: [
      'Filter out non-actionable columns before attempting visual synthesis.',
      'Elevate North Star indicators to top-level prominence with tabular numerals.',
      'Maximize data-ink ratio by eliminating heavy borders, 3D effects, and decorative charts.'
    ],
    suggestedPrompt: 'Convert this CSV schema into a high-saliency executive dashboard design in React. Group metrics into North Star, Leading, and Trailing categories with sparkline trends.'
  },
  {
    id: 'art-03',
    slug: 'digital-business-frameworks-generative-monetization',
    title: 'Digital Business Frameworks in 2026: The Rise of Vertical Micro-SaaS',
    subtitle: 'How automated toolchains and low marginal operational costs are rewriting unit economics.',
    excerpt: 'Analyzing the structural shift from monolithic enterprise software suites toward bespoke vertical workflows powered by modern web architecture.',
    author: {
      name: 'Penil Vasani',
      role: 'Digital Strategist & Design Technologist',
      avatar: 'PV',
      bio: 'Penil explores digital business frameworks, web architecture, and data analytics. Writing notes from recent masterclasses.'
    },
    publishedAt: 'September 28, 2026',
    readTime: '7 min read',
    category: 'Digital Business',
    tags: ['Digital Business', 'Unit Economics', 'Micro-SaaS', 'Strategy'],
    claps: 512,
    commentsCount: 41,
    coverAccent: '#D96C4A',
    visualGraphic: 'generative-ui',
    sections: [
      {
        title: 'The Collapse of Software Manufacturing Costs',
        content: 'When the cost to author frontend markup, database schemas, and API connectors approaches zero, software defensibility shifts entirely from code quantity to domain specificity and workflow ergonomics.',
        pullQuote: 'Defensibility in digital business is no longer software code; it is workflow integration and customer trust.'
      },
      {
        title: 'The 3-Part Micro-SaaS Flywheel',
        content: 'Modern digital businesses scale through three compounding assets: proprietary data schemas, automated self-serve onboarding, and transparent subscription pricing with zero sales overhead.'
      }
    ],
    interactiveWidget: {
      type: 'tone',
      title: 'Business Model Unit Economics Calibrator',
      caption: 'Observe how customer acquisition cost and gross margins shift across business models.'
    },
    keyTakeaways: [
      'Target hyper-vertical workflows rather than competing with horizontal behemoths.',
      'Focus engineering leverage on friction-free customer onboarding.',
      'Treat software as an ongoing service relationship rather than a static product.'
    ],
    suggestedPrompt: 'Formulate a 1-page digital business model canvas for a specialized web design automation utility. Include customer segment, CAC targets, and LTV multiplier.'
  },
  {
    id: 'art-04',
    slug: 'presentation-design-masterclass-stakeholder-narratives',
    title: 'Presentation Design Masterclass: Crafting Narrative Decks that Win Stakeholders',
    subtitle: 'Principles of visual pacing, slide composition, and restraint for high-stakes business presentations.',
    excerpt: 'Key lessons from my recent executive communication masterclass: why one single idea per slide beats fifty bullet points every single time.',
    author: {
      name: 'Penil Vasani',
      role: 'Digital Strategist & Design Technologist',
      avatar: 'PV',
      bio: 'Penil explores digital business frameworks, web architecture, and data analytics. Writing notes from recent masterclasses.'
    },
    publishedAt: 'September 24, 2026',
    readTime: '5 min read',
    category: 'Presentation Design',
    tags: ['Presentation Design', 'Storytelling', 'Executive Deck', 'Visual Hierarchy'],
    claps: 344,
    commentsCount: 22,
    coverAccent: '#B85536',
    visualGraphic: 'editorial',
    sections: [
      {
        title: 'The Slide as a Billboard, Not a Document',
        content: 'If an audience must read 200 words on a presentation slide, they stop listening to the presenter. High-impact slide architecture functions like highway billboards: delivering a singular conceptual punch in three seconds.',
        pullQuote: 'A slide is not a TelePrompTer for the speaker; it is an emotional and conceptual amplifier for the audience.'
      },
      {
        title: 'The 1-2-1 Presentation Architecture',
        content: 'Structure pitch presentations through the 1-2-1 cadence: 1 context slide establishing the undeniable market tension, 2 evidence slides displaying hard quantitative proof, followed by 1 decisive action mandate.'
      }
    ],
    keyTakeaways: [
      'Enforce one idea, one headline, and one visual anchor per slide.',
      'Place proof metrics adjacent to the central assertion.',
      'Design for legibility from the back of the boardroom.'
    ],
    suggestedPrompt: 'Rewrite this 10-slide executive pitch deck into a concise narrative sequence following the 1-2-1 architecture.'
  },
  {
    id: 'art-05',
    slug: 'generative-design-systems-tokens-llm',
    title: 'The Generative Design System: Structuring Tokens, Scales, and Themes with LLMs',
    subtitle: 'Moving beyond static Figma variables into adaptive semantic tokens orchestrated through declarative schemas.',
    excerpt: 'How modern engineering teams synthesize multi-brand design systems by feeding geometric principles and WCAG constraints to language models.',
    author: {
      name: 'Elena Rostova',
      role: 'Principal Design Technologist',
      avatar: 'ER',
      bio: 'Elena directs systems architecture at NeuraForm, researching declarative design engines and token automation.'
    },
    publishedAt: 'September 20, 2026',
    readTime: '6 min read',
    category: 'Web Design',
    tags: ['Web Design', 'Design Systems', 'CSS Tokens', 'Automation'],
    claps: 342,
    commentsCount: 28,
    coverAccent: '#2D2A26',
    visualGraphic: 'tokens',
    sections: [
      {
        title: 'The Bottleneck of Manual Token Governance',
        content: 'For a decade, design systems lived in a state of precarious synchronicity between design tools and codebases. When a brand expands from a single web app into four sub-brands across desktop, tablet, and spatial viewports, manual token management quickly becomes untenable.',
        pullQuote: 'A design token is not merely a hex code with a label; it is a mathematical relationship between contrast, intent, and platform constraints.'
      }
    ],
    interactiveWidget: {
      type: 'tokens',
      title: 'Interactive Token Synthesizer',
      caption: 'Modify the primary brand hue to simulate real-time semantic token derivation with perceptual contrast validation.'
    },
    keyTakeaways: [
      'Define systemic rules and schema boundaries rather than hand-picking individual color values.',
      'Always prompt in OKLCH or CIELAB color spaces to ensure uniform luminance steps.'
    ],
    suggestedPrompt: 'Generate a complete semantic CSS design token set in OKLCH format for an editorial web journal.'
  },
  {
    id: 'art-06',
    slug: 'diffusion-latents-to-production-css',
    title: 'From Diffusion Latents to Production CSS: Translating Concept Art into Living Interfaces',
    subtitle: 'Deconstructing visual concept renders into modular CSS grids, scalable vectors, and tactile micro-textures.',
    excerpt: 'A practical methodology for taking evocative generative concept artwork and re-architecting it into clean, responsive, accessible web code.',
    author: {
      name: 'Marcus Vance',
      role: 'Creative Director & Front-End Craftsman',
      avatar: 'MV',
      bio: 'Marcus has led interactive design at Studio Monochrome for over twelve years.'
    },
    publishedAt: 'September 16, 2026',
    readTime: '7 min read',
    category: 'Web Design',
    tags: ['Web Design', 'Midjourney', 'Layout Architecture', 'CSS Grid'],
    claps: 519,
    commentsCount: 42,
    coverAccent: '#D96C4A',
    visualGraphic: 'diffusion',
    sections: [
      {
        title: 'The Illusion of the "One-Click AI Website"',
        content: 'Generative image models excel at atmospheric mood boards: dramatic architectural shadows, bespoke textures, and layered typographic layouts. Yet exporting an image directly as a background image is an anti-pattern that sacrifices responsiveness, text accessibility, and SEO.',
        pullQuote: 'Treat generative imagery as an art director’s high-fidelity watercolor, never as final client-delivered markup.'
      }
    ],
    keyTakeaways: [
      'Extract layout geometry and negative space rather than exporting static bitmaps.',
      'Preserve real HTML text for search engines and screen readers.'
    ],
    suggestedPrompt: 'Analyze this UI concept layout: Break down the visual structure into a 12-column CSS Grid specification.'
  },
  {
    id: 'art-07',
    slug: 'prompt-engineering-constitution-frontend-architects',
    title: 'The Prompt Engineering Constitution for Frontend Architects',
    subtitle: 'Systematizing structural constraints, accessibility requirements, and zero-slop rules for multi-modal code generators.',
    excerpt: 'A comprehensive reference guide for engineering prompts that generate clean, semantic HTML5 and resilient TypeScript layouts without boilerplate.',
    author: {
      name: 'Tariq Al-Mansoor',
      role: 'Staff Frontend Architect',
      avatar: 'TA',
      bio: 'Tariq oversees design tooling infrastructure and authored the open-source PromptLint specification.'
    },
    publishedAt: 'September 12, 2026',
    readTime: '8 min read',
    category: 'AI & Automation',
    tags: ['AI & Automation', 'Prompt Craft', 'TypeScript', 'Clean Code'],
    claps: 489,
    commentsCount: 31,
    coverAccent: '#B85536',
    visualGraphic: 'code-ast',
    sections: [
      {
        title: 'Why Standard Prompts Produce "AI Slop"',
        content: 'When given unconstrained instructions like "create a modern dashboard", language models regress to the statistical median: repetitive rounded pills, purple drop shadows, faux metric tickers, and code comments preceding every header.',
        pullQuote: 'High-leverage prompting is ninety percent negative constraints and ten percent domain context.'
      }
    ],
    keyTakeaways: [
      'Document explicit negative constraints to eradicate AI clichés before generation begins.',
      'Require full working interactivity—dead buttons break user immersion.'
    ],
    suggestedPrompt: 'Build a production-grade responsive navigation component in React and Tailwind. Constraints: Single-line controls, zero floating badges, WCAG AA contrast.'
  },
  {
    id: 'art-08',
    slug: 'automated-accessibility-contrast-auditing-vision-agents',
    title: 'Automated Accessibility & Contrast Auditing via Multi-Modal Vision Agents',
    subtitle: 'Catching focus traps, cognitive overload, and low-contrast states before staging releases with computer vision.',
    excerpt: 'How visual perception agents identify real-world accessibility failures that traditional static linters routinely miss.',
    author: {
      name: 'Maya Chen',
      role: 'Accessibility Lead & Core Contributor',
      avatar: 'MC',
      bio: 'Maya is a member of the W3C Accessibility Guidelines Working Group.'
    },
    publishedAt: 'September 8, 2026',
    readTime: '5 min read',
    category: 'Web Design',
    tags: ['Web Design', 'Accessibility', 'WCAG', 'Vision AI'],
    claps: 388,
    commentsCount: 19,
    coverAccent: '#595550',
    visualGraphic: 'contrast',
    sections: [
      {
        title: 'The Limits of Headless DOM Linters',
        content: 'Automated tools like axe-core evaluate the DOM tree, not what the human eye actually perceives. Multi-modal vision models evaluate rendered screenshots under varying viewport sizes and lighting simulations.',
        pullQuote: 'Accessibility is an optical and cognitive reality experienced by people, not merely a clean pass on an HTML lint tree.'
      }
    ],
    keyTakeaways: [
      'Supplement headless DOM test suites with rendered visual perception audits.',
      'Never convey state through color alone.'
    ],
    suggestedPrompt: 'Inspect this rendered webpage screenshot. Identify all text elements failing WCAG AA 4.5:1 contrast standards.'
  },
  {
    id: 'art-09',
    slug: 'wireframe-to-code-benchmarking-vision-jsx-pipelines',
    title: 'Wireframe-to-Code in Seconds: Benchmarking Multi-Modal Vision-to-JSX Pipelines',
    subtitle: 'An empirical test of napkin sketches, high-res Figma frames, and pen-on-paper wireframes translated into React.',
    excerpt: 'Comparing speed, semantic fidelity, and developer ergonomics across the latest vision-language models for rapid prototyping.',
    author: {
      name: 'Klaus Lindqvist',
      role: 'Staff Prototyping Engineer',
      avatar: 'KL',
      bio: 'Klaus builds rapid exploratory prototypes for hardware and software design teams.'
    },
    publishedAt: 'September 4, 2026',
    readTime: '6 min read',
    category: 'Web Design',
    tags: ['Web Design', 'Prototyping', 'Computer Vision', 'React'],
    claps: 574,
    commentsCount: 38,
    coverAccent: '#2D2A26',
    visualGraphic: 'wireframe',
    sections: [
      {
        title: 'The Napkin Sketch Test',
        content: 'We ran twenty hand-drawn interface wireframes through three leading multi-modal vision models to evaluate their spatial inference capabilities.',
        pullQuote: 'The gap between a physical whiteboard brainstorming session and a clickable responsive prototype has collapsed from days into minutes.'
      }
    ],
    keyTakeaways: [
      'Napkin sketches are now viable source documents for initial functional prototypes.',
      'Always prompt the model to infer fluid percentage-based containers.'
    ],
    suggestedPrompt: 'Convert this uploaded wireframe sketch into a semantic React component with Tailwind CSS.'
  },
  {
    id: 'art-10',
    slug: 'human-designers-moat-taste-restraint-discernment-2026',
    title: 'The Human Designer’s Moat: Taste, Restraint, and Curatorial Direction in 2026',
    subtitle: 'Why discernment, systemic coherence, and emotional intentionality outshine raw generative volume.',
    excerpt: 'When any prompt can generate ten thousand passable interfaces in seconds, the ultimate competitive advantage is knowing what not to build.',
    author: {
      name: 'Penil Vasani',
      role: 'Digital Strategist & Design Technologist',
      avatar: 'PV',
      bio: 'Penil explores digital business frameworks, web architecture, and data analytics. Writing notes from recent masterclasses.'
    },
    publishedAt: 'September 1, 2026',
    readTime: '6 min read',
    category: 'Digital Business',
    tags: ['Digital Business', 'Taste & Discernment', 'Curatorial Direction', 'Design Leadership'],
    claps: 892,
    commentsCount: 84,
    featured: true,
    editorialPick: true,
    coverAccent: '#D96C4A',
    visualGraphic: 'discernment',
    sections: [
      {
        title: 'The Inflation of the Passable',
        content: 'Generative AI has effectively driven the marginal cost of creating acceptable, generic web interfaces to zero. Anyone with an API key can produce a competent twelve-column grid in less time than it takes to brew coffee. The consequence is visual homogeneity—a sea of frictionless, derivative sameness.',
        pullQuote: 'When production is frictionless, curation becomes the defining heroic act of creation.'
      }
    ],
    keyTakeaways: [
      'Cultivate historical and architectural literacy to prompt with intentional aesthetic depth.',
      'Practice radical omission—eliminate non-essential visual clutter ruthlessly.'
    ],
    suggestedPrompt: 'Audit this product wireframe for cognitive clutter. Identify three non-essential elements to remove entirely.'
  }
];
