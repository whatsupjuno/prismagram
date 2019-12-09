import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";

import { uploadMiddleware, uploadController } from "./upload";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import "./env";

import schema from "./schema";
import "./passport";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }) // resolver 끼리 정보를 공유할 때 context를 사용
});

server.express.use(logger("dev")); //grapql에는 express server가 내장되어 있다, middle ware는 이렇게 추가!
server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadMiddleware, uploadController);

server.start({ port: PORT }, () =>
  console.log(`Server running on  http://localhost:${PORT}`)
);
