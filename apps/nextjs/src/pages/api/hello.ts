import { appRouter, createTRPCContext } from "@acme/api";
import { createOpenApiNextHandler } from "trpc-openapi";
import cors from 'nextjs-cors'
import { NextApiRequest, NextApiResponse } from "next";


export default function (req: NextApiRequest, res: NextApiResponse) {
  // Enable cors
//   await cors(req, res);

  
res.status(200).json({hello: 'hello API'})
};

