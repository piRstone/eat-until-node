export const up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product', {
        created_at: { allowNull: false, type: Sequelize.DATE },
        ean13: { defaultValue: null, type: Sequelize.STRING },
        expiration_date: { allowNull: false, type: Sequelize.DATE },
        id: {
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID,
        },
        inventory_id: {
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                key: 'id',
                model: 'inventory',
            },
            type: Sequelize.UUID,
        },
        name: { allowNull: false, type: Sequelize.STRING },
        notification_date: { defaultValue: null, type: Sequelize.DATE },
        notification_delay: { defaultValue: 3, type: Sequelize.INTEGER },
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
    await queryInterface.dropTable('product');
};
