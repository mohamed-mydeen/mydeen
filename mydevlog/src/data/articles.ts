export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  readingTime: number;
  publishedAt: string;
  featured: boolean;
  trending: boolean;
  coverGradient: string;
  icon: string;
}

export const articles: Article[] = [
  {
    id: '1',
    slug: 'building-scalable-ai-with-fastapi-groq',
    title: 'Building Production-Ready AI APIs with FastAPI & Groq',
    excerpt: 'A deep dive into architecting high-throughput conversational AI systems using FastAPI, async streaming, and Groq\'s ultra-fast inference. Real patterns from shipping Mydeen AI.',
    category: 'AI Engineering',
    tags: ['FastAPI', 'Groq', 'Python', 'Streaming', 'AI'],
    readingTime: 12,
    publishedAt: '2025-05-10',
    featured: true,
    trending: true,
    coverGradient: 'from-violet-500 via-indigo-500 to-blue-600',
    icon: '⚡',
    content: `
## Why FastAPI for AI?

When building Mydeen AI, the choice of backend framework was critical. We needed something that could handle **concurrent streaming responses**, manage WebSocket connections, and scale horizontally — without the overhead of a monolithic framework.

FastAPI, built on Starlette and Pydantic, gave us exactly that.

\`\`\`python
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from groq import AsyncGroq
import asyncio

app = FastAPI()
client = AsyncGroq(api_key=settings.GROQ_API_KEY)

@app.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    async def generate():
        stream = await client.chat.completions.create(
            model="llama-3.1-70b-versatile",
            messages=request.messages,
            stream=True,
            max_tokens=2048,
        )
        async for chunk in stream:
            delta = chunk.choices[0].delta.content
            if delta:
                yield f"data: {json.dumps({'content': delta})}\\n\\n"
        yield "data: [DONE]\\n\\n"
    
    return StreamingResponse(generate(), media_type="text/event-stream")
\`\`\`

## The Async Architecture

The key insight is treating every request as a pipeline of async generators. This allows us to start streaming tokens to the client as soon as the first chunk arrives from Groq — reducing perceived latency from seconds to milliseconds.

> "Streaming is not just a feature — it's the fundamental interaction model for modern AI interfaces."

## Context Memory System

Building a memory system that survives across sessions requires thoughtful database design. We used Supabase with pgvector for semantic search over conversation history.

\`\`\`python
async def retrieve_context(user_id: str, query: str) -> list[str]:
    embedding = await embed_text(query)
    
    result = await supabase.rpc("match_memories", {
        "query_embedding": embedding,
        "match_threshold": 0.78,
        "match_count": 5,
        "p_user_id": user_id
    }).execute()
    
    return [row["content"] for row in result.data]
\`\`\`

## Performance Results

After optimizing the streaming pipeline:

- **First token latency**: ~180ms (down from 1.2s)
- **Throughput**: 850 tokens/second on Groq's Llama 3.1 70B
- **Concurrent connections**: 200+ with no degradation

The combination of FastAPI's async I/O, Groq's inference speed, and Server-Sent Events (SSE) for the stream transport creates an experience that feels genuinely instant.
    `,
  },
  {
    id: '2',
    slug: 'supabase-real-time-architecture',
    title: 'Real-Time Features at Scale: Supabase Architecture Patterns',
    excerpt: 'How to design real-time subscription systems with Supabase that scale gracefully — covering channel management, optimistic UI, and conflict resolution.',
    category: 'Backend',
    tags: ['Supabase', 'PostgreSQL', 'Real-time', 'Architecture'],
    readingTime: 9,
    publishedAt: '2025-04-28',
    featured: true,
    trending: false,
    coverGradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    icon: '🔄',
    content: `
## The Real-Time Challenge

Most applications bolt on real-time as an afterthought. At scale, this becomes expensive and brittle. Supabase's real-time engine, built on Phoenix Channels, gives you a production-grade foundation — but you still need to design your subscription model thoughtfully.

## Channel Architecture

\`\`\`typescript
// Prefer room-based channels over broadcast
const channel = supabase
  .channel(\`chat:\${roomId}\`)
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'messages',
    filter: \`room_id=eq.\${roomId}\`
  }, (payload) => {
    handleNewMessage(payload.new as Message);
  })
  .subscribe();
\`\`\`

## Optimistic Updates

Never wait for the server to show the user their own action:

\`\`\`typescript
const sendMessage = async (content: string) => {
  const optimisticId = crypto.randomUUID();
  
  // Immediately show in UI
  addMessage({ id: optimisticId, content, status: 'sending' });
  
  const { error } = await supabase
    .from('messages')
    .insert({ content, room_id: roomId });
  
  if (error) {
    // Rollback
    removeMessage(optimisticId);
    toast.error('Failed to send');
  }
};
\`\`\`

This pattern reduces perceived latency to zero.
    `,
  },
  {
    id: '3',
    slug: 'react-performance-optimization-patterns',
    title: 'React Performance Patterns I Actually Use in Production',
    excerpt: 'Practical techniques beyond basic memoization — covering concurrent features, selective subscriptions, virtual rendering, and profiling methodology.',
    category: 'React',
    tags: ['React', 'Performance', 'TypeScript', 'Optimization'],
    readingTime: 10,
    publishedAt: '2025-04-15',
    featured: false,
    trending: true,
    coverGradient: 'from-blue-500 via-cyan-500 to-teal-500',
    icon: '⚛️',
    content: `
## The Problem with Generic Advice

Most React performance articles tell you to use \`useMemo\`, \`useCallback\`, and \`React.memo\` everywhere. This is wrong. These tools have overhead and need to be applied with intention, not as a default.

## State Colocation

The single highest-impact optimization is moving state as close to where it's used as possible:

\`\`\`tsx
// ❌ State too high — every keystroke re-renders the world
const App = () => {
  const [search, setSearch] = useState('');
  return <SearchInput value={search} onChange={setSearch} />;
};

// ✅ Colocated — only SearchInput subtree re-renders
const SearchSection = () => {
  const [search, setSearch] = useState('');
  return <SearchInput value={search} onChange={setSearch} />;
};
\`\`\`

## Selective Zustand Subscriptions

If you're using Zustand, subscribe to slices not the whole store:

\`\`\`typescript
// ❌ Subscribes to everything
const { user, posts, settings } = useStore();

// ✅ Only re-renders when user changes
const user = useStore(state => state.user);
const updateUser = useStore(state => state.updateUser);
\`\`\`

## The Profiler as a First-Class Tool

Before optimizing anything, profile it:

\`\`\`tsx
import { Profiler } from 'react';

const onRender = (id, phase, actualDuration) => {
  if (actualDuration > 16) {
    console.warn(\`\${id} took \${actualDuration}ms (\${phase})\`);
  }
};

<Profiler id="ArticleList" onRender={onRender}>
  <ArticleList articles={articles} />
</Profiler>
\`\`\`
    `,
  },
  {
    id: '4',
    slug: 'pwa-architecture-offline-first',
    title: 'Building Offline-First PWAs: Architecture & Trade-offs',
    excerpt: 'A comprehensive guide to service worker strategies, cache invalidation, background sync, and the real trade-offs of offline-first application architecture.',
    category: 'Web Engineering',
    tags: ['PWA', 'Service Worker', 'Offline', 'Web APIs'],
    readingTime: 14,
    publishedAt: '2025-03-30',
    featured: false,
    trending: false,
    coverGradient: 'from-orange-500 via-amber-500 to-yellow-500',
    icon: '📱',
    content: `
## Why Offline-First Matters

Mydeen AI is deployed as a PWA. When I analyzed user sessions, 12% of interactions happened in degraded network conditions. Offline-first isn't a luxury — it's table stakes for a production app.

## Workbox Cache Strategies

\`\`\`javascript
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';

// Static assets — cache aggressively
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({ cacheName: 'images-v1' })
);

// API responses — stale-while-revalidate
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/articles'),
  new StaleWhileRevalidate({ cacheName: 'api-v1' })
);

// Auth-gated content — network first
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/user'),
  new NetworkFirst({ cacheName: 'user-v1', networkTimeoutSeconds: 3 })
);
\`\`\`

## Background Sync

Queue mutations when offline, replay when connectivity returns:

\`\`\`javascript
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncPendingMessages());
  }
});
\`\`\`
    `,
  },
  {
    id: '5',
    slug: 'url-security-analysis-machine-learning',
    title: 'Detecting Fraudulent URLs with Machine Learning',
    excerpt: 'The engineering story behind SafeCheck — from feature engineering to model selection, deployment on Streamlit, and lessons from building production ML pipelines.',
    category: 'Machine Learning',
    tags: ['ML', 'Python', 'Security', 'Streamlit', 'Feature Engineering'],
    readingTime: 11,
    publishedAt: '2025-03-10',
    featured: false,
    trending: true,
    coverGradient: 'from-rose-500 via-pink-500 to-fuchsia-600',
    icon: '🔒',
    content: `
## The Problem Space

Seasonal fraud websites are a specific and underserved threat vector. They appear during holiday seasons, mimic legitimate e-commerce platforms, and disappear before traditional blocklists catch them. SafeCheck was built specifically to catch these.

## Feature Engineering

The most important insight: domain age and SSL certificate issuance date together are the strongest predictors of fraudulent intent.

\`\`\`python
def extract_features(url: str) -> dict:
    parsed = urlparse(url)
    domain = parsed.netloc
    
    features = {
        'domain_age_days': get_domain_age(domain),
        'ssl_age_days': get_ssl_age(domain),
        'url_length': len(url),
        'has_ip': bool(re.match(r'\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}', domain)),
        'dots_in_domain': domain.count('.'),
        'has_https': parsed.scheme == 'https',
        'redirects': count_redirects(url),
        'suspicious_keywords': check_keywords(url),
        'alexa_rank': get_alexa_rank(domain),
    }
    return features
\`\`\`

## Model Selection

After benchmarking 7 algorithms, XGBoost with calibrated probabilities won on both accuracy (94.2%) and interpretability — crucial for an explainable AI system.

\`\`\`python
from xgboost import XGBClassifier
from sklearn.calibration import CalibratedClassifierCV

base_model = XGBClassifier(
    n_estimators=200,
    max_depth=6,
    learning_rate=0.05,
    subsample=0.8,
)

model = CalibratedClassifierCV(base_model, cv=5, method='isotonic')
model.fit(X_train, y_train)

# Risk score with confidence interval
proba = model.predict_proba(X_test)
risk_score = proba[:, 1]  # Probability of being fraudulent
\`\`\`
    `,
  },
  {
    id: '6',
    slug: 'typescript-advanced-patterns',
    title: 'TypeScript Patterns That Actually Matter in 2025',
    excerpt: 'Moving beyond basic generics — template literal types, conditional inference, branded types for domain modeling, and the discriminated union patterns I use daily.',
    category: 'TypeScript',
    tags: ['TypeScript', 'Type Theory', 'Patterns', 'Engineering'],
    readingTime: 8,
    publishedAt: '2025-02-20',
    featured: false,
    trending: false,
    coverGradient: 'from-blue-600 via-indigo-600 to-violet-700',
    icon: '🔷',
    content: `
## Branded Types for Domain Safety

The most underused TypeScript feature for large codebases:

\`\`\`typescript
type Branded<T, Brand> = T & { readonly __brand: Brand };

type UserId = Branded<string, 'UserId'>;
type ArticleId = Branded<string, 'ArticleId'>;

const createUserId = (id: string): UserId => id as UserId;
const createArticleId = (id: string): ArticleId => id as ArticleId;

// Now these are incompatible — no accidental mixing
const userId = createUserId('usr_123');
const articleId = createArticleId('art_456');

function getUser(id: UserId) { /* ... */ }
getUser(articleId); // ✅ Type error — caught at compile time
\`\`\`

## Discriminated Unions for API States

\`\`\`typescript
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

// Exhaustive pattern matching
function render<T>(state: RequestState<T>) {
  switch (state.status) {
    case 'idle': return <Placeholder />;
    case 'loading': return <Skeleton />;
    case 'success': return <Data data={state.data} />;
    case 'error': return <ErrorView error={state.error} />;
  }
}
\`\`\`
    `,
  },
];

export const getFeaturedArticles = () => articles.filter(a => a.featured);
export const getTrendingArticles = () => articles.filter(a => a.trending);
export const getArticleBySlug = (slug: string) => articles.find(a => a.slug === slug);
export const getArticlesByCategory = (category: string) =>
  articles.filter(a => a.category === category);
export const getAllCategories = () => [...new Set(articles.map(a => a.category))];
export const getAllTags = () => [...new Set(articles.flatMap(a => a.tags))];
