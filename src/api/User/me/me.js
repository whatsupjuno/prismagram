import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        me: async (_, args, { request, isAuthenticated }) => {
          console.log("----------me----------")
            isAuthenticated(request);
            const { user } = request;
            const userProfile = await prisma.user({ id: user.id });
            const posts = await prisma.user({ id: user.id }).posts();
            // const posts = await prisma.user({ id: user.id }).$fragment(USER_FRAGMENT)
            return {
                user: userProfile,
                posts
            };
        }
    },
    // User: {
    //   fullName: parent => {
    //     console.log(parent)
    //     return `${parent.firstName} ${parent.lastName}`;
    //   }
    // },
    // Post: {
    //   idislike: parent => {
    //     console.log(parent)
    //     return `${parent.id} ${parent.location}`
    //   }
    // }
}