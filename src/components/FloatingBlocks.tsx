const FloatingBlocks = () => {
  const blocks = [
    { w: "w-16", h: "h-16", top: "top-[15%]", left: "left-[10%]", anim: "animate-float-slow", delay: "0s" },
    { w: "w-10", h: "h-10", top: "top-[25%]", left: "left-[80%]", anim: "animate-float-medium", delay: "1s" },
    { w: "w-20", h: "h-8", top: "top-[60%]", left: "left-[70%]", anim: "animate-float-slow", delay: "2s" },
    { w: "w-8", h: "h-20", top: "top-[70%]", left: "left-[15%]", anim: "animate-float-fast", delay: "0.5s" },
    { w: "w-12", h: "h-12", top: "top-[40%]", left: "left-[50%]", anim: "animate-float-medium", delay: "1.5s" },
    { w: "w-6", h: "h-14", top: "top-[20%]", left: "left-[40%]", anim: "animate-float-slow", delay: "3s" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {blocks.map((b, i) => (
        <div
          key={i}
          className={`absolute ${b.w} ${b.h} ${b.top} ${b.left} ${b.anim} border border-foreground/10`}
          style={{ animationDelay: b.delay }}
        />
      ))}
    </div>
  );
};

export default FloatingBlocks;
