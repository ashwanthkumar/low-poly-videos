#!/usr/bin/env bash
# Mix TTS voice with ACE-Step generated background music for Twinkle Twinkle Little Star
#
# Usage: bash scripts/mix-twinkle-audio.sh <background-music-file>
#
# The background music file should be the output from ACE-Step (FLAC/WAV/MP3).
# Voice file: public/audio/twinkle-twinkle-little-star-voice-only.mp3

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
AUDIO_DIR="$SCRIPT_DIR/../public/audio"

VOICE="$AUDIO_DIR/twinkle-twinkle-little-star-voice-only.mp3"
BG_MUSIC="${1:?Usage: $0 <background-music-file>}"
OUTPUT="$AUDIO_DIR/twinkle-twinkle-little-star.mp3"

if [[ ! -f "$VOICE" ]]; then
    echo "Error: Voice file not found: $VOICE"
    echo "Run: python scripts/generate-twinkle-audio.py first"
    exit 1
fi

if [[ ! -f "$BG_MUSIC" ]]; then
    echo "Error: Background music file not found: $BG_MUSIC"
    exit 1
fi

echo "Mixing:"
echo "  Voice: $VOICE"
echo "  Background: $BG_MUSIC"
echo "  Output: $OUTPUT"

# Mix: voice at full volume, background at 20% volume
# Background gets 2s fade-in and 3s fade-out, trimmed to 75s
ffmpeg -y \
  -i "$VOICE" \
  -i "$BG_MUSIC" \
  -filter_complex "[1:a]volume=0.20,afade=t=in:st=0:d=2,afade=t=out:st=72:d=3,atrim=0:75[bg];[0:a]atrim=0:75[voice];[voice][bg]amix=inputs=2:duration=first:dropout_transition=3[out]" \
  -map "[out]" \
  -codec:a libmp3lame -b:a 192k \
  "$OUTPUT"

echo ""
echo "Done! Mixed audio saved to: $OUTPUT"
