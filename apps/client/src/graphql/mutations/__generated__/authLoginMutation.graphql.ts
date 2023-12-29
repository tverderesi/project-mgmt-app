/**
 * @generated SignedSource<<6f2eaf24c933be70700adaafce415c81>>
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
export type authLoginMutation$variables = {
  input: LoginInput;
};
export type authLoginMutation$data = {
  readonly login: {
    readonly email: string;
    readonly id: string;
    readonly name: string;
    readonly photo: string | null | undefined;
    readonly role: Role | null | undefined;
    readonly username: string;
  } | null | undefined;
};
export type authLoginMutation = {
  response: authLoginMutation$data;
  variables: authLoginMutation$variables;
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
        "name": "photo",
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
    "name": "authLoginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "authLoginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "204f094593e51f4e6eda1c6288a7f362",
    "id": null,
    "metadata": {},
    "name": "authLoginMutation",
    "operationKind": "mutation",
    "text": "mutation authLoginMutation(\n  $input: LoginInput!\n) {\n  login(input: $input) {\n    id\n    name\n    username\n    email\n    photo\n    role\n  }\n}\n"
  }
};
})();

(node as any).hash = "e10a0654bcf3f424500e5cb20bcb3b6c";

export default node;
