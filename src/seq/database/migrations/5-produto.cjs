module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Produto", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        allowNull: false,
        type: Sequelize.VARCHAR(255),
      },
      preco: {
        allowNull: false,
        type: Sequelize.DECIMAL(12, 2),
      },
      estoque: {
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
    await queryInterface.dropTable("Produto");
  },
};
