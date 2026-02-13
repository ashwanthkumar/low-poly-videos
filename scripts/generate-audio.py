"""
Generate Baa Baa Black Sheep nursery rhyme audio using Qwen3-TTS CustomVoice (Serena).
Generates line-by-line, then stitches with pauses for sync with video timeline.
"""
from mlx_audio.tts.utils import load_model
import soundfile as sf
import numpy as np
import os

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio")
os.makedirs(OUT_DIR, exist_ok=True)

WAV_PATH = os.path.join(OUT_DIR, "bah-bah-black-sheep.wav")

# Each line with its target start time from lyrics.ts
LINES = [
    # (text, start_time_sec)
    ("Baa, baa, black sheep, have you any wool?", 3.0),
    ("Yes sir, yes sir, three bags full!", 9.0),
    ("One for the master, one for the dame,", 16.0),
    ("And one for the little boy who lives down the lane.", 23.0),
    # Repeat
    ("Baa, baa, black sheep, have you any wool?", 32.0),
    ("Yes sir, yes sir, three bags full!", 38.0),
    ("One for the master, one for the dame,", 45.0),
    ("And one for the little boy who lives down the lane!", 52.0),
]

SAMPLE_RATE = 24000
TOTAL_DURATION = 65.0

print("Loading Qwen3-TTS CustomVoice model...")
model = load_model("mlx-community/Qwen3-TTS-12Hz-1.7B-CustomVoice-bf16")

# Pre-allocate silence for full duration
total_samples = int(TOTAL_DURATION * SAMPLE_RATE)
full_audio = np.zeros(total_samples, dtype=np.float32)

for i, (text, start_time) in enumerate(LINES):
    print(f"\n[{i+1}/{len(LINES)}] Generating: \"{text}\"")
    print(f"  Target start: {start_time}s")

    results = list(model.generate_custom_voice(
        text=text,
        speaker="Serena",
        language="English",
        instruct="A gentle, warm, singing voice for a children's nursery rhyme. Slow and clear.",
    ))
    audio = results[0].audio

    # Convert MLX array to numpy
    if hasattr(audio, 'tolist'):
        audio_np = np.array(audio.tolist(), dtype=np.float32)
    else:
        audio_np = np.array(audio, dtype=np.float32)

    if audio_np.ndim > 1:
        audio_np = audio_np.squeeze()

    duration = len(audio_np) / SAMPLE_RATE
    print(f"  Generated: {duration:.2f}s ({len(audio_np)} samples)")

    # Place at the target start time
    start_sample = int(start_time * SAMPLE_RATE)
    end_sample = start_sample + len(audio_np)

    # Clip if it would overflow
    if end_sample > total_samples:
        audio_np = audio_np[:total_samples - start_sample]
        end_sample = total_samples

    # Mix in (add, in case of overlap)
    full_audio[start_sample:end_sample] += audio_np

# Normalize to prevent clipping
peak = np.max(np.abs(full_audio))
if peak > 0.95:
    full_audio = full_audio * (0.95 / peak)

sf.write(WAV_PATH, full_audio, SAMPLE_RATE)
print(f"\nSaved: {WAV_PATH}")
print(f"Duration: {TOTAL_DURATION}s, {total_samples} samples at {SAMPLE_RATE}Hz")
print(f"\nConverting to MP3...")
os.system(f"ffmpeg -y -i '{WAV_PATH}' -b:a 192k '{WAV_PATH.replace('.wav', '.mp3')}' 2>/dev/null")
print("Done!")
