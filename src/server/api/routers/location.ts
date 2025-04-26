import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { searches } from "~/server/db/schema";

export const locationRouter = createTRPCRouter({
  createSearch: protectedProcedure
    .input(z.object({ location: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(searches).values({
        location: input.location,
        createdById: ctx.session.user.id,
      });
    }),
});
