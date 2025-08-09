"use client"

import { cn } from "@/lib/utils"

interface AuroraGradientProps {
  className?: string
}

/**
 * AuroraGradient
 * - Animated, soft "aurora" blobs using radial gradients and subtle motion.
 * - Use as an absolutely-positioned background layer.
 */
export function AuroraGradient({ className }: AuroraGradientProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)} aria-hidden="true">
      <span className="aurora__blob aurora__blob--1" />
      <span className="aurora__blob aurora__blob--2" />
      <span className="aurora__blob aurora__blob--3" />
      <style jsx>{`
        .aurora__blob {
          position: absolute;
          width: 60vw;
          height: 60vw;
          border-radius: 9999px;
          filter: blur(60px);
          opacity: 0.6;
          mix-blend-mode: screen;
        }

        .aurora__blob--1 {
          background: radial-gradient(closest-side, rgba(139, 92, 246, 0.9), transparent 60%);
          top: -10%;
          left: -8%;
          animation: drift1 28s ease-in-out infinite alternate;
        }

        .aurora__blob--2 {
          background: radial-gradient(closest-side, rgba(6, 182, 212, 0.85), transparent 60%);
          right: -12%;
          top: 10%;
          animation: drift2 32s ease-in-out infinite alternate;
        }

        .aurora__blob--3 {
          background: radial-gradient(closest-side, rgba(16, 185, 129, 0.8), transparent 60%);
          bottom: -18%;
          left: 25%;
          animation: drift3 36s ease-in-out infinite alternate;
        }

        @keyframes drift1 {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          100% {
            transform: translate3d(6%, 4%, 0) rotate(10deg) scale(1.05);
          }
        }
        @keyframes drift2 {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          100% {
            transform: translate3d(-8%, 6%, 0) rotate(-8deg) scale(1.08);
          }
        }
        @keyframes drift3 {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          100% {
            transform: translate3d(4%, -6%, 0) rotate(6deg) scale(1.04);
          }
        }
      `}</style>
    </div>
  )
}
