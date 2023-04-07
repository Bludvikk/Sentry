import { appRouter, createTRPCContext } from "@acme/api";
import { createOpenApiNextHandler } from "trpc-openapi";
import cors from 'nextjs-cors'
import { NextApiRequest, NextApiResponse } from "next";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Enable cors
  await cors(req, res);

  // Let the tRPC handler do its magic
  return createOpenApiNextHandler({
    router: appRouter,
    createContext: createTRPCContext,
  })(req, res);
};

export default handler;
