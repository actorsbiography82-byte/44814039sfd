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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 35);

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

    // 2. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x285141, 2.5);
    dirLight1.position.set(20, 25, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x10b981, 1.8);
    dirLight2.position.set(-20, -15, -15);
    scene.add(dirLight2);

    const centerPointLight = new THREE.PointLight(0x10b981, 2.0, 30);
    centerPointLight.position.set(0, 0, 2);
    scene.add(centerPointLight);

    // 3. ROOT ORBIT GROUP
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    // Helper: Draw rounded badge background
    const drawBadgeBg = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      bg: string,
      border: string
    ) => {
      const r = 28;
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.roundRect(6, 6, w - 12, h - 12, r);
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.lineWidth = 10;
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

    // 4. SUBTLE ORBIT PATH RINGS (Tilted in 3D space around the upright avatar)
    const orbitRadiusX = 11.2;
    const orbitRadiusZ = 8.8;
    const orbitTiltX = 0.28; // ~16 deg tilt
    const orbitTiltZ = -0.10; // ~6 deg tilt

    const createOrbitRing = () => {
      const curve = new THREE.EllipseCurve(0, 0, orbitRadiusX, orbitRadiusZ, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(140);
      const geometry = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, 0, p.y))
      );
      const material = new THREE.LineDashedMaterial({
        color: 0x285141,
        dashSize: 0.8,
        gapSize: 0.5,
        transparent: true,
        opacity: 0.25,
      });
      const ringLine = new THREE.Line(geometry, material);
      ringLine.computeLineDistances();
      ringLine.rotation.x = orbitTiltX;
      ringLine.rotation.z = orbitTiltZ;
      return ringLine;
    };

    const createCounterRing = () => {
      const curve = new THREE.EllipseCurve(0, 0, orbitRadiusX * 1.08, orbitRadiusZ * 1.08, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(120);
      const geometry = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, 0, p.y))
      );
      const material = new THREE.LineDashedMaterial({
        color: 0x10b981,
        dashSize: 1.0,
        gapSize: 0.8,
        transparent: true,
        opacity: 0.15,
      });
      const ringLine = new THREE.Line(geometry, material);
      ringLine.computeLineDistances();
      ringLine.rotation.x = -0.22;
      ringLine.rotation.z = 0.18;
      return ringLine;
    };

    orbitGroup.add(createOrbitRing(), createCounterRing());

    // 5. 5 TECH BADGES (WordPress, Elementor, WooCommerce, OpenAI, PHP)
    // 1) WordPress 3D Badge
    const wpTexture = createCardCanvas(512, 512, (ctx) => {
      drawBadgeBg(ctx, 512, 512, "#ffffff", "#21759b");
      ctx.fillStyle = "#21759b";
      ctx.beginPath();
      ctx.arc(256, 230, 145, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 180px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("W", 256, 240);

      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 42px sans-serif";
      ctx.fillText("WordPress", 256, 445);
    });

    // 2) Elementor 3D Badge
    const elementorTexture = createCardCanvas(512, 512, (ctx) => {
      drawBadgeBg(ctx, 512, 512, "#ffffff", "#92003b");
      ctx.fillStyle = "#92003b";
      ctx.beginPath();
      ctx.arc(256, 230, 145, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      // Left vertical tall bar
      ctx.fillRect(180, 150, 26, 160);
      // Right 3 horizontal bars
      ctx.fillRect(225, 150, 105, 26);
      ctx.fillRect(225, 217, 105, 26);
      ctx.fillRect(225, 284, 105, 26);

      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 42px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Elementor Pro", 256, 445);
    });

    // 3) WooCommerce 3D Badge
    const wooTexture = createCardCanvas(512, 512, (ctx) => {
      drawBadgeBg(ctx, 512, 512, "#ffffff", "#96588a");
      ctx.fillStyle = "#96588a";
      ctx.beginPath();
      ctx.roundRect(148, 135, 216, 185, 22);
      ctx.fill();

      ctx.strokeStyle = "#96588a";
      ctx.lineWidth = 15;
      ctx.beginPath();
      ctx.arc(256, 135, 52, Math.PI, 0, false);
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "900 66px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Woo", 256, 245);

      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 40px sans-serif";
      ctx.fillText("WooCommerce", 256, 445);
    });

    // 4) OpenAI 3D Badge
    const openAiTexture = createCardCanvas(512, 512, (ctx) => {
      drawBadgeBg(ctx, 512, 512, "#0f172a", "#10a37f");
      ctx.save();
      ctx.translate(256, 225);
      ctx.strokeStyle = "#10a37f";
      ctx.lineWidth = 14;
      ctx.lineCap = "round";

      for (let i = 0; i < 6; i++) {
        ctx.rotate((Math.PI / 3) * i);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -68);
        ctx.stroke();

        ctx.fillStyle = "#10a37f";
        ctx.beginPath();
        ctx.arc(0, -78, 14, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      ctx.fillStyle = "#10a37f";
      ctx.font = "bold 42px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("OpenAI API", 256, 445);
    });

    // 5) PHP 8.3 3D Badge
    const phpTexture = createCardCanvas(512, 512, (ctx) => {
      drawBadgeBg(ctx, 512, 512, "#ffffff", "#4F5D95");
      ctx.fillStyle = "#4F5D95";
      ctx.beginPath();
      ctx.ellipse(256, 230, 150, 95, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "italic 900 86px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("php", 256, 230);

      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 42px sans-serif";
      ctx.fillText("PHP 8.3", 256, 445);
    });

    const createBadgeMesh = (frontTexture: THREE.Texture) => {
      const group = new THREE.Group();
      const width = 3.3;
      const height = 3.3;
      const depth = 0.4;

      const boxGeo = new THREE.BoxGeometry(width, height, depth);

      const sideMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.18,
        metalness: 0.25,
      });
      const frontMat = new THREE.MeshStandardMaterial({
        map: frontTexture,
        roughness: 0.15,
        metalness: 0.1,
      });
      const backMat = new THREE.MeshStandardMaterial({
        color: 0x141716,
        roughness: 0.35,
        metalness: 0.8,
      });

      const mesh = new THREE.Mesh(boxGeo, [
        sideMat, sideMat, sideMat, sideMat,
        frontMat, backMat,
      ]);
      group.add(mesh);

      // Back glowing plate
      const glowGeo = new THREE.PlaneGeometry(width * 1.15, height * 1.15);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      glowMesh.position.z = -0.28;
      group.add(glowMesh);

      return { group, mesh };
    };

    // Instantiate 5 orbiting tech nodes
    const techDefs = [
      { name: "WordPress", texture: wpTexture, offset: 0 },
      { name: "Elementor", texture: elementorTexture, offset: (2 * Math.PI) / 5 },
      { name: "WooCommerce", texture: wooTexture, offset: (4 * Math.PI) / 5 },
      { name: "OpenAI", texture: openAiTexture, offset: (6 * Math.PI) / 5 },
      { name: "PHP", texture: phpTexture, offset: (8 * Math.PI) / 5 },
    ];

    const orbitNodes = techDefs.map((def) => {
      const node = createBadgeMesh(def.texture);
      orbitGroup.add(node.group);
      return {
        ...node,
        name: def.name,
        offset: def.offset,
        baseScale: 1,
        floatSpeed: 1.5 + Math.random() * 0.8,
        floatOffset: Math.random() * Math.PI * 2,
      };
    });

    // 6. AMBIENT BACKGROUND GLOW DUST PARTICLES
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 35;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.28,
      transparent: true,
      opacity: 0.35,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 7. DRAG INTERACTION & PARALLAX (Scoped strictly to canvas container)
    let isDragging = false;
    let previousPointerX = 0;
    let targetRotationY = 0;
    let currentRotationY = 0;
    let mouseParallaxX = 0;
    let mouseParallaxY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      previousPointerX = clientX;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
      mouseParallaxX = normX;
      mouseParallaxY = normY;

      if (isDragging) {
        const deltaX = clientX - previousPointerX;
        targetRotationY += deltaX * 0.008;
        previousPointerX = clientX;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    container.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // 8. RESPONSIVE RESIZE
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      camera.aspect = w / h;

      if (w < 420) {
        camera.position.z = 38;
        orbitGroup.scale.set(0.85, 0.85, 0.85);
      } else if (w < 640) {
        camera.position.z = 36;
        orbitGroup.scale.set(0.92, 0.92, 0.92);
      } else {
        camera.position.z = 34.5;
        orbitGroup.scale.set(1.0, 1.0, 1.0);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);
    onResize();
    setIsLoaded(true);

    // 9. ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Inertia easing on the orbit group
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;
      orbitGroup.rotation.y = currentRotationY + mouseParallaxX * 0.08;
      orbitGroup.rotation.x = mouseParallaxY * 0.05;

      // Subtle particle float
      particleSystem.rotation.y = elapsedTime * 0.02;

      // Orbital Rotation Speed
      const orbitSpeed = prefersReducedMotion ? 0.05 : 0.35;
      const globalOrbitAngle = elapsedTime * orbitSpeed;

      orbitNodes.forEach((node) => {
        const angle = globalOrbitAngle + node.offset;

        // Elliptical position
        const px = Math.cos(angle) * orbitRadiusX;
        const pz = Math.sin(angle) * orbitRadiusZ;

        // Apply 3D orbit tilt
        const tiltedY = pz * Math.sin(orbitTiltX) + px * Math.sin(orbitTiltZ);
        const finalX = px * Math.cos(orbitTiltZ) - pz * Math.sin(orbitTiltX);
        const finalZ = pz * Math.cos(orbitTiltX) + px * Math.sin(orbitTiltZ);

        node.group.position.x = finalX;
        node.group.position.z = finalZ;
        // Individual vertical floating bob
        node.group.position.y = tiltedY + Math.sin(elapsedTime * node.floatSpeed + node.floatOffset) * 0.45;

        // Always face forward toward the viewer with subtle organic tilt
        node.group.rotation.x = -orbitGroup.rotation.x + Math.sin(elapsedTime * 1.8 + node.offset) * 0.08;
        node.group.rotation.y = -orbitGroup.rotation.y + Math.cos(elapsedTime * 1.5 + node.offset) * 0.08;
        node.group.rotation.z = Math.sin(elapsedTime + node.offset) * 0.04;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);

      container.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);

      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [avatarUrl]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
      title="Interactive 3D Tech Orbit · Drag to rotate"
      aria-label="3D Interactive Tech Orbit (WordPress, Elementor, WooCommerce, OpenAI, PHP)"
    />
  );
}
