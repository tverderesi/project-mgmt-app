/**
 * @generated SignedSource<<c92c06d8b0294060dcff068c51c5b7dd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Status = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED" | "%future added value";
export type UpdateTaskInput = {
  description?: string | null | undefined;
  id: string;
  status?: Status | null | undefined;
  title?: string | null | undefined;
};
export type projectUpdateTaskMutation$variables = {
  input: UpdateTaskInput;
};
export type projectUpdateTaskMutation$data = {
  readonly updateTask: {
    readonly description: string | null | undefined;
    readonly id: string;
    readonly status: Status;
    readonly title: string;
  };
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
    "concreteType": "Task",
    "kind": "LinkedField",
    "name": "updateTask",
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
    "cacheID": "d20a600d99be222e78c1a85f954a665c",
    "id": null,
    "metadata": {},
    "name": "projectUpdateTaskMutation",
    "operationKind": "mutation",
    "text": "mutation projectUpdateTaskMutation(\n  $input: UpdateTaskInput!\n) {\n  updateTask(input: $input) {\n    id\n    title\n    description\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "ff1653265c82e11120ff4294a26d1d6e";

export default node;
