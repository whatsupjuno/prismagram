import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        searchPost: async (_, args) => {
            console.log("----------searchPost----------")
            return await prisma.posts({
                where: {
                    OR: [
                        { location_starts_with: args.term }, //starts_with는 args.term으로 시작하는 것 검색
                        { caption_starts_with: args.term }
                    ]
                }
            })
        }
    }
};
