import { Component, lazy, Suspense, useCallback, useEffect, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const logo = "/cai-logo.webp";
import plate from "@/assets/intro/hands-plate.jpg";
import { intro } from "@/data/intro";

// The WebGL scene pulls in three.js — load it only when the intro actually runs.
const ParticleHands = lazy(() => import("./ParticleHands"));

const SESSION_KEY = "cai-intro-seen-v1";

class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override componentDidCatch() {
    this.props.onError();
  }
  override render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function IntroLoader() {
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [seal, setSeal] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [ready, setReady] = useState(false);
  const finish = useCallback(() => setExiting(true), []);
  const showSeal = useCallback(() => {
    if (intro.endMode === "logo") setSeal(true);
  }, []);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (!intro.enabled) return;
    try {
      if (intro.oncePerSession && sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* Storage can be disabled. */
    }
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMobile(window.matchMedia("(max-width: 767px)").matches);
    setVisible(true);
  }, []);
  useEffect(() => {
    if (!visible) return;
    const timeout = window.setTimeout(finish, intro.maxDurationMs - intro.exitDurationMs);
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    window.addEventListener("keydown", escape);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("keydown", escape);
    };
  }, [visible, finish]);
  useEffect(() => {
    if (!visible || !reduced) return;
    const first = window.setTimeout(showSeal, 350);
    const last = window.setTimeout(finish, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(last);
    };
  }, [visible, reduced, showSeal, finish]);
  useEffect(() => {
    if (!exiting) return;
    const timer = window.setTimeout(() => setVisible(false), intro.exitDurationMs);
    return () => window.clearTimeout(timer);
  }, [exiting]);

  if (!visible) return null;
  return (
    <div
      className="intro-overlay fixed inset-0 z-[200] overflow-hidden"
      data-exiting={exiting}
      data-ready={ready || reduced}
      data-testid="cai-intro"
      aria-label="CAI introduction"
    >
      <div className="intro-scene absolute inset-0" data-hidden={seal} aria-hidden="true">
        {(reduced || !ready) && (
          <img
            src={plate}
            alt=""
            className={`intro-still absolute inset-0 h-full w-full object-contain ${reduced ? "opacity-100" : "opacity-20"}`}
          />
        )}
        {!reduced && (
          <SceneBoundary onError={finish}>
            <Suspense fallback={null}>
              <ParticleHands mobile={mobile} onReady={onReady} onSeal={showSeal} onDone={finish} />
            </Suspense>
          </SceneBoundary>
        )}
        {/* Reference video plays silently during intro */}
        {intro.videoSrc && !reduced && (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="intro-video absolute inset-0 w-full h-full object-cover opacity-5"
            src={intro.videoSrc}
          />
        )}
      </div>
      <div
        className="intro-seal absolute inset-0 flex items-center justify-center"
        data-visible={seal}
        aria-hidden={!seal}
      >
        <img
          src={logo}
          alt="Centre for Artificial Intelligence seal"
          className="h-auto w-60 max-w-[65vw] sm:w-72"
        />
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="absolute bottom-6 right-6 z-10 gap-2 text-muted-foreground hover:text-foreground"
        onClick={finish}
      >
        Skip intro
        <ArrowRight />
      </Button>
    </div>
  );
}
