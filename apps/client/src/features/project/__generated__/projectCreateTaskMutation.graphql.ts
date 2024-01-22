/**
 * @generated SignedSource<<37a7a2d6fc084c04b64feda9b8413e65>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Status = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED" | "%future added value";
export type TaskInput = {
  description?: string | null | undefined;
  project: string;
  status: Status;
  title: string;
  user: string;
};
export type projectCreateTaskMutation$variables = {
  input: TaskInput;
};
export type projectCreateTaskMutation$data = {
  readonly createTask: {
    readonly description: string | null | undefined;
    readonly id: string;
    readonly status: Status;
    readonly title: string;
  };
};
export type projectCreateTaskMutation = {
  response: projectCreateTaskMutation$data;
  variables: projectCreateTaskMutation$variables;
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
    "concreteType": "Task",
    "kind": "LinkedField",
    "name": "createTask",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "projectCreateTaskMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "projectCreateTaskMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e23ab3c10c7617a470467e778d399cb8",
    "id": null,
    "metadata": {},
    "name": "projectCreateTaskMutation",
    "operationKind": "mutation",
    "text": "mutation projectCreateTaskMutation(\n  $input: TaskInput!\n) {\n  createTask(input: $input) {\n    id\n    title\n    description\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "30c57ee8ceed6ba23d0e488b8182edb7";

export default node;
