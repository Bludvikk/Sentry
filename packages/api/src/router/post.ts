import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { ViewSalesSchema } from "../../../db/prisma/generated/zod";

import { router, publicProcedure } from "../trpc";

export const salesRouter = router({
  list: publicProcedure
  .meta({ openapi: { method: 'GET', path: '/sales'}})
  .input( z.void())
  .output(z.object({sales: z.array(ViewSalesSchema)}))

  .query( async ({ ctx }) => {

    // const result = await ctx.prisma.viewSales.findFirst()
    const result = await ctx.prisma.viewSales.findMany()
    
    if (!result) {
      throw new TRPCError({message: 'Sales not found', code: 'NOT_FOUND'})
    }

// const  {payment, ...rest} = result

    return {sales: result}

  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.viewSales.findFirst({ where: { id: input.id } });
    }),
  create: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/sales'}})
    .input(
      ViewSalesSchema
    ).output(
      z.object({
        message: z.string()
      })
    )
    .mutation( async ({ ctx, input }) => {
      try {
        const {} = input;
      await ctx.prisma.viewSales.create({ data: input }
      );
      return {
        message: 'Success'
      }
      } catch (error) {
        throw new TRPCError({message: 'Cannot post Sales Record', code: 'BAD_REQUEST'})
      }
      
    }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.viewSales.delete({ where: { id: input } });
  }),
});
