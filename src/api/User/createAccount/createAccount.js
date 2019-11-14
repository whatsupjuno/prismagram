import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createAccount: async (_, args) => { // 첫번째 인자인 'root'는 뭐하는 놈인가?
            console.log('------------createAccount-----------')
            const { username, email, firstName = "", lastName = "", bio = ""} = args;
            const user = await prisma.createUser({
                username,
                email,
                firstName,
                lastName,
                bio
            });
            return user;
        }
    }
};