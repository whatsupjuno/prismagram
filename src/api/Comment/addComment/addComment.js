import { isAuthenticated } from "../../../middlewares";
 import { prisma } from "../../../../generated/prisma-client";

 export default {
   Mutation: {
     addComment: async (_, args, { request }) => {
       isAuthenticated(request); // 로그인 체크, 로그인이 안되어있다면 여기서 종료
       console.log("----------addComment----------")
       const { text, postId } = args;
       const { user } = request;
       const comment = await prisma.createComment({
         user: {
           connect: { // user와 user.id를 연결한다는 의미
             id: user.id
           }
         },
         post: {
           connect: {
             id: postId
           }
         },
         text
       });
       return comment;
     }
   }
 };