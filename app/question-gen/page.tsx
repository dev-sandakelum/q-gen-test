"use client";

import { AccordionTopicDropdown, TopicDropdown } from "@/components/question-gen/topic-dropdown";
import { topicGroups } from "@/lib/question-gen/datasets/registry";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const handleSelectSubtopic = (subtopicId: string) => {
    router.push(`/question-gen/quiz/${subtopicId}`);
  };
 

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  

  return (
    <main className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/20 py-6 sm:py-8 md:py-10">
      <div className="mx-auto max-w-4xl px-3 sm:px-4 md:px-6">
        {/* Header Section */}
        <div className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            AI Question Generator
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
            Select a topic and subtopic to start learning
          </p>
        </div>

        {/* Warning Banner */}
        <div className="border border-yellow-500/30 rounded-lg p-3 text-xs sm:text-sm flex items-start gap-2 mb-6 bg-yellow-500/10 transition-all duration-300">
          <svg 
            className="w-4 h-4 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
          <p className="text-yellow-700 dark:text-yellow-400 font-medium">
            Note: This is a prototype version and may contain bugs or unexpected issues.
          </p>
        </div>

        {/* Topics List */}
        <div className="space-y-4">
          {topicGroups.map((group, index) => {
            if(group.id === "predefined") return null;
            return (
              <AccordionTopicDropdown
                key={index}
                group={group}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
                onSelectSubtopic={handleSelectSubtopic}
              />
            )
          })}
        </div>

        {/* Bottom Spacing */}
        <div className="h-20 w-full"></div>
      </div>
    </main>
  );
}