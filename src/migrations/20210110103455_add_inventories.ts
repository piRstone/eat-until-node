export const up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inventory', {
        created_at: { allowNull: false, type: Sequelize.DATE },
        id: {
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID,
        },
        name: { allowNull: false, type: Sequelize.STRING },
        updated_at: { allowNull: false, type: Sequelize.DATE },
        user_id: {
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                key: 'id',
                model: 'user',
            },
            type: Sequelize.UUID,
        },
    });
};

export const down = async (queryInterface) => {
    await queryInterface.dropTable('inventory');
};
