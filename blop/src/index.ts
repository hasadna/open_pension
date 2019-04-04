import {ApolloServer, gql} from "apollo-server";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

const books = [
    {
        title: "Harry Potter and the Chamber of Secrets",
        author: "J.K. Rowling",
    },
    {
        title: "Jurassic Park",
        author: "Michael Crichton",
    },
];

const typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }
`;

const resolvers = {
    Query: {
        books: () => books,
    },
};
const server = new ApolloServer({typeDefs, resolvers});

server.listen({ port: 80 }).then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});

process.on("SIGINT", async () => {
    console.log("Disconnecting");
    process.exit();
});
