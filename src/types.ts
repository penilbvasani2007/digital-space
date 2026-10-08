export interface Comment {
  id: string;
  author: string;
  avatar: string;
  role: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface InteractiveComponentConfig {
  type: 'tokens' | 'prompt-dissect' | 'contrast' | 'tone' | 'spring' | 'poll' | 'dashboard' | 'architecture';
  title: string;
  caption: string;
}

export interface ArticleSection {
  title: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
    caption?: string;
  };
  pullQuote?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  claps: number;
  commentsCount: number;
  featured?: boolean;
  editorialPick?: boolean;
  coverAccent: string;
  coverImage?: string;
  visualGraphic: 'tokens' | 'generative-ui' | 'diffusion' | 'code-ast' | 'contrast' | 'kinetic' | 'editorial' | 'wireframe' | 'canvas' | 'discernment' | 'first-impressions' | 'dashboard';
  sections: ArticleSection[];
  interactiveWidget?: InteractiveComponentConfig;
  keyTakeaways: string[];
  suggestedPrompt: string;
}

export interface PromptWorkflow {
  id: string;
  title: string;
  category: string;
  author: string;
  avatar: string;
  model: string;
  description: string;
  promptText: string;
  outputPreview: string;
  likes: number;
  copiesCount: number;
  tags: string[];
}
