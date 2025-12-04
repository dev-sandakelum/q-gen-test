import { TopicGroup } from "../../types/dataset"

export const PredefinedGroup: TopicGroup = {
  id: "predefined",
  name: "Predefined",
  description: "Predefined question sets for various topics",
  subtopics: [
    // Add predefined datasets here
    {
      id: "predefined",
      category: "predefined",
      subcategory: "predefined",
      description:
        "A collection of predefined questions on various topics.",
      content: ``
    }
  ]
}