"use client"

import Link from "next/link"

export function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-6 sm:py-8 md:py-10 flex items-center justify-center">
      <div className="mx-auto max-w-3xl px-3 sm:px-4 md:px-6 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">404</h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-card-foreground">Category Not Found</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            The category you're looking for doesn't exist. Please select a different category.
          </p>
          <Link href="/question-gen/">
            <button className="mt-6 px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium text-sm transition-all duration-200">
              ← Back to Categories
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
