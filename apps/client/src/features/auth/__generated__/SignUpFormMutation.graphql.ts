/**
 * @generated SignedSource<<67ea36dd2659ccdab7be11dcafbee5b9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserRole = "ADMIN" | "USER" | "%future added value";
export type CreateUserInput = {
  clientMutationId?: string | null | undefined;
  confirmEmail: string;
  confirmPassword: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  username: string;
};
export type SignUpFormMutation$variables = {
  input: CreateUserInput;
};
export type SignUpFormMutation$data = {
  readonly createUser: {
    readonly user: {
      readonly id: string;
      readonly name: string | null | undefined;
      readonly role: UserRole;
    } | null | undefined;
  } | null | undefined;
};
export type SignUpFormMutation = {
  response: SignUpFormMutation$data;
  variables: SignUpFormMutation$variables;
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
    "concreteType": "CreateUserPayload",
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
    "name": "SignUpFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignUpFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8d11f58daa56208a2b35fc6f287cd88b",
    "id": null,
    "metadata": {},
    "name": "SignUpFormMutation",
    "operationKind": "mutation",
    "text": "mutation SignUpFormMutation(\n  $input: CreateUserInput!\n) {\n  createUser(input: $input) {\n    user {\n      id\n      role\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0d67e7ac25ae3398a8f3829b28e69159";

export default node;
