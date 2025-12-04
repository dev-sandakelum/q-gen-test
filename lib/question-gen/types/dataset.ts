import { topicGroups } from "../datasets/registry"


export interface Dataset {
  id: string
  topicCount?: number
  category: string
  subcategory: string
  description: string
  content: string
  topics?: string[]
}
export interface Topic {
  index: number;
  title: string;
  content: string;
}
export interface TopicGroup {
  id: string
  name: string
  icon?: string
  description: string
  subtopics: Dataset[]
}
const datasets : Dataset[] = []; // TEMPORARY
topicGroups.forEach(group => {
  group.subtopics.forEach(dataset => {
    datasets.push(dataset);
  });
});

export function getDatasetById(id: string): Dataset | undefined {
  return datasets.find(dataset => dataset.id === id)
}

export function getAllCategories(): string[] {
  return datasets.map(dataset => dataset.category)
}