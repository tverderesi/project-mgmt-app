/**
 * @generated SignedSource<<c83b30298cebfd90f8fa68c722bd0376>>
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
    readonly id: string;
    readonly name: string;
    readonly role: Role;
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
    "cacheID": "d274058c9dc6b50cfe5fb595f46e65dd",
    "id": null,
    "metadata": {},
    "name": "userCreateMutation",
    "operationKind": "mutation",
    "text": "mutation userCreateMutation(\n  $input: UserInput!\n) {\n  createUser(input: $input) {\n    id\n    role\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "2d4aa5febb4f35a808a91fd640bc0740";

export default node;
