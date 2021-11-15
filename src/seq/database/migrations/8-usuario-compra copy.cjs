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

    await queryInterface.addConstraint("Compra", {
      fields: ["enderecoId"],
      type: "foreign key",
      name: "compraEnderecoFk",
      references: {
        table: "Endereco",
        field: "id",
      },
      onDelete: "restrict",
      onUpdate: "restrict",
    });
  },

  down: async (queryInterface, _) => {
    await queryInterface.removeConstraint("Compra", "compraFk");
    await queryInterface.removeConstraint("Compra", "compraEnderecoFk");
  },
};
