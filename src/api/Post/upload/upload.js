import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    upload: async (_, args, { request, isAuthenticated }) => {
        console.log("-------------upload---------")
      isAuthenticated(request);
      console.log(args)
      const { user } = request;
      const { caption, location, files } = args;
      const post = await prisma.createPost({
        caption,
        location,
        user: { connect: { id: user.id } }
      });
      console.log(post)
      files.forEach(
        async file =>
          await prisma.createFile({
            url: file,
            post: {
              connect: {
                id: post.id
              }
            }
          })
      );
      return post;
    }
  }
};