export const up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
        created_at: { allowNull: false, type: Sequelize.DATE },
        email: { allowNull: false, type: Sequelize.STRING, unique: true },
        first_name: { type: Sequelize.STRING },
        id: {
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID,
        },
        is_active: { defaultValue: false, type: Sequelize.BOOLEAN },
        is_admin: { defaultValue: false, type: Sequelize.BOOLEAN },
        last_name: { type: Sequelize.STRING },
        password: { defaultValue: null, type: Sequelize.STRING },
        password_expiry: { type: Sequelize.DATE },
        refresh_token: { type: Sequelize.STRING },
        refresh_token_expiry: { type: Sequelize.DATE },
        signup_token: { defaultValue: Sequelize.UUIDV4, type: Sequelize.UUID },
        updated_at: { allowNull: false, type: Sequelize.DATE },
    });
};

export const down = async (queryInterface) => {
    await queryInterface.dropTable('user');
};
