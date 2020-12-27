export const getSafeUser = (user) => {
    const safeUser = { ...user.dataValues };
    delete safeUser.password;
    delete safeUser.refreshToken;

    return safeUser;
};
