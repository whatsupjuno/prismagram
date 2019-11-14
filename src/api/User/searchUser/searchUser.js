import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchUser: async (_, args) => 
     prisma.users({
       where: {
         OR: [
           { username_contains: args.term }, //contains는 args.term을 포함하는 것 검색
           { firstName_contains: args.term },
           { lastName_contains: args.term }
         ]
       }
     })
    }
  };

//  export default {
//    Query: {
//      searchUser: async (_, args) =>
//        prisma.users({
//          where: {
//            OR: [
//              { username_contains: args.term }, //contains는 args.term을 포함하는 것 검색
//              { fistName_contains: args.term },
//              { lastName_contains: args.term }
//            ]
//          }
//        })
//    }
//  };