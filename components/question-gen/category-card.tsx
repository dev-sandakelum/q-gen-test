"use client"

import type { Dataset } from "../../lib/question-gen/types/dataset"
import Link from "next/link"

interface CategoryCardProps {
  dataset: Dataset
}

export function CategoryCard({ dataset }: CategoryCardProps) {
  return (
    <Link href={`/question-gen/quiz/${dataset.id}`}>
      <div className="group bg-card rounded-xl border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer p-4 sm:p-5 space-y-2.5 h-full">
        <h3 className="text-[12px] sm:text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors leading-tight">
          {dataset.category}
        </h3>
        <p className="text-[10px] sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {dataset.description}
        </p>
        <div className="pt-1.5">
          <button className="w-full h-9 sm:h-10 px-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
            Make a question →
          </button>
        </div>
      </div>
    </Link>
  )
}