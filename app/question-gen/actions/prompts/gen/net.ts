import { Dataset } from "@/lib/question-gen/types/dataset";
import { getTopicByIndex } from "../topicSplitter";

export interface PromptConfig {
  questionPattern: string;
  commonInstruction: string;
}

export function generatePromptfor_ComputerNetworks(
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
Generate ONE high-quality examination question based on the content above, following academic standards for Computer Networks assessments, mimicking the style of the provided past papers.

<br><br>
<b>QUESTION DESIGN FRAMEWORK:</b>

<br><br>
<b>1. QUESTION STRUCTURE (choose ONE format, commonly used in ICT 1253):</b>

<br><br>
<b>Format A - Definition & Explanation:</b><br>
- "Briefly explain the term [concept]" (e.g., computer networks, purpose of an IP address)
- "Briefly describe the purpose of [protocol/algorithm]" (e.g., routing algorithms, FTP, SMTP)

<br><br>
<b>Format B - Description & List:</b><br>
- "Describe [concept] including an explanation of its [structure/mechanism]" (e.g., P2P architecture, services of Transport layer)
- "List [number] [examples/functions/factors] of [concept]" (e.g., internetworking devices, functions of network software, congestion factors)

<br><br>
<b>Format C - Comparison & Differentiation:</b><br>
- "Differentiate between [Concept A] and [Concept B] by describing [number] key differences" (e.g., IPv4 and IPv6, UTP and STP)
- "Compare [Protocol A] and [Protocol B] considering [number] key aspects" (e.g., TCP and UDP)

<br><br>
<b>Format D - Mathematical Calculation & Theorem Application:</b><br>
- "Consider a [channel type] channel with a bandwidth of [X] kHz... calculate the [required parameter] using Nyquist's Theorem."
- "Calculate the [checksum/capacity] for [data/channel] using [method/formula]"

<br><br>
<b>Format E - Subnetting & Addressing (Complex Scenario):</b><br>
- "Given a network address [Address] and subnet mask [Mask], calculate the maximum number of subnets/hosts."
- "Using the concept of unequal subnetting, find the [Subnet mask/Network address/Broadcast address] for each department with a given number of hosts."

<br><br>
<b>Format F - Error Control & Framing:</b><br>
- "Perform [stuffing method] on the following datasets and rewrite them accordingly." (e.g., Byte Stuffing)
- "Given the data bits [X], calculate all parity bits and determine the complete [Hamming code] word, assuming [parity]."
- "If you receive a [code word] with [parity], verify whether the code is correct/locate the error."

<br><br>
<b>Format G - Routing & Topology Analysis:</b><br>
- "Using [Algorithm name] (e.g., Dijkstra's/Link-State) determine the shortest path and shortest distance from Router [A] to Router [B]."
- **Requirement:** Must include an instruction to provide steps in a table format.

<br><br>
<b>2. ACADEMIC LANGUAGE STANDARDS:</b><br>
- Start with clear instruction words: Define, Explain, Describe, List, Differentiate, Compare, Calculate, Determine, Illustrate.
- Use "Briefly" when expecting concise answers.
- Specify quantity when asking for multiple items: "three (03)", "four (04)".
- Use formal, precise academic terminology relevant to Computer Networks (e.g., protocol data unit, peer-to-peer, layered communication, congestion control).
- Be grammatically correct and professionally written.

<br><br>
<b>3. QUESTION COMPLEXITY LEVELS (High Weight on Application/Analysis):</b>

<br><br>
<b>Knowledge/Comprehension (Low to Moderate Marks, e.g., 4-10 marks):</b><br>
- Define [concept].
- Identify [number] examples of [device/method].
- Briefly explain [concept].

<br><br>
<b>Application/Analysis (High Marks, e.g., 10-60 marks):</b><br>
- Calculate [mathematical problem].
- Perform [technical operation] and rewrite the result.
- Using [algorithm], determine the shortest path/distance.
- Using the concept of unequal subnetting, find the [parameters].
- Explain the main stages of [protocol] using a suitable diagram.

<br><br>
<b>4. ESSENTIAL ELEMENTS TO INCLUDE:</b><br>
- Be specific (e.g., "in a business setting," "in a home environment").
- For complex problems, provide all necessary parameters (e.g., bandwidth, data rate, IP block, parity).
- Request diagrams or tables when appropriate (e.g., "using a suitable diagram," "provide your steps in a table format").
- Often structured as multi-part: a), b), c) or i), ii), iii).

<br><br>
<b>5. QUALITY STANDARDS:</b><br>
- Question must be answerable from core Computer Networks knowledge as evidenced by the past papers.
- Avoid ambiguous or overly broad questions.
- Ensure appropriate difficulty level for a university examination.
- Balance between theoretical and practical concepts (e.g., subnetting, routing).

<br><br>
<b>6. AVOID:</b><br>
- Yes/no questions.
- Questions requiring only one-word answers (unless part of a list).
- Questions about obscure details not covered in the common syllabus areas of the content.

<br><br>
${config.commonInstruction}

<br><br>
<b>QUESTION PATTERN EXAMPLES FOR REFERENCE (Derived from ICT 1253 Papers):</b><br>
${config.questionPattern}

<br><br>
<b>OUTPUT REQUIREMENTS:</b><br>
- Return ONLY the question text.
- Use proper academic formatting.
- Include sub-parts (a, b, c or i, ii, iii) if creating a multi-part question.
- Apply HTML formatting for emphasis where appropriate.
- Do NOT include: "Question:", preamble, answer keys, mark allocation, or explanatory notes.
- Ensure grammatically perfect academic English.
`;
}
