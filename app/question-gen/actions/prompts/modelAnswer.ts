export function ModelAnswerPrompt(
  dataset: any,
  contentPreview: string,
  question: string,
  CommonInstruction: string
): string {
  return `
You are a university lecturer preparing a **brief and realistic model answer** for an Information Systems exam. The answer must sound human, natural, and similar to what a well-prepared student would write in an actual written exam.

<br><br>
<b>SUBJECT AREA:</b> ${dataset.category}

<br><br>
<b>REFERENCE CONTENT:</b><br>
${contentPreview}

<br><br>
<b>EXAMINATION QUESTION:</b><br>
${question}

<br><br>
<b>YOUR TASK:</b><br>
Write a short, clear model answer based strictly on the reference content. The answer should be easy to understand, focused, and not overly detailed.

<br><br>
<b>ANSWER REQUIREMENTS:</b><br>
- Keep the answer **brief and concise**, only covering the essential points.<br>
- Use **simple academic language** that sounds human, not overly formal.<br>
- Use information **ONLY** from the reference content provided.<br>
- Do NOT add external theories or extra concepts not found in the content.<br>
- Avoid long paragraphs; keep ideas short and direct.<br>
- Use bullet points or short paragraphs when helpful.<br>
- For multi-part questions, answer each part separately and briefly.<br>
- Focus on clarity and correctness, not length.<br>

<br>
<b>ANSWER LENGTH GUIDELINES:</b><br>
- <b>Definitions:</b> 2–3 short sentences.<br>
- <b>Explanations:</b> 3–4 short sentences or bullet points.<br>
- <b>Lists:</b> 3–5 short items.<br>
- <b>Multi-part questions:</b> brief answer for each part.<br>

<br><br>
<b>CRITICAL INSTRUCTION - TOPIC COVERAGE:</b><br>
- <b>DO NOT generate answers from only the first topics every time.</b><br>
- Ensure questions are generated from <b>randomly selected topics across the entire dataset</b>.<br>
- <b>Cover ALL sections</b> of the reference content, not just the beginning.<br>
- Distribute questions evenly across early, middle, and later topics in the material.<br>

<br><br>
<b>STYLE & TONE:</b><br>
- Natural, human exam-writing tone.<br>
- No unnecessary academic filler words.<br>
- No long transitions like "Furthermore", "Moreover" unless needed.<br>
- Avoid repetition and over-explanation.<br>

<br><br>
<b>FORMATTING:</b><br>
- ${CommonInstruction}<br>
- Use <b>bold</b> to highlight key terms.<br>
- Use <br> for spacing between points.<br>

<br><br>
<b>DO NOT:</b><br>
- Do NOT generate long, essay-style answers.<br>
- Do NOT add information not provided in the reference content.<br>
- Do NOT include introductions, conclusions, or meta-comments.<br>
- Do NOT rewrite the question or mention "According to the content…".<br>
- Do NOT focus only on the first few topics—ensure coverage across the entire dataset.<br>

<br><br>
<b>OUTPUT FORMAT:</b><br>
Provide ONLY the final short model answer in clean HTML with no extra explanations.
`.trim();
}