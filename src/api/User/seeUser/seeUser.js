import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args) => {
      console.log("----------seeUser----------");
      const { username } = args;
      console.log(prisma.user({ username }));
      return prisma.user({ username });
    }
  }
};
