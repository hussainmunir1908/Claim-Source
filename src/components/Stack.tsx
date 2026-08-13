"use client";

import React, { useEffect, useRef, useState } from "react";

interface StackProps {
  cards: React.ReactNode[];
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
}

export default function Stack({
  cards,
  randomRotation = false,
  sensitivity = 100,
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
}: StackProps) {
  const [mounted, setMounted] = useState(false);
  const [stack, setStack] = useState<React.ReactNode[]>([...cards]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rotations = useRef<number[]>(cards.map(() => 0));

  const sendToBack = (index: number) => {
    setStack((prev) => {
      const newStack = [...prev];
      const [card] = newStack.splice(index, 1);
      newStack.unshift(card);
      const [rot] = rotations.current.splice(index, 1);
      rotations.current.unshift(rot);
      return newStack;
    });
  };

  useEffect(() => {
    setMounted(true);
    if (randomRotation) {
      rotations.current = cards.map(() => (Math.random() - 0.5) * 12);
    }
  }, [cards, randomRotation]);

  useEffect(() => {
    if (!autoplay) return;
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        sendToBack(stack.length - 1);
      }
    }, autoplayDelay);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, autoplayDelay, isPaused, stack.length]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setOffset(clientX - startX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(offset) > sensitivity) {
      sendToBack(stack.length - 1);
    }
    setOffset(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => {
        if (pauseOnHover) setIsPaused(false);
        handleDragEnd();
      }}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {stack.map((card, index) => {
        const isTop = index === stack.length - 1;
        const rotation = mounted ? (rotations.current[index] ?? 0) : 0;
        const depthOffset = (stack.length - 1 - index) * 6;

        return (
          <div
            key={index}
            className="absolute inset-0 rounded-xl overflow-hidden shadow-xl"
            style={{
              transform: `
                translateY(${depthOffset}px)
                translateX(${isTop ? offset : 0}px)
                rotate(${isTop && isDragging ? rotation + offset * 0.05 : rotation}deg)
                scale(${1 - depthOffset * 0.003})
              `,
              zIndex: index,
              cursor: isTop ? "grab" : "default",
              transition: isDragging && isTop ? "none" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform",
            }}
            onMouseDown={isTop ? handleDragStart : undefined}
            onTouchStart={isTop ? handleDragStart : undefined}
            onClick={() => {
              if (sendToBackOnClick && isTop && Math.abs(offset) < 5) {
                sendToBack(index);
              }
            }}
          >
            {card}
          </div>
        );
      })}
    </div>
  );
}
