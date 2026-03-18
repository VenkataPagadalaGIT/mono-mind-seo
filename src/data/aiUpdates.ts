export type UpdateCategory = "product-launch" | "research" | "industry" | "open-source" | "policy";

export interface AIUpdate {
  id: string;
  slug: string;
  title: string;
  company: string;
  category: UpdateCategory;
  date: string;
  summary: string;
  body: string;
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
    category: "open-source",
    date: "2026-03-16",
    summary: "Announced at GTC 2026, NemoClaw is NVIDIA's open-source stack that adds privacy and security controls to OpenClaw. It bundles Nemotron models and the new OpenShell runtime into a single-command install for autonomous AI agents.",
    body: `<p>Announced during Jensen Huang's GTC 2026 keynote on March 16, <strong>NVIDIA NemoClaw</strong> is an open-source stack built on top of <strong>OpenClaw</strong> — which Jensen called "the operating system for personal AI" and compared directly to Mac and Windows.</p>

<h3>What NemoClaw Does</h3>
<p>NemoClaw bundles <strong>Nemotron</strong> models and the newly announced <strong>OpenShell</strong> runtime into a single-command install:</p>
<pre><code>curl -fsSL https://nvidia.com/nemoclaw.sh | bash</code></pre>

<h3>Key Architecture</h3>
<ul>
<li><strong>Privacy router</strong> — routes inference between local open models (Nemotron running on your hardware) and cloud frontier models, with policy-based security guardrails</li>
<li><strong>OpenShell runtime</strong> — isolated sandbox with data privacy and security controls for autonomous AI agents ("claws")</li>
<li><strong>NVIDIA Agent Toolkit</strong> — the software layer that secures OpenClaw agent operations</li>
</ul>

<h3>Where It Runs</h3>
<p>NemoClaw deploys on any dedicated compute: GeForce RTX PCs/laptops, RTX PRO workstations, DGX Station (748GB coherent memory, 20 petaflops, runs models up to 1 trillion parameters), and DGX Spark (supports clustering up to four systems).</p>

<h3>Why It Matters</h3>
<p>Jensen made the enterprise security case explicit during the keynote: agentic systems inside corporate networks can access sensitive information, execute code, and communicate externally. He paused and told the audience to think about the implications. NemoClaw is designed to fill exactly that security gap.</p>
<p>Microsoft Security is already using Nemotron and OpenShell for adversarial learning, reporting a <strong>160x improvement</strong> in finding and mitigating AI-based attacks.</p>
<p>Jensen's bottom line: just as every company needed an HTTP strategy, a Linux strategy, and a Kubernetes strategy, <strong>every company now needs an OpenClaw strategy</strong>.</p>`,
    sourceUrl: "https://www.nvidia.com/en-us/ai/nemoclaw/",
    tags: ["AI Agents", "Security", "Open Source", "NVIDIA", "OpenClaw", "NemoClaw", "GTC 2026"],
  },
  {
    id: "nvidia-vera-rubin-platform",
    slug: "nvidia-vera-rubin-platform-gtc-2026",
    title: "NVIDIA Vera Rubin Platform: Seven Chips, Five Racks, One AI Supercomputer",
    company: "NVIDIA",
    category: "product-launch",
    date: "2026-03-16",
    summary: "The headline hardware announcement at GTC 2026: the Vera Rubin platform combines seven new chips and five rack-scale systems into one coherent AI supercomputer. Jensen claims 40 million times more compute in 10 years since DGX-1.",
    body: `<p>The <strong>Vera Rubin platform</strong> was the centerpiece hardware announcement at GTC 2026, representing NVIDIA's most ambitious AI infrastructure to date.</p>

<h3>The Lineup</h3>
<ul>
<li><strong>Vera Rubin NVL72 GPU rack</strong> — 72 Rubin GPUs + 36 Vera CPUs connected by NVLink 6, with ConnectX-9 SuperNICs and BlueField-4 DPUs. Trains large MoE models with 1/4 the GPUs vs. Blackwell; delivers 10x higher inference throughput per watt at 1/10 the cost per token.</li>
<li><strong>Vera CPU rack</strong> — 256 Vera CPUs in a liquid-cooled rack, purpose-built for reinforcement learning and agentic AI. 2x efficiency, 50% faster than traditional CPUs. Uses LPDDR5 — the only data center CPU to do so.</li>
<li><strong>Groq 3 LPX inference rack</strong> — 256 LPU processors with 128GB on-chip SRAM and 640 TB/s scale-up bandwidth. Delivers up to 35x higher inference throughput per megawatt. Samsung manufactures the LP30 chip; shipping Q3 2026.</li>
<li><strong>BlueField-4 STX storage rack</strong> — AI-native storage with 5x token throughput, 4x energy efficiency, and 2x faster data ingestion.</li>
<li><strong>Spectrum-6 SPX Ethernet rack</strong> — NVIDIA's first co-packaged optics switch in full production, co-developed with TSMC.</li>
</ul>

<h3>Key Numbers From the Keynote</h3>
<ul>
<li>3.6 exaflops of compute, 260 TB/s all-to-all NVLink bandwidth</li>
<li>100% liquid cooled with 45°C hot water</li>
<li>Installation time: 2 days → 2 hours</li>
<li>First rack already running at Microsoft Azure (confirmed by Satya Nadella)</li>
<li>AWS deploying 1M+ NVIDIA GPUs plus Groq LPUs</li>
</ul>

<h3>What's Next</h3>
<p><strong>Rubin Ultra</strong> (taping out now): 144 GPUs in one NVLink domain via the new Kyber rack. Beyond that, the <strong>Feynman</strong> generation: new GPU, LP40 LPU, Rosa CPU, BlueField-5, CX10.</p>`,
    sourceUrl: "https://nvidianews.nvidia.com/news/nvidia-vera-rubin-platform",
    tags: ["NVIDIA", "Hardware", "Vera Rubin", "GPU", "Data Center", "GTC 2026"],
  },
  {
    id: "nvidia-dynamo-1",
    slug: "nvidia-dynamo-1-ai-factory-os",
    title: "Dynamo 1.0: NVIDIA's Operating System for AI Factories Enters Production",
    company: "NVIDIA",
    category: "product-launch",
    date: "2026-03-16",
    summary: "Dynamo 1.0 is NVIDIA's inference optimization software that delivers up to 7x performance boost on Blackwell GPUs. It rearchitects inference by splitting work between GPUs (prefill/attention) and Groq LPUs (decode/generation).",
    body: `<p>Announced at GTC 2026, <strong>Dynamo 1.0</strong> enters production as what NVIDIA calls the "operating system" for AI factories.</p>

<h3>The Core Insight</h3>
<p>Jensen explained that throughput and latency are "enemies of each other" in chip design. Dynamo solves this via <strong>disaggregated inference</strong> — splitting prefill and attention (memory-heavy) to Rubin GPUs, and decode/token generation (bandwidth-limited) to Groq LPUs.</p>

<h3>Performance</h3>
<ul>
<li>Up to <strong>7x inference performance boost</strong> on Blackwell GPUs</li>
<li>Token speeds jumping from 700 to nearly 5,000 per second — same hardware, updated software stack</li>
<li>Token generation speed across a one-gigawatt factory: 2 million → 700 million (350x increase in two years)</li>
</ul>

<h3>Adoption</h3>
<p>Already deployed across:</p>
<ul>
<li><strong>Cloud providers:</strong> AWS, Microsoft Azure, Google Cloud, Oracle</li>
<li><strong>AI-native companies:</strong> Cursor, Perplexity, Baseten, Deep Infra, Fireworks</li>
<li><strong>Enterprise:</strong> ByteDance, Meituan, PayPal, Pinterest</li>
</ul>

<h3>Building Blocks</h3>
<p>Core modules available standalone: <strong>KVBM</strong> (memory management), <strong>NIXL</strong> (GPU-to-GPU data movement), <strong>Grove</strong> (scaling). NVIDIA also contributes TensorRT-LLM CUDA kernels to the <strong>FlashInfer</strong> project for integration with vLLM, SGLang, and LangChain.</p>`,
    sourceUrl: "https://nvidianews.nvidia.com/news/dynamo-1-0",
    tags: ["NVIDIA", "Inference", "Dynamo", "AI Infrastructure", "GTC 2026"],
  },
  {
    id: "nvidia-nemotron-coalition",
    slug: "nvidia-nemotron-coalition-open-frontier-models",
    title: "NVIDIA Launches Nemotron Coalition: Open Frontier Models With Mistral, Cursor, Perplexity",
    company: "NVIDIA",
    category: "open-source",
    date: "2026-03-16",
    summary: "NVIDIA announced the Nemotron Coalition — a first-of-its-kind collaboration with Mistral AI, Cursor, LangChain, Perplexity, and others to jointly develop Nemotron 4, the next-gen open frontier model, on NVIDIA DGX Cloud.",
    body: `<p>At GTC 2026, NVIDIA launched the <strong>Nemotron Coalition</strong>, framing open models as essential to sovereign AI strategy: the goal is to create base models so good that every country can fine-tune them into domain-specific intelligence.</p>

<h3>Coalition Members</h3>
<p><strong>Mistral AI, Cursor, LangChain, Perplexity, Reflection AI, Sarvam, Thinking Machines Lab, and Black Forest Labs</strong> will jointly develop <strong>Nemotron 4</strong> on NVIDIA DGX Cloud, then release it for anyone to specialize.</p>

<h3>Current Model Family</h3>
<ul>
<li><strong>Nemotron 3</strong> — Omni-understanding models for AI agents. Jensen showed that Nemotron 3 in OpenClaw ranks among the top three models in the world. Already adopted by CodeRabbit, CrowdStrike, Cursor, Factory, Perplexity, and ServiceNow.</li>
<li><strong>Nemotron Nano 3</strong> — Available on Amazon Bedrock, powering Salesforce Agentforce. Salesforce calls it the most cost-efficient model for summarization and generation on their Agentic Benchmark for CRM.</li>
<li><strong>Cosmos 3</strong> — First world foundation model unifying synthetic world generation, vision reasoning, and action simulation. Built for robotics and autonomous systems.</li>
</ul>

<h3>Why It Matters</h3>
<p>This signals NVIDIA's shift from pure hardware to actively shaping the model ecosystem. By partnering with companies that are actual users of these models (Cursor for coding, Perplexity for search, LangChain for agent frameworks), they're ensuring Nemotron models are optimized for real-world agentic workloads.</p>`,
    sourceUrl: "https://nvidianews.nvidia.com/news/nvidia-launches-nemotron-coalition-of-leading-global-ai-labs-to-advance-open-frontier-models",
    tags: ["Open Source", "NVIDIA", "Nemotron", "Mistral", "Cursor", "Perplexity", "GTC 2026"],
  },
  {
    id: "nvidia-robotaxis-uber",
    slug: "nvidia-robotaxis-uber-28-cities-2028",
    title: "NVIDIA-Powered Robotaxis to Launch With Uber Across 28 Cities by 2028",
    company: "NVIDIA",
    category: "industry",
    date: "2026-03-16",
    summary: "Jensen Huang declared 'the ChatGPT moment for self-driving cars has arrived.' NVIDIA-powered robotaxis will launch with Uber across 28 cities on four continents by 2028, starting with LA and SF Bay Area in H1 2027.",
    body: `<p>During the GTC 2026 keynote, Jensen Huang declared the <strong>"ChatGPT moment for self-driving cars has arrived"</strong> and called autonomous vehicles "the first multitrillion-dollar robotics industry."</p>

<h3>Uber Partnership</h3>
<ul>
<li>NVIDIA-powered robotaxis launching with Uber across <strong>28 cities on four continents</strong> by 2028</li>
<li>Starting with Los Angeles and SF Bay Area in <strong>H1 2027</strong></li>
<li>Running on NVIDIA's full-stack DRIVE AV software, Alpamayo open models, and Halos operating system</li>
</ul>

<h3>Automotive Partners</h3>
<p><strong>BYD, Geely, Isuzu, and Nissan</strong> (with Nissan powered by Wayve software) are building Level 4-ready vehicles on NVIDIA DRIVE Hyperion. These four new partners represent <strong>18 million cars built per year</strong>, joining existing partners Mercedes, Toyota, and GM.</p>

<h3>NVIDIA Halos OS</h3>
<p>A unified safety architecture for AI-driven vehicles, built on ASIL D-certified DriveOS foundations with a three-layer architecture integrating safety middleware and an NCAP five-star active safety stack.</p>

<h3>Ride-Hailing Platforms</h3>
<p>Beyond Uber, <strong>Bolt, Grab, and Lyft</strong> are also scaling robotaxi development on NVIDIA's platform. Amazon is advancing Alexa Custom Assistant with multimodal edge AI on NVIDIA DRIVE AGX for in-cabin AI intelligence.</p>`,
    sourceUrl: "https://nvidianews.nvidia.com/news/drive-hyperion-level-4",
    tags: ["Autonomous Vehicles", "NVIDIA", "Uber", "Robotaxi", "Self-Driving", "GTC 2026"],
  },
  {
    id: "nvidia-dlss-5",
    slug: "nvidia-dlss-5-ai-graphics-breakthrough",
    title: "NVIDIA DLSS 5: Fusing 3D Graphics With Generative AI — 'The GPT Moment for Graphics'",
    company: "NVIDIA",
    category: "product-launch",
    date: "2026-03-16",
    summary: "NVIDIA calls DLSS 5 their most significant graphics breakthrough since real-time ray tracing in 2018. It fuses controllable 3D graphics with generative AI to produce photoreal lighting and materials in real-time 16ms frames.",
    body: `<p>Jensen described DLSS 5 as fusing two fundamentally different approaches: <strong>controllable 3D graphics</strong> (structured, completely predictive) with <strong>generative AI</strong> (probabilistic yet highly realistic). He called it <strong>"the GPT moment for graphics."</strong></p>

<h3>Technical Approach</h3>
<p>DLSS 5 infuses pixels with AI-generated photoreal lighting and materials in real-time 16-millisecond frames. Jensen noted this concept of fusing structured information with generative AI will repeat in industry after industry.</p>

<h3>Historical Context</h3>
<p>Since the original GeForce, NVIDIA has delivered a 375,000x increase in compute: programmable shaders (GeForce 3, 2001) → CUDA (GeForce 8800 GTX, 2006) → real-time ray tracing (RTX 2080 Ti, 2018) → path tracing and neural shaders (RTX 5090, 2025) → DLSS 5.</p>

<h3>Publishers Signed On</h3>
<p>Bethesda, CAPCOM, Hotta Studio, NetEase, NCSOFT, S-GAME, Tencent, Ubisoft, and Warner Bros. Games. Arriving fall 2026.</p>

<h3>The Caveat</h3>
<p>This kind of predictive rendering can create visual "hallucinations" — artifacts when the AI prediction gets it wrong. This has been a sore point for gamers historically, but the breadth of publisher commitment suggests the industry believes it's solvable.</p>`,
    sourceUrl: "https://nvidianews.nvidia.com/news/nvidia-dlss-5-delivers-ai-powered-breakthrough-in-visual-fidelity-for-games",
    tags: ["NVIDIA", "DLSS", "Graphics", "Gaming", "Generative AI", "GTC 2026"],
  },
  {
    id: "gtc-2026-big-numbers",
    slug: "nvidia-gtc-2026-keynote-big-numbers",
    title: "GTC 2026 Keynote: Jensen's Big Numbers — $1T Demand, 40M× Compute, Agentic AI Era",
    company: "NVIDIA",
    category: "industry",
    date: "2026-03-16",
    summary: "Jensen Huang's 2-hour GTC 2026 keynote laid out paradigm shifts: $1 trillion in AI infrastructure demand through 2027, computing demand up 1 million times in 2 years, 'every SaaS company will become an AaaS company,' and 'tokens per watt' as the new CEO metric.",
    body: `<p>Jensen Huang's two-hour GTC 2026 keynote (March 16, 2026) packed more announcements than any previous GTC. Here are the key signals for anyone building or investing in AI.</p>

<h3>The Big Numbers</h3>
<ul>
<li><strong>$1 trillion in demand through 2027</strong> — up from $500B just one year ago. Jensen said he's "certain computing demand will be much higher than that"</li>
<li><strong>Computing demand up 1 million times in 2 years</strong> — 10,000x increase in per-task compute × ~100x more usage</li>
<li><strong>$150 billion in AI startup investment</strong> — the largest venture investment wave in human history, with individual rounds hitting billions</li>
<li><strong>40 million times more compute in 10 years</strong> — from DGX-1 to Vera Rubin</li>
<li><strong>Token generation: 2M → 700M per second</strong> — 350x increase in a one-gigawatt factory over two years</li>
</ul>

<h3>The Paradigm Shifts</h3>
<ul>
<li><strong>"The inference inflection has arrived"</strong> — AI now has to think, reason, and do; inference is the dominant workload</li>
<li><strong>Computing shifted from retrieval to generation</strong> — this single shift changes how computers are architected</li>
<li><strong>"Moore's law has run out of steam"</strong> — accelerated computing with continuous algorithmic optimization is the only path forward</li>
<li><strong>Every SaaS company will become an AaaS company</strong> — "agentic as a service," manufacturing and consuming tokens instead of just storing files</li>
<li><strong>"Tokens per watt" is the new CEO metric</strong> — every data center is power-constrained</li>
<li><strong>Token budgets as employee compensation</strong> — Jensen predicts annual token budgets will become a standard recruiting tool, amplifying engineers 10x</li>
</ul>

<h3>Notable Moments</h3>
<p>A Disney Research Olaf robot walked onstage, trained using NVIDIA's Newton physics simulator and Isaac Lab on a Jetson compute module. Jensen teased future Disneyland AI characters. 110 robots were on display at the GTC show floor.</p>
<p>30,000 attendees from 190 countries. 17 press releases and three major blog posts dropped in a single day.</p>`,
    sourceUrl: "https://www.youtube.com/live/jw_o0xr8MWU",
    tags: ["NVIDIA", "GTC 2026", "Jensen Huang", "Agentic AI", "AI Infrastructure", "Keynote"],
  },
];
