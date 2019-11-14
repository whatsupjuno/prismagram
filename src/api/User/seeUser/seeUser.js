import { prisma } from "../../../../generated/prisma-client";

 export default {
   Query: {
    seeUser: async (_, args) => {
      console.log("----------seeUser----------")
        const { id } = args;
        return prisma.user({ id });
    }}
  };