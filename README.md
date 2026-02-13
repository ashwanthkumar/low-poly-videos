# Low-Poly Nursery Rhyme Videos

Animated nursery rhyme videos with a low-poly 3D aesthetic, built entirely with code — no manual 3D modeling or video editing.

https://github.com/user-attachments/assets/placeholder

## Stack

- **[Remotion](https://remotion.dev/)** — React-based video rendering with frame-accurate audio sync
- **[@remotion/three](https://remotion.dev/docs/three)** + **React Three Fiber** — 3D scene composition inside Remotion
- **[Qwen3-TTS](https://github.com/Blaizzy/mlx-audio)** — Voice generation (Serena voice) running locally on Apple Silicon via mlx-audio
- **[Claude](https://claude.ai/)** — AI assistant that wrote all the code

## Videos

### Baa Baa Black Sheep

A 75-second animated rendition featuring:
- Procedural geometric characters (father, mother, son) built from primitive shapes
- A woolly sheep that wanders around the meadow
- Rolling hills, cottage, fence, trees, and flowers — all flat-shaded low-poly
- Synchronized lyrics overlay with emphasis highlighting
- Animated camera choreography across 8 scenes
- Credits sequence

Available in two formats:
- **Landscape** (1920x1080) — YouTube, LinkedIn
- **Portrait** (1080x1920) — Instagram Reels

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Development

Open Remotion Studio with timeline scrubbing:

```bash
npm run dev
```

### Render

```bash
# Landscape (1920x1080)
npm run render

# Instagram Reels (1080x1920)
npm run render:instagram
```

Output goes to `out/`.

### Generate Audio (optional)

Requires Python with [mlx-audio](https://github.com/Blaizzy/mlx-audio) v0.3.1 on Apple Silicon:

```bash
python scripts/generate-audio.py
```

## Project Structure

```
src/
├── index.ts                    # Remotion entry point
├── Root.tsx                    # Composition registration
├── types.ts                   # Shared interfaces
├── animation/
│   └── Easing.ts              # Easing functions
├── components/
│   ├── AnimatedCamera.tsx     # Keyframe-driven camera
│   ├── Environment.tsx        # Ground, sky, clouds
│   ├── GeometricCharacter.tsx # Procedural block-figure humans
│   ├── GeometricSheep.tsx     # Procedural sheep
│   ├── Lighting.tsx           # Scene lights
│   └── SceneProps.tsx         # Cottage, fence, trees, flowers
├── compositions/
│   ├── BahBahBlackSheep.tsx   # Main video composition
│   ├── CreditsOverlay.tsx     # Credits screen (65-75s)
│   └── LyricsOverlay.tsx      # Synced lyrics overlay
└── hooks/
    └── useTimeline.ts         # Evaluates scene keyframes per frame

videos/bah-bah-black-sheep/
└── script/
    ├── scenes.ts              # 8 scenes with camera + character keyframes
    └── lyrics.ts              # 16 timestamped lyric lines

public/audio/                  # Generated audio files
scripts/generate-audio.py      # Qwen3-TTS generation script
```

## Credits

- **Prompted by** Ashwanth Kumar
- **AI Assistant** — Claude by Anthropic
- **Voice** — Qwen3-TTS (Alibaba) via mlx-audio, Serena voice
- **Background music** — "Baby Lullaby Music" from [orangefreesounds.com](https://www.orangefreesounds.com/) (CC BY 4.0)

## License

[MIT](LICENSE)
