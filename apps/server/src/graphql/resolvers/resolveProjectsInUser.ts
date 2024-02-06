import { ProjectModel } from "@/models/Project";

export const resolveProjectsInUser = async (user, args) => {
  const isBackwardsPagination = args.last || args.before;

  const paginationFilter = isBackwardsPagination ? { $lt: args.before } : { $gt: args.after };
  const shouldApplyPaginationFilter = args.after || args.before;
  const filter = shouldApplyPaginationFilter ? { user: user.id, _id: paginationFilter } : { user: user.id };

  const projects = await ProjectModel.find(filter)
    .sort({ _id: isBackwardsPagination ? -1 : 1 })
    .limit((args.first || args.last || 10) + 1);

  const oneBeforeOrAfter = await ProjectModel.findOne({ user: user.id, _id: paginationFilter })
    .sort({ _id: isBackwardsPagination ? -1 : 1 })
    .limit(1);

  isBackwardsPagination && projects.reverse();

  const hasNextPage = isBackwardsPagination ? !!oneBeforeOrAfter : projects.length > (args.first || 10);

  const hasPreviousPage = isBackwardsPagination ? projects.length > args.last || 10 : !!oneBeforeOrAfter;

  const startCursor = projects.length > 0 ? projects[0]._id : null;
  const endCursor = projects.length > 0 ? projects[projects.length - 1]._id : null;
  (hasNextPage || hasPreviousPage) && projects.pop();
  const edges = projects.map((project) => ({
    cursor: project._id,
    node: project,
  }));

  const pageInfo = {
    startCursor,
    endCursor,
    hasNextPage,
    hasPreviousPage,
  };

  return { edges, pageInfo };
};
