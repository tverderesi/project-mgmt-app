/**
 * @generated SignedSource<<be7c161f53d15aaac6bac4af39a7a653>>
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
    "concreteType": "LoginReturn",
    "kind": "LinkedField",
    "name": "login",
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
    "cacheID": "352ac3e5c2716fb6cec4eda7f0b39012",
    "id": null,
    "metadata": {},
    "name": "authLoginMutation",
    "operationKind": "mutation",
    "text": "mutation authLoginMutation(\n  $input: LoginInput!\n) {\n  login(input: $input) {\n    user {\n      id\n      role\n      name\n    }\n    error {\n      message\n      type\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b8ded23763ed86f82439570e2a6f5b39";

export default node;
