module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("CompraItem", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      compraId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      produtoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantidade: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, _) => {
    await queryInterface.dropTable("CompraItem");
  },
};
