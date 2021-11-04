module.exports = {
  up: async (queryInterface, _) => {
    await queryInterface.addConstraint("Compra", {
      fields: ["usuarioId"],
      type: "foreign key",
      name: "compraFk",
      references: {
        table: "Usuario",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, _) => {
    await queryInterface.removeConstraint("Compra", "compraFk");
  },
};
