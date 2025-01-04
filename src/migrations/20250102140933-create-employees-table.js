"use strict";

const tableName = "employees";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      department_id: {
        type: Sequelize.UUID,
        references: {
          model: "departments",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "set null",
      },
      hire_date: Sequelize.DATE,
      salary: {
        type: Sequelize.DOUBLE(15, 3),
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(tableName);
  },
};
