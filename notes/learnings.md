# Learnings Journal

## Initial Setup
- Using Vite + TypeScript + Three.js for the rendering pipeline
- troika-three-text for in-scene lyrics (so CCapture/frame export captures them)
- Custom easing functions instead of GSAP to avoid licensing concerns

## Character Design
- Placeholder characters use named `THREE.Group` pivots for each limb
- Pivot placement matters: arms pivot at shoulder, legs at hip
- `MeshLambertMaterial` with `flatShading: true` gives the low-poly look

## Animation
- Sinusoidal functions work well for cyclic animations (walk, wave, idle)
- Using `Math.sin(time * speed)` with phase offsets for alternating limbs
- Walk cycle: left leg and right arm swing together (opposite to right leg and left arm)

## Frame Export
- `preserveDrawingBuffer: true` required on WebGLRenderer for `canvas.toBlob()`
- Fixed pixel ratio (1) ensures consistent output regardless of display
- Need to yield to browser periodically during export to prevent UI freeze
