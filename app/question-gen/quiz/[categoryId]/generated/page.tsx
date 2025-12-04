// ============================================
// app/question-gen/quiz/[categoryId]/generated/page.tsx
// ============================================
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getQuizzesByCategory } from "@/app/question-gen/actions/mongo_actions";
import { Spinner } from "@/components/question-gen/spinner";
import Link from "next/link";

interface SavedQuiz {
  id: string;
  question: string;
  modelAnswer: string;
  model: string;
  createdAt: string;
}

export default function GeneratedQuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.categoryId as string;
  const searchParams = new URLSearchParams(window.location.search);
  const category = searchParams.get("category") || "";
  const subcategory = searchParams.get("subcategory") || "";

  const [quizzes, setQuizzes] = useState<SavedQuiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedQuizId, setExpandedQuizId] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    loadQuizzes();
  }, [categoryId]);

  const loadQuizzes = async (isRetry = false) => {
    setLoading(true);
    setError(null);

    try {
      // Add a small delay for retries to avoid overwhelming the server
      if (isRetry && retryCount > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
      }

      const result = await getQuizzesByCategory(categoryId);
      
      if (result.success) {
        setQuizzes(result.quizzes);
        setRetryCount(0); // Reset retry count on success
      } else {
        throw new Error(result.error || "Failed to load quizzes");
      }
    } catch (err) {
      console.error("Error loading quizzes:", err);
      
      const errorMessage = err instanceof Error ? err.message : "Failed to load quizzes";
      
      // Check if it's an SSL/TLS error
      if (errorMessage.includes("SSL") || errorMessage.includes("TLS") || errorMessage.includes("408D0000")) {
        setError("Connection error. Please check your internet connection and try again.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    loadQuizzes(true);
  };

  const handleUseQuestion = (question: string ,ago: string) => {
    // Strip HTML tags before encoding
    const plainQuestion = question;
    const encodedQuestion = encodeURIComponent(plainQuestion);
    router.push(`/question-gen/quiz/${categoryId}?question=${encodedQuestion}&createdAt=${encodeURIComponent(ago)}`);
  };

  const toggleAnswer = (quizId: string) => {
    setExpandedQuizId(expandedQuizId === quizId ? null : quizId);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    } catch {
      return "Unknown date";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-4 sm:py-6 md:py-10">
      <div className="mx-auto max-w-4xl px-3 sm:px-4 md:px-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <Link
            href={`/question-gen/quiz/${categoryId}`}
            className="group inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-xs sm:text-sm md:text-base font-medium mb-3 sm:mb-4"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">←</span>
            <span>Back to Quiz</span>
          </Link>
          
          <div className="flex items-center justify-between gap-2">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                Generated Questions
              </h1>
              <p className="text-[10px] sm:text-xs font-medium text-primary bg-primary/10 px-1.5 sm:px-2 py-0.5 rounded">
                {category} / {subcategory}</p>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-0.5 sm:mt-1">
                {loading ? "Loading..." : `${quizzes.length} question${quizzes.length !== 1 ? 's' : ''} saved`}
              </p>
            </div>
            
            {quizzes.length > 0 && !loading && (
              <button
                onClick={() => loadQuizzes(false)}
                className="px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors whitespace-nowrap"
              >
                🔄 Refresh
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-card rounded-lg sm:rounded-xl border border-border/50 shadow-sm p-6 sm:p-8 md:p-12">
            <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
              <div className="relative">
                <Spinner />
                <div className="absolute inset-0 animate-ping opacity-20">
                  <Spinner />
                </div>
              </div>
              <p className="text-xs sm:text-sm md:text-base font-medium text-foreground">
                Loading questions...
              </p>
              {retryCount > 0 && (
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  Retry attempt {retryCount}...
                </p>
              )}
            </div>
          </div>
        ) : error ? (
          /* Error State */
          <div className="bg-destructive/10 border border-destructive/50 text-destructive rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6">
            <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">⚠️</span>
              <div className="flex-1">
                <p className="font-medium mb-0.5 sm:mb-1 text-xs sm:text-sm md:text-base">Failed to load questions</p>
                <p className="text-[11px] sm:text-xs md:text-sm opacity-90 mb-2">{error}</p>
                
                {/* Troubleshooting tips */}
                <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-background/50 rounded-md sm:rounded-lg text-[10px] sm:text-xs space-y-1">
                  <p className="font-medium">Troubleshooting tips:</p>
                  <ul className="list-disc list-inside space-y-0.5 opacity-80">
                    <li>Check your internet connection</li>
                    <li>Verify your database connection is active</li>
                    <li>Try refreshing the page</li>
                    <li>Check if MongoDB connection string is correct</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRetry}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push(`/question-gen/quiz/${categoryId}`)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 border border-border hover:bg-muted/50 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        ) : quizzes.length === 0 ? (
          /* Empty State */
          <div className="bg-card rounded-lg sm:rounded-xl border border-border/50 shadow-sm p-6 sm:p-8 md:p-12 text-center">
            <div className="max-w-md mx-auto space-y-3 sm:space-y-4">
              <div className="text-4xl sm:text-5xl md:text-6xl">📝</div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">
                No questions yet
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                Complete some quizzes to build your question bank. All evaluated questions will appear here.
              </p>
              <Link href={`/question-gen/quiz/${categoryId}`}>
                <button className="mt-3 sm:mt-4 px-5 sm:px-6 py-2 sm:py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                  Start Quiz →
                </button>
              </Link>
            </div>
          </div>
        ) : (
          /* Questions List */
          <div className="space-y-2.5 sm:space-y-3 md:space-y-4 pb-6 sm:pb-8">
            {quizzes.map((quiz, index) => (
              <div
                key={quiz.id}
                className="bg-card rounded-lg sm:rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
              >
                {/* Question Header */}
                <div className="p-3 sm:p-4 md:p-5">
                  <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 flex-wrap">
                        <span className="text-[10px] sm:text-xs font-medium text-muted-foreground bg-muted px-1.5 sm:px-2 py-0.5 rounded">
                          #{quizzes.length - index}
                        </span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground">
                          {formatDate(quiz.createdAt)}
                        </span>
                        <span className="text-[10px] sm:text-xs font-medium text-primary bg-primary/10 px-1.5 sm:px-2 py-0.5 rounded">
                          {quiz.model}
                        </span>
                      </div>
                      <div 
                        className="text-xs sm:text-sm md:text-base font-medium text-foreground leading-relaxed prose prose-sm dark:prose-invert max-w-none 
                        [&_b]:font-semibold [&_i]:italic [&_u]:underline
                        [&_ol]:list-decimal [&_ol]:ml-4 sm:[&_ol]:ml-5 [&_ol]:my-1.5 sm:[&_ol]:my-2 [&_ol]:space-y-0.5 sm:[&_ol]:space-y-1
                        [&_ul]:list-disc [&_ul]:ml-4 sm:[&_ul]:ml-5 [&_ul]:my-1.5 sm:[&_ul]:my-2 [&_ul]:space-y-0.5 sm:[&_ul]:space-y-1
                        [&_li]:my-0.5 sm:[&_li]:my-1 [&_li]:leading-relaxed [&_li]:text-xs sm:[&_li]:text-sm md:[&_li]:text-base
                        [&_p]:my-1.5 sm:[&_p]:my-2 [&_p]:text-xs sm:[&_p]:text-sm md:[&_p]:text-base
                        [&_br]:block [&_br]:my-0.5 sm:[&_br]:my-1"
                        dangerouslySetInnerHTML={{ __html: quiz.question }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 flex-wrap">
                    <button
                      onClick={() => handleUseQuestion(quiz.question , formatDate(quiz.createdAt))}
                      className="flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 sm:py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md sm:rounded-lg text-[11px] sm:text-xs md:text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1 sm:gap-1.5 min-w-[120px] sm:min-w-[140px]"
                    >
                      <span>✓</span>
                      <span>Use Question</span>
                    </button>
                    
                    <button
                      onClick={() => toggleAnswer(quiz.id)}
                      className="flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 sm:py-2 border border-border hover:bg-muted/50 rounded-md sm:rounded-lg text-[11px] sm:text-xs md:text-sm font-medium transition-colors flex items-center justify-center gap-1 sm:gap-1.5 min-w-[120px] sm:min-w-[140px]"
                    >
                      <span>{expandedQuizId === quiz.id ? '👁️' : '👁️‍🗨️'}</span>
                      <span>{expandedQuizId === quiz.id ? 'Hide' : 'Show'} Answer</span>
                    </button>
                  </div>
                </div>

                {/* Model Answer (Expandable) */}
                {expandedQuizId === quiz.id && (
                  <div className="border-t border-border/50 bg-muted/30 p-3 sm:p-4 md:p-5 animate-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                      <span className="text-[10px] sm:text-xs font-semibold text-primary uppercase tracking-wide">
                        Model Answer
                      </span>
                    </div>
                    <div 
                      className="prose prose-sm dark:prose-invert max-w-none text-xs sm:text-sm md:text-base text-foreground/90 leading-relaxed
                      [&_b]:font-semibold [&_i]:italic [&_u]:underline
                      [&_ol]:list-decimal [&_ol]:ml-4 sm:[&_ol]:ml-5 [&_ol]:my-1.5 sm:[&_ol]:my-2 [&_ol]:space-y-0.5 sm:[&_ol]:space-y-1
                      [&_ul]:list-disc [&_ul]:ml-4 sm:[&_ul]:ml-5 [&_ul]:my-1.5 sm:[&_ul]:my-2 [&_ul]:space-y-0.5 sm:[&_ul]:space-y-1
                      [&_li]:my-0.5 sm:[&_li]:my-1 [&_li]:leading-relaxed [&_li]:text-xs sm:[&_li]:text-sm md:[&_li]:text-base
                      [&_p]:my-1.5 sm:[&_p]:my-2 [&_p]:text-xs sm:[&_p]:text-sm md:[&_p]:text-base
                      [&_br]:block [&_br]:my-0.5 sm:[&_br]:my-1
                      [&_h1]:text-base sm:[&_h1]:text-lg md:[&_h1]:text-xl [&_h1]:font-bold [&_h1]:my-2 sm:[&_h1]:my-3
                      [&_h2]:text-sm sm:[&_h2]:text-base md:[&_h2]:text-lg [&_h2]:font-bold [&_h2]:my-1.5 sm:[&_h2]:my-2
                      [&_h3]:text-xs sm:[&_h3]:text-sm md:[&_h3]:text-base [&_h3]:font-semibold [&_h3]:my-1.5 sm:[&_h3]:my-2"
                      dangerouslySetInnerHTML={{ __html: quiz.modelAnswer }}
                    />
                  </div>
                )}
              </div>
            ))}
            <div className=" h-[100px]"></div>
          </div>
        )}
      </div>
    </main>
  );
}