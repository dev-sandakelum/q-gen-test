import { Topic } from "@/lib/question-gen/types/dataset";

/**
 * Extracts topics from dataset content using specific XML-like tags
 * Format: <TOPIC_START index="0" title="Title">content<TOPIC_END>
 */
export function extractTopicsByTags(content: string): Topic[] {
  const topics: Topic[] = [];
  
  // Regular expression to match topic blocks
  const topicRegex = /<TOPIC_START\s+index="(\d+)"\s+title="([^"]+)">([\s\S]*?)<TOPIC_END>/g;
  
  let match;
  while ((match = topicRegex.exec(content)) !== null) {
    const index = parseInt(match[1]);
    const title = match[2];
    const topicContent = match[3].trim();
    
    topics.push({
      index,
      title,
      content: topicContent
    });
  }
  
  // Sort by index to ensure proper order
  return topics.sort((a, b) => a.index - b.index);
}

/**
 * Gets a specific topic by index using tag-based extraction
 */
export function getTopicByIndex(content: string, index: number): Topic | null {
  const topics = extractTopicsByTags(content);
  return topics.find(t => t.index === index) || null;
}

/**
 * Gets a random topic from the dataset
 */
export function getRandomTopic(content: string): Topic | null {
  const topics = extractTopicsByTags(content);
  if (topics.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * topics.length);
  return topics[randomIndex];
}

/**
 * Gets all topics from the dataset
 */
export function getAllTopics(content: string): Topic[] {
  return extractTopicsByTags(content);
}