/**
 * @generated SignedSource<<c2ab6b96f60b7c0d60d46b436c109fe7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserRole = "ADMIN" | "USER" | "%future added value";
export type UpdateUserInput = {
  clientMutationId?: string | null | undefined;
  email?: string | null | undefined;
  id: string;
  name?: string | null | undefined;
  oldPassword: string;
  password?: string | null | undefined;
  role?: UserRole | null | undefined;
};
export type userUpdateMutation$variables = {
  input: UpdateUserInput;
};
export type userUpdateMutation$data = {
  readonly updateUser: {
    readonly user: {
      readonly email: string | null | undefined;
      readonly id: string;
      readonly name: string | null | undefined;
      readonly role: UserRole;
      readonly username: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
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
    "concreteType": "UpdateUserPayload",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "username",
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
    "cacheID": "c9893d43384fab2601d80bb5a68e206c",
    "id": null,
    "metadata": {},
    "name": "userUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation userUpdateMutation(\n  $input: UpdateUserInput!\n) {\n  updateUser(input: $input) {\n    user {\n      id\n      role\n      name\n      email\n      username\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bd373657770b07b8059ff688d99cf270";

export default node;
