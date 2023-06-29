import { Neo4jGraphQL } from '@neo4j/graphql';
import { ApolloServer, gql } from 'apollo-server';
import 'dotenv/config'
import Neo4j, { Driver} from 'neo4j-driver'

const { URI, USERNAME, PASSWORD } = process.env;
const driver: Driver = Neo4j.driver(URI, Neo4j.auth.basic(USERNAME, PASSWORD));

const typeDefs = gql`
  type Contact {
    id: ID
    first: String
    last: String
    avatar: String
    twitter: String
    notes: String
    favorite: Boolean
    knows: [Contact!]! @relationship(type: "KNOWS", direction: OUT)
    friendCount: Int @cypher(statement:"RETURN SIZE((this)-[:KNOWS]->(:Contact))")
  }
`;

const neo4jGraphQL = new Neo4jGraphQL({
  typeDefs,
  driver
});


neo4jGraphQL.getSchema().then((schema) => {
  // Create ApolloServer instance to serve GraphQL schema
  const server = new ApolloServer({
    schema,
    context: { driverConfig: { database: 'neo4j' } } 
  });

  // Start ApolloServer
  server.listen().then(({ url }) => {
    console.log(`GraphQL server ready at ${url}`);
  });
})

//TODO: update to Apollo V4, based on: https://neo4j.com/docs/graphql-manual/current/