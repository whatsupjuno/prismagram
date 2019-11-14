import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        toggleLike: async (_, args, { request }) => {
          console.log("----------toggleLike----------")
            isAuthenticated(request); // 로그인 체크, 로그인이 안되어있다면 여기서 종료
            const { postId } = args;
            const { user } = request;
            const filterOptions = {
                AND: [
                  {
                    user: {
                      id: user.id
                    }
                },
                {
                  post: {
                    id: postId
                  }
                }
              ]
            };
            try {
              const existingLike = await prisma.$exists.like(filterOptions);
              if (existingLike) {
                await prisma.deleteManyLikes(filterOptions);
            } else {
                await prisma.createLike({
                  user: {
                   connect: {
                     id: user.id
                   }
                 },
                 post: {
                   connect: {
                     id: postId
                   }
                 }
               });
             }
             return true;
           } catch {
             return false;
           }
         }
       }
     };