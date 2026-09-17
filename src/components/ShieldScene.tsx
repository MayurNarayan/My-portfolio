import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Interactive Digital Network Constellation
 * Pulsing data nodes connected by delicate glowing lines that subtly
 * twist and bend toward the cursor.
 */
export default function ShieldScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    velocity: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    inside: false,
  });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070b, 0.06);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    /* ---------- Nodes ---------- */
    const NODE_COUNT = 80;
    const LINK_DIST = 2.15;
    const basePositions: THREE.Vector3[] = [];
    const nodes: THREE.Mesh[] = [];
    const phases: number[] = [];

    const nodeGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const matA = new THREE.MeshBasicMaterial({ color: 0x5eead4, transparent: true, opacity: 0.95 });
    const matB = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.95 });

    for (let i = 0; i < NODE_COUNT; i++) {
      // distribute in a slightly flattened sphere for a "constellation" feel
      const r = 1.2 + Math.pow(Math.random(), 0.6) * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const p = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.8,
        r * Math.cos(phi) * 0.7
      );
      basePositions.push(p);
      phases.push(Math.random() * Math.PI * 2);
      const m = new THREE.Mesh(nodeGeo, i % 3 === 0 ? matB : matA);
      m.position.copy(p);
      nodes.push(m);
      group.add(m);
    }

    /* ---------- Links (computed once from base positions) ---------- */
    const pairs: [number, number][] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (basePositions[i].distanceTo(basePositions[j]) < LINK_DIST) pairs.push([i, j]);
      }
    }
    const linePositions = new Float32Array(pairs.length * 6);
    const lineColors = new Float32Array(pairs.length * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lines);

    const cEmerald = new THREE.Color(0x10b981);
    const cCyan = new THREE.Color(0x06b6d4);

    /* ---------- Proximity waves ---------- */
    const waveGeometry = new THREE.RingGeometry(0.1, 0.125, 32);
    const waveMaterials: THREE.MeshBasicMaterial[] = [];
    const waves: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x5eead4 : 0x22d3ee,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const wave = new THREE.Mesh(waveGeometry, material);
      wave.visible = false;
      waveMaterials.push(material);
      waves.push(wave);
      group.add(wave);
    }

    /* ---------- Ambient dust ---------- */
    const dustCount = 220;
    const dustPos = new Float32Array(dustCount * 3);
    const dustBase = new Float32Array(dustCount * 3);
    const dustPhases = new Float32Array(dustCount);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 14;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      dustBase[i * 3] = dustPos[i * 3];
      dustBase[i * 3 + 1] = dustPos[i * 3 + 1];
      dustBase[i * 3 + 2] = dustPos[i * 3 + 2];
      dustPhases[i] = Math.random() * Math.PI * 2;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({ color: 0x10b981, size: 0.02, transparent: true, opacity: 0.35, depthWrite: false })
    );
    scene.add(dust);

    /* ---------- Interaction ---------- */
    const onPointer = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      const m = mouseRef.current;
      const now = performance.now();
      if (m.lastTime > 0) {
        const distance = Math.hypot(e.clientX - m.lastX, e.clientY - m.lastY);
        const elapsed = Math.max(8, now - m.lastTime);
        m.velocity = Math.max(m.velocity, THREE.MathUtils.clamp(distance / elapsed / 1.4, 0, 1));
      }
      m.lastX = e.clientX;
      m.lastY = e.clientY;
      m.lastTime = now;
      m.inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      m.tx = THREE.MathUtils.clamp(nx, -1.2, 1.2);
      m.ty = THREE.MathUtils.clamp(ny, -1.2, 1.2);
    };
    window.addEventListener("pointermove", onPointer);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf = 0;
    let networkRotation = 0;
    const tmp = new THREE.Vector3();
    const cursorWorld = new THREE.Vector3();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      const m = mouseRef.current;
      m.x += (m.tx - m.x) * 0.06;
      m.y += (m.ty - m.y) * 0.06;
      m.velocity *= Math.pow(0.88, delta * 60);

      // Cursor position in the group's local space (approximate plane at z=0)
      cursorWorld.set(m.x * 4.2, m.y * 3, 0.5);

      // Cursor velocity briefly accelerates the network without abrupt jumps.
      networkRotation += delta * (0.055 + m.velocity * 0.18);
      group.rotation.y = networkRotation + m.x * 0.25;
      group.rotation.x = Math.sin(t * 0.15) * 0.05 - m.y * 0.18;

      // Node drift + bend toward cursor
      let nearestNode = -1;
      let nearestDistance = Number.POSITIVE_INFINITY;
      for (let i = 0; i < NODE_COUNT; i++) {
        const base = basePositions[i];
        const ph = phases[i];
        tmp.set(
          base.x + Math.sin(t * 0.5 + ph) * 0.08,
          base.y + Math.cos(t * 0.42 + ph * 1.3) * 0.08,
          base.z + Math.sin(t * 0.36 + ph * 0.7) * 0.06
        );
        // bend: pull node slightly toward cursor based on proximity
        const d = tmp.distanceTo(cursorWorld);
        if (d < nearestDistance) {
          nearestDistance = d;
          nearestNode = i;
        }
        const pull = Math.max(0, 1 - d / 3.2) * 0.35;
        tmp.lerp(cursorWorld, pull * 0.25);
        nodes[i].position.copy(tmp);

        // pulse
        const s = 0.75 + (Math.sin(t * 2 + ph) * 0.5 + 0.5) * 0.7 + pull * 1.2;
        nodes[i].scale.setScalar(s);
      }

      // A restrained wave expands from the nearest node while the pointer is close.
      const waveStrength = m.inside ? THREE.MathUtils.clamp(1 - nearestDistance / 1.25, 0, 1) : 0;
      for (let i = 0; i < waves.length; i++) {
        const wave = waves[i];
        const material = waveMaterials[i];
        if (waveStrength > 0.02 && nearestNode >= 0) {
          const phase = (t * 0.7 + i / waves.length) % 1;
          wave.visible = true;
          wave.position.lerp(nodes[nearestNode].position, 0.35);
          wave.scale.setScalar(0.8 + phase * 5.5);
          material.opacity = (1 - phase) * waveStrength * 0.5;
        } else {
          material.opacity *= 0.82;
          if (material.opacity < 0.01) wave.visible = false;
        }
      }

      // Update line geometry
      for (let k = 0; k < pairs.length; k++) {
        const [a, b] = pairs[k];
        const pa = nodes[a].position;
        const pb = nodes[b].position;
        linePositions[k * 6] = pa.x;
        linePositions[k * 6 + 1] = pa.y;
        linePositions[k * 6 + 2] = pa.z;
        linePositions[k * 6 + 3] = pb.x;
        linePositions[k * 6 + 4] = pb.y;
        linePositions[k * 6 + 5] = pb.z;

        // brightness fades with length and brightens near cursor
        const len = pa.distanceTo(pb);
        const near = 1 - Math.min(1, Math.min(pa.distanceTo(cursorWorld), pb.distanceTo(cursorWorld)) / 3);
        const intensity = THREE.MathUtils.clamp((1 - len / LINK_DIST) * 0.9 + near * 0.6 + Math.sin(t * 1.5 + k) * 0.08, 0.08, 1);
        const col = k % 2 === 0 ? cEmerald : cCyan;
        lineColors[k * 6] = col.r * intensity;
        lineColors[k * 6 + 1] = col.g * intensity;
        lineColors[k * 6 + 2] = col.b * intensity;
        lineColors[k * 6 + 3] = col.r * intensity;
        lineColors[k * 6 + 4] = col.g * intensity;
        lineColors[k * 6 + 5] = col.b * intensity;
      }
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;

      // Independent particle drift adds depth beyond a simple group rotation.
      for (let i = 0; i < dustCount; i++) {
        const p = i * 3;
        const phase = dustPhases[i];
        dustPos[p] = dustBase[p] + Math.sin(t * 0.12 + phase) * 0.18;
        dustPos[p + 1] = dustBase[p + 1] + Math.cos(t * 0.1 + phase * 1.3) * 0.16;
        dustPos[p + 2] = dustBase[p + 2] + Math.sin(t * 0.08 + phase * 0.7) * 0.12;
      }
      dustGeo.attributes.position.needsUpdate = true;
      dust.rotation.y = t * 0.01;
      dust.position.x = m.x * 0.15;
      dust.position.y = m.y * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      nodeGeo.dispose();
      matA.dispose();
      matB.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      waveGeometry.dispose();
      waveMaterials.forEach((material) => material.dispose());
      dustGeo.dispose();
      (dust.material as THREE.Material).dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" />;
}
