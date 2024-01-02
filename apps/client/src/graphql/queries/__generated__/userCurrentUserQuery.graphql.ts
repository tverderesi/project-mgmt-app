/**
 * @generated SignedSource<<51e6a9c92c7b786776d471b78fb9f090>>
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
    readonly currentUser: {
      readonly email: string;
      readonly id: string;
      readonly name: string;
      readonly role: Role | null | undefined;
      readonly username: string;
    } | null | undefined;
    readonly error: {
      readonly message: string | null | undefined;
      readonly type: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type userCurrentUserQuery = {
  response: userCurrentUserQuery$data;
  variables: userCurrentUserQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "CurrentUserOutput",
    "kind": "LinkedField",
    "name": "currentUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
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
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Error",
        "kind": "LinkedField",
        "name": "error",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "message",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "type",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "userCurrentUserQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "userCurrentUserQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "6aba725672e0b54f2f3c86231743b2fd",
    "id": null,
    "metadata": {},
    "name": "userCurrentUserQuery",
    "operationKind": "query",
    "text": "query userCurrentUserQuery {\n  currentUser {\n    currentUser {\n      id\n      name\n      username\n      email\n      role\n    }\n    error {\n      message\n      type\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "99cd3db1bc8497c4967a3e37a3c98369";

export default node;
