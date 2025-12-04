"use client";

import { StickyNote, X } from "lucide-react";
import { useState } from "react";

interface sub {
  subject: string;
}

export function Q_gen_note({ subject }: sub) {
  const [window, setWindow] = useState(false);

  return (
    <>
      <button
        onClick={() => setWindow(!window)}
        className={`
            absolute right-4 top-4 z-[111]
            px-4 py-2
            w-10 h-10 sm:w-auto sm:h-auto
            flex items-center justify-center
            border rounded-lg text-sm font-medium
            cursor-pointer
            transition-all duration-300 ease-out
            active:scale-95
            ${
              window
                ? "bg-gray-200 border-gray-400"
                : "bg-white border-gray-300"
            }
            ${window ? "hover:bg-gray-300" : "hover:bg-gray-100"}
            ${!window ? "display" : "hidden"}
          `}
      >
        <span className="hidden sm:inline">
          {window ? "Close Note" : "Access Note"}
        </span>
        <span className="sm:hidden text-base">
          {window ? (
            <X />
          ) : (
            <div className="  z-[11]
            flex items-center justify-evenly flex-col
            text-sm font-medium
            cursor-pointer
            transition-all duration-300 ease-out
            active:scale-95">

              {/* <StickyNote className="absolute w-3 h-3 sm:w-8 sm:h-8 text-muted-foreground" /> */}
              <span className="text-[8px]">Access Note</span>
            </div>
          )}
        </span>
      </button>

      {window && (
        <>
          {/* Backdrop */}
          <div
            className="absolute w-full h-full left-0 top-0 z-[99] bg-background/80 backdrop-blur-md"
            onClick={() => setWindow(false)}
          />

          {/* Notes Container */}
          <div className="absolute w-full h-full left-0 top-0 z-[113] flex justify-center items-center p-1 sm:p-4 md:p-6">
            <div className="relative w-full max-w-4xl h-[85vh] sm:h-[90vh] bg-card border border-border/50 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border/30 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <StickyNote className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground">
                        {subject}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">
                        Study Notes
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setWindow(false)}
                    className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-muted/50 transition-all duration-200 active:scale-95"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Notes Content */}
              <div className="h-[calc(100%-60px)] sm:h-[calc(100%-72px)] overflow-y-auto p-1 sm:p-6 bg-muted/10">
                {subject !== "Information Systems" &&
                  subject !== "Computer Networks" && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                        <StickyNote className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        No notes available for {subject} yet.
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
