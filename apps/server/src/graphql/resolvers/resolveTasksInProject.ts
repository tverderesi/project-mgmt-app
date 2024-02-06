import { TaskModel } from "@/models/Task";

export const resolveTasksInProject = async (project, args) => {
  const isBackwardsPagination = args.last || args.before;

  const paginationFilter = isBackwardsPagination ? { $lt: args.before } : { $gt: args.after };
  const shouldApplyPaginationFilter = args.after || args.before;
  const filter = shouldApplyPaginationFilter ? { project: project.id, _id: paginationFilter } : { project: project.id };

  const tasks = await TaskModel.find(filter)
    .sort({ _id: isBackwardsPagination ? -1 : 1 })
    .limit((args.first || args.last || 10) + 1);

  const oneBeforeOrAfter = await TaskModel.findOne({ project: project.id, _id: paginationFilter })
    .sort({ _id: isBackwardsPagination ? -1 : 1 })
    .limit(1);

  isBackwardsPagination && tasks.reverse();

  const hasNextPage = isBackwardsPagination ? !!oneBeforeOrAfter : tasks.length > (args.first || 10);

  const hasPreviousPage = isBackwardsPagination ? tasks.length > args.last || 10 : !!oneBeforeOrAfter;

  const startCursor = tasks.length > 0 ? tasks[0]._id : null;
  const endCursor = tasks.length > 0 ? tasks[tasks.length - 1]._id : null;
  (hasNextPage || hasPreviousPage) && tasks.pop();
  const edges = tasks.map((task) => ({
    cursor: task._id,
    node: task,
  }));

  const pageInfo = {
    startCursor,
    endCursor,
    hasNextPage,
    hasPreviousPage,
  };

  return { edges, pageInfo };
};
