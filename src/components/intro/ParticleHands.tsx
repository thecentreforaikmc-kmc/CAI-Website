import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import plateUrl from "@/assets/intro/hands-plate.jpg";
import { intro, T } from "@/data/intro";
import { mulberry32, sampleHands, type ParticleSet } from "./sampleTargets";

type Props = { mobile: boolean; onReady: () => void; onSeal: () => void; onDone: () => void };
type Timeline = { value: number };
const vertex = `
 attribute vec3 aSource; attribute vec3 aTarget; attribute vec3 aColor;
 attribute float aDelay; attribute float aScale; attribute float aSeed;
 uniform float uTime; uniform float uStart; uniform float uSide;
 varying vec3 vColor; varying float vAlpha; varying float vLight;
 void main() {
   float p = clamp((uTime-uStart-aDelay)/${T.formDuration}, 0., 1.);
   float e = p*p*p*(p*(p*6.-15.)+10.);
   vec3 center = mix(aSource,aTarget,e);
   center.y += sin(p*3.14159)*(sin(aSeed*25.)*.32);
   center.z += sin(p*3.14159)*cos(aSeed*19.)*.32;
   float a = clamp((uTime-${T.approach[0]})/${T.approach[1] - T.approach[0]},0.,1.);
   float approach = a*a*a*(a*(a*6.-15.)+10.);
   center.x += uSide*(.30*(1.-approach)-.19);
   center.y += uSide < 0. ? .07 : -.035;
   vec3 local = position*.031*aScale;
   float angle = (1.-e)*(uTime*.45+aSeed*12.);
   local.xy = mat2(cos(angle),-sin(angle),sin(angle),cos(angle))*local.xy;
   vColor = aColor;
   vLight = .60 + .40*max(0.,dot(normal,normalize(vec3(-.4,.8,1.))));
   vAlpha = smoothstep(uStart-.5,uStart+.35,uTime)*(1.-smoothstep(${T.plateIn[0]},${T.plateIn[1] + 0.3},uTime)*.80);
   gl_Position = projectionMatrix*modelViewMatrix*vec4(center+local,1.);
 }`;
const fragment = `varying vec3 vColor; varying float vAlpha; varying float vLight;
 void main(){ gl_FragColor=vec4(vColor*vLight*1.45,vAlpha); }`;

function Cubes({ set, side, time }: { set: ParticleSet; side: number; time: Timeline }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(() => {
    const g = new THREE.BoxGeometry(1, 1, 1);
    g.setAttribute("aSource", new THREE.InstancedBufferAttribute(set.source, 3));
    g.setAttribute("aTarget", new THREE.InstancedBufferAttribute(set.target, 3));
    g.setAttribute("aColor", new THREE.InstancedBufferAttribute(set.color, 3));
    g.setAttribute("aDelay", new THREE.InstancedBufferAttribute(set.delay, 1));
    g.setAttribute("aScale", new THREE.InstancedBufferAttribute(set.scale, 1));
    g.setAttribute("aSeed", new THREE.InstancedBufferAttribute(set.seed, 1));
    return g;
  }, [set]);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uStart: { value: side < 0 ? T.robotStart : T.humanStart },
      uSide: { value: side },
    }),
    [side],
  );
  useEffect(() => () => geometry.dispose(), [geometry]);
  useFrame(() => {
    const u = material.current?.uniforms["uTime"];
    if (u) u.value = time.value;
  });
  return (
    <instancedMesh args={[geometry, undefined, set.count]} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
        depthWrite={false}
      />
    </instancedMesh>
  );
}

function HandPlate({ texture, time }: { texture: THREE.Texture; time: Timeline }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({ uMap: { value: texture }, uTime: { value: 0 }, uContact: { value: intro.contactU } }),
    [texture],
  );
  useFrame(() => {
    const u = material.current?.uniforms["uTime"];
    if (u) u.value = time.value;
  });
  return (
    <mesh position={[0, 0, -0.2]}>
      <planeGeometry args={[12, 6.7]} />
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`varying vec2 vUv; void main(){vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`}
        fragmentShader={`uniform sampler2D uMap; uniform float uTime; uniform float uContact; varying vec2 vUv;
        void main(){
          float side=vUv.x<.5?-1.:1.;
           float a=clamp((uTime-${T.approach[0]})/${T.approach[1] - T.approach[0]},0.,1.);
           float approach=a*a*a*(a*(a*6.-15.)+10.);
            float offset=side*(.30*(1.-approach)-.19);
           vec2 uv=vec2(vUv.x-offset/12.,vUv.y-(side<0.?.07:-.035)/6.7);
           uv.x += uContact-.5; uv.y += .5-${intro.contactV};
           vec3 c=texture2D(uMap,uv).rgb;
           float mask=smoothstep(.025,.09,max(max(c.r,c.g),c.b));
            gl_FragColor=vec4(c,mask*smoothstep(${T.plateIn[0]},${T.plateIn[1]},uTime));
         }`}
      />
    </mesh>
  );
}

