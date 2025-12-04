"use client";

import Link from "next/link";
import { StarRating } from "./star-rating";
import { quiz_font } from "../fonts";
import Q_gen_window, {
  Q_gen_feedback,
  Q_gen_modelAnswer,
  Q_gen_question,
  Q_gen_userAnswer,
} from "./results-items/question";

interface QuizResultsProps {
  stars: number;
  feedback: string;
  improvements: string[];
  categoryId: string;
  onTryAnother: () => void;
  loading: boolean;
  userAnswer: string;
  question: string;
  modelAnswer: string;
}

export function QuizResults({
  stars,
  feedback,
  improvements,
  categoryId,
  onTryAnother,
  loading,
  userAnswer,
  question,
  modelAnswer,
}: QuizResultsProps) {
  return (
    <div className="bg-card rounded-lg sm:rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Header - Result Summary */}
      <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/30">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className="text-[11px] sm:text-sm font-semibold text-foreground">Evaluation Complete</h2>
              <p className="text-[9px] sm:text-xs text-muted-foreground">Review your performance below</p>
            </div>
          </div>
          <Q_gen_window
            question={question}
            userAnswer={userAnswer}
            modelAnswer={modelAnswer}
            feedback={feedback}
            topic={categoryId}
            studentName={"N/A"}
            qrCodeUrl={"https://raw.githubusercontent.com/dev-sandakelum/web_lib/main/resources/qr_quiz.png"}
            improvements={improvements}
          />
        </div>
      </div>

      {/* Question Section */}
      <div className="p-2 sm:p-3 md:p-4 border-b border-border/30">
        {/* <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-blue-500/10 border border-blue-500/20">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-[11px] sm:text-sm font-semibold text-foreground">Question</h3>
        </div> */}
        <Q_gen_question value={question} font={quiz_font.variable} />
      </div>

      {/* Your Answer Section */}
      <div className="p-2 sm:p-3 md:p-4 bg-green-50 border-b border-border/30">
        {/* <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-orange-500/10 border border-orange-500/20">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-[11px] sm:text-sm font-semibold text-foreground">Your Answer</h3>
        </div> */}
        <Q_gen_userAnswer value={userAnswer} font={quiz_font.variable} />
      </div>

      {/* Model Answer Section */}
      <div className="p-2 sm:p-3 md:p-4 bg-green-50/50 dark:bg-green-950/20 border-b border-border/30">
        {/* <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-green-500/10 border border-green-500/20">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-[11px] sm:text-sm font-semibold text-green-700 dark:text-green-400">Model Answer</h3>
        </div> */}
        <Q_gen_modelAnswer value={modelAnswer} font={quiz_font.variable} />
      </div>

      {/* Result & Feedback Section */}
      <div className="p-2 sm:p-3 md:p-4 bg-sky-50 border-b border-border/30">
        <div className="space-y-2 sm:space-y-3">
          {/* Star Rating */}
          <div className="flex items-center justify-between gap-2 p-2 sm:p-3 bg-card rounded-lg border border-border/30">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-[11px] sm:text-sm font-semibold text-foreground">Your Score</h3>
            </div>
            <StarRating stars={stars} />
          </div>

          {/* Feedback */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-purple-500/10 border border-purple-500/20">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-[11px] sm:text-sm font-semibold text-foreground">Feedback</h3>
            </div>
            <Q_gen_feedback value={feedback} font={quiz_font.variable} />
          </div>
        </div>
      </div>

      {/* Improvements Section */}
      {stars < 4 && improvements.length > 0 && (
        <div className="p-2 sm:p-3 md:p-4 bg-blue-50/50 dark:bg-blue-950/20 border-b border-border/30">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-blue-500/10 border border-blue-500/20">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-[11px] sm:text-sm font-semibold text-blue-700 dark:text-blue-400">How to Improve</h3>
          </div>
          <ol className={`space-y-1.5 sm:space-y-2 ${quiz_font.variable} font-sans antialiased`}>
            {improvements.map((improvement, idx) => (
              <li
                key={idx}
                className="flex gap-2 text-[10px] sm:text-sm text-muted-foreground"
              >
                <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-[9px] sm:text-xs">
                  {idx + 1}
                </span>
                <span
                  className="leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: improvement }}
                ></span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-2 sm:p-3 md:p-4 bg-muted/20">
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={onTryAnother}
            disabled={loading}
            className="flex-1 min-h-8 sm:min-h-10 px-3 sm:px-4 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground rounded-lg sm:rounded-xl font-semibold text-[11px] sm:text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 flex items-center justify-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Try Another Question</span>
          </button>

          <Link href="/question-gen/" className="flex-1">
            <button className="w-full min-h-8 sm:min-h-10 px-3 sm:px-4 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-lg sm:rounded-xl font-semibold text-[11px] sm:text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border border-border/50 flex items-center justify-center gap-1.5">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Change Category</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}