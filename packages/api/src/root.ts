import { authRouter } from "./router/auth";
import { salesRouter } from "./router/sales";
import { router } from "./trpc";


export const appRouter = router({
  sales: salesRouter,
  auth: authRouter,

});

// export type definition of API
export type AppRouter = typeof appRouter;


