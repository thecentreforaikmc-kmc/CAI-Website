import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Icosahedron, Line } from "@react-three/drei";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

const REDUCED =
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function makeNodes(count: number, radius: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * Math.PI * (3 - Math.sqrt(5));
    pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius));
  }
  return pts;
}

function Network() {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(() => makeNodes(44, 2.05), []);
  const edges = useMemo(() => {
    const list: [THREE.Vector3, THREE.Vector3][] = [];
    nodes.forEach((a, i) => {
      const near = nodes
        .map((b, j) => ({ b, j, d: a.distanceTo(b) }))
        .filter((x) => x.j > i)
        .sort((x, y) => x.d - y.d)
        .slice(0, 2);
      near.forEach((n) => list.push([a, n.b]));
    });
    return list;
  }, [nodes]);

  useFrame((state, delta) => {
    if (!group.current || REDUCED) return;
    const dt = Math.min(delta, 0.05);
    group.current.rotation.y += dt * 0.16;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
  });

  return (
    <group ref={group}>
      <Icosahedron args={[1.35, 1]}>
        <meshStandardMaterial
          color="#1b2440"
          roughness={0.18}
          metalness={0.85}
          emissive="#2d51c9"
          emissiveIntensity={0.28}
          flatShading
        />
      </Icosahedron>
      <Icosahedron args={[1.95, 2]}>
        <meshBasicMaterial color="#5b8cff" wireframe transparent opacity={0.16} />
      </Icosahedron>
      {edges.map(([a, b], i) => (
        <Line
          key={i}
          points={[a, b]}
          color={i % 3 === 0 ? "#a07bff" : "#5b8cff"}
          transparent
          opacity={0.35}
          lineWidth={1}
        />
      ))}
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshBasicMaterial color={i % 4 === 0 ? "#c3b0ff" : "#8fb4ff"} />
        </mesh>
      ))}
    </group>
  );
}

function Dust() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(260 * 3);
    for (let i = 0; i < 260; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current && !REDUCED) ref.current.rotation.y += Math.min(delta, 0.05) * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#7f9fff" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function Rig() {
  useFrame((state) => {
    if (REDUCED) return;
    const { camera, pointer } = state;
    camera.position.x += (pointer.x * 1.2 - camera.position.x) * 0.03;
    camera.position.y += (pointer.y * 0.7 + 0.2 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 6.2], fov: 45 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} color="#9ab6ff" />
      <pointLight position={[-5, -2, -3]} intensity={22} color="#8b5cf6" distance={16} />
      <Suspense fallback={null}>
        <Network />
        <Dust />
        <Environment>
          <Lightformer intensity={1.6} position={[0, 4, 2]} scale={[8, 8, 1]} />
          <Lightformer
            intensity={1}
            color="#7aa2ff"
            position={[-5, 0, 1]}
            rotation-y={Math.PI / 2}
            scale={[14, 2, 1]}
          />
        </Environment>
      </Suspense>
      <Rig />
    </Canvas>
  );
}
