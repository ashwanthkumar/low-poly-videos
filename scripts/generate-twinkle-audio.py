#!/usr/bin/env python3
"""
Generate TTS audio for "Twinkle Twinkle Little Star" using Qwen3-TTS.

Generates each lyric line individually and places them at exact timestamps
matching lyrics.ts. Uses the Serena voice from the CustomVoice model.

Usage:
    uv run --with mlx-audio==0.3.1 --with soundfile python scripts/generate-twinkle-audio.py
"""

import numpy as np
import soundfile as sf
import subprocess
import os
import tempfile

# Lyric lines with target start times (matching lyrics.ts)
LINES = [
    ("Twinkle, twinkle, little star,", 3.0),
    ("How I wonder what you are!", 6.5),
    ("Up above the world so high,", 10.0),
    ("Like a diamond in the sky.", 13.5),
    ("Twinkle, twinkle, little star,", 17.0),
    ("How I wonder what you are!", 20.5),
    ("When the blazing sun is gone,", 25.0),
    ("When he nothing shines upon,", 28.5),
    ("Then you show your little light,", 32.0),
    ("Twinkle, twinkle, through the night.", 35.5),
    ("Twinkle, twinkle, little star,", 39.0),
    ("How I wonder what you are!", 42.5),
    ("Twinkle, twinkle, little star,", 47.0),
    ("How I wonder what you are!", 50.5),
    ("Up above the world so high,", 54.0),
    ("Like a diamond in the sky.", 57.5),
]

MODEL_PATH = "mlx-community/Qwen3-TTS-12Hz-1.7B-CustomVoice-bf16"
TOTAL_DURATION = 75.0
SAMPLE_RATE = 24000
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "audio")


def main():
    from mlx_audio.tts.generate import generate_audio

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    total_samples = int(TOTAL_DURATION * SAMPLE_RATE)
    full_audio = np.zeros(total_samples, dtype=np.float32)

    with tempfile.TemporaryDirectory() as tmpdir:
        for i, (text, start_time) in enumerate(LINES):
            print(f"[{i+1}/{len(LINES)}] Generating: {text} (at {start_time}s)")

            # Generate to a temp file
            generate_audio(
                text=text,
                model=MODEL_PATH,
                voice="Serena",
                output_path=tmpdir,
                file_prefix=f"line_{i:03d}",
                audio_format="wav",
                verbose=False,
            )

            # Read the generated file
            wav_file = os.path.join(tmpdir, f"line_{i:03d}_000.wav")
            segment, sr = sf.read(wav_file)

            # Resample if needed
            if sr != SAMPLE_RATE:
                from scipy.signal import resample
                segment = resample(segment, int(len(segment) * SAMPLE_RATE / sr))

            # Place at target position
            start_sample = int(start_time * SAMPLE_RATE)
            end_sample = min(start_sample + len(segment), total_samples)
            segment_len = end_sample - start_sample

            if segment_len > 0:
                full_audio[start_sample:end_sample] = segment[:segment_len]

            print(f"  -> {len(segment)/SAMPLE_RATE:.2f}s of audio placed at {start_time}s")

    # Normalize
    peak = np.max(np.abs(full_audio))
    if peak > 0:
        full_audio = full_audio / peak * 0.95

    # Save WAV
    wav_path = os.path.join(OUTPUT_DIR, "twinkle-twinkle-little-star.wav")
    sf.write(wav_path, full_audio, SAMPLE_RATE)
    print(f"\nSaved voice WAV: {wav_path}")

    # Convert to MP3
    voice_mp3 = os.path.join(OUTPUT_DIR, "twinkle-twinkle-little-star-voice-only.mp3")
    subprocess.run([
        "ffmpeg", "-y", "-i", wav_path,
        "-codec:a", "libmp3lame", "-b:a", "192k",
        voice_mp3,
    ], check=True, capture_output=True)
    print(f"Saved voice MP3: {voice_mp3}")

    print("\nDone! Run the mixing step after generating background music with ACE-Step.")
    print(f"  bash scripts/mix-twinkle-audio.sh <ace-step-output.flac>")


if __name__ == "__main__":
    main()
