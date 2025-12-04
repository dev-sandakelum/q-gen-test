import { AI_QUESTION_GENERATER_NAME, AI_QUESTION_GENERATER_VERSION } from "../info";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 text-center shadow-sm bottom-0 fixed w-full z-[100]">
        <div className="max-w-7xl mx-auto space-y-0.5 sm:space-y-1">
          {/* Version Info */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <p className="text-[10px] sm:text-sm md:text-base font-bold text-slate-900 dark:text-slate-100">
              {AI_QUESTION_GENERATER_NAME} v{AI_QUESTION_GENERATER_VERSION}
            </p>
          </div>
          
          {/* Creator Info */}
          <div className="flex items-center justify-center gap-1.5">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <p className="text-[9px] sm:text-xs md:text-sm font-medium text-blue-500 dark:text-blue-400">
              Created by Hasitha Sandakelum
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}