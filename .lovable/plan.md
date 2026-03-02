

# Context Graph Complete Redesign

## Current Problems
- Cluttered SVG with overlapping child nodes and labels
- Small viewBox (800x640) cramps everything
- Child nodes are always visible, creating visual noise
- No clear visual hierarchy — everything competes for attention
- Background dots are static SVG animates (not fluid)

## Design Vision: "Constellation Map"

A dark, spacious constellation-style graph where domain nodes are prominent orbital stations connected by glowing energy lines. Child capabilities reveal on hover/click with a radial burst animation. The whole thing breathes with ambient particle flow.

## Architecture

### 1. Replace SVG Context Graph with Canvas
- Canvas gives smoother animations, better particle effects, and handles the jellyfish physics natively (no React re-renders per frame)
- Reuse the proven Canvas pattern from the Neural Net view
- Keep the left sidebar (domains panel) and floating overlay panel as HTML overlays

### 2. Layout: Orbital Ring
- Central hub ("SOLUTIONS") at canvas center
- 6 domain nodes arranged in a hexagonal ring at ~200px radius
- Each domain node is a glowing circle with pulsing halo
- Connection lines between hub and domains use animated dashed strokes with traveling light particles
- Inter-domain connections shown as faint arcs (adjacency)

### 3. Child Reveal: Radial Burst
- Children are hidden by default — keeps the view clean and understandable
- On hover/click of a domain, children animate outward in a smooth radial fan from the parent
- Each child springs out with staggered delay (jellyfish trail effect)
- Connection lines draw progressively from parent to child
- Labels appear with fade-in after nodes settle

### 4. Ambient Effects
- Subtle particle field drifting across the canvas (reuse existing particle logic)
- Domain nodes have a soft breathing glow (radius oscillation)
- Faint grid lines in background that shift with parallax on mouse move
- Energy pulses travel along connection lines periodically

### 5. Interaction Model
- **Hover domain**: Highlights domain, shows capability count tooltip, pulses connections
- **Click domain**: Bursts open children, shows floating detail panel, dims other domains
- **Drag domain**: Jellyfish physics (keep existing spring logic, port to canvas)
- **Click child**: Highlight in detail panel with bounce animation
- **Click background**: Collapse all children, reset view

### 6. Visual Style
- Monochrome by default, color reveals on interaction (matches site aesthetic)
- Domain nodes: hollow circles with thin stroke, fill on hover
- Children: small solid dots that glow in parent's color
- Labels: crisp monospace, positioned intelligently (avoid overlap via force-directed push)
- Connection lines: thin, with subtle gradient from parent color to transparent

## File Changes

### `src/components/SolutionsGraph.tsx`
- **Replace the Context Graph section** (lines 860-1010) with a new `ContextGraphCanvas` component
- New component uses Canvas API with `requestAnimationFrame` loop
- State: `expandedDomain` (which domain has children visible), `selectedDomain` (for detail panel)
- Physics: Reuse spring/damping constants from existing jellyfish code
- Child positions computed on-demand when domain expands (radial fan from parent)
- Keep the left sidebar and floating detail panel as HTML overlays (they work well)
- Keep the domains panel, stats bar, view toggle, and SEO markup unchanged

### Key rendering pipeline (Canvas draw loop):
1. Clear + draw background grid with mouse parallax offset
2. Draw ambient particles
3. Draw hub-to-domain connection lines with traveling particles
4. Draw inter-domain faint connections
5. If expanded domain: draw parent-to-child lines + child nodes + labels
6. Draw domain nodes (hollow circles with glow)
7. Draw hub node
8. Handle mouse hit-testing for hover/click/drag

### Interaction handlers (on Canvas):
- `mousemove`: Update mouse position, check hover targets, parallax offset
- `mousedown`: Start drag or expand/select domain
- `mouseup`: End drag
- `click`: Toggle domain expansion, select for detail panel

