module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("TipoUsuario", [
      {
        id: 1,
        rotulo: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        rotulo: "ADM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("TipoUsuario", {
      rotulo: ["USER", "ADM"],
    });
  },
};
