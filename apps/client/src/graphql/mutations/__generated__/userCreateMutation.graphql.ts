/**
 * @generated SignedSource<<a4f7409838257f2c7e4f3dcc9339572d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Role = "ADMIN" | "USER" | "%future added value";
export type UserInput = {
  confirmEmail: string;
  confirmPassword: string;
  email: string;
  name: string;
  password: string;
  role: Role;
  username: string;
};
export type userCreateMutation$variables = {
  input: UserInput;
};
export type userCreateMutation$data = {
  readonly createUser: {
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
export type userCreateMutation = {
  response: userCreateMutation$data;
  variables: userCreateMutation$variables;
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
    "concreteType": "CreateUserReturn",
    "kind": "LinkedField",
    "name": "createUser",
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
    "name": "userCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "userCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "291f6ab1f378c31bef1d0f0c46d881f7",
    "id": null,
    "metadata": {},
    "name": "userCreateMutation",
    "operationKind": "mutation",
    "text": "mutation userCreateMutation(\n  $input: UserInput!\n) {\n  createUser(input: $input) {\n    user {\n      id\n      role\n      name\n    }\n    error {\n      message\n      type\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f9f25e21bb87152d59dd7d2f0c926a7e";

export default node;
