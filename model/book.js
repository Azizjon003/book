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
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
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
  });
  return book;
};

module.exports = book;
