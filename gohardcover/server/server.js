const express = require("express");
const graphql = require("graphql");
const graphqlHTTP = require("express-graphql");

const { Queries, Mutations } = require("./api");
const { GraphQLSchema } = graphql;

let schema = new GraphQLSchema({ query: Queries, mutation: Mutations });
const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const port = 4000;

app.listen(port, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`
  );
});
