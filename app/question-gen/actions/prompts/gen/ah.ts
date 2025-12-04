import { Dataset } from "@/lib/question-gen/types/dataset";
// Assuming topicSplitter is available
// import { getTopicByIndex } from "../topicSplitter"; 

export interface PromptConfig {
  QuestionPattern: string;
  CommonInstruction: string;
}

// NOTE: I am assuming the existence of a getTopicByIndex function 
// and a structure for the topic object.
interface Topic {
  index: number;
  title: string;
  content: string;
}

// Placeholder for the external topic extraction utility
function getTopicByIndex(content: any, index: number): Topic | null {
    // Placeholder content relevant to Ancient History for testing purposes
    return {
        index: index,
        title: "The Indus Valley Civilization (Harappan Civilization)",
        content: `The Indus Valley Civilization was a Bronze Age civilization in the northwestern regions of South Asia, lasting from 3300 BCE to 1300 BCE. It is noted for its urban planning, baked brick houses, elaborate drainage systems, water supply systems, and clusters of large non-residential buildings. The civilization's cities were noted for their urban planning, baked brick houses, elaborate drainage systems, water supply systems, and clusters of large non-residential buildings. The decline of the civilization around 1900 BCE is often attributed to climate change, tectonic shifts leading to the drying up of the Saraswati River, or Aryan migration.`
    };
}


export function generatePromptfor_AncientHistory(
  dataset: Dataset,
  config: PromptConfig,
  topicIndex: number
): string | null {
  // Get specific topic using tag-based extraction
  const topic = getTopicByIndex(dataset.content, topicIndex);
  
  if (!topic) {
    console.error(`Topic index ${topicIndex} not found in dataset`);
    return null;
  }
  
  return `
You are an expert university-level examination question designer specializing in <b>${dataset.category}</b> and Historical Analysis.

<br><br>
<b>TOPIC CONTEXT:</b><br>
Category: ${dataset.category}<br>
Subcategory: ${dataset.subcategory}<br>
Topic ${topic.index + 1}: ${topic.title}

<br><br>
<b>CONTENT TO ANALYZE:</b><br>
${topic.content}

<br><br>
<b>YOUR TASK:</b><br>
Generate ONE high-quality examination question based on the content above, following academic standards for History and Civilization assessments.

<br><br>
<b>QUESTION DESIGN FRAMEWORK:</b>

<br><br>
<b>1. QUESTION STRUCTURE (choose ONE format):</b>

<br><br>
<b>Format A - Identification & Significance:</b><br>
- "Identify [historical figure/site] and explain their significance in [context]"<br>
- "Briefly define the following historical terms: i) [term1] ii) [term2] iii) [term3]"

<br><br>
<b>Format B - Cause & Effect Analysis:</b><br>
- "Analyze the primary causes that led to [event/decline]"<br>
- "Describe the immediate and long-term consequences of [battle/treaty/event]"

<br><br>
<b>Format C - Comparison & Contrast:</b><br>
- "Compare the political structures of [Civilization A] and [Civilization B]"<br>
- "Differentiate between the [Period X] and [Period Y] regarding [art/culture/administration]"<br>
- "Contrast the leadership styles of [Ruler A] and [Ruler B]"

<br><br>
<b>Format D - Critical Evaluation & Source Analysis:</b><br>
- "To what extent was [factor] responsible for [outcome]? Justify your answer."<br>
- "Critically evaluate the statement: '[Historical Quote/Claim]'"

<br><br>
<b>Format E - Cultural & Social Characteristics:</b><br>
- "List and briefly explain [number] features of the [social hierarchy/religion/economy] of [Civilization]"<br>
- "Describe the main architectural achievements of [Era/Empire]"

<br><br>
<b>2. ACADEMIC LANGUAGE STANDARDS:</b><br>
- Start with clear instruction words: Analyze, Evaluate, Examine, Trace, Discuss, Compare, Differentiate<br>
- Use "Briefly" when expecting concise answers<br>
- Specify quantity when asking for multiple items: "three (03)", "four (04)"<br>
- Use formal, precise historical terminology<br>
- Be grammatically correct and professionally written

<br><br>
<b>3. QUESTION COMPLEXITY LEVELS:</b>

<br><br>
<b>Knowledge Level (Simple):</b><br>
- Define, List, State, Identify<br>
- Example: "List three (03) major cities of the Maya Civilization"

<br><br>
<b>Comprehension Level (Moderate):</b><br>
- Explain, Describe, Outline, Summarize<br>
- Example: "Briefly explain the role of the Senate in the Roman Republic"

<br><br>
<b>Application Level (Complex):</b><br>
- Illustrate, Apply context, Connect<br>
- Example: "Explain how the geography of Greece influenced the development of independent city-states"

<br><br>
<b>Analysis Level (Advanced):</b><br>
- Compare, Contrast, Critically Analyze, Evaluate<br>
- Example: "Analyze the factors contributing to the collapse of the Bronze Age civilizations"

<br><br>
<b>4. ESSENTIAL ELEMENTS TO INCLUDE:</b><br>
- Be specific about the time period or region if necessary<br>
- If asking for multiple items, specify the number clearly<br>
- Request examples or evidence: "citing specific historical evidence", "with examples"<br>
- For complex questions, provide sufficient context or parameters<br>
- Can be structured as multi-part: a), b), c) or i), ii), iii)

<br><br>
<b>5. QUALITY STANDARDS:</b><br>
- Question must be answerable from the provided content<br>
- Avoid ambiguous or overly broad questions (e.g., "Tell me about Rome")<br>
- Ensure appropriate difficulty level for university examination<br>
- Balance between testing factual recall and historical understanding<br>
- Should take reasonable time to answer (consider if this is a 5, 10, 15, or 20 mark question)

<br><br>
<b>6. AVOID:</b><br>
- Anachronisms (mixing time periods incorrectly)<br>
- Yes/no questions<br>
- Questions requiring only dates without context<br>
- Speculative history ("What if...") unless explicitly asked for counter-factual analysis<br>
- Bias or subjective opinion without requiring evidence

<br><br>
${config.CommonInstruction}

<br><br>
QUESTION PATTERN EXAMPLES FOR REFERENCE:<br>
${config.QuestionPattern}

<br><br>
<b>OUTPUT REQUIREMENTS:</b><br>
- Return ONLY the question text<br>
- Use proper academic formatting<br>
- Include sub-parts (a, b, c or i, ii, iii) if creating a multi-part question<br>
- Apply HTML formatting for emphasis where appropriate<br>
- Do NOT include: "Question:", preamble, answer keys, mark allocation, or explanatory notes<br>
- Ensure grammatically perfect academic English

<br><br>
<b>SAMPLE OUTPUT FORMAT:</b>

<br><br>
<i>Single-part question:</i><br>
Briefly explain four (04) key features of Urban Planning in the Indus Valley Civilization that distinguish it from contemporary cultures.

<br><br>
<i>Multi-part question:</i><br>
a) Identify the geographical boundaries of the Ancient Egyptian civilization.<br>
b) Briefly describe three (03) social classes within the Egyptian hierarchy.<br>
c) Differentiate between the burial practices of the Old Kingdom and the New Kingdom.
`;
}