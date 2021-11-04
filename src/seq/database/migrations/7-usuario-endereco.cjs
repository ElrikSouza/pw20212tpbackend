module.exports = {
  up: async (queryInterface, _) => {
    await queryInterface.addConstraint("Endereco", {
      fields: ["usuarioId"],
      type: "foreign key",
      name: "enderecoFk",
      references: {
        table: "Usuario",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, _) => {
    await queryInterface.removeConstraint("Endereco", "enderecoFk");
  },
};
