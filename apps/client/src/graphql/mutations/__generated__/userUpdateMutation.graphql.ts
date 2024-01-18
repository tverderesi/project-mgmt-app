/**
 * @generated SignedSource<<396668f4567c55d3db16c59b7324e847>>
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
  oldPassword?: string | null | undefined;
  password?: string | null | undefined;
  role?: Role | null | undefined;
  username?: string | null | undefined;
};
export type userUpdateMutation$variables = {
  input: UpdateUserInput;
};
export type userUpdateMutation$data = {
  readonly updateUser: {
    readonly email: string;
    readonly id: string;
    readonly name: string;
    readonly role: Role;
    readonly username: string;
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
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "updateUser",
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
    "cacheID": "8e28f23ab2b43c4978a110593c708c68",
    "id": null,
    "metadata": {},
    "name": "userUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation userUpdateMutation(\n  $input: UpdateUserInput!\n) {\n  updateUser(input: $input) {\n    id\n    role\n    name\n    email\n    username\n  }\n}\n"
  }
};
})();

(node as any).hash = "b5af056a13b1ddda7159de60695caac0";

export default node;
