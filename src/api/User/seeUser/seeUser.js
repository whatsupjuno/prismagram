import { prisma } from "../../../../generated/prisma-client";

 export default {
   Query: {
    seeUser: async (_, args) => {
      console.log("----------seeUser----------")
        const { id } = args;
        console.log(prisma.user({ id }))
        return prisma.user({ id });
    }}
  };