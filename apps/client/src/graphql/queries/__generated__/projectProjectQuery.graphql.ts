/**
 * @generated SignedSource<<14f698061d9733b9889694a93683cfd3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type Status = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED" | "%future added value";
export type projectProjectQuery$variables = {
  id: string;
};
export type projectProjectQuery$data = {
  readonly project: {
    readonly client: {
      readonly email: string;
      readonly id: string;
      readonly name: string;
      readonly phone: string;
    };
    readonly description: string;
    readonly id: string;
    readonly name: string;
    readonly status: Status;
    readonly tasks: ReadonlyArray<{
      readonly description: string | null | undefined;
      readonly id: string;
      readonly name: string;
      readonly status: Status;
    } | null | undefined>;
  };
};
export type projectProjectQuery = {
  response: projectProjectQuery$data;
  variables: projectProjectQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Project",
    "kind": "LinkedField",
    "name": "project",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Client",
        "kind": "LinkedField",
        "name": "client",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "phone",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Task",
        "kind": "LinkedField",
        "name": "tasks",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/)
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
    "name": "projectProjectQuery",
    "selections": (v5/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "projectProjectQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "22a57971c16f926d8ba0717dfe4201c5",
    "id": null,
    "metadata": {},
    "name": "projectProjectQuery",
    "operationKind": "query",
    "text": "query projectProjectQuery(\n  $id: ID!\n) {\n  project(id: $id) {\n    id\n    name\n    description\n    status\n    client {\n      id\n      name\n      email\n      phone\n    }\n    tasks {\n      id\n      name\n      description\n      status\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a8fe6de65ee1b749fa195de975727329";

export default node;
