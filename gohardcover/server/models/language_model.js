const db = require("./model_sequelize");
const { Sequelize } = require("sequelize");

const LanguageModel = db.define(
  "language",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id"
    },
    title: { type: Sequelize.STRING, field: "title" }
  },
  {
    freezeTableName: false,
    timestamps: false,
    underscored: false,
    tableName: "languages"
  }
);

const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const LanguageType = new GraphQLObjectType({
  name: "Language",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString }
  })
});

module.exports = {
  LanguageModel,
  LanguageType
};
