module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Produto", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      img_filename: {
        allowNull: true,
        type: Sequelize.STRING(120),
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING(255),
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
