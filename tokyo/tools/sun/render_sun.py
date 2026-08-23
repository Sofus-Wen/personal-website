"""Spinning Taiyo logo: black lacquer on a sky, extruded, turning a full circle.

The earlier version projected with abs(cos), so the plate foreshortened to
edge-on and then unwound the way it came instead of carrying on round. Here
the cosine keeps its sign, so the plate passes through edge-on and shows its
far side, which is what a real turn looks like.
"""
import numpy as np, math, os
from PIL import Image, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))

# --- 1. the artwork, at working resolution
RES = 620
m = Image.open(os.path.join(HERE, "logo_mask.png")).convert("L").resize((RES, RES), Image.LANCZOS)
mask = (np.asarray(m, np.float32) / 255.0) > 0.5


def _radius(mk):
    """Stroke half-width, by repeated erosion."""
    dd = np.zeros(mk.shape, np.float32); cur = mk.copy()
    for _ in range(40):
        if not cur.any(): break
        dd += cur
        e = cur.copy()
        e[1:, :] &= cur[:-1, :]; e[:-1, :] &= cur[1:, :]
        e[:, 1:] &= cur[:, :-1]; e[:, :-1] &= cur[:, 1:]
        cur = e
    return float(np.percentile(dd[mk], 92)) if mk.any() else 0.0


def _dilate(mk):
    out = mk.copy()
    out[1:, :] |= mk[:-1, :]; out[:-1, :] |= mk[1:, :]
    out[:, 1:] |= mk[:, :-1]; out[:, :-1] |= mk[:, 1:]
    return out


# The tech-pack artwork is finer than the strokes the first render used, so
# thicken it back to the weight the logo had on screen.
TARGET_R = 22.0
while _radius(mask) < TARGET_R - 0.5:
    mask = _dilate(mask)

# --- 2. distance to the nearest edge, by repeated erosion, so every stroke
#        gets a cross-section it can be inflated into a tube with
d = np.zeros(mask.shape, np.float32)
cur = mask.copy()
for _ in range(40):
    if not cur.any():
        break
    d += cur
    e = cur.copy()
    e[1:, :] &= cur[:-1, :]; e[:-1, :] &= cur[1:, :]
    e[:, 1:] &= cur[:, :-1]; e[:, :-1] &= cur[:, 1:]
    cur = e
R = max(2.0, float(np.percentile(d[mask], 92)))
print("stroke radius ~", round(R, 1), "px")

# --- 3. semicircular tube profile: the pen was a cylinder
h = np.sqrt(np.clip(2 * R * d - d * d, 0, None))
h = h / max(h.max(), 1e-6)
h = np.asarray(Image.fromarray((h * 255).astype(np.uint8)).filter(
        ImageFilter.GaussianBlur(0.6)), np.float32) / 255.0
h *= mask

# --- 4. surface normals of that height field
gy, gx = np.gradient(h)
SLOPE = R * 1.9
nx, ny, nz = -gx * SLOPE, -gy * SLOPE, np.ones_like(h)
ln = np.sqrt(nx * nx + ny * ny + nz * nz)
nx, ny, nz = nx / ln, ny / ln, nz / ln

L = np.array([-0.34, 0.52, 0.78]); L /= np.linalg.norm(L)
L2 = np.array([0.62, 0.34, 0.71], np.float32); L2 /= np.linalg.norm(L2)


def sky_backdrop(W, H):
    """Soft blue sky with cloud haze."""
    yy = np.linspace(0, 1, H)[:, None]
    top = np.array([150, 194, 232], np.float32)
    bot = np.array([222, 236, 246], np.float32)
    base = np.repeat((top + (bot - top) * yy)[:, None, :], W, axis=1)
    rng = np.zeros((H, W), np.float32)
    for cx, cy, r, a in ((0.18, 0.72, 0.34, 0.9), (0.74, 0.38, 0.30, 0.7),
                         (0.46, 0.90, 0.40, 0.8), (0.90, 0.80, 0.26, 0.6),
                         (0.10, 0.20, 0.22, 0.5)):
        X, Y = np.meshgrid(np.linspace(0, 1, W), np.linspace(0, 1, H))
        rng += a * np.exp(-(((X - cx) ** 2 + (Y - cy) ** 2) / (r * r)) * 2.2)
    cloud = np.clip(rng, 0, 1)[..., None]
    return np.clip(base * (1 - cloud * 0.55) + 255 * cloud * 0.55, 0, 255)


