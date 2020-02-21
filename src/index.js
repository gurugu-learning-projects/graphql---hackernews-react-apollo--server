const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];
let idCount = links.length;

// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      const id = args.id;

      return links.find(link => link.id === id);
    }
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };

      links.push(link);
      return link;
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
    }
  }
};

// 3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
