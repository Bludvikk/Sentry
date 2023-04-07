import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export type JsonValueType = z.infer<typeof JsonValue>;

export const NullableJsonValue = z
  .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

export type InputJsonValueType = z.infer<typeof InputJsonValue>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((v) => transformJsonNull(v));

export const SalesScalarFieldEnumSchema = z.enum(['id','grossSales','locationCode','netSales','profitTotal','returnTotal','tranDate','voidTotal','payment']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const ViewSalesScalarFieldEnumSchema = z.enum(['id','grossSales','locationCode','netSales','profitTotal','returnTotal','tranDate','voidTotal','payment']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// SALES SCHEMA
/////////////////////////////////////////

export const SalesSchema = z.object({
  id: z.string().cuid(),
  grossSales: z.number().int(),
  locationCode: z.string(),
  netSales: z.number().int(),
  profitTotal: z.number().int(),
  returnTotal: z.number().int(),
  tranDate: z.coerce.date(),
  voidTotal: z.number().int(),
  payment: NullableJsonValue.optional(),
})

export type Sales = z.infer<typeof SalesSchema>

/////////////////////////////////////////
// VIEW SALES SCHEMA
/////////////////////////////////////////

export const ViewSalesSchema = z.object({
  id: z.string().cuid(),
  grossSales: z.number().int(),
  locationCode: z.string(),
  netSales: z.number().int(),
  profitTotal: z.number().int(),
  returnTotal: z.number().int(),
  tranDate: z.coerce.date(),
  voidTotal: z.number().int(),
  payment: NullableJsonValue.optional(),
})

export type ViewSales = z.infer<typeof ViewSalesSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// SALES
//------------------------------------------------------

export const SalesSelectSchema: z.ZodType<Prisma.SalesSelect> = z.object({
  id: z.boolean().optional(),
  grossSales: z.boolean().optional(),
  locationCode: z.boolean().optional(),
  netSales: z.boolean().optional(),
  profitTotal: z.boolean().optional(),
  returnTotal: z.boolean().optional(),
  tranDate: z.boolean().optional(),
  voidTotal: z.boolean().optional(),
  payment: z.boolean().optional(),
}).strict()

// VIEW SALES
//------------------------------------------------------

export const ViewSalesSelectSchema: z.ZodType<Prisma.ViewSalesSelect> = z.object({
  id: z.boolean().optional(),
  grossSales: z.boolean().optional(),
  locationCode: z.boolean().optional(),
  netSales: z.boolean().optional(),
  profitTotal: z.boolean().optional(),
  returnTotal: z.boolean().optional(),
  tranDate: z.boolean().optional(),
  voidTotal: z.boolean().optional(),
  payment: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const SalesWhereInputSchema: z.ZodType<Prisma.SalesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SalesWhereInputSchema),z.lazy(() => SalesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SalesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SalesWhereInputSchema),z.lazy(() => SalesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  grossSales: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  locationCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  netSales: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  profitTotal: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  returnTotal: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  tranDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  voidTotal: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  payment: z.lazy(() => JsonNullableFilterSchema).optional()
}).strict();

export const SalesOrderByWithRelationInputSchema: z.ZodType<Prisma.SalesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  grossSales: z.lazy(() => SortOrderSchema).optional(),
  locationCode: z.lazy(() => SortOrderSchema).optional(),
  netSales: z.lazy(() => SortOrderSchema).optional(),
  profitTotal: z.lazy(() => SortOrderSchema).optional(),
  returnTotal: z.lazy(() => SortOrderSchema).optional(),
  tranDate: z.lazy(() => SortOrderSchema).optional(),
  voidTotal: z.lazy(() => SortOrderSchema).optional(),
  payment: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SalesWhereUniqueInputSchema: z.ZodType<Prisma.SalesWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const SalesOrderByWithAggregationInputSchema: z.ZodType<Prisma.SalesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  grossSales: z.lazy(() => SortOrderSchema).optional(),
  locationCode: z.lazy(() => SortOrderSchema).optional(),
  netSales: z.lazy(() => SortOrderSchema).optional(),
  profitTotal: z.lazy(() => SortOrderSchema).optional(),
  returnTotal: z.lazy(() => SortOrderSchema).optional(),
  tranDate: z.lazy(() => SortOrderSchema).optional(),
  voidTotal: z.lazy(() => SortOrderSchema).optional(),
  payment: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SalesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SalesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SalesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SalesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SalesSumOrderByAggregateInputSchema).optional()
}).strict();

