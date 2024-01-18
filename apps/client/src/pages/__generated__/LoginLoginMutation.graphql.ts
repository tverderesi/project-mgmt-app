/**
 * @generated SignedSource<<c969a99c7fadcfc3d577578b5b2d2e5c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Role = "ADMIN" | "USER" | "%future added value";
export type LoginInput = {
  password: string;
  user: string;
};
export type LoginLoginMutation$variables = {
  input: LoginInput;
};
export type LoginLoginMutation$data = {
  readonly login: {
    readonly id: string;
    readonly name: string;
    readonly role: Role;
  } | null | undefined;
};
export type LoginLoginMutation = {
  response: LoginLoginMutation$data;
  variables: LoginLoginMutation$variables;
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
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "login",
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
        "name": "role",
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
    "name": "LoginLoginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginLoginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "756d1c3a744387c3511c1676b28709d0",
    "id": null,
    "metadata": {},
    "name": "LoginLoginMutation",
    "operationKind": "mutation",
    "text": "mutation LoginLoginMutation(\n  $input: LoginInput!\n) {\n  login(input: $input) {\n    id\n    name\n    role\n  }\n}\n"
  }
};
})();

(node as any).hash = "40d020f0f559aa4d5bd8bb6b3ac25760";

export default node;
