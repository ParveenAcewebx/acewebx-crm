module.exports = (sequelize, Sequelize) => {
  const Candidate = sequelize.define(
    "candidates",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      totalExperience: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: false,
      },
      relevantExperience: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
      },
      currentSalary: {
        type: Sequelize.DECIMAL(15, 3),
        allowNull: false,
      },
      expectedSalary: {
        type: Sequelize.DECIMAL(15, 3),
        allowNull: false,
      },
      noticePeriod: {
        type: Sequelize.DECIMAL(2, 0),
        allowNull: true,
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      timestamps: true,
      freezeTableName: true,

      indexes: [
        {
          name: 'email',
          fields: ['email'],
        },
      ],
    }
  );

  return Candidate;
};
