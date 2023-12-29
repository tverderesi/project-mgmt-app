/**
 * @generated SignedSource<<111cd3d74a9a713ff3cab7369c430fc6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type Role = "ADMIN" | "USER" | "%future added value";
export type userUserQuery$variables = {
  id: string;
};
export type userUserQuery$data = {
  readonly user: {
    readonly email: string;
    readonly id: string;
    readonly name: string;
    readonly photo: string | null | undefined;
    readonly projects: ReadonlyArray<{
      readonly autoProgress: boolean;
      readonly client: {
        readonly email: string;
        readonly id: string;
        readonly name: string;
        readonly phone: string;
      };
      readonly description: string | null | undefined;
      readonly id: string;
      readonly name: string;
      readonly progress: number;
      readonly status: string;
    } | null | undefined> | null | undefined;
    readonly role: Role | null | undefined;
    readonly username: string;
  } | null | undefined;
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
        "name": "photo",
        "storageKey": null
      },
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
            "name": "progress",
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
            "kind": "ScalarField",
            "name": "autoProgress",
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
    "cacheID": "700921b1f315a312db15e5346fd0679a",
    "id": null,
    "metadata": {},
    "name": "userUserQuery",
    "operationKind": "query",
    "text": "query userUserQuery(\n  $id: ID!\n) {\n  user(id: $id) {\n    id\n    name\n    username\n    email\n    photo\n    role\n    projects {\n      id\n      name\n      description\n      progress\n      status\n      autoProgress\n      client {\n        id\n        name\n        email\n        phone\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5397d39ede3f462a6bbd248f8b05ea47";

export default node;
