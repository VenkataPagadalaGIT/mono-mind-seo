const files = [
  { name: "llms.txt", path: "/llms.txt" },
  { name: "llms-full.txt", path: "/llms-full.txt" },
  { name: "posts.json", path: "/posts.json" },
  { name: "rss.xml", path: "/rss.xml" },
  { name: "sitemap.xml", path: "/sitemap.xml" },
  { name: "robots.txt", path: "/robots.txt" },
];

const AgenticBar = () => {
  return (
    <div className="w-full border-t border-border/30 bg-background/80 backdrop-blur-sm py-2.5 px-6">
      <div className="max-w-7xl mx-auto flex items-center gap-3 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-bold tracking-wider text-emerald-500 uppercase">Agentic</span>
        </div>
        <span className="text-muted-foreground/20">|</span>
        <div className="flex items-center gap-3 flex-wrap">
          {files.map((f) => (
            <a
              key={f.name}
              href={f.path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-muted-foreground/50 hover:text-foreground transition-colors"
            >
              <span className="text-muted-foreground/25">⟩</span>
              {f.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgenticBar;