function Network({
  time,
  mobile,
  silver,
  violet,
}: {
  time: Timeline;
  mobile: boolean;
  silver: string;
  violet: string;
}) {
  const group = useRef<THREE.Group>(null);
  const cubes = useRef<THREE.InstancedMesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const { positions, edges } = useMemo(() => {
    const random = mulberry32(820);
    const p = Array.from(
      { length: mobile ? 38 : 68 },
      () => new THREE.Vector3((random() - 0.5) * 22, (random() - 0.5) * 13, -2 - random() * 4),
    );
    const e: number[] = [];
    p.forEach((a, i) =>
      p.slice(i + 1).forEach((b) => {
        if (a.distanceTo(b) < 3.3) e.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }),
    );
    return { positions: p, edges: new Float32Array(e) };
  }, [mobile]);
  useEffect(() => {
    const dummy = new THREE.Object3D();
    positions.forEach((p, i) => {
      dummy.position.copy(p);
      dummy.rotation.set(i * 0.3, i * 0.7, 0);
      dummy.scale.setScalar(i % 9 === 0 ? 0.16 : 0.045);
      dummy.updateMatrix();
      cubes.current?.setMatrixAt(i, dummy.matrix);
    });
    if (cubes.current) cubes.current.instanceMatrix.needsUpdate = true;
  }, [positions]);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.z += Math.min(delta, 0.05) * 0.006;
    const age = time.value - T.contact;
    if (material.current)
      material.current.emissiveIntensity =
        0.15 +
        (age >= 0 ? THREE.MathUtils.smoothstep(age, 0, 0.22) * Math.exp(-age * 2) : 0) * 0.55;
  });
  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edges, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={violet} transparent opacity={0.12} />
      </lineSegments>
      <instancedMesh
        ref={cubes}
        args={[undefined, undefined, positions.length]}
        frustumCulled={false}
      >
        <boxGeometry />
        <meshStandardMaterial
          ref={material}
          color={silver}
          emissive={violet}
          metalness={0.65}
          roughness={0.35}
          transparent
          opacity={0.4}
        />
      </instancedMesh>
    </group>
  );
}

function Pulse({ time, color }: { time: Timeline; color: string }) {
  const glow = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const glowMat = useRef<THREE.ShaderMaterial>(null);
  const ringMat = useRef<THREE.MeshBasicMaterial>(null);
  const uniforms = useMemo(
    () => ({ uColor: { value: new THREE.Color(color) }, uAlpha: { value: 0 } }),
    [color],
  );
  useFrame(() => {
    const age = time.value - T.contact;
    const strength = age >= 0 ? THREE.MathUtils.smoothstep(age, 0, 0.16) * Math.exp(-age * 2.8) : 0;
    const u = glowMat.current?.uniforms["uAlpha"];
    if (u) u.value = strength;
    glow.current?.scale.setScalar(1.2 + Math.max(0, age) * 0.75);
    ring.current?.scale.setScalar(0.04 + Math.max(0, age) * 1.1);
    if (ringMat.current)
      ringMat.current.opacity =
        age >= 0 ? THREE.MathUtils.smoothstep(age, 0, 0.12) * Math.exp(-age * 2.4) * 0.45 : 0;
  });
  return (
    <group position={[0, 0, 0.5]}>
      <mesh ref={glow}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={glowMat}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexShader={`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`}
          fragmentShader={`varying vec2 vUv;uniform vec3 uColor;uniform float uAlpha;void main(){float d=length(vUv-.5);float a=exp(-d*15.)+exp(-d*75.);gl_FragColor=vec4(uColor,a*uAlpha);}`}
        />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[0.97, 1, 64]} />
        <meshBasicMaterial
          ref={ringMat}
          color={color}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function Scene({ mobile, onReady, onSeal, onDone }: Props) {
  const texture = useTexture(plateUrl);
  const time = useMemo(() => ({ value: 0 }), []);
  const sealed = useRef(false);
  const done = useRef(false);
  const started = useRef<number | null>(null);
  const { size, camera } = useThree();
  const palette = useMemo(() => {
    const css = getComputedStyle(document.documentElement);
    return {
      silver: css.getPropertyValue("--intro-silver").trim(),
      violet: css.getPropertyValue("--intro-violet").trim(),
      pulse: css.getPropertyValue("--intro-pulse").trim(),
    };
  }, []);
  const hands = useMemo(() => {
    const image = texture.image as HTMLImageElement;
    const canvas = document.createElement("canvas");
    canvas.width = 688;
    canvas.height = 384;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Intro image sampling unavailable");
    ctx.drawImage(image, 0, 0, 688, 384);
    return sampleHands(ctx.getImageData(0, 0, 688, 384), {
      robotCount: mobile ? 1250 : 3000,
      humanCount: mobile ? 1250 : 3000,
      contactU: intro.contactU,
      contactV: intro.contactV,
      worldWidth: 12,
    });
  }, [texture, mobile]);
  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    if (camera instanceof THREE.PerspectiveCamera) {
      const aspect = size.width / size.height;
      camera.position.z = 6.3 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) / aspect;
      camera.position.z = Math.max(9, camera.position.z);
      camera.updateProjectionMatrix();
    }
  }, [camera, size, texture]);
  useEffect(() => {
    onReady();
  }, [onReady]);
  useFrame(() => {
    // Keep the cinematic sequence inside the safety timeout on slower devices.
    const now = performance.now();
    if (started.current === null) started.current = now;
    time.value = (now - started.current) / 1000;
    if (time.value >= T.sceneOut && !sealed.current) {
      sealed.current = true;
      onSeal();
    }
    if (time.value >= T.end && !done.current) {
      done.current = true;
      onDone();
    }
  }, -1);
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[1, 4, 5]} intensity={1.8} />
      <Network time={time} mobile={mobile} silver={palette.silver} violet={palette.violet} />
      <Cubes set={hands.robot} side={-1} time={time} />
      <Cubes set={hands.human} side={1} time={time} />
      <HandPlate texture={texture} time={time} />
      <Pulse time={time} color={palette.pulse} />
      <Environment resolution={64}>
        <Lightformer intensity={1.5} position={[0, 4, 3]} scale={[10, 5, 1]} />
      </Environment>
    </>
  );
}

export default function ParticleHands(props: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 42 }}
      dpr={props.mobile ? 1 : [1, 1.5]}
      gl={{ alpha: true, antialias: !props.mobile }}
    >
      <Suspense fallback={null}>
        <Scene {...props} />
      </Suspense>
    </Canvas>
  );
}
