/**
 * @generated SignedSource<<3f522b34978d2c9d5e8e10062aff3c79>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type Role = "ADMIN" | "USER" | "%future added value";
export type userMeQuery$variables = Record<PropertyKey, never>;
export type userMeQuery$data = {
  readonly me: {
    readonly email: string;
    readonly id: string;
    readonly name: string;
    readonly role: Role;
    readonly username: string;
  } | null | undefined;
};
export type userMeQuery = {
  response: userMeQuery$data;
  variables: userMeQuery$variables;
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
    "name": "userMeQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "userMeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "d7d6adbca4ac9142a9097bdb52e1e7a1",
    "id": null,
    "metadata": {},
    "name": "userMeQuery",
    "operationKind": "query",
    "text": "query userMeQuery {\n  me {\n    id\n    name\n    username\n    email\n    role\n  }\n}\n"
  }
};
})();

(node as any).hash = "a609889a5f40dd51f6afa3e58933026f";

export default node;
