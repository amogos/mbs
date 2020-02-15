const db = require("./model_sequelize");
const { Sequelize } = require("sequelize");
const { AuthorModel, AuthorType } = require("./author_model");

const BookModel = db.define(
  "book",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id"
    },
    title: { type: Sequelize.STRING, field: "title" },
    authorId: {
      type: Sequelize.INTEGER,
      references: {
        model: AuthorModel,
        key: "id"
      }
    }
  },
  {
    freezeTableName: false,
    timestamps: false,
    underscored: false,
    tableName: "books"
  }
);

AuthorModel.hasOne(BookModel);
BookModel.belongsTo(AuthorModel, { through: "authorId" });

const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    authorId: { type: GraphQLID },
    author: { type: AuthorType }
  })
});

module.exports = {
  BookModel,
  BookType
};
