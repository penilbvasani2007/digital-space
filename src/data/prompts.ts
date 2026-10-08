import { PromptWorkflow } from '../types';

export const INITIAL_PROMPTS: PromptWorkflow[] = [
  {
    id: 'pw-01',
    title: 'Editorial 12-Column Grid Synthesizer',
    category: 'Layout Architecture',
    author: 'Soren Lind',
    avatar: 'SL',
    model: 'Gemini 2.5 Flash / Claude 3.7',
    description: 'Generates responsive Swiss-style asymmetric editorial grids with precise container query breakpoints and subgrid support.',
    promptText: `Act as a senior frontend architect. Create a responsive 12-column editorial magazine layout in Tailwind CSS for an architectural review site.
Requirements:
1. Asymmetric 7-column lead story paired with a 5-column vertical sidebar.
2. Single-line metadata using typographic separators (·) rather than pill badges.
3. Strict semantic HTML (<article>, <aside>, <time>, <figure>).
4. Fluid typographic scale with text-wrap: balance on headings.
5. Zero inline styles; only idiomatic modern Tailwind utility classes.`,
    outputPreview: `<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-6 py-12">
  <article class="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-stone-200 pr-0 lg:pr-8">
    <span class="text-xs tracking-widest uppercase text-stone-500 font-mono">Vol. IV · Issue 12</span>
    <h1 class="text-4xl lg:text-5xl font-serif font-medium mt-3 text-stone-900 leading-tight">Spatial Tensions in Contemporary Glass Architecture</h1>
    ...
  </article>
</div>`,
    likes: 218,
    copiesCount: 940,
    tags: ['CSS Grid', 'Tailwind', 'Editorial', 'Subgrid']
  },
  {
    id: 'pw-02',
    title: 'Accessible OKLCH Dark/Light Color Ramp Generator',
    category: 'Design Systems',
    author: 'Elena Rostova',
    avatar: 'ER',
    model: 'Gemini 2.5 Pro',
    description: 'Calculates mathematically linear perceptual lightness steps with automatic WCAG 2.2 AA (4.5:1) and AAA (7:1) contrast guarantees.',
    promptText: `Generate a complete semantic CSS variable palette in OKLCH format based on seed hue [0.65 0.18 250].
Constraints:
- Output surface-0 through surface-5 for light and dark modes.
- Output text-primary (>= 9:1 contrast against surface-0), text-secondary (>= 4.5:1), and text-tertiary (>= 3:1).
- Include accent-subtle, accent-solid, and accent-contrast.
- Guarantee WCAG AA compliance across all combinations without manual compensation.
- Format as clean :root and [data-theme="dark"] CSS custom properties with brief explanatory comments.`,
    outputPreview: `:root {
  --color-surface-0: oklch(0.99 0.005 250);
  --color-surface-1: oklch(0.96 0.01 250);
  --color-text-primary: oklch(0.18 0.02 250); /* 11.2:1 contrast */
  --color-accent: oklch(0.55 0.22 250);
}
[data-theme="dark"] {
  --color-surface-0: oklch(0.14 0.02 250);
  --color-text-primary: oklch(0.97 0.01 250); /* 12.4:1 contrast */
}`,
    likes: 312,
    copiesCount: 1420,
    tags: ['OKLCH', 'Colors', 'WCAG AA', 'Design Tokens']
  },
  {
    id: 'pw-03',
    title: 'Micro-Interaction Spring Physics Derivation',
    category: 'Motion & Physics',
    author: 'Julian Thorne',
    avatar: 'JT',
    model: 'Gemini 2.5 Flash',
    description: 'Derives lightweight Framer Motion or pure CSS spring transition curves that settle in strictly under 180ms.',
    promptText: `Write an optimized spring animation configuration for an interactive accordion and modal drawer.
Mandatory Rules:
1. Micro-feedback settling time must be <= 180ms to avoid UI lag.
2. Damping ratio: 0.85 (critically damped, zero oscillation or childish bounce).
3. Stiffness: 380, Mass: 0.8.
4. Animate strictly transform (translateY, scale) and opacity. Never animate height or max-height.
5. Provide both React Motion transition config and pure CSS cubic-bezier approximation.`,
    outputPreview: `// React Motion Config
export const modalSpring = {
  type: "spring",
  stiffness: 380,
  damping: 32,
  mass: 0.8,
  restDelta: 0.001
};
// CSS Fallback
cubic-bezier(0.16, 1, 0.3, 1) /* 180ms settle */`,
    likes: 184,
    copiesCount: 780,
    tags: ['Motion', 'Framer Motion', 'Spring Physics', 'Micro-interactions']
  },
  {
    id: 'pw-04',
    title: 'Zero-AI-Slop Code Directive (Paste in Cursor/Windsurf)',
    category: 'Prompt Craft',
    author: 'Tariq Al-Mansoor',
    avatar: 'TA',
    model: 'Universal System Prompt',
    description: 'System rules that stop LLMs from inserting purple glow, fake telemetry tickers, static pills, and code comments into UI.',
    promptText: `SYSTEM DIRECTIVE FOR FRONTEND CODE GENERATION:
1. ZERO PILL DISCIPLINE: Never wrap dates, categories, read times, or statuses in pill/capsule badges. Use clean unboxed text separated by " · " or " / ".
2. NO CODE-COMMENT HEADINGS: Never prefix section headers with "//" or uppercase snake_case. Use clean title-case prose.
3. NO HALLUCINATED SCORECARDS: Prohibit arbitrary 94% scores or fake latency telemetry.
4. WORKING HANDLERS ONLY: Every button, toggle, and tab must have real functional state; zero dead clicks or empty stubs.
5. 60-30-10 COLOR BUDGET: 60% neutral canvas, 30% structural surfaces, 10% high-intent accent. No rainbow gradients.
6. TABULAR NUMERALS: Always apply font-mono tabular-nums to data, numbers, and dates.`,
    outputPreview: `// Placed in .cursorrules or system prompt.
// Result: Pristine, human-crafted code with authentic aesthetic restraint.`,
    likes: 479,
    copiesCount: 2630,
    tags: ['System Prompt', 'Anti-Slop', 'Cursor Rules', 'Best Practices']
  },
  {
    id: 'pw-05',
    title: 'Midjourney UI Style-Reference to CSS Parser',
    category: 'Visual Craft',
    author: 'Marcus Vance',
    avatar: 'MV',
    model: 'Claude 3.7 / Gemini 2.5 Pro',
    description: 'Extracts exact border radius math, backdrop blur values, and drop shadow coordinates from generated UI mockups.',
    promptText: `Inspect this interface screenshot. Deconstruct its visual style into an atomic Tailwind theme configuration:
- Container border radius and inner nested child radius using the r_inner = r_outer - padding formula.
- Exact multi-layer soft shadows (e.g. ambient 2px shadow + directional 12px shadow).
- Background blur strength and subtle glassmorphic overlay opacity (under 8% opacity).
- Negative space ratio between header, body, and action zones.`,
    outputPreview: `// Derived Tailwind Config
boxShadow: {
  'editorial': '0 1px 2px -1px rgba(0, 0, 0, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
  'card-lift': '0 8px 24px -4px rgba(28, 25, 23, 0.08)'
},
borderRadius: {
  'outer': '16px',
  'inner': '10px' /* 16px - 6px padding */
}`,
    likes: 245,
    copiesCount: 910,
    tags: ['Midjourney', 'Figma to Code', 'Shadows', 'Styling']
  }
];
