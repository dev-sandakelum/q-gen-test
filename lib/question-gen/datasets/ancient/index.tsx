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
    id: "Network",
    name: "Networking",
    description: "Fundamentals of computer networking: OSI & TCP/IP models, IP/MAC addressing, switching, routing, common protocols (TCP, UDP, HTTP), network topologies, and basic troubleshooting.",
    subtopics: [
        ancientHistoryDataset,
    ],
}