import { useEffect, useRef, useState } from "react";

const INTERACTIVE = "a, button, [role='button'], select, label, .interactive, .glow-border-hover";
const TEXT_INPUTS = "input, textarea, [contenteditable='true']";

/** Lerp factor for the outer ring — responsive glide, never floaty. */
const RING_LERP = 0.18;

/**
 * Themed cursor with a two-layer architecture per element:
 *
 *   .cursor-layer  → POSITION ONLY. `transform: translate3d(--x, --y, 0)`, transition: none.
 *   .cursor-dot /  → VISUALS ONLY. Centered on the layer's anchor; hover / press change
 *   .cursor-ring     size, colour, and `scale()` — they never touch the translate.
 *
 * Over text inputs (input, textarea, [contenteditable]):
 *   The custom cursor smoothly hides (`opacity: 0`), and the native browser I-beam
 *   caret (`cursor: text;`) is shown. Leaving the input immediately restores the custom
 *   cyan dot and glowing halo back to full opacity (`opacity: 1`).
 */
export default function CustomCursor() {
  const dotLayerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringLayerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on devices with a fine pointer (desktop mice / trackpads)
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dotLayer = dotLayerRef.current;
    const dot = dotRef.current;
    const ringLayer = ringLayerRef.current;
    const ring = ringRef.current;
    if (!dotLayer || !dot || !ringLayer || !ring) return;

    document.documentElement.classList.add("custom-cursor");

    // Hardware pointer position (viewport space) and the ring's lerped position.
    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let hasPointer = false;
    let isWindowVisible = true;
    let isOverTextInput = false;
    let raf = 0;
    let currentTarget: Element | null = null;

    const syncVisibility = () => {
      const shouldHide = !hasPointer || !isWindowVisible || isOverTextInput;
      dot.classList.toggle("cursor-hidden", shouldHide);
      ring.classList.toggle("cursor-hidden", shouldHide);
    };

    const onMove = (e: PointerEvent) => {
      // Ignore touch contacts on hybrid devices — only mouse / pen drive the themed cursor.
      if (e.pointerType === "touch") return;

      x = e.clientX;
      y = e.clientY;

      // ZERO-LAG: the dot's position is written synchronously in the event handler.
      dotLayer.style.setProperty("--x", `${x}px`);
      dotLayer.style.setProperty("--y", `${y}px`);

      if (!hasPointer) {
        hasPointer = true;
        rx = x;
        ry = y;
        ringLayer.style.setProperty("--x", `${rx}px`);
        ringLayer.style.setProperty("--y", `${ry}px`);
      }

      // Check if hovering over text inputs/textareas
      const rawTarget = e.target as Element | null;
      const textInput = rawTarget?.closest?.(TEXT_INPUTS) ?? null;
      const nowOverTextInput = !!textInput;
      if (nowOverTextInput !== isOverTextInput) {
        isOverTextInput = nowOverTextInput;
        syncVisibility();
      }

      // Hover detection for interactive buttons / cards (excluding text inputs)
      const target = isOverTextInput ? null : (rawTarget?.closest?.(INTERACTIVE) ?? null);
      if (target !== currentTarget) {
        currentTarget?.classList.remove("cursor-hovered");
        currentTarget = target;
        currentTarget?.classList.add("cursor-hovered");
        const active = !!target;
        dot.classList.toggle("is-active", active);
        ring.classList.toggle("is-active", active);
      } else if (!isOverTextInput) {
        syncVisibility();
      }
    };

    // Ring: lightweight per-frame lerp toward the pointer.
    const loop = () => {
      rx += (x - rx) * RING_LERP;
      ry += (y - ry) * RING_LERP;
      ringLayer.style.setProperty("--x", `${rx}px`);
      ringLayer.style.setProperty("--y", `${ry}px`);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Press state: class toggle only → CSS `scale()` on the visual layer.
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch" || isOverTextInput) return;
      dot.classList.add("is-pressed");
      ring.classList.add("is-pressed");
    };
    const onUp = () => {
      dot.classList.remove("is-pressed");
      ring.classList.remove("is-pressed");
    };

    // Hide when pointer leaves browser window, show when it returns.
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        isWindowVisible = false;
        syncVisibility();
      }
    };
    const onOver = () => {
      if (!isWindowVisible) {
        isWindowVisible = true;
        syncVisibility();
      }
    };

    // When focus lands on or leaves text fields, keep state in sync
    const onFocusIn = (e: FocusEvent) => {
      const el = e.target as Element | null;
      if (el?.closest?.(TEXT_INPUTS)) {
        isOverTextInput = true;
        syncVisibility();
      }
    };
    const onFocusOut = (e: FocusEvent) => {
      const el = e.target as Element | null;
      if (el?.closest?.(TEXT_INPUTS)) {
        isOverTextInput = false;
        syncVisibility();
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    window.addEventListener("blur", onUp);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("blur", onUp);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      document.documentElement.classList.remove("custom-cursor");
      currentTarget?.classList.remove("cursor-hovered");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer ring — position layer (lerped) + visual layer */}
      <div ref={ringLayerRef} className="cursor-layer" aria-hidden>
        <div ref={ringRef} className="cursor-ring cursor-hidden" />
      </div>
      {/* Inner dot — position layer (instant) + visual layer */}
      <div ref={dotLayerRef} className="cursor-layer" aria-hidden>
        <div ref={dotRef} className="cursor-dot cursor-hidden" />
      </div>
    </>
  );
}
