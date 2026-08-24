import { Vector3 } from "three";

/* The audio graph lives in the player, which is a piece of dom, and the
   camera lives inside the canvas. This is the one handle between them: the
   player registers its context and where the speakers hang, the scene tells
   it where the camera is every frame, and the browser does the panning. */
const bus = { ctx: null, listener: null };

/* Where the two speakers actually hang on the stand, from Stall.jsx. */
export const SPEAKERS = [
  [-1.99, 2.34, -1.24],
  [1.99, 2.34, -1.24],
];

/* One panner per speaker, so the stereo image widens as you get closer and
   swings across as you orbit. Facing +Z, out towards the crowd, with a cone
   so the sound dulls if you walk round the back. */
export function makeSpeaker(ctx, [x, y, z]) {
  const p = ctx.createPanner();
  p.panningModel = "HRTF";
  p.distanceModel = "inverse";
  p.refDistance = 6;          // roughly where the camera starts
  p.maxDistance = 30;
  p.rolloffFactor = 0.8;
  p.coneInnerAngle = 120;
  p.coneOuterAngle = 300;
  p.coneOuterGain = 0.45;
  if (p.positionX) {
    p.positionX.value = x; p.positionY.value = y; p.positionZ.value = z;
    p.orientationX.value = 0; p.orientationY.value = 0; p.orientationZ.value = 1;
  } else {
    p.setPosition(x, y, z);
    p.setOrientation(0, 0, 1);
  }
  return p;
}

/* Close in, the distance curve pushes each speaker past unity, and there are
   two of them, so the sum can clip. Everything lands here first and a
   limiter catches the peaks instead. */
export function makeOutputStage(ctx) {
  const master = ctx.createGain();
  master.gain.value = 0.9;

  const limit = ctx.createDynamicsCompressor();
  limit.threshold.value = -8;
  limit.knee.value = 6;
  limit.ratio.value = 4;
  limit.attack.value = 0.003;
  limit.release.value = 0.25;

  master.connect(limit);
  limit.connect(ctx.destination);
  return master;
}

export function registerContext(ctx) {
  bus.ctx = ctx;
  bus.listener = ctx.listener;
}

const fwd = new Vector3();
const up = new Vector3();

/* Called every frame. Ramping rather than setting stops a fast orbit from
   zippering, and covers Safari's older setPosition/setOrientation pair. */
export function updateListener(camera) {
  const l = bus.listener;
  if (!l) return;

  const p = camera.position;
  fwd.set(0, 0, -1).applyQuaternion(camera.quaternion);
  up.set(0, 1, 0).applyQuaternion(camera.quaternion);

  if (l.positionX) {
    const t = bus.ctx.currentTime + 0.06;
    l.positionX.linearRampToValueAtTime(p.x, t);
    l.positionY.linearRampToValueAtTime(p.y, t);
    l.positionZ.linearRampToValueAtTime(p.z, t);
    l.forwardX.linearRampToValueAtTime(fwd.x, t);
    l.forwardY.linearRampToValueAtTime(fwd.y, t);
    l.forwardZ.linearRampToValueAtTime(fwd.z, t);
    l.upX.linearRampToValueAtTime(up.x, t);
    l.upY.linearRampToValueAtTime(up.y, t);
    l.upZ.linearRampToValueAtTime(up.z, t);
  } else {
    l.setPosition(p.x, p.y, p.z);
    l.setOrientation(fwd.x, fwd.y, fwd.z, up.x, up.y, up.z);
  }
}
