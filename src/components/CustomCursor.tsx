import React, { useState, useEffect } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Check if device supports any hover, otherwise suppress custom cursor on touch devices
    const checkDevice = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
      setIsTouchDevice(isTouch);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isTouchDevice) {
      return () => {
        window.removeEventListener("resize", checkDevice);
      };
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const onMouseLeave = () => {
      setIsHidden(true);
    };

    const onMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button" ||
          target.classList.contains("cursor-pointer"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isTouchDevice]);

  // Trail speed factor interpolation
  useEffect(() => {
    if (isTouchDevice || isHidden) return;

    let animFrame: number;
    const updateTrail = () => {
      setTrailPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        const speed = 0.16; // smooth trail
        return {
          x: prev.x + dx * speed,
          y: prev.y + dy * speed,
        };
      });
      animFrame = requestAnimationFrame(updateTrail);
    };

    animFrame = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animFrame);
  }, [position, isTouchDevice, isHidden]);

  if (isTouchDevice || isHidden) return null;

  return (
    <>
      {/* Inner precise dot pointer */}
      <div
        id="custom-dot-pointer"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
        className={`fixed z-[9999] h-2 w-2 rounded-full pointer-events-none transition-all duration-75 bg-indigo-500 light:bg-indigo-600 ${
          isHovered ? "scale-[1.8] bg-cyan-400 light:bg-cyan-600 shadow-[0_0_8px_rgba(6,182,212,0.6)]" : ""
        }`}
      />
      {/* Outer follow ring pointer */}
      <div
        id="custom-ring-pointer"
        style={{
          left: `${trailPosition.x}px`,
          top: `${trailPosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
        className={`fixed z-[9998] h-8 w-8 rounded-full border border-indigo-400/30 light:border-indigo-600/30 pointer-events-none transition-transform duration-100 ease-out ${
          isHovered ? "scale-[1.5] border-cyan-400/40 bg-indigo-500/[0.04] light:border-cyan-600/40" : ""
        }`}
      />
    </>
  );
}
