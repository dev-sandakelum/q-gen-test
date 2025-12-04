"use client"

interface StarRatingProps {
  stars: number
}

export function StarRating({ stars }: StarRatingProps) {
  const getColorClass = (stars: number) => {
    if (stars >= 4) return "text-green-500"
    if (stars >= 3) return "text-yellow-500"
    return "text-orange-500"
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`text-lg sm:text-xl transition-all duration-200 ${
              i <= stars ? getColorClass(stars) : "text-muted-foreground/30"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className={`text-xs sm:text-sm font-semibold ml-1 ${getColorClass(stars)}`}>
        {stars}/5
      </span>
    </div>
  )
}