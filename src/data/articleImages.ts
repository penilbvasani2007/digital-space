// Lightweight, small-size SVG images for each article (each < 3KB, crisp vector rendering, zero CLS)

export const ARTICLE_IMAGES: Record<string, { svgUrl: string; alt: string; width: number; height: number }> = {
  'why-first-impressions-matter-in-website-architecture': {
    alt: 'Website architecture first impressions diagram illustrating the 50-millisecond cognitive threshold, 68-character typographic measure, and AAA contrast ratio',
    width: 800,
    height: 450,
    svgUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
      <defs>
        <pattern id="grid1" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="%23E5E0D8" stroke-width="0.75" opacity="0.6"/>
        </pattern>
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%23FAF8F5"/>
          <stop offset="100%" stop-color="%23F3EFE9"/>
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(%23g1)"/>
      <rect width="800" height="450" fill="url(%23grid1)"/>
      <!-- Browser window mockup -->
      <rect x="70" y="55" width="660" height="340" rx="12" fill="%23FFFFFF" stroke="%232D2A26" stroke-width="2" filter="drop-shadow(0 8px 24px rgba(45,42,38,0.06))"/>
      <!-- Window top bar -->
      <line x1="70" y1="105" x2="730" y2="105" stroke="%23E5E0D8" stroke-width="1.5"/>
      <circle cx="95" cy="80" r="5" fill="%23D96C4A"/>
      <circle cx="112" cy="80" r="5" fill="%23E5C158"/>
      <circle cx="129" cy="80" r="5" fill="%2368B285"/>
      <rect x="155" y="68" width="320" height="24" rx="6" fill="%23FAF8F5" stroke="%23E5E0D8" stroke-width="1"/>
      <text x="170" y="84" font-family="monospace" font-size="11" fill="%23595550">https://digitalspace.io/architecture/50ms-trust</text>
      <!-- Trust threshold metric pill -->
      <rect x="580" y="68" width="130" height="24" rx="6" fill="%23D96C4A" fill-opacity="0.12"/>
      <text x="592" y="84" font-family="sans-serif" font-weight="600" font-size="11" fill="%23D96C4A">50ms TRUST BENCHMARK</text>
      <!-- Hero Layout Specimen inside mockup -->
      <text x="110" y="145" font-family="monospace" font-size="12" font-weight="600" fill="%23D96C4A" letter-spacing="1">ARCHITECTURAL FOUNDATION · 68ch MEASURE</text>
      <text x="110" y="185" font-family="serif" font-size="26" font-weight="700" fill="%232D2A26">Why First Impressions Matter in Web Architecture</text>
      <text x="110" y="215" font-family="serif" font-size="14" fill="%23595550">Users form aesthetic and credibility assessments in under fifty milliseconds.</text>
      <line x1="110" y1="240" x2="480" y2="240" stroke="%232D2A26" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="256" x2="420" y2="256" stroke="%23D96C4A" stroke-width="2" stroke-linecap="round"/>
      <line x1="110" y1="270" x2="360" y2="270" stroke="%23E5E0D8" stroke-width="2" stroke-linecap="round"/>
      <!-- 3 Key Metric Cards -->
      <rect x="110" y="295" width="180" height="75" rx="8" fill="%23FAF8F5" stroke="%23E5E0D8" stroke-width="1"/>
      <text x="125" y="320" font-family="monospace" font-size="10" fill="%23595550">EYE-DWELL LATENCY</text>
      <text x="125" y="348" font-family="monospace" font-size="20" font-weight="700" fill="%232D2A26">0.048s</text>
      <rect x="310" y="295" width="180" height="75" rx="8" fill="%23FAF8F5" stroke="%23E5E0D8" stroke-width="1"/>
      <text x="325" y="320" font-family="monospace" font-size="10" fill="%23595550">CONTRAST RATIO</text>
      <text x="325" y="348" font-family="monospace" font-size="20" font-weight="700" fill="%2368B285">12.4:1 AAA</text>
      <rect x="510" y="295" width="180" height="75" rx="8" fill="%232D2A26"/>
      <text x="525" y="320" font-family="monospace" font-size="10" fill="%23D96C4A">NAVIGATION ZONES</text>
      <text x="525" y="348" font-family="monospace" font-size="20" font-weight="700" fill="%23FFFFFF">3-ZONE TRIAD</text>
    </svg>`
  },
  'organizing-business-data-spreadsheets-to-dashboards': {
    alt: 'Executive business data analytics dashboard transforming dense tabular spreadsheet cells into high data-ink metric cards, MRR KPIs, and sparklines',
    width: 800,
    height: 450,
    svgUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
      <defs>
        <linearGradient id="darkBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%231E1C1A"/>
          <stop offset="100%" stop-color="%232D2A26"/>
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(%23darkBg)"/>
      <!-- Spreadsheet to Dashboard Transformation Graphic -->
      <!-- Left side: Dense Spreadsheet Grid -->
      <g transform="translate(60, 70)">
        <rect width="280" height="310" rx="8" fill="%23151413" stroke="%233E3A36" stroke-width="1.5"/>
        <rect width="280" height="32" rx="8" fill="%23262320"/>
        <text x="16" y="21" font-family="monospace" font-size="11" fill="%238C8781">RAW TABULAR MATRIX (40 COLS)</text>
        <!-- Rows -->
        <line x1="0" y1="65" x2="280" y2="65" stroke="%232D2A26"/>
        <line x1="0" y1="100" x2="280" y2="100" stroke="%232D2A26"/>
        <line x1="0" y1="135" x2="280" y2="135" stroke="%232D2A26"/>
        <line x1="0" y1="170" x2="280" y2="170" stroke="%232D2A26"/>
        <line x1="0" y1="205" x2="280" y2="205" stroke="%232D2A26"/>
        <line x1="0" y1="240" x2="280" y2="240" stroke="%232D2A26"/>
        <text x="16" y="52" font-family="monospace" font-size="9" fill="%238C8781">ROW 01 · $14,290 · INBOUND · CHURN 2.1% · US-E</text>
        <text x="16" y="87" font-family="monospace" font-size="9" fill="%238C8781">ROW 02 · $82,400 · ENTERPRISE · EXPANSION · EU</text>
        <text x="16" y="122" font-family="monospace" font-size="9" fill="%238C8781">ROW 03 · $3,180 · SELF-SERVE · PAYBACK 4mo · AP</text>
        <text x="16" y="157" font-family="monospace" font-size="9" fill="%238C8781">ROW 04 · $49,800 · MID-MARKET · NET RET 114%</text>
        <text x="16" y="192" font-family="monospace" font-size="9" fill="%238C8781">ROW 05 · $12,940 · ANNUAL TIER · LEAD VEL +34%</text>
        <text x="16" y="227" font-family="monospace" font-size="9" fill="%238C8781">ROW 06 · $61,500 · EXPANSION · GROSS MARGIN 88%</text>
        <rect x="16" y="258" width="248" height="36" rx="4" fill="%23D96C4A" fill-opacity="0.1" stroke="%23D96C4A" stroke-width="0.5"/>
        <text x="28" y="280" font-family="sans-serif" font-size="10" fill="%23D96C4A">Cognitive Fatigue: 40 Columns / High Clutter</text>
      </g>
      <!-- Center Transformation Arrow -->
      <g transform="translate(365, 210)">
        <circle cx="15" cy="15" r="22" fill="%23D96C4A"/>
        <path d="M 6 15 L 24 15 M 17 8 L 24 15 L 17 22" fill="none" stroke="%23FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <!-- Right side: High Data-Ink Executive Cockpit -->
      <g transform="translate(430, 70)">
        <rect width="310" height="310" rx="8" fill="%23151413" stroke="%233E3A36" stroke-width="1.5"/>
        <rect width="310" height="32" rx="8" fill="%23262320"/>
        <text x="16" y="21" font-family="monospace" font-size="11" fill="%2368B285">EXECUTIVE COCKPIT (DATA-INK RATIO: 0.92)</text>
        <!-- KPI Block 1: North Star MRR -->
        <rect x="16" y="46" width="132" height="72" rx="6" fill="%231E1C1A" stroke="%233E3A36" stroke-width="1"/>
        <text x="26" y="66" font-family="monospace" font-size="9" fill="%238C8781">NORTH STAR MRR</text>
        <text x="26" y="94" font-family="monospace" font-size="19" font-weight="700" fill="%23FFFFFF">$148.2k</text>
        <text x="26" y="110" font-family="monospace" font-size="9" fill="%2368B285">+18.4% MoM</text>
        <!-- KPI Block 2: Retention -->
        <rect x="162" y="46" width="132" height="72" rx="6" fill="%231E1C1A" stroke="%233E3A36" stroke-width="1"/>
        <text x="172" y="66" font-family="monospace" font-size="9" fill="%238C8781">NET RETENTION</text>
        <text x="172" y="94" font-family="monospace" font-size="19" font-weight="700" fill="%2368B285">118.2%</text>
        <text x="172" y="110" font-family="monospace" font-size="9" fill="%2368B285">Top Decile</text>
        <!-- Sparkline Chart Area -->
        <rect x="16" y="130" width="278" height="155" rx="6" fill="%231E1C1A" stroke="%233E3A36" stroke-width="1"/>
        <text x="28" y="152" font-family="monospace" font-size="10" fill="%238C8781">MRR TRAJECTORY &amp; FORECAST</text>
        <!-- Polyline Sparkline -->
        <polyline points="30,250 70,240 110,245 150,225 190,210 230,195 270,170" fill="none" stroke="%2368B285" stroke-width="3" stroke-linecap="round"/>
        <circle cx="270" cy="170" r="4" fill="%2368B285"/>
        <text x="210" y="165" font-family="monospace" font-size="11" font-weight="700" fill="%2368B285">$148,200</text>
      </g>
    </svg>`
  },
  'digital-business-frameworks-generative-monetization': {
    alt: 'Digital business frameworks and vertical micro-SaaS flywheel showing customer acquisition cost CAC, LTV multiples, and automated unit economics',
    width: 800,
    height: 450,
    svgUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
      <defs>
        <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%23FAF8F5"/>
          <stop offset="100%" stop-color="%23F0ECE4"/>
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(%23bg3)"/>
      <!-- Flywheel Triad Framework -->
      <g transform="translate(70, 50)">
        <rect width="660" height="350" rx="12" fill="%23FFFFFF" stroke="%232D2A26" stroke-width="2"/>
        <!-- Header -->
        <rect width="660" height="44" rx="12" fill="%23FAF8F5"/>
        <line x1="0" y1="44" x2="660" y2="44" stroke="%23E5E0D8" stroke-width="1"/>
        <text x="24" y="28" font-family="monospace" font-size="11" font-weight="600" fill="%23D96C4A">VERTICAL MICRO-SAAS FLYWHEEL · 2026 UNIT ECONOMICS</text>
        <!-- 3 Flywheel Columns -->
        <!-- 1. Proprietary Schemas -->
        <rect x="24" y="66" width="190" height="200" rx="8" fill="%23FAF8F5" stroke="%23E5E0D8" stroke-width="1"/>
        <circle cx="50" cy="95" r="14" fill="%232D2A26"/>
        <text x="46" y="100" font-family="monospace" font-size="12" font-weight="700" fill="%23FFFFFF">1</text>
        <text x="74" y="100" font-family="sans-serif" font-weight="700" font-size="13" fill="%232D2A26">Niche Data Schemas</text>
        <text x="36" y="130" font-family="serif" font-size="11" fill="%23595550">Deep workflow primitives tailored to specialized professional domains.</text>
        <rect x="36" y="210" width="166" height="38" rx="4" fill="%23FFFFFF" stroke="%23E5E0D8" stroke-width="0.5"/>
        <text x="46" y="234" font-family="monospace" font-size="10" fill="%232D2A26">Moat: High Switching Cost</text>
        <!-- 2. Self-Serve Onboarding -->
        <rect x="235" y="66" width="190" height="200" rx="8" fill="%23FAF8F5" stroke="%23E5E0D8" stroke-width="1"/>
        <circle cx="261" cy="95" r="14" fill="%23D96C4A"/>
        <text x="257" y="100" font-family="monospace" font-size="12" font-weight="700" fill="%23FFFFFF">2</text>
        <text x="285" y="100" font-family="sans-serif" font-weight="700" font-size="13" fill="%232D2A26">Automated Onboarding</text>
        <text x="247" y="130" font-family="serif" font-size="11" fill="%23595550">Zero-sales overhead. Time-to-value achieved in under 3 minutes.</text>
        <rect x="247" y="210" width="166" height="38" rx="4" fill="%23FFFFFF" stroke="%23E5E0D8" stroke-width="0.5"/>
        <text x="257" y="234" font-family="monospace" font-size="10" fill="%23D96C4A">CAC Payback: &lt; 4 Months</text>
        <!-- 3. High Gross Margins -->
        <rect x="446" y="66" width="190" height="200" rx="8" fill="%23FAF8F5" stroke="%23E5E0D8" stroke-width="1"/>
        <circle cx="472" cy="95" r="14" fill="%2368B285"/>
        <text x="468" y="100" font-family="monospace" font-size="12" font-weight="700" fill="%23FFFFFF">3</text>
        <text x="496" y="100" font-family="sans-serif" font-weight="700" font-size="13" fill="%232D2A26">85%+ Gross Margins</text>
        <text x="458" y="130" font-family="serif" font-size="11" fill="%23595550">Zero marginal software delivery cost through modern edge clouds.</text>
        <rect x="458" y="210" width="166" height="38" rx="4" fill="%23FFFFFF" stroke="%23E5E0D8" stroke-width="0.5"/>
        <text x="468" y="234" font-family="monospace" font-size="10" fill="%2368B285">LTV / CAC Multiplier: 5.2x</text>
        <!-- Bottom Banner Summary -->
        <rect x="24" y="280" width="612" height="48" rx="6" fill="%232D2A26"/>
        <text x="44" y="310" font-family="monospace" font-size="11" fill="%23FFFFFF">FORMULA: LTV = (ARPU × Gross Margin) ÷ Churn | Benchmark Target: LTV:CAC &gt; 3.5:1</text>
      </g>
    </svg>`
  },
  'presentation-design-masterclass-stakeholder-narratives': {
    alt: 'Executive presentation design masterclass diagram showing the 1-2-1 narrative structure: 1 context slide, 2 proof slides, and 1 action mandate',
    width: 800,
    height: 450,
    svgUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
      <rect width="800" height="450" fill="%23FAF8F5"/>
      <rect x="60" y="60" width="680" height="330" rx="10" fill="%23FFFFFF" stroke="%23E5E0D8" stroke-width="2"/>
      <text x="90" y="105" font-family="monospace" font-size="12" font-weight="600" fill="%23B85536">THE 1-2-1 PRESENTATION DESIGN CADENCE</text>
      <!-- 4 Slides -->
      <rect x="90" y="130" width="135" height="180" rx="6" fill="%23FAF8F5" stroke="%232D2A26" stroke-width="1.5"/>
      <text x="105" y="160" font-family="sans-serif" font-size="11" font-weight="700" fill="%232D2A26">1. TENSION</text>
      <text x="105" y="185" font-family="serif" font-size="10" fill="%23595550">Establish undeniable market friction.</text>
      
      <rect x="245" y="130" width="135" height="180" rx="6" fill="%23FAF8F5" stroke="%23B85536" stroke-width="1.5"/>
      <text x="260" y="160" font-family="sans-serif" font-size="11" font-weight="700" fill="%23B85536">2. EVIDENCE A</text>
      <text x="260" y="185" font-family="serif" font-size="10" fill="%23595550">Hard quantitative metrics.</text>
      
      <rect x="400" y="130" width="135" height="180" rx="6" fill="%23FAF8F5" stroke="%23B85536" stroke-width="1.5"/>
      <text x="415" y="160" font-family="sans-serif" font-size="11" font-weight="700" fill="%23B85536">3. EVIDENCE B</text>
      <text x="415" y="185" font-family="serif" font-size="10" fill="%23595550">Customer validation &amp; trajectory.</text>
      
      <rect x="555" y="130" width="135" height="180" rx="6" fill="%232D2A26" stroke="%232D2A26" stroke-width="1.5"/>
      <text x="570" y="160" font-family="sans-serif" font-size="11" font-weight="700" fill="%23FFFFFF">4. ACTION</text>
      <text x="570" y="185" font-family="serif" font-size="10" fill="%23FAF8F5">Single decisive capital mandate.</text>
      
      <text x="90" y="350" font-family="serif" font-size="12" italic="true" fill="%23595550">Rule: A slide is a billboard delivering a single conceptual punch in three seconds, not a reading document.</text>
    </svg>`
  },
  'generative-design-systems-tokens-llm': {
    alt: 'Generative design system token architecture showing OKLCH color space mapping, semantic scales, and WCAG contrast validation',
    width: 800,
    height: 450,
    svgUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
      <rect width="800" height="450" fill="%232D2A26"/>
      <rect x="60" y="60" width="680" height="330" rx="10" fill="%231E1C1A" stroke="%233E3A36" stroke-width="2"/>
      <text x="90" y="105" font-family="monospace" font-size="12" font-weight="600" fill="%23D96C4A">SEMANTIC DESIGN TOKEN ARCHITECTURE · OKLCH SCHEMA</text>
      <!-- Tokens Grid -->
      <g transform="translate(90, 130)">
        <rect x="0" y="0" width="100" height="70" rx="6" fill="%23FAF8F5"/>
        <text x="12" y="24" font-family="monospace" font-size="9" fill="%232D2A26">--surface-main</text>
        <text x="12" y="52" font-family="monospace" font-size="12" font-weight="700" fill="%232D2A26">98% Lum</text>
        <rect x="120" y="0" width="100" height="70" rx="6" fill="%23E5E0D8"/>
        <text x="132" y="24" font-family="monospace" font-size="9" fill="%232D2A26">--border-subtle</text>
        <text x="132" y="52" font-family="monospace" font-size="12" font-weight="700" fill="%232D2A26">88% Lum</text>
        <rect x="240" y="0" width="100" height="70" rx="6" fill="%23D96C4A"/>
        <text x="252" y="24" font-family="monospace" font-size="9" fill="%23FFFFFF">--brand-accent</text>
        <text x="252" y="52" font-family="monospace" font-size="12" font-weight="700" fill="%23FFFFFF">62% Lum</text>
        <rect x="360" y="0" width="100" height="70" rx="6" fill="%23595550"/>
        <text x="372" y="24" font-family="monospace" font-size="9" fill="%23FFFFFF">--text-muted</text>
        <text x="372" y="52" font-family="monospace" font-size="12" font-weight="700" fill="%23FFFFFF">35% Lum</text>
        <rect x="480" y="0" width="100" height="70" rx="6" fill="%230F0E0D"/>
        <text x="492" y="24" font-family="monospace" font-size="9" fill="%23FFFFFF">--text-main</text>
        <text x="492" y="52" font-family="monospace" font-size="12" font-weight="700" fill="%23FFFFFF">12% Lum</text>
      </g>
      <rect x="90" y="230" width="580" height="110" rx="6" fill="%23151413" stroke="%233E3A36" stroke-width="1"/>
      <text x="110" y="260" font-family="monospace" font-size="11" fill="%2368B285">PERCEPTUAL CONTRAST VALIDATION: ALL PAIRS &gt; 7:1 AAA PASSED</text>
      <text x="110" y="285" font-family="monospace" font-size="10" fill="%238C8781">:root { --color-bg: oklch(98% 0.01 70); --color-text: oklch(22% 0.015 65); }</text>
      <text x="110" y="310" font-family="monospace" font-size="10" fill="%23D96C4A">Tokens governed by declarative mathematical constraints, not manual Figma hex codes.</text>
    </svg>`
  },
  'diffusion-latents-to-production-css': {
    alt: 'Concept art diffusion latents translated into responsive CSS grid coordinate architecture and scalable typography',
    width: 800,
    height: 450,
    svgUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
      <rect width="800" height="450" fill="%23FAF8F5"/>
      <rect x="60" y="60" width="680" height="330" rx="10" fill="%23FFFFFF" stroke="%232D2A26" stroke-width="1.5"/>
      <text x="90" y="105" font-family="monospace" font-size="12" font-weight="600" fill="%23D96C4A">DIFFUSION CONCEPT ART → 12-COLUMN PRODUCTION CSS GRID</text>
      <!-- Grid Columns -->
      <g transform="translate(90, 130)">
        <rect x="0" y="0" width="38" height="180" rx="4" fill="%23FAF8F5" stroke="%23E5E0D8"/>
        <rect x="46" y="0" width="38" height="180" rx="4" fill="%23FAF8F5" stroke="%23E5E0D8"/>
        <rect x="92" y="0" width="38" height="180" rx="4" fill="%23FAF8F5" stroke="%23E5E0D8"/>
        <rect x="138" y="0" width="38" height="180" rx="4" fill="%23FAF8F5" stroke="%23E5E0D8"/>
        <rect x="184" y="0" width="38" height="180" rx="4" fill="%23FAF8F5" stroke="%23E5E0D8"/>
        <rect x="230" y="0" width="38" height="180" rx="4" fill="%23FAF8F5" stroke="%23E5E0D8"/>
        <rect x="276" y="0" width="38" height="180" rx="4" fill="%23FAF8F5" stroke="%23E5E0D8"/>
        <rect x="322" y="0" width="38" height="180" rx="4" fill="%23FAF8F5" stroke="%23E5E0D8"/>
        <rect x="368" y="0" width="38" height="180" rx="4" fill="%23FAF8F5" stroke="%23E5E0D8"/>
        <rect x="414" y="0" width="38" height="180" rx="4" fill="%23FAF8F5" stroke="%23E5E0D8"/>
        <rect x="460" y="0" width="38" height="180" rx="4" fill="%23FAF8F5" stroke="%23E5E0D8"/>
        <rect x="506" y="0" width="38" height="180" rx="4" fill="%23FAF8F5" stroke="%23E5E0D8"/>
        <!-- Overlay Specimen -->
        <rect x="46" y="20" width="360" height="70" rx="6" fill="%232D2A26" fill-opacity="0.9"/>
        <text x="66" y="55" font-family="serif" font-size="16" fill="%23FFFFFF">Responsive Content Area (8 Cols)</text>
        <rect x="420" y="20" width="124" height="140" rx="6" fill="%23D96C4A" fill-opacity="0.9"/>
        <text x="435" y="80" font-family="sans-serif" font-size="12" font-weight="700" fill="%23FFFFFF">Context Rail</text>
      </g>
    </svg>`
  }
};

export function getArticleImage(slug: string): { svgUrl: string; alt: string; width: number; height: number } {
  if (ARTICLE_IMAGES[slug]) {
    return ARTICLE_IMAGES[slug];
  }
  // Safe fallback SVG
  return {
    alt: `Architectural design notes and conceptual layout for ${slug}`,
    width: 800,
    height: 450,
    svgUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
      <rect width="800" height="450" fill="%23FAF8F5"/>
      <rect x="80" y="80" width="640" height="290" rx="10" fill="%23FFFFFF" stroke="%232D2A26" stroke-width="1.5"/>
      <text x="110" y="130" font-family="monospace" font-size="12" fill="%23D96C4A">PENIL'S DIGITAL SPACE NOTEBOOK</text>
      <text x="110" y="170" font-family="serif" font-size="22" font-weight="700" fill="%232D2A26">Digital Business &amp; Design Architecture</text>
      <line x1="110" y1="200" x2="450" y2="200" stroke="%23E5E0D8" stroke-width="2"/>
    </svg>`
  };
}
