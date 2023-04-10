import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { SalesSchema } from "@acme/db/prisma/generated/zod";

import { publicProcedure, router } from "../trpc";

export const salesRouter = router({
  opeApiGetList: publicProcedure
    .meta({ openapi: { method: "GET", path: "/sales" } })
    .input(z.void())
    .output(z.object({ sales: z.string() }))
    .query(async ({ ctx }) => {
      const sales = await ctx.prisma.sales.findMany();

      if (!sales) {
        throw new TRPCError({ message: "Sales not found", code: "NOT_FOUND" });
      }

      return { sales: JSON.stringify(sales) };
    }),
  list: publicProcedure
    .output(z.array(SalesSchema) )
    .query(async ({ ctx }) => {
      const sales = await ctx.prisma.sales.findMany();

      if (!sales) {
        throw new TRPCError({ message: "Sales not found", code: "NOT_FOUND" });
      }

      return sales;
    }),
  post: publicProcedure
    .meta({ openapi: { method: "POST", path: "/sales" } })
    .input(
      z.object({
        sales: z.array(SalesSchema.omit({ id: true })),
      }),
    )
    .output(
      z.object({
        message: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.sales.createMany({ data: input.sales });
        return {
          message: "Successfully Posted",
        };
      } catch (error) {
        throw new TRPCError({
          message: "Cannot post Sales Record",
          code: "BAD_REQUEST",
        });
      }
    }),
});
