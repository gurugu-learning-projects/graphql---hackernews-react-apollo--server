async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      }
    : {};

  const links = await context.prisma.links({
    where,
    skip: args.where,
    first: args.first,
    orderBy: args.orderBy
  });

  const count = await context.prisma
    .linksConnection({ where })
    .aggregate()
    .count();

  return { links, count };
}

module.exports = {
  feed
};