def chrome(vx, vy, vz):
    """Black glossy: dark body, bright rim where the tube turns away, hard
    speculars where the lights land."""
    dot = vz
    rx, ry, rz = 2 * dot * vx, 2 * dot * vy, 2 * dot * vz - 1.0
    t = np.clip(0.5 + 0.5 * ry, 0, 1)
    sky = np.array([176, 208, 238], np.float32)
    grnd = np.array([24, 26, 30], np.float32)
    env = grnd + (sky - grnd) * np.clip((t - 0.46) / 0.30, 0, 1)[..., None]
    base = np.full(vx.shape + (3,), 10.0, np.float32)
    fres = np.clip(1.0 - np.abs(vz), 0, 1) ** 1.9
    col = base + env * (0.14 + 0.96 * fres)[..., None]
    s1 = np.clip(rx * L[0] + ry * L[1] + rz * L[2], 0, 1)
    s2 = np.clip(rx * L2[0] + ry * L2[1] + rz * L2[2], 0, 1)
    col += (s1 ** 200)[..., None] * 620
    col += (s1 ** 26)[..., None] * 120
    col += (s2 ** 150)[..., None] * 380
    col += (s2 ** 20)[..., None] * 60
    return np.clip(col, 0, 255)


def coeffs(dst, src):
    A, B = [], []
    for (dx, dy), (sx, sy) in zip(dst, src):
        A.append([dx, dy, 1, 0, 0, 0, -sx * dx, -sx * dy]); B.append(sx)
        A.append([0, 0, 0, dx, dy, 1, -sy * dx, -sy * dy]); B.append(sy)
    return np.linalg.solve(np.asarray(A, float), np.asarray(B, float))


W = H = 400
FRAMES = 72
d_cam, f = 3.2, 2.9
LOGO_SCALE = 0.5          # sun fills half the frame; sky fills the rest
SCALE = (RES / 2) * (400 / RES) * LOGO_SCALE
SLICES = 44               # enough layers that the stack reads solid
DEPTH = 0.10              # thickness, in logo half-widths
src_quad = [(0, 0), (RES, 0), (RES, RES), (0, RES)]
BACKDROP = sky_backdrop(W, H)

out_dir = os.path.join(HERE, "spin")
os.makedirs(out_dir, exist_ok=True)
for old in os.listdir(out_dir):
    os.remove(os.path.join(out_dir, old))


def quad(c, s, zoff):
    """Corners of one slice of the plate. c and s are cos/sin of the turn —
    c keeps its sign, so past 90 degrees the quad inverts and we see the
    back of the drawing, mirrored, exactly as a real plate would."""
    pts = []
    for sx, sy in ((-1, -1), (1, -1), (1, 1), (-1, 1)):
        X = sx * c + zoff * s
        Z = -sx * s + zoff * c
        z = d_cam - Z
        pts.append((W / 2 + f * X / z * SCALE, H / 2 + f * sy / z * SCALE))
    return pts


for i in range(FRAMES):
    th = 2 * math.pi * i / FRAMES
    c, s = math.cos(th), math.sin(th)
    front = c >= 0

    # The visible surface. Front face normal is (nx,ny,nz); the back face of a
    # thin plate carries the same relief mirrored through the plate, so its
    # local normal is (nx,ny,-nz). Rotate whichever one is facing us.
    if front:
        vx = nx * c + nz * s
        vz = -nx * s + nz * c
    else:
        vx = nx * c - nz * s
        vz = -nx * s - nz * c
    lit = chrome(vx, ny, np.abs(vz))

    alpha = (mask * 255).astype(np.float32)
    face_img = Image.fromarray(np.dstack([lit, alpha]).astype(np.uint8), "RGBA")

    def wall_at(t):
        shade = 0.46 + 0.34 * (0.5 + t / DEPTH)
        w = np.dstack([np.clip(lit * shade, 0, 255), alpha]).astype(np.uint8)
        return Image.fromarray(w, "RGBA")

    frame = Image.fromarray(BACKDROP.astype(np.uint8), "RGB").copy()

    # back-to-front, so the lit face lands on top
    order = range(SLICES - 1, -1, -1) if s >= 0 else range(SLICES)
    lit_slice = (SLICES - 1) if s >= 0 else 0
    for k in order:
        t = (k / (SLICES - 1) - 0.5) * DEPTH
        tex = face_img if k == lit_slice else wall_at(t)
        warped = tex.transform((W, H), Image.PERSPECTIVE,
                               coeffs(quad(c, s, t), src_quad),
                               resample=Image.BICUBIC)
        frame.paste(warped, (0, 0), warped.split()[3])
    frame.save(os.path.join(out_dir, "f%03d.png" % i))

print("rendered", FRAMES, "frames")
