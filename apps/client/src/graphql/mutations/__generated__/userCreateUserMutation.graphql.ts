/**
 * @generated SignedSource<<df5553a8dd4f314c64ec8e1b446cb4a1>>
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
  photo?: string | null | undefined;
  username: string;
};
export type userCreateUserMutation$variables = {
  input: UserInput;
};
export type userCreateUserMutation$data = {
  readonly createUser: {
    readonly email: string;
    readonly id: string;
    readonly name: string;
    readonly photo: string | null | undefined;
    readonly role: Role | null | undefined;
    readonly username: string;
  } | null | undefined;
};
export type userCreateUserMutation = {
  response: userCreateUserMutation$data;
  variables: userCreateUserMutation$variables;
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
    "name": "createUser",
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
    "name": "userCreateUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "userCreateUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1bf0b0838605abd8bc284c49d479d292",
    "id": null,
    "metadata": {},
    "name": "userCreateUserMutation",
    "operationKind": "mutation",
    "text": "mutation userCreateUserMutation(\n  $input: UserInput!\n) {\n  createUser(input: $input) {\n    id\n    name\n    username\n    email\n    photo\n    role\n  }\n}\n"
  }
};
})();

(node as any).hash = "e21d2ee04e175b38ec497a8e82fee9fd";

export default node;
