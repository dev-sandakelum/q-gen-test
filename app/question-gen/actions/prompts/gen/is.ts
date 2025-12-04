import { Dataset } from "@/lib/question-gen/types/dataset";
// Assuming topicSplitter is available, similar to the net.ts file
// import { getTopicByIndex } from "../topicSplitter"; 

export interface PromptConfig {
  QuestionPattern: string;
  CommonInstruction: string;
}

// NOTE: I am assuming the existence of a getTopicByIndex function 
// and a structure for the topic object, similar to how it's used in net.ts.
interface Topic {
  index: number;
  title: string;
  content: string;
}

// Placeholder for the external topic extraction utility
function getTopicByIndex(content: any, index: number): Topic | null {
    // In a real environment, this would parse the 'content' object 
    // to find the topic. For this file generation, we'll use a placeholder.
    return {
        index: index,
        title: "The Role of Information Systems in Business Strategy",
        content: `Information Systems (IS) are critical for modern business operations. They support five key functions: Data Processing, Decision Support, Competitive Advantage, Process Automation, and Strategic Planning. For strategic planning, IS provides tools for SWOT analysis and forecasting market trends. Operational-level systems, such as Transaction Processing Systems (TPS), focus on daily transactions, while Strategic Information Systems (SIS) focus on long-term goals and differentiation. The key difference lies in the time horizon and the level of management they serve.`
    };
}


export function generatePromptfor_InformationSystems(
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
You are an expert university-level examination question designer specializing in <b>${dataset.category}</b>.

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
Generate ONE high-quality examination question based on the content above, following academic standards for Information Systems assessments.

<br><br>
<b>QUESTION DESIGN FRAMEWORK:</b>

<br><br>
<b>1. QUESTION STRUCTURE (choose ONE format):</b>

<br><br>
<b>Format A - Definition & Explanation:</b><br>
- "Define [concept] and explain its significance in [context]"<br>
- "Briefly define the following terms: i) [term1] ii) [term2] iii) [term3]"

<br><br>
<b>Format B - Description & Analysis:</b><br>
- "Describe [concept/system] and explain its [characteristics/functions/components]"<br>
- "Briefly explain [number] types/features/advantages of [system/concept]"

<br><br>
<b>Format C - Comparison & Differentiation:</b><br>
- "Differentiate between [concept A] and [concept B] with examples"<br>
- "Compare and contrast [system X] and [system Y]"<br>
- "Mention the key difference between [A] and [B], and provide an example for each"

<br><br>
<b>Format D - Application & Scenario:</b><br>
- "Based on the given scenario, [analyze/determine/recommend] [solution/approach]"<br>
- "Explain how [concept] can be applied to [real-world situation]"

<br><br>
<b>Format E - Components & Features:</b><br>
- "List and briefly explain [number] [components/features/stages] of [system/process]"<br>
- "Describe the main [functions/characteristics/objectives] of [concept]"

<br><br>
<b>2. ACADEMIC LANGUAGE STANDARDS:</b><br>
- Start with clear instruction words: Define, Explain, Describe, List, Differentiate, Compare, Analyze, Discuss<br>
- Use "Briefly" when expecting concise answers<br>
- Specify quantity when asking for multiple items: "four (04)", "five (05)"<br>
- Use formal, precise academic terminology<br>
- Be grammatically correct and professionally written

<br><br>
<b>3. QUESTION COMPLEXITY LEVELS:</b>

<br><br>
<b>Knowledge Level (Simple):</b><br>
- Define, List, Identify, State<br>
- Example: "Define what an Information System (IS) is"

<br><br>
<b>Comprehension Level (Moderate):</b><br>
- Explain, Describe, Discuss, Illustrate<br>
- Example: "Briefly explain four (04) global challenges in Information Systems"

<br><br>
<b>Application Level (Complex):</b><br>
- Apply, Demonstrate, Calculate, Determine<br>
- Example: "Based on this scenario, determine which development approach is more suitable. Justify your answer."

<br><br>
<b>Analysis Level (Advanced):</b><br>
- Compare, Contrast, Differentiate, Analyze, Examine<br>
- Example: "Differentiate between operational-level and strategic-level systems with examples"

<br><br>
<b>4. ESSENTIAL ELEMENTS TO INCLUDE:</b><br>
- Be specific about what needs to be addressed<br>
- If asking for multiple items, specify the number clearly<br>
- Request examples when appropriate: "with suitable examples", "providing an example for each"<br>
- For scenario-based questions, provide sufficient context<br>
- Can be structured as multi-part: a), b), c) or i), ii), iii)

<br><br>
<b>5. QUALITY STANDARDS:</b><br>
- Question must be answerable from the provided content<br>
- Avoid ambiguous or overly broad questions<br>
- Ensure appropriate difficulty level for university examination<br>
- Balance between testing knowledge and understanding<br>
- Should take reasonable time to answer (consider if this is a 5, 10, 15, or 20 mark question)

<br><br>
<b>6. AVOID:</b><br>
- Yes/no questions<br>
- Questions requiring only one-word answers (unless part of a list)<br>
- Trick questions or unnecessarily complex wording<br>
- Questions about obscure details not covered in content<br>
- Overly simple recall without reasoning requirement

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
Briefly explain four (04) key features of a Customer Relationship Management (CRM) system that help businesses manage customer relationships effectively.

<br><br>
<i>Multi-part question:</i><br>
a) Define what a Computer Based Information System (CBIS) is.<br>
b) Briefly describe four (04) components of an Information System with suitable examples.<br>
c) Differentiate between data and information with examples.
`;
}