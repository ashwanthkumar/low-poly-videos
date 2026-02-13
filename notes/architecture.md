# Architecture

## System Overview

```
┌─────────────────────────────────────────────────┐
│                    main.ts                       │
│  (Mode detection, scene setup, tick loop)        │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────┐  ┌────────────┐  ┌─────────────┐ │
│  │  Engine   │  │  Timeline  │  │  CameraRig  │ │
│  │ (render)  │  │ (playback) │  │ (interp)    │ │
│  └──────────┘  └────────────┘  └─────────────┘ │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │           SceneManager                    │   │
│  │  ┌────────┐ ┌─────────┐ ┌────────────┐  │   │
│  │  │ Chars  │ │  Env    │ │   Props    │  │   │
│  │  └────────┘ └─────────┘ └────────────┘  │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  ┌──────────────┐  ┌───────────────────────┐    │
│  │ LyricsOverlay│  │ DevControls / Export  │    │
│  └──────────────┘  └───────────────────────┘    │
└─────────────────────────────────────────────────┘
```

## Rendering Pipeline

### Preview Mode
1. `Engine.start()` → `requestAnimationFrame` loop
2. Each frame: `clock.getDelta()` → `tick(dt, elapsed)`
3. `tick()` advances `Timeline`, updates camera, characters, lyrics
4. `Engine` renders scene with camera

### Export Mode
1. `FrameExporter.start()` iterates frames at fixed timestep
2. Each frame: `Engine.renderFrame(elapsed)` → `tick()` → render → `canvas.toBlob()`
3. All frames collected, then downloaded as PNGs
4. `scripts/encode.sh` combines frames + audio via FFmpeg

## Animation System

```
VideoScript
  ├── scenes[]
  │     ├── name, startTime, endTime
  │     ├── tracks[]
  │     │     ├── target ("father", "sheep", etc.)
  │     │     ├── property ("position", "action", etc.)
  │     │     └── keyframes[] (time, value, easing)
  │     └── camera[] (CameraKeyframes)
  └── lyrics[] (text, startTime, endTime, emphasis)
```

- **Timeline** evaluates active scene, iterates tracks, fires update callbacks
- **Track** wraps a `KeyframeInterpolator` for smooth value interpolation
- **ActionRunner** converts action names to procedural bone rotations
- **CameraRig** interpolates camera position/lookAt/fov with easing

## Character System

- **CharacterFactory** creates placeholder or real model characters
- **PlaceholderCharacter** builds box-figures from primitives with named parts
- Each limb is a `THREE.Group` with a pivot at the joint point
- **ActionRunner** rotates pivots using `Math.sin()` for cyclic animations

## Key Design Decisions

1. **Placeholder-first**: Ship with visible characters immediately, swap models later
2. **No GSAP**: Custom easing avoids licensing issues and gives frame-level control
3. **Lyrics in 3D**: troika-three-text renders in scene → captured by frame export
4. **Data-driven scenes**: All animation defined in TypeScript data structures, not code
5. **Dual-mode engine**: Same scene code works for preview and export
