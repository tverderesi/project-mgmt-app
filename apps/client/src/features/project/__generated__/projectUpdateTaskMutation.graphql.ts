/**
 * @generated SignedSource<<2a701b8a6267935bc23a300a1af375e3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type TaskStatus = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED" | "%future added value";
export type UpdateTaskInput = {
  clientMutationId?: string | null | undefined;
  description?: string | null | undefined;
  id: string;
  project?: string | null | undefined;
  status?: TaskStatus | null | undefined;
  title?: string | null | undefined;
  user?: string | null | undefined;
};
export type projectUpdateTaskMutation$variables = {
  input: UpdateTaskInput;
};
export type projectUpdateTaskMutation$data = {
  readonly updateTask: {
    readonly taskEdge: {
      readonly node: {
        readonly description: string | null | undefined;
        readonly id: string;
        readonly status: TaskStatus | null | undefined;
        readonly title: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type projectUpdateTaskMutation = {
  response: projectUpdateTaskMutation$data;
  variables: projectUpdateTaskMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateTaskPayload",
    "kind": "LinkedField",
    "name": "updateTask",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "TaskEdge",
        "kind": "LinkedField",
        "name": "taskEdge",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Task",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "status",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "projectUpdateTaskMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "projectUpdateTaskMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "87785755d2bec61adaf94516b3c92ef4",
    "id": null,
    "metadata": {},
    "name": "projectUpdateTaskMutation",
    "operationKind": "mutation",
    "text": "mutation projectUpdateTaskMutation(\n  $input: UpdateTaskInput!\n) {\n  updateTask(input: $input) {\n    taskEdge {\n      node {\n        id\n        title\n        description\n        status\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0c8eea0a75bb013117163c9c4d9b88f8";

export default node;
