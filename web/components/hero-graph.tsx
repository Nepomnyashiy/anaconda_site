"use client";

import { motion, useReducedMotion } from "framer-motion";

type Node = {
  cx: number;
  cy: number;
  label: string;
  delay: number;
};

const nodes: Node[] = [
  { cx: 64, cy: 52, label: "Oracle", delay: 0.2 },
  { cx: 126, cy: 120, label: "1C", delay: 0.5 },
  { cx: 100, cy: 226, label: "ERP", delay: 0.8 },
  { cx: 384, cy: 76, label: "AI agents", delay: 0.45 },
  { cx: 440, cy: 172, label: "Analytics", delay: 0.75 },
  { cx: 392, cy: 272, label: "Black Mamba", delay: 0.95 }
];

const center = { x: 258, y: 170 };

export function HeroGraph() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="panel relative overflow-hidden rounded-[2rem] p-6 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(77,166,255,0.16),_transparent_45%)]" />
      <svg viewBox="0 0 500 340" className="relative z-10 h-full w-full">
        <defs>
          <linearGradient id="flow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(77,166,255,0.2)" />
            <stop offset="50%" stopColor="rgba(77,166,255,0.95)" />
            <stop offset="100%" stopColor="rgba(61,212,161,0.2)" />
          </linearGradient>
        </defs>
        {nodes.map((node) => (
          <g key={node.label}>
            <motion.path
              d={`M ${node.cx} ${node.cy} Q 210 170 ${center.x} ${center.y}`}
              fill="none"
              stroke="url(#flow)"
              strokeWidth="2"
              strokeDasharray="6 10"
              initial={{ pathLength: 0.25, opacity: 0.2 }}
              animate={
                reduceMotion
                  ? { pathLength: 1, opacity: 0.6 }
                  : { pathLength: [0.15, 1, 0.15], opacity: [0.3, 0.95, 0.3] }
              }
              transition={{
                duration: reduceMotion ? 0.4 : 6,
                repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: node.delay
              }}
            />
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="9"
              fill="#4DA6FF"
              initial={{ opacity: 0.6, scale: 0.94 }}
              animate={reduceMotion ? { opacity: 0.85 } : { opacity: [0.65, 1, 0.65], scale: [0.92, 1.08, 0.92] }}
              transition={{
                duration: reduceMotion ? 0.3 : 3.2,
                repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: node.delay
              }}
            />
            <text x={node.cx + 15} y={node.cy + 4} fill="#EAF3FF" fontSize="14">
              {node.label}
            </text>
          </g>
        ))}

        <motion.circle
          cx={center.x}
          cy={center.y}
          r="44"
          fill="#0F1B2E"
          stroke="#3DD4A1"
          strokeWidth="2"
          initial={{ scale: 0.95 }}
          animate={reduceMotion ? { scale: 1 } : { scale: [0.97, 1.02, 0.97] }}
          transition={{ duration: 4, repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <text x={center.x} y={center.y - 4} textAnchor="middle" fill="#EAF3FF" fontSize="16" fontWeight="700">
          OSNOVA
        </text>
        <text x={center.x} y={center.y + 17} textAnchor="middle" fill="#9BC9FF" fontSize="14">
          Core
        </text>
      </svg>
    </div>
  );
}

