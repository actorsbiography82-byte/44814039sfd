"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Hero3DCanvasProps {
  avatarUrl?: string;
}

export function Hero3DCanvas({
  avatarUrl = "https://zeeshan-snowy.vercel.app/wp-content/uploads/2026/08/e081a0e1-79db-4081-ba5f-0b153db2e6c4.png",
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
    scene.fog = new THREE.FogExp2(0xf8f7f4, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 36);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x285141, 2.5);
    dirLight1.position.set(20, 30, 25);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x10b981, 1.8);
    dirLight2.position.set(-25, -15, -20);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x285141, 3, 50);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // ROOT OBJECT TO ROTATE WITH USER DRAG / INERTIA
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // ==========================================
    // 1. CENTRAL FOCAL POINT (Glowing Tech Core)
    // ==========================================
    const coreGroup = new THREE.Group();
    worldGroup.add(coreGroup);

    // Outer Geodesic Icosahedron Wireframe
    const icoGeo = new THREE.IcosahedronGeometry(3.2, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x285141,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.45,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icoMesh);

    // Inner Glowing Core Sphere
    const sphereGeo = new THREE.SphereGeometry(2.0, 32, 32);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e3e32,
      emissive: 0x285141,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.6,
      thickness: 1.2,
      transparent: true,
      opacity: 0.85,
    });
    const coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
    coreGroup.add(coreSphere);

    // Core Pulse Rings
    const ringGeo = new THREE.RingGeometry(3.6, 3.75, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x285141,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const coreRingX = new THREE.Mesh(ringGeo, ringMat);
    coreRingX.rotation.x = Math.PI / 2;
    coreGroup.add(coreRingX);

    const coreRingY = new THREE.Mesh(ringGeo, ringMat.clone());
    coreRingY.rotation.y = Math.PI / 2;
    coreGroup.add(coreRingY);

    // ==========================================
    // 2. ORBITAL PATH RINGS
    // ==========================================
    const createOrbitLine = (radiusX: number, radiusZ: number, tiltX: number, tiltZ: number) => {
      const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusZ, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(120);
      const geometry = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, 0, p.y))
      );
      const material = new THREE.LineDashedMaterial({
        color: 0x285141,
        dashSize: 0.8,
        gapSize: 0.4,
        transparent: true,
        opacity: 0.22,
      });
      const line = new THREE.Line(geometry, material);
      line.computeLineDistances();
      line.rotation.x = tiltX;
      line.rotation.z = tiltZ;
      return line;
    };

    const orbit1 = createOrbitLine(12, 10, 0.25, -0.15);
    const orbit2 = createOrbitLine(16, 14, -0.3, 0.2);
    const orbit3 = createOrbitLine(20, 18, 0.15, 0.35);
    worldGroup.add(orbit1, orbit2, orbit3);

    // ==========================================
    // 3. TEXTURE CREATORS FOR 3D NODES
    // ==========================================
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
      ctx.lineWidth = 6;
      ctx.stroke();
    };

    // 1) WordPress Logo Texture
    const wpTexture = createCardCanvas(512, 512, (ctx) => {
      drawBadgeBg(ctx, 512, 512, "#ffffff", "#21759b");
      // WordPress Blue Circle
      ctx.fillStyle = "#21759b";
      ctx.beginPath();
      ctx.arc(256, 256, 180, 0, Math.PI * 2);
      ctx.fill();

      // Inner WP W Vector Path
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 230px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("W", 256, 268);

      // Sub-label
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 32px sans-serif";
      ctx.fillText("WordPress Core", 256, 460);
    });

    // 2) OpenAI / AI Node Texture
    const aiTexture = createCardCanvas(512, 512, (ctx) => {
      drawBadgeBg(ctx, 512, 512, "#0f172a", "#10b981");

      // Draw stylized neural / AI star symbol
      ctx.save();
      ctx.translate(256, 230);
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 14;
      ctx.lineCap = "round";
      for (let i = 0; i < 6; i++) {
        ctx.rotate(Math.PI / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -110);
        ctx.stroke();

        ctx.fillStyle = "#34d399";
        ctx.beginPath();
        ctx.arc(0, -110, 18, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(0, 0, 36, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = "#f8fafc";
      ctx.font = "bold 36px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("OpenAI & Neural API", 256, 440);
    });

    // 3) Claude / Anthropic AI Sparkle Texture
    const claudeTexture = createCardCanvas(512, 512, (ctx) => {
      drawBadgeBg(ctx, 512, 512, "#faf8f5", "#d97706");

      ctx.save();
      ctx.translate(256, 230);
      // Sparkle Star Shape
      ctx.fillStyle = "#d97706";
      ctx.beginPath();
      ctx.moveTo(0, -120);
      ctx.quadraticCurveTo(0, 0, 120, 0);
      ctx.quadraticCurveTo(0, 0, 0, 120);
      ctx.quadraticCurveTo(0, 0, -120, 0);
      ctx.quadraticCurveTo(0, 0, 0, -120);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = "#292524";
      ctx.font = "bold 34px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("AI Automation", 256, 440);
    });

    // 4) Next.js / TypeScript Modern Stack Texture
    const nextTexture = createCardCanvas(512, 512, (ctx) => {
      drawBadgeBg(ctx, 512, 512, "#000000", "#ffffff");

      ctx.fillStyle = "#ffffff";
      ctx.font = "900 130px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("NEXT", 256, 220);

      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 36px monospace";
      ctx.fillText("TypeScript + React 19", 256, 330);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "bold 28px sans-serif";
      ctx.fillText("High-Performance UX", 256, 440);
    });

    // 5) WooCommerce / E-Commerce Texture
    const wooTexture = createCardCanvas(512, 512, (ctx) => {
      drawBadgeBg(ctx, 512, 512, "#ffffff", "#96588a");

      // Shopping Cart / Woo Purple Bag
      ctx.fillStyle = "#96588a";
      ctx.beginPath();
      ctx.roundRect(140, 140, 232, 200, 20);
      ctx.fill();

      // Handle
      ctx.strokeStyle = "#96588a";
      ctx.lineWidth = 18;
      ctx.beginPath();
      ctx.arc(256, 140, 60, Math.PI, 0, false);
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "900 70px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Woo", 256, 260);

      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 34px sans-serif";
      ctx.fillText("WooCommerce", 256, 440);
    });

    // 6) Profile Avatar Texture (with live dynamic image loading)
    const avatarCanvas = document.createElement("canvas");
    avatarCanvas.width = 512;
    avatarCanvas.height = 512;
    const avatarCtx = avatarCanvas.getContext("2d")!;
    drawBadgeBg(avatarCtx, 512, 512, "#ffffff", "#285141");

    avatarCtx.fillStyle = "#285141";
    avatarCtx.beginPath();
    avatarCtx.arc(256, 230, 150, 0, Math.PI * 2);
    avatarCtx.fill();

    avatarCtx.fillStyle = "#ffffff";
    avatarCtx.font = "bold 120px sans-serif";
    avatarCtx.textAlign = "center";
    avatarCtx.textBaseline = "middle";
    avatarCtx.fillText("ZM", 256, 230);

    avatarCtx.fillStyle = "#141716";
    avatarCtx.font = "bold 34px sans-serif";
    avatarCtx.fillText("Zeeshan · Specialist", 256, 440);

    const avatarTexture = new THREE.CanvasTexture(avatarCanvas);
    avatarTexture.colorSpace = THREE.SRGBColorSpace;

    // Load actual profile image into avatar texture
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = avatarUrl;
    img.onload = () => {
      avatarCtx.clearRect(0, 0, 512, 512);
      drawBadgeBg(avatarCtx, 512, 512, "#ffffff", "#285141");

      avatarCtx.save();
      avatarCtx.beginPath();
      avatarCtx.arc(256, 220, 150, 0, Math.PI * 2);
      avatarCtx.clip();
      avatarCtx.drawImage(img, 106, 70, 300, 300);
      avatarCtx.restore();

      // Border ring around avatar
      avatarCtx.strokeStyle = "#285141";
      avatarCtx.lineWidth = 8;
      avatarCtx.beginPath();
      avatarCtx.arc(256, 220, 150, 0, Math.PI * 2);
      avatarCtx.stroke();

      // Online status dot
      avatarCtx.fillStyle = "#10b981";
      avatarCtx.beginPath();
      avatarCtx.arc(360, 320, 22, 0, Math.PI * 2);
      avatarCtx.fill();
      avatarCtx.strokeStyle = "#ffffff";
      avatarCtx.lineWidth = 6;
      avatarCtx.stroke();

      // Caption
      avatarCtx.fillStyle = "#141716";
      avatarCtx.font = "bold 34px sans-serif";
      avatarCtx.textAlign = "center";
      avatarCtx.fillText("Zeeshan · Engineer", 256, 440);

      avatarTexture.needsUpdate = true;
    };

    // ==========================================
    // 4. CREATE 3D BADGE MESHES
    // ==========================================
    const createBadgeMesh = (
      texture: THREE.CanvasTexture,
      width = 4.2,
      height = 4.2,
      depth = 0.4
    ) => {
      const badgeGroup = new THREE.Group();

      // Card Body
      const boxGeo = new THREE.BoxGeometry(width, height, depth);
      const materials = [
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3, metalness: 0.4 }), // right
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3, metalness: 0.4 }), // left
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3, metalness: 0.4 }), // top
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3, metalness: 0.4 }), // bottom
        new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.2,
          metalness: 0.1,
        }), // front
        new THREE.MeshStandardMaterial({
          color: 0x285141,
          roughness: 0.2,
          metalness: 0.7,
        }), // back
      ];

      const mesh = new THREE.Mesh(boxGeo, materials);
      badgeGroup.add(mesh);

      // Subtle Glowing Halo Plane behind card
      const haloGeo = new THREE.PlaneGeometry(width * 1.25, height * 1.25);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0x285141,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.z = -depth * 0.6;
      badgeGroup.add(halo);

      return badgeGroup;
    };

    // DEFINING THE 6 ORBITING OBJECTS
    interface OrbitingNode {
      group: THREE.Group;
      radiusX: number;
      radiusZ: number;
      speed: number;
      offsetAngle: number;
      tiltX: number;
      tiltZ: number;
      yAmplitude: number;
      ySpeed: number;
      baseScale: number;
    }

    const nodeAvatar = createBadgeMesh(avatarTexture, 5.0, 5.0, 0.45);
    const nodeWordPress = createBadgeMesh(wpTexture, 4.2, 4.2, 0.35);
    const nodeOpenAI = createBadgeMesh(aiTexture, 4.2, 4.2, 0.35);
    const nodeClaude = createBadgeMesh(claudeTexture, 3.8, 3.8, 0.3);
    const nodeNext = createBadgeMesh(nextTexture, 4.2, 4.2, 0.35);
    const nodeWoo = createBadgeMesh(wooTexture, 3.8, 3.8, 0.3);

    worldGroup.add(nodeAvatar, nodeWordPress, nodeOpenAI, nodeClaude, nodeNext, nodeWoo);

    const orbitingNodes: OrbitingNode[] = [
      {
        group: nodeAvatar,
        radiusX: 13,
        radiusZ: 10.5,
        speed: 0.45,
        offsetAngle: 0,
        tiltX: 0.2,
        tiltZ: -0.15,
        yAmplitude: 1.8,
        ySpeed: 1.2,
        baseScale: 1.0,
      },
      {
        group: nodeWordPress,
        radiusX: 16.5,
        radiusZ: 13.5,
        speed: 0.38,
        offsetAngle: (Math.PI * 2) / 6,
        tiltX: -0.25,
        tiltZ: 0.2,
        yAmplitude: 2.2,
        ySpeed: 1.4,
        baseScale: 0.95,
      },
      {
        group: nodeOpenAI,
        radiusX: 12.5,
        radiusZ: 11,
        speed: 0.42,
        offsetAngle: (Math.PI * 4) / 6,
        tiltX: 0.3,
        tiltZ: -0.2,
        yAmplitude: 1.5,
        ySpeed: 1.1,
        baseScale: 0.95,
      },
      {
        group: nodeClaude,
        radiusX: 18.5,
        radiusZ: 15,
        speed: 0.32,
        offsetAngle: (Math.PI * 6) / 6,
        tiltX: -0.18,
        tiltZ: 0.3,
        yAmplitude: 2.0,
        ySpeed: 1.3,
        baseScale: 0.9,
      },
      {
        group: nodeNext,
        radiusX: 14.5,
        radiusZ: 12,
        speed: 0.4,
        offsetAngle: (Math.PI * 8) / 6,
        tiltX: 0.15,
        tiltZ: -0.25,
        yAmplitude: 1.6,
        ySpeed: 1.5,
        baseScale: 0.92,
      },
      {
        group: nodeWoo,
        radiusX: 17.5,
        radiusZ: 14,
        speed: 0.35,
        offsetAngle: (Math.PI * 10) / 6,
        tiltX: -0.22,
        tiltZ: 0.18,
        yAmplitude: 2.4,
        ySpeed: 1.0,
        baseScale: 0.9,
      },
    ];

    // ==========================================
    // 5. AMBIENT PARTICLES (Starfield Constellation)
    // ==========================================
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      particlePos[idx] = (Math.random() - 0.5) * 80;
      particlePos[idx + 1] = (Math.random() - 0.5) * 60;
      particlePos[idx + 2] = (Math.random() - 0.5) * 70;

      // Color palette: sage green, soft gold, neutral
      const c = new THREE.Color(
        i % 3 === 0 ? 0x285141 : i % 3 === 1 ? 0x10b981 : 0xd1d5db
      );
      particleColors[idx] = c.r;
      particleColors[idx + 1] = c.g;
      particleColors[idx + 2] = c.b;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particles);

    // ==========================================
    // 6. INTERACTIVE DRAG & MOUSE PARALLAX
    // ==========================================
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
      mouseParallaxX = nx * 1.5;
      mouseParallaxY = ny * 1.0;

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

    // ==========================================
    // 7. RESPONSIVE RESIZE
    // ==========================================
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;

      // Adjust camera distance for mobile vs desktop
      if (w < 640) {
        camera.position.z = 46;
        camera.position.y = 5;
      } else if (w < 1024) {
        camera.position.z = 40;
        camera.position.y = 7;
      } else {
        camera.position.z = 36;
        camera.position.y = 8;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);
    onResize();
    setIsLoaded(true);

    // ==========================================
    // 8. ANIMATION LOOP
    // ==========================================
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Inertia Easing for world rotation
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;

      worldGroup.rotation.x = currentRotationX + mouseParallaxY * 0.08;
      worldGroup.rotation.y = currentRotationY + mouseParallaxX * 0.12;

      // Central core subtle spin
      icoMesh.rotation.x += delta * 0.2;
      icoMesh.rotation.y += delta * 0.3;
      coreSphere.rotation.y -= delta * 0.15;
      coreRingX.rotation.z += delta * 0.25;
      coreRingY.rotation.x += delta * 0.2;

      // Central core gentle breathing pulse
      const pulse = 1 + Math.sin(elapsedTime * 2.0) * 0.04;
      coreGroup.scale.set(pulse, pulse, pulse);

      // Auto-orbiting nodes
      const speedMultiplier = prefersReducedMotion ? 0.05 : 0.6;
      const globalOrbitAngle = elapsedTime * speedMultiplier;

      orbitingNodes.forEach((node, index) => {
        const angle = globalOrbitAngle * node.speed + node.offsetAngle;

        // Position on 2D ellipse
        const px = Math.cos(angle) * node.radiusX;
        const pz = Math.sin(angle) * node.radiusZ;

        // Rotate by tilt angles
        const tiltedY =
          Math.sin(elapsedTime * node.ySpeed + index) * node.yAmplitude +
          pz * Math.sin(node.tiltX) +
          px * Math.sin(node.tiltZ);

        node.group.position.x = px * Math.cos(node.tiltZ) - pz * Math.sin(node.tiltX);
        node.group.position.z = pz * Math.cos(node.tiltX) + px * Math.sin(node.tiltZ);
        node.group.position.y = tiltedY;

        // Always face toward the camera (Billboard effect) with subtle bobbing
        node.group.quaternion.copy(camera.quaternion);

        // Subtle dynamic floating rotation
        node.group.rotateZ(Math.sin(elapsedTime * 1.5 + index) * 0.08);

        // Depth-based scale and opacity enhancement
        const distToCam = node.group.position.distanceTo(camera.position);
        const dynamicScale = Math.max(0.65, Math.min(1.25, 36 / distToCam)) * node.baseScale;
        node.group.scale.set(dynamicScale, dynamicScale, dynamicScale);
      });

      // Slowly rotate particle field
      particles.rotation.y += delta * 0.03;

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
      aria-label="Interactive 3D Universe canvas featuring floating WordPress, AI and developer nodes"
      role="img"
    >
      {/* Subtle overlay gradient vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-radial-vignette opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(248, 247, 244, 0) 30%, rgba(248, 247, 244, 0.75) 80%, rgba(248, 247, 244, 0.98) 100%)",
        }}
      />

      {/* Floating Interactive 3D Canvas Hint Badge */}
      <div
        className={`absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-10 transition-opacity duration-500 pointer-events-none ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md bg-white/80 border border-black/10 shadow-sm text-zinc-800">
          <span
            className={`w-2 h-2 rounded-full ${
              isInteracting ? "bg-emerald-500 animate-ping" : "bg-emerald-600 animate-pulse"
            }`}
          />
          <span>3D Interactive Universe · Drag to rotate</span>
        </div>
      </div>
    </div>
  );
}

