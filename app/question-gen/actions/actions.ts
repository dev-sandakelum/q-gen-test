"use server";

import { callGroq, ChatMessage } from "@/lib/question-gen/openai-client";
import { getDatasetById } from "@/lib/question-gen/types/dataset";
import { QuestionPattern } from "./pattens/main";
import { generatePromptfor_InformationSystems } from "./prompts/gen/is";
import { CommonInstruction } from "./prompts/common";
import { ModelAnswerPrompt } from "./prompts/modelAnswer";
import { EvaluationPrompt } from "./prompts/evaluation";
import { generatePromptfor_programming } from "./prompts/gen/c";
import { generatePromptfor_ComputerNetworks } from "./prompts/gen/net";

/**
 * Generate a quiz question based on dataset category
 */
export async function generateQuestion(categoryId: string , num: number): Promise<{ content: string; model: string }> {
  const dataset = getDatasetById(categoryId);
  if (!dataset) throw new Error("Dataset not found");

  const contentPreview = dataset.content.length > 3000
    ? dataset.content.substring(0, 3000) + "..."
    : dataset.content;

  // Build category-specific prompt
  let thePrompt = "";
  switch (dataset.category) {
    case "Information Systems":
      thePrompt = generatePromptfor_InformationSystems(dataset, {QuestionPattern:QuestionPattern,CommonInstruction: CommonInstruction} , num) || "";
      break;
    case "Programming":
      thePrompt = generatePromptfor_programming(dataset, contentPreview, QuestionPattern, CommonInstruction, num);
      break;
    case "Computer Networks":
      thePrompt = generatePromptfor_ComputerNetworks(dataset, {questionPattern: QuestionPattern, commonInstruction: CommonInstruction} , num) || "";
      break;
    default:
      // fallback generic prompt
      thePrompt = `${CommonInstruction}\n\n${contentPreview}`;
      break;
  }

  const messages: ChatMessage[] = [
    {
      role: "system",
      content: "You are a helpful educational assistant. Generate clear, engaging, and well-formatted quiz questions.",
    },
    {
      role: "user",
      content: thePrompt,
    },
  ];

  return await callGroq(messages);
}

/**
 * Evaluate student's answer against the model answer
 */
export async function evaluateAnswer(
  question: string,
  answer: string,
  categoryId: string
): Promise<{
  stars: number;
  feedback: string;
  improvements: string[];
  modelAnswer: string;
}> {
  const dataset = getDatasetById(categoryId);
  if (!dataset) throw new Error("Dataset not found");

  const contentPreview = dataset.content.length > 3000
    ? dataset.content.substring(0, 3000) + "..."
    : dataset.content;

  // 1️⃣ Generate model answer
  const modelPrompt = ModelAnswerPrompt(dataset, contentPreview, question, CommonInstruction);
  const modelAnswerMessages: ChatMessage[] = [
    {
      role: "system",
      content: "You are an educational expert. Provide accurate, concise, and well-formatted answers using HTML for readability.",
    },
    {
      role: "user",
      content: modelPrompt,
    },
  ];

  let modelAnswer = "";
  try {
    const { content } = await callGroq(modelAnswerMessages, 3, 0.5);
    modelAnswer = content;
  } catch (err) {
    console.error("Failed to generate model answer:", err);
    modelAnswer = "Model answer generation failed. Please refer to your study materials.";
  }

  // 2️⃣ Evaluate student's answer
  const evalPrompt = EvaluationPrompt(dataset, question, modelAnswer, answer, CommonInstruction);
  const evaluationMessages: ChatMessage[] = [
    {
      role: "system",
      content: "You are an educational evaluator. You MUST respond with valid JSON only — no markdown or explanations.",
    },
    {
      role: "user",
      content: evalPrompt,
    },
  ];

  try {
    const { content: response } = await callGroq(evaluationMessages, 3, 0.3);

    // Clean JSON in case of extra formatting
    const cleanedResponse = response
      .trim()
      .replace(/^```(json)?\s*|\s*```$/g, "")
      .trim();

    const parsed = JSON.parse(cleanedResponse);

    // Validate parsed object
    const stars = typeof parsed.stars === "number" ? Math.round(parsed.stars) : 3;
    const feedback = typeof parsed.feedback === "string" ? parsed.feedback : "Feedback unavailable";
    const improvements = Array.isArray(parsed.improvements)
      ? parsed.improvements.filter((item: unknown) => typeof item === "string")
      : [];

    return { stars, feedback, improvements, modelAnswer };
  } catch (err) {
    console.error("Evaluation error:", err);

    return {
      stars: 3,
      feedback: "Your answer has been reviewed. Compare it with the model answer to improve.",
      improvements: [
        "Review key concepts in the model answer",
        "Include specific details from course material",
        "Organize your answer more clearly",
      ],
      modelAnswer,
    };
  }
}
