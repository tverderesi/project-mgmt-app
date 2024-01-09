/**
 * @generated SignedSource<<28717abc7927c100c0f24048ba2b5c50>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Role = "ADMIN" | "USER" | "%future added value";
export type UpdateUserInput = {
  email?: string | null | undefined;
  id: string;
  name?: string | null | undefined;
  newPassword?: string | null | undefined;
  password?: string | null | undefined;
  role?: Role | null | undefined;
  username?: string | null | undefined;
};
export type userUpdateMutation$variables = {
  input: UpdateUserInput;
};
export type userUpdateMutation$data = {
  readonly updateUser: {
    readonly error: {
      readonly message: string;
      readonly type: string;
    } | null | undefined;
    readonly user: {
      readonly email: string;
      readonly id: string;
      readonly name: string;
      readonly role: Role;
    } | null | undefined;
  };
};
export type userUpdateMutation = {
  response: userUpdateMutation$data;
  variables: userUpdateMutation$variables;
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
    "concreteType": "UpdateUserReturn",
    "kind": "LinkedField",
    "name": "updateUser",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
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
    "name": "userUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "userUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8b1a54fc0c56515cfa335692dc8a182b",
    "id": null,
    "metadata": {},
    "name": "userUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation userUpdateMutation(\n  $input: UpdateUserInput!\n) {\n  updateUser(input: $input) {\n    user {\n      id\n      role\n      name\n      email\n    }\n    error {\n      message\n      type\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6a84d4de381a776f89b952dc0eed7d1d";

export default node;
