# Tools & Setup

## FFmpeg

### Installation
```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt install ffmpeg

# Verify
ffmpeg -version
```

### Encoding Pipeline
The `scripts/encode.sh` script handles:
1. PNG sequence → H.265 4K MP4 (CRF 18)
2. 4K → Instagram square crop (1080x1080 center crop)
3. Thumbnail extraction

### Manual Commands
```bash
# Basic encode (no audio)
ffmpeg -y -framerate 30 -i frames/frame_%05d.png -c:v libx265 -crf 18 -pix_fmt yuv420p output.mp4

# With audio
ffmpeg -y -framerate 30 -i frames/frame_%05d.png -i audio.mp3 -c:v libx265 -crf 18 -c:a aac -b:a 192k -shortest output.mp4

# Instagram crop from 16:9
ffmpeg -y -i input.mp4 -vf "crop=ih:ih:(iw-ih)/2:0,scale=1080:1080" -c:v libx265 -crf 20 instagram.mp4
```

## Model Sources

### Quaternius (CC0)
- URL: https://quaternius.com/packs.html
- Best for: Pre-animated character packs
- License: CC0 (public domain)
- Format: FBX, glTF

### Poly.pizza (CC-BY)
- URL: https://poly.pizza/
- Best for: Large library of low-poly models
- License: CC-BY (credit required)
- Format: glTF/GLB

### Kenney.nl (CC0)
- URL: https://kenney.nl/assets
- Best for: Modular character pieces, environment props
- License: CC0 (public domain)
- Format: glTF/GLB, FBX

### Mixamo (Free)
- URL: https://www.mixamo.com/
- Best for: Rigging static models, adding animations
- License: Free for use (Adobe account required)
- Workflow: Upload FBX → Auto-rig → Download with animations

## Model Conversion
```bash
# FBX to glTF (using gltf-pipeline)
npm install -g gltf-pipeline
gltf-pipeline -i model.fbx -o model.glb

# Optimize glTF
gltf-pipeline -i model.glb -o model-optimized.glb --draco.compressionLevel 7
```

## Audio Sources

### Public Domain Nursery Rhymes
- Pixabay Music: https://pixabay.com/music/
- Internet Archive: https://archive.org/
- Freesound: https://freesound.org/
- "Baa Baa Black Sheep" melody from 1761 — public domain

### Audio Editing
```bash
# Trim audio to exact duration
ffmpeg -i input.mp3 -t 65 -c:a copy output.mp3

# Normalize volume
ffmpeg -i input.mp3 -af "loudnorm=I=-16:LRA=11:TP=-1.5" output.mp3
```

## Development

### Commands
```bash
npm run dev        # Start Vite dev server (preview mode)
npm run build      # TypeScript check + Vite build
npm run encode     # Run FFmpeg encode script
```

### URL Parameters
- `?mode=export` — Frame export mode (4K, captures PNGs)
- Default — Preview mode (540p, real-time, dev controls)
