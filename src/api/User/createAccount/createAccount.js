import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      // 첫번째 인자인 'root'는 뭐하는 놈인가?
      console.log("------------createAccount-----------");
      const { username, email, firstName = "", lastName = "", bio = "" } = args;
      const exists = await prisma.$exists.user({ username });
      if (exists) {
        throw Error("Already you have signed");
      }
      await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio
      });
      return true;
    }
  }
};
