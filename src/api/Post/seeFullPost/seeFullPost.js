import { prisma } from "../../../../generated/prisma-client";

 export default {
   Query: {
     seeFullPost: async (_, args) => {
      console.log("----------seeFullPost----------")
       const { id } = args;
       return prisma.post({ id })
     }
   }
 };