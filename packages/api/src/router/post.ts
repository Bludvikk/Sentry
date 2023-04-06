import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

const salesSchema = z.object({
  grossSales: z.number(),
  locationCode: z.string(),
  netSales: z.number(),
  profitTotal: z.number(),
  returnTotal: z.number(),
  voidTotal: z.number(),
  tranDate: z.date(),
  payment: z.object({
    code: z.string().default('N/A'),
    amount: z.number().default(0)})
})


export const salesRouter = router({
  list: publicProcedure
  .meta({ openapi: { method: 'GET', path: '/sales'}})
  .input( z.object({
    name: z.string()
  }))
  .output(z.object({sales: z.array(salesSchema)}))

  .query( async ({ ctx }) => {

    console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
    // const result = await ctx.prisma.viewSales.findFirst()
    const result = await ctx.prisma.viewSales.findMany()
    
    if (!result) {
      throw new TRPCError({message: 'Sales not found', code: 'NOT_FOUND'})
    }

// const  {payment, ...rest} = result

    return {sales: result}

    // const {  id, grossSales, locationCode, netSales, profitTotal, voidTotal, returnTotal, tranDate, payment  } = result
    
    // return {id, grossSales, locationCode, netSales, profitTotal, returnTotal, voidTotal, tranDate, payment}
    
    
    // return { grossSales: result ? result.grossSales : 0}
//     return {
//       grossSales: 13212,
//       // locationCode: "Quezon City",
//       // netSales: 1312310,
//       // profitTotal: 2312310,
//       // returnTotal: 1123120,
//       // tranDate: "2023-03-24T00:00:00.000Z",
//       // voidTotal: 11231230,
//       // payment: {
//       //   code: "Gcash",
//       //   amount: 10021321312300
//       // }
// }
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.viewSales.findFirst({ where: { id: input.id } });
    }),
  create: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/sales'}})
    .input(
     salesSchema
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
