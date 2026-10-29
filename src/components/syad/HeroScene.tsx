import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { sceneInput } from "./HeroScene.input";

// Stars with per-point size and phase so each twinkles on its own clock.
const starVert = `attribute float size; attribute float phase; varying vec3 vColor; varying float vTw; uniform float uTime;
void main(){ vColor = color; vTw = 0.65 + 0.35 * sin(uTime * (0.4 + phase * 0.9) + phase * 40.0);
vec4 mv = modelViewMatrix * vec4(position,1.0); gl_PointSize = size * (300.0 / -mv.z); gl_Position = projectionMatrix * mv; }`;
const starFrag = `varying vec3 vColor; varying float vTw; void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard;
gl_FragColor = vec4(vColor, smoothstep(0.5, 0.0, d) * vTw * 0.9); }`;
function Stars({ count = 1600 }) {
  const ref = useRef<THREE.Points>(null);
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: starVert,
        fragmentShader: starFrag,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
      }),
    [],
  );
  const geo = useMemo(() => {
    const p = new Float32Array(count * 3),
      c = new Float32Array(count * 3),
      sz = new Float32Array(count),
      ph = new Float32Array(count);
    const cols = [
      new THREE.Color("#F2E0DC"),
      new THREE.Color("#ACBDD4"),
      new THREE.Color("#D9BACB"),
    ];
    for (let i = 0; i < count; i++) {
      const r = 40 + Math.random() * 60,
        th = Math.random() * Math.PI * 2,
        pf = Math.acos(2 * Math.random() - 1);
      p.set(
        [
          r * Math.sin(pf) * Math.cos(th),
          r * Math.sin(pf) * Math.sin(th),
          -Math.abs(r * Math.cos(pf)) - 5,
        ],
        i * 3,
      );
      const col = cols[Math.random() < 0.8 ? 0 : Math.random() < 0.5 ? 1 : 2] ?? cols[0]!;
      c.set([col.r, col.g, col.b], i * 3);
      sz[i] = 0.08 + Math.pow(Math.random(), 4) * 0.45;
      ph[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    g.setAttribute("color", new THREE.BufferAttribute(c, 3));
    g.setAttribute("size", new THREE.BufferAttribute(sz, 1));
    g.setAttribute("phase", new THREE.BufferAttribute(ph, 1));
    return g;
  }, [count]);
  useFrame((s, d) => {
    mat.uniforms["uTime"]!.value = s.clock.elapsedTime;
    if (ref.current) ref.current.rotation.z += Math.min(d, 0.05) * 0.002;
  });
  return <points ref={ref} geometry={geo} material={mat} />;
}

// Foreground motes in three depth bands; nearer bands drift faster and shift more with the pointer.
function Dust({ count = 260 }) {
  const refs = useRef<(THREE.Object3D | null)[]>([]);
  const bands = useMemo(
    () =>
      [0, 1, 2].map((b) => {
        const n = Math.round(count / 3),
          p = new Float32Array(n * 3);
        for (let i = 0; i < n; i++)
          p.set(
            [
              (Math.random() - 0.5) * 26,
              (Math.random() - 0.5) * 16,
              -2 - b * 3 + (Math.random() - 0.5) * 2,
            ],
            i * 3,
          );
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(p, 3));
        return g;
      }),
    [count],
  );
  useFrame((s, d) => {
    const dt = Math.min(d, 0.05),
      k = 1 - Math.exp(-2 * dt);
    refs.current.forEach((pts, b) => {
      if (!pts) return;
      const depth = 3 - b;
      pts.rotation.y += dt * 0.004 * depth;
      pts.position.y = Math.sin(s.clock.elapsedTime * 0.1 + b) * 0.15;
      pts.position.x += (-sceneInput.x * 0.35 * depth - pts.position.x) * k;
    });
  });
  return (
    <>
      {bands.map((g, b) => (
        <points
          key={b}
          ref={(r) => {
            refs.current[b] = r;
          }}
          geometry={g}
        >
          <pointsMaterial
            size={0.03 + (2 - b) * 0.012}
            color={b === 0 ? "#D9BACB" : "#8C96AE"}
            transparent
            opacity={0.55 - b * 0.12}
            depthWrite={false}
          />
        </points>
      ))}
    </>
  );
}

