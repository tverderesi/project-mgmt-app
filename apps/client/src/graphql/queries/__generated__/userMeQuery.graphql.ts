/**
 * @generated SignedSource<<d7797476cc56df0fde8c3e6d02103337>>
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
    readonly error: {
      readonly message: string;
      readonly type: string;
    } | null | undefined;
    readonly user: {
      readonly id: string;
      readonly name: string;
      readonly role: Role;
    } | null | undefined;
  };
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
    "concreteType": "UserQueryReturn",
    "kind": "LinkedField",
    "name": "me",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
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
            "name": "role",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
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
    "cacheID": "1f972cf17aa8f41d861142efb22c31f4",
    "id": null,
    "metadata": {},
    "name": "userMeQuery",
    "operationKind": "query",
    "text": "query userMeQuery {\n  me {\n    user {\n      id\n      role\n      name\n    }\n    error {\n      message\n      type\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e3f793a75405d13752bb7436463154b8";

export default node;
