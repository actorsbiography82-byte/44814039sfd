"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Hero3DCanvasProps {
  avatarUrl?: string;
}

export function Hero3DCanvas({
  avatarUrl = "/images/e081a0e1-79db-4081-ba5f-0b153db2e6c4.png",
}: Hero3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf8f7f4, 0.0016);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 38);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x285141, 2.8);
    dirLight1.position.set(20, 30, 25);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x10b981, 1.8);
    dirLight2.position.set(-25, -20, -20);
    scene.add(dirLight2);

    const centerPointLight = new THREE.PointLight(0x285141, 2.5, 40);
    centerPointLight.position.set(0, 0, 4);
    scene.add(centerPointLight);

    // ROOT OBJECT TO ROTATE WITH USER DRAG / INERTIA
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Helper: Draw rounded badge background
    const drawBadgeBg = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      bg: string,
      border: string
    ) => {
      const r = 24;
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.roundRect(4, 4, w - 8, h - 8, r);
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.lineWidth = 8;
      ctx.stroke();
    };

    const createCardCanvas = (
      width: number,
      height: number,
      draw: (ctx: CanvasRenderingContext2D) => void
    ) => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      draw(ctx);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      return texture;
    };

    // =========================================================
    // 1. DEAD-CENTER PROFILE PICTURE BADGE (Focal Center)
    // =========================================================
    const avatarCanvas = document.createElement("canvas");
    avatarCanvas.width = 512;
    avatarCanvas.height = 512;
    const avatarCtx = avatarCanvas.getContext("2d")!;

    // Initial placeholder while image loads
    const renderAvatarTexture = (imgLoaded?: HTMLImageElement) => {
      avatarCtx.clearRect(0, 0, 512, 512);

      // Card outer background
      avatarCtx.fillStyle = "#ffffff";
      avatarCtx.beginPath();
      avatarCtx.arc(256, 256, 246, 0, Math.PI * 2);
      avatarCtx.fill();
      avatarCtx.strokeStyle = "#285141";
      avatarCtx.lineWidth = 14;
      avatarCtx.stroke();

      if (imgLoaded) {
        avatarCtx.save();
        avatarCtx.beginPath();
        avatarCtx.arc(256, 256, 236, 0, Math.PI * 2);
        avatarCtx.clip();
        avatarCtx.drawImage(imgLoaded, 20, 20, 472, 472);
        avatarCtx.restore();
      } else {
        avatarCtx.fillStyle = "#285141";
        avatarCtx.beginPath();
        avatarCtx.arc(256, 256, 236, 0, Math.PI * 2);
        avatarCtx.fill();
        avatarCtx.fillStyle = "#ffffff";
        avatarCtx.font = "bold 150px sans-serif";
        avatarCtx.textAlign = "center";
        avatarCtx.textBaseline = "middle";
        avatarCtx.fillText("Z", 256, 256);
      }

      // Glowing online indicator status dot
      avatarCtx.fillStyle = "#10b981";
      avatarCtx.beginPath();
      avatarCtx.arc(410, 410, 34, 0, Math.PI * 2);
      avatarCtx.fill();
      avatarCtx.strokeStyle = "#ffffff";
      avatarCtx.lineWidth = 8;
      avatarCtx.stroke();
    };

    renderAvatarTexture();
    const avatarTexture = new THREE.CanvasTexture(avatarCanvas);
    avatarTexture.colorSpace = THREE.SRGBColorSpace;

    // Load actual local profile image
    const profileImg = new Image();
    profileImg.crossOrigin = "anonymous";
    profileImg.src = avatarUrl;
    profileImg.onload = () => {
      renderAvatarTexture(profileImg);
      avatarTexture.needsUpdate = true;
    };

    // Central 3D Disc / Beveled Portal Mesh
    const centerGroup = new THREE.Group();
    worldGroup.add(centerGroup);

    // Front & Back materials
    const discGeo = new THREE.CylinderGeometry(5.4, 5.4, 0.6, 64);
    const discSideMat = new THREE.MeshStandardMaterial({
      color: 0x1e3e32,
      roughness: 0.25,
      metalness: 0.85,
    });
    const discFrontMat = new THREE.MeshStandardMaterial({
      map: avatarTexture,
      roughness: 0.15,
      metalness: 0.1,
    });
    const discBackMat = new THREE.MeshStandardMaterial({
      color: 0x141716,
      roughness: 0.3,
      metalness: 0.8,
    });

    const centerDisc = new THREE.Mesh(discGeo, [discSideMat, discFrontMat, discBackMat]);
    centerDisc.rotation.x = Math.PI / 2;
    centerGroup.add(centerDisc);

    // Outer Glowing Halo Rim
    const haloGeo = new THREE.RingGeometry(5.7, 6.2, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x285141,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const centerHalo = new THREE.Mesh(haloGeo, haloMat);
    centerHalo.position.z = -0.35;
    centerGroup.add(centerHalo);

    // Inner Tech Pulse Ring
    const innerPulseGeo = new THREE.RingGeometry(6.6, 6.8, 64);
    const innerPulseMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const innerPulseRing = new THREE.Mesh(innerPulseGeo, innerPulseMat);
    innerPulseRing.position.z = -0.4;
    centerGroup.add(innerPulseRing);

    // =========================================================
    // 2. SMOOTH 3D ORBITING RING (Tilted in 3D space)
    // =========================================================
    const orbitRadiusX = 17.5;
    const orbitRadiusZ = 14.5;
    const orbitTiltX = 0.35; // ~20 deg tilt
    const orbitTiltZ = -0.15; // ~8 deg tilt

    const createOrbitRing = () => {
      const curve = new THREE.EllipseCurve(0, 0, orbitRadiusX, orbitRadiusZ, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(160);
      const geometry = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, 0, p.y))
      );
      const material = new THREE.LineDashedMaterial({
        color: 0x285141,
        dashSize: 0.9,
        gapSize: 0.45,
        transparent: true,
        opacity: 0.3,
      });
      const ringLine = new THREE.Line(geometry, material);
      ringLine.computeLineDistances();
      ringLine.rotation.x = orbitTiltX;
      ringLine.rotation.z = orbitTiltZ;
      return ringLine;
    };

    // Secondary subtle counter-ring
    const createCounterRing = () => {
      const curve = new THREE.EllipseCurve(0, 0, 19.5, 16.0, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(140);
      const geometry = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, 0, p.y))
      );
      const material = new THREE.LineDashedMaterial({
        color: 0x10b981,
        dashSize: 1.2,
        gapSize: 0.8,
        transparent: true,
        opacity: 0.18,
      });
      const ringLine = new THREE.Line(geometry, material);
      ringLine.computeLineDistances();
      ringLine.rotation.x = -0.25;
      ringLine.rotation.z = 0.2;
      return ringLine;
    };

    worldGroup.add(createOrbitRing(), createCounterRing());

    // =========================================================
    // 3. 5 TECH BADGES (WordPress, Elementor, WooCommerce, OpenAI, PHP)
    // =========================================================

    // 1) WordPress 3D Badge
    const wpTexture = createCardCanvas(512, 512, (ctx) => {
      drawBadgeBg(ctx, 512, 512, "#ffffff", "#21759b");
      ctx.fillStyle = "#21759b";
      ctx.beginPath();
      ctx.arc(256, 230, 150, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 190px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("W", 256, 240);

      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 40px sans-serif";
      ctx.fillText("WordPress", 256, 445);
    });

    // 2) Elementor 3D Badge (Signature 3-bar E logo)
    const elementorTexture = createCardCanvas(512, 512, (ctx) => {
      drawBadgeBg(ctx, 512, 512, "#ffffff", "#92003b");
      ctx.fillStyle = "#92003b";
      ctx.beginPath();
      ctx.arc(256, 230, 150, 0, Math.PI * 2);
      ctx.fill();

      // Elementor 3-bar icon
      ctx.fillStyle = "#ffffff";
      // Left vertical tall bar
      ctx.fillRect(175, 145, 28, 170);
      // Right 3 horizontal bars
      ctx.fillRect(225, 145, 110, 28);
      ctx.fillRect(225, 216, 110, 28);
      ctx.fillRect(225, 287, 110, 28);

      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 40px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Elementor Pro", 256, 445);
    });

    // 3) WooCommerce 3D Badge
    const wooTexture = createCardCanvas(512, 512, (ctx) => {
      drawBadgeBg(ctx, 512, 512, "#ffffff", "#96588a");
      ctx.fillStyle = "#96588a";
      ctx.beginPath();
      ctx.roundRect(145, 130, 222, 190, 22);
      ctx.fill();

      ctx.strokeStyle = "#96588a";
      ctx.lineWidth = 16;
      ctx.beginPath();
      ctx.arc(256, 130, 55, Math.PI, 0, false);
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "900 68px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Woo", 256, 245);

      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 38px sans-serif";
      ctx.fillText("WooCommerce", 256, 445);
    });

    // 4) OpenAI 3D Badge (Neural gear logo)
    const openAiTexture = createCardCanvas(512, 512, (ctx) => {
      drawBadgeBg(ctx, 512, 512, "#0f172a", "#10a37f");
      ctx.save();
      ctx.translate(256, 225);
      ctx.strokeStyle = "#10a37f";
      ctx.lineWidth = 13;
      ctx.lineCap = "round";
      for (let i = 0; i < 6; i++) {
        ctx.rotate(Math.PI / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -100);
        ctx.stroke();

        ctx.fillStyle = "#34d399";
        ctx.beginPath();
        ctx.arc(0, -100, 16, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(0, 0, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = "#f8fafc";
      ctx.font = "bold 40px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("OpenAI API", 256, 445);
    });

    // 5) PHP 3D Badge (Signature PHP oval)
    const phpTexture = createCardCanvas(512, 512, (ctx) => {
      drawBadgeBg(ctx, 512, 512, "#ffffff", "#4F5B93");
      ctx.fillStyle = "#4F5B93";
      ctx.beginPath();
      ctx.ellipse(256, 230, 170, 110, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 100px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("php", 256, 230);

      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 40px sans-serif";
      ctx.fillText("PHP 8.3", 256, 445);
    });

    // Helper: 3D Beveled Badge Mesh
    const create3DBadge = (texture: THREE.CanvasTexture, w = 3.8, h = 3.8, d = 0.35) => {
      const group = new THREE.Group();
      const boxGeo = new THREE.BoxGeometry(w, h, d);
      const materials = [
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3, metalness: 0.5 }),
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3, metalness: 0.5 }),
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3, metalness: 0.5 }),
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3, metalness: 0.5 }),
        new THREE.MeshStandardMaterial({ map: texture, roughness: 0.2, metalness: 0.1 }),
        new THREE.MeshStandardMaterial({ color: 0x285141, roughness: 0.2, metalness: 0.7 }),
      ];
      const mesh = new THREE.Mesh(boxGeo, materials);
      group.add(mesh);

      // Back glow plate
      const glowGeo = new THREE.PlaneGeometry(w * 1.2, h * 1.2);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x285141,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.position.z = -d * 0.6;
      group.add(glow);

      return group;
    };

    const nodeWP = create3DBadge(wpTexture, 4.0, 4.0, 0.35);
    const nodeElementor = create3DBadge(elementorTexture, 4.0, 4.0, 0.35);
    const nodeWoo = create3DBadge(wooTexture, 3.8, 3.8, 0.35);
    const nodeOpenAI = create3DBadge(openAiTexture, 4.0, 4.0, 0.35);
    const nodePHP = create3DBadge(phpTexture, 3.8, 3.8, 0.35);

    worldGroup.add(nodeWP, nodeElementor, nodeWoo, nodeOpenAI, nodePHP);

    // 5 Orbiting Badges equally spaced (72 deg apart)
    const orbitNodes = [
      { group: nodeWP, offset: 0, scale: 0.95 },
      { group: nodeElementor, offset: (Math.PI * 2 * 1) / 5, scale: 0.95 },
      { group: nodeWoo, offset: (Math.PI * 2 * 2) / 5, scale: 0.92 },
      { group: nodeOpenAI, offset: (Math.PI * 2 * 3) / 5, scale: 0.95 },
      { group: nodePHP, offset: (Math.PI * 2 * 4) / 5, scale: 0.92 },
    ];

    // =========================================================
    // 4. AMBIENT PARTICLES (Starfield Dust)
    // =========================================================
    const pCount = 180;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 75;
      pPos[i + 1] = (Math.random() - 0.5) * 55;
      pPos[i + 2] = (Math.random() - 0.5) * 60;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.45,
      color: 0x285141,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(pGeo, pMat);
    worldGroup.add(particles);

    // =========================================================
    // 5. INTERACTIVE DRAG & MOUSE PARALLAX
    // =========================================================
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let mouseParallaxX = 0;
    let mouseParallaxY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const rect = container.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((clientY - rect.top) / rect.height) * 2 - 1);
      mouseParallaxX = nx * 1.2;
      mouseParallaxY = ny * 0.8;

      if (isDragging) {
        const deltaX = clientX - prevMouseX;
        const deltaY = clientY - prevMouseY;
        targetRotationY += deltaX * 0.006;
        targetRotationX += deltaY * 0.004;
        prevMouseX = clientX;
        prevMouseY = clientY;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    container.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // =========================================================
    // 6. RESPONSIVE RESIZE
    // =========================================================
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;

      if (w < 640) {
        camera.position.z = 48;
        centerGroup.scale.set(0.85, 0.85, 0.85);
      } else if (w < 1024) {
        camera.position.z = 42;
        centerGroup.scale.set(0.95, 0.95, 0.95);
      } else {
        camera.position.z = 38;
        centerGroup.scale.set(1.0, 1.0, 1.0);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);
    onResize();
    setIsLoaded(true);

    // =========================================================
    // 7. ANIMATION LOOP
    // =========================================================
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Inertia easing
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;

      worldGroup.rotation.x = currentRotationX + mouseParallaxY * 0.06;
      worldGroup.rotation.y = currentRotationY + mouseParallaxX * 0.1;

      // Central Profile Picture: Gentle levitation & subtle breathing pulse
      centerDisc.position.y = Math.sin(elapsedTime * 1.5) * 0.35;
      centerHalo.rotation.z += delta * 0.2;
      innerPulseRing.rotation.z -= delta * 0.15;
      const pulse = 1 + Math.sin(elapsedTime * 2.2) * 0.03;
      innerPulseRing.scale.set(pulse, pulse, pulse);

      // Smooth Orbital Ring Rotation
      const orbitSpeed = prefersReducedMotion ? 0.04 : 0.38;
      const globalOrbitAngle = elapsedTime * orbitSpeed;

      orbitNodes.forEach((node) => {
        const angle = globalOrbitAngle + node.offset;

        // Base ellipse position
        const px = Math.cos(angle) * orbitRadiusX;
        const pz = Math.sin(angle) * orbitRadiusZ;

        // Apply 3D orbit tilt
        const tiltedY = pz * Math.sin(orbitTiltX) + px * Math.sin(orbitTiltZ);
        const finalX = px * Math.cos(orbitTiltZ) - pz * Math.sin(orbitTiltX);
        const finalZ = pz * Math.cos(orbitTiltX) + px * Math.sin(orbitTiltZ);

        node.group.position.x = finalX;
        node.group.position.z = finalZ;
        node.group.position.y = tiltedY + Math.sin(elapsedTime * 1.8 + node.offset) * 0.4;

        // Billboard toward camera
        node.group.quaternion.copy(camera.quaternion);

        // Perspective depth scale
        const dist = node.group.position.distanceTo(camera.position);
        const depthScale = Math.max(0.7, Math.min(1.2, 38 / dist)) * node.scale;
        node.group.scale.set(depthScale, depthScale, depthScale);
      });

      particles.rotation.y += delta * 0.02;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      container.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);

      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [avatarUrl]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{ touchAction: "none" }}
      aria-label="3D Orbiting Universe with Profile Picture dead-center and orbiting WordPress, Elementor, WooCommerce, OpenAI, and PHP badges"
      role="img"
    >
      {/* Soft Vignette Gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(248, 247, 244, 0) 35%, rgba(248, 247, 244, 0.7) 80%, rgba(248, 247, 244, 0.98) 100%)",
        }}
      />

      {/* Floating 3D Orbit Indicator Pill */}
      <div
        className={`absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-10 transition-opacity duration-500 pointer-events-none ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md bg-white/80 border border-stone-200/90 shadow-sm text-stone-800">
          <span
            className={`w-2 h-2 rounded-full ${
              isInteracting ? "bg-emerald-500 animate-ping" : "bg-emerald-600 animate-pulse"
            }`}
          />
          <span>3D Orbiting Universe · Drag to rotate</span>
        </div>
      </div>
    </div>
  );
}
