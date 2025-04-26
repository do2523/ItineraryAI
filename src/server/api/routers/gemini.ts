import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const geminiRouter = createTRPCRouter({
  prompt: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .query(async ({ input }) => {
      const result = await model.generateContent([input.prompt]);
      return result.response.text();
    }),
});
