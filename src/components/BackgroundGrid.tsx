import React, { useEffect, useRef } from "react";

interface WavePoint {
  x: number;
  y: number;
  baseY: number;
  angleY: number;
  angleSpeed: number;
  noiseOffset: number;
}

interface WaveLayer {
  points: WavePoint[];
  colorStart: { r: number; g: number; b: number };
  colorEnd: { r: number; g: number; b: number };
  opacity: number;
  amplitude: number;
  speed: number;
  flowSpeed: number;
  frequency: number;
  strokeWidth: number;
  gradientHeight: number;
  isForegroundHex: boolean;
  parallaxFactor: number; // multiplier for scroll parallax drift
}

export default function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, smoothX: -1000, smoothY: -1000 });
  const scrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse & smooth interpolation
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    // Track scroll for clean parallax drift
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Dynamic resize handler
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: entryWidth, height: entryHeight } = entry.contentRect;
        width = canvas.width = entryWidth;
        height = canvas.height = entryHeight;
        initWaves(entryWidth, entryHeight);
      }
    });

    resizeObserver.observe(canvas.parentElement || document.body);

    const NUM_POINTS = 13; // Higher control point density for micro-smooth curves
    let layers: WaveLayer[] = [];

    const initWaves = (canvasWidth: number, canvasHeight: number) => {
      layers = [
        // 1. BACKGROUND LAYER 1: Large slow-moving deep energy band
        {
          points: createPoints(NUM_POINTS, canvasWidth, canvasHeight * 0.62),
          colorStart: { r: 79, g: 70, b: 229 },  // Deep Indigo
          colorEnd: { r: 147, g: 51, b: 234 },   // Warm Purple
          opacity: 0.035,
          amplitude: 140,
          speed: 0.002,
          flowSpeed: 0.0018,
          frequency: 0.0005,
          strokeWidth: 1.0,
          gradientHeight: canvasHeight * 0.7,
          isForegroundHex: false,
          parallaxFactor: 0.32,
        },
        // 2. BACKGROUND LAYER 2: Swelling royal blue current
        {
          points: createPoints(NUM_POINTS, canvasWidth, canvasHeight * 0.52),
          colorStart: { r: 59, g: 130, b: 246 },  // Blue
          colorEnd: { r: 99, g: 102, b: 241 },   // Indigo
          opacity: 0.045,
          amplitude: 110,
          speed: 0.004,
          flowSpeed: -0.003,
          frequency: 0.0009,
          strokeWidth: 1.2,
          gradientHeight: canvasHeight * 0.55,
          isForegroundHex: false,
          parallaxFactor: 0.26,
        },
        // 3. MID ENERGY CHANNEL 3: Rich flowing center tide with moderate velocity
        {
          points: createPoints(NUM_POINTS, canvasWidth, canvasHeight * 0.42),
          colorStart: { r: 99, g: 102, b: 241 }, // Indigo
          colorEnd: { r: 6, g: 182, b: 212 },   // Turquoise Cyan
          opacity: 0.065,
          amplitude: 80,
          speed: 0.007,
          flowSpeed: 0.005,
          frequency: 0.0014,
          strokeWidth: 1.5,
          gradientHeight: canvasHeight * 0.45,
          isForegroundHex: false,
          parallaxFactor: 0.18,
        },
        // 4. ACCENT ENERGY CHANNEL 4: Soft Emerald to Cyan current
        {
          points: createPoints(NUM_POINTS, canvasWidth, canvasHeight * 0.33),
          colorStart: { r: 6, g: 182, b: 212 },  // Cyan
          colorEnd: { r: 16, g: 185, b: 129 },  // Emerald
          opacity: 0.04,
          amplitude: 55,
          speed: 0.009,
          flowSpeed: -0.007,
          frequency: 0.002,
          strokeWidth: 1.2,
          gradientHeight: canvasHeight * 0.35,
          isForegroundHex: false,
          parallaxFactor: 0.12,
        },
        // 5. FOREGROUND CROWN WAVE 5: Vibrant glowing crest carrying fuchsia highlights
        {
          points: createPoints(NUM_POINTS, canvasWidth, canvasHeight * 0.26),
          colorStart: { r: 6, g: 182, b: 212 },  // Cyan
          colorEnd: { r: 217, g: 70, b: 239 },  // Fuchsia Peak
          opacity: 0.10,
          amplitude: 40,
          speed: 0.012,
          flowSpeed: 0.0095,
          frequency: 0.0027,
          strokeWidth: 2.2,
          gradientHeight: canvasHeight * 0.3,
          isForegroundHex: true,
          parallaxFactor: 0.06,
        },
      ];
    };

    const createPoints = (num: number, limitWidth: number, baseLineY: number): WavePoint[] => {
      const arr: WavePoint[] = [];
      const segmentWidth = limitWidth / (num - 1);
      for (let i = 0; i < num; i++) {
        arr.push({
          x: i * segmentWidth,
          y: baseLineY,
          baseY: baseLineY,
          angleY: i * (Math.PI / 3) + Math.random() * 1.5,
          angleSpeed: 0.01 + Math.random() * 0.015,
          noiseOffset: Math.random() * 200,
        });
      }
      return arr;
    };

    initWaves(width, height);

    let time = 0;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.8;

      // Mouse tracking interpolation
      const mouse = mouseRef.current;
      if (mouse.x !== -1000) {
        if (mouse.smoothX === -1000) {
          mouse.smoothX = mouse.x;
          mouse.smoothY = mouse.y;
        } else {
          mouse.smoothX += (mouse.x - mouse.smoothX) * 0.06;
          mouse.smoothY += (mouse.y - mouse.smoothY) * 0.06;
        }
      } else {
        mouse.smoothX = -1000;
        mouse.smoothY = -1000;
      }

      const isLightMode = document.documentElement.classList.contains("light");
      canvas.style.mixBlendMode = isLightMode ? "multiply" : "screen";

      // 1. DYNAMIC HORIZONTAL AURORA BOREALIS LIGHT CURTAINS
      // We render 3 giant fluid bands of light that move slowly across the background
      ctx.save();
      const auroraCurtains = [
        // Lavender & Indigo curtain
        {
          startY: height * 0.12,
          endY: height * 0.58,
          speedX: 0.0004,
          speedY: 0.0003,
          colorStart: isLightMode ? "rgba(99, 102, 241, 0.04)" : "rgba(124, 58, 237, 0.14)",
          colorMid: isLightMode ? "rgba(147, 51, 234, 0.02)" : "rgba(79, 70, 229, 0.06)",
          freq: 0.0006,
          phaseShift: 0.0
        },
        // Aurora Cyan & Green current
        {
          startY: height * 0.18,
          endY: height * 0.52,
          speedX: 0.0006,
          speedY: 0.0005,
          colorStart: isLightMode ? "rgba(6, 182, 212, 0.03)" : "rgba(6, 182, 212, 0.10)",
          colorMid: isLightMode ? "rgba(16, 185, 129, 0.01)" : "rgba(59, 130, 246, 0.04)",
          freq: 0.0008,
          phaseShift: 2.2
        },
        // Fuchsia Cosmic wind
        {
          startY: height * 0.08,
          endY: height * 0.62,
          speedX: 0.0003,
          speedY: 0.0002,
          colorStart: isLightMode ? "rgba(236, 72, 153, 0.02)" : "rgba(217, 70, 239, 0.07)",
          colorMid: isLightMode ? "rgba(99, 102, 241, 0.01)" : "rgba(79, 70, 229, 0.04)",
          freq: 0.0004,
          phaseShift: 4.5
        }
      ];

      auroraCurtains.forEach((curtain) => {
        ctx.globalCompositeOperation = isLightMode ? "multiply" : "screen";
        
        // Horizontal wave displacement
        const grad = ctx.createLinearGradient(0, curtain.startY - (scrollYRef.current * 0.4), 0, curtain.endY - (scrollYRef.current * 0.4));
        grad.addColorStop(0, "rgba(0, 0, 0, 0)");
        grad.addColorStop(0.35, curtain.colorStart);
        grad.addColorStop(0.7, curtain.colorMid);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();

        const segments = 12;
        const xStep = width / (segments - 1);
        
        // Trace top flowing coordinate ribbon line
        for (let i = 0; i < segments; i++) {
          const sx = i * xStep;
          // Calculate high-fidelity sine wave equation for soft wind ripple
          const windAngle = (time * curtain.speedX) + (sx * curtain.freq) + curtain.phaseShift;
          const verticalDisplacement = Math.sin(windAngle) * 55 + Math.cos(time * 0.007 + i * 0.5) * 15;
          const sy = curtain.startY + verticalDisplacement - (scrollYRef.current * 0.3); // add faint scroll parallax

          if (i === 0) {
            ctx.moveTo(sx, sy);
          } else {
            const prevX = (i - 1) * xStep;
            const prevWindAngle = (time * curtain.speedX) + (prevX * curtain.freq) + curtain.phaseShift;
            const prevY = curtain.startY + (Math.sin(prevWindAngle) * 55 + Math.cos(time * 0.007 + (i - 1) * 0.5) * 15) - (scrollYRef.current * 0.3);
            ctx.quadraticCurveTo(prevX, prevY, (prevX + sx) / 2, (prevY + sy) / 2);
          }
        }

        // Clip outline down to complete filled gaseous polygons
        ctx.lineTo(width, curtain.endY - (scrollYRef.current * 0.3));
        ctx.lineTo(0, curtain.endY - (scrollYRef.current * 0.3));
        ctx.closePath();
        ctx.fill();
      });
      ctx.restore();

      // 2. RENDER HERO AREA SOFT IMMERSIVE MULTI-LAYERED CLOUD SYSTEM (3x-4x LARGER)
      const centerX = width / 2;
      const centerY = height * 0.35 - (scrollYRef.current * 0.45); // Parallax compensation so it rolls elegantly
      const isMobile = width < 768;
      const glowScale = isMobile ? 0.75 : 1.25;

      // Soft mouse interaction offsets for the clouds to create a physical sense of deep atmosphere
      let mouseOffsetCloudX = 0;
      let mouseOffsetCloudY = 0;
      if (mouse.smoothX !== -1000) {
        mouseOffsetCloudX = (mouse.smoothX - width / 2) * 0.04;
        mouseOffsetCloudY = (mouse.smoothY - height * 0.35) * 0.04;
      }

      // CLOUD 1: Deep Indigo Cosmic Foundation (Enormous, 3-4x name width)
      const cloud1Width = (900 + Math.sin(time * 0.004) * 80) * glowScale;
      const cloud1Height = (550 + Math.cos(time * 0.003) * 50) * glowScale;
      const cloud1X = centerX + mouseOffsetCloudX + Math.sin(time * 0.002) * 30;
      const cloud1Y = centerY + mouseOffsetCloudY + Math.cos(time * 0.003) * 20;

      const cloud1Grad = ctx.createRadialGradient(
        cloud1X, cloud1Y, 0,
        cloud1X, cloud1Y, cloud1Width
      );
      if (isLightMode) {
        cloud1Grad.addColorStop(0, "rgba(99, 102, 241, 0.085)"); // Soft rich Indigo
        cloud1Grad.addColorStop(0.5, "rgba(99, 102, 241, 0.03)");
        cloud1Grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      } else {
        cloud1Grad.addColorStop(0, "rgba(79, 70, 229, 0.17)");  // Cosmic Indigo
        cloud1Grad.addColorStop(0.45, "rgba(79, 70, 229, 0.06)");
        cloud1Grad.addColorStop(0.8, "rgba(79, 70, 229, 0.01)");
        cloud1Grad.addColorStop(1, "rgba(5, 8, 22, 0)");
      }
      ctx.fillStyle = cloud1Grad;
      ctx.beginPath();
      ctx.ellipse(cloud1X, cloud1Y, cloud1Width, cloud1Height, Math.PI / 12, 0, Math.PI * 2);
      ctx.fill();

      // CLOUD 2: Majestic Violet & Warm Purple Cluster (Asymmetrical, offset to left)
      const cloud2Width = (750 + Math.cos(time * 0.005) * 60) * glowScale;
      const cloud2Height = (480 + Math.sin(time * 0.004) * 40) * glowScale;
      const cloud2X = centerX - 120 + mouseOffsetCloudX * 1.2 + Math.cos(time * 0.003) * 40;
      const cloud2Y = centerY + 40 + mouseOffsetCloudY * 1.2 + Math.sin(time * 0.002) * 25;

      const cloud2Grad = ctx.createRadialGradient(
        cloud2X, cloud2Y, 0,
        cloud2X, cloud2Y, cloud2Width
      );
      if (isLightMode) {
        cloud2Grad.addColorStop(0, "rgba(147, 51, 234, 0.06)"); // Elegant Purple
        cloud2Grad.addColorStop(0.6, "rgba(147, 51, 234, 0.015)");
        cloud2Grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      } else {
        cloud2Grad.addColorStop(0, "rgba(124, 58, 237, 0.14)"); // Vivid Violet Deep Light
        cloud2Grad.addColorStop(0.4, "rgba(147, 51, 234, 0.045)");
        cloud2Grad.addColorStop(1, "rgba(5, 8, 22, 0)");
      }
      ctx.fillStyle = cloud2Grad;
      ctx.beginPath();
      ctx.ellipse(cloud2X, cloud2Y, cloud2Width, cloud2Height, -Math.PI / 8, 0, Math.PI * 2);
      ctx.fill();

      // CLOUD 3: Digital Cyan/Blue Ribbon Flare (Focused horizontal flow, offset to right)
      const cloud3Width = (800 + Math.sin(time * 0.007) * 70) * glowScale;
      const cloud3Height = (350 + Math.cos(time * 0.005) * 35) * glowScale;
      const cloud3X = centerX + 150 + mouseOffsetCloudX * 0.8 + Math.sin(time * 0.004) * 35;
      const cloud3Y = centerY - 60 + mouseOffsetCloudY * 0.8 + Math.cos(time * 0.003) * 30;

      const cloud3Grad = ctx.createRadialGradient(
        cloud3X, cloud3Y, 0,
        cloud3X, cloud3Y, cloud3Width
      );
      if (isLightMode) {
        cloud3Grad.addColorStop(0, "rgba(6, 182, 212, 0.055)");  // Gentle Cyan
        cloud3Grad.addColorStop(0.5, "rgba(6, 182, 212, 0.015)");
        cloud3Grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      } else {
        cloud3Grad.addColorStop(0, "rgba(6, 182, 212, 0.11)");   // Pure Cyan energy
        cloud3Grad.addColorStop(0.35, "rgba(59, 130, 246, 0.04)"); // Royal Blue diffuse
        cloud3Grad.addColorStop(1, "rgba(5, 8, 22, 0)");
      }
      ctx.fillStyle = cloud3Grad;
      ctx.beginPath();
      ctx.ellipse(cloud3X, cloud3Y, cloud3Width, cloud3Height, Math.PI / 18, 0, Math.PI * 2);
      ctx.fill();

      // Overlapping Volumetric glow filter between the wave heights (enhanced to match new deeper palette)
      const overlapGlowY = height * 0.45 - (scrollYRef.current * 0.2);
      const overlapGrad = ctx.createRadialGradient(centerX, overlapGlowY, 50, centerX, overlapGlowY, 450);
      if (isLightMode) {
        overlapGrad.addColorStop(0, "rgba(6, 182, 212, 0.045)");
        overlapGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      } else {
        overlapGrad.addColorStop(0, "rgba(6, 182, 212, 0.085)");
        overlapGrad.addColorStop(0.4, "rgba(147, 51, 234, 0.03)");
        overlapGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      }
      ctx.fillStyle = overlapGrad;
      ctx.beginPath();
      ctx.arc(centerX, overlapGlowY, 450, 0, Math.PI * 2);
      ctx.fill();

      // 3. DRAW AND ANIMATE THE 5 DISTINCT WAVE ENERGY LAYERS
      layers.forEach((layer) => {
        const points = layer.points;

        // Apply scroll-parallax modifier dynamically
        const parallaxOffsetY = scrollYRef.current * layer.parallaxFactor;

        points.forEach((pt, idx) => {
          // Math-driven fluid motion parameters (combines coordinates & temporal clock)
          const travelPhase = (time * layer.speed) + (pt.x * layer.frequency) + pt.angleY;
          const slowDriftPhase = (time * layer.flowSpeed) + (pt.x * (layer.frequency * 0.65));

          const pathSine = Math.sin(travelPhase) * layer.amplitude;
          const driftSine = Math.cos(slowDriftPhase) * (layer.amplitude * 0.28);
          
          // Base coordinate minus the parallax drift
          let targetY = pt.baseY + pathSine + driftSine - parallaxOffsetY;

          // Subtle magnetic cursor interactive displacement
          if (mouse.smoothX !== -1000) {
            const dx = pt.x - mouse.smoothX;
            const dy = targetY - mouse.smoothY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 350;

            if (dist < radius) {
              const strength = 1 - dist / radius;
              const t = strength * strength * (3 - 2 * strength);
              const pullAmount = 35 * t; // subtle response displacement
              
              targetY += (mouse.smoothY > targetY ? pullAmount : -pullAmount);
            }
          }

          // Inertia damping
          pt.y += (targetY - pt.y) * 0.095;
        });

        const startPt = points[0];
        
        // Build smooth quadratic path
        const curvePath = new Path2D();
        curvePath.moveTo(startPt.x, startPt.y);

        for (let i = 0; i < points.length - 1; i++) {
          const curr = points[i];
          const next = points[i + 1];
          const midX = (curr.x + next.x) / 2;
          const midY = (curr.y + next.y) / 2;
          curvePath.quadraticCurveTo(curr.x, curr.y, midX, midY);
        }
        
        const lastPt = points[points.length - 1];
        curvePath.lineTo(width, lastPt.y);

        // Fill region under the curve line
        const fillPath = new Path2D(curvePath);
        fillPath.lineTo(width, height);
        fillPath.lineTo(0, height);
        fillPath.closePath();

        const fillGradient = ctx.createLinearGradient(0, lastPt.y - 150, 0, lastPt.y + layer.gradientHeight);
        const intensityShift = isLightMode ? 0.3 : 1.0;

        fillGradient.addColorStop(
          0,
          `rgba(${layer.colorStart.r}, ${layer.colorStart.g}, ${layer.colorStart.b}, ${layer.opacity * intensityShift})`
        );
        fillGradient.addColorStop(
          0.4,
          `rgba(${layer.colorEnd.r}, ${layer.colorEnd.g}, ${layer.colorEnd.b}, ${layer.opacity * 0.4 * intensityShift})`
        );
        fillGradient.addColorStop(
          1,
          `rgba(${layer.colorStart.r}, ${layer.colorStart.g}, ${layer.colorStart.b}, 0)`
        );

        ctx.fillStyle = fillGradient;
        ctx.fill(fillPath);

        // Multi-spectral trace contour lines
        const strokeGrad = ctx.createLinearGradient(0, 0, width, 0);
        strokeGrad.addColorStop(0, `rgba(${layer.colorStart.r}, ${layer.colorStart.g}, ${layer.colorStart.b}, 0)`);
        
        // Custom neon glow highlights for foreground crests
        const edgeAlpha = layer.isForegroundHex 
          ? (isLightMode ? 0.22 : 0.45) 
          : (isLightMode ? 0.14 : 0.26);

        strokeGrad.addColorStop(0.3, `rgba(${layer.colorStart.r}, ${layer.colorStart.g}, ${layer.colorStart.b}, ${edgeAlpha})`);
        strokeGrad.addColorStop(0.7, `rgba(${layer.colorEnd.r}, ${layer.colorEnd.g}, ${layer.colorEnd.b}, ${edgeAlpha})`);
        strokeGrad.addColorStop(1, `rgba(${layer.colorEnd.r}, ${layer.colorEnd.g}, ${layer.colorEnd.b}, 0)`);

        ctx.strokeStyle = strokeGrad;
        ctx.lineWidth = layer.strokeWidth;

        if (layer.isForegroundHex && !isLightMode) {
          ctx.shadowColor = `rgb(${layer.colorStart.r}, ${layer.colorStart.g}, ${layer.colorStart.b})`;
          ctx.shadowBlur = 12;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.stroke(curvePath);
        ctx.shadowBlur = 0; // reset
      });

      // 4. AMBIENT ATMOSPHERIC FOG SHIELD (Smooth transitions)
      const topFog = ctx.createLinearGradient(0, 0, 0, 180);
      if (isLightMode) {
        topFog.addColorStop(0, "rgba(255, 255, 255, 0.45)");
        topFog.addColorStop(1, "rgba(255, 255, 255, 0)");
      } else {
        topFog.addColorStop(0, "rgba(5, 8, 22, 0.65)");
        topFog.addColorStop(1, "rgba(5, 8, 22, 0)");
      }
      ctx.fillStyle = topFog;
      ctx.fillRect(0, 0, width, 180);

      const bottomFogHeight = 220;
      const bottomFog = ctx.createLinearGradient(0, height - bottomFogHeight, 0, height);
      if (isLightMode) {
        bottomFog.addColorStop(0, "rgba(255, 255, 255, 0)");
        bottomFog.addColorStop(1, "rgba(248, 250, 252, 1.0)");
      } else {
        bottomFog.addColorStop(0, "rgba(5, 8, 22, 0)");
        bottomFog.addColorStop(1, "rgba(5, 8, 22, 1.0)");
      }
      ctx.fillStyle = bottomFog;
      ctx.fillRect(0, height - bottomFogHeight, width, bottomFogHeight);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Root dark color theme matches perfectly the interstellar black */}
      <div className="absolute inset-0 bg-[#050816] transition-colors duration-450 light:bg-slate-50" />
      
      {/* Interactive energetic stream canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 block w-full h-full"
      />
    </div>
  );
}
