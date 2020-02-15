const { LanguageModel, LanguageType } = require("./models/language_model");
const { AuthorModel, AuthorType } = require("./models/author_model");
const { BookModel, BookType } = require("./models/book_model");

const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt
} = graphql;

const language = {
  type: LanguageType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return LanguageModel.findByPk(args.id);
  }
};

const languages = {
  type: new GraphQLList(LanguageType),
  resolve(parent, args) {
    return LanguageModel.findAll();
  }
};

const author = {
  type: AuthorType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return AuthorModel.findByPk(args.id);
  }
};

const authors = {
  type: new GraphQLList(AuthorType),
  resolve(parent, args) {
    return AuthorModel.findAll();
  }
};

const book = {
  type: BookType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return BookModel.findByPk(args.id, {
      include: {
        model: AuthorModel
      }
    });
  }
};

const books = {
  type: new GraphQLList(BookType),
  resolve(parent, args) {
    return BookModel.findAll({
      include: {
        model: AuthorModel
      }
    });
  }
};

const addAuthor = {
  type: AuthorType,
  args: {
    name: { type: GraphQLString }
  },
  resolve(parent, args) {
    return AuthorModel.create({ name: args.name });
  }
};

const updateAuthor = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  },
  resolve(parent, args) {
    return AuthorModel.upsert({ id: args.id, name: args.name });
  }
};

const Queries = new GraphQLObjectType({
  name: "Queries",
  fields: {
    language,
    languages,
    author,
    authors,
    book,
    books
  }
});

const Mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    addAuthor,
    updateAuthor
  }
});

module.exports = {
  Queries,
  Mutations
};
