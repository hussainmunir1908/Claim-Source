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

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * particleSize + 0.5,
        speedY: Math.random() * -1 - (fieldStrength * 0.1), // Move up (antigravity)
        speedX: (Math.random() - 0.5) * waveSpeed,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        ctx.fillStyle = `rgba(${rgbColor}, ${p.opacity})`;
        ctx.beginPath();
        
        if (particleShape === "capsule") {
            if (ctx.roundRect) {
              ctx.roundRect(p.x, p.y, p.size * 2, p.size * 6, p.size);
            } else {
              ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
            }
        } else if (particleShape === "square") {
            ctx.rect(p.x, p.y, p.size * 3, p.size * 3);
        } else {
            ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        }
        ctx.fill();

        if (autoAnimate) {
            p.y += p.speedY;
            p.x += Math.sin(p.y * 0.01) * p.speedX; // Wavy effect

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
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, color, particleSize, particleShape, waveSpeed, fieldStrength, autoAnimate]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}
