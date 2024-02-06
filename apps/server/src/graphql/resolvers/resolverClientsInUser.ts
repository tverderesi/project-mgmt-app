import { ClientModel } from "@/models/Client";

export const resolveClientsInUser = async (user, args) => {
  const isBackwardsPagination = args.last || args.before;

  const paginationFilter = isBackwardsPagination ? { $lt: args.before } : { $gt: args.after };
  const shouldApplyPaginationFilter = args.after || args.before;
  const filter = shouldApplyPaginationFilter ? { user: user.id, _id: paginationFilter } : { user: user.id };

  const clients = await ClientModel.find(filter)
    .sort({ _id: isBackwardsPagination ? -1 : 1 })
    .limit((args.first || args.last || 10) + 1);
  const oneBeforeOrAfter = await ClientModel.findOne({ user: user.id, _id: paginationFilter })
    .sort({ _id: isBackwardsPagination ? -1 : 1 })
    .limit(1);

  isBackwardsPagination && clients.reverse();

  const hasNextPage = isBackwardsPagination ? !!oneBeforeOrAfter : clients.length > (args.first || 10);

  const hasPreviousPage = isBackwardsPagination ? clients.length > args.last || 10 : !!oneBeforeOrAfter;

  const startCursor = clients.length > 0 ? clients[0]._id : null;
  const endCursor = clients.length > 0 ? clients[clients.length - 1]._id : null;
  (hasNextPage || hasPreviousPage) && clients.pop();
  const edges = clients.map((client) => {
    return {
      cursor: client._id,
      node: client,
    };
  });
  const pageInfo = {
    startCursor,
    endCursor,
    hasNextPage,
    hasPreviousPage,
  };

  return { edges, pageInfo };
};
