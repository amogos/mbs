const db = require("./model_sequelize");
const { Sequelize } = require("sequelize");

const AuthorModel = db.define(
  "author",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id"
    },
    name: { type: Sequelize.STRING, field: "name" }
  },
  {
    freezeTableName: false,
    timestamps: false,
    underscored: false,
    tableName: "authors"
  }
);

const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

module.exports = {
  AuthorModel,
  AuthorType
};
