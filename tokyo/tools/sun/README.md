# sun.gif renderer

Renders `public/taiyo2049/video/sun.mp4` / `.webm` — the Taiyo logo as black
lacquer on a sky, extruded and turning.

    python3 -m venv venv && venv/bin/pip install pillow numpy
    venv/bin/python render_sun.py          # writes ./spin/f000.png ...
    cd spin
    ffmpeg -y -framerate 24 -i f%03d.png -c:v libx264 -pix_fmt yuv420p \
        -crf 24 -movflags +faststart ../../../public/taiyo2049/video/sun.mp4
    ffmpeg -y -framerate 24 -i f%03d.png -c:v libvpx-vp9 -pix_fmt yuv420p \
        -crf 34 -b:v 0 ../../../public/taiyo2049/video/sun.webm

`logo_mask.png` is the artwork silhouette. Levers at the top of the script:
`DEPTH` thickness, `LOGO_SCALE` size in frame, `TARGET_R` stroke weight,
`SLICES` extrusion layers, `FRAMES` frame count.

Note on the projection: `quad()` uses the *signed* cosine of the turn. An
earlier version used `abs(cos)`, which meant the plate's left edge never
crossed the centre line — it swung to edge-on and unwound back instead of
carrying on round. Keep the sign.
