/**
 * @generated SignedSource<<816de30f0238bd1a18a02bd6819b4d2d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type TaskStatus = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED" | "%future added value";
export type DeleteTaskInput = {
  clientMutationId?: string | null | undefined;
  id: string;
};
export type projectDeleteTaskMutation$variables = {
  connections: ReadonlyArray<string>;
  input: DeleteTaskInput;
};
export type projectDeleteTaskMutation$data = {
  readonly deleteTask: {
    readonly taskEdge: {
      readonly cursor: string;
      readonly node: {
        readonly description: string | null | undefined;
        readonly id: string;
        readonly status: TaskStatus | null | undefined;
        readonly title: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type projectDeleteTaskMutation = {
  response: projectDeleteTaskMutation$data;
  variables: projectDeleteTaskMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "DeleteTaskPayload",
    "kind": "LinkedField",
    "name": "deleteTask",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "cursor",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "projectDeleteTaskMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "projectDeleteTaskMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "e02610914918667365647b0a482e9745",
    "id": null,
    "metadata": {},
    "name": "projectDeleteTaskMutation",
    "operationKind": "mutation",
    "text": "mutation projectDeleteTaskMutation(\n  $input: DeleteTaskInput!\n) {\n  deleteTask(input: $input) {\n    taskEdge {\n      node {\n        id\n        title\n        description\n        status\n      }\n      cursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "886baa8a81ce15e24a357ac05b223975";

export default node;
