"use client";
import { Spinner } from "@/components/question-gen/spinner";
import Link from "next/link";
import { useState } from "react";

export function BackBtn() {
  return (
    <div className="flex items-center justify-between mb-5 sm:mb-6">
      <Link
        href="/question-gen/"
        className="group flex items-center gap-1.5 text-primary hover:text-primary/80 transition-all duration-300 ease-out text-sm sm:text-base font-medium active:scale-95 hover:gap-2"
      >
        <span className="transition-all duration-300 group-hover:-translate-x-1">
          ←
        </span>
        <span>Categories</span>
      </Link>
    </div>
  );
}

export function Navigation({ dataset }: { dataset: any }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  if (!dataset) return null;
  return (
    <div className="mb-5 sm:mb-6 transition-all duration-300 px-2">
          {/* UPDATED: Show both category and subcategory */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-1.5 transition-all duration-300">
            <span className="text-[10px] sm:text-xs font-medium text-primary bg-primary/10 px-1.5 sm:px-2 py-0.5 mt-1 rounded">{dataset.category}</span>
            {/* <span className="transition-all duration-300">›</span>
            <span className="text-primary font-medium transition-all duration-300 hover:text-primary/80 line-clamp-1">{dataset.subcategory}</span> */}
          </div>
          <h1 className="text-l sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight transition-all duration-300">
            {dataset.subcategory}
          </h1>
          <div className="mt-1.5 sm:px-0">
            <p className={`text-[11px] sm:text-sm text-muted-foreground transition-all duration-300 ${!showFullDescription ? 'line-clamp-1' : ''}`}>
              {dataset.description}
            </p>
            {dataset.description && dataset.description.length > 100 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-xs text-primary hover:text-primary/80 font-medium mt-1 transition-all duration-300 ease-out active:scale-95 hover:underline"
              >
                {showFullDescription ? 'See less' : 'See more'}
              </button>
            )}
          </div>
        </div>
  )
}

export function Error_display({error, loadNewQuestion}: {error: string, loadNewQuestion: () => void}) {
  return (
    
    <div className="bg-destructive/10 border border-destructive/50 text-destructive rounded-xl p-4 mb-5 space-y-3 transition-all duration-300 hover:shadow-md hover:border-destructive/70">
                <div className="flex items-start gap-2.5">
                  <span className="text-lg flex-shrink-0 transition-transform duration-300 hover:scale-110">⚠️</span>
                  <div className="space-y-2 flex-1">
                    <p className="text-sm sm:text-base font-medium transition-all duration-300">
                      Something went wrong
                    </p>
                    <p className="text-xs sm:text-sm opacity-90 transition-all duration-300">{error}</p>
                  </div>
                </div>
                <button
                  onClick={loadNewQuestion}
                  className="w-full sm:w-auto h-9 px-4 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 ease-out hover:scale-[1.02] active:scale-95 hover:shadow-md"
                >
                  Try Again →
                </button>
              </div>
  )
}


export function While_load() {
  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-sm p-8 sm:p-12 transition-all duration-300 hover:shadow-md">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="relative transition-transform duration-300 hover:scale-105">
                    <Spinner />
                    <div className="absolute inset-0 animate-ping opacity-20">
                      <Spinner />
                    </div>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-sm sm:text-base font-medium text-foreground transition-all duration-300">
                      Generating your question...
                    </p>
                    <p className="text-xs text-muted-foreground transition-all duration-300">
                      This may take a few seconds
                    </p>
                  </div>
                </div>
              </div>
  )
}