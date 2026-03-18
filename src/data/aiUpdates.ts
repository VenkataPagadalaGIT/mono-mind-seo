export type UpdateCategory = "product-launch" | "research" | "industry" | "open-source" | "policy";

export interface AIUpdate {
  id: string;
  slug: string;
  title: string;
  company: string;
  category: UpdateCategory;
  date: string; // ISO
  summary: string;
  body: string; // markdown-ish HTML
  sourceUrl: string;
  tags: string[];
}

export const CATEGORY_META: Record<UpdateCategory, { label: string; color: string }> = {
  "product-launch": { label: "Product Launch", color: "hsl(var(--primary))" },
  research: { label: "Research", color: "#10b981" },
  industry: { label: "Industry", color: "#f59e0b" },
  "open-source": { label: "Open Source", color: "#8b5cf6" },
  policy: { label: "Policy & Safety", color: "#ef4444" },
};

export const aiUpdates: AIUpdate[] = [
  {
    id: "nvidia-nemoclaw",
    slug: "nvidia-nemoclaw-secure-ai-agents",
    title: "NVIDIA NemoClaw: Secure, Always-On AI Agents With One Command",
    company: "NVIDIA",
    category: "product-launch",
    date: "2026-03-17",
    summary: "NVIDIA launched NemoClaw — an open-source stack that adds privacy and security controls to autonomous AI agents. Deploy self-evolving agents anywhere with a single command.",
    body: `<p>NVIDIA released <strong>NemoClaw</strong>, an open-source framework that wraps <em>OpenClaw</em> with enterprise-grade privacy and security guardrails. The stack enables developers to deploy always-on, self-evolving AI agents with a single command — on any infrastructure.</p>
<h3>Key Features</h3>
<ul>
<li><strong>Secure by default</strong> — built-in privacy controls, sandboxed execution, and audit logging for autonomous agents</li>
<li><strong>One-command deployment</strong> — spin up production-ready agents instantly on any cloud or on-prem</li>
<li><strong>Self-evolving architecture</strong> — agents learn and improve continuously without manual retraining</li>
<li><strong>Open source</strong> — fully available on GitHub under permissive license</li>
</ul>
<p>This is a significant step toward making autonomous AI agents safe enough for enterprise deployment. NemoClaw addresses the key blocker most companies face: trusting agents with real-world actions.</p>`,
    sourceUrl: "https://www.nvidia.com/en-us/ai/nemoclaw/",
    tags: ["AI Agents", "Security", "Open Source", "NVIDIA", "Autonomous AI"],
  },
  {
    id: "cloudflare-ai-gateway",
    slug: "cloudflare-ai-gateway-observability",
    title: "Cloudflare AI Gateway: Unified Observability for LLM Traffic",
    company: "Cloudflare",
    category: "product-launch",
    date: "2026-03-15",
    summary: "Cloudflare expanded its AI Gateway with unified observability, cost tracking, and rate limiting across all major LLM providers — enabling enterprises to manage AI traffic at the edge.",
    body: `<p>Cloudflare's <strong>AI Gateway</strong> now provides a single control plane for all LLM API traffic, regardless of provider. Teams can monitor costs, latency, and error rates across OpenAI, Anthropic, Google, and open-source models from one dashboard.</p>
<h3>What's New</h3>
<ul>
<li><strong>Unified analytics</strong> — track spend, token usage, and latency across all providers in real-time</li>
<li><strong>Smart caching</strong> — cache identical prompts at the edge to reduce costs by up to 90%</li>
<li><strong>Rate limiting & fallbacks</strong> — automatic failover between providers when rate limits are hit</li>
<li><strong>Prompt logging</strong> — optional request/response logging for compliance and debugging</li>
</ul>
<p>For enterprises running multi-model AI stacks, this solves the fragmentation problem — one gateway to rule them all.</p>`,
    sourceUrl: "https://developers.cloudflare.com/ai-gateway/",
    tags: ["LLM Ops", "Observability", "Edge Computing", "Cloudflare", "Cost Optimization"],
  },
  {
    id: "meta-llama-4",
    slug: "meta-llama-4-scout-maverick",
    title: "Meta Releases Llama 4: Scout & Maverick Models Push Open-Source Frontier",
    company: "Meta",
    category: "open-source",
    date: "2026-03-12",
    summary: "Meta released Llama 4 Scout (17B active params, 16 experts) and Llama 4 Maverick (17B active, 128 experts) — the most capable open-source models to date, rivaling GPT-4o on benchmarks.",
    body: `<p>Meta's <strong>Llama 4</strong> family introduces mixture-of-experts (MoE) architecture to open-source AI. Two models launched:</p>
<h3>Llama 4 Scout</h3>
<ul>
<li>17B active parameters, 16 experts, 109B total params</li>
<li>10M token context window — the longest in any production model</li>
<li>Runs on a single H100 GPU</li>
</ul>
<h3>Llama 4 Maverick</h3>
<ul>
<li>17B active parameters, 128 experts, 400B+ total params</li>
<li>Beats GPT-4o and Gemini 2.0 Flash on reasoning benchmarks</li>
<li>Natively multimodal: text, image, video understanding</li>
</ul>
<p>The MoE architecture means only a fraction of parameters activate per query, keeping inference costs low while maintaining frontier-level quality. This is the strongest argument yet that open-source can compete with closed models.</p>`,
    sourceUrl: "https://ai.meta.com/blog/llama-4/",
    tags: ["Open Source", "LLM", "Meta", "Mixture of Experts", "Multimodal"],
  },
  {
    id: "google-gemini-2-5-pro",
    slug: "google-gemini-2-5-pro-thinking-model",
    title: "Google Gemini 2.5 Pro: A Thinking Model That Leads Every Benchmark",
    company: "Google",
    category: "research",
    date: "2026-03-10",
    summary: "Google launched Gemini 2.5 Pro — a 'thinking' model that uses internal reasoning before responding. It tops the Chatbot Arena leaderboard and leads in math, coding, and science benchmarks.",
    body: `<p>Google DeepMind released <strong>Gemini 2.5 Pro</strong>, introducing a new paradigm: the model 'thinks' through multi-step reasoning before generating its final response.</p>
<h3>Performance</h3>
<ul>
<li>#1 on Chatbot Arena overall and in every category (math, coding, creative writing, science)</li>
<li>Outperforms o1 and Claude 3.5 Sonnet on GPQA, MATH, and HumanEval</li>
<li>1M token context window with native code execution</li>
</ul>
<h3>Why It Matters</h3>
<p>The 'thinking' approach represents a shift from pure next-token prediction to structured reasoning chains. This makes the model significantly better at complex, multi-step problems — the exact capability enterprises need for real-world AI deployment.</p>`,
    sourceUrl: "https://blog.google/technology/google-deepmind/gemini-model-thinking-updates-march-2025/",
    tags: ["LLM", "Google", "Reasoning", "Benchmarks", "DeepMind"],
  },
  {
    id: "anthropic-claude-mcp-adoption",
    slug: "anthropic-mcp-universal-adoption",
    title: "Anthropic's MCP Protocol Hits Critical Mass: OpenAI, Google, Microsoft Adopt It",
    company: "Anthropic",
    category: "industry",
    date: "2026-03-08",
    summary: "Anthropic's Model Context Protocol (MCP) — the open standard for connecting AI models to external tools — has been adopted by OpenAI, Google, and Microsoft, making it the de facto standard for AI integrations.",
    body: `<p>What started as Anthropic's internal protocol is now the <strong>universal standard</strong> for connecting AI models to external data and tools. MCP adoption has gone mainstream:</p>
<ul>
<li><strong>OpenAI</strong> added native MCP support to the Agents SDK and ChatGPT desktop app</li>
<li><strong>Google DeepMind</strong> integrated MCP into Gemini's tool-use system</li>
<li><strong>Microsoft</strong> built MCP into Copilot Studio and Azure AI</li>
<li><strong>Cursor, Windsurf, Replit</strong> — every major AI IDE now supports MCP servers</li>
</ul>
<p>MCP is to AI tools what HTTP was to the web — a protocol so useful that adoption became inevitable. If you're building AI systems, MCP fluency is now a core requirement.</p>`,
    sourceUrl: "https://www.anthropic.com/news/model-context-protocol",
    tags: ["MCP", "AI Agents", "Anthropic", "Integration", "Protocol"],
  },
  {
    id: "openai-agents-sdk",
    slug: "openai-agents-sdk-production-agents",
    title: "OpenAI Agents SDK: Build Production Multi-Agent Systems in Python",
    company: "OpenAI",
    category: "product-launch",
    date: "2026-03-05",
    summary: "OpenAI released the Agents SDK — a lightweight Python framework for building production multi-agent systems with built-in handoffs, guardrails, and tracing.",
    body: `<p>OpenAI's <strong>Agents SDK</strong> (successor to Swarm) provides a minimal but production-ready framework for multi-agent orchestration:</p>
<h3>Core Primitives</h3>
<ul>
<li><strong>Agents</strong> — LLMs configured with instructions and tools</li>
<li><strong>Handoffs</strong> — agents delegate to specialized sub-agents</li>
<li><strong>Guardrails</strong> — input/output validation to keep agents on-task</li>
<li><strong>Tracing</strong> — built-in observability for debugging agent workflows</li>
</ul>
<h3>Why This Matters</h3>
<p>The SDK includes native MCP support, meaning agents can connect to any external tool via the Model Context Protocol. Combined with OpenAI's Responses API, this is the most integrated agent development experience available.</p>`,
    sourceUrl: "https://openai.com/index/new-tools-for-building-agents/",
    tags: ["AI Agents", "OpenAI", "SDK", "Multi-Agent", "Python"],
  },
];
