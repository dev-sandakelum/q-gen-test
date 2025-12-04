import { redirect } from "next/navigation";
export default function Home() {
  return (
    <>
      {/* <PacketTracerGuide /> */}
      {redirect("/question-gen")}
    </>
  );
}
