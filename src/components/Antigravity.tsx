"use client";

import React, { useEffect, useRef } from "react";

interface AntigravityProps {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  autoAnimate?: boolean;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  particleShape?: "circle" | "square" | "capsule";
  fieldStrength?: number;
}

export default function Antigravity({
  count = 300,
  color = "#8AAF93",
  particleSize = 1.5,
  particleShape = "capsule",
  waveSpeed = 0.4,
  fieldStrength = 10,
  autoAnimate = true,
  pulseSpeed = 3,
  magnetRadius = 6,
  lerpSpeed = 0.05,
}: AntigravityProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: any[] = [];
    
    // Convert hex to rgb for opacity control
    const hex2rgb = (hex: string) => {
        // Expand shorthand hex
        if (hex.length === 4) {
            hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
        }
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
    };
    const rgbColor = hex2rgb(color.startsWith('#') ? color : '#ffffff');

    const isMobile = window.innerWidth <= 768;
    const activeCount = isMobile ? Math.min(count, 80) : Math.min(count, 150);

    for (let i = 0; i < activeCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * particleSize + 0.2,
        speedY: (Math.random() * -0.5 - 0.2) * (fieldStrength * 0.05),
        speedX: (Math.random() - 0.5) * waveSpeed * 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        phase: Math.random() * Math.PI * 2,
        originalX: 0,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Pulsing opacity
        const currentOpacity = p.opacity + Math.sin(Date.now() * 0.001 * pulseSpeed + p.phase) * 0.2;
        const boundedOpacity = Math.max(0.05, Math.min(0.8, currentOpacity));

        ctx.fillStyle = `rgba(${rgbColor}, ${boundedOpacity})`;
        
        ctx.beginPath();
        
        if (particleShape === "capsule") {
            if (ctx.roundRect) {
              ctx.roundRect(p.x, p.y, p.size, p.size * 4, p.size / 2);
            } else {
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            }
        } else if (particleShape === "square") {
            ctx.rect(p.x, p.y, p.size * 2, p.size * 2);
        } else {
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        ctx.fill();

        if (autoAnimate) {
            p.y += p.speedY;
            p.x += Math.sin(p.y * 0.01 + p.phase) * p.speedX; // Wavy effect

            // Magnetic mouse effect
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            // magnetRadius dictates interaction range
            const interactionRadius = (magnetRadius || 6) * 30;
            
            if (dist < interactionRadius && dist > 0) {
              const force = (interactionRadius - dist) / interactionRadius;
              // Particles move with the cursor (attraction with a bit of swirl)
              p.x += (dx / dist) * force * (lerpSpeed || 0.05) * 50;
              p.y += (dy / dist) * force * (lerpSpeed || 0.05) * 50;
            }

            // Reset if out of bounds
            if (p.y < -20) {
                p.y = height + 20;
                p.x = Math.random() * width;
            }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, color, particleSize, particleShape, waveSpeed, fieldStrength, autoAnimate, pulseSpeed, magnetRadius, lerpSpeed]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}
