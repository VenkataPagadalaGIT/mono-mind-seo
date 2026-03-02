

## Problem

The Neural Net child nodes have two core issues visible in the screenshots:

1. **Labels overlap nodes and each other** — the arc layout clusters children too tightly, especially for services with many items (AI Product has 9). Labels sit on top of connection lines and neighboring nodes.
2. **Labels are truncated too aggressively** — most labels show ellipsis even though there's plenty of canvas space available.

## Root Cause

- All children fan out in the same small arc (`PI * 0.7`) with minimal radial separation (`120 + ci * 8`). For 9 items, nodes are only ~8px apart radially and crammed in ~126° of arc.
- Labels are drawn at the node position, so when nodes overlap, labels overlap too.
- The parent node sits at `y = 22%` of canvas height, leaving most space below but the arc doesn't use it well.

## Plan

### 1. Improve child node spacing

- Increase base radial distance to **140px** and per-item increment to **15px** so children spread further from parent.
- Widen arc to `PI * 1.0` (180°) so children spread across a full semicircle below the parent.
- Add alternating radial offset (even/odd items get different distances) to stagger nodes and prevent vertical stacking.

### 2. Fix label readability

- Increase `maxLabelWidth` to **250px** so labels rarely truncate.
- Add a dark text shadow/stroke behind labels (`ctx.strokeStyle = "rgba(0,0,0,0.8)"`, `ctx.lineWidth = 3`, `ctx.strokeText()` before `ctx.fillText()`) so they're readable over connection lines.
- Position labels with more offset (**16px**) from node edge.

### 3. Prevent node-on-node overlap

- After initial positioning, add a simple collision/repulsion pass in the draw loop that pushes child nodes apart if they're closer than `30px` to each other (same layer only). This ensures labels never stack even after drift.

### File Changes

- **`src/components/SolutionsGraph.tsx`**: 
  - Lines ~150-158: Update arc spread, distances, and add stagger offset
  - Lines ~373-393: Add text stroke for contrast, increase maxLabelWidth, increase label offset
  - Lines ~179-200: Add a repulsion pass between same-layer child nodes

