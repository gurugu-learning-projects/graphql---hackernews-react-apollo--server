const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => (root, args, context, info) => {
      return context.prisma.links();
    },
    link: (parent, args) => {
      const id = args.id;

      return links.find(link => link.id === id);
    }
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    },
    updateLink: (parent, args) => {
      const { id, description, url } = args;

      links = links.map(link => {
        if (link.id === id) {
          return {
            id: link.id,
            description: description ? description : link.description,
            url: url ? url : link.url
          };
        } else {
          return link;
        }
      });

      return links.find(link => link.id === id);
    },
    deleteLink: (parent, args) => {
      const { id } = args;

      const deletedLink = links.find(link => link.id === id);
      links = links.filter(link => link.id !== id);

      return deletedLink;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
