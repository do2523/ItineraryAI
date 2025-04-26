import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="bg-sky-50 pt-10">
        <div className="mb-10 text-xl flex justify-end mr-20">
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-md bg-[#334155] px-10 py-4 font-semibold no-underline transition hover:bg-[#1b2534] text-white"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
          <Link
            href="/more"
            className="flex flex-col items-center justify-center rounded-md bg-[#334155] text-white ml-3 px-4 py-2 font-semibold no-underline transition hover:bg-gray-800 focus:outline-none text-lg"
          >
            <span className="block w-2 h-2 bg-white rounded-full mb-1"></span>
            <span className="block w-2 h-2 bg-white rounded-full mb-1"></span>
            <span className="block w-2 h-2 bg-white rounded-full"></span>
          </Link>
        </div>

        <div className="flex min-h-screen flex-col items-center justify-center bg-sky-50 text-[#334155]">
          <div className="container pt-0 flex flex-col items-center justify-center gap-12 px-4 py-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">Plan your next trip with</h1>
            <h1 className="font-extrabold tracking-tight
              text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl">
              Itiner<span className="text-cyan-500">AI</span>ry
            </h1>
            <div className="flex grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 items-center justify-center m-auto">
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-center text-lg sm:text-xl md:text-2xl lg:text:3xl max-w-lg mx-auto mb-8">
                {`Answer some questions and we'll generate a custom itinerary for you.`}
              </div>
              <div className="flex flex-col items-center justify-center gap-4">

                <Link
                  className="flex max-w-xs flex-col gap-4 rounded-lg bg-white p-4 hover:shadow-xl mb-40 shadow-lg"
                  href="./destination"
                >
                  <h3 className="text-2xl font-bold">Get started →</h3>
                </Link>
                <p className="text-center text-2xl bg-black text-[#334155]">
                  {session && <span>Welcome, {session.user?.name}!</span>}
                </p>
              </div>
            </div>
          </div>


        </div>
      </main>
    </HydrateClient>
  );
}
