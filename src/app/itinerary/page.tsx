import { api } from "~/trpc/server";
import type { data } from "../_components/json_to_table";
import Table from "../_components/json_to_table";
import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";
import { Suspense } from "react";

export const revalidate = 0;
export const maxDuration = 60;

export default async function Itinerary({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const destination = searchParams.destination ?? "none";
  const duration = searchParams.duration ?? "none";
  const questionary = searchParams.questionary ?? "none";
  const traveler_count = searchParams.traveler_count ?? "none";
  const budget = searchParams.budget ?? "none";

  const session = await getServerAuthSession();

  const prompt =
    "Your job is to create detailed itinerary using the JSON syntax for the user without asking any more questions.\n" +
    "YOU MUST TAKE INTO ACCOUNT ALL FACTORS SPECIALLY THE WANTS OF THE USER. FOR EXAMPLE IF THE USER HAS NO MONEY THEN DON'T ADD ANYTHING PAID.\n" +
    "YOU MUST MAKE THE PLAN REALISTIC AND ATTAINABLE WITH THE DATA GIVEN. DON'T MAKE A REPETITIVE AND BORING ITINERARY UNLESS ASKED BY USER.\n" +
    "OUTPUT EVERY DAY IN THE DURATION. RESPONSES THAT DON'T OUTPUT EVERY DAY IN THEIR OWN JSON OBJECT WILL BE INVALID.\n" +
    "YOUR DESCRIPTION MUST NOT BE BROAD AND GENERAL AND MUST BE DECLARATIVE STATEMENTS STARTING WITH DECLARATIVE VERBS. YOUR DESCRIPTION MUST NOT USE SECOND PERSON OR IT WILL BE INVALID.\n" +
    "YOU MUST RESPOND IN JSON SYNTAX. RESPONSES THAT ARE NOT A JSON CODEBLOCK WILL BE INVALID.\n" +
    "IF THE USER HAS A GOAL TAILOR THE RESPONSE SO THAT THE GOAL IS ACCOMPLISHED BY THE TIME BEFORE DEPARTURE\n" +
    'YOUR RESPONSE MUST HAVE THE FORMAT OF [{day: "day [day num]" [activities: {time: time, name: name, cost, cost, description, description}]}].\n' +
    "The current prompt is: " +
    "The user's destination is " +
    destination +
    "The user will stay there for " +
    duration +
    "The user is " +
    questionary +
    (traveler_count == "Solo"
      ? "The user is traveling alone"
      : "The user is being accompanied by " + traveler_count) +
    "The user's budget is " +
    budget;

  function capFirst(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="bg-[#F0F9FF] pt-10">
      <div className="flex flex-row justify-between">
        <h1 className="ml-10 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
          Your Itiner<span className="text-cyan-500">AI</span>ry to{" "}
          {capFirst(destination)}
        </h1>
        <div className="mb-10 mr-10 flex justify-end text-xl">
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-md bg-[#334155] px-6 py-3 font-semibold text-white no-underline transition hover:bg-[#1b2534]"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
      </div>
      {/* destination: {destination} <br />
            duration: {duration} <br />
            questionary: {questionary} <br />
            traveler count: {traveler_count} <br />
            budget: {budget} */}
      <br />
      <Suspense fallback={<CallGeminiGenerateTableFallback />}>
        <CallGeminiGenerateTable prompt={prompt} />
      </Suspense>
    </div>
  );
}

function CallGeminiGenerateTableFallback() {
  return (
    <div className="flex justify-center">
      <h1 className="ml-10 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
        Load<span className="text-cyan-500">i</span>ng...
      </h1>
    </div>
  );
}

async function CallGeminiGenerateTable({ prompt }: { prompt: string }) {
  const data = await api.gemini.prompt({ prompt: prompt });

  try {
    const json = JSON.parse(data.slice(8, data.length - 4)) as data[];

    return (
      <div>
        <Table json={json} />
      </div>
    );
  } catch {
    return (
      <>
        <h3>Error in representing the JSON response</h3>
        <h2>{data}</h2>
      </>
    );
  }
}
