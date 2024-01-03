/**
 * @generated SignedSource<<7c7da214911b7048d9d12cca2d2951bd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type Role = "ADMIN" | "USER" | "%future added value";
export type Status = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED" | "%future added value";
export type userUserQuery$variables = {
  id: string;
};
export type userUserQuery$data = {
  readonly user: {
    readonly clients: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
    } | null | undefined>;
    readonly email: string;
    readonly id: string;
    readonly name: string;
    readonly projects: ReadonlyArray<{
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
    } | null | undefined> | null | undefined;
    readonly role: Role;
    readonly username: string;
  };
};
export type userUserQuery = {
  response: userUserQuery$data;
  variables: userUserQuery$variables;
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
  "name": "email",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "user",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "username",
        "storageKey": null
      },
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "role",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Project",
        "kind": "LinkedField",
        "name": "projects",
        "plural": true,
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
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "phone",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Client",
        "kind": "LinkedField",
        "name": "clients",
        "plural": true,
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
    "name": "userUserQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "userUserQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "880501944c3de7623a37d102a73be998",
    "id": null,
    "metadata": {},
    "name": "userUserQuery",
    "operationKind": "query",
    "text": "query userUserQuery(\n  $id: ID!\n) {\n  user(id: $id) {\n    id\n    name\n    username\n    email\n    role\n    projects {\n      id\n      name\n      description\n      status\n      client {\n        id\n        name\n        email\n        phone\n      }\n    }\n    clients {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6e5690efc446b8f78ef343f4a236670c";

export default node;