export const SalesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SalesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SalesScalarWhereWithAggregatesInputSchema),z.lazy(() => SalesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SalesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SalesScalarWhereWithAggregatesInputSchema),z.lazy(() => SalesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  grossSales: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  locationCode: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  netSales: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  profitTotal: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  returnTotal: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  tranDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  voidTotal: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  payment: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional()
}).strict();

export const ViewSalesWhereInputSchema: z.ZodType<Prisma.ViewSalesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ViewSalesWhereInputSchema),z.lazy(() => ViewSalesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ViewSalesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ViewSalesWhereInputSchema),z.lazy(() => ViewSalesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  grossSales: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  locationCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  netSales: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  profitTotal: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  returnTotal: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  tranDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  voidTotal: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  payment: z.lazy(() => JsonNullableFilterSchema).optional()
}).strict();

export const ViewSalesOrderByWithRelationInputSchema: z.ZodType<Prisma.ViewSalesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  grossSales: z.lazy(() => SortOrderSchema).optional(),
  locationCode: z.lazy(() => SortOrderSchema).optional(),
  netSales: z.lazy(() => SortOrderSchema).optional(),
  profitTotal: z.lazy(() => SortOrderSchema).optional(),
  returnTotal: z.lazy(() => SortOrderSchema).optional(),
  tranDate: z.lazy(() => SortOrderSchema).optional(),
  voidTotal: z.lazy(() => SortOrderSchema).optional(),
  payment: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ViewSalesWhereUniqueInputSchema: z.ZodType<Prisma.ViewSalesWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const ViewSalesOrderByWithAggregationInputSchema: z.ZodType<Prisma.ViewSalesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  grossSales: z.lazy(() => SortOrderSchema).optional(),
  locationCode: z.lazy(() => SortOrderSchema).optional(),
  netSales: z.lazy(() => SortOrderSchema).optional(),
  profitTotal: z.lazy(() => SortOrderSchema).optional(),
  returnTotal: z.lazy(() => SortOrderSchema).optional(),
  tranDate: z.lazy(() => SortOrderSchema).optional(),
  voidTotal: z.lazy(() => SortOrderSchema).optional(),
  payment: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ViewSalesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ViewSalesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ViewSalesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ViewSalesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ViewSalesSumOrderByAggregateInputSchema).optional()
}).strict();

export const ViewSalesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ViewSalesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ViewSalesScalarWhereWithAggregatesInputSchema),z.lazy(() => ViewSalesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ViewSalesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ViewSalesScalarWhereWithAggregatesInputSchema),z.lazy(() => ViewSalesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  grossSales: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  locationCode: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  netSales: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  profitTotal: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  returnTotal: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  tranDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  voidTotal: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  payment: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional()
}).strict();

