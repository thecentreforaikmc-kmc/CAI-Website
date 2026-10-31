import { lazy, Suspense, useEffect, useState } from "react";

const HeroScene = lazy(() => import("./three/HeroScene"));

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function Fallback() {
  return (
    <div aria-hidden="true" className="relative flex h-full w-full items-center justify-center">
      <div className="float-soft relative h-56 w-56 rounded-full border border-primary/40 sm:h-72 sm:w-72">
        <div className="absolute inset-6 rounded-full border border-violet/30" />
        <div className="absolute inset-14 rounded-full bg-[var(--gradient-brand)] opacity-25 blur-2xl" />
        <div className="absolute inset-16 rounded-full border border-primary/50" />
      </div>
    </div>
  );
}

export function HeroVisual() {
  const [ready, setReady] = useState(false);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    setWebgl(supportsWebGL());
    setReady(true);
  }, []);

  if (!ready || !webgl) return <Fallback />;

  return (
    <Suspense fallback={<Fallback />}>
      <HeroScene />
    </Suspense>
  );
}
