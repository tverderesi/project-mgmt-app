/**
 * @generated SignedSource<<db3118489cdca4d5bfb2c04084ef9f26>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Status = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED" | "%future added value";
export type ProjectInput = {
  client: string;
  description?: string | null | undefined;
  name: string;
  status: Status;
  user: string;
};
export type NewProjectMutation$variables = {
  input: ProjectInput;
};
export type NewProjectMutation$data = {
  readonly createProject: {
    readonly client: {
      readonly id: string;
      readonly name: string;
    };
    readonly description: string;
    readonly id: string;
    readonly name: string;
    readonly status: Status;
  };
};
export type NewProjectMutation = {
  response: NewProjectMutation$data;
  variables: NewProjectMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Project",
    "kind": "LinkedField",
    "name": "createProject",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
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
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Client",
        "kind": "LinkedField",
        "name": "client",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/)
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
    "name": "NewProjectMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NewProjectMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "7e6127a736cb8eaeae10e45b0fa3fb87",
    "id": null,
    "metadata": {},
    "name": "NewProjectMutation",
    "operationKind": "mutation",
    "text": "mutation NewProjectMutation(\n  $input: ProjectInput!\n) {\n  createProject(input: $input) {\n    id\n    name\n    description\n    status\n    client {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1297b521ffbb68c1701b06965ee29c0b";

export default node;
