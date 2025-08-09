"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AuroraGradient } from "@/components/aurora-gradient"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <AuroraGradient className="opacity-70 [mask-image:linear-gradient(to_bottom,black,black,transparent_85%)]" />
      <div className="container mx-auto max-w-[1100px] px-4 pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-28 md:pb-24">
        <h1 className="text-center text-5xl font-semibold tracking-tight leading-[0.95] sm:text-6xl md:text-7xl">
          {"Understand "}
          <span className="gradient-text">{"Anything"}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-center text-base text-muted-foreground sm:text-lg md:text-xl">
          {"Your research and thinking partner, grounded in the information you trust."}
        </p>

        <div className="mt-8 flex justify-center">
          <Button
            asChild
            className="h-12 rounded-full bg-black px-6 text-base font-medium text-white shadow-sm hover:bg-black/90"
          >
            <Link href="/main">Try DocMind</Link>
          </Button>
        </div>
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(90deg, #8b5cf6, #06b6d4, #10b981, #8b5cf6);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: text-gradient-shift 8s ease-in-out infinite;
        }
        @keyframes text-gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  )
}
