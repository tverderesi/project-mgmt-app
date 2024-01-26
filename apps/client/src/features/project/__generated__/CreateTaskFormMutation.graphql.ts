/**
 * @generated SignedSource<<2fa50bb4537cf93effd44648770fe092>>
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
export type CreateTaskFormMutation$variables = {
  input: TaskInput;
};
export type CreateTaskFormMutation$data = {
  readonly createTask: {
    readonly description: string | null | undefined;
    readonly id: string;
    readonly status: Status;
    readonly title: string;
  };
};
export type CreateTaskFormMutation = {
  response: CreateTaskFormMutation$data;
  variables: CreateTaskFormMutation$variables;
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
    "name": "CreateTaskFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateTaskFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "63d9a5429a0d1c0fc53c0c368d4544e8",
    "id": null,
    "metadata": {},
    "name": "CreateTaskFormMutation",
    "operationKind": "mutation",
    "text": "mutation CreateTaskFormMutation(\n  $input: TaskInput!\n) {\n  createTask(input: $input) {\n    id\n    title\n    description\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "0975d4ce6121037195e4baeb60b98c9a";

export default node;
