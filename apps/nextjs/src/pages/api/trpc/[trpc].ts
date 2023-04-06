import { createNextApiHandler } from "@trpc/server/adapters/next";

import { appRouter, createTRPCContext } from "@acme/api";
import { createOpenApiNextHandler } from "trpc-openapi";
import cors from 'nextjs-cors'
import { NextApiRequest, NextApiResponse } from "next";

// export API handler
// export default createOpenApiNextHandler({
//   router: appRouter,
//   createContext: createTRPCContext,
// });

// If you need to enable cors, you can do so like this:
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
