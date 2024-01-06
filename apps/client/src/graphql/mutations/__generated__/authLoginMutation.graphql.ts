/**
 * @generated SignedSource<<f1ac85f792f63070d03cffeddee34bcb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Role = "ADMIN" | "USER" | "%future added value";
export type LoginInput = {
  password?: string | null | undefined;
  user?: string | null | undefined;
};
export type authLoginMutation$variables = {
  input: LoginInput;
};
export type authLoginMutation$data = {
  readonly login: {
    readonly id: string;
    readonly name: string;
    readonly role: Role;
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
    "cacheID": "4c5b9db0c7f64c7aaad849bfee633716",
    "id": null,
    "metadata": {},
    "name": "authLoginMutation",
    "operationKind": "mutation",
    "text": "mutation authLoginMutation(\n  $input: LoginInput!\n) {\n  login(input: $input) {\n    id\n    role\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "d1f04890c752a07c66f591b0551a886d";

export default node;
