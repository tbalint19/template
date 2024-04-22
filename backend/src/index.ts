import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors'
import { authPlugin } from "./plugin/auth";
import { demo } from "./routes/demo";

const api = new Elysia()
  .use(cors())
  .use(authPlugin)
  .use(demo)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${api.server?.hostname}:${api.server?.port}`
);

export type API = typeof api