export const SalesCreateInputSchema: z.ZodType<Prisma.SalesCreateInput> = z.object({
  id: z.string().cuid().optional(),
  grossSales: z.number().int(),
  locationCode: z.string(),
  netSales: z.number().int(),
  profitTotal: z.number().int(),
  returnTotal: z.number().int(),
  tranDate: z.coerce.date(),
  voidTotal: z.number().int(),
  payment: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const SalesUncheckedCreateInputSchema: z.ZodType<Prisma.SalesUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  grossSales: z.number().int(),
  locationCode: z.string(),
  netSales: z.number().int(),
  profitTotal: z.number().int(),
  returnTotal: z.number().int(),
  tranDate: z.coerce.date(),
  voidTotal: z.number().int(),
  payment: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const SalesUpdateInputSchema: z.ZodType<Prisma.SalesUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grossSales: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  locationCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  netSales: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profitTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  returnTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tranDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  voidTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  payment: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const SalesUncheckedUpdateInputSchema: z.ZodType<Prisma.SalesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grossSales: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  locationCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  netSales: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profitTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  returnTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tranDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  voidTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  payment: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const SalesCreateManyInputSchema: z.ZodType<Prisma.SalesCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  grossSales: z.number().int(),
  locationCode: z.string(),
  netSales: z.number().int(),
  profitTotal: z.number().int(),
  returnTotal: z.number().int(),
  tranDate: z.coerce.date(),
  voidTotal: z.number().int(),
  payment: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const SalesUpdateManyMutationInputSchema: z.ZodType<Prisma.SalesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grossSales: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  locationCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  netSales: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profitTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  returnTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tranDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  voidTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  payment: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const SalesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SalesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grossSales: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  locationCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  netSales: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profitTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  returnTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tranDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  voidTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  payment: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const ViewSalesCreateInputSchema: z.ZodType<Prisma.ViewSalesCreateInput> = z.object({
  id: z.string().cuid().optional(),
  grossSales: z.number().int(),
  locationCode: z.string(),
  netSales: z.number().int(),
  profitTotal: z.number().int(),
  returnTotal: z.number().int(),
  tranDate: z.coerce.date(),
  voidTotal: z.number().int(),
  payment: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const ViewSalesUncheckedCreateInputSchema: z.ZodType<Prisma.ViewSalesUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  grossSales: z.number().int(),
  locationCode: z.string(),
  netSales: z.number().int(),
  profitTotal: z.number().int(),
  returnTotal: z.number().int(),
  tranDate: z.coerce.date(),
  voidTotal: z.number().int(),
  payment: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const ViewSalesUpdateInputSchema: z.ZodType<Prisma.ViewSalesUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grossSales: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  locationCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  netSales: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profitTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  returnTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tranDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  voidTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  payment: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const ViewSalesUncheckedUpdateInputSchema: z.ZodType<Prisma.ViewSalesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grossSales: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  locationCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  netSales: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profitTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  returnTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tranDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  voidTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  payment: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const ViewSalesCreateManyInputSchema: z.ZodType<Prisma.ViewSalesCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  grossSales: z.number().int(),
  locationCode: z.string(),
  netSales: z.number().int(),
  profitTotal: z.number().int(),
  returnTotal: z.number().int(),
  tranDate: z.coerce.date(),
  voidTotal: z.number().int(),
  payment: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const ViewSalesUpdateManyMutationInputSchema: z.ZodType<Prisma.ViewSalesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grossSales: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  locationCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  netSales: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profitTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  returnTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tranDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  voidTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  payment: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const ViewSalesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ViewSalesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grossSales: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  locationCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  netSales: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profitTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  returnTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tranDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  voidTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  payment: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const SalesCountOrderByAggregateInputSchema: z.ZodType<Prisma.SalesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  grossSales: z.lazy(() => SortOrderSchema).optional(),
  locationCode: z.lazy(() => SortOrderSchema).optional(),
  netSales: z.lazy(() => SortOrderSchema).optional(),
  profitTotal: z.lazy(() => SortOrderSchema).optional(),
  returnTotal: z.lazy(() => SortOrderSchema).optional(),
  tranDate: z.lazy(() => SortOrderSchema).optional(),
  voidTotal: z.lazy(() => SortOrderSchema).optional(),
  payment: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SalesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SalesAvgOrderByAggregateInput> = z.object({
  grossSales: z.lazy(() => SortOrderSchema).optional(),
  netSales: z.lazy(() => SortOrderSchema).optional(),
  profitTotal: z.lazy(() => SortOrderSchema).optional(),
  returnTotal: z.lazy(() => SortOrderSchema).optional(),
  voidTotal: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SalesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SalesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  grossSales: z.lazy(() => SortOrderSchema).optional(),
  locationCode: z.lazy(() => SortOrderSchema).optional(),
  netSales: z.lazy(() => SortOrderSchema).optional(),
  profitTotal: z.lazy(() => SortOrderSchema).optional(),
  returnTotal: z.lazy(() => SortOrderSchema).optional(),
  tranDate: z.lazy(() => SortOrderSchema).optional(),
  voidTotal: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SalesMinOrderByAggregateInputSchema: z.ZodType<Prisma.SalesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  grossSales: z.lazy(() => SortOrderSchema).optional(),
  locationCode: z.lazy(() => SortOrderSchema).optional(),
  netSales: z.lazy(() => SortOrderSchema).optional(),
  profitTotal: z.lazy(() => SortOrderSchema).optional(),
  returnTotal: z.lazy(() => SortOrderSchema).optional(),
  tranDate: z.lazy(() => SortOrderSchema).optional(),
  voidTotal: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SalesSumOrderByAggregateInputSchema: z.ZodType<Prisma.SalesSumOrderByAggregateInput> = z.object({
  grossSales: z.lazy(() => SortOrderSchema).optional(),
  netSales: z.lazy(() => SortOrderSchema).optional(),
  profitTotal: z.lazy(() => SortOrderSchema).optional(),
  returnTotal: z.lazy(() => SortOrderSchema).optional(),
  voidTotal: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
}).strict();

export const ViewSalesCountOrderByAggregateInputSchema: z.ZodType<Prisma.ViewSalesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  grossSales: z.lazy(() => SortOrderSchema).optional(),
  locationCode: z.lazy(() => SortOrderSchema).optional(),
  netSales: z.lazy(() => SortOrderSchema).optional(),
  profitTotal: z.lazy(() => SortOrderSchema).optional(),
  returnTotal: z.lazy(() => SortOrderSchema).optional(),
  tranDate: z.lazy(() => SortOrderSchema).optional(),
  voidTotal: z.lazy(() => SortOrderSchema).optional(),
  payment: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ViewSalesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ViewSalesAvgOrderByAggregateInput> = z.object({
  grossSales: z.lazy(() => SortOrderSchema).optional(),
  netSales: z.lazy(() => SortOrderSchema).optional(),
  profitTotal: z.lazy(() => SortOrderSchema).optional(),
  returnTotal: z.lazy(() => SortOrderSchema).optional(),
  voidTotal: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ViewSalesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ViewSalesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  grossSales: z.lazy(() => SortOrderSchema).optional(),
  locationCode: z.lazy(() => SortOrderSchema).optional(),
  netSales: z.lazy(() => SortOrderSchema).optional(),
  profitTotal: z.lazy(() => SortOrderSchema).optional(),
  returnTotal: z.lazy(() => SortOrderSchema).optional(),
  tranDate: z.lazy(() => SortOrderSchema).optional(),
  voidTotal: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ViewSalesMinOrderByAggregateInputSchema: z.ZodType<Prisma.ViewSalesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  grossSales: z.lazy(() => SortOrderSchema).optional(),
  locationCode: z.lazy(() => SortOrderSchema).optional(),
  netSales: z.lazy(() => SortOrderSchema).optional(),
  profitTotal: z.lazy(() => SortOrderSchema).optional(),
  returnTotal: z.lazy(() => SortOrderSchema).optional(),
  tranDate: z.lazy(() => SortOrderSchema).optional(),
  voidTotal: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ViewSalesSumOrderByAggregateInputSchema: z.ZodType<Prisma.ViewSalesSumOrderByAggregateInput> = z.object({
  grossSales: z.lazy(() => SortOrderSchema).optional(),
  netSales: z.lazy(() => SortOrderSchema).optional(),
  profitTotal: z.lazy(() => SortOrderSchema).optional(),
  returnTotal: z.lazy(() => SortOrderSchema).optional(),
  voidTotal: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const SalesFindFirstArgsSchema: z.ZodType<Prisma.SalesFindFirstArgs> = z.object({
  select: SalesSelectSchema.optional(),
  where: SalesWhereInputSchema.optional(),
  orderBy: z.union([ SalesOrderByWithRelationInputSchema.array(),SalesOrderByWithRelationInputSchema ]).optional(),
  cursor: SalesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SalesScalarFieldEnumSchema.array().optional(),
}).strict()

export const SalesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SalesFindFirstOrThrowArgs> = z.object({
  select: SalesSelectSchema.optional(),
  where: SalesWhereInputSchema.optional(),
  orderBy: z.union([ SalesOrderByWithRelationInputSchema.array(),SalesOrderByWithRelationInputSchema ]).optional(),
  cursor: SalesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SalesScalarFieldEnumSchema.array().optional(),
}).strict()

export const SalesFindManyArgsSchema: z.ZodType<Prisma.SalesFindManyArgs> = z.object({
  select: SalesSelectSchema.optional(),
  where: SalesWhereInputSchema.optional(),
  orderBy: z.union([ SalesOrderByWithRelationInputSchema.array(),SalesOrderByWithRelationInputSchema ]).optional(),
  cursor: SalesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SalesScalarFieldEnumSchema.array().optional(),
}).strict()

export const SalesAggregateArgsSchema: z.ZodType<Prisma.SalesAggregateArgs> = z.object({
  where: SalesWhereInputSchema.optional(),
  orderBy: z.union([ SalesOrderByWithRelationInputSchema.array(),SalesOrderByWithRelationInputSchema ]).optional(),
  cursor: SalesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SalesGroupByArgsSchema: z.ZodType<Prisma.SalesGroupByArgs> = z.object({
  where: SalesWhereInputSchema.optional(),
  orderBy: z.union([ SalesOrderByWithAggregationInputSchema.array(),SalesOrderByWithAggregationInputSchema ]).optional(),
  by: SalesScalarFieldEnumSchema.array(),
  having: SalesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SalesFindUniqueArgsSchema: z.ZodType<Prisma.SalesFindUniqueArgs> = z.object({
  select: SalesSelectSchema.optional(),
  where: SalesWhereUniqueInputSchema,
}).strict()

export const SalesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SalesFindUniqueOrThrowArgs> = z.object({
  select: SalesSelectSchema.optional(),
  where: SalesWhereUniqueInputSchema,
}).strict()

export const ViewSalesFindFirstArgsSchema: z.ZodType<Prisma.ViewSalesFindFirstArgs> = z.object({
  select: ViewSalesSelectSchema.optional(),
  where: ViewSalesWhereInputSchema.optional(),
  orderBy: z.union([ ViewSalesOrderByWithRelationInputSchema.array(),ViewSalesOrderByWithRelationInputSchema ]).optional(),
  cursor: ViewSalesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ViewSalesScalarFieldEnumSchema.array().optional(),
}).strict()

export const ViewSalesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ViewSalesFindFirstOrThrowArgs> = z.object({
  select: ViewSalesSelectSchema.optional(),
  where: ViewSalesWhereInputSchema.optional(),
  orderBy: z.union([ ViewSalesOrderByWithRelationInputSchema.array(),ViewSalesOrderByWithRelationInputSchema ]).optional(),
  cursor: ViewSalesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ViewSalesScalarFieldEnumSchema.array().optional(),
}).strict()

export const ViewSalesFindManyArgsSchema: z.ZodType<Prisma.ViewSalesFindManyArgs> = z.object({
  select: ViewSalesSelectSchema.optional(),
  where: ViewSalesWhereInputSchema.optional(),
  orderBy: z.union([ ViewSalesOrderByWithRelationInputSchema.array(),ViewSalesOrderByWithRelationInputSchema ]).optional(),
  cursor: ViewSalesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ViewSalesScalarFieldEnumSchema.array().optional(),
}).strict()

export const ViewSalesAggregateArgsSchema: z.ZodType<Prisma.ViewSalesAggregateArgs> = z.object({
  where: ViewSalesWhereInputSchema.optional(),
  orderBy: z.union([ ViewSalesOrderByWithRelationInputSchema.array(),ViewSalesOrderByWithRelationInputSchema ]).optional(),
  cursor: ViewSalesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ViewSalesGroupByArgsSchema: z.ZodType<Prisma.ViewSalesGroupByArgs> = z.object({
  where: ViewSalesWhereInputSchema.optional(),
  orderBy: z.union([ ViewSalesOrderByWithAggregationInputSchema.array(),ViewSalesOrderByWithAggregationInputSchema ]).optional(),
  by: ViewSalesScalarFieldEnumSchema.array(),
  having: ViewSalesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ViewSalesFindUniqueArgsSchema: z.ZodType<Prisma.ViewSalesFindUniqueArgs> = z.object({
  select: ViewSalesSelectSchema.optional(),
  where: ViewSalesWhereUniqueInputSchema,
}).strict()

export const ViewSalesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ViewSalesFindUniqueOrThrowArgs> = z.object({
  select: ViewSalesSelectSchema.optional(),
  where: ViewSalesWhereUniqueInputSchema,
}).strict()

export const SalesCreateArgsSchema: z.ZodType<Prisma.SalesCreateArgs> = z.object({
  select: SalesSelectSchema.optional(),
  data: z.union([ SalesCreateInputSchema,SalesUncheckedCreateInputSchema ]),
}).strict()

export const SalesUpsertArgsSchema: z.ZodType<Prisma.SalesUpsertArgs> = z.object({
  select: SalesSelectSchema.optional(),
  where: SalesWhereUniqueInputSchema,
  create: z.union([ SalesCreateInputSchema,SalesUncheckedCreateInputSchema ]),
  update: z.union([ SalesUpdateInputSchema,SalesUncheckedUpdateInputSchema ]),
}).strict()

export const SalesCreateManyArgsSchema: z.ZodType<Prisma.SalesCreateManyArgs> = z.object({
  data: z.union([ SalesCreateManyInputSchema,SalesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SalesDeleteArgsSchema: z.ZodType<Prisma.SalesDeleteArgs> = z.object({
  select: SalesSelectSchema.optional(),
  where: SalesWhereUniqueInputSchema,
}).strict()

export const SalesUpdateArgsSchema: z.ZodType<Prisma.SalesUpdateArgs> = z.object({
  select: SalesSelectSchema.optional(),
  data: z.union([ SalesUpdateInputSchema,SalesUncheckedUpdateInputSchema ]),
  where: SalesWhereUniqueInputSchema,
}).strict()

export const SalesUpdateManyArgsSchema: z.ZodType<Prisma.SalesUpdateManyArgs> = z.object({
  data: z.union([ SalesUpdateManyMutationInputSchema,SalesUncheckedUpdateManyInputSchema ]),
  where: SalesWhereInputSchema.optional(),
}).strict()

export const SalesDeleteManyArgsSchema: z.ZodType<Prisma.SalesDeleteManyArgs> = z.object({
  where: SalesWhereInputSchema.optional(),
}).strict()

export const ViewSalesCreateArgsSchema: z.ZodType<Prisma.ViewSalesCreateArgs> = z.object({
  select: ViewSalesSelectSchema.optional(),
  data: z.union([ ViewSalesCreateInputSchema,ViewSalesUncheckedCreateInputSchema ]),
}).strict()

export const ViewSalesUpsertArgsSchema: z.ZodType<Prisma.ViewSalesUpsertArgs> = z.object({
  select: ViewSalesSelectSchema.optional(),
  where: ViewSalesWhereUniqueInputSchema,
  create: z.union([ ViewSalesCreateInputSchema,ViewSalesUncheckedCreateInputSchema ]),
  update: z.union([ ViewSalesUpdateInputSchema,ViewSalesUncheckedUpdateInputSchema ]),
}).strict()

export const ViewSalesCreateManyArgsSchema: z.ZodType<Prisma.ViewSalesCreateManyArgs> = z.object({
  data: z.union([ ViewSalesCreateManyInputSchema,ViewSalesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ViewSalesDeleteArgsSchema: z.ZodType<Prisma.ViewSalesDeleteArgs> = z.object({
  select: ViewSalesSelectSchema.optional(),
  where: ViewSalesWhereUniqueInputSchema,
}).strict()

export const ViewSalesUpdateArgsSchema: z.ZodType<Prisma.ViewSalesUpdateArgs> = z.object({
  select: ViewSalesSelectSchema.optional(),
  data: z.union([ ViewSalesUpdateInputSchema,ViewSalesUncheckedUpdateInputSchema ]),
  where: ViewSalesWhereUniqueInputSchema,
}).strict()

export const ViewSalesUpdateManyArgsSchema: z.ZodType<Prisma.ViewSalesUpdateManyArgs> = z.object({
  data: z.union([ ViewSalesUpdateManyMutationInputSchema,ViewSalesUncheckedUpdateManyInputSchema ]),
  where: ViewSalesWhereInputSchema.optional(),
}).strict()

export const ViewSalesDeleteManyArgsSchema: z.ZodType<Prisma.ViewSalesDeleteManyArgs> = z.object({
  where: ViewSalesWhereInputSchema.optional(),
}).strict()