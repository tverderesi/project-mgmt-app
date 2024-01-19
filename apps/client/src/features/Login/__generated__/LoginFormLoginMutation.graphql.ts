/**
 * @generated SignedSource<<8c1aa1e81f157ba1716b3cb76cd57144>>
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
export type LoginFormLoginMutation$variables = {
  input: LoginInput;
};
export type LoginFormLoginMutation$data = {
  readonly login: {
    readonly id: string;
    readonly name: string;
    readonly role: Role;
  } | null | undefined;
};
export type LoginFormLoginMutation = {
  response: LoginFormLoginMutation$data;
  variables: LoginFormLoginMutation$variables;
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
    "name": "LoginFormLoginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginFormLoginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8201fd27b3f3322d892dc0e3a5af7131",
    "id": null,
    "metadata": {},
    "name": "LoginFormLoginMutation",
    "operationKind": "mutation",
    "text": "mutation LoginFormLoginMutation(\n  $input: LoginInput!\n) {\n  login(input: $input) {\n    id\n    name\n    role\n  }\n}\n"
  }
};
})();

(node as any).hash = "d7e01582067c811997e1237abece9564";

export default node;
