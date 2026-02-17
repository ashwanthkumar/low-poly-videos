# Low-Poly Nursery Rhyme Videos

Animated nursery rhyme videos with a low-poly 3D aesthetic, built entirely with code — no manual 3D modeling or video editing.

## Stack

- **[Remotion](https://remotion.dev/)** — React-based video rendering with frame-accurate audio sync
- **[@remotion/three](https://remotion.dev/docs/three)** + **React Three Fiber** — 3D scene composition inside Remotion
- **[Qwen3-TTS](https://github.com/Blaizzy/mlx-audio)** — Voice generation (Serena voice) running locally on Apple Silicon via mlx-audio
- **[ACE-Step 1.5](https://github.com/ace-step/ACE-Step-1.5)** — AI music generation for background instrumentals
- **[Claude](https://claude.ai/)** — AI assistant that wrote all the code

## Videos

### Baa Baa Black Sheep

A 75-second animated rendition featuring a daytime meadow scene:
- Procedural geometric characters (father, mother, son) built from primitive shapes
- A woolly sheep that wanders around the meadow
- Rolling hills, cottage, fence, trees, and flowers — all flat-shaded low-poly
- Synchronized lyrics overlay with emphasis highlighting
- Background music: "Baby Lullaby Music" from orangefreesounds.com (CC BY 4.0)

### Twinkle Twinkle Little Star

A 75-second animated rendition featuring a **nighttime** stargazing scene:
- Same procedural geometric family on a moonlit meadow
- Twinkling stars, crescent moon, and deep blue gradient sky
- Family points and waves at the starry sky
- Sheep wanders around the compound
- Background music generated with **ACE-Step 1.5** (AI instrumental)

Both videos available in:
- **Landscape** (1920x1080) — YouTube, LinkedIn
- **Portrait** (1080x1920) — Instagram Reels

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- [uv](https://astral.sh/uv) (for Python scripts)

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
# Baa Baa Black Sheep
npm run render                    # Landscape (1920x1080)
npm run render:instagram          # Instagram Reels (1080x1920)

# Twinkle Twinkle Little Star
npm run render:twinkle            # Landscape (1920x1080)
npm run render:twinkle:instagram  # Instagram Reels (1080x1920)
```

Output goes to `out/`.

### Generate Audio (optional)

Voice generation requires [mlx-audio](https://github.com/Blaizzy/mlx-audio) v0.3.1 on Apple Silicon:

```bash
# Baa Baa Black Sheep voice
uv run --with mlx-audio==0.3.1 --with soundfile python scripts/generate-audio.py

# Twinkle Twinkle Little Star voice
uv run --with mlx-audio==0.3.1 --with soundfile python scripts/generate-twinkle-audio.py
```

Background music generation with [ACE-Step 1.5](https://github.com/ace-step/ACE-Step-1.5):

```bash
# Clone and install ACE-Step (one-time)
git clone https://github.com/ACE-Step/ACE-Step-1.5.git
cd ACE-Step-1.5 && uv sync

# Start the API server
ACESTEP_LM_BACKEND=mlx uv run acestep-api

# Generate via API (see scripts/mix-twinkle-audio.sh for mixing)
```

## Project Structure

```
src/
├── index.ts                              # Remotion entry point
├── Root.tsx                              # Composition registration
├── types.ts                             # Shared interfaces
├── animation/
│   └── Easing.ts                        # Easing functions
├── components/
│   ├── AnimatedCamera.tsx               # Keyframe-driven camera
│   ├── Environment.tsx                  # Daytime: ground, sky, clouds
│   ├── NightEnvironment.tsx             # Nighttime: stars, moon, dark sky
│   ├── GeometricCharacter.tsx           # Procedural block-figure humans
│   ├── GeometricSheep.tsx               # Procedural sheep
│   ├── Lighting.tsx                     # Daytime scene lights
│   ├── NightLighting.tsx                # Moonlit night lights
│   └── SceneProps.tsx                   # Cottage, fence, trees, flowers
├── compositions/
│   ├── BahBahBlackSheep.tsx             # Baa Baa Black Sheep composition
│   ├── TwinkleTwinkleLittleStar.tsx     # Twinkle Twinkle composition
│   ├── CreditsOverlay.tsx               # Credits (Baa Baa)
│   ├── TwinkleCreditsOverlay.tsx        # Credits (Twinkle)
│   └── LyricsOverlay.tsx                # Synced lyrics overlay (shared)
└── hooks/
    └── useTimeline.ts                   # Evaluates scene keyframes per frame

videos/
├── bah-bah-black-sheep/script/          # Scene + lyric data
└── twinkle-twinkle-little-star/script/  # Scene + lyric data

scripts/
├── generate-audio.py                    # TTS for Baa Baa Black Sheep
├── generate-twinkle-audio.py            # TTS for Twinkle Twinkle
└── mix-twinkle-audio.sh                 # Mix voice + ACE-Step background
```

## Credits

- **Prompted by** Ashwanth Kumar
- **AI Assistant** — Claude by Anthropic
- **Voice** — Qwen3-TTS (Alibaba) via mlx-audio, Serena voice
- **Background music (Baa Baa)** — "Baby Lullaby Music" from [orangefreesounds.com](https://www.orangefreesounds.com/) (CC BY 4.0)
- **Background music (Twinkle)** — Generated with [ACE-Step 1.5](https://github.com/ace-step/ACE-Step-1.5)

## License

[MIT](LICENSE)
