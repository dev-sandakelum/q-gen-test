"use server";

import { connectToDatabase } from "@/lib/question-gen/mongodb/connection";
import { Quiz } from "@/lib/question-gen/mongodb/models";
import { callGroq, ChatMessage } from "@/lib/question-gen/openai-client";
import { getDatasetById } from "@/lib/question-gen/types/dataset";
import { QuestionPattern } from "./pattens/main";
import { generatePromptfor_InformationSystems } from "./prompts/gen/is";
import { CommonInstruction } from "./prompts/common";
import { generatePromptfor_programming } from "./prompts/gen/c";
import { generatePromptfor_ComputerNetworks } from "./prompts/gen/net";

// Generate question function
export async function generateQuestion(categoryId: string , num: number): Promise<{ content: string; model: string ; keyIndex: number }> {
  const dataset = getDatasetById(categoryId);
  if (!dataset) throw new Error("Dataset not found");

  const contentPreview = dataset.content.length > 3000
    ? dataset.content.substring(0, 3000) + "..."
    : dataset.content;

  let thePrompt = "";
  switch (dataset.category) {
    case "Ancient History":
      thePrompt = generatePromptfor_InformationSystems(dataset, {QuestionPattern:QuestionPattern,CommonInstruction: CommonInstruction} , num+1) || "";
      break;
    case "Programming":
      thePrompt = generatePromptfor_programming(dataset, contentPreview, QuestionPattern, CommonInstruction , num);
      break;
    case "Computer Networks":
      thePrompt = generatePromptfor_ComputerNetworks(dataset, {questionPattern:QuestionPattern,commonInstruction: CommonInstruction} , num+1) || ""
      break;
    default:
      thePrompt = `${CommonInstruction}\n${QuestionPattern}\n${contentPreview}`;
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

// Save quiz to MongoDB - IMPROVED ERROR HANDLING
export async function saveQuizToDatabase(data: {
  categoryId: string;
  question: string;
  modelAnswer: string;
  model: string;
}) {
  try {
    // Connect to database
    await connectToDatabase();

    // Create quiz document
    const quiz = await Quiz.create({
      categoryId: data.categoryId,
      question: data.question,
      modelAnswer: data.modelAnswer,
      model: data.model,
      createdAt: new Date(),
    });

    console.log('Quiz saved successfully:', quiz._id.toString());

    return {
      success: true,
      quizId: quiz._id.toString(),
    };
  } catch (error) {
    console.error("Error saving quiz to MongoDB:", error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to save quiz",
    };
  }
}

// Get all quizzes for a category - IMPROVED ERROR HANDLING
export async function getQuizzesByCategory(categoryId: string) {
  try {
    // Connect to database
    await connectToDatabase();

    // Query quizzes
    const quizzes = await Quiz.find({ categoryId })
      .sort({ createdAt: -1 })
      .lean()
      .exec(); // Add exec() for better error handling

    console.log(`Found ${quizzes.length} quizzes for category ${categoryId}`);

    return {
      success: true,
      quizzes: quizzes.map((quiz) => ({
        id: quiz._id.toString(),
        question: quiz.question,
        modelAnswer: quiz.modelAnswer,
        model: quiz.model,
        createdAt: quiz.createdAt.toISOString(),
      })),
    };
  } catch (error) {
    console.error("Error fetching quizzes from MongoDB:", error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch quizzes",
      quizzes: [],
    };
  }
}