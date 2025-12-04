import { app } from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/database";

const startServer = async () => {
  await connectDB();
  app.listen(env.PORT);
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
};

startServer();