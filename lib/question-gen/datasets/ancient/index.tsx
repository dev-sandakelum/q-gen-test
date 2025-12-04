import { TopicGroup } from "../../types/dataset"
import { ancientHistoryDataset } from "../ancient-history"

// export const InformationSystems: TopicGroup = {
//   id: "information-systems",
//   name: "Information Systems",
//   description: "Information systems concepts and technologies",
//   subtopics: [

//   ]
// }
export const Ancient: TopicGroup = {
    id: "ancient",
    name: "Ancient History",
    description: "Overview of major ancient civilizations including Egypt, Mesopotamia, Greece, Rome, China, India, and Persia with their key achievements, events, and historical figures.",
    subtopics: [
        ancientHistoryDataset,
    ],
}