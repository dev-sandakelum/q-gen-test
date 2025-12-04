"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Subtopic {
  id: string;
  subcategory: string;
  description: string;
}

interface TopicGroup {
  name: string;
  description: string;
  icon?: string;
  subtopics: Subtopic[];
}

interface TopicDropdownProps {
  group: TopicGroup;
  onSelectSubtopic: (subtopicId: string) => void;
}

export function TopicDropdown({ group, onSelectSubtopic }: TopicDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border/50 rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-all duration-300">
      {/* Main Topic Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-muted/30 transition-all duration-300 ease-out active:scale-[0.99]"
      >
        <div className="flex items-center gap-3 flex-1 text-left">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center transition-all duration-300">
            <span className="text-[12px]">{group.icon || "📚"}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[12px] sm:text-lg text-foreground">
              {group.name}
            </h3>
            <p className="text-[10px] sm:text-sm text-muted-foreground line-clamp-1">
              {group.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px] font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
            {group.subtopics.length}
          </span>
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-300" />
          ) : (
            <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform duration-300" />
          )}
        </div>
      </button>

      {/* Subtopics List */}
      {isOpen && (
        <div className="border-t border-border/30 bg-muted/20">
          <div className="p-2 space-y-1">
            {group.subtopics.map((subtopic) => (
              <button
                key={subtopic.id}
                onClick={() => onSelectSubtopic(subtopic.id)}
                className="w-full text-left p-3 rounded-lg hover:bg-card hover:shadow-sm transition-all duration-300 ease-out active:scale-95 group"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 flex items-center justify-center transition-all duration-300">
                    <span className="text-[12px]">📖</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[12px] text-foreground group-hover:text-primary transition-colors duration-300">
                      {subtopic.subcategory}
                    </h4>
                    <p className="text-[10px] text-muted-foreground line-clamp-2 mt-0.5">
                      {subtopic.description}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0 mt-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Accordion Component with single-open behavior
interface AccordionTopicDropdownProps {
  group: TopicGroup;
  isOpen: boolean;
  onToggle: () => void;
  onSelectSubtopic: (subtopicId: string) => void;
}

export function AccordionTopicDropdown({ 
  group, 
  isOpen, 
  onToggle, 
  onSelectSubtopic 
}: AccordionTopicDropdownProps) {
  return (
    <div className="border border-border/50 rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-all duration-300">
      {/* Main Topic Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-2 sm:p-5 hover:bg-muted/30 transition-all duration-300 ease-out active:scale-[0.99]"
      >
        <div className="flex items-center gap-3 flex-1 text-left">
          <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center transition-all duration-300">
            <span className="text-md">{group.icon || "📚"}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[14px] sm:text-lg text-foreground">
              {group.name}
            </h3>
            <p className="text-[12px] sm:text-sm text-muted-foreground line-clamp-1">
              {group.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
            {group.subtopics.length}
          </span>
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-300" />
          ) : (
            <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform duration-300" />
          )}
        </div>
      </button>

      {/* Subtopics List */}
      {isOpen && (
        <div className="border-t border-border/30 bg-muted/20 animate-fade-in">
          <div className="p-2 space-y-1">
            {group.subtopics.map((subtopic) => (
              <button
                key={subtopic.id}
                onClick={() => onSelectSubtopic(subtopic.id)}
                className="w-full text-left p-3 rounded-lg hover:bg-card hover:shadow-sm transition-all duration-300 ease-out active:scale-95 group"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 flex items-center justify-center transition-all duration-300">
                    <span className="text-[12px]">📖</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[12px] text-foreground group-hover:text-primary transition-colors duration-300">
                      {subtopic.subcategory}
                    </h4>
                    <p className="text-[10px] text-muted-foreground line-clamp-2 mt-0.5">
                      {subtopic.description}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0 mt-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}