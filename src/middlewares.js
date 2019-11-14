export const isAuthenticated = request => {
    console.log("--------isAuthenticated--------")
    if (!request.user) {
        throw Error("You need to login to perform this action");
    }
    return;
};