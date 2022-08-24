const book = (sequelize, DataTypes) => {
  const book = sequelize.define("books", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    isnb: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 10,
        max: 13,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 20,
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 5,
      },
    },
    firstPubYear: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pageNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["0", "1", "2"],
      defaultValue: "0",
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return book;
};

module.exports = book;
