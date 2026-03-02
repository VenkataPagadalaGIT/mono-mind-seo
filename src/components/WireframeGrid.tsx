const WireframeGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Perspective grid floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[60vh] grid-perspective">
        <div
          className="w-full h-full animate-grid-scroll"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(55deg)",
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Vertical scan line */}
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-foreground/10 to-transparent animate-scan-line" />

      {/* Corner brackets */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-foreground/20" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-foreground/20" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-foreground/20" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-foreground/20" />
    </div>
  );
};

export default WireframeGrid;
