/**
 * @generated SignedSource<<94346f6894da07d6861672a643f7843c>>
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
  readonly me: {
    readonly email: string;
    readonly id: string;
    readonly name: string;
    readonly role: Role;
    readonly username: string;
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
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "me",
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
    "cacheID": "19e0601496f9f83e3bf952ece76cddef",
    "id": null,
    "metadata": {},
    "name": "userCurrentUserQuery",
    "operationKind": "query",
    "text": "query userCurrentUserQuery {\n  me {\n    id\n    name\n    username\n    email\n    role\n  }\n}\n"
  }
};
})();

(node as any).hash = "4dcd4a4f71ec6d479c7cbbaad3c8ddc2";

export default node;
