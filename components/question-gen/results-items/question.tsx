"use client"

import { useState } from "react"
import HTML_Content from "./html"

interface Value_PASS {
  value: string
  font: string
}

export function Q_gen_question({ value, font }: Value_PASS) {
  return (
    <div className="bg-blue-50 rounded-md sm:rounded-lg p-2 sm:p-3 border border-border/30">
      <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
        <div className="w-1 h-4 sm:h-5 bg-blue-500 rounded-full"></div>
        <h3 className="text-[10px] sm:text-xs font-semibold text-blue-600 uppercase tracking-wide">
          Question
        </h3>
      </div>

      <div
        className={`text-[11px] sm:text-sm text-card-foreground leading-relaxed ${font} font-sans antialiased prose prose-sm dark:prose-invert max-w-none
       [&_b]:font-semibold [&_i]:italic [&_u]:underline
        [&_ol]:list-decimal [&_ol]:ml-3 sm:[&_ol]:ml-4 [&_ol]:my-1 sm:[&_ol]:my-1.5 [&_ol]:space-y-0.5
        [&_ul]:list-disc [&_ul]:ml-3 sm:[&_ul]:ml-4 [&_ul]:my-1 sm:[&_ul]:my-1.5 [&_ul]:space-y-0.5
        [&_li]:my-0.5 [&_li]:leading-relaxed [&_li]:text-[11px] sm:[&_li]:text-sm
        [&_p]:my-1 sm:[&_p]:my-1.5 [&_p]:text-[11px] sm:[&_p]:text-sm
        [&_br]:block [&_br]:my-0.5`}
        dangerouslySetInnerHTML={{ __html: value }}
      ></div>
    </div>
  )
}

export function Q_gen_userAnswer({ value, font }: Value_PASS) {
  return (
    <div className="bg-amber-50 rounded-md sm:rounded-lg p-2 sm:p-3 border border-primary/20">
      <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
        <div className="w-1 h-4 sm:h-5 bg-amber-500 rounded-full"></div>
        <h3 className="text-[10px] sm:text-xs font-semibold text-amber-700 uppercase tracking-wide">
          Your Answer
        </h3>
      </div>

      <div
        className={`text-[11px] sm:text-sm text-card-foreground leading-relaxed ${font} font-sans antialiased prose prose-sm dark:prose-invert max-w-none
        [&_b]:font-semibold [&_i]:italic [&_u]:underline
        [&_ol]:list-decimal [&_ol]:ml-3 sm:[&_ol]:ml-4 [&_ol]:my-1 sm:[&_ol]:my-1.5 [&_ol]:space-y-0.5
        [&_ul]:list-disc [&_ul]:ml-3 sm:[&_ul]:ml-4 [&_ul]:my-1 sm:[&_ul]:my-1.5 [&_ul]:space-y-0.5
        [&_li]:my-0.5 [&_li]:leading-relaxed [&_li]:text-[11px] sm:[&_li]:text-sm
        [&_p]:my-1 sm:[&_p]:my-1.5 [&_p]:text-[11px] sm:[&_p]:text-sm
        [&_br]:block [&_br]:my-0.5`}
        dangerouslySetInnerHTML={{ __html: value }}
      ></div>
    </div>
  )
}

export function Q_gen_modelAnswer({ value, font }: Value_PASS) {
  return (
    <div className="bg-green-50 dark:bg-green-950/20 rounded-md sm:rounded-lg p-2 sm:p-3 border border-green-200 dark:border-green-800">
      <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
        <div className="w-1 h-4 sm:h-5 bg-green-500 rounded-full"></div>
        <h3 className="text-[10px] sm:text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide flex items-center gap-1">
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Model Answer
        </h3>
      </div>

      <div
        className={`text-[11px] sm:text-sm text-card-foreground leading-relaxed ${font} font-sans antialiased prose prose-sm dark:prose-invert max-w-none
        [&_b]:font-semibold [&_i]:italic [&_u]:underline
        [&_ol]:list-decimal [&_ol]:ml-3 sm:[&_ol]:ml-4 [&_ol]:my-1 sm:[&_ol]:my-1.5 [&_ol]:space-y-0.5
        [&_ul]:list-disc [&_ul]:ml-3 sm:[&_ul]:ml-4 [&_ul]:my-1 sm:[&_ul]:my-1.5 [&_ul]:space-y-0.5
        [&_li]:my-0.5 [&_li]:leading-relaxed [&_li]:text-[11px] sm:[&_li]:text-sm
        [&_p]:my-1 sm:[&_p]:my-1.5 [&_p]:text-[11px] sm:[&_p]:text-sm
        [&_br]:block [&_br]:my-0.5`}
        dangerouslySetInnerHTML={{ __html: value }}
      ></div>
    </div>
  )
}

export function Q_gen_feedback({ value, font }: Value_PASS) {
  return (
    <div className="bg-purple-50 rounded-md sm:rounded-lg p-2 sm:p-3 border border-border/40">
      {/* <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
        <div className="w-1 h-4 sm:h-5 bg-purple-500 rounded-full"></div>
        <h3 className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Feedback
        </h3>
      </div> */}

      <div
        className={`text-[11px] sm:text-sm text-card-foreground leading-relaxed ${font} font-sans antialiased prose prose-sm dark:prose-invert max-w-none
        [&_b]:font-semibold [&_i]:italic [&_u]:underline
        [&_ol]:list-decimal [&_ol]:ml-3 sm:[&_ol]:ml-4 [&_ol]:my-1 sm:[&_ol]:my-1.5 [&_ol]:space-y-0.5
        [&_ul]:list-disc [&_ul]:ml-3 sm:[&_ul]:ml-4 [&_ul]:my-1 sm:[&_ul]:my-1.5 [&_ul]:space-y-0.5
        [&_li]:my-0.5 [&_li]:leading-relaxed [&_li]:text-[11px] sm:[&_li]:text-sm
        [&_p]:my-1 sm:[&_p]:my-1.5 [&_p]:text-[11px] sm:[&_p]:text-sm
        [&_br]:block [&_br]:my-0.5`}
        dangerouslySetInnerHTML={{ __html: value }}
      ></div>
    </div>
  )
}

export function openSaveAsJPG(data: {
  question: string
  userAnswer: string
  modelAnswer: string
  feedback: string
  topic?: string
  studentName?: string
  qrCodeUrl?: string
  improvements?: string[]
}): string {
  const printWindow = window.open("", "_blank")
  if (!printWindow) return ""

  const htmlContent = HTML_Content(data)
  printWindow.document.write(htmlContent)
  printWindow.document.close()
  return htmlContent
}

export default function Q_gen_window({
  question,
  userAnswer,
  modelAnswer,
  feedback,
  topic,
  studentName,
  qrCodeUrl,
  improvements,
}: {
  question: string
  userAnswer: string
  modelAnswer: string
  feedback: string
  topic?: string
  studentName?: string
  qrCodeUrl?: string
  improvements?: string[]
}) {
  const [isOpen, setIsOpen] = useState(false)

  
    return (
    <div>
      <button
        onClick={() =>
          openSaveAsJPG({
            question,
            userAnswer,
            modelAnswer,
            feedback,
            topic,
            studentName,
            qrCodeUrl,
            improvements,
          })
        }
        className="px-4 py-2 border bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 cursor-alias"
      >
        🖨️ Print
      </button>

      {isOpen && <div></div>}
    </div>
  
  )
}