function Galaxy({
  position,
  scale = 1,
  tilt = 0.9,
  hue = "#D9BACB",
}: {
  position: [number, number, number];
  scale?: number;
  tilt?: number;
  hue?: string;
}) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const n = 1400,
      p = new Float32Array(n * 3),
      c = new Float32Array(n * 3);
    const core = new THREE.Color("#F2E0DC"),
      edge = new THREE.Color(hue);
    for (let i = 0; i < n; i++) {
      const r = Math.pow(Math.random(), 1.6) * 3,
        arm = (i % 2) * Math.PI,
        a = arm + r * 2.2 + (Math.random() - 0.5) * 0.6;
      p.set([Math.cos(a) * r, (Math.random() - 0.5) * 0.12, Math.sin(a) * r], i * 3);
      const col = core.clone().lerp(edge, Math.min(r / 2.4, 1));
      c.set([col.r, col.g, col.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    g.setAttribute("color", new THREE.BufferAttribute(c, 3));
    return g;
  }, [hue]);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += Math.min(d, 0.05) * 0.03;
  });
  return (
    <group position={position} rotation={[tilt, 0, 0.4]} scale={scale}>
      <points ref={ref} geometry={geo}>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// Thin gravitational rings behind the character, kept dim so text stays readable.
function Wormhole() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s, d) => {
    if (!ref.current) return;
    ref.current.rotation.z += Math.min(d, 0.05) * 0.04;
    ref.current.children.forEach((m, i) => {
      m.scale.setScalar(
        1 + Math.sin(s.clock.elapsedTime * 0.4 + i) * 0.015 + sceneInput.pulse * 0.04,
      );
    });
  });
  return (
    <group ref={ref} position={[0, -0.6, -4]} rotation={[1.25, 0, 0]}>
      {[2.4, 3.1, 3.9, 4.8, 5.8].map((r, i) => (
        <mesh key={r}>
          <torusGeometry args={[r, 0.008 + i * 0.002, 6, 160]} />
          <meshBasicMaterial
            color={i % 2 ? "#5D6C8C" : "#D9BACB"}
            transparent
            opacity={0.32 - i * 0.045}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Network() {
  const ref = useRef<THREE.Group>(null);
  const { pts, lines } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 46; i++)
      nodes.push(new THREE.Vector3((rnd() - 0.5) * 18, (rnd() - 0.5) * 9, -6 - rnd() * 5));
    const seg: number[] = [];
    nodes.forEach((a, i) =>
      nodes.slice(i + 1).forEach((b) => {
        if (a.distanceTo(b) < 3.1) seg.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }),
    );
    const pg = new THREE.BufferGeometry().setFromPoints(nodes);
    const lg = new THREE.BufferGeometry();
    lg.setAttribute("position", new THREE.Float32BufferAttribute(seg, 3));
    return { pts: pg, lines: lg };
  }, []);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.05) * 0.06;
  });
  return (
    <group ref={ref}>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color="#5D6C8C" transparent opacity={0.16} depthWrite={false} />
      </lineSegments>
      <points geometry={pts}>
        <pointsMaterial size={0.09} color="#ACBDD4" transparent opacity={0.7} depthWrite={false} />
      </points>
    </group>
  );
}

function Rig() {
  const warp = useRef(0);
  useFrame((s, d) => {
    const dt = Math.min(d, 0.05);
    const k = 1 - Math.exp(-2.5 * dt);
    warp.current += (sceneInput.warp - warp.current) * (1 - Math.exp(-3.2 * dt));
    s.camera.position.x += (sceneInput.x * 0.5 + sceneInput.fx * 0.7 - s.camera.position.x) * k;
    s.camera.position.y += (-sceneInput.y * 0.3 + sceneInput.fy * 0.4 - s.camera.position.y) * k;
    s.camera.position.z = 8 - warp.current * 5.4;
    s.camera.lookAt(0, 0, -6);
    sceneInput.pulse *= Math.exp(-2 * dt);
  });
  return null;
}

export default function HeroScene({ reduced }: { reduced: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 55 }}
      frameloop={reduced ? "demand" : "always"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <fog attach="fog" args={["#090A0D", 18, 70]} />
      <Stars
        count={
          typeof window !== "undefined" && innerWidth < 768 ? 600 : innerWidth < 1180 ? 900 : 1200
        }
      />
      <Network />
      <Dust count={typeof window !== "undefined" && innerWidth < 768 ? 120 : 260} />
      {!reduced && <Rig />}
    </Canvas>
  );
}
