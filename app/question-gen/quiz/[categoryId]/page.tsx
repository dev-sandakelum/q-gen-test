"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  generateQuestion,
  saveQuizToDatabase,
} from "@/app/question-gen/actions/mongo_actions";
import { QuizQuestion } from "@/components/question-gen/quiz-question";
import { QuizResults } from "@/components/question-gen/quiz-results";
import { getDatasetById } from "@/lib/question-gen/datasets/registry";
import { Q_gen_note } from "@/components/question-gen/results-items/window";
import { NotFound } from "./notFound";
import { Error_display, BackBtn, Navigation, While_load } from "./fun";
import Link from "next/link";

interface ResultState {
  stars: number;
  feedback: string;
  improvements: string[];
  userAnswer: string;
  question: string;
  modelAnswer: string;
}

export default function QuizPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const categoryId = params.categoryId as string;

  const [question, setQuestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultState | null>(null);
  const [model, setModel] = useState<string>("");
  const [keyIndex, setKeyIndex] = useState<number>(-1);
  const [isNewlyGenerated, setIsNewlyGenerated] = useState(false); // Track if question is newly generated
  const [createdAt, setCreatedAt] = useState<string>("");
  const dataset = getDatasetById(categoryId);
  const [randomNum, setRandomNum] = useState<number>(0);
  const [Num, setNum] = useState<{rNum: number, topic_count: number, question_topic: string}>({rNum: 0, topic_count: 0, question_topic: ""});

  const loadNewQuestion = async (forceGenerate: boolean = false) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Check if there's a question in search params and we're not forcing a new generation
      const questionFromParams = searchParams.get("question");
      const createdAtFromParams = searchParams.get("createdAt");

      if (createdAtFromParams) {
        setCreatedAt(createdAtFromParams);
      }

      if (
        !forceGenerate &&
        questionFromParams &&
        questionFromParams.trim().length > 0
      ) {
        // Use the question from URL params
        setQuestion(questionFromParams);
        setModel("from Database");
        setIsNewlyGenerated(false);
      } else {
        // Generate a new question
        const topic_count = dataset?.topicCount || 10;
        const rNum = Math.floor(Math.random() * topic_count) + 1; // Random number between 1 and 10
        setNum({rNum, topic_count , question_topic: dataset?.topics ? dataset.topics[rNum - 1] : ""});
        const { content: newQuestion, model , keyIndex } = await generateQuestion(
          categoryId , rNum
        );
        setModel(model);
        setQuestion(newQuestion);
        setKeyIndex(keyIndex);
        setIsNewlyGenerated(true); // Mark as newly generated
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate question. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // NEW: Save quiz after evaluation
  const handleAnswerEvaluated = async (
    stars: number,
    feedback: string,
    improvements: string[],
    userAnswer: string,
    modelAnswer: string
  ) => {
    // Save to state first
    setResult({
      stars,
      feedback,
      improvements,
      userAnswer,
      question: question!,
      modelAnswer,
    });

    // Save to MongoDB only if it's a newly generated question
    if (isNewlyGenerated && question) {
      console.log("Attempting to save quiz to MongoDB...");
      try {
        const saveResult = await saveQuizToDatabase({
          categoryId,
          question,
          modelAnswer,
          model,
        });

        if (!saveResult.success) {
          console.error("Failed to save quiz:", saveResult.error);
          // Optionally show error to user
        } else {
          console.log("Quiz saved successfully:", saveResult.quizId);
        }
      } catch (err) {
        console.error("Error saving quiz:", err);
      }
    } else {
      console.log("Quiz not saved - either not newly generated or no question");
    }
  };

  useEffect(() => {
    if (!dataset) return;
    loadNewQuestion();
  }, [categoryId, dataset, searchParams]);

  if (!dataset) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-6 sm:py-8 md:py-10">
      <Q_gen_note subject={dataset.category} />
      <Link
        href={`${categoryId}/generated?category=${encodeURIComponent(
          dataset.category
        )}&subcategory=${encodeURIComponent(dataset.subcategory)}`}
        className={`
            absolute right-16 sm:right-34 top-4 z-[111]
            px-2 py-2
            
            w-30 h-10 sm:w-auto sm:h-auto
            flex items-center justify-evenly flex-row gap-1
            border rounded-lg text-sm font-medium
            cursor-pointer
            transition-all duration-300 ease-out
            active:scale-95
            bg-white border-gray-300
            hover:bg-gray-100
          `}
      >
        <span className="hidden sm:inline">Already Generated Questions</span>
        <div className="">
          <span className="sm:hidden text-base w-8 h-8 ">⚡</span>
        </div>{" "}
        <div className="flex items-start justify-center flex-col">
          <span className="sm:hidden text-[8px]">Already</span>
          <span className="sm:hidden text-[8px] w-full">
            Generated Questions
          </span>
        </div>
      </Link>
      <div className="mx-auto max-w-3xl px-3 sm:px-4 md:px-6">
        <BackBtn /><span>{}</span>
        <Navigation dataset={dataset} />
          
        {error && (
          <Error_display error={error} loadNewQuestion={loadNewQuestion} />
        )}

        {loading && !question ? (
          <While_load />
        ) : question ? (
          result ? (
            <QuizResults
              stars={result.stars}
              feedback={result.feedback}
              improvements={result.improvements}
              categoryId={categoryId}
              onTryAnother={() => loadNewQuestion(true)}
              loading={loading}
              userAnswer={result.userAnswer}
              question={result.question}
              modelAnswer={result.modelAnswer}
            />
          ) : (
            <QuizQuestion
              question={question}
              categoryId={categoryId}
              model={model}
              keyIndex={keyIndex}
              Num={Num}
              onAnswerEvaluated={handleAnswerEvaluated}
              onNewQuestion={loadNewQuestion}
              loading={loading}
              createdAt={createdAt || ""}
            />
          )
        ) : null}
      </div>
      <div className="h-20 w-full"></div>
    </main>
  );
}
