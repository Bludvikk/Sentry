import { authRouter } from "./router/auth";
import { salesRouter } from "./router/post";
import { router } from "./trpc";


export const appRouter = router({
  post: salesRouter,
  auth: authRouter,

});

// export type definition of API
export type AppRouter = typeof appRouter;


