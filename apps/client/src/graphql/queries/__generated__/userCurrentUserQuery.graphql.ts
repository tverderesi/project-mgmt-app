/**
 * @generated SignedSource<<ddedea9beca9c86d3c8ef57231011052>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type Role = "ADMIN" | "USER" | "%future added value";
export type userCurrentUserQuery$variables = Record<PropertyKey, never>;
export type userCurrentUserQuery$data = {
  readonly currentUser: {
    readonly email?: string;
    readonly errors?: ReadonlyArray<{
      readonly message: string;
      readonly path: ReadonlyArray<string> | null | undefined;
    } | null | undefined> | null | undefined;
    readonly id?: string;
    readonly name?: string;
    readonly role?: Role | null | undefined;
    readonly username?: string;
  } | null | undefined;
};
export type userCurrentUserQuery = {
  response: userCurrentUserQuery$data;
  variables: userCurrentUserQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "InlineFragment",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    },
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
      "name": "role",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
},
v1 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Error",
      "kind": "LinkedField",
      "name": "errors",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "path",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "message",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ErrorArray",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "userCurrentUserQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "userCurrentUserQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v0/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "253be6505c7648cd5c87ad479ee6f21a",
    "id": null,
    "metadata": {},
    "name": "userCurrentUserQuery",
    "operationKind": "query",
    "text": "query userCurrentUserQuery {\n  currentUser {\n    __typename\n    ... on User {\n      id\n      name\n      username\n      email\n      role\n    }\n    ... on ErrorArray {\n      errors {\n        path\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "05938c968955ccdb78eba9010f1ab04a";

export default node;
