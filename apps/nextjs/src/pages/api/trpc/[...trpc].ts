import { appRouter, createTRPCContext } from "@acme/api";
import cors from 'nextjs-cors'
import { NextApiRequest, NextApiResponse } from "next";
import { createNextApiHandler } from "@trpc/server/adapters/next";

export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
});

