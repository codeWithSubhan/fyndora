"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useState } from "react";

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children?: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const rotateX = (mousePosition.y / 300) * 20;
  const rotateY = (mousePosition.x / 300) * 20;

  return (
    <div
      className={cn(
        "flex items-center justify-center w-full",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={cn(
          "relative h-96 w-80 rounded-xl border bg-white/5 p-6 text-white shadow-2xl",
          className
        )}
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20"
          style={{
            transform: "translateZ(-1px)",
          }}
        />
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20"
          style={{
            transform: "translateZ(-2px)",
          }}
        />
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20"
          style={{
            transform: "translateZ(-3px)",
          }}
        />
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}; 